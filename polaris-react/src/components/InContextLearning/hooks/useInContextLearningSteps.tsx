import {useContext} from 'react';
import {InContextLearningContext} from '../context';
import type {InContextLearningContextValue} from '../types';

export function useInContextLearningSteps(): InContextLearningContextValue {
  const inContextLearningContext = useContext(InContextLearningContext);
  if (!inContextLearningContext)
    throw new Error(
      'No InContextLearningProvider found when calling useInContextLearningSteps.',
    );
  return inContextLearningContext;
}
