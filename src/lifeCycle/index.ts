import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UsersService implements OnModuleInit {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
  // async onModuleInit(): Promise<void> {
  //   await this.fetch();
  // }
  onModuleDestroy() {
    
  }
}

// Called once all modules have been initialized, but before listening for connections.
// onApplicationBootstrap()

// Called after all onModuleDestroy() handlers have completed
// beforeApplicationShutdown()

// Called after connections close (app.close() resolves).
// onApplicationShutdown()