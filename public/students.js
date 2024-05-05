// Permit to move on the student creation page from the student list page
document.addEventListener("DOMContentLoaded", function(){
    let button = document.querySelector('button#create');
    button.addEventListener('click', function(){
        let model = button.getAttribute('data-model');
        if (model === 'CSV') {
            window.location.href = '/students/create';
        } else if (model === 'MongoDB') {
            window.location.href = '/students/create-in-db';
        }
    });
});