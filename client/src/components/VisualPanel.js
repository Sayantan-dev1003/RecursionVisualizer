'use client';

import React, { useState, useEffect } from 'react';

const VisualPanel = ({ visualizationLog, currentStep, selectedProblem }) => {
  const [visualStack, setVisualStack] = useState([]);
  const [currentNarration, setCurrentNarration] = useState("");
  const [hanoiPegs, setHanoiPegs] = useState({ A: [], B: [], C: [] });
  const [numDisks, setNumDisks] = useState(0);

  const ALL_PEG_LABELS = ['A', 'B', 'C'];

  const formatProblemName = (problem) => {
    return problem.charAt(0).toUpperCase() + problem.slice(1).replace(/([A-Z])/g, ' $1');
  };

  useEffect(() => {
    if (currentStep === 0 && visualizationLog.length === 0) {
      setVisualStack([]);
      setCurrentNarration("");
      const resetPegs = ALL_PEG_LABELS.reduce((acc, label) => ({ ...acc, [label]: [] }), {});
      setHanoiPegs(resetPegs);
      setNumDisks(0);
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
        let initialDisks = 0;
        const tempHanoiPegs = ALL_PEG_LABELS.reduce((acc, label) => ({ ...acc, [label]: [] }), {});

        const firstCallEntry = visualizationLog.find(e => e.type === 'call' && e.problem === 'towerOfHanoi');
        if (firstCallEntry) {
            initialDisks = firstCallEntry.n;
            setNumDisks(initialDisks);

            for (let i = initialDisks; i >= 1; i--) {
                tempHanoiPegs[firstCallEntry.source].push(i);
            }
        }

        for (let i = 0; i <= currentStep; i++) {
            const logEntry = visualizationLog[i];
            if (logEntry.type === 'move' && logEntry.problem === 'towerOfHanoi') {
                const diskToMove = tempHanoiPegs[logEntry.from].pop();
                if (diskToMove) {
                    tempHanoiPegs[logEntry.to].push(diskToMove);
                }
            }
        }
        setHanoiPegs({ ...tempHanoiPegs }); 
      }
    }
  }, [currentStep, visualizationLog, selectedProblem]);

  const getDiskWidth = (diskNumber, totalDisks) => {
    if (totalDisks === 0) return 0;
    const maxWidth = 150;
    const minWidth = 40;
    return minWidth + (diskNumber - 1) * ((maxWidth - minWidth) / (totalDisks - 1 || 1));
  };

  const getDiskColor = (diskNumber) => {
    const colors = [
      '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e',
      '#10b981', '#06b6d4', '##0ea5e9', '#3b82f6', '#6366f1',
      '#8b5cf6', '#a855f7', '#d946da', '#ec4899', '#f43f5e'
    ];
    return colors[(diskNumber - 1) % colors.length];
  };

  // SVG dimensions
  const svgWidth = 400;
  const svgHeight = 250;
  const pegWidth = 10;
  const pegHeight = 150;
  const baseHeight = 15;
  const diskHeight = 20;
  const paddingBottom = 10;

  const pegXPositions = {};
  ALL_PEG_LABELS.forEach((label, index) => {
    pegXPositions[label] = (svgWidth / (ALL_PEG_LABELS.length + 1)) * (index + 1);
  });

  return (
    <section className='w-full min-h-full bg-[#202020] rounded-lg p-6 flex flex-col'>
      <h2 className='text-gray-200 font-bold text-2xl mb-4'>
        {formatProblemName(selectedProblem)} Visualization
      </h2>
      <p className='text-gray-400 text-sm mb-4'>
        Watch the function calls and returns as the recursion unfolds here.
      {selectedProblem === 'towerOfHanoi' && numDisks > 0 && (
          <span className="font-bold ml-2"> (N = {numDisks} Disks)</span>
        )}
      </p>

      <div className="flex-grow bg-[#1a1a1a] p-4 rounded-md border border-gray-700 relative flex mobile:flex-col-reverse">
        {visualizationLog.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 w-full">Run the function to see the visualization here.</p>
        ) : (
          <>
            {/* Event Log Section */}
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

            {/* Call Stack / ToH Graphical View Section */}
            {selectedProblem !== 'towerOfHanoi' ? (
              // Call Stack for Factorial and Fibonacci (unchanged)
              <div className="w-2/5 mobile:w-full h-full flex flex-col items-center justify-end pt-4 pl-4 mobile:pl-0 mobile:pb-4 mobile:mb-6 mobile:border-b mobile:border-l-0">
                <h3 className="text-gray-300 text-lg mb-2 sticky top-0 bg-[#1a1a1a] z-10 py-1">Call Stack:</h3>
                
                <div className="w-full flex-grow flex flex-col-reverse items-center justify-start overflow-y-hidden">
                  {[...visualStack].reverse().map((entry) => (
                    <div
                      key={entry.visualId}
                      className={`
                        w-10/12 p-3 my-1 rounded-md shadow-lg
                        transition-all duration-300 ease-in-out transform
                        ${entry.type === 'call'
                          ? 'bg-blue-700 border-l-4 border-blue-400 text-white animate-fade-in-up'
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
                  <div className="bg-purple-700 text-white px-4 py-2 mt-4 rounded-lg shadow-lg text-center z-10 text-sm animate-fade-in-down mb-4">
                    {currentNarration}
                  </div>
                )}
              </div>
            ) : (
              // TOWER OF HANOI GRAPHICAL VIEW
              <div className="w-2/5 mobile:w-full h-full flex flex-col items-center justify-start pt-20 border-gray-400 pl-4 mobile:pl-0 mobile:pt-4 mobile:border-b mobile:pb-4 mobile:mb-6 mobile:border-l-0">
                <h3 className="text-gray-300 text-base mb-4 text-center">Tower of Hanoi Graphical View:</h3>
                <div className="flex-grow w-full bg-[#1a1a1a] p-4 rounded-md border border-gray-700 flex items-center justify-center">
                  <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
                    <rect
                      x="0"
                      y={svgHeight - baseHeight}
                      width={svgWidth}
                      height={baseHeight}
                      fill="#574136"
                    />

                    {ALL_PEG_LABELS.map((pegId) => (
                      <rect
                        key={pegId}
                        x={pegXPositions[pegId] - pegWidth / 2}
                        y={svgHeight - baseHeight - pegHeight}
                        width={pegWidth}
                        height={pegHeight}
                        fill="#A0522D"
                        rx="3" ry="3"
                      />
                    ))}

                    {ALL_PEG_LABELS.map((pegId) => (
                      <text
                        key={`label-${pegId}`}
                        x={pegXPositions[pegId]}
                        y={svgHeight - baseHeight - pegHeight - 10}
                        textAnchor="middle"
                        fill="#D1D5DB" 
                        fontSize="14"
                        fontFamily="monospace"
                      >
                        {pegId}
                      </text>
                    ))}

                    {Object.entries(hanoiPegs).map(([pegId, disksOnPeg]) => (
                      disksOnPeg.map((diskNumber, index) => {
                        const diskWidth = getDiskWidth(diskNumber, numDisks);
                        const diskColor = getDiskColor(diskNumber);
                        const x = pegXPositions[pegId] - diskWidth / 2;
                        const y = svgHeight - baseHeight - (diskHeight * (index + 1)) - paddingBottom;
                        return (
                          <rect
                            key={`disk-${diskNumber}`}
                            x={x}
                            y={y}
                            width={diskWidth}
                            height={diskHeight}
                            fill={diskColor}
                            rx="5" ry="5"
                            className="transition-all duration-300 ease-in-out" 
                          />
                        );
                      })
                    ))}
                  </svg>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default VisualPanel;