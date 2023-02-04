$(document).ready(function () {
    $("body").css("opacity", "1");

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

    $.ajax({
        type: "POST",
        url: "../PHP/ShopRequest.php",
        data: {
            type: 'player-info',
        },
        success: function (result) {
            if(result.success) {
                $('#player-currency').text(result.name + ', your currency amount: ' + result.currency + ' 💰');
            }
        }
    });

    $('#balloon-category').on('click', function (event) {
        $.ajax({
            type: "POST",
            url: "../PHP/ShopRequest.php",
            data: {
                type: 'balloon-category'
            },
            success: function (result) {
                $('#cloud-section').css('display', 'none');
                $('#background-section').css('display', 'none');

                let result_string = ``;
                for (balloon in result) {
                    result_string += `
                        <tr>
                            <td class="image" style="background-image: url(${result[balloon].image});"></td>
                            <td class="info">
                                <div>${result[balloon].name}</div>
                                <div>Price: ${result[balloon].price} 💰</div>
                                <p></p>
                                <button>Buy</button>
                            </td>
                        </tr>
                    `;
                }

                $('#balloon-section').html(result_string);
                $('#balloon-section').slideToggle('slow');
            }
        })
    });

    $('#cloud-category').on('click', function (event) {
        $('#balloon-section').css('display', 'none');
        $('#background-section').css('display', 'none');
        $('#cloud-section').slideToggle('slow');
    });

    $('#background-category').on('click', function (event) {
        $('#cloud-section').css('display', 'none');
        $('#balloon-section').css('display', 'none');
        $('#background-section').slideToggle('slow');
    });

    $('#btn-return').on('click', function (event) {
        $("body").css("opacity", "0");
        setTimeout(() => document.location = `../HTML/Menu.html`, 500);
    });
})