import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" style={styles.footer}>
      <div className="footer-content" style={styles.footerContent}>
        <div className="footer-section" style={styles.footerSection}>
          <h3 style={styles.footerTitle}>EdTech Solutions Platform</h3>
          <p style={styles.footerText}>
            Система операционного управления проектами для партнеров-интеграторов
          </p>
        </div>
        
        <div className="footer-section" style={styles.footerSection}>
          <h3 style={styles.footerTitle}>Контакты</h3>
          <div style={styles.contactItem}>
            <FaPhone style={styles.icon} />
            <span>+7 (495) 123-45-67</span>
          </div>
          <div style={styles.contactItem}>
            <FaEnvelope style={styles.icon} />
            <span>testdrive@npk-edtech.ru</span>
          </div>
          <div style={styles.contactItem}>
            <FaMapMarkerAlt style={styles.icon} />
            <span>Москва, ул. Технологическая, 15</span>
          </div>
        </div>
        
        <div className="footer-section" style={styles.footerSection}>
          <h3 style={styles.footerTitle}>Тест-драйв системы</h3>
          <p style={styles.footerText}>
            Отправьте ТЗ и через час получите КП и доступ к платформе
          </p>
          <button style={styles.testDriveBtn}>
            Запустить тест-драйв
          </button>
        </div>
      </div>
      
      <div className="footer-bottom" style={styles.footerBottom}>
        <p>© 2024 ООО «НПК Эдтех Солюшнс». Все права защищены.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '40px 0 20px',
    marginTop: 'auto',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
  },
  footerSection: {
    marginBottom: '20px',
  },
  footerTitle: {
    fontSize: '18px',
    marginBottom: '15px',
    color: '#3498db',
  },
  footerText: {
    fontSize: '14px',
    lineHeight: '1.6',
    opacity: 0.8,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    fontSize: '14px',
  },
  icon: {
    color: '#3498db',
  },
  testDriveBtn: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    marginTop: '15px',
    transition: 'all 0.3s ease',
  },
  footerBottom: {
    textAlign: 'center',
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    fontSize: '14px',
    opacity: 0.7,
  },
};

export default Footer;
