function getRandomInt(max) {
    var result = Math.floor(Math.random() * max);
    if (result < 1) result = 1;
    return result;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function shuffleAnswers(index) {
    let currentIndex = DATA[index].answers.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [DATA[index].answers[currentIndex], DATA[index].answers[randomIndex]] = [DATA[index].answers[randomIndex], DATA[index].answers[currentIndex]];
        [DATA[index].rightAnswers[currentIndex], DATA[index].rightAnswers[randomIndex]] = [DATA[index].rightAnswers[randomIndex], DATA[index].rightAnswers[currentIndex]];
    }   
}

var DATA = [
    {
        question:'Причиной землетрясений может стать',
        answers:[
            'Волновые колебания в скальных породах',
            'Сдвиг в скальных породах земной коры, разлом, вдоль которого один скальный массив с огромной силой трется о другой',
            'Строительство очистных сооружений в зонах тектонических разломов',
            'Обрушение подземных полостей горных выработок'
        ],
        rightAnswers:['0','1','1','0'],
        correctValue:[],
        type: "checkbox"
    },
    {
        question:'Наибольшую опасность при извержении вулкана представляют',
        answers:[
            'Тучи пепла и газов («палящая туча»)',
            'Взрывная волна и разброс обломков',
            'Водяные грязекаменные потоки',
            'Резкие колебания температуры'
        ],
        rightAnswers:['1','0','0','0'],
        correctValue:[],
        type: "radio"
    },
    {
        question:'Одна из причин образования оползней',
        answers:[
            'Вода, просочившаяся по трещинам и порам в глубь пород и ведущая там разрушительную работу',
            'Вулканическая деятельность',
            'Сдвиг горных пород',
            'Нарушение равновесия между сдвигающей силой тяжести и удерживающими силами'
        ],
        rightAnswers:['1','0','0','0'],
        correctValue:[],
        type: "radio"
    },
    {
        question:'Сильный маломасштабный атмосферный вихрь диаметром до 1000 м, в котором воздух вращается со скоростью до 100 м/с',
        answers:[''],
        rightAnswers:['1'],
        correctValue: ['Смерч', 'смерч'],
        type: "textbox"
    },
    {
        question:'Одним из последствий наводнения является',
        answers:[
            'Взрывы промышленных объектов в результате действия волны прорыва',
            'Нарушение сельскохозяйственной деятельности и гибель урожая',
            'Возникновение местных пожаров',
            'Изменение климата'
        ],
        rightAnswers:['0','1','0','0'],
        correctValue:[],
        type: "checkbox"
    },
    {
        question:'Неконтролируемое горение растительности, стихийно распространяющееся по  лесной территории, - это',
        answers:[''],
        rightAnswers:['1'],
        correctValue: ['Лесной пожар','лесной пожар'],
        type: "textbox"
    },
    {
        question:'К поражающим факторам пожара относятся',
        answers:[
            'Интенсивное излучение гамма-лучей, поражающее людей',
            'Разрушение зданий и поражение людей за счет смещения поверхностных слоев земли',
            'Открытый огонь, токсичные продукты горения',
            'Образование облака зараженного воздуха'
        ],
        rightAnswers:['0','0','1','0'],
        correctValue:[],
        type: "select"
    },
    {
        question:'В каком из перечисленных примеров могут создаваться условия для возникновения процесса горения',
        answers:[
            'Бензин + кислород воздуха',
            'Ткань, смоченная в азотной кислоте  +  тлеющая сигарета',
            'Гранит + кислород воздуха + пламя горелки',
            'Брошенная тлеющая сигарета'
        ],
        rightAnswers:['0','1','0','0'],
        correctValue:[],
        type: "select"
    }
];

var personAnswers = [
    {answer: ['-']},
    {answer: ['-']},
    {answer: ['-']},
    {answer: ['-']},
    {answer: ['-']},
    {answer: ['-']},
    {answer: ['-']},
    {answer: ['-']}
];

