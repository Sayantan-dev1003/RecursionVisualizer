const CodeSnippets = {
  factorial: {
    JavaScript: `function factorial(n) {
    if (n === 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }`,
    TypeScript: `function factorial(n: number): number {
    if (n === 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }`,
    Python: `def factorial(n):
    if n == 0:
      return 1
    else:
      return n * factorial(n - 1)`,
    Java: `class Solution {
    public int factorial(int n) {
      if (n == 0) {
        return 1;
      } else {
        return n * factorial(n - 1);
      }
    }
  }`,
    'C++': `int factorial(int n) {
    if (n == 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }`,
  },
  fibonacci: {
    JavaScript: `function fibonacci(n) {
    if (n <= 1) {
      return n;
    } else {
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  }`,
    TypeScript: `function fibonacci(n: number): number {
    if (n <= 1) {
      return n;
    } else {
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  }`,
    Python: `def fibonacci(n):
    if n <= 1:
      return n
    else:
      return fibonacci(n - 1) + fibonacci(n - 2)`,
    Java: `class Solution {
    public int fibonacci(int n) {
      if (n <= 1) {
        return n;
      } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
      }
    }
  }`,
    'C++': `int fibonacci(int n) {
    if (n <= 1) {
      return n;
    } else {
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  }`,
  },
  towerOfHanoi: {
    JavaScript: `function towerOfHanoi(n, source, auxiliary, destination) {
    if (n === 1) {
      // Move disk 1 from source to destination
      return;
    }
    towerOfHanoi(n - 1, source, destination, auxiliary);
    // Move disk n from source to destination
    towerOfHanoi(n - 1, auxiliary, source, destination);
  }`,
    TypeScript: `function towerOfHanoi(n: number, source: string, auxiliary: string, destination: string): void {
    if (n === 1) {
      // Move disk 1 from source to destination
      return;
    }
    towerOfHanoi(n - 1, source, destination, auxiliary);
    // Move disk n from source to destination
    towerOfHanoi(n - 1, auxiliary, source, destination);
  }`,
    Python: `def tower_of_hanoi(n, source, auxiliary, destination):
    if n == 1:
      # Move disk 1 from source to destination
      return
    tower_of_hanoi(n - 1, source, destination, auxiliary)
    # Move disk n from source to destination
    tower_of_hanoi(n - 1, auxiliary, source, destination)`,
    Java: `class Solution {
    public void towerOfHanoi(int n, char source, char auxiliary, char destination) {
      if (n == 1) {
        // Move disk 1 from source to destination
        return;
      }
      towerOfHanoi(n - 1, source, destination, auxiliary);
      // Move disk n from source to destination
      towerOfHanoi(n - 1, auxiliary, source, destination);
    }
  }`,
    'C++': `void towerOfHanoi(int n, char source, char auxiliary, char destination) {
    if (n == 1) {
      // Move disk 1 from source to destination
      return;
    }
    towerOfHanoi(n - 1, source, destination, auxiliary);
    // Move disk n from source to destination
    towerOfHanoi(n - 1, auxiliary, source, destination);
  }`,
  },
};

export default CodeSnippets;