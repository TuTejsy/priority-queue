class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			this.left.parent = this;
		} else if (!this.right) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if (node.data == this.left.data && node.priority == this.left.priority) {
			this.left.parent = null;
			this.left = null;
		} else if (node.data == this.right.data && node.priority == this.right.priority) {
			this.right.parent = null;
			this.right = null;
		} else throw  error ('it is not a child of this node');
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			//указатели на текущее окружение 
			var firstParent = this.parent;
			var firstParentParent = this.parent.parent;

			var firstParentLeft = this.parent.left;
			var firstParentRight = this.parent.right;

			var firstLeft = this.left;
			var firstRight = this.right;


			if (this.parent.parent != null) {
				if (this.parent.parent.left == this.parent) {
					this.parent.parent.left = this;
				} else {
					this.parent.parent.right = this;
				}
			}

			if (this.parent.left == this && this.parent.right != null) {
				this.parent.right.parent = this;
			} else if (this.parent.right == this && this.parent.left != null) {
				this.parent.left.parent = this;
			}
			
			if (this.left) {
				this.left.parent = this.parent;
			}
			if (this.right) {
				this.right.parent = this.parent;
			}
		
			if (this.parent.left == this) {
				this.left = firstParent;
				this.right = firstParentRight;
			} else if (this.parent.right == this) {
				this.right = firstParent;
				this.left = firstParentLeft;
			}

			this.parent.parent = this;
			this.parent.left = firstLeft;
			this.parent.right = firstRight;
			this.parent = firstParentParent;
		}
	}
}

module.exports = Node;
