// Permit to show if a student has benn well created or not
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    let showAlert = false;
    let message = '';

    if (urlParams.has('created') && urlParams.get('created') === '1') {
        message = 'Student has been successfully created!';
        showAlert = true;
    } else if (urlParams.has('error') && urlParams.get('error') === '1') {
        message = 'Failed to create student. Please try again.';
        showAlert = true;
    }

    if (showAlert) {
        alert(message);
        window.history.pushState({}, document.title, window.location.pathname);
    }
});