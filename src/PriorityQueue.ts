class PriorityNode<T> {
  readonly value: T;
  readonly priority: number;

  constructor(val: T, priority: number) {
      this.priority = priority;
      this.value = val;
  }
}

export class PriorityQueue<T> {
  readonly values: PriorityNode<T>[];

  constructor() {
      this.values = [];
  }

  isEmpty() { 
    return !(this.values.length > 0);
  }

  enqueue(value: T, priority: number) {
      let index = this.values.length;
      let newNode = new PriorityNode<T>(value, priority)

      this.values.push(newNode);

      let parent: PriorityNode<T>;
      while (index > 0) {
          let parentIndex = Math.floor((index - 1) / 2);
          parent = this.values[parentIndex];
          if (newNode.priority > parent.priority) {
              this.values[index] = parent;
              this.values[parentIndex] = newNode;
          }
          index = parentIndex
      }
      return this.values;
  }

  dequeue() {
      if (this.values.length <= 1) {
          return this.values.pop();
      }
      let max = this.values[0];

      this.values[0] = this.values.pop();
      let index = 0;

      let maxChild: PriorityNode<T>;
      let maxChildIdx = index
      let minChild: PriorityNode<T>;
      let minChildIdx = index
      let current = this.values[0];
    do {
      let leftChildIdx = index * 2 + 1;
      let rightChildIdx = index * 2 + 2;
      let leftChild = this.values[leftChildIdx];
      let rightChild = this.values[rightChildIdx];

      if (leftChild === undefined) {
        break;
      }

      if (rightChild === undefined) {
        this.values[leftChildIdx] = current;
        this.values[index] = leftChild;
        index = leftChildIdx;
        continue;
      }

      if (leftChild.priority > rightChild.priority) {
        maxChildIdx = leftChildIdx;
        minChildIdx = rightChildIdx;
      } else {
        maxChildIdx = rightChildIdx;
        minChildIdx = leftChildIdx;
      }

      maxChild = this.values[maxChildIdx];
      minChild = this.values[minChildIdx];
      if (maxChild.priority > current.priority) {
        this.values[maxChildIdx] = current;
        this.values[index] = maxChild;
        index = maxChildIdx;
      } else if (minChild.priority > current.priority) {
        this.values[minChildIdx] = current;
        this.values[index] = minChild;
        index = minChildIdx;
      } else {
        break;
      }
    } while (index < this.values.length - 1);

      return max;
  }

}