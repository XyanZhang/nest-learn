
// 解释一下下面的代码
// 异步提供者的使用
// 1. 异步提供者的使用，必须要在模块中使用

let aDemo = {
  provide: 'ASYNC_CONNECTION',
  useFactory: async () => {
    // @ts-ignore
    const connection = await createConnection(options);
    return connection;
  },
};

// Injection
// @Inject('ASYNC_CONNECTION').
