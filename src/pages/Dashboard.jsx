import React, { useState } from 'react';
import { FaFilter, FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';
import DashboardWidget from '../components/DashboardWidget';

const Dashboard = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Монтаж LED-панелей в ТЦ "Авиапарк"',
      client: 'ООО "Техноинтегратор"',
      location: 'Москва',
      status: 'active',
      progress: 65,
      budget: '₽1,200,000',
      startDate: '2024-03-01',
      endDate: '2024-04-15',
    },
    {
      id: 2,
      title: 'Установка видеостены в БЦ "Око"',
      client: 'АО "Медиасистемы"',
      location: 'Санкт-Петербург',
      status: 'planning',
      progress: 20,
      budget: '₽850,000',
      startDate: '2024-03-15',
      endDate: '2024-05-10',
    },
    {
      id: 3,
      title: 'Оснащение конференц-зала в гостинице',
      client: 'Hilton Moscow',
      location: 'Москва',
      status: 'completed',
      progress: 100,
      budget: '₽2,100,000',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
    },
    {
      id: 4,
      title: 'Монтаж системы озвучивания ТРЦ',
      client: 'ТРЦ "Галерея"',
      location: 'Екатеринбург',
      status: 'warning',
      progress: 45,
      budget: '₽1,500,000',
      startDate: '2024-03-10',
      endDate: '2024-04-30',
    },
  ]);

  const stats = {
    activeProjects: 8,
    totalBudget: '₽15,800,000',
    completedThisMonth: 3,
    riskProjects: 2,
  };

  return (
    <div className="dashboard">
      <div style={styles.header}>
        <h1 style={styles.title}>Дашборд проектов</h1>
        <div style={styles.headerActions}>
          <button style={styles.btn}>
            <FaPlus /> Новый проект
          </button>
          <button style={styles.btnSecondary}>
            <FaFilter /> Фильтры
          </button>
        </div>
      </div>

      {/* Виджеты статистики */}
      <div style={styles.statsGrid}>
        <DashboardWidget
          title="Активные проекты"
          value={stats.activeProjects}
          icon="📊"
          color="#3498db"
        />
        <DashboardWidget
          title="Общий бюджет"
          value={stats.totalBudget}
          icon="💰"
          color="#2ecc71"
        />
        <DashboardWidget
          title="Завершено в этом месяце"
          value={stats.completedThisMonth}
          icon="✅"
          color="#9b59b6"
        />
        <DashboardWidget
          title="Проекты с риском"
          value={stats.riskProjects}
          icon="⚠️"
          color="#e74c3c"
        />
      </div>

      {/* Карта проектов (заглушка) */}
      <div style={styles.mapSection}>
        <div style={styles.mapHeader}>
          <h2 style={styles.sectionTitle}>География проектов</h2>
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <span style={{...styles.legendDot, backgroundColor: '#2ecc71'}}></span>
              <span>Активные</span>
            </div>
            <div style={styles.legendItem}>
              <span style={{...styles.legendDot, backgroundColor: '#e74c3c'}}></span>
              <span>С риском</span>
            </div>
            <div style={styles.legendItem}>
              <span style={{...styles.legendDot, backgroundColor: '#95a5a6'}}></span>
              <span>Завершённые</span>
            </div>
          </div>
        </div>
        <div style={styles.mapPlaceholder}>
          <div style={styles.mapPoints}>
            <div style={{...styles.mapPoint, left: '30%', top: '20%', backgroundColor: '#2ecc71'}}></div>
            <div style={{...styles.mapPoint, left: '40%', top: '30%', backgroundColor: '#e74c3c'}}></div>
            <div style={{...styles.mapPoint, left: '60%', top: '25%', backgroundColor: '#2ecc71'}}></div>
            <div style={{...styles.mapPoint, left: '50%', top: '50%', backgroundColor: '#95a5a6'}}></div>
            <div style={{...styles.mapPoint, left: '70%', top: '40%', backgroundColor: '#2ecc71'}}></div>
          </div>
        </div>
      </div>

      {/* Список проектов */}
      <div style={styles.projectsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Все проекты</h2>
          <div style={styles.searchBox}>
            <FaSearch style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Поиск проектов..." 
              style={styles.searchInput}
            />
          </div>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Название проекта</th>
                <th style={styles.th}>Клиент</th>
                <th style={styles.th}>Локация</th>
                <th style={styles.th}>Статус</th>
                <th style={styles.th}>Прогресс</th>
                <th style={styles.th}>Бюджет</th>
                <th style={styles.th}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{project.title}</strong>
                  </td>
                  <td style={styles.td}>{project.client}</td>
                  <td style={styles.td}>{project.location}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      ...(project.status === 'active' ? styles.statusActive : 
                           project.status === 'completed' ? styles.statusCompleted : 
                           project.status === 'warning' ? styles.statusWarning : 
                           styles.statusPlanning)
                    }}>
                      {project.status === 'active' ? 'В работе' : 
                       project.status === 'completed' ? 'Завершен' : 
                       project.status === 'warning' ? 'Риск' : 'Планирование'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.progressBar}>
                      <div 
                        style={{
                          ...styles.progressFill,
                          width: `${project.progress}%`,
                          backgroundColor: project.status === 'warning' ? '#e74c3c' : '#2ecc71'
                        }}
                      ></div>
                    </div>
                    <span style={styles.progressText}>{project.progress}%</span>
                  </td>
                  <td style={styles.td}>
                    <strong>{project.budget}</strong>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button style={styles.actionBtn}>
                        <FaEye />
                      </button>
                      <button style={styles.actionBtn}>
                        <FaEdit />
                      </button>
                      <button style={styles.actionBtn}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.projectsGrid}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Последние активности */}
      <div style={styles.activitySection}>
        <h2 style={styles.sectionTitle}>Последние активности</h2>
        <div style={styles.activityList}>
          <div style={styles.activityItem}>
            <div style={styles.activityIcon}>📸</div>
            <div style={styles.activityContent}>
              <p><strong>Москва, ТЦ "Авиапарк":</strong> Добавлены фотоотчеты по монтажу панелей 3-4 этаж</p>
              <small style={styles.activityTime}>10 минут назад</small>
            </div>
          </div>
          <div style={styles.activityItem}>
            <div style={styles.activityIcon}>🚚</div>
            <div style={styles.activityContent}>
              <p><strong>СПб, БЦ "Око":</strong> Оборудование прибыло на склад</p>
              <small style={styles.activityTime}>2 часа назад</small>
            </div>
          </div>
          <div style={styles.activityItem}>
            <div style={styles.activityIcon}>✅</div>
            <div style={styles.activityContent}>
              <p><strong>Екатеринбург, ТРЦ "Галерея":</strong> Этап 3/7 завершен и подтвержден</p>
              <small style={styles.activityTime}>5 часов назад</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    color: '#2c3e50',
  },
  headerActions: {
    display: 'flex',
    gap: '15px',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
  },
  btnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#3498db',
    border: '2px solid #3498db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  mapSection: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '25px',
    marginBottom: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  mapHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#2c3e50',
  },
  legend: {
    display: 'flex',
    gap: '20px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  mapPlaceholder: {
    height: '300px',
    backgroundColor: '#e8f4fc',
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
  },
  mapPoints: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  mapPoint: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 0 0 8px rgba(52, 152, 219, 0.3)',
  },
  projectsSection: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '25px',
    marginBottom: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    padding: '10px 15px',
    minWidth: '300px',
  },
  searchIcon: {
    color: '#95a5a6',
    marginRight: '10px',
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: '16px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    borderBottom: '2px solid #eee',
    color: '#2c3e50',
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '15px',
    verticalAlign: 'middle',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statusActive: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusCompleted: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
  },
  statusWarning: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  statusPlanning: {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    marginBottom: '5px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: '12px',
    color: '#666',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
  },
  actionBtn: {
    padding: '8px',
    backgroundColor: '#f8f9fa',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#2c3e50',
    transition: 'all 0.3s ease',
  },
  projectsGrid: {
    display: 'none',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  activitySection: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  activityList: {
    marginTop: '20px',
  },
  activityItem: {
    display: 'flex',
    gap: '15px',
    padding: '15px 0',
    borderBottom: '1px solid #eee',
  },
  activityIcon: {
    fontSize: '20px',
  },
  activityContent: {
    flex: 1,
  },
  activityTime: {
    color: '#95a5a6',
    fontSize: '12px',
  },
};

export default Dashboard;
