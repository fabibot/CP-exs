class ListNode {
    constructor(data, value) {
        this.data = data;
        this.value = value;
        this.next = null;               
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head
    }
}

function append(val){
    let lastNode;
    let currentNode = list.head;
    while(currentNode.next != null){
        currentNode = currentNode.next;
    }
    let node = new ListNode(val);
    currentNode.next = node;
    // console.log("new node :" + currentNode.next.data)
}

function prepend(val){
    let node = new ListNode(val);
    let firstNode = list.head;
    node.next = firstNode;
    list.head = node;
}

function size(){
    let currentNode = list.head;
    let nodeCount = 1;
    while(currentNode.next != null){
        currentNode = currentNode.next;
        nodeCount += 1;
    }
    return nodeCount;
}

function head(){
    return list.head;
}

function tail(){
    let lastNode = list.head;
    while(lastNode.next != null){
        lastNode = lastNode.next;
    }
    return lastNode;
}

function at(index){
    let listSize = size;
    if(index == 1){
        return list.head;
    }
    let currentNode = list.head;
    let nodeCount = 1;
    while(nodeCount != index){
        if(currentNode == null){
            return null;
        }
        currentNode = currentNode.next;
        nodeCount += 1;
        if(nodeCount == index){
            break;
        }
        
    }
    return currentNode;
}

function pop(){
    let secondToLast = at(size()-1);
    secondToLast.next = null;
}

function contains(val){
    let currentNode = list.head;
        while(currentNode != null){
            if(currentNode.data == val){
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
}

function find(val){
    let currentNode = list.head;
    let nodeCount = 1;
    while(currentNode != null){
        if(currentNode.data == val){
            return nodeCount;
        }
        currentNode = currentNode.next;
        nodeCount += 1;
    }
    return null;
}

function toString(){
    let string = "";
    let currentNode = list.head;
    while(currentNode != null){
        string = `${string}(${currentNode.data}) -> `;
        currentNode = currentNode.next;

    }
    string = `${string}null`;
    return string;
}

function insertAt(value, index){
    let node = new ListNode(value);
    let nodeIndex = at(index);
    node.next = nodeIndex.next;
    nodeIndex.next = node;
}

function removeAt(index){
    let nodePre = at(index - 1);
    if(!nodePre){
        list.head = list.head.next
    } else {
        nodePre.next = at(index + 1);
    }
}



/******************************************************************************************************************************* */


let buckets = new Array(16);

function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
    }
    return hashCode;
}

class HashMap{
    set(key, value){
        if(!buckets[key]){
            let node = new ListNode(key, value);
            let nodeList = new LinkedList(node);
            buckets[key] = nodeList;
        } else {

            let node = new ListNode(key, value);
            buckets[key].head.next = node;
            // console.log(buckets[key].head);
        }
    }

    get(key){
        if(!buckets[key]){
            return null;
        } else {
            return buckets[key].head.value;
        }   
    }

    has(key){
        if(!buckets[key]){
            return false;
        } else {
            return true;
        }   
    }
    remove(key){
        if(!buckets[key]){
            return false;
        } else {
            buckets[key] == null;
            return true;
        }
    }
    length(){
        let count = 0;
        for(let element of buckets){
            if(element){
                count += 1;
                let currentNode = element.head;
                while(currentNode.next){
                    count += 1;
                    currentNode = currentNode.next;
                }
            }
        }
        return count;
    }
    clear(){
        for(let i = 0; i < buckets.length; i++){
            buckets[i] = null;
        }
    }
    keys(){
        let tab = [];
        for(let i = 0; i < buckets.length; i++){
            if(buckets[i]){
                tab.push(i);
            }
        }
        return tab;
    }
    values(){
        let tab = [];
        for(let element of buckets){
            if(element){
                tab.push(element.head.value);
                let currentNode = element.head;
                while(currentNode.next){
                    tab.push(currentNode.next.value);
                    currentNode = currentNode.next;
                }
            }
        }
        return tab;
    }
    entries(){
        let tab = [];
        for(let element of buckets){
            if(element){
                let index = buckets.indexOf(element)
                tab.push([index, element.head.value]);
                let currentNode = element.head;
                while(currentNode.next){
                    tab.push([index, currentNode.next.value]);
                    currentNode = currentNode.next;
                }
            }
        }
        return tab;
    }
}

let hashMap1 = new HashMap();
// console.log(hash('Carlos'))
hashMap1.set(hash('Carlos'), 'Carlos');
hashMap1.set(hash('Alex'), 'Alex');
hashMap1.set(hash('Lola'), 'Lola');
hashMap1.set(hash('Lolra'), 'Lolra');
// console.log(hashMap1.get(8));
// console.log(hashMap1.has('Lola'));
// console.log(hashMap1.remove('Bob'));
// console.log(hashMap1.length());
// hashMap1.clear();
// console.log(hashMap1.keys());
// console.log(hashMap1.values());
console.log(hashMap1.entries());