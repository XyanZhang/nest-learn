import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpService } from './http/http.service';
import { CatsModule } from './cats/cats.module';
import { GlobalModule } from './global/global.module';

import { ConfigModule } from './config/config.module';

@Module({
  imports: [CatsModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService, HttpService],
})
export class AppModule {}
