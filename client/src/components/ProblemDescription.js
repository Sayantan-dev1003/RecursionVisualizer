const ProblemDescriptions = {
  factorial: {
    title: "Factorial Calculation",
    description: `Given a non-negative integer <strong>n</strong>, calculate its factorial. The factorial of a non-negative integer <strong>n</strong>, denoted as <strong>n!</strong>, is the product of all positive integers less than or equal to <strong>n</strong>. The factorial of 0 is defined as 1.`,
    mathematicalFormula: `n! = n * (n-1) * (n-2) * ... * 1, for n > 0, and 0! = 1.`,
    task: `Your task is to implement a recursive function that computes <strong>n!</strong>.`,
    examples: [
      {
        input: "n = 3",
        output: "6",
        explanation: `3! = 3 * 2 * 1 = 6`
      },
      {
        input: "n = 0",
        output: "1",
        explanation: `The factorial of 0 is defined as 1. This is the base case for the recursion.`
      }
    ],
    constraints: [
      `0 <= n <= 12`
    ],
    inputType: 'number',
    defaultInput: 5,
  },
  fibonacci: {
    title: "Fibonacci Sequence",
    description: `The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.`,
    mathematicalFormula: `F(n) = F(n-1) + F(n-2), for n > 1, with F(0) = 0 and F(1) = 1.`,
    task: `Your task is to implement a recursive function that computes the n-th Fibonacci number.`,
    examples: [
      {
        input: "n = 0",
        output: "0",
        explanation: `The first Fibonacci number (F(0)) is 0.`
      },
      {
        input: "n = 1",
        output: "1",
        explanation: `The second Fibonacci number (F(1)) is 1.`
      },
      {
        input: "n = 5",
        output: "5",
        explanation: `F(5) = F(4) + F(3) = (F(3)+F(2)) + (F(2)+F(1)) = (2+1) + (1+1) = 3+2 = 5.`
      }
    ],
    constraints: [
      `0 <= n <= 10`
    ],
    inputType: 'number',
    defaultInput: 7,
  },
  towerOfHanoi: {
    title: "Tower of Hanoi",
    description: `The Tower of Hanoi is a mathematical game or puzzle. It consists of three rods and a number of disks of different sizes, which can slide onto any rod. The puzzle starts with the disks in a neat stack in ascending order of size on one rod, the smallest at the top, thus making a conical shape.`,
    mathematicalFormula: `The objective of the puzzle is to move the entire stack from the source rod to another rod, obeying the following rules:
      <ol>
        <li>Only one disk can be moved at a time.</li>
        <li>Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.</li>
        <li>No disk may be placed on top of a smaller disk.</li>
      </ol>`,
    task: `Your task is to implement a recursive function that prints the sequence of moves required to solve the Tower of Hanoi puzzle for 'n' disks.`,
    examples: [
      {
        input: "n = 1",
        output: `Move disk 1 from A to C`,
        explanation: `A single disk is moved directly from the source (A) to the destination (C).`
      },
      {
        input: "n = 2",
        output: `Move disk 1 from A to B
  Move disk 2 from A to C
  Move disk 1 from B to C`,
        explanation: `The smallest disk moves to the auxiliary, the larger disk moves to the destination, and then the smallest disk moves from auxiliary to destination.`
      }
    ],
    constraints: [
      `1 <= n <= 5`
    ],
    inputType: 'number',
    defaultInput: 3,
  },
};

export default ProblemDescriptions;