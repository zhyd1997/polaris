import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import html from '@rollup/plugin-html';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-import-css';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const output = {
  format: 'umd',
  entryFileNames: '[name].js',
  dir: 'dist',
  inlineDynamicImports: true,
};

const plugins = [
  // Allows node_modules resolution
  nodeResolve({extensions, preferBuiltins: true}),
  // Allow bundling cjs modules. Rollup doesn't understand cjs
  commonjs(),
  // Assets
  css(),
  json(),
  // Compile TypeScript/JavaScript files
  babel({
    extensions,
    rootMode: 'upward',
    include: ['src/**/*'],
    babelHelpers: 'bundled',
  }),
];

/**
 * @type {import('rollup').RollupOptions}
 */
const rollupOptions = [
  {
    input: 'src/plugin.ts',
    output,
    plugins,
  },
  {
    input: 'src/ui.tsx',
    output,
    plugins: [
      ...plugins,
      html({
        template: () => {
          return `
        <!DOCTYPE html>
        <html>
          <head>
            <link rel="stylesheet" href="./bundle.css">
          </head>
          <body>
            <div id="root"></div>
            <script type=module src="./ui.js"></script>
          </body>
        </html>
        `;
        },
      }),
    ],
    external: ['antd'],
  },
];

// eslint-disable-next-line import/no-default-export
export default rollupOptions;
