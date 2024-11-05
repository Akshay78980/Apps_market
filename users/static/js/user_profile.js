document.addEventListener('DOMContentLoaded', function() {
    fetchUserProfile();

    // Bootstrap modal and upload elements
    let selectedFile = null;
    const modal = new bootstrap.Modal(document.getElementById('uploadModal'));
    const uploadButton = document.getElementById('uploadButton');

    // Function to fetch user profile data and populate table
    function fetchUserProfile() {
        fetch('/user/profile/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Ensure getCookie is defined
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').textContent = data.username;
            document.getElementById('email').textContent = data.email;
            document.getElementById('points_earned').textContent = data.points_earned;

            const tasksTable = document.getElementById('tasks_completed');
            tasksTable.innerHTML = '';
            const headingRow = `<tr class='bg-dark text-light'>
                                <td>Application</td>
                                <td>Points Earned</td>
                                <td></td>
                              </tr>`;
            tasksTable.innerHTML += headingRow;

            data.tasks_completed.forEach(task => {
                const row = `<tr>
                                <td>${task.app_name}</td>
                                <td>${task.points_earned}</td>
                                <td><a class='upload_screenshot_link btn btn-success' data-app-download-id="${task.id}">Upload screenshot</a></td>
                             </tr>`;
                tasksTable.innerHTML += row;
            });

            // Set up event listeners for each new upload screenshot link
            document.querySelectorAll('.upload_screenshot_link').forEach(element => {
                element.addEventListener('click', function(event) {
                    event.preventDefault();
                    const downloadId = element.getAttribute('data-app-download-id');
                    openUploadModal(downloadId);
                });
            });
        })
        .catch(error => console.error('Error fetching profile data:', error));
    }

    // Function to open upload modal
    function openUploadModal(downloadId) {
        uploadButton.setAttribute('data-app-download-id', downloadId); // Set download ID
        uploadStatus.textContent = ''; // Clear status
        selectedFile = null; // Reset file
        fileInput.value = ''; // Clear previous input
        uploadStatus.textContent = ""; // Reset upload status
    
        modal.show(); // Show modal
    
        // Set up the file input change event
        fileInput.onchange = () => {
            selectedFile = fileInput.files[0];
            if (selectedFile) {
                uploadStatus.textContent = `Selected file: ${selectedFile.name}`;
            } else {
                uploadStatus.textContent = "No file selected.";
            }
        };
    
        // Upload file
        uploadButton.addEventListener('click', async function() {
            const downloadId = uploadButton.getAttribute('data-app-download-id');
            if (!selectedFile) {
                uploadStatus.textContent = "Please select a file first!";
                return;
            }
    
            const formData = new FormData();
            formData.append('screenshot', selectedFile);
    
            try {
                const response = await fetch(`/api/user/downloaded_apps/${downloadId}/upload_screenshot/`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                });
                const data = await response.json();
    
                if (response.ok && data.success) {
                    uploadStatus.textContent = "Screenshot uploaded successfully!";
                    setTimeout(() => modal.hide(), 2000); // Hide modal after success
                } else {
                    uploadStatus.textContent = `Error: ${data.error || 'Failed to upload screenshot'}`;
                }
            } catch (error) {
                console.error("Error uploading screenshot:", error);
                uploadStatus.textContent = "An error occurred while uploading.";
            }
        });
    }

    // Set up file upload handlers
    

    // Close modal buttons
    document.getElementById('modalClose').onclick = () => modal.hide();
    document.getElementById('modalCloseFooter').onclick = () => modal.hide();
});

// Helper function to get CSRF token (if not already defined)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
