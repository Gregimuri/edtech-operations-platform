// Логика для роли подрядчика
class ContractorLogic {
    constructor() {
        this.currentTask = null;
        this.photoQueue = [];
        this.offlineData = [];
        this.init();
    }
    
    init() {
        this.bindContractorEvents();
        this.loadTasks();
        this.initCamera();
        this.startShiftTimer();
    }
    
    bindContractorEvents() {
        // Кнопки задач
        document.querySelectorAll('.btn-start').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskCard = e.target.closest('.task-card, .task-item');
                const taskId = this.getTaskId(taskCard);
                this.startTask(taskId);
            });
        });
        
        document.querySelectorAll('.btn-done').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskCard = e.target.closest('.task-card, .task-item');
                const taskId = this.getTaskId(taskCard);
                this.completeTask(taskId);
            });
        });
        
        document.querySelectorAll('.btn-photo').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskCard = e.target.closest('.task-card, .task-item');
                const taskId = this.getTaskId(taskCard);
                this.openCameraForTask(taskId);
            });
        });
        
        // Плавающая кнопка камеры
        document.getElementById('floatingCamera')?.addEventListener('click', () => {
            this.openCameraModal();
        });
        
        // Фильтры задач
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                this.filterTasks(e.target.textContent);
            });
        });
    }
    
    getTaskId(taskElement) {
        // Эмуляция получения ID задачи
        return Math.floor(Math.random() * 1000);
    }
    
    loadTasks() {
        // Эмуляция загрузки задач
        const tasks = [
            {
                id: 1,
                title: 'Монтаж LED-панели №15',
                location: 'ТЦ "Авиапарк", 3 этаж',
                deadline: '18:00',
                progress: 40,
                status: 'urgent'
            },
            {
                id: 2,
                title: 'Замена медиаплеера',
                location: 'БЦ "Око"',
                deadline: '14:00',
                progress: 70,
                status: 'in-progress'
            },
            {
                id: 3,
                title: 'Техническое обслуживание',
                location: 'ТРЦ "Галерея"',
                deadline: '11:30',
                progress: 100,
                status: 'completed'
            }
        ];
        
        this.updateTaskList(tasks);
    }
    
    updateTaskList(tasks) {
        const activeTasks = tasks.filter(t => t.progress < 100);
        document.getElementById('activeTasksCount')?.textContent = activeTasks.length;
    }
    
    startTask(taskId) {
        this.currentTask = taskId;
        window.esp.showNotification(`Задача #${taskId} начата`, 'info');
        
        // Обновляем UI
        const taskElement = this.findTaskElement(taskId);
        if (taskElement) {
            const badge = taskElement.querySelector('.badge');
            if (badge) {
                badge.className = 'badge badge-warning';
                badge.textContent = 'В работе';
            }
            
            const timeElement = taskElement.querySelector('.task-time span');
            if (timeElement) {
                timeElement.textContent = 'В работе...';
            }
        }
        
        // Сохраняем в локальное хранилище
        this.saveTaskState(taskId, 'in_progress');
    }
    
    completeTask(taskId) {
        window.esp.showNotification(`Задача #${taskId} завершена!`, 'success');
        
        const taskElement = this.findTaskElement(taskId);
        if (taskElement) {
            // Обновляем статус
            const badge = taskElement.querySelector('.badge');
            if (badge) {
                badge.className = 'badge badge-success';
                badge.textContent = 'Завершено';
            }
            
            // Обновляем прогресс
            const progressFill = taskElement.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = '100%';
            }
            
            const progressText = taskElement.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = '100%';
            }
            
            // Обновляем время
            const timeElement = taskElement.querySelector('.task-time span');
            if (timeElement) {
                const now = new Date();
                timeElement.textContent = `Выполнено: ${now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
            }
            
            // Меняем кнопки
            const actions = taskElement.querySelector('.task-actions-mobile, .task-actions');
            if (actions) {
                actions.innerHTML = `
                    <button class="action-btn btn-photo" onclick="contractor.showReport(${taskId})">
                        <i class="fas fa-eye"></i>
                        Отчет
                    </button>
                `;
            }
        }
        
        // Сохраняем в локальное хранилище
        this.saveTaskState(taskId, 'completed');
        
        // Добавляем в очередь на синхронизацию
        if (!navigator.onLine) {
            this.addToSyncQueue(taskId, 'complete');
        }
    }
    
    findTaskElement(taskId) {
        // Эмуляция поиска элемента задачи
        return document.querySelector('.task-card, .task-item');
    }
    
    openCameraForTask(taskId) {
        this.currentTask = taskId;
        this.openCameraModal();
    }
    
    openCameraModal() {
        window.esp.openModal('cameraModal');
    }
    
    initCamera() {
        // Инициализация камеры (эмуляция)
        const captureBtn = document.querySelector('.btn-capture');
        if (captureBtn) {
            captureBtn.addEventListener('click', () => this.capturePhoto());
        }
    }
    
    capturePhoto() {
        const taskSelect = document.getElementById('photoTaskSelect');
        const comment = document.getElementById('photoComment')?.value || 'Фотоотчет';
        
        window.esp.showNotification(`Фото для "${taskSelect?.value}" сохранено`, 'success');
        
        // Добавляем фото в галерею
        this.addPhotoToGallery(taskSelect?.value, comment);
        
        // Закрываем модальное окно
        window.esp.closeModal(document.getElementById('cameraModal'));
        
        // Очищаем форму
        const commentInput = document.getElementById('photoComment');
        if (commentInput) commentInput.value = '';
    }
    
    addPhotoToGallery(taskName, comment) {
        const photosGrid = document.querySelector('.photos-grid');
        if (!photosGrid) return;
        
        const newPhoto = document.createElement('div');
        newPhoto.className = 'photo-item';
        newPhoto.innerHTML = `
            <img src="https://via.placeholder.com/100x100/3498db/ffffff?text=${encodeURIComponent(comment.substring(0, 10))}" alt="${taskName}">
        `;
        
        const addButton = photosGrid.querySelector('.add-photo');
        if (addButton) {
            photosGrid.insertBefore(newPhoto, addButton);
        } else {
            photosGrid.appendChild(newPhoto);
        }
    }
    
    filterTasks(filter) {
        // Эмуляция фильтрации задач
        const tasks = document.querySelectorAll('.task-card, .task-item');
        
        tasks.forEach(task => {
            let show = true;
            
            switch(filter) {
                case 'Срочные':
                    show = task.classList.contains('urgent');
                    break;
                case 'В работе':
                    show = task.querySelector('.badge')?.textContent === 'В работе';
                    break;
                case 'Выполнено':
                    show = task.querySelector('.badge')?.textContent === 'Завершено';
                    break;
            }
            
            task.style.display = show ? 'block' : 'none';
        });
    }
    
    showReport(taskId) {
        window.esp.openModal('reportModal');
    }
    
    startShiftTimer() {
        const shiftStart = new Date();
        shiftStart.setHours(8, 0, 0, 0);
        
        const shiftEnd = new Date();
        shiftEnd.setHours(17, 0, 0, 0);
        
        this.updateShiftProgress(shiftStart, shiftEnd);
        
        // Обновляем каждую минуту
        setInterval(() => {
            this.updateShiftProgress(shiftStart, shiftEnd);
        }, 60000);
    }
    
    updateShiftProgress(start, end) {
        const now = new Date();
        const total = end - start;
        const elapsed = now - start;
        const remaining = end - now;
        
        const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);
        
        // Обновляем прогресс-бар
        const progressBar = document.querySelector('.shift-progress .progress-fill');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        // Обновляем оставшееся время
        if (remaining > 0) {
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            
            const timeElement = document.querySelector('.shift-time-remaining');
            if (timeElement) {
                timeElement.textContent = `${hours}ч ${minutes}м`;
            }
        }
    }
    
    saveTaskState(taskId, state) {
        const tasks = JSON.parse(localStorage.getItem('contractor_tasks') || '{}');
        tasks[taskId] = {
            state: state,
            updated: new Date().toISOString()
        };
        localStorage.setItem('contractor_tasks', JSON.stringify(tasks));
    }
    
    addToSyncQueue(taskId, action) {
        this.offlineData.push({
            taskId: taskId,
            action: action,
            timestamp: new Date().toISOString()
        });
        
        localStorage.setItem('offline_queue', JSON.stringify(this.offlineData));
        window.esp.showNotification('Данные сохранены для синхронизации', 'info');
    }
}

// Инициализация логики подрядчика
document.addEventListener('DOMContentLoaded', () => {
    window.contractor = new ContractorLogic();
});
