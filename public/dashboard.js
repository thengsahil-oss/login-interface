// Interactive elements
const controlBtns = document.querySelectorAll('.control-btn');
const playBtn = document.querySelector('.play-icon');
const menuBtn = document.querySelector('.menu-btn');
const logoutBtn = document.querySelector('.logout-btn');

// Control button effects
controlBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Play button effect
if (playBtn) {
    playBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // Simulate video play
        alert('Video playback would start here!');
    });
}

// Menu button
if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        alert('Menu would open here!');
    });
}

// Parallax effect for rocks
window.addEventListener('mousemove', function(e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const rocks = document.querySelectorAll('.rock:not(.rock-3)');
    rocks.forEach((rock, index) => {
        const speed = (index + 1) * 0.5;
        rock.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
});

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        // Redirect back to login page
        window.location.href = '/';
    });
}

console.log('SAHIL - Supercar Modifications Dashboard Loaded!');
