import resolve from '@rollup/plugin-node-resolve'; // Resolve dependencies
import multiEntry from "rollup-plugin-multi-entry";

export default {
  input: 'public/js/*.js', // Entry point for your application
  output: {
    file: 'public/bundle.js', // Output file for bundled code
    format: 'es', // Output format (e.g., IFFE for browser usage)
  },
  plugins: [
    resolve(), // Enable dependency resolution
    multiEntry(),
  ],
};