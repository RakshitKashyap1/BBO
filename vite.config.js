/**
 * @file vite.config.js
 * @description Configuration file for Vite, the build tool and development server used for this project.
 * It defines how the project should be bundled, which plugins to use, and other build-time settings.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    /**
     * plugins: An array of Vite plugins to be used.
     * react(): The official Vite plugin for React, providing Fast Refresh and other JSX transformations.
     */
    plugins: [react()],
})

