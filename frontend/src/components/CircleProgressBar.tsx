import React, { useEffect, useRef } from 'react';
import ProgressBar from 'progressbar.js'

interface CircleProgressBarProps {
  value?: number; // Value should be between 0 and 1
}

const CircleProgressBar: React.FC<CircleProgressBarProps> = ({ value = 1.0 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<ProgressBar.Circle | null>(null);

  useEffect(() => {
    // Initialize the progress bar
    if (containerRef.current) {
      barRef.current = new ProgressBar.Circle(containerRef.current, {
        color: '#aaa',
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false,
        },
        from: { color: '#aaa', width: 1 },
        to: { color: '#333', width: 4 },
        step: (state, circle) => {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
          
          const value = `${Math.round(circle.value() * 100)}%`;
          circle.setText(value === "0%" ? '' : value);
        },
      });
  
      barRef.current.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      barRef.current.text.style.fontSize = '2rem';
      
      // Animate the progress bar to the desired value
      barRef.current.animate(value);
    }

    // Cleanup function to destroy the progress bar on component unmount
    return () => {
      if (barRef.current) {
        barRef.current.destroy();
      }
    };
  }, [value]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default CircleProgressBar;
