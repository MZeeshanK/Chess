import { Node } from "../types";

export class Stack<G> {
  public length: number;
  private head?: Node<G>;

  constructor() {
    this.head = undefined;
    this.length = 0;
  }

  push(item: G): void {
    const node = { value: item } as Node<G>;

    this.length++;
    if (!this.head) {
      this.head = node;
      return;
    }

    node.prev = this.head;
    this.head = node;
  }

  pop(): G {
    this.length = Math.max(0, this.length - 1);

    if (this.length === 0) {
      const head = this.head as Node<G>;
      this.head = undefined;
      return head.value;
    }

    const head = this.head as Node<G>;
    this.head = head.prev;

    return head.value;
  }

  peek(): G | undefined {
    return this.head?.value;
  }

  clear(): void {
    this.length = 0;
    this.head = undefined;
  }
}
