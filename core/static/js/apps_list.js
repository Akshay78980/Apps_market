document.addEventListener('DOMContentLoaded', function() {
    fetchApps();
});



async function fetchApps() {
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');

    loading.style.display = 'block';
    errorDiv.innerHTML = '';

    try {
        const response = await fetch('/api/apps/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const apps = await response.json();

        appsAlreadyInstalledResponse = await fetch('/api/apps/installed/');

        appsAlreadyInstalled = await appsAlreadyInstalledResponse.json();
        
        const appListDiv = document.getElementById('appListDiv');
        appListDiv.innerHTML = '';

        apps.forEach(app => {
            const isInstalled = appsAlreadyInstalled.some(installedApp => installedApp.app === app.id);
        
            const appCard = `
                <div class="card w-25 h-25 me-2 text-center rounded-lg">
                    <img src="${app.image}" alt="Image for ${app.name}">
                    <div>
                        <h5 class="card-title">${app.name}</h5>
                        <p class="card-text">Points :${app.points}</p>
                    </div>
                    ${isInstalled ?
                        `<a id='download_app_${app.id}' class='download_link btn btn-success' data-app-id='${app.id}' href='${app.app_file}' download='${app.name}' target="_blank">Download Again</a>`
                        : `<a id='download_app_${app.id}' class='download_link btn btn-success' data-app-id='${app.id}' href='${app.app_file}' download='${app.name}' target="_blank">Download</a>`
                    }
                    
                </div>
            `;
            appListDiv.innerHTML += appCard;
        });

        document.querySelectorAll('.download_link').forEach(link => {
            link.addEventListener('click', async function(event) {
                event.preventDefault();
                
                const appId = this.getAttribute('data-app-id');

                const response = await fetch('/api/apps/create-download-history/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    body: JSON.stringify({
                        app: appId
                    })
                });

                const data = await response.json();

                if (data.success) {
                    console.log("Download record created successfully");
                    const tempLink = document.createElement('a');
                    tempLink.download = link.getAttribute('download');
                    tempLink.href=this.href;
                    tempLink.click();
                    setTimeout(() => {
                        markInstalled(link.id);
                    }, 4000);
                    
                } else {
                    console.error("Failed to create download record:", data.error);
                }
                
            });
        });

    } catch (error) {
        errorDiv.innerHTML = 'Error fetching apps: ' + error.message;
        console.error('Error fetching apps:', error);
    } finally {
        loading.style.display = 'none';
    }
}


