import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'dist/cjs/index.js',
  output: [
    {
      name: 'QuickerJSClassTransformer',
      format: 'umd',
      file: 'dist/bundles/index.umd.js',
      sourcemap: true,
    },
    {
      name: 'QuickerJSClassTransformer',
      format: 'umd',
      file: 'dist/bundles/index.umd.min.js',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [commonjs(), nodeResolve()],
};
