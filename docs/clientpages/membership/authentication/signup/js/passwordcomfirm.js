const passwordInput = document.getElementById('password');
        const passwordConfirmInput = document.getElementById('passwordconfirm');
        const errorMessage = document.getElementById('password-error');

        passwordConfirmInput.addEventListener('input', function() {
            if (passwordInput.value !== passwordConfirmInput.value) {
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
            }
        });