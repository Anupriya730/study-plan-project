document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Validation checks
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passInput = document.getElementById('pass');
        const rePassInput = document.getElementById('re_pass');

        if (nameInput.value.trim() === '') {
            isValid = false;
            alert('Name cannot be blank');
        }

        if (emailInput.value.trim() === '') {
            isValid = false;
            alert('Email cannot be blank');
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            alert('Email is not valid');
        }

        if (passInput.value.trim() === '') {
            isValid = false;
            alert('Password cannot be blank');
        } else if (passInput.value.trim().length < 6) {
            isValid = false;
            alert('Password must be at least 6 characters');
        }

        if (rePassInput.value.trim() === '') {
            isValid = false;
            alert('Repeat password cannot be blank');
        } else if (rePassInput.value.trim() !== passInput.value.trim()) {
            isValid = false;
            alert('Passwords do not match');
        }

        // If all inputs are valid, you can submit the form
        if (isValid) {
            // Prepare form data for sending
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passInput.value.trim()
            };

            // Send a POST request to the server
            fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch((error) => {
                    console.error('Error:', error);
                });

            window.location.href = '/sign_in_page.html';
        }

    });

    function isValidEmail(email) {
        // Basic email validation using regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
