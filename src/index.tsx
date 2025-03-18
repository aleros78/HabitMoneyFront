import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Nuova versione disponibile. Vuoi aggiornare?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("L'app è pronta per funzionare offline!");
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)