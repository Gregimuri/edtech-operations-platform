// Общие функции для всех ролей
class ESPPlatform {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initSidebar();
        this.initModals();
        this.updateTime();
        this.checkOnlineStatus();
    }
    
    bindEvents() {
        // Меню
        document.getElementById('menuBtn')?.addEventListener('click', () => this.toggleSidebar());
        document.getElementById('sidebarClose')?.addEventListener('click', () => this.closeSidebar());
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const menuBtn = document.getElementById('menuBtn');
            
            if (sidebar?.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !menuBtn?.contains(e.target)) {
                this.closeSidebar();
            }
        });
        
        // Обработка Escape для закрытия меню и модальных окон
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
                this.closeAllModals();
            }
        });
    }
    
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.toggle('active');
    }
    
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.remove('active');
    }
    
    initSidebar() {
        // Активация текущего пункта меню
        const currentPage = window.location.hash || '#dashboard';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                this.closeSidebar();
                
                // Эмуляция навигации
                const pageId = link.getAttribute('href').substring(1) + 'Page';
                this.switchPage(pageId);
            });
        });
    }
    
    initModals() {
        // Закрытие модальных окон при клике на фон
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
        
        // Закрытие при клике на кнопку закрытия
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal);
            });
        });
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            this.closeModal(modal);
        });
    }
    
    switchPage(pageId) {
        // Эмуляция переключения страниц
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.style.display = 'none';
        });
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
        }
    }
    
    updateTime() {
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            timeElement.textContent = timeString;
            
            // Обновляем каждую минуту
            setTimeout(() => this.updateTime(), 60000);
        }
    }
    
    checkOnlineStatus() {
        const onlineStatus = document.getElementById('onlineStatus');
        if (onlineStatus) {
            const isOnline = navigator.onLine;
            
            if (isOnline) {
                onlineStatus.innerHTML = '<i class="fas fa-wifi"></i><span>Онлайн</span>';
                onlineStatus.style.color = '#2ecc71';
            } else {
                onlineStatus.innerHTML = '<i class="fas fa-wifi-slash"></i><span>Оффлайн</span>';
                onlineStatus.style.color = '#e74c3c';
            }
        }
        
        // Слушаем изменения статуса
        window.addEventListener('online', () => this.showNotification('Соединение восстановлено', 'success'));
        window.addEventListener('offline', () => this.showNotification('Работаем в оффлайн режиме', 'warning'));
    }
    
    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        container.appendChild(notification);
        
        // Автоматическое удаление через 5 секунд
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    // Вспомогательные функции
    formatDate(date) {
        return new Date(date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(amount);
    }
}

// Инициализация платформы
document.addEventListener('DOMContentLoaded', () => {
    window.esp = new ESPPlatform();
});
