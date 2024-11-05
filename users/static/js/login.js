

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/dj-rest-auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ username: username, password: password })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.key;
            
            localStorage.setItem('token', token);

            window.location.href = '/apps/'


        } else {

            const errorData = await response.json();
            document.getElementById('error-message').innerText = errorData.non_field_errors.join(', ') || 'Login failed.';
        }
    } 
    
    catch (error) {
        console.error('Error during login:', error);
        document.getElementById('error-message').innerText = 'An error occurred during login. Please try again.';
    }
});





