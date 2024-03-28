
function validatePayment() {
    const personName = document.getElementById('person_name').value;
    const cardNumber = document.getElementById('card_number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    const alertMessages = [];

    // Name validation
    if (!personName.trim()) {
        alertMessages.push('Please enter your name.');
    }

    // Card number validation
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
        alertMessages.push('Please enter a valid 16-digit card number.');
    }

    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    const currentYear = today.getFullYear();

// Assuming expiry is in MM/YYYY format
    const expiryParts = expiry.split('/');
    const expiryMonth = parseInt(expiryParts[0], 10);
    const expiryYear = parseInt(expiryParts[1], 10);

    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        alertMessages.push('Please enter a valid expiry date that is greater than or equal to the current date.');
    }


    // CVV validation
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
        alertMessages.push('Please enter a valid 3-digit CVV.');
    }

    // Show all alert messages
    if (alertMessages.length > 0) {
        showAlerts(alertMessages);
    } else {
        // Payment successful
        alert('Payment successful!');
        window.location.href = "Thankyou.html";
    }
}

function showAlerts(messages) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = ''; // Clear previous alerts

    if (messages.length > 0) {
        messages.forEach(message => {
            const alertDiv = document.createElement('div');
            alertDiv.classList.add('alert');
            alertDiv.classList.add('alert-danger');
            alertDiv.textContent = message;
            alertContainer.appendChild(alertDiv);
        });

        alertContainer.style.display = 'block';
    } else {
        alertContainer.style.display = 'none';
    }
}