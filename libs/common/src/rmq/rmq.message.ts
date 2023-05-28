import { RmqContext } from '@nestjs/microservices';

export class RmqMessageValue<T> {
  constructor({ value, token }: { value: T; token?: string }) {
    this.value = value;
    this.token = token;
  }
  value: T;
  context: RmqContext;
  token: string;
}
