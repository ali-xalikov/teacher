import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { SiteBackground } from './components/SiteBackground'
import { ToastProvider } from './components/ToastProvider'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { TeacherPage } from './pages/TeacherPage'

/** Sahifa almashganda yuqoriga qaytadi */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteBackground />
      <ToastProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teacher/:slug" element={<TeacherPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}
