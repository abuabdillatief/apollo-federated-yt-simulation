import { RmqContext } from "@nestjs/microservices"

export class RmqMessageValue<T> {
    constructor({ value }: { value: T }) {
        this.value = value
    }
    value: T
    context: RmqContext
}