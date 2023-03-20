import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService{
  // 注入默认配置
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient) {}
}
