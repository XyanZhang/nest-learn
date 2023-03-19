# next-learn project
> next project for learning
## init
### 命令 
```shell
$ npm i -g @nestjs/cli
$ nest new project-name
```
### 初始化结构
```
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

## controller
<div style="width: 60%">
<img src="https://docs.nestjs.com/assets/Controllers_1.png">
<div>

```shell
$ nest g controller cats # 生成controller， an optional route path prefix of cats； route: /cats
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