import React from 'react';

const OpenSourceWarning: React.FC = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-6 rounded-md shadow-sm">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-yellow-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 12a9 9 0 110-18 9 9 0 010 18z" />
        </svg>
        <strong className="text-md font-semibold">Open Source Exposure</strong>
      </div>
      <p className="text-sm mt-2">
        Your data was found in public code repositories or paste sites. This often means your credentials may have been exposed unintentionally on platforms like GitHub or Pastebin.
        <br />
        <span className="font-medium">Recommended:</span> Rotate any keys or passwords tied to this email.
      </p>
    </div>
  );
};

export default OpenSourceWarning;
