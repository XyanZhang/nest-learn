import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  /*
    Implementation that makes use of this.usersService
  */
  getUsers() {
    return this.usersService.getUsers(); // 通过依赖注入的方式，可以在 AuthService 中直接使用 UsersService 中的 getUsers 方法
  }
}
