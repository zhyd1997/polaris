import React, {useEffect, useMemo, useRef, useState} from 'react';

import {Step} from './components';
import {Button} from '../Button';
import {styles} from '../CustomProperties/styles';

interface Position {
  top: number;
  left: number;
}

interface Props {
  children: React.ReactElement[];
}

export function InContextLearning({children}: Props) {
  const hasMultipleSteps = children.length > 0;
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const wrapperRef = useRef(null);

  const currentTarget: string = useMemo(() => {
    return children[currentStep]?.props?.target;
  }, [currentStep, children]);

  const showPrev = hasMultipleSteps && currentStep > 0;
  const showNext = hasMultipleSteps && currentStep < children.length - 1;

  const handleNext = () => {
    setCurrentStep((currentStep) => currentStep + 1);
    console.warn('Next clicked');
  };

  const handlePrev = () => {
    setCurrentStep((currentStep) => currentStep - 1);
    console.warn('Prev clicked');
  };

  useEffect(() => {
    setCurrentPosition(updatePosition(currentTarget));
  }, [currentTarget]);

  return (
    <div
      style={{
        top: `${currentPosition?.top}px`,
        left: `${currentPosition?.left}px`,
        position: 'absolute',
        padding: '1em',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        zIndex: 2,
      }}
      ref={wrapperRef}
    >
      {children[currentStep]}
      {showPrev && <Button onClick={handlePrev}>Prev</Button>}
      {showNext && <Button onClick={handleNext}>Next</Button>}
    </div>
  );
}

function updatePosition(target: string, wrapperHeight: number = 0) {
  const offsetHeight = wrapperHeight / 2;
  const domElement = document.querySelector(target);
  if (!domElement) {
    return {top: 0 + offsetHeight, left: 0};
  }
  const rect = domElement.getBoundingClientRect();
  return {top: rect.top + offsetHeight, left: rect.left};
}

InContextLearning.Step = Step;
