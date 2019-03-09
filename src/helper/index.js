import runtime from 'art-template/lib/runtime';

// 挂载过滤器
runtime.useFileter = function () {
  for (let i = 0; i < arguments.length; i++) {
    const func = arguments[i];
    if (typeof func === 'function') {
      this[func.name] = func;
    }
  }
}

export { runtime };
export * from './template-filter';
