import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloJson() {
    return JSON.stringify({ message: 'Hello World!' });
  }
}
