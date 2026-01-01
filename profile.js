// Profile picture display only - no upload functionality
document.addEventListener('DOMContentLoaded', function() {
    // Make profile picture non-interactive
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.style.cursor = 'default';
        
        // Add styles to ensure the image is not clickable
        const style = document.createElement('style');
        style.textContent = `
            .profile-picture {
                cursor: default !important;
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(style);
    }
});
