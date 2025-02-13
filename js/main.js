// 平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // 如果href只是#，则直接返回
        
        const target = document.querySelector(targetId);
        if (target) { // 确保目标元素存在
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 滚动时更新导航栏活动状态
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;

    // 获取所有section
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100; // 偏移值
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// 添加滚动进度指示器
const progressIndicator = document.createElement('div');
progressIndicator.className = 'scroll-progress';
document.body.appendChild(progressIndicator);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressIndicator.style.width = `${scrolled}%`;
});

// 监听滚动事件，触发动画
function handleScrollAnimations() {
    const elements = document.querySelectorAll(
        '.product-card, .feature-item, .stat-number, .form-group'
    );
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
            element.classList.add('visible');
        }
    });
}

// 页面加载完成后初始化动画
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    // 添加滚动监听
    window.addEventListener('scroll', handleScrollAnimations);
});

// 数字增长动画
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        // 提取数字和符号
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        const symbol = text.replace(/[0-9]/g, ''); // 获取符号 (+, % 等)
        
        let current = 0;
        const increment = number / 50; // 将动画分为50步
        const duration = 1500; // 动画持续1.5秒
        const stepTime = duration / 50;
        
        function updateNumber() {
            current += increment;
            if (current < number) {
                stat.textContent = Math.round(current) + symbol;
                setTimeout(updateNumber, stepTime);
            } else {
                stat.textContent = number + symbol;
            }
        }
        
        // 当元素可见时开始动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
}

// 初始化数字动画
document.addEventListener('DOMContentLoaded', animateNumbers);

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 检查本地存储中的主题设置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else if (prefersDarkScheme.matches) {
        // 如果用户系统偏好深色模式
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // 切换主题
    themeToggle.addEventListener('click', () => {
        let theme = 'light';
        
        if (document.documentElement.getAttribute('data-theme') !== 'dark') {
            theme = 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
    
    // 监听系统主题变化
    prefersDarkScheme.addEventListener('change', (e) => {
        const theme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// 在页面加载完成后初始化主题切换
document.addEventListener('DOMContentLoaded', initThemeToggle);

// 导航菜单控制
function initMobileNav() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 点击LOGO切换菜单
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // 点击导航链接后关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // 点击菜单外部区域关闭菜单
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// 初始化导航菜单
document.addEventListener('DOMContentLoaded', initMobileNav); 