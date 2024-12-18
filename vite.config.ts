import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      REACT_APP_GDRIVE_CID: JSON.stringify(process.env.REACT_APP_GDRIVE_CID),
      REACT_APP_GDRIVE_APIKEY: JSON.stringify(process.env.REACT_APP_GDRIVE_APIKEY),
    },
  },
})
