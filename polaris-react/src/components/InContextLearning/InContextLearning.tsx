import React, {useEffect, useRef, useState} from 'react';

import {Step} from './components';
import {Button} from '../Button';

interface InContextLearningStep {
  className: string;
  content: React.ReactNode;
}

interface Position {
  top: number;
  left: number;
}

interface Props {
  children?: React.ReactElement[];
  steps: InContextLearningStep[];
}

export function InContextLearning({steps}: Props) {
  const hasMultipleSteps = steps.length > 0;
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getWrapperHeight = () => {
    if (!wrapperRef.current) {
      return 0;
    }
    const {height} = wrapperRef.current.getBoundingClientRect();
    return height;
  };

  useEffect(() => {
    setCurrentPosition(updatePosition(steps[currentStep], getWrapperHeight()));
  }, [currentStep, steps]);

  const showPrev = hasMultipleSteps && currentStep > 0;
  const showNext = hasMultipleSteps && currentStep < steps.length - 1;

  const handleNext = () => {
    setCurrentStep((currentStep) => currentStep + 1);
    console.warn('Next clicked');
  };

  const handlePrev = () => {
    setCurrentStep((currentStep) => currentStep - 1);
    console.warn('Prev clicked');
  };

  return (
    <div
      style={{
        top: `${currentPosition?.top}px`,
        left: `${currentPosition?.left}px,`,
        position: 'absolute',
        padding: '1em',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
      }}
      ref={wrapperRef}
    >
      <p>{steps[currentStep].content}</p>
      {showPrev && <Button onClick={handlePrev}>Prev</Button>}
      {showNext && <Button onClick={handleNext}>Next</Button>}
    </div>
  );
}

function updatePosition(step: InContextLearningStep, wrapperHeight?: number) {
  const {className} = step;
  const offsetHeight = wrapperHeight ? wrapperHeight / 3 : 0;
  const domElement = document.querySelector(className);
  if (!domElement) {
    return {top: 0 + offsetHeight, left: 0};
  }
  const rect = domElement.getBoundingClientRect();
  return {top: rect.top + offsetHeight, left: rect.left};
}

InContextLearning.Step = Step;
