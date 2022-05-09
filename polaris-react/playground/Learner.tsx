import React, {useEffect, useState, useLayoutEffect} from 'react';

import {Button, Layout, Page, Card, List, InContextLearning} from '../src';

import styles from './Learner.scss';

const LEARNING_STEPS = [
  {
    className: '.learning-step-one',
    content: <span>Step 1: Testing React</span>,
  },
  {
    className: '.learning-step-two',
    content: <span>Step 2: Testing React</span>,
  },
];

export function Learner() {
  return (
    <div className={styles.Root}>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <InContextLearning>
              <InContextLearning.Step target=".learning-step-one">
                <p>Step one content</p>
              </InContextLearning.Step>
              <InContextLearning.Step target=".learning-step-two">
                <p>Step two content</p>
              </InContextLearning.Step>
              <InContextLearning.Step target="#learning-step-three">
                <p>Step three content</p>
              </InContextLearning.Step>
            </InContextLearning>
            <Card
              title="Shipment 1234"
              secondaryFooterActions={[
                {content: 'Cancel shipment', destructive: true},
              ]}
              primaryFooterAction={{content: 'Add tracking number'}}
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

            <Card>
              <Card.Section title="Collections">
                <span className="learning-step-two">
                  another piece of content
                </span>
              </Card.Section>
              <Card.Section title="Tags" />
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Layout>
              <Layout.Section oneHalf>123 Sesame Street</Layout.Section>
              <Layout.Section oneHalf>
                <Button id="learning-step-three" onClick={() => {}}>
                  Edit address
                </Button>
              </Layout.Section>
            </Layout>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
