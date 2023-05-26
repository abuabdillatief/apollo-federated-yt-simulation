import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'apps/users/src/models/user.model';
import { HISTORY_SERVICE, VIDEO_SERVICE } from './constants/services';
import { Activity } from './models/actionDetail.model';
import axios, { AxiosRequestConfig } from 'axios';
import { Video } from 'apps/videos/src/entities/video.entity';
import { RmqMessageValue } from '@app/common/rmq/rmq.message';
import { STORE_HISTORY } from '@app/common/constants/events';
import { HistoryInput } from 'apps/history/src/histoy.model';
import { AuthService } from '@app/common/auth/auth.service';


@Injectable()
export class SimulationService {
  constructor(
    @Inject(VIDEO_SERVICE) private videoClient: ClientProxy,
    @Inject(HISTORY_SERVICE) private historyClient: ClientProxy,
    private readonly authService: AuthService
  ) { }

  static generateRandomDuration(max: number): number {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1;
  }

  static getRandomActivity(): Activity {
    const activities: Activity[] = Object.values(Activity);
    const randomIndex = Math.floor(Math.random() * activities.length);
    return activities[randomIndex];
  }

  static async getVideos(token:string): Promise<Video[]> {
    const url = 'http://localhost:3000/graphql'; // Replace with the URL of the 3rd party API
    const query = `
      query {
        videos {
          id,
          title, 
          totalClick, 
          totalPlayed,
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
    console.log(token,"token in simulation")
    let duration = SimulationService.generateRandomDuration(15);
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    while (Date.now() < endTime) {
      let activity = SimulationService.getRandomActivity()
      let act = {
        userId: data.id,
        activity: activity,
        videoId: "",
        duration: 0,
        createdAt: Date.now()
      }

      switch (activity) {
        case Activity.SKIP:
          act.duration = 500
          break;
        case Activity.PAUSE:
          act.duration = 500
          break;
        case Activity.PLAY:
          let videos = await SimulationService.getVideos(token)
          let chosenVideo = videos[Math.floor(Math.random() * videos.length)]
          act.duration = SimulationService.generateRandomDuration(duration)
          act.videoId = chosenVideo.id
          break;
      }
      this.historyClient.emit<string, RmqMessageValue<HistoryInput>>(STORE_HISTORY, new RmqMessageValue<HistoryInput>({ value: act, token: token }))
      await new Promise(r => setTimeout(r, act.duration));
    }
    console.log("done")
  }
}
