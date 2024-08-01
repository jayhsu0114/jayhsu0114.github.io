document.addEventListener('DOMContentLoaded', function() {
    // Clear local storage when the page loads
    localStorage.clear();

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

        // Check local storage count
        const submitCount = parseInt(localStorage.getItem('submitCount')) || 0;
        if (submitCount >= 3) {
            alert('請稍候再試');
            return;
        }

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
                // alert('資料提交成功');
                // Clear textarea after successful submission
                document.getElementById('anonymousContent').value = '';

                // Log the textarea's offsetWidth
                const textarea = document.getElementById('anonymousContent');
                console.log('Textarea offsetWidth:', textarea.offsetWidth);

                // Create and insert the canvas element
                const canvas = document.createElement('canvas');
                canvas.width = textarea.offsetWidth + 5;
                canvas.height = textarea.offsetHeight;
                canvas.style.position = 'absolute';
                canvas.style.top = textarea.offsetTop + 'px';
                canvas.style.left = textarea.offsetLeft + 'px';
                canvas.style.zIndex = '2';
                canvas.style.backgroundColor = 'rgba(112, 167, 221, 1)';

                const context = canvas.getContext('2d');
                context.fillStyle = '#fefdf7';
                context.font = 'bold 35px Arial';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText('發 送 中', canvas.width / 2, canvas.height / 2);

                textarea.parentNode.insertBefore(canvas, textarea);

                // Increment local storage count
                localStorage.setItem('submitCount', submitCount + 1);
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
