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
                    <span style={styles
