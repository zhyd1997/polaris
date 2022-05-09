import React, {useEffect, useRef, useState} from 'react';
import {useInContextLearningSteps} from './hooks';
import {Step} from './components';
import {Button} from '../Button';
import type {InContextLearningStep} from './types';

interface Position {
  top: number;
  left: number;
}

export function InContextLearning() {
  const {steps} = useInContextLearningSteps();
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
  const {ref} = step;
  const offsetHeight = wrapperHeight ? wrapperHeight / 3 : 0;
  if (!ref) {
    return {top: 0 + offsetHeight, left: 0};
  }
  const rect = ref.getBoundingClientRect();
  return {top: rect.top + offsetHeight, left: rect.left};
}

InContextLearning.Step = Step;
