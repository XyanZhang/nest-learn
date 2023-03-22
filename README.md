# nest-learn project
>
> nest project for learning
>
## init

### 命令

```shell
npm i -g @nestjs/cli
nest new project-name
```

### 初始化结构

```text
src
    app.controller.spec.ts // The unit tests for the controller. 
    app.controller.ts  // A basic controller with a single route.
    app.module.ts // The root module of the application.
    app.service.ts // A basic service with a single method.
    main.ts // The entry file of the application which uses the core function NestFactory to create a Nest application instance.
```

### error Abort

```ts
NestFactory.create(AppModule, { abortOnError: false });
// 该配置设置后 出现异常会抛出错误
```

## controllers

![controller](https://docs.nestjs.com/assets/Controllers_1.png)

```shell
nest g controller cats # 生成controller， an optional route path prefix of cats； route: /cats
```

```js
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string { // match path: /cats ; findAll 函数名是随意定义的
    return 'This action returns all cats'; 
  }
  @Get("test")
  testRouteTest(): string { // match path: /cats/test 
    return "This is a get route test";
  }
}
```

## providers

![provider](https://docs.nestjs.com/assets/Components_1.png)

>
> Controllers should handle HTTP requests and delegate more complex tasks to providers. Providers are plain JavaScript classes that are declared as providers in a module.
>

```shell
nest g service cats # 生成controller， an optional route path prefix of cats； route: /cats
```

## modules

![provider](https://docs.nestjs.com/assets/Modules_1.png)

>
> Each application has at least one module, a root module. The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies
>

+ providers
  + the providers that will be instantiated by the Nest injector and that may be shared at least across this module
+ controllers
  + the set of controllers defined in this module which have to be instantiated
+ imports
  + the list of imported modules that export the providers which are required in this module
+ exports
  + the subset of providers that are provided by this module and should be available in other modules which import this module. You can use either the provider itself or just its token (provide value)

`$ nest g module cats`

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```
>
> now any module that imports the CatsModule has access to the CatsService and will share the same instance with all other modules that import it as well
>

### Module re-exporting

```ts
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

### Dependency injection

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
// 说明：catsService 注入到 CatsModule中， 由于循环依赖关系，模块类本身不能作为提供程序被注入
```

### Global modules

```typescript
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}

// use
import { LoggerService } from '../common/logger.service';
@Controller('cats')
export class CatsController {
  // 通过构造函数注入
  constructor(private readonly logger: LoggerService) {}

  @Get()
  findAll(): string {
    // this上已挂载
    this.logger.log('Find all cats');
    return 'This action returns all cats';
  }
}
```

### Dynamic modules

```typescript
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    // 返回模块对象
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}

// use: 在需要引用的模块
// module中
@Module({
  // ...
  imports: [DatabaseModule]
})
// 需要使用的controller中
export class CatsController {
  // Dependency injection#依赖注入
  constructor(private dataBase: DatabaseService) {} // 引入
  // 就可以 this.dataBase 获取
}
```
