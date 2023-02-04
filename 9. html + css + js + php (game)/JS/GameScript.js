$(document).ready(function () {

    $("body").css("opacity", "1");

    // Check client online status
    $.ajax({
        type: 'POST',
        url: '../PHP/LogIn&OutRequest.php',
        data: {
            'type': 'check-status',
        },

        success: function (result) {
            if (!result) {
                $('#game-screen').html(`
                    <h2 class="header">♡✧ You are unsigned ✧♡</h2>
                    <button type="button" class="btn-exit" onclick="document.location = '../index.html';">Exit</button>
                `);
            }
        }
    });

    // Set coordinates of the game screen
    $.ajax({
        type: "POST",
        url: "../PHP/GameRequest.php",
        data: {
            'type': 'start',

            'left': 0,
            'top': 0,
            'right': parseInt($('#game-field').css('width')),
            'bottom': parseInt($('#game-field').css('height')),
        },

        success: function () {
            $.ajax({
                type: 'POST',
                url: "../PHP/GameRequest.php",
                data: {
                    type: 'get-player-info',
                },

                success: function (result) {
                    $('#pnt-value').text(`${result.score}`);
                    $('#time-value').text(`${result.time_alive}`);
                }
            });
        }
    });

    // Refresh coordinates of the game screen
    $(window).resize(function (event) {
        $.ajax({
            type: 'POST',
            url: '../PHP/GameRequest.php',
            data: {
                'type': 'resize',

                'left': 0,
                'top': 0,
                'right': parseInt($('#game-field').css('width')),
                'bottom': parseInt($('#game-field').css('height')),
            },
        });
    });

    // Balloon movement
    $(document).keydown(function (event) {
        if ($('#balloon').length) {
            let screen_left = 0;
            let screen_top = 0;
            let screen_right = parseInt($('#game-field').css('width'));
            let screen_bottom = parseInt($('#game-field').css('height'));

            let balloon_left = $('#balloon')[0].offsetLeft;
            let balloon_top = $('#balloon')[0].offsetTop;
            let balloon_right = balloon_left + parseInt($('#balloon').css('width'));
            let balloon_bottom = balloon_top + parseInt($('#balloon').css('height'));

            switch (event.code) {
                case 'KeyW':
                    if (balloon_top > screen_top) {
                        $('#balloon').animate({ top: `-=20` }, 30);
                    }
                    break;
                case 'KeyA':
                    if (balloon_left > screen_left) {
                        $('#balloon').animate({ left: `-=20` }, 30);
                    }
                    break;
                case 'KeyS':
                    if (balloon_bottom < screen_bottom) {
                        $('#balloon').animate({ top: `+=20` }, 30);
                    }
                    break;
                case 'KeyD':
                    if (balloon_right < screen_right) {
                        $('#balloon').animate({ left: `+=20` }, 30);
                    }
                    break;
            }
        }
    });

    let startGame = function () {
        let game = setInterval(() => {
            if (get_hearts() > 0) {
                increase_time();
                if ($('#cloud-field').children().length < 12) { create_cloud(); }
                if (!$('#bln-number').text()) { update_bln_value(); }
            } else {
                clearInterval(game);
            }
        }, 1000);
    }

    let create_cloud = function () {
        $.ajax({
            type: 'POST',
            url: '../PHP/CloudRequest.php',
            data: {
                type: 'create-cloud',
                expr_length: 2,
            },

            success: function (result) {
                let expression = $('<div>').addClass('expression').text(result.wording);
                let cloud = $('<div>').addClass('cloud').attr('id', result.id).css({
                    'top': result.y + 'px',
                    'left': result.x + 'px',
                });
                $('#cloud-field').append(cloud.append(expression));
                move_cloud(cloud);
            }
        });
    }

    let move_cloud = function (cloud) {
        $.ajax({
            type: 'POST',
            url: '../PHP/CloudRequest.php',
            data: {
                type: 'move-cloud',
                id: cloud.attr('id'),
            },

            success: function (result) {
                let temp = 0;
                let left = cloud.css('left');
                let move = setInterval(() => {
                    if (++temp < result.steps && $(`#${cloud.attr('id')}`).length > 0) {
                        cloud.animate({ left: `-=${result.speed}px` }, 100, 'linear', update_distance(cloud.attr('id')));
                    } else {
                        if (restart_cloud(cloud.attr('id'))) {
                            cloud.animate({ opacity: 0 }, 600, () => {
                                cloud.css('left', left);
                                cloud.animate({ opacity: 1 }, 600, () => {
                                    move_cloud(cloud);
                                });
                            });
                            clearInterval(move);
                        } else {
                            delete_cloud(cloud.attr('id'));
                            clearInterval(move);
                        }
                    }
                }, 100);
            }
        });
    }

    let delete_cloud = function (cloud_id) {
        $.ajax({
            type: 'POST',
            url: '../PHP/CloudRequest.php',
            data: {
                type: 'delete-cloud',
                id: cloud_id,
            },

            success: function () {
                update_score();
                update_bln_value();
                $(`#${cloud_id}`).animate({ opacity: 0 }, 600, function () { $(`#${cloud_id}`).remove(); });
            }
        });
    }

    let restart_cloud = function (cloud_id) {
        return parseInt($.ajax({
            type: 'POST',
            url: '../PHP/CloudRequest.php',
            async: false,
            data: {
                type: 'restart_cloud',
                id: cloud_id,
            }
        }).responseText);
    }

    let update_distance = function (cloud_id) {

        let balloon_x = $('#balloon')[0].offsetLeft + (parseInt($('#balloon').css('width')) / 2);
        let balloon_y = $('#balloon')[0].offsetTop + (parseInt($('#balloon').css('height')) / 2);

        let cloud_x = $(`#${cloud_id}`)[0].offsetLeft + 80;
        let cloud_y = $(`#${cloud_id}`)[0].offsetTop + 40;

        $.ajax({
            type: 'POST',
            url: '../PHP/CloudRequest.php',
            data: {
                type: 'update_distance',
                id: cloud_id,

                balloon_x: balloon_x,
                balloon_y: balloon_y,
                cloud_x: cloud_x,
                cloud_y: cloud_y,
            },

            success: function (result) {
                if (result.delete_cloud) {
                    delete_cloud(result.id);
                }

                if (result.take_heart) {
                    for (i = 0; i < $('#lives-value').children().length; i++) {
                        let heart_class = $('#lives-value').children()[i].attributes[0].nodeValue;
                        if (heart_class === 'heart') {
                            $('#lives-value').children()[i].attributes[0].nodeValue = 'heart-before';
                            break;
                        }
                    }
                }

                if (result.game_over) {
                    gameover();
                }

            }
        });
    }

    let update_bln_value = function () {
        $.ajax({
            type: 'POST',
            url: '../PHP/GameRequest.php',
            data: {
                type: 'update-bln-value',
            },

            success: function (result) {
                if (result.success) {
                    $('#bln-number').text(result.value);
                }
            }
        });
    }

    let increase_time = function () {
        $.ajax({
            type: 'POST',
            url: "../PHP/GameRequest.php",
            data: {
                type: 'increase-time',
            },

            success: function (result) {
                $('#time-value').text(`${result}`);
            }
        });
    }

    let get_hearts = function () {
        return parseInt($.ajax({
            type: 'POST',
            url: '../PHP/GameRequest.php',
            async: false,
            data: {
                'type': 'get-hearts',
            }
        }).responseText);
    }

    let decrease_hearts = function () {
        $.ajax({
            type: 'POST',
            url: '../PHP/GameRequest.php',
            data: {
                type: 'decrease-hearts',
            },
            success: function (result) {
                if (result.take_heart) {
                    for (i = 0; i < $('#lives-value').children().length; i++) {
                        let heart_class = $('#lives-value').children()[i].attributes[0].nodeValue;
                        if (heart_class === 'heart') {
                            $('#lives-value').children()[i].attributes[0].nodeValue = 'heart-before';
                            break;
                        }
                    }
                }

                if (result.game_over) {
                    gameover();
                }
            }
        });
    }

    let update_score = function () {
        $.ajax({
            type: 'POST',
            url: '../PHP/GameRequest.php',
            data: {
                'type': 'update-score',
            },

            success: function (result) {
                $('#pnt-value').text(result);
            }
        });
    }

    let gameover = function () {
        $.ajax({
            type: 'POST',
            url: '../PHP/GameRequest.php',
            data: {
                type: 'game-over',
            },

            success: function (result) {
                $('.score-number').text('Score: ' + $('#pnt-value').text());
                $('.time-alive').text('Time alive: ' + $('#time-value').text());

                $('#balloon-field').empty();
                $('#balloon-field').css('width', '0%');
                $('#cloud-field').empty();
                $('#cloud-field').css('width', '0%');
                $('#game-over-sign').css('display', 'block');
                $('#game-over-sign').text('Game Over');
                $('#btn-get-stats').css('display', 'inline-block');
                $('#btn-replay').css('display', 'inline-block');

                $('#bln-time').prop('disabled', true);
                $('#bln-speed').prop('disabled', true);
                $('#bln-delete').prop('disabled', true);
                $('#bln-time').css('background-color', `grey`);
                $('#bln-speed').css('background-color', `grey`);
                $('#bln-delete').css('background-color', `grey`);
            }
        });
    }

    $('#btn-start').on('click', function (event) {
        startGame();
        $('#btn-start').attr('disabled', true);
    });

    $('#btn-return').on('click', function (event) {
        $("body").css("opacity", "0");
        setTimeout(() => document.location = `../HTML/Menu.html`, 500);
    });

    $('#btn-replay').on('click', function (event) {
        $("body").css("opacity", "0");
        location.reload();
    });

    $('#btn-get-stats').on('click', function (event) {
        $('#game-over-sign').css('display', 'none');
        $('#game-over-field').css('display', 'none');
        $('.statistics').css('display', 'block');
    });

    $('#btn-continue').on('click', function (event) {
        $('#game-over-sign').css('display', 'block');
        $('#game-over-field').css('display', 'block');
        $('.statistics').css('display', 'none');
    });

})
