import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.render(
    <BrowserRouter basename="https://ashleighc207.github.io/my-reads-react-app"><App /></BrowserRouter>, 
    document.getElementById('root')
)
