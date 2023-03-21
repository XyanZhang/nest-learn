import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { CONFIG_OPTIONS } from "./constants";

@Module({})
export class ConfigModule {
  public static register(configObj: configObj) {
    console.log('use register, configObj: ', configObj);
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: configObj,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}

interface configObj {
  folder: string;
};