import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#2ecc71';
      case 'warning': return '#e74c3c';
      case 'completed': return '#3498db';
      default: return '#95a5a6';
    }
  };

  return (
    <Link 
      to={`/project/${project.id}`} 
      style={{
        ...styles.card,
        borderLeft: `5px solid ${getStatusColor(project.status)}`
      }}
    >
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>{project.title}</h3>
        <span style={{
          ...styles.statusBadge,
          backgroundColor: getStatusColor(project.status)
        }}>
          {project.status === 'active' ? 'В работе' : 
           project.status === 'completed' ? 'Завершен' : 
           project.status === 'warning' ? 'Риск' : 'Планирование'}
        </span>
      </div>
      
      <div style={styles.cardBody}>
        <div style={styles.infoRow}>
          <FaUser style={styles.icon} />
          <span style={styles.infoText}>{project.client}</span>
        </div>
        
        <div style={styles.infoRow}>
          <FaMapMarkerAlt style={styles.icon} />
          <span style={styles.infoText}>{project.location}</span>
        </div>
        
        <div style={styles.infoRow}>
          <FaCalendarAlt style={styles.icon} />
          <span style={styles.infoText}>
            {project.startDate} - {project.endDate}
          </span>
        </div>
        
        <div style={styles.progressSection}>
          <div style={styles.progressHeader}>
            <span style={styles.progressLabel}>Прогресс</span>
            <span style={styles.progressPercent}>{project.progress}%</span>
          </div>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${project.progress}%`,
                backgroundColor: getStatusColor(project.status)
              }}
            ></div>
          </div>
        </div>
        
        <div style={styles.budget}>
          <span style={styles.budgetLabel}>Бюджет:</span>
          <span style={styles.budgetValue}>{project.budget}</span>
        </div>
      </div>
      
      <div style={styles.cardFooter}>
        <span style={styles.viewDetails}>
          Подробнее <FaArrowRight style={styles.arrowIcon} />
        </span>
      </div>
    </Link>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: 0,
    flex: 1,
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
  },
  cardBody: {
    marginBottom: '20px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '14px',
  },
  icon: {
    color: '#3498db',
    marginRight: '10px',
    fontSize: '14px',
  },
  infoText: {
    color: '#666',
  },
  progressSection: {
    margin: '20px 0',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px',
  },
  progressLabel: {
    color: '#666',
  },
  progressPercent: {
    color: '#2c3e50',
    fontWeight: '600',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  budget: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  },
  budgetLabel: {
    color: '#666',
    fontSize: '14px',
  },
  budgetValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  },
  viewDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#3498db',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
  },
  arrowIcon: {
    fontSize: '12px',
  },
};

export default ProjectCard;
