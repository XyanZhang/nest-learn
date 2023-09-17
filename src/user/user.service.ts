import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as crypto from 'crypto';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {

  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async register(user: RegisterDto){
    const foundUser = await this.userRepository.findOneBy({
      username: user.username
    }) 
    if(foundUser) {
      throw new HttpException("用户已存在",200);
    }
    const newUser = new User();
    newUser.username = user.username;
    // 后端用户进行md5 加密 newUser.password = md5(user.password);
    newUser.password = user.password;

    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(error, UsersService)
      return "注册失败"
    }
  }

  async login(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if(!foundUser) {
      throw new HttpException('用户名不存在', 200);
    }
    // if(foundUser.password !== md5(user.password)) {
    if(foundUser.password !== user.password) {
      throw new HttpException('密码错误', 200);
    }
    return foundUser;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
