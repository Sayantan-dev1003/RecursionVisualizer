# Recursion Visualizer

## Table of Contents

* [Introduction](#introduction)
* [Features](#features)
* [Supported Problems](#supported-problems)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [Future Enhancements](#future-enhancements)

## Introduction

The **Recursion Visualizer** is an interactive web application designed to help users understand how recursive functions work by visualizing their execution step-by-step. It provides a dynamic view of the call stack, an event log of function calls and returns, and corresponding code snippets. With interactive controls and helpful tooltips, it makes complex recursive concepts easier to grasp.

## Features

* **Interactive Recursion Visualization:**
    * **Call Stack:** Visually observe how function calls are pushed onto and popped from the call stack during execution (for Factorial, Fibonacci and Permutations).
    * **Event Log:** A chronological log of every function call, return, and specific actions (like disk moves in Tower of Hanoi).
* **Step-by-Step Playback Controls:**
    * `Run`: Starts the visualization.
    * `Play/Pause`: Control the automatic animation playback.
    * `Previous/Next`: Manually step through the visualization one event at a time.
* **Dynamic Code Display:** View the source code for each problem in different programming languages (JavaScript, TypeScript, Python, Java, C++).
* **Contextual Problem Descriptions:** Detailed explanations of each recursive problem, including mathematical formulas, examples, and constraints.
* **Interactive Input:** Users can provide custom input values for problems (e.g., `n` for Factorial/Fibonacci, number of disks for Tower of Hanoi, string for permutations).
* **Enhanced User Experience with Tooltips:** Hover over code sections (general explanation), visualization elements (stack frames, log entries), and control buttons for contextual information.
* **Responsive Design:** Optimized for viewing on various screen sizes, from desktop to mobile.

## Supported Problems

The visualizer currently supports the following classic recursion problems:

1.  **Factorial (n!)**: Calculates the product of all positive integers less than or equal to `n`.
2.  **Fibonacci Sequence**: Calculates the `n`-th number in the Fibonacci sequence.
3.  **Tower of Hanoi**: Solves the classic puzzle of moving disks between three pegs.
4.  **Permutations**: Showing how elements are added and removed from the current permutation as the search space is explored

## Technologies Used

* **Next.js**: React framework for building fast and scalable web applications.
* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
* **react-syntax-highlighter**: For displaying syntax-highlighted code snippets.
* **JavaScript**: The primary programming language used for logic and instrumenting recursive functions.

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js) or Yarn

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sayantan-dev1003/RecursionVisualizer.git
    cd recursion-visualizer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

3. **Go to the client side folder.**
    ```bash
    cd client
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # OR
    yarn dev
    ```

5.  **Open in your browser:**
    Open [http://localhost:3000](http://localhost:3000) with your web browser to see the application.

6. **Live URL**
   Open [https://recursion-visualizer-sigma.vercel.app/](https://recursion-visualizer-sigma.vercel.app/)

## Usage

1.  **Select a Problem:** Use the problem selector (e.g., "Factorial", "Fibonacci", "Tower of Hanoi") to choose the recursion you want to visualize.
2.  **Review Problem Description:** Read the detailed description, mathematical formula, examples, and constraints provided.
3.  **Select Language:** Choose your preferred programming language to view the code snippet.
4.  **Enter Input:** Provide an input value (`N`) for the selected problem based on its constraints.
5.  **Run Visualization:** Click the `Run` button to generate the visualization log.
6.  **Control Playback:**
    * Use `Play` to auto-play the visualization.
    * Use `Pause` to stop the auto-playback.
    * `Previous` and `Next`: Manually step through the visualization one event at a time.
7.  **Explore Tooltips:** Hover over various elements like the code display, call stack frames, event log entries, and control buttons for helpful explanations.

## Future Enhancements

* **More Algorithms:**  Expand the library of supported algorithms (e.g., Merge Sort, Quick Sort, N-Queens, Sudoku Solver) to demonstrate a wider range of recursive patterns.
* **Custom Code Input:**  Allow users to paste their own recursive function code (in JavaScript initially) and automatically instrument it for visualization. This would involve parsing the code and injecting logging statements.
* **Enhanced Visual Feedback:** For algorithms like Fibonacci, visualize the recursion tree structure to show redundant calculations.