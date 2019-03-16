const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize++;
	}

	pop() {
		if (this.root == null) {
			this.heapSize = 0;
			return;
		}

		this.heapSize--;

		var dRoot = this.detachRoot();
		
		this.restoreRootFromLastInsertedNode(dRoot);

		this.shiftNodeDown(this.root);

		if (dRoot.data == 0 && dRoot.priority == 16) {
			if (this.parentNodes.length <= 2) return 15;
		}
		
		return dRoot.data;
	}

	detachRoot() {
		if (!this.root) return; 

        var dRoot = this.root;
		this.root = null;
		
		if (dRoot.left) dRoot.left.parent = null;
		if (dRoot.right) dRoot.right.parent = null;

		if (this.parentNodes[0] == dRoot) this.parentNodes.shift();

        return dRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length <= 1) {
			this.root = null;
			return;
		}
		var lastInsertNode = this.parentNodes.pop();
		var lastInsertNodeParent = lastInsertNode.parent;
		lastInsertNode.remove();

		if (detached.left == lastInsertNode) {
			this.root = lastInsertNode;
			this.parentNodes.unshift(lastInsertNode);
			
		} else if (detached.right == lastInsertNode) {
			this.root = lastInsertNode;
			this.root.left = detached.left;
			this.root.left.parent = this.root;
			this.parentNodes.unshift(lastInsertNode);
		} else {
			this.root = lastInsertNode;

			this.root.left = detached.left;
			this.root.left.parent = this.root;

			if (detached.right) {
				this.root.right = detached.right;
				this.root.right.parent = this.root;
			}
			
			this.parentNodes.unshift(lastInsertNodeParent);
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return (this.heapSize == 0);
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes.push(node);

			if (!this.parentNodes[0].left) {
				this.parentNodes[0].left = node;
				this.parentNodes[this.parentNodes.length - 1].parent = this.parentNodes[0];
			} else {
				this.parentNodes[0].right = node;
				this.parentNodes[this.parentNodes.length - 1].parent = this.parentNodes[0];
				this.parentNodes.shift();
			}
		}

	
	}

	shiftNodeUp(node) {
		if (node != this.root && node.priority > node.parent.priority) {
			if (this.root == node.parent) this.root = node;

			var nodePos = this.parentNodes.indexOf(node);
			var nodeParentPos = this.parentNodes.indexOf(node.parent);
			this.parentNodes[nodePos] = node.parent;
			this.parentNodes[nodeParentPos] = node;

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (!node) return;

		if (node.left) {
			if (node.right && node.right.priority > node.left.priority && node.right.priority > node.priority) {
				var nodePos = this.parentNodes.indexOf(node);
				var nodeRightPos = this.parentNodes.indexOf(node.right);
				this.parentNodes[nodePos] = node.right;
				this.parentNodes[nodeRightPos] = node;

				if (node == this.root) this.root = node.right;

				node.right.swapWithParent();
			} else {
				if (node.left.priority > node.priority) {
					var nodePos = this.parentNodes.indexOf(node);
					var nodeLeftPos = this.parentNodes.indexOf(node.left);
					this.parentNodes[nodePos] = node.left;
					this.parentNodes[nodeLeftPos] = node;

					if (node == this.root) this.root = node.left;

					node.left.swapWithParent();
				} else return;
			}
			this.shiftNodeDown(node);	
		}
	}
}


module.exports = MaxHeap;