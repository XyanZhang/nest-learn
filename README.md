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

```nestjs

```

## modules

![provider](https://docs.nestjs.com/assets/Modules_1.png)

>
> Each application has at least one module, a root module. The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies
>

