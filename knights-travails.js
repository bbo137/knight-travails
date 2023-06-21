#!/usr/bin/node

class Node {
  constructor(row, col, distance) {
    this.row = row;
    this.col = col;
    this.distance = distance;
    this.first = null;
    this.second = null;
    this.third = null;
    this.fourth = null;
    this.fifth = null;
    this.sixth = null;
    this.seventh = null;
    this.eighth = null;
  }

  getPosition() {
    return `${this.row}, ${this.col}`;
  }
}

function isValid(row, col) {
  return row <= 7 && row >= 0 && col <= 7 && col >= 0;
}

const validMoves = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [-2, 1],
  [-1, 2],
];

const getPaths = (row, col) => {
  const paths = [];
  validMoves.forEach((move) => {
    const [y, x] = move;
    const pathX = parseInt(row, 10) + x;
    const pathY = parseInt(col, 10) + y;

    if (isValid(pathX, pathY)) paths.push([pathX, pathY]);
    else paths.push(null);
  });
  return paths;
};

const buildNodes = (paths, distance) => {
  const nodeList = [];
  paths.forEach((path) => {
    if (path !== null) {
      const [row, col] = path;
      const node = new Node(row, col, distance + 1);
      nodeList.push(node);
    } else {
      nodeList.push(null);
    }
  });
  return nodeList;
};

function knightPaths(xStart, yStart, xEnd, yEnd) {
  const queue = [];
  const knight = new Node(xStart, yStart, 0);
  queue.push(knight);
  const visited = new Set();
  // while queue is not empty or destination found
  while (queue.length > 0) {
    const node = queue.shift();
    const { row, col, distance } = node;
    // destination found?
    if (row === xEnd && col === yEnd) return knight;
    visited.add(node.getPosition());
    // try posible paths
    const paths = getPaths(row, col);

    const nodes = buildNodes(paths, distance);

    const childs = [
      'first',
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
      'seventh',
      'eighth',
    ];

    // set knight possible paths (build graph) & set queue
    nodes.forEach((itNode, i) => {
      if (itNode) {
        node[`${childs[i]}`] = itNode;
        if (!visited.has(itNode.getPosition())) queue.push(itNode);
      }
    });
  }
  return null;
}

// out every posible path find the one containing the results
function findPath(node = this.root, root = this.root, count = []) {
  if (!root) return null;

  const set = new Set(count);
  const temp = Array.from(set);
  temp.push(root.getPosition());

  if (root.row === node.row && root.col === node.col) return temp;

  const first = findPath(node, root.first, temp);
  const second = findPath(node, root.second, temp);
  const third = findPath(node, root.third, temp);
  const fourth = findPath(node, root.fourth, temp);
  const fifth = findPath(node, root.fifth, temp);
  const sixth = findPath(node, root.sixth, temp);
  const seventh = findPath(node, root.seventh, temp);
  const eigth = findPath(node, root.eigth, temp);

  if (first) return first;
  if (second) return second;
  if (third) return third;
  if (fourth) return fourth;
  if (fifth) return fifth;
  if (sixth) return sixth;
  if (seventh) return seventh;
  if (eigth) return eigth;

  return null;
}

const start = [4, 4];
const end = [2, 2];

const graph = knightPaths(start[0], start[1], end[0], end[1]);

const helperNode = new Node(end[0], end[1]);
const results = findPath(helperNode, graph);
console.log(
  `finished in ${
    results.length - 1
  } moves. the shortest path between [${start}] and [${end}] is:`
);

results.forEach((result) => {
  console.log(`[${result}]`);
});
