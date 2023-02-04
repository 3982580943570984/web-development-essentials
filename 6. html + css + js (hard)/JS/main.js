let figuresID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function getRandomID() {
    let randomIndex = random(0, figuresID.length - 1);
    let value = figuresID[randomIndex];
    figuresID.splice(randomIndex, 1);
    return value;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let time = 0;
let figuresNumber = 0;
let score = 0;
let selfkilled = 0;
let shots = 0;
let hit = 0;
let miss = 0;

const timer = document.getElementById('timer');

$(document).ready(function () {

    time = $('#timer').val();

    function DrawFigures() {

        let type = function () {
            var checked = [];
            $('.target-type input:checkbox:checked').each(function () {
                checked.push($(this).val());
            });
            return checked[random(0, checked.length - 1)];
        };

        let side = function () {
            if ($('input[name="size"]:checked').val() == 1) { return 50; }
            if ($('input[name="size"]:checked').val() == 2) { return 75; }
            if ($('input[name="size"]:checked').val() == 3) { return 100; }
        };

        let color = function () {
            var checked = [];
            $('.target-color input:checkbox:checked').each(function () {
                checked.push($(this).val());
            });
            return checked[random(0, checked.length - 1)];
        };

        let coordinateX = function () {
            let min = $(".field").offset().left + side();
            let max = Number($(".field").css('width').replace("px", "")) - side();
            return random(min, max);
        };

        let coordinateY = function () {
            let min = $(".field").offset().top + side();
            let max = $(".field").offset().top + Number($(".field").css('height').replace("px", "")) - side();
            return random(min, max);
        };

        function setStatistics() {
            miss = shots - hit;
            $(".fgrs-number").text('Всего фигур: ' + figuresNumber);
            $(".fgrs-killed").text('Фигур уничтожено: ' + score);
            $(".fgrs-selfkilled").text('Фигур исчезло: ' + selfkilled);
            $(".shots-all").text('Всего выстрелов: ' + shots);
            $(".shots-hit").text('Попаданий: ' + hit);
            $(".shots-miss").text('Промохов: ' + miss);
        }

        let Draw = setInterval(function () {
            if (time <= 0) {
                setStatistics();
                clearInterval(Draw);
                $(".field").empty();
                $(".field").append("<p class='timeOver'> Время вышло </p>");
                $(".timeOver").fadeIn(400);
                let temp = setTimeout(function () {
                    $(".timeOver").fadeOut(0);
                    $(".scene").fadeOut(400);
                }, 1200);
                let temp1 = setTimeout(function () {
                    $(".statistics").fadeIn(400);
                }, 1700);
                $(".btn-continue").click(function () {
                    $(".statistics").fadeOut(400);
                    let reset = setTimeout(function () {
                        $(".menu").fadeIn(800);
                    }.bind(this), 500);
                });
                time = $('#timer').val();

            } else {
                figuresNumber++;
                const figure = new Figure(type(), side(), color(), coordinateX(), coordinateY(), getRandomID());
                figure.show();
                figure.move();
                --time;
                $(".timer").text('Оставшееся время: ' + time);
            }
        }, 1000);
    };

    $(".btn-play").click(function () {

        figuresNumber = 0;
        score = 0;
        selfkilled = 0;
        shots = 0;
        hit = 0;
        miss = 0;

        $(".score").text('Ваш счет: ' + score);
        $(".timer").text('Оставшееся время: ' + time);
        $(".selfkilled").text('Исчезнувшие фигуры: ' + selfkilled);

        $(".menu").css({ display: 'none' });
        $(".scene").fadeIn(400);
        $(".st-form").fadeOut(0);

        DrawFigures();

    });

    function ClearParameters() {
        $(".st-mode").css({ display: 'none' });
        $(".st-timer").css({ display: 'none' });
        $(".st-effect").css({ display: 'none' });
        $(".st-target").css({ display: 'none' });
        $(".st-crosshair").css({ display: 'none' });
    };

    $(".btn-settings").click(function () {
        $(".st-form").css('display') == 'none' ? $(".st-form").fadeIn(400) : $(".st-form").fadeOut(400);
        $(".st-form").css({ display: 'table' });
        ClearParameters();
    });

    $(".btn-st-mode").click(function () {
        ClearParameters();
        $(".st-mode").css('display') == 'none' ? $(".st-mode").fadeIn(400) : $(".st-mode").fadeOut(400);
    });

    $(".btn-st-timer").click(function () {
        ClearParameters();
        $(".st-timer").css('display') == 'none' ? $(".st-timer").fadeIn(400) : $(".st-timer").fadeOut(400);
    });

    $(".btn-st-crosshair").click(function () {
        ClearParameters();
        $(".st-crosshair").css('display') == 'none' ? $(".st-crosshair").fadeIn(400) : $(".st-crosshair").fadeOut(400);
    });

    $(".btn-st-effect").click(function () {
        ClearParameters();
        $(".st-effect").css('display') == 'none' ? $(".st-effect").fadeIn(400) : $(".st-effect").fadeOut(400);
    });

    $(".btn-st-target").click(function () {
        ClearParameters();
        $(".st-target").css('display') == 'none' ? $(".st-target").fadeIn(400) : $(".st-target").fadeOut(400);
    });

    $(".btn-highscores").click(function () {
        console.log(2);
    });

    $('.field').click(function (event) {
        shots++;
        console.log(event.target.className);
        switch (event.target.className) {
            case 'circle':
                event.target.remove();
                score++;
                hit++;
                $(".score").text('Ваш счет: ' + score);
                break;
            case 'square':
                event.target.remove();
                score++;
                hit++;
                $(".score").text('Ваш счет: ' + score);
                break;
            case 'triangle':
                event.target.remove();
                score++;
                hit++;
                $(".score").text('Ваш счет: ' + score);
                break;
        }
    });

    $("#timer").on("input", function (event) {
        if (event.originalEvent.data !== null) {
            if (event.originalEvent.data.match(/^\d+$/)) {
                time = $("#timer").val();
            } else {
                $("#timer").val(time);
            }
        }
    });
});

class Figure {
    side;
    color;
    coordinateX;
    coordinateY;
    info;
    id;

    constructor(type, side, color, coordinateX, coordinateY, id) {
        this.side = side;
        this.color = color;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.id = id;
        switch (type) {
            case 'square':
                this.info = $('<div>').addClass('square').attr("id", this.id).css({
                    'background-color': this.color,
                    'position': 'absolute',
                    'top': this.coordinateY + 'px',
                    'left': this.coordinateX + 'px',
                    'width': this.side,
                    'height': this.side,
                });
                break;
            case 'circle':
                this.info = $('<div>').addClass('circle').attr("id", this.id).css({
                    'background-color': this.color,
                    'position': 'absolute',
                    'top': this.coordinateY + 'px',
                    'left': this.coordinateX + 'px',
                    'width': this.side,
                    'height': this.side,
                    'border-radius': '50%',
                });
                break;
            case 'triangle':
                this.info = $('<div>').addClass('triangle').attr("id", this.id).css({
                    'background-color': this.color,
                    'position': 'absolute',
                    'top': this.coordinateY + 'px',
                    'left': this.coordinateX + 'px',
                    'width': this.side,
                    'height': this.side,
                    'clip-path': 'polygon(50% 0, 100% 100%, 0 100%)',
                });
                break;
        }
    }

    show() { $(".field").append(this.info); };

    move() {
        let coordinateX = function () {
            let min = $(".field").offset().left + this.side;
            let max = Number($(".field").css('width').replace("px", "")) - this.side;
            return (random(min, max));
        }.bind(this);

        let coordinateY = function () {
            let min = $(".field").offset().top + this.side;
            let max = $(".field").offset().top + Number($(".field   ").css('height').replace("px", "")) - this.side;
            return (random(min, max));
        }.bind(this);

        let speed = function () {
            if ($('input[name="speed"]:checked').val() == 1) { return 25; }
            if ($('input[name="speed"]:checked').val() == 2) { return 35; }
            if ($('input[name="speed"]:checked').val() == 3) { return 40; }
        };

        let move = setInterval(function () {
            let newX = coordinateX();
            let newY = coordinateY();
            let pathX = Math.abs(newX - this.coordinateX);
            let pathY = Math.abs(newY - this.coordinateY);
            let path = Math.sqrt(Math.pow(pathX, 2) + Math.pow(pathY, 2));
            let time = path / speed();
            this.coordinateX = newX;
            this.coordinateY = newY;

            if (this.info.css("opacity") <= 0) {
                clearInterval(move);
                if (document.getElementById(this.id)) {
                    $("#" + this.id).remove();
                    selfkilled++;
                    $(".selfkilled").text('Исчезнувшие фигуры: ' + selfkilled);
                }
                figuresID.push(this.id);
            } else {
                this.info.animate({
                    left: newX,
                    top: newY,
                    opacity: '-=0.2'
                }, time * 100);
            }
        }.bind(this));
    };
}