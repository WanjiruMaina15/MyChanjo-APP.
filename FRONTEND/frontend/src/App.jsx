import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';
import Header from './Components/Header'
import Footer from './Components/Footer'
import SignInPage from './Components/Auth'
import Dashboard from './Components/Dashboard'
import Resources from './Components/ResourcesPage'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import BabyInfoPage from './Components/BabyInfoPage';
import LandingPage from './Components/LandingPage'; 


export default function App() {
  return (
    <Router>
     
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        
         <Header /> 
        
        <main className="flex-grow p-4 md:p-8">
          <Routes>
            
            <Route path="/register/*" element={<SignInPage />} />
            <Route path="/login/*" element={<SignInPage />} />

            <Route path="/add-baby" element={
              <>
                <SignedIn><BabyInfoPage /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />

            <Route path="/dashboard" element={
              <>
                <SignedIn><Dashboard /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />
            
            <Route path="/resources" element={
              <>
                <SignedIn><Resources /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />

            
            <Route path="/" element={
              <>
                <SignedIn>
               
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  
                  <LandingPage /> 
                </SignedOut>
              </>
            } />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}