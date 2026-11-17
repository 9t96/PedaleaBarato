import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './components/Home.tsx';
import Retailers from './components/Retailers.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/vendedores" element={<Retailers/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
