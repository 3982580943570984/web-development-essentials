function getRandomInt(max) {
    var result = Math.floor(Math.random() * max);
    if (result < 1) result = 1;
    return result;
}

function placeResult(cellName,resultValue){
    document.getElementById(cellName).innerHTML = resultValue;
}

function clearResults(){
    document.getElementById("playerFirstShot").innerHTML = 0;
    document.getElementById("playerSecondShot").innerHTML = 0;
    document.getElementById("compFirstShot").innerHTML = 0;
    document.getElementById("compSecondShot").innerHTML = 0;
    document.getElementById("playerSummary").innerHTML = 0;
    document.getElementById("compSummary").innerHTML = 0;
}

function decideWinner(playerSummary, compSummary){
    var resultCell = document.getElementById("result");
    var playerWinScore = document.getElementById("playerWin");
    var playerLoseScore = document.getElementById("playerLose");
    var compWinScore = document.getElementById("compWin");
    var compLoseScore = document.getElementById("compLose");

    if(playerSummary > compSummary){
        resultCell.innerHTML = "Вы победили!";
        playerWinScore.innerHTML = (playerWinScore.innerHTML - 0) + 1;
        compLoseScore.innerHTML = (compLoseScore.innerHTML - 0) + 1;
        return;
    }else if(playerSummary == compSummary){
        resultCell.innerHTML = "Ничья!";
        return;
    }else if(playerSummary < compSummary){
        resultCell.innerHTML = "Вы проиграли!";
        playerLoseScore.innerHTML = (playerLoseScore.innerHTML - 0) + 1;
        compWinScore.innerHTML = (compWinScore.innerHTML - 0) + 1;
        return;
    }
}

function displayResults() {
    var playerResult1 = getRandomInt(7);
    var playerResult2 = getRandomInt(7);
    var compResult1 = getRandomInt(7);
    var compResult2 = getRandomInt(7);

    document.getElementById("result").innerHTML = "Выполняются броски...";

    setTimeout(placeResult, 1000, "playerFirstShot", playerResult1);
    setTimeout(placeResult, 2000, "playerSecondShot", playerResult2);
    setTimeout(placeResult, 3000, "compFirstShot", compResult1);
    setTimeout(placeResult, 4000, "compSecondShot", compResult2);
    setTimeout(placeResult, 2000, "playerSummary", (playerResult1 + playerResult2));
    setTimeout(placeResult, 4000, "compSummary", (compResult1 + compResult2));
    setTimeout(decideWinner, 4000, (playerResult1 + playerResult2), (compResult1 + compResult2));
}

/*
    if((playerResult1 + playerResult2) > (compResult1 + compResult2)){
        resultCell.innerHTML = "Вы победили!";
        playerWinScore.innerHTML = (playerWinScore.innerHTML - 0) + 1;
        compLoseScore.innerHTML = (compLoseScore.innerHTML - 0) + 1;
        return;
    }else if((playerResult1 + playerResult2) == (compResult1 + compResult2)){
        resultCell.innerHTML = "Ничья!";
        return;
    }else if((playerResult1 + playerResult2) < (compResult1 + compResult2)){
        resultCell.innerHTML = "Вы проиграли!";
        playerLoseScore.innerHTML = (playerLoseScore.innerHTML - 0) + 1;
        compWinScore.innerHTML = (compWinScore.innerHTML - 0) + 1;
        return;
    }
*/

/*
    tmp1 +='<th width="50%">Человек</th><th width="50%">Компьютер</th>';
    tmp1 += '<tr id="newRow"></tr>'
    tmp1 += '<th width="50%" id="firstColumn"></th> <th width="50%" id="secondColumn"></th>';
    tmp1 +='<table align="center" id="pos">';
    tmp1 +='<tr><th id="result"></th></tr>';
    tmp1 +='</table> </table>';
*/

/*
    function writeRow() {
        var row = document.getElementById('newRow');
        var tmp1 = '<tr></tr>';
        tmp1 += '<th width="50%" id="firstColumn"></th> <th width="50%" id="secondColumn"></th>';
        row.innerHTML += tmp1;
        //document.body.insertBefore(tmp1, row);
    }
*/

/*
    &nbsp - неразрывный пробел (спецсимвол)
    <td></td> - создает ячейку таблицы
    <tr></tr> - создает строку таблицы
    <th></th> - создает одну ячейку таблицы
    cell - ячейка
    cellspacing - расстояние между внешними границами ячейки
    cellpading - расстояние между границей ячейки и ее содержимым
    border - граница таблицы
*/