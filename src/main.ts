import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/all-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';

import * as session from 'express-session';

async function bootstrap() {
  // // NestFactory exposes a few static methods that allow creating an application instance.
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter()); // 全局异常过滤器 有局限


  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.use(session({
    secret: 'kenanyah',
    resave: false, //  为 true 是每次访问都会更新 session，不管有没有修改 session 的内容，
    // false: 只有 session 内容变了才会去更新 session。
    saveUninitialized: false // 为 true 是不管是否设置 session，都会初始化一个空的 session 对象
  }))

  await app.listen(3010);
}
bootstrap();
