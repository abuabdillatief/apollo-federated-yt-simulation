import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RmqContext, RmqOptions, Transport } from "@nestjs/microservices";

@Injectable()
export class RmqService {
    constructor(private readonly configService: ConfigService) { }

    getOptions(queue: string, noAck = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBIT_MQ_URI')],
                queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
                noAck: noAck,
                persistent: true,
                socketOptions: {
                    heartbeatIntervalInSeconds: 60,
                }
            }
        }
    }

    ack(context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMessage = context.getMessage()
        console.log(originalMessage, "<- original message")
        if (originalMessage) {
            channel.ack(originalMessage)
        }
    }
}