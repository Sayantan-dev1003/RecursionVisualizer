'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeDisplay = ({ code, language }) => {
  const languageMap = {
    JavaScript: 'javascript',
    TypeScript: 'typescript',
    Python: 'python',
    Java: 'java',
    'C++': 'cpp',
  };

  const prismLanguage = languageMap[language] || 'javascript';

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-6">
      <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
        <span className="text-sm font-mono text-gray-300 urbanist-font">{language} Code</span>
      </div>
      <div className="p-4 font-xs">
        <SyntaxHighlighter
          language={prismLanguage}
          style={atomDark}
          showLineNumbers={true}
          wrapLines={true}
          customStyle={{
            backgroundColor: 'transparent',
            margin: 0,
            padding: 0,
            fontSize: '0.9rem',
          }}
          lineNumberStyle={{ color: '#666' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeDisplay;