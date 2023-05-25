
import { Activity } from "apps/simulation/src/models/actionDetail.model"

export class HistoryInput {
    userId: string
    videoId: string
    createdAt: number
    duration: number
    activity: Activity
}