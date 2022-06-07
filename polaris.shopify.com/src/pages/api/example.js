import { transformSync } from "@babel/core";
import fs from "fs";
import path from "path";
// import webpack from "webpack";
import { rollup } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

// import { renderToStaticMarkup } from "react-dom/server";

// <script src="https://unpkg.com/browse/requirejs@2.3.6/require.js></script>
// <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
// <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
// <script type="module" src="https://unpkg.com/@shopify/polaris@9.12.2/build/esm/index.js"></script>
// <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@9.12.2/build/esm/styles.css"></link>

const getHtml = (options) => {
  const { compiledSource, path, sourcecode } = options;

  return `
  <!DOCTYPE>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${path} - Polaris Example</title>

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
    // const babelResult = transformSync(sourcecode, {
    //   presets: [
    //     "@babel/preset-react",
    //     "@babel/preset-env",
    //     // ["@babel/preset-env", { modules: "commonjs" }],
    //     // ["@babel/preset-env", { modules: "systemjs" }],
    //   ],
    //   // presets: [require("@babel/preset-react"), require("@babel/preset-env")]
    // });

    // console.log("babelResult\n");
    // console.log(babelResult.code);

    // compiledSource = babelResult.code;

    const extensions = [".js", ".jsx", ".ts", ".tsx"];

    console.log(fullExamplePath);

    rollup({
      input: fullExamplePath,
      output: {
        file: "bundle.js",
        format: "cjs",
      },
      plugins: [
        typescript(),
        // Allows node_modules resolution
        nodeResolve({ extensions }),
        // Allow bundling cjs modules. Rollup doesn't understand cjs
        commonjs(),
        // Compile TypeScript/JavaScript files
        babel({
          extensions,
          rootMode: "upward",
          babelHelpers: "bundled",
        }),
      ],
    }).then((bundle) => {
      // console.log("bundle", bundle);

      console.log(bundle.generate({}));
    });

    // webpack(
    //   {
    //     entry: fullExamplePath,
    //     mode: "production",
    //     module: {
    //       rules: [
    //         {
    //           test: /\.tsx$/,
    //           exclude: /(node_modules)/,
    //           use: {
    //             loader: "babel-loader",
    //             options: {
    //               presets: ["@babel/preset-react", "@babel/preset-env"],
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   (err, stats) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }

    //     console.log(
    //       stats.toString({
    //         chunks: false, // Makes the build much quieter
    //         colors: true, // Shows colors in the console
    //       })
    //     );
    //   }
    // );
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
