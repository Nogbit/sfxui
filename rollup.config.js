import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs'

const extensions = ['.js', '.ts' ];

export default  {
  external: ['@svgdotjs/svg.js'],
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/bundles/bundle.esm.js',
      format: 'esm',
      sourcemap: true,
      globals: {
        '@svgdotjs/svg.js': 'SVG'
      }
    },
    {
      file: 'lib/bundles/bundle.esm.min.js',
      format: 'esm',
      plugins: [terser()],
      sourcemap: true,
      globals: {
        '@svgdotjs/svg.js': 'SVG'
      }
    },
    {
      file: 'lib/bundles/bundle.umd.js',
      format: 'umd',
      name: 'sfxui',
      sourcemap: true,
      globals: {
        '@svgdotjs/svg.js': 'SVG'
      }
    },
    {
      file: 'lib/bundles/bundle.umd.min.js',
      format: 'umd',
      name: 'sfxui',
      plugins: [terser()],
      sourcemap: true,
      globals: {
        '@svgdotjs/svg.js': 'SVG'
      }
    }
  ],
  plugins: [
    resolve({ extensions }),
    babel({ babelHelpers: 'bundled', include: ['src/**/*.ts'], extensions, exclude: './node_modules/**'}),
    commonjs(),
  ]
}