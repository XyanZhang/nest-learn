import { Controller, Get, Inject, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('sessionGet')
  sessionGet(@Session() session) {
    console.log(session);
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }
  @Get('jwtGet')
  jwtGet(@Res({ passthrough: true }) response) {
    const newToken = this.jwtService.sign({
      count: 1,
    });

    response.setHeader('token', newToken);
    return 'hello';
  }
}
