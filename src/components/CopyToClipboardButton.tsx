import React, { useState } from 'react';

const CopyToClipboardButton = ({ text = 'Formula or code snippet' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <button onClick={handleCopy}>Copy to Clipboard</button>
      {copied && <p>Copied!</p>}
    </div>
  );
};

export default CopyToClipboardButton;
