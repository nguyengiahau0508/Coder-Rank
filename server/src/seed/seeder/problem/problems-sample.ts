import { CreateProblemDto } from "src/modules/mariadb/problems/dto/create-problem.dto";
import { Difficulty } from "src/modules/mariadb/problems/entities/problem.entity";

export const sampleProblems: CreateProblemDto[] = [
  {
    title: 'Multi-Layered Sum Query',
    description: `<p data-start="450" data-end="638">You are given an <strong data-start="467" data-end="488">array of integers</strong> and a series of queries. Each query consists of two numbers, <strong data-start="550" data-end="555">L</strong> and <strong data-start="560" data-end="565">R</strong>, representing a range in the array, and an integer <strong data-start="617" data-end="622">T</strong> (target sum).</p>
<p data-start="640" data-end="755">For each query, determine <strong data-start="666" data-end="752">the number of unique pairs (i, j) (i < j) within the subarray A[L:R] that sum to T</strong>.</p>
<p data-start="757" data-end="809">You must process up to <strong data-start="780" data-end="808">10^5 queries efficiently</strong>.</p>
<h4 data-start="816" data-end="837"><strong data-start="819" data-end="835">Input Format</strong></h4>
<ul data-start="838" data-end="1230">
<li data-start="838" data-end="922">The first line contains an integer <strong data-start="875" data-end="880">N</strong> (1 ≤ N ≤ 10^5) — the size of the array.</li>
<li data-start="923" data-end="1042">The second line contains <strong data-start="950" data-end="980">N space-separated integers</strong> <strong data-start="981" data-end="989">A[i]</strong> (−10^9 ≤ A[i] ≤ 10^9) — the elements of the array.</li>
<li data-start="1043" data-end="1127">The third line contains an integer <strong data-start="1080" data-end="1085">Q</strong> (1 ≤ Q ≤ 10^5) — the number of queries.</li>
<li data-start="1128" data-end="1230">Each of the next <strong data-start="1147" data-end="1152">Q</strong> lines contains three integers: <strong data-start="1184" data-end="1195">L, R, T</strong> (1 ≤ L ≤ R ≤ N, −10^9 ≤ T ≤ 10^9).</li>
</ul>
<h4 data-start="1237" data-end="1259"><strong data-start="1240" data-end="1257">Output Format</strong></h4>
<p data-start="1260" data-end="1386">For each query, output a single integer — the number of unique pairs (i, j) in the subarray <strong data-start="1352" data-end="1362">A[L:R]</strong> whose sum equals <strong data-start="1380" data-end="1385">T</strong>.</p>`,
    difficulty: Difficulty.HARD,
    userId: 3,
    timeLimit: 5000,
    memoryLimit: 2048,
    note: `<h4 data-start="1497" data-end="1516"><strong data-start="1501" data-end="1516">Explanation</strong></h4>
<ul data-start="1517" data-end="1829">
<li data-start="1517" data-end="1593"><strong data-start="1519" data-end="1530">Query 1</strong>: Subarray <code data-start="1541" data-end="1552">[1, 3, 5]</code>, pairs <code data-start="1560" data-end="1567">(1,3)</code> → <strong data-start="1570" data-end="1580">1 pair</strong> sums to 4.</li>
<li data-start="1594" data-end="1707"><strong data-start="1596" data-end="1607">Query 2</strong>: Subarray <code data-start="1618" data-end="1632">[3, 5, 7, 9]</code>, pairs <code data-start="1640" data-end="1647">(3,7)</code>, <code data-start="1649" data-end="1656">(5,5)</code> (invalid) <code data-start="1667" data-end="1674">(1,9)</code> → <strong data-start="1677" data-end="1694">2 valid pairs</strong> sum to 10.</li>
<li data-start="1708" data-end="1829"><strong data-start="1710" data-end="1721">Query 3</strong>: Subarray <code data-start="1732" data-end="1749">[1, 3, 5, 7, 9]</code>, pairs <code data-start="1757" data-end="1764">(1,7)</code>, <code data-start="1766" data-end="1773">(3,5)</code>, <code data-start="1775" data-end="1782">(5,3)</code> (same as before) → <strong data-start="1802" data-end="1819">3 valid pairs</strong> sum to 8.</li>
</ul>
<h4 data-start="1836" data-end="1867"><strong data-start="1839" data-end="1867">Constraints & Challenges</strong></h4>
<ol data-start="1868" data-end="2201">
<li data-start="1868" data-end="1960"><strong data-start="1871" data-end="1893">Large Constraints:</strong> With <strong data-start="1899" data-end="1914">N, Q ≤ 10^5</strong>, a naive <strong data-start="1924" data-end="1936">O(N × Q)</strong> approach is too slow.</li>
<li data-start="1961" data-end="2079"><strong data-start="1964" data-end="1993">Efficient Query Handling:</strong> Using <strong data-start="2000" data-end="2043">prefix sum, hash maps, or segment trees</strong> is necessary to optimize queries.</li>
<li data-start="2080" data-end="2201"><strong data-start="2083" data-end="2113">Handling Negative Numbers:</strong> The array contains both positive and negative numbers, making direct indexing tricky.</li>
</ol>
<h4 data-start="2208" data-end="2241"><strong data-start="2211" data-end="2241">Hints & Optimized Approach</strong></h4>
<ul data-start="2242" data-end="2618">
<li data-start="2242" data-end="2380"><strong data-start="2244" data-end="2380">Use a frequency hash map (unordered_map in C++, dict in Python) within a sliding window approach to efficiently compute pair counts.</strong></li>
<li data-start="2381" data-end="2527"><strong data-start="2383" data-end="2527">For multiple queries, preprocess the array using a data structure like a Segment Tree or Mo’s Algorithm to handle range queries efficiently.</strong></li>
<li data-start="2528" data-end="2618"><strong data-start="2530" data-end="2618">Alternative solutions involve Fenwick Trees or Sparse Tables for offline processing.</strong></li>
</ul>`
  },
  {
    title: 'Binary Search',
    description: '<p>Implement <strong>binary search</strong> algorithm to find an element in a sorted array.</p>',
    difficulty: Difficulty.EASY,
    userId: 5,
    timeLimit: 500,
    memoryLimit: 128,
    note: 'Binary search requires a sorted array.'
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    description: '<p>Find the length of the <em>longest substring</em> without repeating characters.</p>',
    difficulty: Difficulty.MEDIUM,
    userId: 3,
    timeLimit: 2000,
    memoryLimit: 512,
    note: 'Can be solved using the sliding window technique.'
  },
  {
    title: 'Dijkstra’s Algorithm',
    description: '<p>Find the shortest paths from a <strong>source vertex</strong> to all vertices in a graph.</p>',
    difficulty: Difficulty.HARD,
    userId: 5,
    timeLimit: 3000,
    memoryLimit: 1024,
    note: 'A classic shortest path algorithm used in graph theory.'
  },
  {
    title: 'Merge Intervals',
    description: '<p>Given a collection of intervals, <strong>merge all overlapping intervals</strong>.</p>',
    difficulty: Difficulty.MEDIUM,
    userId: 2,
    timeLimit: 1500,
    memoryLimit: 512,
    note: 'Sorting the intervals first helps in merging them efficiently.'
  },
  {
    title: 'Knapsack Problem',
    description: '<p>Solve the <em>0/1 knapsack problem</em> using <strong>dynamic programming</strong>.</p>',
    difficulty: Difficulty.HARD,
    userId: 3,
    timeLimit: 5000,
    memoryLimit: 2048,
    note: 'A famous problem in combinatorial optimization.'
  },
  {
    title: 'Sudoku Solver',
    description: '<p>Write a program to <strong>solve a Sudoku puzzle</strong> by filling empty cells.</p>',
    difficulty: Difficulty.HARD,
    userId: 7,
    timeLimit: 4000,
    memoryLimit: 1024,
    note: 'Backtracking is a common approach to solving Sudoku.'
  },
  {
    title: 'Palindrome Partitioning',
    description: '<p>Partition a string such that every substring is a <em>palindrome</em>.</p>',
    difficulty: Difficulty.MEDIUM,
    userId: 9,
    timeLimit: 2500,
    memoryLimit: 512,
    note: 'A recursive approach can be used for this problem.'
  },
  {
    title: 'LRU Cache',
    description: '<p>Design and implement an <strong>LRU (Least Recently Used) cache</strong>.</p>',
    difficulty: Difficulty.MEDIUM,
    userId: 6,
    timeLimit: 2000,
    memoryLimit: 1024,
    note: 'A doubly linked list and hash map are commonly used for efficient implementation.'
  },
  {
    title: 'Topological Sorting',
    description: '<p>Perform <strong>topological sorting</strong> on a <em>directed acyclic graph (DAG)</em>.</p>',
    difficulty: Difficulty.MEDIUM,
    userId: 4,
    timeLimit: 1500,
    memoryLimit: 512,
    note: 'Used in scheduling problems and dependency resolution.'
  },
  {
    title: 'Maximum Subarray Sum',
    description: '<p>Find the <strong>maximum sum</strong> of a contiguous subarray within a one-dimensional array of numbers.</p>',
    difficulty: Difficulty.EASY,
    userId: 2,
    timeLimit: 1000,
    memoryLimit: 256,
    note: 'Kadane\'s Algorithm is an efficient solution for this problem.'
  },
  {
    title: 'Two Sum',
    description: '<p>Given an array of integers, return <strong>indices</strong> of the two numbers such that they add up to a specific target.</p>',
    difficulty: Difficulty.EASY,
    userId: 1,
    timeLimit: 500,
    memoryLimit: 128,
    note: 'A hash map can be used to achieve O(n) time complexity.'
  },
  {
    title: 'Reverse Linked List',
    description: '<p>Reverse a <strong>singly linked list</strong> in-place.</p>',
    difficulty: Difficulty.EASY,
    userId: 4,
    timeLimit: 500,
    memoryLimit: 128,
    note: 'Iterative and recursive approaches are both valid.'
  },
  {
    title: 'Flatten Nested List Iterator',
    description: '<p>Implement an iterator to flatten a <strong>nested list</strong> of integers.</p>',
    difficulty: Difficulty.MEDIUM,
    userId: 7,
    timeLimit: 1500,
    memoryLimit: 512,
    note: 'A stack can be used to handle nested structures efficiently.'
  },
  {
    title: 'Validate Binary Search Tree',
    description: '<p>Given a binary tree, determine if it is a <strong>valid binary search tree (BST)</strong>.</p>',
    difficulty: Difficulty.MEDIUM,
    userId: 3,
    timeLimit: 1000,
    memoryLimit: 256,
    note: 'In-order traversal can help validate the BST property.'
  },
  {
    title: 'Coin Change',
    description: '<p>Given an array of coin denominations and a target amount, find the <strong>minimum number of coins</strong> needed to make up that amount.</p>',
    difficulty: Difficulty.MEDIUM,
    userId: 5,
    timeLimit: 2000,
    memoryLimit: 512,
    note: 'Dynamic programming is the key to solving this problem efficiently.'
  },
  {
    title: 'Word Break',
    description: '<p>Given a string and a dictionary of words, determine if the string can be <strong>segmented</strong> into a space-separated sequence of dictionary words.</p>',
    difficulty: Difficulty.MEDIUM,
    userId: 6,
    timeLimit: 1500,
    memoryLimit: 512,
    note: 'Dynamic programming or backtracking can be used to solve this problem.'
  },
  {
    title: 'Rotate Image',
    description: '<p>Given an <strong>n x n</strong> 2D matrix representing an image, rotate the image by 90 degrees clockwise.</p>',
    difficulty: Difficulty.MEDIUM,
    userId: 8,
    timeLimit: 1000,
    memoryLimit: 256,
    note: 'In-place rotation requires careful handling of matrix indices.'
  },
  {
    title: 'Find Median from Data Stream',
    description: '<p>Design a data structure that supports adding integers and finding the <strong>median</strong> of the current numbers.</p>',
    difficulty: Difficulty.HARD,
    userId: 9,
    timeLimit: 3000,
    memoryLimit: 1024,
    note: 'Two heaps (min-heap and max-heap) can be used to efficiently find the median.'
  },
  {
    title: 'Trapping Rain Water',
    description: '<p>Given an array representing the height of bars, compute how much <strong>water</strong> can be trapped after raining.</p>',
    difficulty: Difficulty.HARD,
    userId: 2,
    timeLimit: 2000,
    memoryLimit: 512,
    note: 'Two-pointer or dynamic programming approaches are commonly used.'
  }
];
