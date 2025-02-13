document.addEventListener('DOMContentLoaded', function() {
    const whatsappLink = document.querySelector('.whatsapp-link');
    
    // 点击复制WhatsApp号码
    whatsappLink.addEventListener('click', function(e) {
        e.preventDefault();
        const whatsappNumber = this.getAttribute('data-whatsapp');
        
        // 创建临时输入框
        const tempInput = document.createElement('input');
        tempInput.value = whatsappNumber;
        document.body.appendChild(tempInput);
        
        // 选择并复制
        tempInput.select();
        document.execCommand('copy');
        
        // 移除临时输入框
        document.body.removeChild(tempInput);
        
        // 显示复制成功提示
        const originalTitle = this.getAttribute('title');
        this.setAttribute('title', '复制成功！');
        
        // 2秒后恢复原始提示
        setTimeout(() => {
            this.setAttribute('title', originalTitle);
        }, 2000);
    });
}); 