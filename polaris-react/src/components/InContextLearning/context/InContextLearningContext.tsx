import React, {createContext, useRef, useState} from 'react';
import type {
  InContextLearningContextValue,
  InContextLearningStep,
} from '../types';

export const InContextLearningContext =
  createContext<InContextLearningContextValue>({
    steps: [],
    updateSteps: () => {
      console.log('placeholder');
    },
  });

interface Props {
  steps: InContextLearningStep[];
  children?: React.ReactNode;
}

export const InContextLearningProvider = ({steps, children}: Props) => {
  // const [managedState, setManagedState] = useState(steps)
  const managedSteps = useRef(steps);

  const updateSteps = (step: number, ref: HTMLElement) => {
    if (!managedSteps.current[step]) {
      console.warn('No step found at index', step);
      return;
    }
    // const newManagedSteps: InContextLearningStep[] = [...managedSteps];
    // newManagedSteps[step].ref = ref;
    // setManagedSteps(newManagedSteps);
    managedSteps.current[step].ref = ref; // useRef here avoids the infinite loops triggered by useState using commented code above
  };

  const contextValue: InContextLearningContextValue = {
    steps: managedSteps.current,
    updateSteps,
  };

  return (
    <InContextLearningContext.Provider value={contextValue}>
      {children}
    </InContextLearningContext.Provider>
  );
};
