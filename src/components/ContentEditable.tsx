// ContentEditable.tsx

import React, { useState } from 'react';

interface ContentEditableProps {
  content: string;
  onUpdate: (value: string) => void;
  className?: string;
}

const ContentEditable: React.FC<ContentEditableProps> = ({ 
  content, 
  onUpdate, 
  className = ''
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    if (value !== content) {
      onUpdate(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setEditing(false);
      onUpdate(value);
    }
  };

  return (
    <div className={`inline-block ${className}`}>
      {editing ? (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full px-1 py-1 border border-blue-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      ) : (
        <div
          onDoubleClick={handleDoubleClick}
          className="px-1 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        >
          {content || <span className="text-gray-400 italic">Empty</span>}
        </div>
      )}
    </div>
  );
};

export default ContentEditable;
