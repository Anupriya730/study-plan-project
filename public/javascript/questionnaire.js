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

        const formData = new FormData(event.target);
        const jsonObject = {
            primary_goal: formData.get('primary_goal'),
            subjects_of_interest: formData.get('subjects_of_interest'),
            confidence_level: formData.get('confidence_level'),
            learning_style: formData.get('learning_style'),
            time_dedication: formData.get('time_dedication'),
            has_deadlines: formData.get('has_deadlines'),
            has_prior_experience: formData.get('has_prior_experience'),
            study_materials: formData.get('study_materials'),
            anticipated_challenges: formData.get('anticipated_challenges'),
            email: formData.get('email'),
            subjects_scores: {
                math: parseInt(formData.get('subjects_scores[math]')),
                science: parseInt(formData.get('subjects_scores[science]')),
                english: parseInt(formData.get('subjects_scores[english]')),
                history: parseInt(formData.get('subjects_scores[history]')),
                geography: parseInt(formData.get('subjects_scores[geography]')),
                art: parseInt(formData.get('subjects_scores[art]'))
            }
        };

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
                localStorage.setItem('studyPlan', JSON.stringify(data.plan));
                window.location.href = '/study_plan.html';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});