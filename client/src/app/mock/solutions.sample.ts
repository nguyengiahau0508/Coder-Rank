import { Solution } from "../core/models/solutions.model";

export const sampleSolutions: Solution[] = [
  //   {
  //     id: 1,
  //     userId: 1,
  //     problemId: 1,
  //     title: "Giải bài toán FizzBuzz",
  //     votes: 10,
  //     views: 10,
  //     content: `
  // ## Cách giải bài toán FizzBuzz
  // 1. Lặp từ 1 đến N
  // 2. Nếu chia hết cho 3, in "Fizz"
  // 3. Nếu chia hết cho 5, in "Buzz"
  // 4. Nếu chia hết cho cả 3 và 5, in "FizzBuzz"
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     if i % 3 == 0 and i % 5 == 0:
  //         print("FizzBuzz")
  //     elif i % 3 == 0:
  //         print("Fizz")
  //     elif i % 5 == 0:
  //         print("Buzz")
  //     else:
  //         print(i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-17T10:00:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 2,
  //     userId: 2,
  //     problemId: 2,
  //     title: "Cách tìm số nguyên tố",
  //     votes: 10,
  //     views: 10,
  //     content: `
  // ## Phương pháp kiểm tra số nguyên tố
  // - Nếu số đó nhỏ hơn 2 thì không phải số nguyên tố.
  // - Duyệt từ 2 đến căn bậc hai của số đó.
  // - Nếu chia hết cho bất kỳ số nào trong khoảng này, không phải số nguyên tố.
  //
  // \`\`\`cpp
  // bool isPrime(int n) {
  //     if (n < 2) return false;
  //     for (int i = 2; i * i <= n; i++) {
  //         if (n % i == 0) return false;
  //     }
  //     return true;
  // }
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-17T10:05:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 3,
  //     userId: 3,
  //     problemId: 3,
  //     title: "Tìm dãy Fibonacci",
  //     votes: 10,
  //     views: 10,
  //     content: `
  // ## Cách tính dãy Fibonacci
  // 1. Sử dụng đệ quy để tính Fibonacci
  // 2. Có thể tối ưu bằng cách lưu kết quả đã tính vào mảng.
  //
  // \`\`\`javascript
  // function fibonacci(n, memo = {}) {
  //     if (n <= 1) return n;
  //     if (memo[n]) return memo[n];
  //     return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  // }
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-17T10:10:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 4,
  //     userId: 4,
  //     problemId: 4,
  //     title: "Tìm ước số chung lớn nhất (GCD)",
  //     votes: 10,
  //     views: 10,
  //     content: `
  // ## Cách tìm GCD của hai số
  // Dùng thuật toán Euclid:
  // 1. Nếu b = 0, trả về a.
  // 2. Gọi đệ quy gcd(b, a % b).
  //
  // \`\`\`c
  // int gcd(int a, int b) {
  //     return b == 0 ? a : gcd(b, a % b);
  // }
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-17T10:15:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 5,
  //     userId: 5,
  //     problemId: 5,
  //     views: 10,
  //     votes: 10,
  //     title: "Tìm số đảo ngược",
  //     content: `
  // ## Cách tìm số đảo ngược
  // - Duyệt từng chữ số từ phải sang trái.
  // - Nhân 10 rồi cộng chữ số mới.
  //
  // \`\`\`java
  // int reverseNumber(int n) {
  //     int rev = 0;
  //     while (n > 0) {
  //         rev = rev * 10 + n % 10;
  //         n /= 10;
  //     }
  //     return rev;
  // }
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-17T10:20:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 6,
  //     userId: 6,
  //     problemId: 6,
  //     title: "Kiểm tra chuỗi đối xứng",
  //     votes: 10,
  //     views: 10,
  //     content: `
  // ## Chuỗi đối xứng là gì?
  // Chuỗi đối xứng là chuỗi đọc từ trái sang phải và phải sang trái đều giống nhau.
  //
  // \`\`\`javascript
  // function isPalindrome(s) {
  //     return s === s.split('').reverse().join('');
  // }
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-17T10:25:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 7,
  //     userId: 7,
  //     problemId: 7,
  //     views: 10,
  //     votes: 10,
  //     title: "Tính giai thừa của một số",
  //     content: `
  // ## Công thức tính giai thừa
  // n! = n × (n - 1) × (n - 2) × ... × 1
  //
  // \`\`\`python
  // def factorial(n):
  //     return 1 if n == 0 else n * factorial(n - 1)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-17T10:30:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 8,
  //     userId: 8,
  //     problemId: 8,
  //     votes: 10,
  //     views: 10,
  //     title: "Tính tổng dãy số",
  //     content: `
  // ## Tính tổng dãy số từ 1 đến n
  // \`\`\`rust
  // fn sum(n: u32) -> u32 {
  //     (n * (n + 1)) / 2
  // }
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-17T10:35:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 9,
  //     userId: 9,
  //     problemId: 9,
  //     votes: 10,
  //     views: 10,
  //     title: "Tìm phần tử lớn nhất trong mảng",
  //     content: `
  // ## Duyệt qua từng phần tử trong mảng để tìm giá trị lớn nhất.
  //
  // \`\`\`csharp
  // int findMax(int[] arr) {
  //     int max = arr[0];
  //     foreach (int num in arr) {
  //         if (num > max) max = num;
  //     }
  //     return max;
  // }
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-17T10:40:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 10,
  //     userId: 10,
  //     problemId: 10,
  //     votes: 10,
  //     views: 10,
  //     title: "Tìm kiếm nhị phân",
  //     content: `
  // ## Tìm kiếm nhị phân
  // 1. So sánh phần tử giữa với giá trị cần tìm.
  // 2. Nếu nhỏ hơn, tìm bên phải. Nếu lớn hơn, tìm bên trái.
  // 3. Lặp lại đến khi tìm thấy hoặc hết phần tử.
  //
  // \`\`\`cpp
  // int binarySearch(vector<int>& arr, int left, int right, int x) {
  //     while (left <= right) {
  //         int mid = left + (right - left) / 2;
  //         if (arr[mid] == x) return mid;
  //         if (arr[mid] < x) left = mid + 1;
  //         else right = mid - 1;
  //     }
  //     return -1;
  // }
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-17T10:45:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 11,
  //     userId: 1,
  //     problemId: 1,
  //     title: "Giải bài toán FizzBuzz (Version 2)",
  //     votes: 12,
  //     views: 15,
  //     content: `
  // ## Giải thích bài toán FizzBuzz phiên bản 2
  // Lặp qua các số từ 1 đến N và in ra:
  // - "Fizz" nếu chia hết cho 3,
  // - "Buzz" nếu chia hết cho 5,
  // - "FizzBuzz" nếu chia hết cho cả 3 và 5,
  // - Nếu không chia hết thì in ra chính số đó.
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     if i % 3 == 0 and i % 5 == 0:
  //         print("FizzBuzz")
  //     elif i % 3 == 0:
  //         print("Fizz")
  //     elif i % 5 == 0:
  //         print("Buzz")
  //     else:
  //         print(i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-18T10:00:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 12,
  //     userId: 2,
  //     problemId: 1,
  //     title: "Giải bài toán FizzBuzz (Solution 2)",
  //     votes: 8,
  //     views: 12,
  //     content: `
  // ## Phương pháp giải bài toán FizzBuzz
  // Duyệt từ 1 đến N, với mỗi số kiểm tra:
  // - Nếu chia hết cho cả 3 và 5, in "FizzBuzz".
  // - Nếu chia hết cho 3, in "Fizz".
  // - Nếu chia hết cho 5, in "Buzz".
  // - Ngược lại, in chính số đó.
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     if i % 3 == 0 and i % 5 == 0:
  //         print("FizzBuzz")
  //     elif i % 3 == 0:
  //         print("Fizz")
  //     elif i % 5 == 0:
  //         print("Buzz")
  //     else:
  //         print(i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-18T10:05:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 13,
  //     userId: 3,
  //     problemId: 1,
  //     title: "Bài toán FizzBuzz - Đáp án tối ưu",
  //     votes: 15,
  //     views: 18,
  //     content: `
  // ## Giải thích giải pháp tối ưu
  // Sử dụng một vòng lặp đơn giản để kiểm tra chia hết cho 3 và 5, và in kết quả.
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     if i % 15 == 0:
  //         print("FizzBuzz")
  //     elif i % 3 == 0:
  //         print("Fizz")
  //     elif i % 5 == 0:
  //         print("Buzz")
  //     else:
  //         print(i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-18T10:10:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 14,
  //     userId: 4,
  //     problemId: 1,
  //     title: "FizzBuzz bằng cách sử dụng điều kiện ngắn gọn",
  //     votes: 10,
  //     views: 14,
  //     content: `
  // ## Sử dụng toán tử điều kiện để tối giản code
  // Dùng toán tử điều kiện để thay thế các câu lệnh if-else.
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     print("Fizz"*(i%3==0) + "Buzz"*(i%5==0) or i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-18T10:15:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 15,
  //     userId: 5,
  //     problemId: 1,
  //     title: "Giải bài toán FizzBuzz (Phiên bản Pythonic)",
  //     votes: 11,
  //     views: 16,
  //     content: `
  // ## FizzBuzz Pythonic
  // Sử dụng cách tiếp cận ngắn gọn hơn cho bài toán FizzBuzz.
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     print("Fizz" * (i % 3 == 0) + "Buzz" * (i % 5 == 0) or i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-18T10:20:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 16,
  //     userId: 6,
  //     problemId: 1,
  //     title: "Bài toán FizzBuzz - Cách giải đơn giản",
  //     votes: 14,
  //     views: 17,
  //     content: `
  // ## Phương pháp đơn giản giải FizzBuzz
  // Duyệt qua số từ 1 đến 100 và in kết quả theo điều kiện đã cho.
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     if i % 15 == 0:
  //         print("FizzBuzz")
  //     elif i % 3 == 0:
  //         print("Fizz")
  //     elif i % 5 == 0:
  //         print("Buzz")
  //     else:
  //         print(i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-18T10:25:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 17,
  //     userId: 7,
  //     problemId: 1,
  //     title: "Giải FizzBuzz với ít dòng mã hơn",
  //     votes: 9,
  //     views: 13,
  //     content: `
  // ## Cách giải bài toán FizzBuzz hiệu quả
  // Dùng cách tiếp cận đơn giản và dễ hiểu, không sử dụng toán tử phức tạp.
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     if i % 15 == 0:
  //         print("FizzBuzz")
  //     elif i % 3 == 0:
  //         print("Fizz")
  //     elif i % 5 == 0:
  //         print("Buzz")
  //     else:
  //         print(i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-18T10:30:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 18,
  //     userId: 8,
  //     problemId: 1,
  //     title: "Cách giải FizzBuzz nhanh",
  //     votes: 10,
  //     views: 14,
  //     content: `
  // ## FizzBuzz đơn giản và dễ hiểu
  // Duyệt qua các số từ 1 đến N và kiểm tra xem số đó có chia hết cho 3 và 5 không.
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     if i % 3 == 0 and i % 5 == 0:
  //         print("FizzBuzz")
  //     elif i % 3 == 0:
  //         print("Fizz")
  //     elif i % 5 == 0:
  //         print("Buzz")
  //     else:
  //         print(i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-18T10:35:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 19,
  //     userId: 9,
  //     problemId: 1,
  //     title: "Giải FizzBuzz với Python",
  //     votes: 7,
  //     views: 10,
  //     content: `
  // ## Cách làm FizzBuzz trong Python
  // Duyệt qua các số từ 1 đến 100 và in ra "Fizz", "Buzz" hoặc số đó tùy theo điều kiện.
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     if i % 15 == 0:
  //         print("FizzBuzz")
  //     elif i % 3 == 0:
  //         print("Fizz")
  //     elif i % 5 == 0:
  //         print("Buzz")
  //     else:
  //         print(i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-18T10:40:00Z",
  //     tags: []
  //   },
  //   {
  //     id: 20,
  //     userId: 10,
  //     problemId: 1,
  //     title: "Giải bài toán FizzBuzz với Pythonic 2",
  //     votes: 13,
  //     views: 18,
  //     content: `
  // ## Giải FizzBuzz theo cách Pythonic
  // Một cách tiếp cận tối giản và Pythonic cho bài toán FizzBuzz.
  //
  // \`\`\`python
  // for i in range(1, 101):
  //     print("Fizz" * (i % 3 == 0) + "Buzz" * (i % 5 == 0) or i)
  // \`\`\`
  //     `,
  //     createdAt: "2025-02-18T10:45:00Z",
  //     tags: []
  //   }
];
