document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('login-form');
    const nameInput = document.getElementById('your_name');
    const passInput = document.getElementById('your_pass');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Resetting previous error messages
        clearErrors();

        // Validation checks
        let isValid = true;

        if (nameInput.value.trim() === '') {
            isValid = false;
            setErrorFor(nameInput, 'Name cannot be blank');
        }

        if (passInput.value.trim() === '') {
            isValid = false;
            setErrorFor(passInput, 'Password cannot be blank');
        }

        // If all inputs are valid, you can submit the form
        if (isValid) {
            console.log("Redirecting to questionnaire.html");
            window.location.href = "questionnaire.html";
        }
    });

    function setErrorFor(input, message) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-message');
        errorMsg.innerText = message;
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(element) {
            element.innerText = '';
        });
    }
});