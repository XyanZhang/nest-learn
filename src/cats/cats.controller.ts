import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { response } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { GlobalService } from 'src/global/global.service';
import { ConfigService } from '../config/config.service';

@Controller('cats')
export class CatsController {

  // Dependency injection#依赖注入
  constructor(private catsService: CatsService, private readonly logger: GlobalService, private envConfig: ConfigService) {}
  
  @Post('create')
  async create(@Body() createCatDto: CreateCatDto, @Res() response) {
    // 通过this.catsService.create(createCatDto)调用CatsService中的create方法
    console.log(createCatDto) // post body
    console.log(this) // post body
    this.logger.logTime();
    this.catsService.create(createCatDto);
    response.status(200).json({status: 'ok', message: 'add ok', data: createCatDto});
  }
  
  @Get()
  findAll(): string {
    // match path: /cats ; findAll 函数名是随意定义的
    return 'This action returns all cats';
  }
  @Get('test')
  testRouteTest(): string {
    // match path: /cats/test
    console.log('test root path');
    return 'This is a get route test';
  }
  @Get('test/:id')
  testRouteTestWithParam(@Req() request, @Res() response): void {
    // match path: /cats/test/123
    //  获取参数：req.params.id
    //  获取查询参数：req.query
    //  获取请求体：req.body
    //  获取请求头：req.headers
    //  获取请求方法：req.method
    //  获取请求路径：req.path
    //  获取请求原始路径：req.originalUrl
    //  获取请求协议：req.protocol
    //  获取请求IP：req.ip
    //  获取请求端口：req.port
    //  获取请求主机：req.host
    //  获取请求来源：req.get('referer')
    //  获取请求UA：req.get('user-agent')
    //  获取请求cookie：req.cookies
    //  获取请求session：req.session
    //  获取请求文件：req.file
    //  获取请求文件列表：req.files
  
    //  res.send()
    //  res.json()
    //  res.status()
    //  res.redirect()
    // 获取 res 
    let reqId = request.params.id;
    console.log(reqId); // get param
    response.status(200).json({status: 'ok', message: 'This is a get route test with param'});
  }
  @Get('config')
  getConfig():string {
    let config = this.envConfig.getConfig('HELLO_MESSAGE');
    console.log(config); // 打印配置文件中的 HELLO_MESSAGE
    return config;
  }
}
