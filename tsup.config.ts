export default {
  entryPoints: ['./src'],
  ignoreWatch: ['./src/**/*.test.ts', './src/**/*.spec.ts'],
  format: 'esm',
  outDir: './dist',
  minify: true,
  dts: false,
}
