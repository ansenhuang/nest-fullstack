import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { inspectorServer } from 'react-dev-inspector/plugins/vite';
import usePluginImport from 'vite-plugin-importer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    inspectorServer(),
    usePluginImport({
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    usePluginImport({
      libraryName: '@ant-design/icons',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }),
    usePluginImport({
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }),
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: /^src/, replacement: path.join(__dirname, 'src') },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 5600,
    proxy: {
      '/api': {
        target: 'http://localhost:5700',
        changeOrigin: true,
      },
    },
  },
});
