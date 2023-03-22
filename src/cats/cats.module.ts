import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { ConfigModule } from '../config/config.module';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
  imports: [ ConfigModule.register({ folder: './config' }) ]
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
