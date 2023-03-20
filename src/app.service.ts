import { Injectable } from '@nestjs/common';

// 这段代码是一个使用了 TypeScript 装饰器语法的类定义，类名为 AppService，被标记为可注入（Injectable），意味着可以在其他组件或服务中作为依赖注入使用。
// 该类中定义了一个名为 getHello 的方法，返回字符串 'Hello World!'。
// 在 TypeScript 中，通过使用类型注解和接口等特性，可以提高代码的可读性和可维护性，并帮助开发人员更早地发现一些潜在的代码问题。
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
