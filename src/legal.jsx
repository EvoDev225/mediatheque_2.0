import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/fraunces/opsz.css'
import '@fontsource-variable/fraunces/opsz-italic.css'
import '@fontsource-variable/inter/index.css'
import './styles/global.css'
import Footer from './components/Footer'
import Legal from './components/Legal'
import Navbar from './components/Navbar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Legal />
    <Footer />
  </StrictMode>,
)
