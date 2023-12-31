class Tree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  buildTree(array, start, end) {
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
    console.log(array);
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
