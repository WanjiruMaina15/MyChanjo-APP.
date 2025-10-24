import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './components/LandingPage'
import RegistrationPage from './components/RegistrationPage'
import LoginPage from './components/LoginPage'
import BabyInfoPage from './components/BabyInfoPage'
import AddAnotherChildPage from './components/AddAnotherChildPage'
import Dashboard from './components/Dashboard'
import ResourcesPage from './components/ResourcesPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages WITHOUT header/footer */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Pages WITH header and footer */}
        <Route path="/baby-info" element={<><Header /><BabyInfoPage /><Footer /></>} />
        <Route path="/add-child" element={<><Header /><AddAnotherChildPage /><Footer /></>} />
        <Route path="/dashboard" element={<><Header /><Dashboard /><Footer /></>} />
        <Route path="/resources" element={<><Header /><ResourcesPage /><Footer /></>} />
      </Routes>
    </Router>
  )
}

export default App