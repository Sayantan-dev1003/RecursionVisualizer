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
  permutations: {
    JavaScript: `function permutations(arr) {
  const result = [];

  function backtrack(index, currentPermutation) {
    if (index === arr.length) {
      result.push([...currentPermutation]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!currentPermutation.includes(arr[i])) { // Check if element is already used
        currentPermutation.push(arr[i]);
        backtrack(index + 1, currentPermutation);
        currentPermutation.pop(); // Backtrack
      }
    }
  }

  backtrack(0, []);
  return result;
}`,
    TypeScript: `function permutations(arr: string[]): string[][] {
  const result: string[][] = [];

  function backtrack(index: number, currentPermutation: string[]) {
    if (index === arr.length) {
      result.push([...currentPermutation]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!currentPermutation.includes(arr[i])) {
        currentPermutation.push(arr[i]);
        backtrack(index + 1, currentPermutation);
        currentPermutation.pop();
      }
    }
  }

  backtrack(0, []);
  return result;
}`,
    Python: `def permutations(arr):
  result = []

  def backtrack(index, current_permutation):
    if index == len(arr):
      result.append(list(current_permutation))
      return

    for item in arr:
      if item not in current_permutation:
        current_permutation.append(item)
        backtrack(index + 1, current_permutation)
        current_permutation.pop()

  backtrack(0, [])
  return result`,
    Java: `import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<List<Integer>> permutations(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, List<Integer> currentPermutation, List<List<Integer>> result) {
        if (currentPermutation.size() == nums.length) {
            result.add(new ArrayList<>(currentPermutation));
            return;
        }

        for (int num : nums) {
            if (!currentPermutation.contains(num)) {
                currentPermutation.add(num);
                backtrack(nums, currentPermutation, result);
                currentPermutation.remove(currentPermutation.size() - 1);
            }
        }
    }
}`,
    'C++': `class Solution {
public:
    vector<vector<int>> permutations(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> currentPermutation;
        vector<bool> used(nums.size(), false);
        backtrack(nums, currentPermutation, used, result);
        return result;
    }

private:
    void backtrack(vector<int>& nums, vector<int>& currentPermutation, vector<bool>& used, vector<vector<int>>& result) {
        if (currentPermutation.size() == nums.size()) {
            result.push_back(currentPermutation);
            return;
        }

        for (int i = 0; i < nums.size(); ++i) {
            if (!used[i]) {
                used[i] = true;
                currentPermutation.push_back(nums[i]);
                backtrack(nums, currentPermutation, used, result);
                currentPermutation.pop_back();
                used[i] = false;
            }
        }
    }
};`,
  },
};

export default CodeSnippets;