var personPoints = ['0','0','0','0','0','0','0','0'];
var timeLeft = '';
var seconds = 60;
var currentQuestion = 1;

const Quiz = document.getElementById('quiz');
const Timer = document.getElementById('timer');
const TimerSetting = document.getElementById('timerSetting');
const Question = document.getElementById('QuestionPlace');
const QuestionSetting = document.getElementById('mixQueSetting');
const Answer = document.getElementById('AnswersPlace');
const AnswerSetting = document.getElementById('mixAnsSetting');
const Table = document.getElementById('table');
const BtnStart = document.getElementById('btnStart');
const BtnEnd = document.getElementById('btnEnd');

const fillCorrect = () => {
    for(let i = 0; i < DATA.length; i++){
        for(let j = 0; j < DATA[i].rightAnswers.length; j++){
            if(DATA[i].type != 'textbox'){
                if(DATA[i].rightAnswers[j] == '1') DATA[i].correctValue.push(j+1) ;
            }
        }
    }
}

const emptyCorrect = () => {
    for(let i = 0; i < DATA.length; i++){
        if(DATA[i].type != 'textbox') DATA[i].correctValue = [];
    }
}

const enableChooseBtns = () => {
    for (let i = 1; i < DATA.length+1; i++){
        var BtnChooseQuestion = document.getElementById('chooseQuestion' + i);
        BtnChooseQuestion.disabled = false;
        BtnChooseQuestion.style.background = 'gray';
    }
};

const mixQuestions = () => {
    shuffle(DATA);
};

const mixAnswers = () => {
    for(let i = 0; i < DATA.length; i++){
        shuffleAnswers(i);
    }
};

const displayQuestion = (index) => {
    Question.innerHTML = `
        ${DATA[index].question}
    `;
    if(personAnswers[index].answer == '-'){
        document.getElementById('chooseQuestion' + (index+1)).style.background = 'red';
    }
};

const displayAnswer = (index) => {
    if(DATA[index].type == "checkbox"){
        let temp = '';
        for(let i = 0; i < DATA[index].answers.length; i++) {
            let count = 0;
            for(let j = 0; j < personAnswers[index].answer.length; j++){
                if((i+1) == personAnswers[index].answer[j]){
                    count = 1;
                    break;
                }
            }
            if(count){
                temp += `<label><input class="answerInput" type=checkbox name="${index}" value="${i+1}" checked>${DATA[index].answers[i]}</label><br>`;
            }else{
                temp += `<label><input class="answerInput" type=checkbox name="${index}" value="${i+1}">${DATA[index].answers[i]}</label><br>`;
            }
        }
        Answer.innerHTML = temp;
    }
    if(DATA[index].type == "radio"){
        let temp = '';
        for(let i = 0; i < DATA[index].answers.length; i++) {
            if((i+1) == personAnswers[index].answer){
                temp += `<label><input class="answerInput" type=radio name="${index}" value="${i+1}" checked>${DATA[index].answers[i]}</label><br>`;
            }else{
                temp += `<label><input class="answerInput" type=radio name="${index}" value="${i+1}">${DATA[index].answers[i]}</label><br>`;
            }
        }
        Answer.innerHTML = temp;
    }
    if(DATA[index].type == "textbox"){
        if(personAnswers[index].answer != '-'){
            Answer.innerHTML = `<input type=textbox class="answerInput" name="${index}" value="${personAnswers[index].answer}"></input>`;
        }else{
            Answer.innerHTML = `<input type=textbox class="answerInput" name="${index}" value=""></input>`;
        }
    }
    if(DATA[index].type == "select"){
        let temp = '';
        for(let i=0; i<DATA[index].answers.length; i++){
            if(personAnswers[index].answer == (i+1)){
                temp += `<option value="${i+1}" selected>${DATA[index].answers[i]}</option>`;
            }else{
                temp += `<option value="${i+1}">${DATA[index].answers[i]}</option>`;
            }
        }
        Answer.innerHTML = `
            <select class="answerInput" name="${index}" value="">
                <option value="0" disabled selected>Выберите ответ</option>
        ` + temp + `</select>`;
        //Answer.innerHTML += temp + `</select>`;
    }
};

