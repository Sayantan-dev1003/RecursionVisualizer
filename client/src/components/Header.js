'use client';

import React from 'react';

const Header = ({ selectedProblem, setSelectedProblem }) => {
    const handleProblemChange = (event) => {
        setSelectedProblem(event.target.value);
    };

    return (
        <header className='w-full h-20 bg-[#101010] fixed top-0 left-0 z-50 flex items-center justify-between px-10 mobile:px-4 mobile:h-16'>
            <p className='montserrat text-3xl font-bold text-gray-200 mobile:text-lg'>Recursion Visualizer</p>

            <select
                suppressHydrationWarning
                value={selectedProblem}
                onChange={handleProblemChange}
                className='bg-[#282828] w-1/3 max-w-xs p-2 rounded-md text-gray-300 cursor-pointer border-none outline-none montserrat text-lg mobile:text-xs mobile:p-1.5'
            >
                <option value="factorial">Factorial</option>
                <option value="fibonacci">Fibonacci</option>
                <option value="towerOfHanoi">Tower of Hanoi</option>
                <option value="permutations">Permutations</option>
            </select>
        </header>
    );
};

export default Header;