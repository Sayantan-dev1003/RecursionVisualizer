'use client';

import React, { useState, useEffect } from 'react';

const VisualPanel = ({ visualizationLog, currentStep, selectedProblem }) => {
  const [visualStack, setVisualStack] = useState([]);
  const [currentNarration, setCurrentNarration] = useState("");

  const formatProblemName = (problem) => {
    return problem.charAt(0).toUpperCase() + problem.slice(1).replace(/([A-Z])/g, ' $1');
  };

  useEffect(() => {
    if (currentStep === 0 && visualizationLog.length === 0) {
      setVisualStack([]);
      setCurrentNarration("");
      return;
    }

    if (visualizationLog.length > 0 && currentStep < visualizationLog.length) {
      const entry = visualizationLog[currentStep];

      let narrationText = "";
      if (entry.type === 'call' && entry.problem !== 'towerOfHanoi') {
        narrationText = `Calling ${formatProblemName(entry.problem)}(${entry.n})`;
      } else if (entry.type === 'return' && entry.problem !== 'towerOfHanoi') {
        narrationText = `Returning ${entry.value} from ${formatProblemName(entry.problem)}(${entry.fromN})`;
      } else if (entry.type === 'move' && entry.problem === 'towerOfHanoi') {
        narrationText = `MOVE Disk ${entry.disk} from ${entry.from} to ${entry.to}`;
      } else if (entry.type === 'call' && entry.problem === 'towerOfHanoi') {
        narrationText = `CALL: TowerOfHanoi(${entry.n}, ${entry.source}, ${entry.auxiliary}, ${entry.destination})`;
      } else if (entry.type === 'return' && entry.problem === 'towerOfHanoi') {
        narrationText = `RETURN: from TowerOfHanoi(${entry.fromN})`;
      }
      setCurrentNarration(narrationText);

      if (selectedProblem !== 'towerOfHanoi') {
        const tempStack = [];
        for (let i = 0; i <= currentStep; i++) {
          const logEntry = visualizationLog[i];
          if (logEntry.type === 'call') {
            tempStack.push({ ...logEntry, visualId: logEntry.id });
          } else if (logEntry.type === 'return') {
            const callIndex = tempStack.findIndex(
              item => item.visualId === logEntry.id && item.type === 'call'
            );
            if (callIndex !== -1) {
              tempStack.splice(callIndex, 1);
            }
          }
        }
        setVisualStack(tempStack);
      } else {
        setVisualStack([]);
      }
    }
  }, [currentStep, visualizationLog, selectedProblem]);

  return (
    <section className='w-full min-h-full bg-[#202020] rounded-lg p-6 flex flex-col'>
      <h2 className='text-gray-200 font-bold text-2xl mb-4'>
        {formatProblemName(selectedProblem)} Visualization
      </h2>
      <p className='text-gray-400 text-sm mb-4'>
        Watch the function calls and returns as the recursion unfolds here.
      </p>

      <div className="flex-grow bg-[#1a1a1a] p-4 rounded-md border border-gray-700 relative flex mobile:flex-col">
        {visualizationLog.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 w-full">Run the function to see the visualization here.</p>
        ) : (
          <>
            <div className="w-3/5 mobile:w-full h-[60vh] overflow-y-auto pr-4 mobile:pr-0 mobile:pb-4">
              <h3 className="text-gray-300 text-lg mb-2 sticky top-0 bg-[#1a1a1a] z-10 py-1">Event Log:</h3>
              <div className="space-y-2 p-2">
                {visualizationLog.slice(0, currentStep + 1).map((entry, index) => (
                  <div
                    key={`${entry.id}-${index}`}
                    className={`w-[70%] p-3 rounded-md shadow-sm transition-all duration-300 ease-in-out
                      ${entry.type === 'call' && entry.problem !== 'towerOfHanoi'
                        ? 'bg-blue-800 border-l-4 border-blue-500 text-white'
                        : entry.type === 'return' && entry.problem !== 'towerOfHanoi'
                          ? 'bg-green-800 border-l-4 border-green-500 text-white'
                          : entry.type === 'move' && entry.problem === 'towerOfHanoi'
                            ? 'bg-yellow-800 border-l-4 border-yellow-500 text-yellow-100'
                            : 'bg-gray-700 text-gray-300'
                      }
                      ${index === currentStep ? 'ring-2 ring-purple-400 scale-105' : ''}
                    `}
                    style={{ marginLeft: `${entry.indent * 20}px` }}
                  >
                    {entry.type === 'call' && entry.problem !== 'towerOfHanoi' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-gray-100">
                        CALL: {formatProblemName(entry.problem)}(<span className="font-bold">{entry.n}</span>)
                      </p>
                    )}
                    {entry.type === 'return' && entry.problem !== 'towerOfHanoi' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-gray-100">
                        RETURN: <span className="font-bold">{entry.value}</span> (from {formatProblemName(entry.problem)}(<span className="font-bold">{entry.fromN}</span>))
                      </p>
                    )}
                    {entry.type === 'move' && entry.problem === 'towerOfHanoi' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-yellow-100">
                        MOVE: Disk <span className="font-bold">{entry.disk}</span> from {entry.from} to {entry.to}
                      </p>
                    )}
                    {entry.type === 'call' && entry.problem === 'towerOfHanoi' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-blue-100">
                        CALL: TowerOfHanoi(<span className="font-bold">{entry.n}</span>, {entry.source}, {entry.auxiliary}, {entry.destination})
                      </p>
                    )}
                    {entry.type === 'return' && entry.problem === 'towerOfHanoi' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-green-100">
                        RETURN: from TowerOfHanoi(<span className="font-bold">{entry.fromN}</span>)
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {selectedProblem !== 'towerOfHanoi' ? (
              <div className="w-2/5 mobile:w-full h-full flex flex-col items-center justify-end pt-4 pl-4 mobile:pl-0 mobile:pt-4 mobile:border-t mobile:border-l-0">
                <h3 className="text-gray-300 text-lg mb-2 sticky top-0 bg-[#1a1a1a] z-10 py-1">Call Stack:</h3>
                
                <div className="w-full flex-grow flex flex-col-reverse items-center justify-start overflow-y-auto">
                  {[...visualStack].map((entry) => (
                    <div
                      key={entry.visualId}
                      className={`
                        w-10/12 p-3 my-1 rounded-md shadow-lg overflow-y-hidden
                        transition-all duration-300 ease-in-out transform
                        ${entry.type === 'call'
                          ? 'bg-blue-700 border-l-4 border-blue-400 text-white animate-fade-in-down'
                          : ''
                        }
                        ${entry.visualId === visualizationLog[currentStep]?.id && visualizationLog[currentStep]?.type === 'call' ? 'ring-2 ring-purple-400 scale-105' : ''}
                      `}
                      style={{ zIndex: visualStack.length - entry.indent }}
                    >
                      <p className="font-mono text-sm md:text-base text-gray-100 text-center">
                        {formatProblemName(entry.problem)}(<span className="font-bold">{entry.n}</span>)
                      </p>
                    </div>
                  ))}
                </div>

                {currentNarration && (
                  <div className="bg-purple-700 text-white px-4 py-2 mt-4 rounded-lg shadow-lg text-center z-10 text-sm animate-fade-out-up mb-4">
                    {currentNarration}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-2/5 mobile:w-full h-full flex flex-col items-center justify-start pt-20 border-l border-gray-700 pl-4 mobile:pl-0 mobile:pt-4 mobile:border-t mobile:border-l-0">
                <h3 className="text-gray-300 text-lg mb-4">Tower of Hanoi Graphical View:</h3>
                <div className="flex-grow w-full bg-[#1a1a1a] p-4 rounded-md border border-gray-700 flex items-center justify-center">
                  <p className="text-gray-500 text-center">
                    (Graphical Tower of Hanoi visualization will go here!)
                  </p>
                </div>
                <p className="text-gray-400 text-xs mt-4">
                  (Moves are shown in the Event Log on the left.)
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default VisualPanel;