const displayDisabledAnswers = (index) => {
    if(DATA[index].type == "checkbox"){
        let temp = '';
        for(let i = 0; i < DATA[index].answers.length; i++) {
            let count = 0;
            for(let j = 0; j < personAnswers[index].answer.length; j++){
                if((i+1) == personAnswers[index].answer[j]){
                    count = 1;
                    break;
                }
            }
            if(count){
                temp += `<label><input class="answerInput" type=checkbox name="${index}" value="${i+1}" checked disabled>${DATA[index].answers[i]}</label><br>`;
            }else{
                temp += `<label><input class="answerInput" type=checkbox name="${index}" value="${i+1}" disabled>${DATA[index].answers[i]}</label><br>`;
            }
        }
        Answer.innerHTML = temp;
    }
    if(DATA[index].type == "radio"){
        let temp = '';
        for(let i = 0; i < DATA[index].answers.length; i++) {
            if((i+1) == personAnswers[index].answer){
                temp += `<label><input class="answerInput" type=radio name="${index}" value="${i+1}" checked disabled>${DATA[index].answers[i]}</label><br>`;
            }else{
                temp += `<label><input class="answerInput" type=radio name="${index}" value="${i+1}" disabled>${DATA[index].answers[i]}</label><br>`;
            }
        }
        Answer.innerHTML = temp;
    }
    if(DATA[index].type == "textbox"){
        if(personAnswers[index].answer != '-'){
            Answer.innerHTML = `<input type=textbox class="answerInput" name="${index}" value="${personAnswers[index].answer}" disabled></input>`;
        }else{
            Answer.innerHTML = `<input type=textbox class="answerInput" name="${index}" value="" disabled></input>`;
        }
    }
    if(DATA[index].type == "select"){
        let temp = '';
        for(let i=0; i<DATA[index].answers.length; i++){
            if(personAnswers[index].answer == (i+1)){
                temp += `<option value="${i+1}" selected disabled>${DATA[index].answers[i]}</option>`;
            }else{
                temp += `<option value="${i+1}" disabled>${DATA[index].answers[i]}</option>`;
            }
        }
        Answer.innerHTML = `<select class="answerInput" name="${index}" value="${DATA[index].answers[index]}" disabled>` + temp + `</select>`;
    }
};

const displayResultsTable = () => {
    var temp;
    temp = `
        <table border="4" class="table">
        <col class="column-one">
        <col class="column-two">
        <col class="column-three">
        <col class="column-four">
        <col class="column-five">
            <th>Номер вопроса</th>
            <th>Вопрос</th>
            <th>Ваш ответ</th>
            <th>Правильный ответ</th>
            <th>Балл за ответ</th>
    `;
    for(let i = 0; i < DATA.length; i++) {
        temp += `
            <tr id="tr-${i+1}">
                <th>${i+1}</th>
                <th id="question${i+1}">${DATA[i].question}</th>
                <th>${personAnswers[i].answer}</th>
                <th>${DATA[i].correctValue}</th>
                <th>${personPoints[i]}</th>
            </tr>
        `;
        if(i == DATA.length - 1){
            temp += `</table>`;
        }
    }
    Table.innerHTML = temp;
};

const underlineQuestions = () => {
    for(let i = 0; i < DATA.length; i++) {
        //var temp = 'question' + `${i+1}`;
        var temp1 = 'chooseQuestion' + `${i+1}`;
        var temp2 = 'tr-' + `${i+1}`;
        //personPoints[i] == 1 ? document.getElementById(temp).id = 'rightAnswer' : document.getElementById(temp).id = 'wrongAnswer';
        personPoints[i] == 1 ? document.getElementById(temp1).style.background = 'green' : document.getElementById(temp1).style.background = 'red';
        personPoints[i] == 1 ? document.getElementById(temp2).style.background = 'green' : document.getElementById(temp2).style.background = 'red';
    }
};

