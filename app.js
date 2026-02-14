const pages = ['cover', 'page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8'];
let currentPageIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
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
