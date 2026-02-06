import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Изменили BrowserRouter на HashRouter
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import ContractorApp from './pages/ContractorApp';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router> {/* Теперь используем HashRouter */}
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/contractor" element={<ContractorApp />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
