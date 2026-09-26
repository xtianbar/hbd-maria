$(document).ready(function() {
    $('.candle').on('click', function() {
        $('.fire').fadeOut(500);
        
        var duration = 3000;
        var end = Date.now() + duration;
        var colors = ['#D4AF37', '#C0C0C0', '#ffffff', '#F5F5DC'];

        (function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: colors
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    });

    $('.balloon').on('click', function(e) {
        var rect = e.target.getBoundingClientRect();
        var x = (rect.left + (rect.width / 2)) / window.innerWidth;
        var y = (rect.top + (rect.height / 2)) / window.innerHeight;

        confetti({
            particleCount: 40,
            spread: 60,
            origin: { x: x, y: y },
            colors: [$(this).css('background-color'), '#ffffff', '#C0C0C0']
        });

        $(this).remove();
    });

    const canvas = document.getElementById('magicCursor');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const mouse = { x: null, y: null };

    window.addEventListener('mousemove', function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        
        if (Math.random() > 0.3) {
            particlesArray.push(new Particle());
        }
    });

    class Particle {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 2 + 1.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            
            const colors = ['rgba(255, 255, 255, 0.8)', 'rgba(255, 223, 0, 0.6)', 'rgba(255, 250, 205, 0.7)'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = 100;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 3;
            if (this.size > 0.05) this.size -= 0.05;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function handleParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if (particlesArray[i].life <= 0 || particlesArray[i].size <= 0.1) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }
    animate();
});