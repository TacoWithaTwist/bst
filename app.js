class Tree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  }
  insert(value, node = this.root) {
    if (value > node.data) {
      if (node.right === null) {
        node.right = new Node(value);
      } else {
        this.insert(value, node.right);
      }
    }
    if (value < node.data) {
      if (node.right === null) {
        node.left = new Node(value);
      } else {
        this.insert(value, node.left);
      }
    }
  }
  delete(value, currentNode = this.root) {
    if (currentNode === null) {
      return currentNode;
    }
    if (currentNode.data > value) {
      currentNode.left = this.delete(value, currentNode.left);
      return currentNode;
    } else if (currentNode.data < value) {
      currentNode.right = this.delete(value, currentNode.right);
    }
    if (currentNode.left == null) {
      let temp = currentNode.right;
      return temp;
    } else if (currentNode.right == null) {
      let temp = currentNode.left;
      return temp;
    } else {
      let succParent = currentNode;
      let succ = currentNode.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }
      if (succParent !== currentNode) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }
      currentNode.data = succ.data;
      return currentNode;
    }
  }
  find(value, node = this.root) {
    if (node.data === value) {
      return node;
    } else if (value > node.data) {
      return this.find(value, node.right);
    } else if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return 'Not Found';
    }
  }
  levelOrderIter(callback) {
    if (!this.root) return [];
    const array = [this.root];
    const result = [];
    while (array.length) {
      const node = array.shift();
      if (node.left) {
        array.push(node.left);
      }
      if (node.right) {
        array.push(node.right);
      }
      array.unshift();
      if (callback) {
        callback(node);
      }
      result.push(node.data);
    }
    if (!callback) {
      return result;
    }
  }
  inorder(node = this.root, callback, result = []) {
    if (!this.root) return [];
    if (node === null) return;
    this.inorder(node.left, callback, result);
    callback ? callback(node) : result.push(node.data);
    this.inorder(node.right, callback, result);
    if (result) return result;
  }
  preorder(callback) {
    if (!this.root) return [];
    const stack = [this.root];
    const results = [];
    while (stack.length) {
      const node = stack.pop();
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
      if (callback) callback(node);
      console.log(callback(node));
      results.push(node.data);
    }
    if (!callback) return results;
  }
  postorder(callback) {
    if (!this.root) return [];
    const stack = [this.root];
    const results = [];
    while (stack.length) {
      const node = stack.pop();
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
      if (callback) callback(node);
      results.push(node.data);
    }
    if (!callback) return results.reverse();
  }
  height(node = this.root) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(node = this.root, depth = 0) {
    if (node === this.root) {
      return 0;
    }
    if (node.data > this.root.data) {
      return this.depth(node.right, depth + 1);
    }
    if (node.data < this.root.data) {
      return this.depth(node.left, depth + 1);
    }
    if (node.data === this.root.data) {
      return depth;
    }
  }
  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }
    if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
      return false;
    } else {
      return true;
    }
  }
  rebalance() {
    return this.buildTree(this.inorder());
  }
}

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
const newArray = [1, 2, 3, 4, 5];
const newTree = new Tree(newArray);
newTree.insert(6);
console.log(newTree);
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
prettyPrint(newTree.root);
console.log(newTree);
prettyPrint(newTree.root);
console.log(newTree.levelOrderIter());
console.log(newTree.isBalanced());
console.log(newTree.inorder());
prettyPrint(newTree.rebalance());
