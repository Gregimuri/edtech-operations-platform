import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaClock, FaMapMarkedAlt, FaChartLine, FaShieldAlt, FaCogs } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="landing">
      {/* Герой секция */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Ваш проект — наша система
            <br />
            <span style={styles.heroHighlight}>От ТЗ до сдачи в один клик</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Операционная платформа для управления удаленными проектами по монтажу по всей России
          </p>
          <div style={styles.heroButtons}>
            <Link to="/dashboard" style={styles.primaryButton}>
              <FaRocket /> Демо-доступ
            </Link>
            <button style={styles.secondaryButton}>
              <FaClock /> Тест-драйв за 3 дня
            </button>
          </div>
        </div>
      </section>

      {/* Три столпа */}
      <section style={styles.pillarsSection}>
        <h2 style={styles.sectionTitle}>Три столпа нашей системы</h2>
        <div style={styles.pillarsGrid}>
          <div style={styles.pillarCard}>
            <div style={styles.pillarIcon}>
              <FaCogs />
            </div>
            <h3 style={styles.pillarTitle}>Цифровой регламент</h3>
            <p style={styles.pillarText}>
              Превращаем ваше ТЗ в пошаговый чек-лист с обязательным фотоотчетом по каждому этапу
            </p>
          </div>
          
          <div style={styles.pillarCard}>
            <div style={styles.pillarIcon}>
              <FaMapMarkedAlt />
            </div>
            <h3 style={styles.pillarTitle}>Предсказуемая логистика</h3>
            <p style={styles.pillarText}>
              Оборудование и бригада прибывают синхронно. Никаких простоев на объекте
            </p>
          </div>
          
          <div style={styles.pillarCard}>
            <div style={styles.pillarIcon}>
              <FaChartLine />
            </div>
            <h3 style={styles.pillarTitle}>Сквозная отчетность</h3>
            <p style={styles.pillarText}>
              Личный дашборд с онлайн-трекингом проекта. Все данные в реальном времени
            </p>
          </div>
        </div>
      </section>

      {/* Коммерческое предложение */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>3 несгораемых предложения</h2>
          <div style={styles.offerGrid}>
            <div style={styles.offerCard}>
              <h3 style={styles.offerTitle}>КП за 1 час</h3>
              <p style={styles.offerText}>Получите коммерческое предложение в течение часа после запроса</p>
            </div>
            <div style={styles.offerCard}>
              <h3 style={styles.offerTitle}>Бесплатный регламент</h3>
              <p style={styles.offerText}>Разработаем детальный цифровой план работ под ваш проект</p>
            </div>
            <div style={styles.offerCard}>
              <h3 style={styles.offerTitle}>Тест-драйв системы</h3>
              <p style={styles.offerText}>Бесплатный выезд бригады на объект для демонстрации работы</p>
            </div>
          </div>
          <div style={styles.ctaForm}>
            <input 
              type="email" 
              placeholder="Ваш email для доступа к демо" 
              style={styles.emailInput}
            />
            <button style={styles.ctaButton}>
              Получить демо-доступ
            </button>
          </div>
        </div>
      </section>

      {/* География */}
      <section style={styles.geographySection}>
        <h2 style={styles.sectionTitle}>Наша география — ваша сила</h2>
        <div style={styles.mapPlaceholder}>
          <div style={styles.mapOverlay}>
            <div style={styles.mapPoint}></div>
            <div style={{...styles.mapPoint, left: '30%', top: '40%'}}></div>
            <div style={{...styles.mapPoint, left: '60%', top: '60%'}}></div>
            <div style={{...styles.mapPoint, left: '40%', top: '70%'}}></div>
            <div style={{...styles.mapPoint, left: '70%', top: '30%'}}></div>
          </div>
          <p style={styles.mapText}>Проекты в 50+ городах России</p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    color: 'white',
    padding: '80px 20px',
    textAlign: 'center',
    borderRadius: '10px',
    marginBottom: '60px',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '48px',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  heroHighlight: {
    color: '#2ecc71',
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '40px',
    opacity: 0.9,
  },
  heroButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 30px',
    backgroundColor: '#2ecc71',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 30px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  pillarsSection: {
    padding: '60px 20px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '36px',
    marginBottom: '50px',
    color: '#2c3e50',
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  pillarCard: {
    backgroundColor: 'white',
    padding: '40px 30px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
  },
  pillarIcon: {
    fontSize: '48px',
    color: '#3498db',
    marginBottom: '20px',
  },
  pillarTitle: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  pillarText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#666',
  },
  ctaSection: {
    padding: '60px 20px',
  },
  ctaCard: {
    backgroundColor: 'white',
    padding: '60px 40px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '36px',
    marginBottom: '40px',
    color: '#2c3e50',
  },
  offerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginBottom: '50px',
  },
  offerCard: {
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  offerTitle: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#3498db',
  },
  offerText: {
    fontSize: '16px',
    color: '#666',
  },
  ctaForm: {
    display: 'flex',
    gap: '15px',
    maxWidth: '600px',
    margin: '0 auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emailInput: {
    flex: '1',
    minWidth: '250px',
    padding: '15px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
  },
  ctaButton: {
    padding: '15px 40px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  geographySection: {
    padding: '60px 20px',
    textAlign: 'center',
  },
  mapPlaceholder: {
    height: '400px',
    backgroundColor: '#e8f4fc',
    borderRadius: '10px',
    position: 'relative',
    overflow: 'hidden',
  },
  mapOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  mapPoint: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: '#3498db',
    borderRadius: '50%',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 0 0 10px rgba(52, 152, 219, 0.3)',
  },
  mapText: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
  },
};

export default Landing;
