declare function readline(): string;

class BinaryTree<T = number> {

    public value: T = null;
    public leftTree: BinaryTree<T> = null;
    public rightTree: BinaryTree<T> = null;

    public add(value: T) {
        if (this.value === null) {
            this.value = value;
        } else {
            this._addToSubTree(value);
        }
    }

    private _addToSubTree(value: T) {
        if (this.isRight(value)) {
            this.rightTree = BinaryTreeFactory.createIfNullOrReturnIt(this.rightTree);
            this.rightTree.add(value);
        } else {
            this.leftTree = BinaryTreeFactory.createIfNullOrReturnIt(this.leftTree);
            this.leftTree.add(value);
        }
    }

    private isRight(value: T) {
        return value > this.value;
    }
}

class TraversalStrategy {

    public static preOrderTraversal<T>(tree: BinaryTree<T>): Array<T> {
        if (tree === null) {
            return [];
        }
        return [
            tree.value,
            ...this.preOrderTraversal(tree.leftTree),
            ...this.preOrderTraversal(tree.rightTree)
        ];
    }

    public static inOrderTraversal<T>(tree: BinaryTree<T>): Array<T> {
        if (tree === null) {
            return [];
        }
        return [
            ...this.inOrderTraversal(tree.leftTree),
            tree.value,
            ...this.inOrderTraversal(tree.rightTree)
        ];
    }

    public static postOrderTraversal<T>(tree: BinaryTree<T>): Array<T> {
        if (tree === null) {
            return [];
        }
        return [
            ...this.postOrderTraversal(tree.leftTree),
            ...this.postOrderTraversal(tree.rightTree),
            tree.value
        ];
    }

    public static levelOrderTraversal<T>(tree: BinaryTree<T>): Array<T> {
        return this._levelOrderTraversal(tree, 0)
            .sort((a, b) => a.order - b.order)
            .map(value => value.value);
    }

    private static _levelOrderTraversal<T>(tree: BinaryTree<T>, order: number): Array<{ value: T; order: number }> {
        if (tree === null) {
            return [];
        }
        return [
            {order, value: tree.value},
            ...this._levelOrderTraversal(tree.leftTree, order + 1),
            ...this._levelOrderTraversal(tree.rightTree, order + 1)
        ];
    }
}

class BinaryTreeFactory {

    public static fromInput(): BinaryTree<number> {
        const tree: BinaryTree<number> = new BinaryTree();
        const n: number = parseInt(readline(), 10);
        const inputs: string[] = readline().split(' ');
        for (let i = 0; i < n; i++) {
            tree.add(parseInt(inputs[i], 10));
        }
        return tree;
    }

    public static createIfNullOrReturnIt<T>(tree: BinaryTree<T>): BinaryTree<T> {
        return tree ?? new BinaryTree();
    }
}

const graph: BinaryTree<number> = BinaryTreeFactory.fromInput();

console.log(TraversalStrategy.preOrderTraversal(graph).join(' '));
console.log(TraversalStrategy.inOrderTraversal(graph).join(' '));
console.log(TraversalStrategy.postOrderTraversal(graph).join(' '));
console.log(TraversalStrategy.levelOrderTraversal(graph).join(' '));
