import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';
import Header from './Components/Header'
import Footer from './Components/Footer'
import LandingPage from './Components/LandingPage'
import RegistrationPage from './Components/RegistrationPage'
import LoginPage from './Components/LoginPage'
import BabyInfoPage from './Components/BabyInfoPage'
import AddAnotherChildPage from './Components/AddAnotherChildPage'
import Dashboard from './Components/Dashboard'
import ResourcesPage from './Components/ResourcesPage'

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