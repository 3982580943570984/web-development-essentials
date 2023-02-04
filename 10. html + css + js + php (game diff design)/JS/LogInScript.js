$(document).ready(function () {

    $("body").css("opacity", "1");

    $('.entry-form').submit(function (event) {
        event.preventDefault();

        document.cookie = `login=${$('#login').val()}`;

        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: {
                type: "log-in",
                password: $('#password').val()
            },

            success: function (result) {
                if (result) {
                    $('.result').text('Succesfully logged in');

                    setTimeout(() => {
                        $("body").css("opacity", "0");
                    }, 400);

                    setTimeout(function () {
                        document.location = `HTML/Menu.html`;
                    }, 1000);

                } else {
                    $('.result').text('Your login or password were incorrect');
                }
            }
        });
    });

    $('.registration-form').submit(function (event) {

        event.preventDefault();

        $.ajax({
            type: $(this).attr('method'), // POST
            url: $(this).attr('action'),
            data: {
                login: $('#new-login').val(),
                password: $('#new-password').val(),
                email: $('#new-email').val(),
                name: $('#new-name').val(),
                age: $('#new-age').val()
            },

            success: function (result) {
                if (result.success) {
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
                    $('#new-login-error-msg').text(result.loginError);
                    result.loginError ? $('#new-login-error').css('background-color', 'red') : $('#new-login-error').css('background-color', 'green');

                    $('#new-password-error-msg').text(result.passwordError);
                    result.passwordError ? $('#new-password-error').css('background-color', 'red') : $('#new-password-error').css('background-color', 'green');

                    $('#new-email-error-msg').text(result.emailError);
                    result.emailError ? $('#new-email-error').css('background-color', 'red') : $('#new-email-error').css('background-color', 'green');

                    $('#new-name-error-msg').text(result.nameError);
                    result.nameError ? $('#new-name-error').css('background-color', 'red') : $('#new-name-error').css('background-color', 'green');

                    $('#new-age-error-msg').text(result.ageError);
                    result.ageError ? $('#new-age-error').css('background-color', 'red') : $('#new-age-error').css('background-color', 'green');
                }
            }
        });
    });

    $('#btn-register').on('click', function () {
        $(".entry-form").fadeOut(0);
        $(".registration-form").fadeIn(400);
    });

    $('#btn-cancel').on('click', function () {
        $(".entry-form").fadeIn(400);
        $(".registration-form").fadeOut(0);
    });

});