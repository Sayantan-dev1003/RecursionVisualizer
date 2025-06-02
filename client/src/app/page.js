'use client';

import React, { useState, useRef } from 'react';
import CodePanel from '../components/CodePanel.js';
import Header from '../components/Header.js';

export default function HomePage() {
    const [selectedProblem, setSelectedProblem] = useState('factorial');

    const [visualizationLog, setVisualizationLog] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const animationIntervalRef = useRef(null);

    return (
        <>
            <main className='w-full min-h-screen bg-[#101010] montserrat'>
                <Header
                    selectedProblem={selectedProblem}
                    setSelectedProblem={setSelectedProblem}
                />

                <div className="w-full flex gap-6 pb-10 px-10 pt-24 mobile:flex-col mobile:px-4 mobile:pt-20">
                    <CodePanel
                        selectedProblem={selectedProblem}
                        setVisualizationLog={setVisualizationLog}
                        setCurrentStep={setCurrentStep}
                        setIsPlaying={setIsPlaying}
                        currentStep={currentStep}
                        visualizationLog={visualizationLog}
                        isPlaying={isPlaying}
                        animationIntervalRef={animationIntervalRef}
                    />

                    <section className='w-[60%] min-h-full bg-[#282828] rounded-lg p-6 flex flex-col'>
                        <h2 className='urbanist-font text-gray-200 font-bold text-2xl mb-4'>
                            {selectedProblem.charAt(0).toUpperCase() + selectedProblem.slice(1).replace(/([A-Z])/g, ' $1')} Visualization
                        </h2>
                        <p className='text-gray-400 text-sm mb-4'>
                            Watch the function calls and returns as the recursion unfolds here.
                        </p>

                        <div className="flex-grow bg-[#1a1a1a] p-4 rounded-md border border-gray-700 overflow-y-auto relative">
                            {visualizationLog.length === 0 ? (
                                <p className="text-center text-gray-500 mt-10 urbanist-font">Run the function to see the visualization here.</p>
                            ) : (
                                <div className="space-y-2">
                                    {visualizationLog.slice(0, currentStep + 1).map((entry, index) => (
                                        <div
                                            key={index}
                                            className={`p-3 rounded-md shadow-sm transition-all duration-300 ease-in-out
                        ${entry.type === 'call'
                                                    ? 'bg-blue-800 border-l-4 border-blue-500 text-white'
                                                    : 'bg-green-800 border-l-4 border-green-500 text-white'
                                                }
                        ${index === currentStep ? 'ring-2 ring-purple-400 scale-105' : ''}
                        `}
                                            style={{ marginLeft: `${entry.indent * 20}px` }}
                                        >
                                            {entry.type === 'call' ? (
                                                <p className="font-mono text-sm text-gray-100">
                                                    CALL: {selectedProblem}(<span className="font-bold">{entry.n}</span>)
                                                </p>
                                            ) : (
                                                <p className="font-mono text-sm text-gray-100">
                                                    RETURN: <span className="font-bold">{entry.value}</span> (from {selectedProblem}(<span className="font-bold">{entry.fromN}</span>))
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}