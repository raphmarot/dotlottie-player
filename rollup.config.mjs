import autoprefixer from 'autoprefixer'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
import flexbugs from 'postcss-flexbugs-fixes'
import json from '@rollup/plugin-json'
import livereload from 'rollup-plugin-livereload'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import postcssLit from 'rollup-plugin-postcss-lit'
import replace from '@rollup/plugin-replace'
import serve from 'rollup-plugin-serve'
import summary from 'rollup-plugin-summary'
import { minify, swc } from 'rollup-plugin-swc3'

import template from 'rollup-plugin-html-literals'

import pkg from './package.json' assert { type: 'json' }

const isProd = process.env.NODE_ENV !== 'development',
  input = './src/index.ts',
  plugins = (preferBuiltins = false) => [
    postcss({
      inject: false,
      plugins: [
        flexbugs(),
        autoprefixer({
          flexbox: 'no-2009',
        }),
      ],
    }),
    postcssLit({
      importPackage: 'lit',
    }),
    template(),
    replace({
      preventAssignment: false,
      'Reflect.decorate': 'undefined',
    }),
    json({
      compact: true,
    }),
    nodeResolve({
      extensions: ['.ts'],
      jsnext: true,
      module: true,
      preferBuiltins,
    }),
    commonjs(),
    swc(),
  ],
  unpkgPlugins = () => [
    ...plugins(),
    isProd && minify(),
    isProd && summary(),
    !isProd &&
      serve({
        open: true,
      }),
    !isProd && livereload(),
  ],
  modulePlugins = () => [
    ...plugins(true),
    isProd && summary()
  ]

export default [
  {
    input: './types/index.d.ts',
    output: {
      file: pkg.types,
      format: 'esm',
    },
    plugins: [dts()],
  },
  {
    input,
    output: {
      extend: true,
      file: pkg.unpkg,
      format: 'iife',
      name: pkg.name,
    },
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED')
        return
      warn(warning)
    },
    plugins: unpkgPlugins(true),
  },
  {
    input,
    external: ['lit', 'lit/decorators.js', 'lottie-web', 'fflate'],
    output: [
      {
        file: pkg.module,
        format: 'esm',
      },
      {
        file: pkg.exports['.'].require,
        format: 'cjs',
      },
    ],
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED')
        return
      warn(warning)
    },
    plugins: modulePlugins(),
  },
]