document.addEventListener("DOMContentLoaded", function(event){
    let button = document.querySelector('button#create');
    button.addEventListener('click', function(){
        window.location.href = '/students/create';
    });
});