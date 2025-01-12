import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import rootReducer from './reducer/index.js'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

const store =configureStore({
  reducer:rootReducer 
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
