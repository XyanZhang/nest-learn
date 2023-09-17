import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
// import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  async login(@Body() user: LoginDto,  @Res({passthrough: true}) res) {
    console.log(user)
    const foundUser = await this.userService.login(user);

    if(foundUser) {
      // 设置jwt
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username
        }
      })
      res.setHeader('token', token);

      return 'login success';
    } else {
      return 'login fail';
    }
  }
  @Post('register')
  register(@Body() user: RegisterDto) {
    console.log(user)
    this.userService.register(user)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
