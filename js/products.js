// 产品数据
const products = [
    {
        id: 1,
        category: 'tops',
        image: './img/image.png',
        title: '商务衬衫',
        description: '精选面料，专业定制，舒适透气'
    },
    {
        id: 2,
        category: 'tops',
        image: './img/image.png',
        title: '休闲外套',
        description: '时尚设计，优质面料'
    },
    {
        id: 3,
        category: 'tops',
        image: './img/image.png',
        title: '商务西裤',
        description: '修身剪裁，尽显品质'
    },
    {
        id: 4,
        category: 'tops',
        image: './img/image.png',
        title: '保暖棉服',
        description: '优质棉料，温暖舒适'
    },
    {
        id: 5,
        category: 'pants',
        image: './img/image.png',
        title: '商务西裤',
        description: '修身剪裁，尽显品质'
    },
    {
        id: 6,
        category: 'cotton',
        image: './img/image.png',
        title: '保暖棉服',
        description: '优质棉料，温暖舒适'
    }
];

// 产品轮播相关配置
const CONFIG = {
    autoplaySpeed: 3000,  // 自动播放间隔时间
    slidesPerView: 4,     // 每屏显示数量
    slideWidth: null,     // 滑块宽度（动态计算）
    animationDuration: 500 // 动画持续时间
};

function initProductCarousel() {
    const track = document.querySelector('.product-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentPosition = 0;
    let isAnimating = false;

    // 克隆节点实现无缝效果
    function cloneNodes() {
        const items = [...track.children];
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // 初始化轮播尺寸
    function initCarouselSize() {
        const firstItem = track.querySelector('.product-card');
        CONFIG.slideWidth = firstItem.offsetWidth + parseInt(getComputedStyle(firstItem).marginLeft) * 2;
        track.style.width = `${CONFIG.slideWidth * (track.children.length)}px`;
    }

    // 滚动到指定位置
    function scrollToPosition(position, immediate = false) {
        if (immediate) {
            track.style.transition = 'none';
        } else {
            track.style.transition = `transform ${CONFIG.animationDuration}ms ease`;
        }
        track.style.transform = `translateX(${position}px)`;
    }

    // 处理无缝循环
    function handleInfiniteScroll() {
        const totalWidth = CONFIG.slideWidth * (track.children.length / 2);
        
        if (Math.abs(currentPosition) >= totalWidth) {
            currentPosition = 0;
            scrollToPosition(currentPosition, true);
        }
    }

    // 自动播放
    let autoplayInterval;
    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            if (!isAnimating) {
                currentPosition -= CONFIG.slideWidth;
                scrollToPosition(currentPosition);
                handleInfiniteScroll();
            }
        }, CONFIG.autoplaySpeed);
    }

    // 停止自动播放
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    // 切换到下一张
    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        currentPosition -= CONFIG.slideWidth;
        scrollToPosition(currentPosition);
        setTimeout(() => {
            handleInfiniteScroll();
            isAnimating = false;
        }, CONFIG.animationDuration);
    }

    // 切换到上一张
    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        currentPosition += CONFIG.slideWidth;
        if (currentPosition > 0) {
            const totalWidth = CONFIG.slideWidth * (track.children.length / 2);
            currentPosition = -totalWidth + CONFIG.slideWidth;
            scrollToPosition(currentPosition, true);
            requestAnimationFrame(() => {
                scrollToPosition(currentPosition - CONFIG.slideWidth);
            });
        } else {
            scrollToPosition(currentPosition);
        }
        setTimeout(() => {
            isAnimating = false;
        }, CONFIG.animationDuration);
    }

    // 初始化事件监听
    function initEvents() {
        // 点击按钮切换
        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });

        // 鼠标悬停暂停自动播放
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);

        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            initCarouselSize();
            scrollToPosition(currentPosition, true);
        });

        // 监听过渡结束
        track.addEventListener('transitionend', () => {
            isAnimating = false;
        });
    }

    // 初始化
    function init() {
        cloneNodes();
        initCarouselSize();
        initEvents();
        startAutoplay();
    }

    init();
}

// 添加平滑滚动函数
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const targetPosition = target.offsetTop - 80; // 减去导航栏高度
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// 初始化滚动事件
function initScrollEvents() {
    // 导航栏产品展示链接点击事件
    const productNavLink = document.querySelector('a[href="#products"]');
    if (productNavLink) {
        productNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll('products');
        });
    }

    // 浏览产品按钮点击事件
    const browseProductBtn = document.querySelector('.browse-products');
    if (browseProductBtn) {
        browseProductBtn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll('products');
        });
    }
}

// DOM加载完成后初始化轮播
document.addEventListener('DOMContentLoaded', initProductCarousel);

// 确保DOM完全加载后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initScrollEvents();
    });
} else {
    initScrollEvents();
} 