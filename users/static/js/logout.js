document.getElementById('logoutBtn').addEventListener('click', async function(event) {
    event.preventDefault();

    try {
        const response = await fetch('/dj-rest-auth/logout/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        });

        if (response.ok) {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = '/user/login/';
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
});

