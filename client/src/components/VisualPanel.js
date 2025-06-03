'use client';

import React from 'react';

const VisualPanel = ({ visualizationLog, currentStep, selectedProblem }) => {
  const formatProblemName = (problem) => {
    return problem.charAt(0).toUpperCase() + problem.slice(1).replace(/([A-Z])/g, ' $1');
  };

  return (
    <section className='w-full min-h-full bg-[#202020] rounded-lg p-6 flex flex-col'>
      <h2 className='text-gray-200 font-bold text-2xl mb-4'>
        {formatProblemName(selectedProblem)} Visualization
      </h2>
      <p className='text-gray-400 text-sm mb-4'>
        Watch the function calls and returns as the recursion unfolds here.
      </p>

      <div className="flex-grow bg-[#1a1a1a] p-4 rounded-md border border-gray-700 overflow-y-auto relative">
        {visualizationLog.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Run the function to see the visualization here.</p>
        ) : (
          <div className="space-y-2">
            {visualizationLog.slice(0, currentStep + 1).map((entry, index) => (
              <div
                key={index}
                className={`w-2/5 mobile:w-1/2 p-3 rounded-md shadow-sm transition-all duration-300 ease-in-out
                  ${entry.type === 'call'
                    ? 'bg-blue-800 border-l-4 border-blue-500 text-white'
                    : 'bg-green-800 border-l-4 border-green-500 text-white'
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
        )}
      </div>
    </section>
  );
};

export default VisualPanel;