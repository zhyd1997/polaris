import { Card, VisuallyHidden, Heading, FormLayout, TextField } from "@shopify/polaris";
import React from "react";

<Card sectioned>
  <VisuallyHidden>
    <Heading>Title and description</Heading>
  </VisuallyHidden>
  <FormLayout>
    <TextField
      label="Title"
      value="Artisanal Wooden Spoon"
      onChange={() => {}}
      autoComplete="off"
    />
    <TextField
      label="Description"
      multiline
      onChange={() => {}}
      autoComplete="off"
    />
  </FormLayout>
</Card>