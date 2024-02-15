const node1 = {
    prev: null,
    next: null,
    data: "A"
}
const node2 = {
    prev: null,
    next: null,
    data: "B"
}
const node3 = {
    prev: null,
    next: null,
    data: "C"
}
node1.next = node2;
node2.prev = node1;
node2.next = node3;
node3.prev = node2;

class LinkedList {
    constructor() {
        this.head = node1
        this.tail = node3
    }

    dumpList() {
        let node = this.head;
        while(node != null) {
            console.log(`Node: ${node.data} , Prev: ${node.prev?.data} , Next: ${node.next?.data}`)
            node = node.next;
        }
    }

    newNode(prev, next, data) {
        return {
            prev: prev,
            next: next,
            data: data
        }
    }

    isEmpty() {
        return this.head === null && this.tail === null;
    }

    setEmpty() {
        this.head = this.tail = null;
    }

    addLast(nodeData) {
        if (!this.isEmpty()) {
            let node = this.head;

            while (node.next != null) {
                node = node.next;
            }
            const newNode = this.newNode(node, null, nodeData)
            this.tail = newNode;
            node.next = newNode;
        } else {
            this.head = this.tail = this.newNode(null, null, nodeData);
        }
    }

    addFirst(nodeData) {
        if(!this.isEmpty()) {
            let node = this.head;
            const newNode = this.newNode(null, node, nodeData)
            node.prev = newNode;
            newNode.next = node;
            this.head = newNode
        } else {
            this.head = this.tail = this.newNode(null, null, nodeData);
        }
    }

    removeLast() {
        if(this.isEmpty()) {
            console.log('No nodes')
            return;
        }
        let node = this.tail;
        if(node === this.head) {
            this.setEmpty();
        } else {
            this.tail = node.prev;
            node.prev.next = null;
            node.prev = null;
        }
    }

    removeFirst() {
        if(this.isEmpty()) {
            console.log('No nodes')
            return;
        }
        let node = this.head;
        if(node.next != null) {
            this.head = node.next;
            node.next.prev = null;
        } else {
            this.setEmpty();
        }
    }


    removeNode(nodeData) {
        if(this.isEmpty()) {
            console.log('No nodes')
            return;
        }
        let node = this.head;
        
        while(node != null && node.data != nodeData) {
            node = node.next;
        }

        if(node === this.head && node === this.tail) {
            this.setEmpty();
        } else if (node === this.head) {
            node.next.prev = null;
            this.head = node.next
            node.next = null;
        } else if(node === this.tail) {
            node.prev.next = null;
            this.tail = node.prev
            node.prev = null
        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
    }

    insertBeforeNode(newNodeData, existingNodeData) {
        if(this.isEmpty()) {
            console.log('No nodes')
            return;
        }
        let node = this.head;

        while(node != null && node.data != existingNodeData) {
            node = node.next;
        }

        if(node === this.head) {
            const newNode = this.newNode(null, node, newNodeData);
            node.prev = newNode;
            this.head = newNode;
            console.log(this.head)
        } else {
            const newNode = this.newNode(node.prev, node, newNodeData);
            node.prev.next = newNode
            node.prev = newNode
        }
    }

    insertAfterNode(newNodeData, existingNodeData) {
        if(this.isEmpty()) {
            console.log('No nodes')
            return;
        }
        let node = this.head;
        while(node != null && node.data !== existingNodeData) {
            node = node.next;
        }

        if(node === this.tail) {
            const newNode = this.newNode(node, null, newNodeData);
            this.tail = newNode;
            node.next = newNode;
            console.log(this.tail)
        } else {
            const newNode = this.newNode(node, node.next, newNodeData);
            node.next.prev = newNode;
            node.next = newNode;
        }
    }

    swapNodes(data1, data2) {
        if (this.head === null || this.tail === null) {
            console.log('The list is 0-1 long, add a node instead');
            return;
        }
    
        let node1 = null;
        let node2 = null;
        let temp = this.head;
        while(temp != null) {
            if(temp.data === data1) {
                node1 = temp;
            } else if(temp.data === data2) {
                node2 = temp;
            }
            temp = temp.next;
        }

        if(node1 === this.head) {
            this.head = node2;
        } else if(node2 === this.head) {
            this.head = node1;
        } else if(node1 === this.tail) {
            this.tail = node2;
        } else if(node2 === this.tail) {
            this.tail = node1;
        }

        let swapTemp = node1.next;
        node1.next = node2.next;
        node2.next = swapTemp;

        if(node1.next != null) {
            node1.next.prev = node1
        }
        if(node2.next != null) {
            node2.next.prev = node2;
        }

        temp = node1.prev;
        node1.prev = node2.prev;
        node2.prev = temp;

        if(node1.prev != null) {
            node1.prev.next = node1;
        }
        if(node2.prev != null) {
            node2.prev.next = node2;
        }

    }

    nodeAt(index) {
        let node = this.head;
        let i = 0
        while(i >= 0) {
            if(index === i) {
                return node;
            }
            if(node.next != null) {
                node = node.next;
                i++;
            } else {
                console.log(`No element at index ${index}`);
                return;
            }
            
        }
    }

    remove(index) {
        let node = this.nodeAt(index);

        if(node === this.tail && node === this.head) {
            this.setEmpty()
            return;
        }

        if(node === this.tail) {
            this.tail = node.prev;
            node.prev.next = null;
            node.prev = null;
        } else if(node === this.head) {
            this.head = node.next;
            node.next.prev = null;
            node.next = null;
        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            node.next = null;
            node.prev = null;
        }
    }


}
