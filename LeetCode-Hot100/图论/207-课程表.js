/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // 所有课程所需的前序课程数量
  let plan = new Array(numCourses).fill(0)
  // 每个课程所对应的后序课程
  let afterMap = {}

  for (let i = 0; i < prerequisites.length; i++) {
    // 课程编号刚好对应plan下标
    plan[prerequisites[i][0]]++
    if (afterMap[prerequisites[i][1]]) {
      afterMap[prerequisites[i][1]].push(prerequisites[i][0])
    } else {
      afterMap[prerequisites[i][1]] = [prerequisites[i][0]]
    }
  }

  // 可以直接上的课程（无前序课程）
  let queue = []
  // 统计所有课程所需的前序课程数
  for (let i = 0; i < plan.length; i++) {
    if (!plan[i]) {
      queue.push(i)
    }
  }

  // 记录已上课程数量
  let count = 0
  while (queue.length) {
    // 可以直接上的课程
    let course = queue.shift()
    count++
    // 这门课程对应的后序课程
    let after = afterMap[course]
    // 如果有后序课程的话
    if (after && after.length) {
      for (let i = 0; i < after.length; i++) {
        // 当前出栈的课程是这些后序课程的前序课程，所以更新数量
        plan[after[i]]--
        if (plan[after[i]] === 0) {
          // 这些课也可以上了
          queue.push(after[i])
        }
      }
    }
  }

  return count === numCourses
}
