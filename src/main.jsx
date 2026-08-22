import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AdminAuthProvider>
          <App />
        </AdminAuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)