'use client';

import React, { useState, useRef } from 'react';
import CodePanel from '../components/CodePanel.js';
import Header from '../components/Header.js';
import VisualPanel from '../components/VisualPanel.js'; // Import the new VisualPanel component

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

                <div className="w-full h-[100vh] flex gap-6 pb-10 px-10 pt-24 mobile:flex-col mobile:px-4 mobile:pt-20 mobile:h-auto mobile:gap-8">
                    <div className='w-[40%] h-full overflow-y-auto mobile:w-full'>
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
                    </div>

                    <div className='w-[60%] h-full overflow-y-auto mobile:w-full mobile:h-[90vh]'>
                        <VisualPanel
                            visualizationLog={visualizationLog}
                            currentStep={currentStep}
                            selectedProblem={selectedProblem}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}