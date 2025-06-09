'use client';

import React, { useState, useEffect } from 'react';

const VisualPanel = ({ visualizationLog, currentStep, selectedProblem }) => {
  const [visualStack, setVisualStack] = useState([]);
  const [currentNarration, setCurrentNarration] = useState("");
  const [hanoiPegs, setHanoiPegs] = useState({ A: [], B: [], C: [] });
  const [numDisks, setNumDisks] = useState(0);
  const [currentPermutation, setCurrentPermutation] = useState([]);
  const [allPermutations, setAllPermutations] = useState([]);

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
      setCurrentPermutation([]);
      setAllPermutations([]);
      return;
    }

    if (visualizationLog.length > 0 && currentStep < visualizationLog.length) {
      const entry = visualizationLog[currentStep];

      let narrationText = "";
      if (entry.type === 'call') {
        if (entry.problem === 'factorial' || entry.problem === 'fibonacci') {
          narrationText = `Calling ${formatProblemName(entry.problem)}(${entry.n})`;
        } else if (entry.problem === 'towerOfHanoi') {
          narrationText = `CALL: TowerOfHanoi(${entry.n}, ${entry.source}, ${entry.auxiliary}, ${entry.destination})`;
        } else if (entry.problem === 'permutations') {
          narrationText = `CALL: Permutations(depth=${entry.indent}, current: [${Array.isArray(entry.currentPerm) ? entry.currentPerm.join(', ') : ''}])`;
        }
      } else if (entry.type === 'return') {
        if (entry.problem === 'factorial' || entry.problem === 'fibonacci') {
          narrationText = `Returning ${entry.value} from ${formatProblemName(entry.problem)}(${entry.fromN})`;
        } else if (entry.problem === 'towerOfHanoi') {
          narrationText = `RETURN: from TowerOfHanoi(${entry.fromN})`;
        } else if (entry.problem === 'permutations') {
          let returnValue = entry.value;
          try {
            const parsedValue = JSON.parse(entry.value);
            if (Array.isArray(parsedValue) && parsedValue.every(Array.isArray)) {
                returnValue = `[${parsedValue.map(p => `[${p.join(', ')}]`).join(', ')}]`;
            } else if (Array.isArray(parsedValue)) {
                returnValue = `[${parsedValue.join(', ')}]`;
            }
          } catch (e) {
          }
          narrationText = `RETURN: from Permutations - Value: ${returnValue}`;
        }
      } else if (entry.type === 'move' && entry.problem === 'towerOfHanoi') {
        narrationText = `MOVE Disk ${entry.disk} from ${entry.from} to ${entry.to}`;
      } else if (entry.type === 'found_permutation' && entry.problem === 'permutations') {
        narrationText = `Found Permutation: [${Array.isArray(entry.permutation) ? entry.permutation.join(', ') : ''}]`;
      } else if (entry.type === 'add_element' && entry.problem === 'permutations') {
        narrationText = `ADD: '${entry.element}' to current permutation. New: [${Array.isArray(entry.currentPerm) ? entry.currentPerm.join(', ') : ''}]`;
      } else if (entry.type === 'remove_element' && entry.problem === 'permutations') {
        narrationText = `REMOVE: '${entry.element}' from current permutation. New: [${Array.isArray(entry.currentPerm) ? entry.currentPerm.join(', ') : ''}]`;
      } else if (entry.type === 'try_element' && entry.problem === 'permutations') {
        narrationText = `TRY: Placing '${entry.element}' at depth ${entry.atIndex}.`;
      }
      setCurrentNarration(narrationText);

      if (selectedProblem === 'factorial' || selectedProblem === 'fibonacci') {
        setHanoiPegs(ALL_PEG_LABELS.reduce((acc, label) => ({ ...acc, [label]: [] }), {}));
        setCurrentPermutation([]);
        setAllPermutations([]);

        const tempStack = [];
        for (let i = 0; i <= currentStep; i++) {
          const logEntry = visualizationLog[i];
          if (logEntry.type === 'call') {
            tempStack.push({ ...logEntry, visualId: logEntry.id });
          } else if (logEntry.type === 'return') {
            const callIndex = tempStack.findIndex(
              item => item.visualId === logEntry.id && item.type === 'call' && item.problem === logEntry.problem
            );
            if (callIndex !== -1) {
              tempStack.splice(callIndex, 1);
            }
          }
        }
        setVisualStack(tempStack);
      } else if (selectedProblem === 'towerOfHanoi') {
        setVisualStack([]);
        setCurrentPermutation([]);
        setAllPermutations([]);

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
            const sourcePegDisks = [...tempHanoiPegs[logEntry.from]];
            const destPegDisks = [...tempHanoiPegs[logEntry.to]];

            const diskToMove = sourcePegDisks.pop();
            if (diskToMove) {
              destPegDisks.push(diskToMove);
              tempHanoiPegs[logEntry.from] = sourcePegDisks;
              tempHanoiPegs[logEntry.to] = destPegDisks;
            }
          }
        }
        setHanoiPegs({ ...tempHanoiPegs });
      } else if (selectedProblem === 'permutations') {
        setVisualStack([]);
        setHanoiPegs(ALL_PEG_LABELS.reduce((acc, label) => ({ ...acc, [label]: [] }), {}));
        setNumDisks(0);

        let tempCurrentPermutation = [];
        let tempAllPermutations = [];
        let permutationStateStack = [];

        for (let i = 0; i <= currentStep; i++) {
          const logEntry = visualizationLog[i];
          if (logEntry.problem === 'permutations') {
            if (logEntry.type === 'call') {
                permutationStateStack.push({
                    currentPerm: Array.isArray(logEntry.currentPerm) ? [...logEntry.currentPerm] : [],
                    used: Array.isArray(logEntry.usedElements) ? [...logEntry.usedElements] : [],
                });
            } else if (logEntry.type === 'add_element') {
                if (permutationStateStack.length > 0) {
                    permutationStateStack[permutationStateStack.length - 1].currentPerm = Array.isArray(logEntry.currentPerm) ? [...logEntry.currentPerm] : [];
                    permutationStateStack[permutationStateStack.length - 1].used = Array.isArray(logEntry.usedElements) ? [...logEntry.usedElements] : [];
                }
            } else if (logEntry.type === 'remove_element') {
                if (permutationStateStack.length > 0) {
                    permutationStateStack[permutationStateStack.length - 1].currentPerm = Array.isArray(logEntry.currentPerm) ? [...logEntry.currentPerm] : [];
                    permutationStateStack[permutationStateStack.length - 1].used = Array.isArray(logEntry.usedElements) ? [...logEntry.usedElements] : [];
                }
            } else if (logEntry.type === 'found_permutation') {
                tempAllPermutations = Array.isArray(logEntry.results) ? [...logEntry.results] : [];
            } else if (logEntry.type === 'return') {
                if (permutationStateStack.length > 0) {
                    if (logEntry.indent === 0) {
                        tempCurrentPermutation = [];
                        if (logEntry.value) {
                             try {
                                tempAllPermutations = JSON.parse(logEntry.value);
                            } catch (e) {
                            }
                        }
                    } else {
                        permutationStateStack.pop();
                    }
                }
            }
          }
        }

        if (permutationStateStack.length > 0) {
            setCurrentPermutation(permutationStateStack[permutationStateStack.length - 1].currentPerm);
        } else {
            setCurrentPermutation([]);
        }
        setAllPermutations(tempAllPermutations);
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
    <section className='w-full min-h-full bg-[#202020] rounded-lg p-6 flex flex-col mobile:p-4'>
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
                      ${entry.type === 'call'
                        ? 'bg-blue-800 border-l-4 border-blue-500 text-white'
                        : entry.type === 'return'
                          ? 'bg-green-800 border-l-4 border-green-500 text-white'
                          : entry.type === 'move'
                            ? 'bg-yellow-800 border-l-4 border-yellow-500 text-yellow-100'
                            : entry.type === 'found_permutation'
                              ? 'bg-purple-800 border-l-4 border-purple-500 text-purple-100'
                              : entry.type === 'add_element'
                                ? 'bg-indigo-800 border-l-4 border-indigo-500 text-indigo-100'
                                : entry.type === 'remove_element'
                                  ? 'bg-red-800 border-l-4 border-red-500 text-red-100'
                                  : entry.type === 'try_element'
                                    ? 'bg-teal-800 border-l-4 border-teal-500 text-teal-100'
                                    : 'bg-gray-700 text-gray-300'
                      }
                      ${index === currentStep ? 'ring-2 ring-purple-400 scale-105' : ''}
                    `}
                    style={{ marginLeft: `${entry.indent * 20}px` }}
                  >
                    {entry.type === 'call' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-gray-100">
                        CALL: {formatProblemName(entry.problem)}
                        {entry.problem === 'towerOfHanoi' && `(${entry.n}, ${entry.source}, ${entry.auxiliary}, ${entry.destination})`}
                        {(entry.problem === 'factorial' || entry.problem === 'fibonacci') && `(${entry.n})`}
                        {entry.problem === 'permutations' && `(depth=${entry.indent}, current: [${Array.isArray(entry.currentPerm) ? entry.currentPerm.join(', ') : ''}])`}
                      </p>
                    )}
                    {entry.type === 'return' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-gray-100">
                        RETURN:
                        {(entry.problem === 'factorial' || entry.problem === 'fibonacci') && (
                          <><span className="font-bold">{entry.value}</span> (from {formatProblemName(entry.problem)}(<span className="font-bold">{entry.fromN}</span>))</>
                        )}
                        {entry.problem === 'permutations' && (
                          <>
                            Value: <span className="font-bold">{(() => {
                              try {
                                const parsed = JSON.parse(entry.value);
                                if (Array.isArray(parsed) && parsed.every(Array.isArray)) {
                                  return `[${parsed.map(p => `[${p.join(', ')}]`).join(', ')}]`;
                                } else if (Array.isArray(parsed)) {
                                  return `[${parsed.join(', ')}]`;
                                }
                                return entry.value;
                              } catch (e) {
                                return entry.value;
                              }
                            })()}</span> (from Permutations)
                          </>
                        )}
                      </p>
                    )}
                    {entry.type === 'move' && entry.problem === 'towerOfHanoi' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-yellow-100">
                        MOVE: Disk <span className="font-bold">{entry.disk}</span> from {entry.from} to {entry.to}
                      </p>
                    )}
                    {entry.type === 'found_permutation' && entry.problem === 'permutations' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-purple-100">
                        FOUND: [<span className="font-bold">{Array.isArray(entry.permutation) ? entry.permutation.join(', ') : ''}</span>]
                      </p>
                    )}
                    {entry.type === 'add_element' && entry.problem === 'permutations' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-indigo-100">
                        ADD: <span className="font-bold">{entry.element}</span> to current permutation. New: [<span className="font-bold">{Array.isArray(entry.currentPerm) ? entry.currentPerm.join(', ') : ''}</span>]
                      </p>
                    )}
                    {entry.type === 'remove_element' && entry.problem === 'permutations' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-red-100">
                        REMOVE: <span className="font-bold">{entry.element}</span> from current permutation. New: [<span className="font-bold">{Array.isArray(entry.currentPerm) ? entry.currentPerm.join(', ') : ''}</span>]
                      </p>
                    )}
                    {entry.type === 'try_element' && entry.problem === 'permutations' && (
                      <p className="font-mono text-sm mobile:text-[0.7rem] text-teal-100">
                        TRY: Placing <span className="font-bold">{entry.element}</span> at depth <span className="font-bold">{entry.atIndex}</span>. Current: [<span className="font-bold">{Array.isArray(entry.currentPerm) ? entry.currentPerm.join(', ') : ''}</span>]
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Visualization Section */}
            {selectedProblem === 'factorial' || selectedProblem === 'fibonacci' ? (
              // Call Stack for Factorial and Fibonacci
              <div className="w-2/5 mobile:w-full h-full flex flex-col items-center justify-end pt-4 pl-4 mobile:pl-0 mobile:pb-4 mobile:mb-6 mobile:border-b mobile:border-l-0">
                <h3 className="text-gray-300 text-lg mb-2 sticky top-0 bg-[#1a1a1a] z-10 py-1">Call Stack:</h3>

                <div className="w-full flex-grow flex flex-col-reverse items-center justify-start overflow-y-hidden">
                  {[...visualStack].map((entry) => (
                    <div
                      key={entry.visualId}
                      className={`
                        w-10/12 p-3 my-1 rounded-md shadow-lg
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
                  <div className="bg-purple-700 text-white px-4 py-2 mt-4 rounded-lg shadow-lg text-center z-10 text-sm animate-fade-in-down mb-4">
                    {currentNarration}
                  </div>
                )}
              </div>
            ) : selectedProblem === 'towerOfHanoi' ? (
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
            ) : selectedProblem === 'permutations' ? (
              // PERMUTATIONS VISUALIZATION
              <div className="w-2/5 mobile:w-full h-full flex flex-col items-center justify-start pt-4 pl-4 mobile:pl-0 mobile:pb-4 mobile:mb-6 mobile:border-b mobile:border-l-0">
                <h3 className="text-gray-300 text-lg mb-2 sticky top-0 bg-[#1a1a1a] z-10 py-1">Permutations State:</h3>
                <div className="w-full flex-grow flex flex-col items-center justify-start overflow-y-auto">
                  <div className="w-full p-3 my-2 rounded-md shadow-lg bg-gray-700 border-l-4 border-gray-500 text-white">
                    <p className="font-mono text-sm md:text-base text-gray-100 text-center">
                      Current Permutation: [<span className="font-bold">{currentPermutation.join(', ')}</span>]
                    </p>
                  </div>
                  <div className="w-full p-3 my-2 rounded-md shadow-lg bg-gray-800 border-l-4 border-gray-600 text-white">
                    <p className="font-mono text-sm md:text-base text-gray-100 text-center">
                      Found Permutations:
                    </p>
                    <div className="text-xs text-gray-300 text-center mt-1">
                      {allPermutations.length > 0 ? (
                        allPermutations.map((perm, idx) => (
                          <span key={idx} className="block">[{perm.join(', ')}]</span>
                        ))
                      ) : (
                        <span>None yet</span>
                      )}
                    </div>
                  </div>
                </div>

                {currentNarration && (
                  <div className="bg-purple-700 text-white px-4 py-2 mt-4 rounded-lg shadow-lg text-center z-10 text-sm animate-fade-in-down mb-4">
                    {currentNarration}
                  </div>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
};

export default VisualPanel;