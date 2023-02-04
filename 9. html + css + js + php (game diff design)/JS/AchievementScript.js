$(document).ready(function() {
    $("body").css("opacity", "1");

    

    $('#btn-return').on('click', function (event) {
        $("body").css("opacity", "0");
        setTimeout(() => document.location = `../HTML/Menu.html`, 500);
    });
});