// ===== DOM элементы =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const testDriveBtn = document.getElementById('testDriveBtn');
const requestDemoBtn = document.getElementById('requestDemoBtn');
const requestModal = document.getElementById('requestModal');
const modalClose = document.getElementById('modalClose');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');

// ===== Мобильное меню =====
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});

// ===== Модальное окно =====
function openModal() {
    requestModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    requestModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

testDriveBtn.addEventListener('click', openModal);
requestDemoBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);

// Закрытие модального окна при клике вне его
requestModal.addEventListener('click', (e) => {
    if (e.target === requestModal) {
        closeModal();
    }
});

// ===== Уведомления =====
function showNotification(message, type = 'success') {
    notificationMessage.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ===== Формы =====
const demoRequestForm = document.getElementById('demoRequestForm');
const quickRequestForm = document.getElementById('quickRequestForm');

if (demoRequestForm) {
    demoRequestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Здесь будет отправка формы на сервер
        // Пока что просто показываем уведомление
        showNotification('Заявка отправлена! Мы свяжемся с вами в течение 15 минут.', 'success');
        
        // Очистка формы
        demoRequestForm.reset();
        closeModal();
    });
}

if (quickRequestForm) {
    quickRequestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Быстрая заявка отправлена! Ждите звонка.', 'success');
        quickRequestForm.reset();
        closeModal();
    });
}

// ===== Карта городов =====
document.querySelectorAll('.city-point').forEach(point => {
    point.addEventListener('click', () => {
        const city = point.getAttribute('data-city');
        showNotification(`Информация по проектам в ${city}`, 'info');
    });
});

// ===== Анимация при скролле =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Наблюдаем за элементами, которые нужно анимировать
document.querySelectorAll('.pillar-card, .offer-card, .process-step').forEach(el => {
    observer.observe(el);
});

// ===== Плавная прокрутка =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Активное меню при скролле =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// ===== Маска для телефона =====
function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length === 0) return;
            
            if (value[0] === '7' || value[0] === '8') {
                value = '+7 ' + value.substring(1);
            } else {
                value = '+7 ' + value;
            }
            
            // Форматирование: +7 (999) 123-45-67
            if (value.length > 4) {
                value = value.substring(0, 4) + ' (' + value.substring(4);
            }
            if (value.length > 8) {
                value = value.substring(0, 8) + ') ' + value.substring(8);
            }
            if (value.length > 13) {
                value = value.substring(0, 13) + '-' + value.substring(13);
            }
            if (value.length > 16) {
                value = value.substring(0, 16) + '-' + value.substring(16);
            }
            if (value.length > 19) {
                value = value.substring(0, 19);
            }
            
            e.target.value = value;
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initPhoneMask();
    
    // Загрузка симулированных данных
    if (typeof loadDashboardData === 'function') {
        loadDashboardData();
    }
});

// ===== Имитация загрузки данных для dashboard =====
function loadDashboardData() {
    // Эта функция будет вызвана на странице dashboard.html
    console.log('Загрузка данных для дашборда...');
}

// ===== Темная тема (опционально) =====
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '🌙';
themeToggle.title = 'Переключить тему';

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    
    // Сохраняем выбор в localStorage
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Добавляем кнопку переключения темы
document.querySelector('.header-actions')?.appendChild(themeToggle);

// Проверяем сохраненную тему
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '☀️';
}
