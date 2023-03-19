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