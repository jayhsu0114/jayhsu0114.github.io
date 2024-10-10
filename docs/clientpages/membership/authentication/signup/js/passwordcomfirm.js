const passwordInput = document.getElementById('password');
        const passwordConfirmInput = document.getElementById('passwordconfirm');
        const passworderrorMessage = document.getElementById('password-error');

        passwordConfirmInput.addEventListener('input', function() {
            if (passwordInput.value !== passwordConfirmInput.value) {
                passworderrorMessage.style.display = 'block';
            } else {
                passworderrorMessage.style.display = 'none';
            }
        });