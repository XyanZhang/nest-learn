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

注册与导出: 提供者需要在模块元元素的providers中注册才可以被本模块的其它类注入，需要在exports中导出后才能被其它模块调用

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
  + 一个模块如果要调用其他模块的提供者，必须先在其他中使用exports导出，然后在需要使用模块中使用imports导入
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

## Middleware

![middleware](https://docs.nestjs.com/assets/Middlewares_1.png)

> Middleware functions can perform the following tasks:

+ execute any code.
+ make changes to the request and the response objects.
+ end the request-response cycle.
+ call the next middleware function in the stack.
+ if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
// Applying middleware#
import { LoggerMiddleware } from './common/middleware/logger.middleware';
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .apply(cors(), helmet(), logger)  // 可使用多个中间件
      .exclude( // 排除 (using the path-to-regexp package.)
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      // .forRoutes('cats');
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      .forRoutes({ path: 'c**s', method: RequestMethod.GET });
  }
}

// 全局中间件
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

## Exception filters (异常处理)

![exception](https://docs.nestjs.com/assets/Filter_1.png)

```ts
// 默认异常响应
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

> The global exception filter partially supports the http-errors library. Basically, any thrown exception containing the statusCode and message properties will be properly populated and sent back as a response (instead of the default InternalServerErrorException for unrecognized exceptions).

### Custom exceptions

```typescript
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
// use
@Get()
async findAll() {
  throw new ForbiddenException();
}
```

### Built-in HTTP exceptions

> 客户端错误

+ BadRequestException
+ UnauthorizedException
+ NotFoundException
+ ForbiddenException
+ NotAcceptableException
+ RequestTimeoutException
+ ConflictException
+ GoneException
+ PayloadTooLargeException
+ UnsupportedMediaTypeException
+ UnprocessableEntityException

> 服务器错误

+ InternalServerErrorException
+ NotImplementedException
+ ImATeapotException

> 网关错误

+ BadGatewayException
+ ServiceUnavailableException
+ GatewayTimeoutException

> 其他错误

+ HttpVersionNotSupportedException
+ MethodNotAllowedException
+ PreconditionFailedException

```ts
throw new BadRequestException('Something bad happened', { 
  cause: new Error(), 
  description: 'Some error description' 
})
```

> filter

```ts
// 全局异常过滤
app.useGlobalFilters(new HttpExceptionFilter()); // 全局异常过滤器
```

### Injection scopes

A provider can have any of the following scopes:

+ DEFAULT A single instance of the provider is shared across the entire application. The instance lifetime is tied directly to the application lifecycle. Once the application has bootstrapped, all singleton providers have been instantiated. Singleton scope is used by default.

+ REQUEST A new instance of the provider is created exclusively for each incoming request. The instance is garbage-collected after the request has completed processing.

+ TRANSIENT Transient providers are not shared across consumers. Each consumer that injects a transient provider will receive a new, dedicated instance.

## Q&A

Q: 1. 为什么要使用 DynamicModule
> DynamicModule 是一个特殊的模块，它可以在运行时动态地创建模块，而不是在编译时创建模块。
@: 2. 为什么要使用 global
> global 属性表示该模块是否是全局模块，如果设置为 true，那么该模块就会被所有的模块所共享。
Q: 3. 为什么要使用 useFactory
> useFactory 是一个工厂函数，它会在模块初始化的时候被调用，而不是在编译时调用。
Q: 4. 为什么要使用 CommonService
> CommonService 是一个服务，它会在模块初始化的时候被调用，而不是在编译时调用。
