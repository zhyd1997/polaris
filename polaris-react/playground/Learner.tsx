import React, {useRef} from 'react';
import {Layout, Page, Card, List, InContextLearning} from '../src';
import styles from './Learner.scss';

const LEARNING_STEPS = [
  {
    className: '.learning-step-one',
    identifier: '[data-learning-step="one"]',
    content: <span>Step 1: Testing</span>,
  },
  {
    className: '.learning-step-two',
    content: <span>Step 2: Testing</span>,
  },
  {
    className: '.learning-step-three',
    content: <span>Step 3: Testing</span>,
  },
];

export function Learner() {
  const actionRef = useRef(null);
  return (
    <div className={styles.Root}>
      <Page narrowWidth>
        <Layout>
          <Layout.Section>
            <InContextLearning steps={LEARNING_STEPS} />

            <Card
              title="Shipment 1234"
              secondaryFooterActions={[
                {content: 'Cancel shipment', destructive: true},
              ]}
              primaryFooterAction={{
                content: 'Add tracking number',
                onAction: (event) => {
                  console.log(event.currentTarget);
                  actionRef.current = event.currentTarget;
                },
              }}
            >
              <Card.Section title="Items">
                <List>
                  <List.Item>
                    <span className="learning-step-one">
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
                <span className="learning-step-two">
                  another piece of content
                </span>
              </Card.Section>
              <Card.Section title="Tags">
                <span className="learning-step-three">
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
