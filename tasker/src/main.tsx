import { createRoot } from 'react-dom/client'
import { TasksHolder } from './components/TaskHolder.tsx'

import './styles/adapt.css'
import './styles/base.css'
import './styles/components.css'
import './styles/fonts.css'
import './styles/icons.css'
import './styles/layouts.css'
import './styles/reset.css'

createRoot(document.body).render(
  
    <TasksHolder />
  
)
