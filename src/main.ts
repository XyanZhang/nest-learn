import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/all-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
async function bootstrap() {
  // // NestFactory exposes a few static methods that allow creating an application instance.
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter()); // 全局异常过滤器 有局限


  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3010);
}
bootstrap();
