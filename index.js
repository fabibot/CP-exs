class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;               
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head
    }
}

let node1 = new ListNode('Carlos', '123');
let list = new LinkedList(node1);
let node2 = new ListNode('Bob', '456');
let node3 = new ListNode('Patrik', '789');
node1.next = node2;
node2.next = node3;

class HashMap{
    constructor(name){
        this.name = name;
    }
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) %16 ;
        }
        return hashCode;
    }


    set(key, value){
        let currentNode = list.head;
        while(currentNode != null){
            if(currentNode.key == key){
                currentNode.value = value;
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
        // s'il y a collision 
        //     gerer la situation 

    }

    get(key){
        let currentNode = list.head;
        while(currentNode != null){
            if(currentNode.key == key){
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    has(key){
        let currentNode = list.head;
        while(currentNode != null){
            if(currentNode.key == key){
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }
    remove(key){
        let currentNode = list.head;
        while(currentNode != null){
            if(currentNode.next.key == key){
                currentNode.next = null;
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }
    length(){
        let currentNode = list.head;
        let countNode = 0;
        while(currentNode != null){
            currentNode = currentNode.next;
            countNode += 1;
        }
        return countNode;
    }
    clear(node = list.head){
        if(node.next == null){
            return node;
        }
        console.log(node);
        return this.clear(node.next).next == null;
        //mouai....  à revoir
    }
    keys(){
        let tab = [];
        let currentNode = list.head;
        while(currentNode != null){
            tab.push(currentNode.key);
            currentNode = currentNode.next;
        }
        return tab;
    }
    values(){
        let tab = [];
        let currentNode = list.head;
        while(currentNode != null){
            tab.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return tab;
    }
    entries(){
        let tab = [];
        let currentNode = list.head;
        while(currentNode != null){
            tab.push([currentNode.key, currentNode.value]);
            currentNode = currentNode.next;
        }
        return tab;
    }
}

let hashMap1 = new HashMap();
// console.log(hashMap1.hash('Carlos'));
// hashMap1.set('Carlos', '124');
// console.log(hashMap1.get('Carlos'));
// console.log(hashMap1.has('Bob'));
// console.log(hashMap1.remove('Bob'));
// console.log(hashMap1.length());
// hashMap1.clear();
// console.log(hashMap1.keys());
// console.log(hashMap1.values());
console.log(hashMap1.entries());


