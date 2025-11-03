import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TaskHolder from './components/TaskHolder.jsx'

import './styles/adapt.css'
import './styles/base.css'
import './styles/components.css'
import './styles/fonts.css'
import './styles/icons.css'
import './styles/layouts.css'
import './styles/reset.css'

createRoot(document.body).render(
  
    <TaskHolder />
  
)
