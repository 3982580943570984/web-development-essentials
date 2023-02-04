$(document).ready(function () {
    $("body").css("opacity", "1");

    $.ajax({
        type: "POST",
        url: "../PHP/LeaderboardRequest.php",
        data: {
            type: 'leaderboard'
        },

        success: function (result) {
            for (place in result) {
                $('#leaderboard').append(`
                    <tr>
                        <td>${place}</td>
                        <td>${result[place].name}</td>
                        <td>${result[place].real_name}</td>
                        <td>${result[place].age}</td>
                        <td>${result[place].max_score}</td>
                        <td>${result[place].max_time_alive}</td>
                    </tr>
                `);
            }
        }
    });

    $('#btn-return').on('click', function (event) {
        $("body").css("opacity", "0");
        setTimeout(() => document.location = `../HTML/Menu.html`, 500);
    });

});