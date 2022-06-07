import { transformSync } from "@babel/core";
import fs from "fs";
import path from "path";

// import { renderToStaticMarkup } from "react-dom/server";

const getHtml = (options) => {
  const { compiledSource, path, sourcecode } = options;

  return `
  <!DOCTYPE>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${path} - Polaris Example</title>
      <script src="https://unpkg.com/browse/requirejs@2.3.6/require.js></script>

      <script type="module" src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script type="module" src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

      <script type="module" src="https://unpkg.com/@shopify/polaris@9.12.2/build/esm/index.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@9.12.2/build/esm/styles.css">
    </head>
    <body>
      <div id="root"></div>
      <script type="module">
        ${compiledSource}
      </script>
    </body>
  </html>
  `;
};

const getExample = (examplePath) => {
  const fullExamplePath = path.join(
    process.cwd(),
    `content/components${examplePath}`
  );
  let sourcecode = "";
  let compiledSource = "";

  if (fs.existsSync(fullExamplePath)) {
    sourcecode = fs.readFileSync(fullExamplePath, "utf-8");

    sourcecode += `
      const domContainer = document.querySelector('#root');
      var ReactDOM = require('react-dom/client');
      const root = ReactDOM.createRoot(domContainer);

      root.render(<Example />);
    `;
  }

  if (sourcecode) {
    const babelResult = transformSync(sourcecode, {
      presets: [
        "@babel/preset-react",
        "@babel/preset-env",
        // ["@babel/preset-env", { modules: "commonjs" }],
        // ["@babel/preset-env", { modules: "systemjs" }],
      ],
      // presets: [require("@babel/preset-react"), require("@babel/preset-env")]
    });

    console.log("babelResult\n");
    console.log(babelResult.code);

    compiledSource = babelResult.code;
  }

  return { compiledSource, path: examplePath, sourcecode };
};

const handler = (req, res) => {
  const examplePath = req?.query?.path || "/button/basic-button.tsx";
  const example = getExample(examplePath);
  const html = getHtml(example);

  res.setHeader("content-type", "text/html");
  res.send(html);
};

export default handler;
