document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('updateForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const studentId = form.getAttribute('data-student-id'); 
        const formData = new FormData(form);
        const jsonData = {};
        formData.forEach((value, key) => { jsonData[key] = value; });
        fetch(`/students/${studentId+1}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = `/students/${studentId}?success=true`;
            } else {
                window.location.href = `/students/${studentId}?success=false`;
            }
        })
        .catch(error => {
            alert('Error updating student');
            console.error('Error:', error);
        });
    });
});