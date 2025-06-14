'use client';

import React from 'react';

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }) => {
  const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {languages.map((lang) => (
        <button
          suppressHydrationWarning
          key={lang}
          onClick={() => onSelectLanguage(lang)}
          className={`px-4 py-2 text-xs rounded-lg font-medium transition-colors duration-200
            ${selectedLanguage === lang
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-700 text-gray-300 hover:bg-blue-800 hover:text-white'
            }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;