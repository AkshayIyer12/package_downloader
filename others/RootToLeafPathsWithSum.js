// Definition for a  binary tree node
//    function TreeNode(data){
//      this.data = data
//      this.left = null
//      this.right = null
//    }

module.exports = { 
 //param A : root node of tree
 //param B : integer
 //return a array of array of integers
	pathSum : function(A, B){
        var arr1 = []
        if (A === null) return [[]];
        console.log(A)
        arr1.push(A.data)
        return this.findNodes(A, [[]], B - A.data, [])
	},
	findNodes: function (root, arrArr, sum, arr) {
            if (sum === 0 && root.left === -1 && root.right === -1) arrArr.push(arr);
            if (root.left !== -1) {
                arr.push(root.left);
                arrArr = this.findNodes(root.left, arrArr, sum - root.left, arr);
                arr.pop();
            }
            if (root.right !== -1) {
                arr.push(root.right);
                arrArr = this.findNodes(root.right, arrArr, sum - root.right, arr);
                arr.pop();
            }
            console.log(arrArr, sum)
            return arrArr
        }
};
