const pages = ['cover', 'page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8'];
let currentPageIndex = 0;
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');
let isMusicPlaying = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Setup Music Control
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
        updateMusicIcon(); // Initial state (muted/stopped)
    }

    // Ensure only the first page is active initially
    pages.forEach((pageId, index) => {
        const pageElement = document.getElementById(pageId);
        if (index === 0) {
            pageElement.classList.add('active');
        } else {
            pageElement.classList.remove('active');
        }
    });
    updateUI();
});

function updateUI() {
    // Update pages visibility
    pages.forEach((pageId, index) => {
        const pageElement = document.getElementById(pageId);
        if (index === currentPageIndex) {
            pageElement.classList.add('active');
        } else {
            pageElement.classList.remove('active');
        }
    });

    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        // Calculate progress based on content pages (excluding cover)
        // If on cover (index 0), progress is 0.
        // If on page 1 (index 1), progress is 1/8.
        // If on page 8 (index 8), progress is 8/8 (100%).
        let progress = 0;
        if (currentPageIndex > 0) {
            progress = (currentPageIndex / (pages.length - 1)) * 100;
        }
        progressBar.style.width = `${progress}%`;
    }
}

function startExperience() {
    // Try to play music on first interaction
    playMusic();
    nextPage();
}

function playMusic() {
    if (music) {
        music.volume = 0.5; // Set volume to 50%
        music.play().then(() => {
            isMusicPlaying = true;
            updateMusicIcon();
        }).catch(error => {
            console.log("Audio play failed (user interaction needed):", error);
        });
    }
}

function toggleMusic() {
    if (music) {
        if (music.paused) {
            music.play();
            isMusicPlaying = true;
        } else {
            music.pause();
            isMusicPlaying = false;
        }
        updateMusicIcon();
    }
}

function updateMusicIcon() {
    if (musicBtn) {
        musicBtn.textContent = isMusicPlaying ? "♫" : "✕"; // Simple text icons or use SVG
        musicBtn.style.opacity = isMusicPlaying ? "1" : "0.5";
    }
}

function nextPage() {
    if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        updateUI();
    }
}

function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        updateUI();
    }
}

function restart() {
    currentPageIndex = 0;
    updateUI();
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        prevPage();
    }
});
