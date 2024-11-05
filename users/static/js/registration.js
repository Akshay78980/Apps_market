document.getElementById('register_form').addEventListener('submit', async function(event){
    event.preventDefault();
    const username = document.getElementById('username').value
    const password1 = document.getElementById('password1').value
    const password2 = document.getElementById('password2').value
    const email = document.getElementById('email').value || ''
    
    try{
        body = {
            "username" : username,
            'password1' : password1,
            'password2' : password2
        }
        if(email){
            body.email = email
        }

        const response = await fetch('/dj-rest-auth/registration/', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'X-CSRFToken'  : getCookie('csrftoken')
            },
            body : JSON.stringify(body)
    
        });

        if(response.ok){
            console.log("Successfully registered.!");
            window.location.href = '/user/login/';
        }

        else{
            const errorData = await response.json();
            let errorMessage = ''
            if (errorData.password1){
                errorMessage += `Password Error : ${errorData.password1.join('<br>')}`
            }
            if(errorData.username){
                errorMessage += `User Error : ${errorData.username.join('<br>')}`
            }
            if(errorData.non_field_errors){
                errorMessage += `Error : ${errorData.non_field_errors.join('<br>')}`
            }
            document.getElementById('error-message').innerHTML = errorMessage
        }
    }

    catch(error){
        console.log('Error during registration.!')
    } 


});