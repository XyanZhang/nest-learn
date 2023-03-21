import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // 导入 UsersModule，making UsersModule's exported providers available inside AuthModule
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}