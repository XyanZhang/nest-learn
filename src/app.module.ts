import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpService } from './http/http.service';
import { CatsModule } from './cats/cats.module';
import { GlobalModule } from './global/global.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: 'kenanyah',
    //   signOptions: {
    //     expiresIn: '7d'
    //   }
    // }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123456",
      database: "login_test",
      synchronize: true,
      logging: true,
      entities: [User],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
          authPlugin: 'sha256_password',
      }
    }),
    JwtModule.registerAsync({
      async useFactory() {

        await 111;
        return {
          secret: 'kenanyah',
          signOptions: {
            expiresIn: '7d'
          }
        }
      }
    }),
    CatsModule, GlobalModule, UserModule],
  controllers: [AppController],
  providers: [AppService, HttpService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .apply(cors(), helmet(), logger)  // 可使用多个中间件
      .exclude( // 排除 (using the path-to-regexp package.)
        // { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      // .forRoutes('cats');
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      .forRoutes({ path: 'c**s', method: RequestMethod.GET });
  }
}
