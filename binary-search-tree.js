// const { round } = require("lodash");

// const { replace } = require("lodash");

function Node(data){
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
}

class Tree {
    constructor(array, root) {
        this.array = array;
        this.root = root;
    }

    insert(value, node = this.root){
        if(value == node.data){
        } else if(value < node.data){
            if(node.leftChild == null){
                let newNode = new Node(value);
                node.leftChild = newNode;
            } else {
                this.insert(value, node.leftChild);
            }
        } else{
            if(node.rightChild == null){
                let newNode = new Node(value);
                node.rightChild = newNode;
            } else {
                this.insert(value, node.rightChild);
            }
        }
    }
    find(value, node = this.root){
        if(value == node.data){
            return node;
        } else if(value < node.data){
            if(node.leftChild == null){
                return null;
            } else {
                return this.find(value, node.leftChild);
            }
        } else{
            if(node.rightChild == null){
                return null;
            } else {
                return this.find(value, node.rightChild);
            }
        }
    }
    deleteItem(value, node = this.root, oldNode = null){
         if(node.data == value){
            let replaceNode;
            console.log(oldNode, node);
            if(node.leftChild == null && node.rightChild == null){
                replaceNode = null;
            } else if(node.leftChild != null && node.rightChild != null){
                replaceNode = node.rightChild;
                if(replaceNode.leftChild == null){
                    replaceNode.leftChild = node.leftChild;
                } else {
                    let oldReplaceNode = node;
                    while(replaceNode.leftChild != null){
                        oldReplaceNode = replaceNode;
                        replaceNode = replaceNode.leftChild;
                    }
                    oldReplaceNode.leftChild = null;
                    replaceNode.leftChild = node.leftChild;
                    replaceNode.rightChild = node.rightChild;
                }
            } else if(node.leftChild == null || node.rightChild == null){
                if(node.leftChild != null){
                    replaceNode = node.leftChild;
                } else {
                    replaceNode = node.rightChild;
                }
            }
            if(oldNode){
                if(value < oldNode.data ){
                    oldNode.leftChild = replaceNode;
                } else {
                    oldNode.rightChild = replaceNode;
                }
            } else {
                this.root = replaceNode;
            }
        } else if(value < node.data){
            if(node.leftChild == null){
                return null;
            } else {
                this.deleteItem(value, node.leftChild, node);
            }
        } else{
            if(node.rightChild == null){
                return null;
            } else {
                this.deleteItem(value, node.rightChild, node);
            }
        }
    }
    levelOrder(){
        let tab = [];
        let queue = [];
        let currentNode = this.root;
        queue.push(this.root);
        while(queue.length != 0){
            tab.push(currentNode.data);
            if(currentNode.leftChild != null){
                queue.push(currentNode.leftChild);
            }
            if(currentNode.rightChild != null){
                queue.push(currentNode.rightChild);
            }
            currentNode = queue[1];
            queue.shift();
        }
        return tab;
    }
    inOrder(currentNode = this.root, parentNode = null, tab = []){
        if(currentNode.leftChild){
            this.inOrder(currentNode.leftChild, currentNode, tab);
            tab.push(currentNode.data);
        } if(currentNode.rightChild){
            this.inOrder(currentNode.rightChild, currentNode, tab);
        } if(!currentNode.leftChild && !currentNode.rightChild){
            tab.push(currentNode.data)
            return parentNode;
        }
        return tab;
    }
    preOrder(currentNode = this.root, parentNode = null, tab = []){
        tab.push(currentNode.data);
        if(currentNode.leftChild){
            this.preOrder(currentNode.leftChild, currentNode, tab);
        } if(currentNode.rightChild){
            this.preOrder(currentNode.rightChild, currentNode, tab);
        } if(!currentNode.leftChild && !currentNode.rightChild){
            return parentNode;
        }
        return tab;
    }
    postOrder(currentNode = this.root, parentNode = null, tab = []){
        if(currentNode.leftChild){
            this.postOrder(currentNode.leftChild, currentNode, tab);
        } if(currentNode.rightChild){
            this.postOrder(currentNode.rightChild, currentNode, tab);
        }if(!currentNode.leftChild && !currentNode.rightChild){
            tab.push(currentNode.data)
            return parentNode;
        } 
        if(tab.find(element => currentNode.leftChild || currentNode.rightChild)){
            tab.push(currentNode.data);
        }
        return tab;
    }
    height(nodeValue, count = 0, parentNode = null){
        if(!this.root){
                return -1
            }
            if(!nodeValue){
                return -1;
            }
            let leftHeight = this.height(nodeValue.leftChild);
            let rightHeight = this.height(nodeValue.rightChild);
            return Math.max(leftHeight, rightHeight) + 1;  
    }
    depth(nodeValue, nodeRoot = this.root, count = 0){
        if(nodeValue.data == nodeRoot.data){
            return count;
        } else if(nodeValue < nodeRoot.data){
            if(nodeRoot.leftChild == null){
                return null;
            } else {
                return this.depth(nodeValue, nodeRoot.leftChild, ++count);
            }
        } else{
            if(nodeRoot.rightChild == null){
                return null;
            } else {
                return this.depth(nodeValue, nodeRoot.rightChild, ++count);
            }
        }
    }
    isBalanced(){
        let leftHeight = this.height(this.root.leftChild);
        let rightHeight = this.height(this.root.rightChild);
        let compare = leftHeight - rightHeight;
        if(compare < 0){
            compare = compare - (compare*2);
        }
        if(compare > 1){
            return false;
        }
        return true;
    }
    rebalance(){
        let array1 = this.inOrder();
        let midIndex = Math.ceil(array1.length/2);
        
        for(let i = 0; i < midIndex; i++){
            let tmp = array1.shift();
            array1.push(tmp);
        }
        return buildTree(array1);
    }
}

function buildTree(array){
    let firstNode = new Node(array[0]);
    for(let element of array){
        let node = new Node(element);
        orderTree(firstNode, node);
    }
    return firstNode;
}
function orderTree(firstNode, element){
    if(element.data == firstNode.data){
    } else if( element.data < firstNode.data){
        if(firstNode.leftChild == null){
            firstNode.leftChild = element;
        } else {
            orderTree(firstNode.leftChild, element);
        }
    } else{
        if(firstNode.rightChild == null){
            firstNode.rightChild = element;
        } else {
            orderTree(firstNode.rightChild, element);
        }
    }
}

let mainArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let mainTree = new Tree(mainArray, buildTree(mainArray));
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

// prettyPrint(mainTree.root);
// mainTree.insert(3);
// console.log(mainTree.find(12));
// mainTree.deleteItem(5)
// prettyPrint(mainTree.root);
// console.log(mainTree.levelOrder());
// console.log(mainTree.inOrder());
// console.log(mainTree.preOrder());
// console.log(mainTree.postOrder());
// console.log(mainTree.height(mainTree.find(8)));
// console.log(mainTree.depth(mainTree.find(12)));
// console.log(mainTree.rebalance());
// console.log(mainTree.isBalanced());
// prettyPrint(mainTree.rebalance());

/*Tie it all together*/
let centArray = new Array(100);
for(let i = 0; i < centArray.length; i++){
    let n = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    centArray[i] = n;
}
let centTree = new Tree(centArray, buildTree(centArray));
console.log(centTree.rebalance());
console.log(centTree.isBalanced());
console.log(centTree.levelOrder());
console.log(centTree.inOrder());
console.log(centTree.preOrder());
console.log(centTree.postOrder());
prettyPrint(centTree.root);