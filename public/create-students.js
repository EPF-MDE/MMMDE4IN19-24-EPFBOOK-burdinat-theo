document.addEventListener("DOMContentLoaded", function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    let showAlert = false;
    let message = '';
    let messageType = '';

    if (urlParams.has('created') && urlParams.get('created') === '1') {
        message = 'Student has been successfully created!';
        messageType = 'success';
        showAlert = true;
    } else if (urlParams.has('error') && urlParams.get('error') === '1') {
        message = 'Failed to create student. Please try again.';
        messageType = 'error';
        showAlert = true;
    }

    if (showAlert) {
        alert(message);
        window.history.pushState({}, document.title, window.location.pathname);
    }
});