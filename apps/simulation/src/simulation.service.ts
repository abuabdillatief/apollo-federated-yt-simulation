import { Activity } from '@app/common';
import { AuthService } from '@app/common/auth/auth.service';
import { STORE_HISTORY, UPDATE_VIDEO } from '@app/common/constants/events';
import { RmqMessageValue } from '@app/common/rmq/rmq.message';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { History } from 'apps/history/src/history.model';
import { User } from 'apps/users/src/models/user.model';
import { UpdateVideoInput } from 'apps/videos/src/dto/update-video.input';
import { Video } from 'apps/videos/src/entities/video.entity';
import axios, { AxiosRequestConfig } from 'axios';
import { HISTORY_SERVICE, VIDEO_SERVICE, } from './constants/services';


@Injectable()
export class SimulationService {
  constructor(
    @Inject(VIDEO_SERVICE) private videoClient: ClientProxy,
    @Inject(HISTORY_SERVICE) private historyClient: ClientProxy,
  ) { }

  static generateRandomDuration(max: number): number {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1;
  }

  static getRandomActivity(): Activity {
    const activities: Activity[] = Object.values(Activity);
    const randomIndex = Math.floor(Math.random() * activities.length);
    return activities[randomIndex];
  }

  static async getVideos(token: string): Promise<Video[]> {
    const url = 'http://localhost:3000/graphql'; // Replace with the URL of the 3rd party API
    const query = `
    query {
      videos (input:{sortBy:TotalPaused}){
        id
        title
        totalPlayed
        totalPaused
        totalSkip
        duration
      }
    }
    `

    const headers = {
      'Authorization': token,
    };

    const config: AxiosRequestConfig = {
      url,
      method: 'post',
      headers,
      data: {
        query,
      },
    };
    const response = await axios(config);
    return response.data.data.videos as Video[]
  }

  async simulateUser(data: User, token: string) {
    const duration = SimulationService.generateRandomDuration(15);
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;
    const videos = await SimulationService.getVideos(token)

    let lastAct: History = new History()
    let activity: Activity = Activity.PLAY

    // initiate first behavior
    let history: History = {
      userId: data.id,
      activity: activity,
      videoId: videos[Math.floor(Math.random() * videos.length)].id,
      duration: SimulationService.generateRandomDuration(duration),
      createdAt: Date.now()
    }

    let video: UpdateVideoInput = {
      id: history.videoId,
      totalPlayed: 1
    }

    await new Promise(r => setTimeout(r, history.duration));

    this.videoClient.emit<string, RmqMessageValue<UpdateVideoInput>>(UPDATE_VIDEO, new RmqMessageValue<UpdateVideoInput>({ value: video }))
    this.historyClient.emit<string, RmqMessageValue<History>>(STORE_HISTORY, new RmqMessageValue<History>({ value: history, token: token }))

    lastAct = history

    while (Date.now() < endTime) {
      activity = SimulationService.getRandomActivity()
      history = {
        userId: data.id,
        activity: activity,
        videoId: "",
        duration: 0,
        createdAt: Date.now()
      }
      video = new UpdateVideoInput()

      switch (activity) {
        case Activity.SKIP:
          video.totalSkip = 1
          if (lastAct.activity === Activity.SKIP) {
            continue
          }

          history.videoId = lastAct.videoId
          history.duration = 500
          break;
        case Activity.PAUSE:
          video.totalPaused = 1
          if (lastAct.activity !== Activity.PLAY) {
            continue
          }
          history.videoId = lastAct.videoId
          history.duration = 500
          break;
        case Activity.PLAY:
          video.totalPlayed = 1
          if (lastAct.activity === Activity.PLAY) {
            continue
          }
          let chosenVideo = videos[Math.floor(Math.random() * videos.length)]
          history.duration = SimulationService.generateRandomDuration(duration)
          history.videoId = chosenVideo.id
          break;
      }
      lastAct = history

      video.id = history.videoId
      this.videoClient.emit<string, RmqMessageValue<UpdateVideoInput>>(UPDATE_VIDEO, new RmqMessageValue<UpdateVideoInput>({ value: video }))
      this.historyClient.emit<string, RmqMessageValue<History>>(STORE_HISTORY, new RmqMessageValue<History>({ value: history, token: token }))

      await new Promise(r => setTimeout(r, history.duration));
    }
  }
}