const checkAnswers = () => {
    for(let i = 0; i < DATA.length; i++) {
        let temp1 = 0;
        let temp2 = 0;
        for(let j = 0; j < DATA[i].correctValue.length; j++) {
            for(let k = 0; k < personAnswers.length; k++) {
                if(personAnswers[i].answer[k] == DATA[i].correctValue[j]) {temp1++;}
            }
        }
        for(let j = 0; j < DATA[i].rightAnswers?.length; j++){
            if(DATA[i].rightAnswers[j] == "1"){temp2++;}
        }
        if(temp1 == temp2 && personAnswers[i].answer.length == temp2){personPoints[i] = 1;}
    }
};

Quiz.addEventListener('click', (event) =>{
    console.log(event);
    if(event.target.classList.contains('mixQuestions') && event.target.checked){mixQuestions();}

    if(event.target.classList.contains('mixAnswers') && event.target.checked){mixAnswers();}

    if(event.target.classList.contains('mixAnswers') && !event.target.checked){emptyCorrect();}

    if(event.target.classList.contains('chooseQuestion')){
        currentQuestion = event.target.innerHTML;
        if(personAnswers[event.target.innerHTML-1].answer == '-'){
            document.getElementById(event.target.id).style.background = 'red';
        }
        if(BtnEnd.disabled == false){
            displayQuestion(event.target.innerHTML-1);
            displayAnswer(event.target.innerHTML-1);
        }else{
            displayQuestion(event.target.innerHTML-1);
            displayDisabledAnswers(event.target.innerHTML-1);
        }
    }
    
    if(event.target.classList.contains('btn-start')){
        BtnStart.disabled = true;
        BtnEnd.disabled = false;
        TimerSetting.disabled = true;
        QuestionSetting.disabled = true;
        AnswerSetting.disabled = true;
        fillCorrect();
        enableChooseBtns();
        displayQuestion(0);
        displayAnswer(0);
        timer();
    }

    if(event.target.classList.contains('btn-end')){
        BtnStart.disabled = true;
        BtnEnd.disabled = true;
        timeLeft = 0;
        Timer.innerHTML = 'Таймер: ' + timeLeft;
    }
});

Quiz.addEventListener('change', (event) => {
    if(event.target.classList.contains('answerInput')){
        var placeValue = personAnswers[event.target.name].answer;
        console.log(event);
        if(event.target.type == "checkbox"){
            if(event.target.checked){
                placeValue[0] == '-' ? placeValue[0] = event.target.value : placeValue.push(event.target.value);
            }else{
                placeValue.pop(event.target.value);
            }
        }else{
            personAnswers[event.target.name].answer[0] = event.target.value;
        }
        if(personAnswers[event.target.name].answer == ''){
            document.getElementById('chooseQuestion' + (Number(event.target.name) + 1)).style.background = 'red';
        }else{
            document.getElementById('chooseQuestion' + (Number(event.target.name) + 1)).style.background = 'green';
        }
    }
});

Quiz.addEventListener('input', (event) => {
    if(event.target.classList.contains('setTimer')){
        //console.log(parseInt(event.data)); // number
        if(!isNaN(parseInt(event.data))){
            //console.log(parseInt(event.data));
            timeLeft += event.data;
            Timer.innerHTML = 'Таймер: ' + timeLeft + ' минут(а)';
            BtnStart.disabled = false;
        }else{
            TimerSetting.value = timeLeft;
        }
    }
});


function timer(){
    let timer = setInterval(function() {
        if (timeLeft <= 0) {
            BtnStart.disabled = true;
            BtnEnd.disabled = true;
            clearInterval(timer);
            checkAnswers();
            displayDisabledAnswers(currentQuestion-1);
            displayResultsTable();
            underlineQuestions();
        } else {
            --seconds;
            Timer.innerHTML = 'Таймер: ' + (timeLeft-1) + ' минут(а) и ' + seconds + ' секунд(ы)';
            if(seconds == 0){
                --timeLeft;
                seconds = 60;
            }
        }
    }, 1000);
};
