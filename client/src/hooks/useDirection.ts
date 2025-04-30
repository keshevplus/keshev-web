import { useState, useEffect } from 'react';

const useDirection = (): { direction: string; toggleDirection: () => void } => {
  const [direction, setDirection] = useState<string>('rtl'); // Default to 'rtl'

  useEffect(() => {
    document.documentElement.dir = direction; // Set the direction on the root element
  }, [direction]);

  const toggleDirection = (): void => {
    setDirection((prevDirection: string) => (prevDirection === 'rtl' ? 'ltr' : 'rtl'));
  };

  return { direction, toggleDirection };
};

export default useDirection;
