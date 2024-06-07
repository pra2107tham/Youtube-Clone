import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store/configureStore.js'
import { Provider } from 'react-redux'
// import dotenv from "dotenv"

// dotenv.config({
//   path: '../.env'
// })


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
   <Provider store={store}> 
    <App />
    </Provider>
  // </React.StrictMode>,
)
