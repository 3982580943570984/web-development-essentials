$(document).ready(function () {

    $.ajax({
        type: 'POST',
        url: '../PHP/LogIn&OutRequest.php',
        data: {
            'type': 'check-status',
        },

        success: function (result) {
            if (!result) {
                $('.menu').html(`
                    <h2 class="header">♡✧ You are unsigned ✧♡</h2>
                    <button type="button" class="btn-exit" onclick="document.location = '../index.html';">Exit</button>
                `);
            }
        }
    });

    $.ajax({});

    $("body").css("opacity", "1");

    $('.btn-play').on('click', function (event) {
        $("body").css("opacity", "0");
        setTimeout(() => document.location = `../HTML/Game.html`, 500);
    });

    $('.btn-settings').on('click', function (event) {
        $("body").css("opacity", "0");
        setTimeout(() => document.location = `../HTML/Settings.html`, 500);
    });

    $('.btn-shop').on('click', function (event) {
        $("body").css("opacity", "0");
        setTimeout(() => document.location = `../HTML/Shop.html`, 500);
    });

    $('.btn-leaderboard').on('click', function (event) {
        $("body").css("opacity", "0");
        setTimeout(() => document.location = `../HTML/Leaderboard.html`, 500);
    });

    $('.btn-achievement').on('click', function (event) {
        $("body").css("opacity", "0");
        setTimeout(() => document.location = `../HTML/Achievements.html`, 500);
    });

    $('.btn-exit').on('click', function (event) {
        $.ajax({
            type: 'POST',
            url: '../PHP/LogIn&OutRequest.php',
            data: {
                'type': 'log-out',
            },

            success: function (result) {
                document.cookie = 'login' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
                $("body").css("opacity", "0");
                setTimeout(() => document.location = `../index.html`, 500);
            }
        });
    });

});