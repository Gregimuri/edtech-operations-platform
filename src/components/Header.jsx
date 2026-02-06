import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaProjectDiagram, FaUser, FaCog } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Главная', icon: <FaHome /> },
    { path: '/dashboard', label: 'Дашборд', icon: <FaTachometerAlt /> },
    { path: '/project/1', label: 'Проект', icon: <FaProjectDiagram /> },
    { path: '/contractor', label: 'Для бригад', icon: <FaUser /> },
    { path: '/admin', label: 'Админка', icon: <FaCog /> },
  ];

  return (
    <header className="header" style={styles.header}>
      <div className="container" style={styles.container}>
        <div className="logo" style={styles.logo}>
          <Link to="/" style={styles.logoLink}>
            <h1 style={styles.logoText}>ESP</h1>
            <span style={styles.logoSubtitle}>EdTech Solutions Platform</span>
          </Link>
        </div>
        
        <nav className="nav" style={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navLink,
                ...(location.pathname === item.path ? styles.navLinkActive : {})
              }}
            >
              {item.icon}
              <span style={styles.navText}>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="user-menu" style={styles.userMenu}>
          <Link to="/login" style={styles.loginBtn}>
            <FaUser /> Войти
          </Link>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'white',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginRight: '10px',
    background: 'linear-gradient(45deg, #3498db, #2ecc71)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoSubtitle: {
    fontSize: '14px',
    opacity: 0.8,
  },
  nav: {
    display: 'flex',
    gap: '10px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 15px',
    borderRadius: '6px',
    textDecoration: 'none',
    color: 'white',
    transition: 'all 0.3s ease',
  },
  navLinkActive: {
    backgroundColor: '#3498db',
  },
  navText: {
    fontSize: '14px',
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
  },
  loginBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
  },
};

export default Header;
