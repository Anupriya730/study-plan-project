function validateForm() {
    console.log("validateForm function called");
    var satisfaction = document.getElementsByName('satisfaction');
    var comments = document.getElementById('comments').value;

    // Check if at least one satisfaction rating is selected
    var satisfactionSelected = false;
    for (var i = 0; i < satisfaction.length; i++) {
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
    else
    {
        window.location.href = '/thankyou.html';
    }


}
