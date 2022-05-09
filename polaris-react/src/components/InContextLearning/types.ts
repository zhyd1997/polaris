export interface InContextLearningStep {
  ref: HTMLElement | null;
  content: React.ReactNode;
}

export interface InContextLearningContextValue {
  steps: InContextLearningStep[];
  updateSteps: (step: number, ref: HTMLElement) => void;
}
