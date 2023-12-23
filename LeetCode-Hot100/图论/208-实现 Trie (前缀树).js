var Trie = function () {
  this.tree = {}
}

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let path = this.tree
  for (const ch of word) {
    if (!path[ch]) {
      path[ch] = {}
    }
    path = path[ch]
  }
  path.isEnd = true
}

/**
 * 判断是否存在且是终点
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let path = this.tree

  for (const ch of word) {
    if (!path[ch]) {
      return false
    }
    path = path[ch]
  }
  return !!path.isEnd
}

/**
 * 判断是否存在
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let path = this.tree
  for (const ch of prefix) {
    if (!path[ch]) {
      return false
    }
    path = path[ch]
  }

  return path
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
