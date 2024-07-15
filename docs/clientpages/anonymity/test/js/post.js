document.addEventListener('DOMContentLoaded', function() {
    // Function to get cookie value by name
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue;
            }
        }
        return '';
    }

    // Fill userId input with cookie value
    document.getElementById('userId').value = getCookie('userId');

    // Form submission handling
    document.getElementById('zsjhForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Disable submit button
        const submitButton = document.getElementById('submitButton');
        submitButton.disabled = true;

        // Prepare data to send
        const formData = {
            userId: getCookie('userId'),
            anonymousContent: document.getElementById('anonymousContent').value,
            formId: 'zsjh'
        };

        // Post data to backend URL
        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/Mercury', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                //alert('資料提交成功');
                // Clear textarea after successful submission
                document.getElementById('anonymousContent').value = '';
            } else {
                throw new Error('資料提交失敗');
            }
        })
        .catch(error => {
            console.error('Error submitting form data:', error);
            alert('資料提交失敗');
        })
        .finally(() => {
            // Re-enable submit button after request completes
            submitButton.disabled = false;
        });
    });
});