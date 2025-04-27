
import { Problem } from "../core/models/problem.model";

export const sampleProblems: Problem[] = [
  {
    id: 1,
    title: 'Multi-Layered Sum Query',
    description: `<p data-start="450" data-end="638">You are given an <strong data-start="467" data-end="488">array of integers</strong> and a series of queries. Each query consists of two numbers, <strong data-start="550" data-end="555">L</strong> and <strong data-start="560" data-end="565">R</strong>, representing a range in the array, and an integer <strong data-start="617" data-end="622">T</strong> (target sum).</p>
<p data-start="640" data-end="755">For each query, determine <strong data-start="666" data-end="752">the number of unique pairs (i, j) (i &lt; j) within the subarray A[L:R] that sum to T</strong>.</p>
<p data-start="757" data-end="809">You must process up to <strong data-start="780" data-end="808">10^5 queries efficiently</strong>.</p>
<h4 data-start="816" data-end="837"><strong data-start="819" data-end="835">Input Format</strong></h4>
<ul data-start="838" data-end="1230">
<li data-start="838" data-end="922">The first line contains an integer <strong data-start="875" data-end="880">N</strong> (1 &le; N &le; 10^5) &mdash; the size of the array.</li>
<li data-start="923" data-end="1042">The second line contains <strong data-start="950" data-end="980">N space-separated integers</strong> <strong data-start="981" data-end="989">A[i]</strong> (&minus;10^9 &le; A[i] &le; 10^9) &mdash; the elements of the array.</li>
<li data-start="1043" data-end="1127">The third line contains an integer <strong data-start="1080" data-end="1085">Q</strong> (1 &le; Q &le; 10^5) &mdash; the number of queries.</li>
<li data-start="1128" data-end="1230">Each of the next <strong data-start="1147" data-end="1152">Q</strong> lines contains three integers: <strong data-start="1184" data-end="1195">L, R, T</strong> (1 &le; L &le; R &le; N, &minus;10^9 &le; T &le; 10^9).</li>
</ul>
<h4 data-start="1237" data-end="1259"><strong data-start="1240" data-end="1257">Output Format</strong></h4>
<p data-start="1260" data-end="1386">For each query, output a single integer &mdash; the number of unique pairs (i, j) in the subarray <strong data-start="1352" data-end="1362">A[L:R]</strong> whose sum equals <strong data-start="1380" data-end="1385">T</strong>.</p>`,
    difficulty: 'hard',
    userId: 3,
    timeLimit: 5000,
    memoryLimit: 2048,
    createdAt: '2024-02-12T10:00:00Z',
    note: `<h4 data-start="1497" data-end="1516"><strong data-start="1501" data-end="1516">Explanation</strong></h4>
<ul data-start="1517" data-end="1829">
<li data-start="1517" data-end="1593"><strong data-start="1519" data-end="1530">Query 1</strong>: Subarray <code data-start="1541" data-end="1552">[1, 3, 5]</code>, pairs <code data-start="1560" data-end="1567">(1,3)</code> &rarr; <strong data-start="1570" data-end="1580">1 pair</strong> sums to 4.</li>
<li data-start="1594" data-end="1707"><strong data-start="1596" data-end="1607">Query 2</strong>: Subarray <code data-start="1618" data-end="1632">[3, 5, 7, 9]</code>, pairs <code data-start="1640" data-end="1647">(3,7)</code>, <code data-start="1649" data-end="1656">(5,5)</code> (invalid) <code data-start="1667" data-end="1674">(1,9)</code> &rarr; <strong data-start="1677" data-end="1694">2 valid pairs</strong> sum to 10.</li>
<li data-start="1708" data-end="1829"><strong data-start="1710" data-end="1721">Query 3</strong>: Subarray <code data-start="1732" data-end="1749">[1, 3, 5, 7, 9]</code>, pairs <code data-start="1757" data-end="1764">(1,7)</code>, <code data-start="1766" data-end="1773">(3,5)</code>, <code data-start="1775" data-end="1782">(5,3)</code> (same as before) &rarr; <strong data-start="1802" data-end="1819">3 valid pairs</strong> sum to 8.</li>
</ul>
<h4 data-start="1836" data-end="1867"><strong data-start="1839" data-end="1867">Constraints &amp; Challenges</strong></h4>
<ol data-start="1868" data-end="2201">
<li data-start="1868" data-end="1960"><strong data-start="1871" data-end="1893">Large Constraints:</strong> With <strong data-start="1899" data-end="1914">N, Q &le; 10^5</strong>, a naive <strong data-start="1924" data-end="1936">O(N &times; Q)</strong> approach is too slow.</li>
<li data-start="1961" data-end="2079"><strong data-start="1964" data-end="1993">Efficient Query Handling:</strong> Using <strong data-start="2000" data-end="2043">prefix sum, hash maps, or segment trees</strong> is necessary to optimize queries.</li>
<li data-start="2080" data-end="2201"><strong data-start="2083" data-end="2113">Handling Negative Numbers:</strong> The array contains both positive and negative numbers, making direct indexing tricky.</li>
</ol>
<h4 data-start="2208" data-end="2241"><strong data-start="2211" data-end="2241">Hints &amp; Optimized Approach</strong></h4>
<ul data-start="2242" data-end="2618">
<li data-start="2242" data-end="2380"><strong data-start="2244" data-end="2380">Use a frequency hash map (unordered_map in C++, dict in Python) within a sliding window approach to efficiently compute pair counts.</strong></li>
<li data-start="2381" data-end="2527"><strong data-start="2383" data-end="2527">For multiple queries, preprocess the array using a data structure like a Segment Tree or Mo&rsquo;s Algorithm to handle range queries efficiently.</strong></li>
<li data-start="2528" data-end="2618"><strong data-start="2530" data-end="2618">Alternative solutions involve Fenwick Trees or Sparse Tables for offline processing.</strong></li>
</ul>`,
    tags: []
  },
  {
    id: 2,
    title: 'Binary Search',
    description: '<p>Implement <strong>binary search</strong> algorithm to find an element in a sorted array.</p>',
    difficulty: 'easy',
    userId: 5,
    timeLimit: 500,
    memoryLimit: 128,
    createdAt: '2024-02-11T15:30:00Z',
    note: 'Binary search requires a sorted array.',
    tags: []
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    description: '<p>Find the length of the <em>longest substring</em> without repeating characters.</p>',
    difficulty: 'medium',
    userId: 3,
    timeLimit: 2000,
    memoryLimit: 512,
    createdAt: '2024-02-10T08:20:00Z',
    note: 'Can be solved using the sliding window technique.',
    tags: []
  },
  {
    id: 4,
    title: 'Dijkstra’s Algorithm',
    description: '<p>Find the shortest paths from a <strong>source vertex</strong> to all vertices in a graph.</p>',
    difficulty: 'hard',
    userId: 5,
    timeLimit: 3000,
    memoryLimit: 1024,
    createdAt: '2024-02-08T17:45:00Z',
    note: 'A classic shortest path algorithm used in graph theory.',
    tags: []
  },
  {
    id: 5,
    title: 'Merge Intervals',
    description: '<p>Given a collection of intervals, <strong>merge all overlapping intervals</strong>.</p>',
    difficulty: 'medium',
    userId: 2,
    timeLimit: 1500,
    memoryLimit: 512,
    createdAt: '2024-02-06T13:15:00Z',
    note: 'Sorting the intervals first helps in merging them efficiently.',
    tags: []
  },
  {
    id: 6,
    title: 'Knapsack Problem',
    description: '<p>Solve the <em>0/1 knapsack problem</em> using <strong>dynamic programming</strong>.</p>',
    difficulty: 'hard',
    userId: 3,
    timeLimit: 5000,
    memoryLimit: 2048,
    createdAt: '2024-02-05T09:30:00Z',
    note: 'A famous problem in combinatorial optimization.',
    tags: []
  },
  {
    id: 7,
    title: 'Sudoku Solver',
    description: '<p>Write a program to <strong>solve a Sudoku puzzle</strong> by filling empty cells.</p>',
    difficulty: 'hard',
    userId: 7,
    timeLimit: 4000,
    memoryLimit: 1024,
    createdAt: '2024-02-03T22:10:00Z',
    note: 'Backtracking is a common approach to solving Sudoku.',
    tags: []
  },
  {
    id: 8,
    title: 'Palindrome Partitioning',
    description: '<p>Partition a string such that every substring is a <em>palindrome</em>.</p>',
    difficulty: 'medium',
    userId: 9,
    timeLimit: 2500,
    memoryLimit: 512,
    createdAt: '2024-02-02T14:40:00Z',
    note: 'A recursive approach can be used for this problem.',
    tags: []
  },
  {
    id: 9,
    title: 'LRU Cache',
    description: '<p>Design and implement an <strong>LRU (Least Recently Used) cache</strong>.</p>',
    difficulty: 'medium',
    userId: 6,
    timeLimit: 2000,
    memoryLimit: 1024,
    createdAt: '2024-01-31T19:25:00Z',
    note: 'A doubly linked list and hash map are commonly used for efficient implementation.',
    tags: []
  },
  {
    id: 10,
    title: 'Topological Sorting',
    description: '<p>Perform <strong>topological sorting</strong> on a <em>directed acyclic graph (DAG)</em>.</p>',
    difficulty: 'medium',
    userId: 4,
    timeLimit: 1500,
    memoryLimit: 512,
    createdAt: '2024-01-30T11:55:00Z',
    note: 'Used in scheduling problems and dependency resolution.',
    tags: []
  },
  {
    id: 11,
    title: 'Maximum Subarray Sum',
    description: '<p>Find the <strong>maximum sum</strong> of a contiguous subarray within a one-dimensional array of numbers.</p>',
    difficulty: 'easy',
    userId: 2,
    timeLimit: 1000,
    memoryLimit: 256,
    createdAt: '2024-02-14T09:00:00Z',
    note: 'Kadane\'s Algorithm is an efficient solution for this problem.',
    tags: []
  },
  {
    id: 12,
    title: 'Two Sum',
    description: '<p>Given an array of integers, return <strong>indices</strong> of the two numbers such that they add up to a specific target.</p>',
    difficulty: 'easy',
    userId: 1,
    timeLimit: 500,
    memoryLimit: 128,
    createdAt: '2024-02-13T12:30:00Z',
    note: 'A hash map can be used to achieve O(n) time complexity.',
    tags: []
  },
  {
    id: 13,
    title: 'Reverse Linked List',
    description: '<p>Reverse a <strong>singly linked list</strong> in-place.</p>',
    difficulty: 'easy',
    userId: 4,
    timeLimit: 500,
    memoryLimit: 128,
    createdAt: '2024-02-12T16:45:00Z',
    note: 'Iterative and recursive approaches are both valid.',
    tags: []
  },
  {
    id: 14,
    title: 'Flatten Nested List Iterator',
    description: '<p>Implement an iterator to flatten a <strong>nested list</strong> of integers.</p>',
    difficulty: 'medium',
    userId: 7,
    timeLimit: 1500,
    memoryLimit: 512,
    createdAt: '2024-02-11T20:10:00Z',
    note: 'A stack can be used to handle nested structures efficiently.',
    tags: []
  },
  {
    id: 15,
    title: 'Validate Binary Search Tree',
    description: '<p>Given a binary tree, determine if it is a <strong>valid binary search tree (BST)</strong>.</p>',
    difficulty: 'medium',
    userId: 3,
    timeLimit: 1000,
    memoryLimit: 256,
    createdAt: '2024-02-10T14:20:00Z',
    note: 'In-order traversal can help validate the BST property.',
    tags: []
  },
  {
    id: 16,
    title: 'Coin Change',
    description: '<p>Given an array of coin denominations and a target amount, find the <strong>minimum number of coins</strong> needed to make up that amount.</p>',
    difficulty: 'medium',
    userId: 5,
    timeLimit: 2000,
    memoryLimit: 512,
    createdAt: '2024-02-09T18:30:00Z',
    note: 'Dynamic programming is the key to solving this problem efficiently.',
    tags: []
  },
  {
    id: 17,
    title: 'Word Break',
    description: '<p>Given a string and a dictionary of words, determine if the string can be <strong>segmented</strong> into a space-separated sequence of dictionary words.</p>',
    difficulty: 'medium',
    userId: 6,
    timeLimit: 1500,
    memoryLimit: 512,
    createdAt: '2024-02-08T10:50:00Z',
    note: 'Dynamic programming or backtracking can be used to solve this problem.',
    tags: []
  },
  {
    id: 18,
    title: 'Rotate Image',
    description: '<p>Given an <strong>n x n</strong> 2D matrix representing an image, rotate the image by 90 degrees clockwise.</p>',
    difficulty: 'medium',
    userId: 8,
    timeLimit: 1000,
    memoryLimit: 256,
    createdAt: '2024-02-07T13:40:00Z',
    note: 'In-place rotation requires careful handling of matrix indices.',
    tags: []
  },
  {
    id: 19,
    title: 'Find Median from Data Stream',
    description: '<p>Design a data structure that supports adding integers and finding the <strong>median</strong> of the current numbers.</p>',
    difficulty: 'hard',
    userId: 9,
    timeLimit: 3000,
    memoryLimit: 1024,
    createdAt: '2024-02-06T16:15:00Z',
    note: 'Two heaps (min-heap and max-heap) can be used to efficiently find the median.',
    tags: []
  },
  {
    id: 20,
    title: 'Trapping Rain Water',
    description: '<p>Given an array representing the height of bars, compute how much <strong>water</strong> can be trapped after raining.</p>',
    difficulty: 'hard',
    userId: 2,
    timeLimit: 2000,
    memoryLimit: 512,
    createdAt: '2024-02-05T19:20:00Z',
    note: 'Two-pointer or dynamic programming approaches are commonly used.',
    tags: []
  }
];

