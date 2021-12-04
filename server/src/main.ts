import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 5700;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`server running at: http://localhost:${port}/`);
}
bootstrap();
