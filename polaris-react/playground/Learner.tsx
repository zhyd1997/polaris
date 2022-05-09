import React from 'react';
import {
  Layout,
  Page,
  Card,
  List,
  useInContextLearningSteps,
  InContextLearning,
  InContextLearningProvider,
} from '../src';
import styles from './Learner.scss';

const LEARNING_STEPS = [
  {
    ref: null,
    content: <span>Step 1: 1 × Oasis Glass, 4-Pack</span>,
  },
  {
    ref: null,
    content: <span>Step 2: another piece of content</span>,
  },
  {
    ref: null,
    content: <span>Step 3: a third piece of content</span>,
  },
];

export function LearnerContent() {
  const {updateSteps} = useInContextLearningSteps();

  return (
    <div className={styles.Root}>
      <Page narrowWidth>
        <Layout>
          <Layout.Section>
            <InContextLearning />

            <Card
              title="Shipment 1234"
              secondaryFooterActions={[
                {content: 'Cancel shipment', destructive: true},
              ]}
              primaryFooterAction={{
                content: 'Add tracking number',
              }}
            >
              <Card.Section title="Items">
                <List>
                  <List.Item>
                    <span
                      ref={(ref) => {
                        updateSteps(0, ref);
                      }}
                    >
                      1 × Oasis Glass, 4-Pack
                    </span>
                  </List.Item>
                  <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
                </List>
              </Card.Section>
            </Card>
            <Card
              title="Shipment 1234"
              secondaryFooterActions={[
                {content: 'Cancel shipment', destructive: true},
              ]}
              primaryFooterAction={{content: 'Add tracking number'}}
            >
              <Card.Section title="Items">
                <List>
                  <List.Item></List.Item>
                  <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
                </List>
              </Card.Section>
            </Card>
            <Card>
              <Card.Section title="Collections">
                <span
                  ref={(ref) => {
                    updateSteps(2, ref);
                  }}
                >
                  another piece of content
                </span>
              </Card.Section>
              <Card.Section title="Tags">
                <span
                  ref={(ref) => {
                    updateSteps(1, ref);
                  }}
                >
                  a third piece of content
                </span>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}

export function Learner() {
  return (
    <InContextLearningProvider steps={LEARNING_STEPS}>
      <LearnerContent />
    </InContextLearningProvider>
  );
}
