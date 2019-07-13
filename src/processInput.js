function processInput() {

    let form = document.getElementById("subscriberForm");
    let formData = new FormData(form);
    let inputElement = document.getElementById("email");

    //admin login
    if(formData.get("email") === "admin@gmail.com") {

        //change email form to a password form
        document.querySelector("label").innerHTML = "Password:";
        inputElement.setAttribute("type", "password"); 
        inputElement.setAttribute("name", "password");
        inputElement.value = ""; //A property of the HTMLInputElement type
        document.getElementById("formBtn").setAttribute("onclick", "return createAdminPage()");
        form.setAttribute("action", "");
    }
    else {
        submitFormWithAjax();
    }
}

function submitFormWithAjax() {
    // Get the form.
    let form = $('#subscriberForm');

    // Get the messages div.
    let formMessages = $('#formMessages');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        let subscriberFormData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: '/src/subscribe.php',
            data: subscriberFormData
        })
        .done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#email').val('');
        })
        .fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
}

function createAdminPage() {
    let form = document.getElementById("subscriberForm");
    let formData = new FormData(form);

    if(formData.get("password") === "guy") {
        replaceSubscriberFormWithAdminForm();
    } else {
        //nice alert saying your password is wrong
    }
    return false; //don't run the form action
}

function replaceSubscriberFormWithAdminForm() {
    let subscriberForm = document.getElementById("subscriberForm");
	let adminForm = document.createElement('p');
    adminForm.innerHTML =
        `<form id="adminForm" action="src/sendMail.php" method="POST">
          <label for="emailSubject">Subject:</label>
          <input type="text" name="email-subject" id="emailSubject"></input>
          <textarea name="email-body" style="display: block;"></textarea>
          <button onclick="processEmail()">Send</button>
        </form>`;
	
    subscriberForm.parentNode.replaceChild(adminForm, subscriberForm);
}

function processEmail() {

    let adminForm = $('#adminForm');

    $(adminForm).submit(function(e) {
        e.preventDefault();

        let adminFormData = $(adminForm).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: '/src/sendMail.php',
            data: adminFormData
        })
        .done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Set the message text.
            $(formMessages).text(response);
            
        })
        .fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    })
}