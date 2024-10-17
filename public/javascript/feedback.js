function validateForm() {
    console.log("validateForm function called");

    const satisfaction = document.getElementsByName('satisfaction');
    const comments = document.getElementById('comments').value;

    // Check if at least one satisfaction rating is selected
    let satisfactionSelected = false;
    for (let i = 0; i < satisfaction.length; i++) {
        if (satisfaction[i].checked) {
            satisfactionSelected = true;
            break;
        }
    }

    // Check if comments are provided
    if (!satisfactionSelected) {
        alert("Please select a satisfaction rating.");
        return false;
    } else if (comments.trim() === "") {
        alert("Please provide your feedback.");
        return false;
    }

    // If everything is valid, return true
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('feedbackForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Validate form
        if (!validateForm()) {
            return; // Stop submission if form is invalid
        }

        // Prepare form data for submission
        const formData = {
            satisfaction: document.querySelector('input[name="satisfaction"]:checked').value,
            comments: document.getElementById('comments').value
        };

        try {
            const response = await fetch('/submit-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                form.reset();
                document.getElementById('thankYouMessage').style.display = 'block';
            } else {
                console.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
