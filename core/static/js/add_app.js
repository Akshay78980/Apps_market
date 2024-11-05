document.getElementById('addAppForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('points', document.getElementById('points').value);
    formData.append('app_file', document.getElementById('app_file').files[0]);
    formData.append('image', document.getElementById('image').files[0]);


    try {
        const response = await fetch('/api/add-app/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Authorization': `Token ${getAuthToken()}` 
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            window.location.href = '/apps/';
        } else {
            const errorData = await response.json();
            document.getElementById('error-message').innerText = errorData.non_field_errors.join(', ') || 'App creation failed.';
        }
    } catch (error) {
        console.error('Error during app creation:', error);
        document.getElementById('error-message').innerText = 'An error occurred during app creation. Please try again.';
    }
});
