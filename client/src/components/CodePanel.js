'use client';

import React, { useState, useRef, useEffect } from 'react';
import LanguageSelector from './LanguageSelector.js';
import CodeDisplay from './CodeDisplay.js';
import codeSnippets from '../data/CodeSnippets.js';
import problemDescriptions from '../data/ProblemDescription.js';

const CodePanel = ({ selectedProblem, setVisualizationLog, setCurrentStep, setIsPlaying, currentStep, visualizationLog, isPlaying, animationIntervalRef }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
    // Initialize problemInput based on the selectedProblem's defaultInput
    const [problemInput, setProblemInput] = useState(problemDescriptions[selectedProblem]?.defaultInput || '');

    useEffect(() => {
        // Reset input and visualization when problem changes
        setProblemInput(problemDescriptions[selectedProblem]?.defaultInput || '');
        setVisualizationLog([]);
        setCurrentStep(0);
        setIsPlaying(false);
        if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
        }
    }, [selectedProblem, setVisualizationLog, setCurrentStep, setIsPlaying, animationIntervalRef]);


    const runProblemVisualization = () => {
        setVisualizationLog([]);
        setCurrentStep(0);
        setIsPlaying(false);
        if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
        }

        let tempLog = [];
        let callIdCounter = 0;

        // Factorial Logic
        const instrumentedFactorial = (n, indent = 0) => {
            const currentCallId = callIdCounter++;
            tempLog.push({ type: 'call', id: currentCallId, problem: 'factorial', n, indent, status: 'active' });

            let result;
            if (n < 0) {
                result = 'Error: Input must be non-negative';
            } else if (n === 0) {
                result = 1;
            } else {
                result = n * instrumentedFactorial(n - 1, indent + 1);
            }

            const callEntryIndex = tempLog.findIndex(entry => entry.id === currentCallId && entry.type === 'call' && entry.problem === 'factorial' && entry.n === n && entry.status === 'active');
            if (callEntryIndex !== -1) {
                tempLog[callEntryIndex] = { ...tempLog[callEntryIndex], status: 'returned', value: result };
            }
            tempLog.push({ type: 'return', id: currentCallId, problem: 'factorial', value: result, indent, fromN: n });
            return result;
        };

        // Fibonacci Logic
        const instrumentedFibonacci = (n, indent = 0) => {
            const currentCallId = callIdCounter++;
            tempLog.push({ type: 'call', id: currentCallId, problem: 'fibonacci', n, indent, status: 'active' });

            let result;
            if (n <= 1) {
                result = n;
            } else {
                result = instrumentedFibonacci(n - 1, indent + 1) + instrumentedFibonacci(n - 2, indent + 1);
            }

            const callEntryIndex = tempLog.findIndex(entry => entry.id === currentCallId && entry.type === 'call' && entry.problem === 'fibonacci' && entry.n === n && entry.status === 'active');
            if (callEntryIndex !== -1) {
                tempLog[callEntryIndex] = { ...tempLog[callEntryIndex], status: 'returned', value: result };
            }
            tempLog.push({ type: 'return', id: currentCallId, problem: 'fibonacci', value: result, indent, fromN: n });
            return result;
        };

        // Tower of Hanoi Logic
        const instrumentedTowerOfHanoi = (n, source, auxiliary, destination, indent = 0) => {
            const currentCallId = callIdCounter++;
            tempLog.push({ type: 'call', id: currentCallId, problem: 'towerOfHanoi', n, source, auxiliary, destination, indent, status: 'active' });

            if (n === 1) {
                tempLog.push({ type: 'move', id: callIdCounter++, problem: 'towerOfHanoi', disk: 1, from: source, to: destination, indent: indent + 1 });
            } else {
                instrumentedTowerOfHanoi(n - 1, source, destination, auxiliary, indent + 1);
                tempLog.push({ type: 'move', id: callIdCounter++, problem: 'towerOfHanoi', disk: n, from: source, to: destination, indent: indent + 1 });
                instrumentedTowerOfHanoi(n - 1, auxiliary, source, destination, indent + 1);
            }

            const callEntryIndex = tempLog.findIndex(entry => entry.id === currentCallId && entry.type === 'call' && entry.problem === 'towerOfHanoi' && entry.n === n && entry.status === 'active');
            if (callEntryIndex !== -1) {
                tempLog[callEntryIndex] = { ...tempLog[callEntryIndex], status: 'returned' };
            }
            tempLog.push({ type: 'return', id: currentCallId, problem: 'towerOfHanoi', indent, fromN: n });
        };

        // Permutations Logic
        const instrumentedPermutations = (arr, indent = 0, currentPermutation = [], used = new Set(), results = []) => {
            const currentCallId = callIdCounter++;
            tempLog.push({
                type: 'call',
                id: currentCallId,
                problem: 'permutations',
                n: currentPermutation.length, 
                inputArray: arr,
                currentPerm: [...currentPermutation],
                indent,
                status: 'active',
                results: [...results]
            });

            if (currentPermutation.length === arr.length) {
                results.push([...currentPermutation]);
                tempLog.push({
                    type: 'found_permutation',
                    id: callIdCounter++,
                    problem: 'permutations',
                    permutation: [...currentPermutation],
                    indent: indent + 1,
                    results: [...results]
                });
                tempLog.push({
                    type: 'return',
                    id: currentCallId,
                    problem: 'permutations',
                    value: JSON.stringify([...currentPermutation]),
                    indent,
                    fromN: currentPermutation.length,
                    results: [...results]
                });
                return;
            }

            for (let i = 0; i < arr.length; i++) {
                if (!used.has(arr[i])) {
                    used.add(arr[i]);
                    currentPermutation.push(arr[i]);

                    instrumentedPermutations(arr, indent + 1, currentPermutation, used, results);

                    currentPermutation.pop();
                    used.delete(arr[i]);
                }
            }

            const callEntryIndex = tempLog.findIndex(entry => entry.id === currentCallId && entry.type === 'call' && entry.problem === 'permutations' && entry.n === currentPermutation.length && entry.status === 'active');
            if (callEntryIndex !== -1) {
              tempLog[callEntryIndex] = { ...tempLog[callEntryIndex], status: 'returned', results: [...results] };
            }
            if (currentPermutation.length === 0 && indent === 0) {
                tempLog.push({
                    type: 'return',
                    id: currentCallId,
                    problem: 'permutations',
                    value: JSON.stringify(results),
                    indent,
                    fromN: arr.length,
                    results: [...results]
                });
            }
            return results;
        };

        switch (selectedProblem) {
            case 'factorial':
                instrumentedFactorial(problemInput);
                break;
            case 'fibonacci':
                instrumentedFibonacci(problemInput);
                break;
            case 'towerOfHanoi':
                instrumentedTowerOfHanoi(problemInput, 'A', 'B', 'C');
                break;
            case 'permutations':
                const inputArr = String(problemInput).split('');
                instrumentedPermutations(inputArr);
                break;
            default:
                console.error("Unknown problem selected:", selectedProblem);
        }
        setVisualizationLog(tempLog);
    };

    // Visualization Playback Controls
    const playVisualization = () => {
        if (visualizationLog.length === 0) return;

        setIsPlaying(true);
        if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
        }

        animationIntervalRef.current = setInterval(() => {
            setCurrentStep(prevStep => {
                if (prevStep < visualizationLog.length - 1) {
                    return prevStep + 1;
                } else {
                    setIsPlaying(false);
                    clearInterval(animationIntervalRef.current);
                    return prevStep;
                }
            });
        }, 800);
    };

    const pauseVisualization = () => {
        setIsPlaying(false);
        if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
        }
    };

    const nextStep = () => {
        pauseVisualization();
        setCurrentStep(prevStep => Math.min(prevStep + 1, visualizationLog.length - 1));
    };

    const prevStep = () => {
        pauseVisualization();
        setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
    };

    const currentProblemData = problemDescriptions[selectedProblem];
    const currentCode = codeSnippets[selectedProblem]?.[selectedLanguage] || codeSnippets[selectedProblem]?.JavaScript;

    if (!currentProblemData) {
        return <section className='w-[40%] min-h-full bg-[#282828] rounded-lg p-6 flex flex-col urbanist-font text-gray-300'>
            <p>Problem not found. Please select a valid problem.</p>
        </section>;
    }

    return (
        <section className='w-full mobile:w-full min-h-full bg-[#202020] rounded-lg p-6 flex flex-col mobile:p-4'>
            <div className="mb-6 pb-4 border-b border-gray-500">
                <h2 className=' text-gray-200 font-bold text-2xl mb-2 mobile:text-xl'>{currentProblemData.title}</h2>
                <p className='text-gray-400 text-sm mb-3' dangerouslySetInnerHTML={{ __html: currentProblemData.description }}></p>
                <p className='text-gray-400 text-sm mb-3'>
                    Mathematically, it can be expressed as:
                </p>
                <p className='text-gray-300 font-semibold text-sm mb-3' dangerouslySetInnerHTML={{ __html: currentProblemData.mathematicalFormula.replace(/\\/g, '') }}></p>
                <p className='text-gray-400 text-sm mb-3' dangerouslySetInnerHTML={{ __html: currentProblemData.task }}></p>

                <div className="bg-[#313131] p-4 rounded-md mb-3">
                    <p className="text-gray-300 font-semibold text-sm mb-5">Examples:</p>
                    {currentProblemData.examples.map((example, index) => (
                        <div key={index} className="mb-2">
                            <p className="text-gray-400 text-xs"><strong>Example {index + 1}:</strong></p>
                            <p className="text-gray-400 text-xs ml-3">Input: {example.input}</p>
                            <p className="text-gray-400 text-xs ml-3">Output: {example.output}</p>
                            <p className="text-gray-500 text-xs ml-3" dangerouslySetInnerHTML={{ __html: example.explanation.replace(/\\/g, '') }}></p>
                        </div>
                    ))}
                </div>

                <div className="bg-[#313131] p-4 rounded-md">
                    <p className="text-gray-300 font-semibold text-sm mb-2">Constraints:</p>
                    <ul className="list-disc list-inside text-gray-400 text-xs">
                        {currentProblemData.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mb-6 mt-2">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                    Select Language:
                </label>
                <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onSelectLanguage={setSelectedLanguage}
                />
            </div>

            <CodeDisplay code={currentCode} language={selectedLanguage} />

            <div className="flex items-center gap-4 mb-6 text-sm mobile:text-xs">
                <label htmlFor="problem-input" className="text-gray-300 font-medium urbanist-font">
                    Enter {currentProblemData.inputType === 'number' ? 'N' : 'Input'}:
                </label>
                <input
                    id="problem-input"
                    type={currentProblemData.inputType}
                    min={currentProblemData.constraints[0] && currentProblemData.inputType === 'number' ? parseInt(currentProblemData.constraints[0].match(/\d+/)[0]) : undefined}
                    max={currentProblemData.constraints[0] && currentProblemData.inputType === 'number' ? parseInt(currentProblemData.constraints[0].match(/<= (\d+)/)?.[1]) : undefined}
                    value={problemInput}
                    onChange={(e) => {
                        if (currentProblemData.inputType === 'number') {
                            setProblemInput(parseInt(e.target.value) || 0);
                        } else {
                            setProblemInput(e.target.value);
                        }
                    }}
                    suppressHydrationWarning
                    className="w-24 p-2 bg-[#3a3a3a] text-gray-200 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                    suppressHydrationWarning
                    onClick={runProblemVisualization}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200 urbanist-font"
                >
                    Run
                </button>
            </div>

            {visualizationLog.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4 justify-center text-sm mobile:text-xs">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 urbanist-font"
                    >
                        Previous
                    </button>
                    <button
                        onClick={isPlaying ? pauseVisualization : playVisualization}
                        disabled={currentStep >= visualizationLog.length - 1 && !isPlaying}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 urbanist-font"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={currentStep >= visualizationLog.length - 1}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 urbanist-font"
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
};

export default CodePanel;