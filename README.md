# Recursion Visualizer

## Table of Contents

* [Introduction](#introduction)
* [Features](#features)
* [Supported Problems](#supported-problems)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Future Enhancements](#future-enhancements)

## Introduction

The **Recursion Visualizer** is an interactive web application designed to help users understand how recursive functions work by visualizing their execution step-by-step. It provides a dynamic view of the call stack, an event log of function calls and returns, and corresponding code snippets. With interactive controls and helpful tooltips, it makes complex recursive concepts easier to grasp.

## Features

* **Interactive Recursion Visualization:**
    * **Call Stack:** Visually observe how function calls are pushed onto and popped from the call stack during execution (for Factorial and Fibonacci).
    * **Event Log:** A chronological log of every function call, return, and specific actions (like disk moves in Tower of Hanoi).
* **Step-by-Step Playback Controls:**
    * `Run`: Starts the visualization.
    * `Play/Pause`: Control the automatic animation playback.
    * `Previous/Next`: Manually step through the visualization one event at a time.
* **Dynamic Code Display:** View the source code for each problem in different programming languages (e.g., JavaScript).
* **Contextual Problem Descriptions:** Detailed explanations of each recursive problem, including mathematical formulas, examples, and constraints.
* **Interactive Input:** Users can provide custom input values for problems (e.g., `n` for Factorial/Fibonacci, number of disks for Tower of Hanoi).
* **Enhanced User Experience with Tooltips:** Hover over code sections (general explanation), visualization elements (stack frames, log entries), and control buttons for contextual information.
* **Responsive Design:** Optimized for viewing on various screen sizes, from desktop to mobile.

## Supported Problems

The visualizer currently supports the following classic recursion problems:

1.  **Factorial (n!)**: Calculates the product of all positive integers less than or equal to `n`.
2.  **Fibonacci Sequence**: Calculates the `n`-th number in the Fibonacci sequence.
3.  **Tower of Hanoi**: Solves the classic puzzle of moving disks between three pegs.

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
    git clone [https://github.com/Sayantan-dev1003/RecursionVisualizer.git](https://github.com/Sayantan-dev1003/RecursionVisualizer.git)
    cd recursion-visualizer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # OR
    yarn dev
    ```

4.  **Open in your browser:**
    Open [http://localhost:3000](http://localhost:3000) with your web browser to see the application.

5. **Live URL**
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

## Project Structure

RECURSION-VISUALIZER/
├── .client/             
│    ├── .next/               
│    ├── node_modules/        
│    ├── public/
│    ├── src/                 
│    │   ├── app/
│    │   │   ├── layout.js    
│    │   │   └── page.js      
│    │   ├── components/
│    │   │   ├── CodeDisplay.js
│    │   │   ├── CodePanel.js
│    │   │   ├── Header.js
│    │   │   ├── LanguageSelector.js
│    │   │   └── VisualPanel.js
│    │   ├── data/
│    │   │   ├── CodeSnippets.js
│    │   │   └── ProblemDescription.js
│    │   └── styles/
│    │       └── globals.css
│    ├── .eslint.config.mjs
│    ├── jsconfig.json
│    ├── next.config.mjs
│    ├── package-lock.json
│    ├── package.json
│    ├── postcss.config.js
│    └── tailwind.config.js
├── .gitignore
└── README.md

## Future Enhancements

* **Improved Fibonacci Visualization:** Implement a tree-like visualization for Fibonacci to better illustrate its branching recursive calls.
* **Graphical Tower of Hanoi:** Develop a dynamic graphical representation for the Tower of Hanoi puzzle, showing disks moving between pegs.
* **Visualization Speed Control:** Add a slider to adjust the animation speed during playback.
* **Code Highlighting based on Current Step:** Highlight the currently executing line of code in the `CodeDisplay` during the visualization.
* **Additional Problems:** Implement visualizations for other recursive algorithms (e.g., Merge Sort, Quick Sort, DFS/BFS on a simple graph).
* **Quiz/Challenge Mode:** Introduce small quizzes or challenges related to the current step or problem to test user understanding.
* **Accessibility Improvements:** Enhance keyboard navigation and screen reader support.