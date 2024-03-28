document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('questionnaire-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const retrievedUsername = urlParams.get('username');
        const checkboxGroups = document.querySelectorAll('.checkbox-group');

        for (let i = 0; i < checkboxGroups.length; i++) {
            const checkboxes = checkboxGroups[i].querySelectorAll('input[type="checkbox"]');
            let checked = false;

            for (let j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j].checked) {
                    checked = true;
                    break;
                }
            }

            if (!checked) {
                event.preventDefault();
                alert('Please answer all the questions!');
                return;
            }
        }

        let formData = new FormData(form);
        let jsonObject = {};
        for (const [key, value] of formData.entries()) {
            if (jsonObject[key] !== undefined) {
                if (!(jsonObject[key] instanceof Array)) {
                    jsonObject[key] = [jsonObject[key]];
                }
                jsonObject[key].push(value);
            } else {
                jsonObject[key] = value;
            }
        }

        jsonObject['email'] = retrievedUsername;

        // Send a POST request to the server
        fetch('/questionnaire-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message === 'Form submitted successfully!') {
                    // Redirect to questionnaire.html
                    window.location.href = `/payment.html?username=${data.email}`;
                    data.message = 'Form may be submitted again';
                } else {
                    document.getElementById('error-message').innerText = data.message;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});
