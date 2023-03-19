import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  // // NestFactory exposes a few static methods that allow creating an application instance.
  const app = await NestFactory.create(AppModule);
  await app.listen(3010);
}
bootstrap();
