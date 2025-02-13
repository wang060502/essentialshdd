// 数字滚动动画
class Counter {
    constructor(element, target, duration = 2000, startDelay = 0) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startDelay = startDelay;
        this.current = 0;
        this.increment = target / (duration / 16); // 60fps
        this.started = false;
    }

    start() {
        if (this.started) return;
        this.started = true;
        
        setTimeout(() => {
            const animate = () => {
                this.current += this.increment;
                
                if (this.current >= this.target) {
                    this.current = this.target;
                    this.element.textContent = this.formatNumber(this.target);
                    return;
                }
                
                this.element.textContent = this.formatNumber(Math.floor(this.current));
                requestAnimationFrame(animate);
            };
            
            animate();
        }, this.startDelay);
    }
    
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (this.target.toString().includes('+') ? '+' : '');
    }
}

// 观察者，当元素进入视口时开始动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
            const counter = new Counter(element, target);
            counter.start();
            observer.unobserve(element); // 只执行一次
        }
    });
}, {
    threshold: 0.5 // 当元素50%进入视口时触发
});

// 初始化计数器
document.addEventListener('DOMContentLoaded', () => {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(number => {
        observer.observe(number);
    });
}); 