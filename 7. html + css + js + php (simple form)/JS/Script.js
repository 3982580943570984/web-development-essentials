$(document).ready(function () {

    function logInRequest() {
        let xhr = new XMLHttpRequest();
        let url = "PHP/Entry.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText == '1') {
                $('.result').text('Succesfully logged in');
                setTimeout(function () {
                    document.location = `http://localhost/Lab_6/HTML/Account.html?login=${$('#login').val()}`;
                }, 1000);
            } else {
                $('.result').text('Your login or password were incorrect');
            }
        };
        var data = JSON.stringify(
            {
                "login": $('#login').val(),
                "password": $('#password').val()
            }
        );
        xhr.send(data);
    }

    function createAccount() {
        let xhr = new XMLHttpRequest();
        let url = "PHP/Registration.php";

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let regInfo = JSON.parse(xhr.responseText);
                if (regInfo.success) {
                    $('#new-login-error-msg').text('');
                    $('#new-password-error-msg').text('');
                    $('#new-email-error-msg').text('');
                    $('#new-name-error-msg').text('');
                    $('#new-age-error-msg').text('');

                    $('#new-login-error').css('background-color', 'green');
                    $('#new-password-error').css('background-color', 'green');
                    $('#new-email-error').css('background-color', 'green');
                    $('#new-name-error').css('background-color', 'green');
                    $('#new-age-error').css('background-color', 'green');

                    $('.result2').text('Account has been created successfully');
                    setTimeout(function () {
                        $(".registration-form").fadeOut(0);
                        $(".entry-form").fadeIn(400);
                        $('.result2').text('');
                    }, 2000);
                } else {
                    $('#new-login-error-msg').text(regInfo.loginError);
                    regInfo.loginError ? $('#new-login-error').css('background-color', 'red') : $('#new-login-error').css('background-color', 'green');

                    $('#new-password-error-msg').text(regInfo.passwordError);
                    regInfo.passwordError ? $('#new-password-error').css('background-color', 'red') : $('#new-password-error').css('background-color', 'green');

                    $('#new-email-error-msg').text(regInfo.emailError);
                    regInfo.emailError ? $('#new-email-error').css('background-color', 'red') : $('#new-email-error').css('background-color', 'green');

                    $('#new-name-error-msg').text(regInfo.nameError);
                    regInfo.nameError ? $('#new-name-error').css('background-color', 'red') : $('#new-name-error').css('background-color', 'green');

                    $('#new-age-error-msg').text(regInfo.ageError);
                    regInfo.ageError ? $('#new-age-error').css('background-color', 'red') : $('#new-age-error').css('background-color', 'green');
                }
            }
        };

        let jsonData = {
            "login": $('#new-login').val(),
            "password": $('#new-password').val(),
            "email": $('#new-email').val(),
            "name": $('#new-name').val(),
            "age": $('#new-age').val(),
            "medicine": []
        }
        xhr.send(JSON.stringify(jsonData));
    }

    $('#btn-enter').on('click', function () {
        logInRequest();
    });

    $('#btn-register').on('click', function () {
        $(".entry-form").fadeOut(0);
        $(".registration-form").fadeIn(400);
    });

    $('#btn-new-register').on('click', function () {
        createAccount();
    });

    $('#btn-cancel').on('click', function () {
        $(".registration-form").fadeOut(0);
        $(".entry-form").fadeIn(400);
    });
});