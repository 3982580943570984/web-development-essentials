function checkAnswers(){
    var trueAnswers = 0;
    var finalResult = '';
    var question = '';
    var right = '';
    var questionsForm = document.forms.questions;
    for(var i = 1; i < 11; ++i){
        question = 'question' + `${i}`;
        right = 'right_q' + `${i}`;

        switch(i){
            case 1:
                var rright = right + `${1}`;
                if(questionsForm[right].checked == 1 && questionsForm[rright].checked == 1) { 
                    trueAnswers += 1;
                    document.getElementById(question).id = 'rightAnswer';
                }else {
                    document.getElementById(question).id = 'wrongAnswer';
                }
                break;
            case 4:
                if(questionsForm[right].value == 'Смерч') { 
                    trueAnswers += 1;
                    document.getElementById(question).id = 'rightAnswer';
                }else {
                    document.getElementById(question).id = 'wrongAnswer';
                }
                break;
            case 6:
                if(questionsForm[right].value == 'Лесной пожар') { 
                    trueAnswers += 1;
                    document.getElementById(question).id = 'rightAnswer';
                }else {
                    document.getElementById(question).id = 'wrongAnswer';
                }
                break;
            case 7:
                if(questionsForm[right].value == 3) { 
                    trueAnswers += 1;
                    document.getElementById(question).id = 'rightAnswer';
                }else {
                    document.getElementById(question).id = 'wrongAnswer';
                }
                break;
            case 9:
                if(questionsForm[right].value == 2 || questionsForm[right].value == 4) { 
                    trueAnswers += 1;
                    document.getElementById(question).id = 'rightAnswer';
                }else {
                    document.getElementById(question).id = 'wrongAnswer';
                }
                break;
            default:
                if(questionsForm[right].checked == 1) { 
                    trueAnswers += 1;
                    document.getElementById(question).id = 'rightAnswer';
                }else {
                    document.getElementById(question).id = 'wrongAnswer';
                }
                break;
        }
    }

    if(trueAnswers <= 4) finalResult = '2';
    else if(trueAnswers == 5 || trueAnswers == 6) finalResult = '3';
    else if(trueAnswers == 7 || trueAnswers == 8) finalResult = '4';
    else if(trueAnswers > 8) finalResult = '5';

    alert("Верных ответов: " + trueAnswers + "   " + "Неверных ответов: " + (10-trueAnswers) + "\n" + "Ваша оценка: " + finalResult);
}
