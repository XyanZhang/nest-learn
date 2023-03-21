import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  logTime() {
    console.log('GlobalService logStartTime');
    console.log(new Date().toLocaleString());
  }
  log() {
    console.log('GlobalService');
  }
}

// 