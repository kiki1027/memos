// 写一个控制并发的函数，接收并发量参数
/*
思路：
接收并发量参数 concurrency
当前占用并发量 currentCount
存储待执行任务队列 todoQueue

面向对象思想：主谓 => 谁 干了什么
谁：任务
干了什么：并发判断 -> 任务执行
*/
class PromiseQueue {
  // 初始化
  constructor(options = {}) {
    this.concurrency = options.concurrency || 1;
    this.currentCount = 0;
    this.todoQueue = [];
  }

  add(task) {
    // 插入待执行队列
    this.push(task);
    // 执行任务
    this.pop();
  }

  push(task) {
    this.todoQueue.push(task);
  }

  pop() {
    if (this.todoQueue.length === 0 || this.currentCount === this.concurrency) {
      return;
    }
    // 并发量判断
    const { task: todoTask } = this.todoQueue
      .sort((a, b) => b.priority - a.priority)
      .shift();
    // 是否存在待执行任务
    // 当前占用并发量+1
    this.currentCount++;
    const promise = todoTask();
    promise.then(this.finish.bind(this)).catch(this.finish.bind(this));
  }

  finish() {
    // 继续执行下一个任务
    this.currentCount--;
    // 为了展现出执行间隔的效果，这里加一个延时作区分
    this.pop();
  }
}

const queue = new PromiseQueue({ concurrency: 3 });

const promiseCreator = function (options = {}) {
  return new Promise((resolve, reject) => {
    console.log(options.id + " start ");
    setTimeout(function () {
      console.log(options.id + " OK, priority " + options.priority);
      resolve();
    }, options.time);
  });
};

const options = [
  {
    id: 1,
    time: 300,
    priority: 3,
  },
  {
    id: 2,
    time: 300,
    priority: 2,
  },
  {
    id: 3,
    time: 300,
    priority: 1,
  },
  {
    id: 4,
    time: 300,
    priority: 5,
  },
  {
    id: 5,
    time: 300,
    priority: 2,
  },
  {
    id: 6,
    time: 300,
    priority: 1,
  },
  {
    id: 7,
    time: 300,
    priority: 6,
  },
  {
    id: 8,
    time: 300,
    priority: 1,
  },
];

const formatTask = function (option) {
  return {
    task: () => promiseCreator(option),
    priority: option.priority,
  };
};

options.forEach((option, i) => {
  queue.add(formatTask(option));
});

queue.add(formatTask({ id: "first class", time: 100, priority: 10 }));
