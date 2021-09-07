function arrayToTree(array) {
  if (!Array.isArray(array)) return
  // 借用Map可以存储任何数据类型的特点，以id为key，value存储该id对应的children们
  // 实现的关键是借用引用传递的原理，当我们遍历改动时，引用到的地方也会自动更新
  // 最后做一次过滤，只输出是顶级父节点的元素就可以
  const treeMap = new Map(
    array.map((item) => [item.id, { ...item, children: [] }])
  )
  for (let i in array) {
    // 有父元素
    if (array[i].pid) {
      // 当前元素（重点：这里的item是个引用值）
      const item = treeMap.get(array[i].id)
      // 从treeMap中取得父元素（这里是一定会有值的，因为我们在初始化时给所有元素都塞进了treeMap中）
      const pItem = treeMap.get(array[i].pid)
      // 将当前元素塞入父元素的children中
      pItem.children = pItem.children || []
      // 重点：因为塞入的item是个引用值，所以后续如果item更新了，这里的children也会自动更新
      pItem.children.push(item)
    }
  }
  return [...treeMap]
    .filter(([id, item]) => !item.pid)
    .map(([id, item]) => item)
}

const sampleArray = [
  { id: 1, name: 'a1' },
  { id: 2, name: 'a2', pid: 1 },
  { id: 3, name: 'a3', pid: 2 },
  { id: 4, name: 'a4', pid: 2 },
  { id: 5, name: 'a5', pid: 4 },
  { id: 6, name: 'a6', pid: 3 },
]

const tree = arrayToTree(sampleArray)

console.log(tree)
