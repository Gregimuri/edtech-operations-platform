// Расширенная логика для заказчика с проблемными точками и статистикой
class EnhancedCustomerLogic {
    constructor() {
        this.problems = [];
        this.projectStats = {};
        this.notifications = [];
        this.init();
    }
    
    init() {
        this.loadProblems();
        this.loadProjectStats();
        this.loadNotifications();
        this.bindEvents();
        this.initRealTimeUpdates();
    }
    
    bindEvents() {
        // Кнопки уведомлений
        document.getElementById('problemAlertsBtn')?.addEventListener('click', () => {
            this.showProblemsDashboard();
        });
        
        document.getElementById('notificationsBtn')?.addEventListener('click', () => {
            this.showAllNotifications();
        });
        
        // Быстрые действия
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.quick-action-btn').querySelector('span').textContent;
                this.handleQuickAction(action);
            });
        });
        
        // Клики по проблемным точкам
        document.querySelectorAll('.problem-point').forEach(point => {
            point.addEventListener('click', (e) => {
                if (!e.target.closest('.problem-actions')) {
                    const problemId = parseInt(point.getAttribute('data-problem-id') || '1');
                    this.openProblemModal(problemId);
                }
            });
        });
    }
    
    loadProblems() {
        // Эмуляция загрузки проблемных точек
        this.problems = [
            {
                id: 1,
                title: "Задержка монтажа LED-панелей",
                project: "ТЦ \"Авиапарк\"",
                severity: "critical",
                priority: "high",
                description: "Бригада отстает от графика из-за проблем с поставкой оборудования. Требуется срочное согласование альтернативного поставщика.",
                impact: ["Отставание от графика: 2 дня", "Риск штрафных санкций: ₽50,000/день", "Перенос даты сдачи"],
                discovered: "2024-03-15",
                responsible: "Мария Петрова",
                status: "in_progress",
                comments: [
                    {
                        author: "Мария Петрова (менеджер)",
                        text: "Ищем альтернативного поставщика. Ожидаем ответ сегодня до 18:00",
                        time: "Сегодня 14:30"
                    },
                    {
                        author: "Алексей Борисов (заказчик)",
                        text: "Прошу предоставить план восстановления сроков до конца дня",
                        time: "Сегодня 15:45"
                    }
                ]
            },
            {
                id: 2,
                title: "Расхождение в смете",
                project: "БЦ \"Око\"",
                severity: "warning",
                priority: "high",
                description: "Обнаружено превышение сметы на дополнительные работы. Необходимо утвердить дополнительное соглашение.",
                impact: ["Превышение бюджета: +₽120,000", "Требуется доп. согласование"],
                discovered: "2024-03-20",
                responsible: "Иван Сидоров",
                status: "pending",
                comments: []
            },
            {
                id: 3,
                title: "Качество монтажа",
                project: "ТРЦ \"Галерея\"",
                severity: "info",
                priority: "medium",
                description: "Требуется дополнительная проверка качества монтажа видеостены. Запланирован выезд технадзора на завтра.",
                impact: ["Риск переделки работ", "Возможная задержка приемки"],
                discovered: "2024-03-19",
                responsible: "Петр Иванов",
                status: "planned",
                comments: []
            }
        ];
        
        this.updateProblemsUI();
    }
    
    loadProjectStats() {
        // Эмуляция загрузки статистики проектов
        this.projectStats = {
            overall: {
                progress: 65,
                efficiency: 0.87,
                onTime: 94,
                budgetUsage: 58
            },
            projects: {
                "ТЦ \"Авиапарк\"": {
                    progress: 40,
                    risk: "high",
                    budget: 1200000,
                    spent: 850000,
                    timeline: [
                        { date: "2024-03-01", milestone: "Начало работ", status: "completed" },
                        { date: "2024-03-15", milestone: "Монтаж 50%", status: "delayed" },
                        { date: "2024-04-01", milestone: "Тестирование", status: "pending" },
                        { date: "2024-04-15", milestone: "Сдача проекта", status: "at_risk" }
                    ]
                },
                "БЦ \"Око\"": {
                    progress: 70,
                    risk: "medium",
                    budget: 850000,
                    spent: 620000,
                    timeline: []
                }
            }
        };
        
        this.updateStatsUI();
    }
    
    loadNotifications() {
        // Эмуляция загрузки уведомлений
        this.notifications = [
            {
                id: 1,
                type: "critical",
                title: "Критическая задержка",
                message: "Проект \"ТЦ Авиапарк\" отстает на 2 дня",
                time: "15 минут назад",
                read: false,
                problemId: 1
            },
            {
                id: 2,
                type: "finance",
                title: "Превышение сметы",
                message: "Требуется утверждение +₽120,000",
                time: "2 часа назад",
                read: false,
                problemId: 2
            },
            {
                id: 3,
                type: "quality",
                title: "Проверка качества",
                message: "Запланирован выезд технадзора",
                time: "Вчера, 18:30",
                read: true,
                problemId: 3
            }
        ];
        
        this.updateNotificationsUI();
    }
    
    updateProblemsUI() {
        const problemCount = this.problems.filter(p => p.severity === 'critical' || p.severity === 'warning').length;
        document.getElementById('problemCount').textContent = problemCount;
        
        // Обновляем баджи в меню
        const problemBadge = document.querySelector('.sidebar-nav a[href="#problems"] .badge');
        if (problemBadge) {
            problemBadge.textContent = problemCount;
        }
    }
    
    updateStatsUI() {
        const stats = this.projectStats.overall;
        
        // Обновляем значения на дашборде
        document.querySelectorAll('.stat-value').forEach(el => {
            const title = el.closest('.stat-card-enhanced').querySelector('.stat-title').textContent;
            switch(title) {
                case 'Активные проекты':
                    el.textContent = '8';
                    break;
                case 'Выполнено в срок':
                    el.textContent = `${stats.onTime}%`;
                    break;
                case 'Проекты с риском':
                    el.textContent = this.problems.filter(p => p.severity === 'critical' || p.severity === 'warning').length;
                    break;
                case 'Общий бюджет':
                    el.textContent = '₽15.8M';
                    break;
            }
        });
    }
    
    updateNotificationsUI() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        document.getElementById('notificationCount').textContent = unreadCount;
    }
    
    openProblemModal(problemId) {
        const problem = this.problems.find(p => p.id === problemId);
        if (!problem) return;
        
        // Заполняем модальное окно данными проблемы
        document.getElementById('problemModalTitle').textContent = problem.title;
        document.getElementById('problemTitle').textContent = problem.title;
        document.getElementById('problemProject').textContent = problem.project;
        document.getElementById('problemDate').textContent = this.formatDate(problem.discovered);
        document.getElementById('problemPriority').textContent = this.getPriorityText(problem.priority);
        document.getElementById('problemResponsible').textContent = problem.responsible;
        document.getElementById('problemDescription').textContent = problem.description;
        
        // Устанавливаем серьезность
        const severityEl = document.getElementById('problemSeverity');
        severityEl.className = `problem-severity severity-${problem.severity}`;
        severityEl.textContent = this.getSeverityText(problem.severity);
        
        // Заполняем список влияния
        const impactList = document.getElementById('problemImpactList');
        impactList.innerHTML = problem.impact.map(item => `<li>${item}</li>`).join('');
        
        // Заполняем комментарии
        const commentsEl = document.getElementById('problemComments');
        commentsEl.innerHTML = problem.comments.map(comment => `
            <div class="comment-item">
                <span class="comment-author">${comment.author}:</span>
                "${comment.text}"
                <div class="comment-time">${comment.time}</div>
            </div>
        `).join('');
        
        // Показываем модальное окно
        window.esp.openModal('problemDetailsModal');
    }
    
    showProblemDetails() {
        this.openProblemModal(1); // Показываем первую критическую проблему
    }
    
    switchAnalyticsTab(tabName) {
        // Переключение вкладок аналитики
        document.querySelectorAll('.analytics-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('.analytics-content').forEach(content => {
            content.style.display = 'none';
        });
        
        event.target.classList.add('active');
        document.getElementById(`analytics${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).style.display = 'block';
    }
    
    showProblemsDashboard() {
        // Прокрутка к секции проблем
        document.querySelector('.problem-points-section').scrollIntoView({ behavior: 'smooth' });
    }
    
    showAllNotifications() {
        // Показ всех уведомлений
        alert(`Всего уведомлений: ${this.notifications.length}\nНепрочитанных: ${this.notifications.filter(n => !n.read).length}`);
    }
    
    handleQuickAction(action) {
        switch(action) {
            case 'Создать отчет':
                this.createReport();
                break;
            case 'Связаться с менеджером':
                this.contactManager();
                break;
            case 'Эскалировать проблему':
                this.escalateProblem();
                break;
            case 'Скачать документы':
                this.downloadDocs();
                break;
        }
    }
    
    createReport() {
        window.esp.showNotification('Создание отчета запущено. Файл будет готов через несколько минут.', 'info');
    }
    
    contactManager() {
        window.esp.showNotification('Соединяем с менеджером проекта...', 'info');
    }
    
    escalateProblem() {
        const problemId = prompt('Введите ID проблемы для эскалации:');
        if (problemId) {
            window.esp.showNotification(`Проблема #${problemId} эскалирована руководству`, 'warning');
        }
    }
    
    downloadDocs() {
        window.esp.showNotification('Начинается загрузка документов...', 'info');
    }
    
    initRealTimeUpdates() {
        // Эмуляция обновлений в реальном времени
        setInterval(() => {
            this.updateLiveStats();
        }, 30000); // Каждые 30 секунд
    }
    
    updateLiveStats() {
        // Обновление статистики в реальном времени
        const progressElement = document.querySelector('.metric-card .metric-value');
        if (progressElement && progressElement.textContent.includes('%')) {
            const currentProgress = parseInt(progressElement.textContent);
            const newProgress = Math.min(currentProgress + 1, 100);
            progressElement.textContent = `${newProgress}%`;
            
            // Обновляем прогресс-бар
            const timelineFill = document.querySelector('.timeline-fill');
            if (timelineFill) {
                timelineFill.style.width = `${newProgress}%`;
            }
        }
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    getSeverityText(severity) {
        const severityMap = {
            'critical': 'Критическая',
            'warning': 'Высокий приоритет',
            'info': 'Средний приоритет'
        };
        return severityMap[severity] || severity;
    }
    
    getPriorityText(priority) {
        const priorityMap = {
            'high': 'Высокий',
            'medium': 'Средний',
            'low': 'Низкий'
        };
        return priorityMap[priority] || priority;
    }
    
    // Методы для работы с проблемными точками
    addComment(problemId, comment) {
        const problem = this.problems.find(p => p.id === problemId);
        if (problem) {
            problem.comments.push({
                author: "Алексей Борисов (заказчик)",
                text: comment,
                time: "Только что"
            });
            this.updateProblemsUI();
            window.esp.showNotification('Комментарий добавлен', 'success');
        }
    }
    
    markProblemResolved(problemId) {
        const problem = this.problems.find(p => p.id === problemId);
        if (problem) {
            problem.status = 'resolved';
            problem.severity = 'info';
            this.updateProblemsUI();
            window.esp.showNotification('Проблема помечена как решенная', 'success');
        }
    }
    
    escalateToManagement(problemId) {
        const problem = this.problems.find(p => p.id === problemId);
        if (problem) {
            problem.severity = 'critical';
            problem.priority = 'high';
            this.updateProblemsUI();
            window.esp.showNotification('Проблема эскалирована высшему руководству', 'warning');
        }
    }
}

// Инициализация улучшенной логики заказчика
document.addEventListener('DOMContentLoaded', () => {
    window.customer = new EnhancedCustomerLogic();
});
