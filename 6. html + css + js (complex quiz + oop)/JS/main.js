const Quiz = document.getElementById('quiz');
const Timer = document.getElementById('timer');
const TimerSetting = document.getElementById('timerSetting');
const QuestionP = document.getElementById('QuestionPlace');
const QuestionSetting = document.getElementById('mixQueSetting');
const AnswerP = document.getElementById('AnswersPlace');
const AnswerSetting = document.getElementById('mixAnsSetting');
const Table = document.getElementById('table');
const BtnStart = document.getElementById('btnStart');
const BtnEnd = document.getElementById('btnEnd');

timeLeft = '';
seconds = 60;
currentQuestion = 1;

var TestInformation = 
[
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

class Test{
    questionsArray = []; // массив вопросов теста
    answersArray = []; // массив ответов на вопросы теста
    personAnswersArray = []; // массив ответов пользователя
    personPointArray = []; // массив баллов пользователя

    constructor(){
        for(let i = 0; i < TestInformation.length; i++) {
            this.questionsArray[i] = new Question(TestInformation[i]);
            this.answersArray[i] = new Answer(i+1, TestInformation[i]);
            this.personAnswersArray[i] = ['-'];
        }
    }

    shuffleQuestions(){
        let currentIndex = this.questionsArray.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.questionsArray[currentIndex], this.questionsArray[randomIndex]] = [this.questionsArray[randomIndex], this.questionsArray[currentIndex]];
            [this.answersArray[currentIndex], this.answersArray[randomIndex]] = [this.answersArray[randomIndex], this.answersArray[currentIndex]];
            [this.answersArray[currentIndex].id, this.answersArray[randomIndex].id] = [this.answersArray[randomIndex].id, this.answersArray[currentIndex].id];
        }
    }

    shuffleAnswers(){
        for(let i = 0; i < this.answersArray.length; i++){
            this.answersArray[i].shuffle();
        }
    }

    enableChooseBtns(){
        for (let i = 0; i < TestInformation.length; i++){
            let BtnChooseQuestion = document.getElementById('chooseQuestion' + (i+1));
            BtnChooseQuestion.disabled = false;
            BtnChooseQuestion.style.background = 'gray';
        }
    }

    changeButtonColor(index){
        if(this.personAnswersArray[index] == '-'){
            document.getElementById('chooseQuestion' + (index+1)).style.background = 'red';
        }else{
            document.getElementById('chooseQuestion' + (index+1)).style.background = 'green';
        }
    }

    underlineQuestions(){
        for(let i = 0; i < TestInformation.length; i++) {
            //var temp = 'question' + `${i+1}`;
            var temp1 = 'chooseQuestion' + `${i+1}`;
            var temp2 = 'tr-' + `${i+1}`;
            //this.personPointArray[i] == 1 ? document.getElementById(temp).id = 'rightAnswer' : document.getElementById(temp).id = 'wrongAnswer';
            this.personPointArray[i] == 1 ? document.getElementById(temp1).style.background = 'green' : document.getElementById(temp1).style.background = 'red';
            this.personPointArray[i] == 1 ? document.getElementById(temp2).style.background = 'green' : document.getElementById(temp2).style.background = 'red';
        }
    }

    displayResultsTable(){
        let temp = `
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
        for(let i = 0; i < TestInformation.length; i++) {
            temp += `
                <tr id="tr-${i+1}">
                    <th>${i+1}</th>
                    <th id="question${i+1}">${this.questionsArray[i].meaning}</th>
                    <th>${this.personAnswersArray[i]}</th>
                    <th>${this.answersArray[i].intRightValue}</th>
                    <th>${this.personPointArray[i]}</th>
                </tr>
            `;
            if(i == TestInformation.length - 1){
                temp += `</table>`;
            }
        }
        Table.innerHTML = temp; 
    }

    fillCorrectValue(){
        for(let i = 0; i < this.answersArray.length; i++){
            for(let j = 0; j < this.answersArray[i].boolRightValue.length; j++){
                if(this.answersArray[i].type != 'textbox' && this.answersArray[i].boolRightValue[j] == '1'){this.answersArray[i].intRightValue.push(j+1);}
            }
        }
    }

    emptyCorrectValue(){
        for(let i = 0; i < this.answersArray.length; i++){
            if(this.answersArray[i].type != 'textbox') this.answersArray[i].intRightValue = [];
        }
    }

    checkAnswers(){
        for(let i = 0; i < TestInformation.length; i++) {
            let temp1 = 0;
            for(let j = 0; j < this.answersArray[i].intRightValue.length; j++) { // для каждого вопроса по верным ответам
                for(let k = 0; k < this.personAnswersArray[i].length; k++) { // для каждого вопроса по ответам пользователя
                    if(this.personAnswersArray[i][k] == this.answersArray[i].intRightValue[j]) {temp1++;}
                }
            }
            if(temp1 == this.personAnswersArray[i].length){this.personPointArray[i] = 1;}
            else{this.personPointArray[i] = 0;}
        }
    }
    
    startTimer(){
        let timer = setInterval(function() {
            if (timeLeft <= 0) {
                BtnStart.disabled = true;
                BtnEnd.disabled = true;
                clearInterval(timer);
                this.checkAnswers();
                this.answersArray[currentQuestion-1].displayDisabled(this.personAnswersArray[currentQuestion-1]);
                this.displayResultsTable();
                this.underlineQuestions();
            }else{
                --seconds;
                Timer.innerHTML = 'Таймер: ' + (timeLeft-1) + ' минут(а) и ' + seconds + ' секунд(ы)';
                if(seconds == 0){
                    --timeLeft;
                    seconds = 60;
                }
            }
        }.bind(this), 1000);
    }

    handleEvent(event){
        switch(event.type){
            case 'click':
                switch(event.target.classList.value){
                case 'mixQuestions':
                    if(event.target.checked){this.shuffleQuestions();}
                    break;
                case 'mixAnswers':
                    if(event.target.checked){this.shuffleAnswers();}
                    break;
                case 'chooseQuestion':
                    currentQuestion = event.target.innerHTML;
                    if(this.personAnswersArray[currentQuestion-1] == '-'){ 
                        document.getElementById(event.target.id).style.background = 'red';
                    }
                    if(BtnEnd.disabled == false){
                        this.questionsArray[currentQuestion-1].display();
                        this.answersArray[currentQuestion-1].display(this.personAnswersArray[currentQuestion-1]);
                    }else{
                        this.questionsArray[currentQuestion-1].display();
                        this.answersArray[currentQuestion-1].displayDisabled(this.personAnswersArray[currentQuestion-1]);
                    }
                    break;
                case 'btn-start':
                    BtnStart.disabled = true; // Кнопка старт недоступна
                    BtnEnd.disabled = false; // Кнопка завершения доступна
                    TimerSetting.disabled = true; // Нельзя изменить время таймера
                    QuestionSetting.disabled = true; // Нельзя перемешать вопросы
                    AnswerSetting.disabled = true; // Нельзя перемешать ответы
                    this.enableChooseBtns(); // Разблокированы кнопки перемещения по вопросам
                    this.questionsArray[0].display(); // Вывод первого вопроса
                    this.answersArray[0].display(this.personAnswersArray[0]); // Вывод ответов для первого вопроса
                    this.changeButtonColor(0); // Изменение цвета кнопки вопроса
                    this.startTimer(); // Запуск таймера
                    break;
                case 'btn-end': 
                    BtnEnd.disabled = true;
                    timeLeft = 0;
                    Timer.innerHTML = 'Таймер: ' + timeLeft;
                    break;
                }
                break;
            case 'change':
                if(event.target.classList.value == 'answerInput'){
                    if(event.target.type == 'checkbox'){
                        if(event.target.checked){
                            this.personAnswersArray[event.target.name - 1] == '-' ? this.personAnswersArray[event.target.name - 1] = [event.target.value] : this.personAnswersArray[event.target.name - 1].push(event.target.value);
                        }else{
                            this.personAnswersArray[event.target.name - 1].pop(event.target.value);
                            if(this.personAnswersArray[event.target.name - 1] == ''){this.personAnswersArray[event.target.name - 1].push('-');}
                        }
                    }else{
                        this.personAnswersArray[event.target.name - 1] = [event.target.value];
                    }
                    if(this.personAnswersArray[event.target.name - 1] == '-'){
                        document.getElementById('chooseQuestion' + (Number(event.target.name))).style.background = 'red';
                    }else{
                        document.getElementById('chooseQuestion' + (Number(event.target.name))).style.background = 'green';
                    }
                }
                break;
            case 'input':
                if(event.target.classList.value == 'setTimer'){
                    if(event.data.match(/^\d+$/)){
                        timeLeft += event.data;
                        Timer.innerHTML = 'Таймер: ' + timeLeft + ' минут(а)';
                        BtnStart.disabled = false;
                    }
                }
                break;
        }
    }
}

class Question{
    meaning; // формулировка вопроса

    constructor(informationArray){
        this.meaning = informationArray.question;
    }

    display(){
        QuestionP.innerHTML = `${this.meaning}`; 
    }
}

class Answer{
    id;
    type; // тип зависимости от вопроса
    meaning = []; // массив вариантов ответов
    boolRightValue = []; // массив верных значений ответов (логич)
    intRightValue = []; // массив верных значений ответов (цел)

    constructor(ansId, informationArray){
        this.id = ansId;
        this.type = informationArray.type;
        for(let i = 0; i < informationArray.answers.length; i++){
            this.meaning[i] = informationArray.answers[i];
            this.boolRightValue[i] = informationArray.rightAnswers[i];
            if(this.boolRightValue[i] == '1'){
                if(this.type == 'textbox'){
                    this.intRightValue = informationArray.correctValue;
                }else{
                    this.intRightValue.push(i+1);
                } 
            }
        }
    }

    shuffle(){
        let currentIndex = this.meaning.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.meaning[currentIndex], this.meaning[randomIndex]] = [this.meaning[randomIndex], this.meaning[currentIndex]];
            [this.boolRightValue[currentIndex], this.boolRightValue[randomIndex]] = [this.boolRightValue[randomIndex], this.boolRightValue[currentIndex]];
        }
        if(this.type != 'textbox'){
            this.intRightValue = [];
                for(let i = 0; i < this.meaning.length; i++) {
                if(this.boolRightValue[i] == '1'){
                    this.intRightValue.push(i+1);
                }
            }
        }
    }

    display(personAnswers){
        let temp = '';
        switch(this.type){
            case 'checkbox':
                for(let i = 0; i < this.meaning.length; i++){
                    let count;
                    for(let j = 0; j < personAnswers.length; j++){
                        if((i+1) == personAnswers[j]){
                            count = 1;
                            break;
                        }
                    }
                    if(count){
                        temp += `<label><input class="answerInput" type=checkbox name="${this.id}" value="${i+1}" checked>${this.meaning[i]}</label><br>`;
                    }else{
                        temp += `<label><input class="answerInput" type=checkbox name="${this.id}" value="${i+1}">${this.meaning[i]}</label><br>`;
                    }
                }
                AnswerP.innerHTML = temp;
                break;
            case 'radio':
                for(let i = 0; i < this.meaning.length; i++) {
                    if((i+1) == personAnswers){
                        temp += `<label><input class="answerInput" type=radio name="${this.id}" value="${i+1}" checked>${this.meaning[i]}</label><br>`;
                    }else{
                        temp += `<label><input class="answerInput" type=radio name="${this.id}" value="${i+1}">${this.meaning[i]}</label><br>`;
                    }
                }
                AnswerP.innerHTML = temp;
                break;
            case 'textbox':
                if(personAnswers != '-'){
                    AnswerP.innerHTML = `<input type=textbox class="answerInput" name="${this.id}" value="${personAnswers}"></input>`;
                }else{
                    AnswerP.innerHTML = `<input type=textbox class="answerInput" name="${this.id}" value=""></input>`;
                }
                break;
            case 'select':
                for(let i = 0; i < this.meaning.length; i++){
                    if(personAnswers == (i+1)){
                        temp += `<option value="${i+1}" selected>${this.meaning[i]}</option>`;
                    }else{
                        temp += `<option value="${i+1}">${this.meaning[i]}</option>`;
                    }
                }
                AnswerP.innerHTML = `
                    <select class="answerInput" name="${this.id}">
                        <option value="0" disabled selected>Выберите ответ</option>
                ` + temp + `</select>`;
                break;
        }
    }

    displayDisabled(personAnswers){
        let temp = '';
        switch(this.type){
            case 'checkbox':
                for(let i = 0; i < this.meaning.length; i++){
                    let count;
                    for(let j = 0; j < personAnswers.length; j++){
                        if((i+1) == personAnswers[j]){
                            count = 1;
                            break;
                        }
                    }
                    if(count){
                        temp += `<label><input class="answerInput" type=checkbox name="${this.id}" value="${i+1}" checked disabled>${this.meaning[i]}</label><br>`;
                    }else{
                        temp += `<label><input class="answerInput" type=checkbox name="${this.id}" value="${i+1}" disabled>${this.meaning[i]}</label><br>`;
                    }
                }
                AnswerP.innerHTML = temp;
                break;
            case 'radio':
                for(let i = 0; i < this.meaning.length; i++) {
                    if((i+1) == personAnswers){
                        temp += `<label><input class="answerInput" type=radio name="${this.id}" value="${i+1}" checked disabled>${this.meaning[i]}</label><br>`;
                    }else{
                        temp += `<label><input class="answerInput" type=radio name="${this.id}" value="${i+1}" disabled>${this.meaning[i]}</label><br>`;
                    }
                }
                AnswerP.innerHTML = temp;
                break;
            case 'textbox':
                if(personAnswers != '-'){
                    AnswerP.innerHTML = `<input type=textbox class="answerInput" name="${this.id}" value="${personAnswers}" disabled></input>`;
                }else{
                    AnswerP.innerHTML = `<input type=textbox class="answerInput" name="${this.id}" value="" disabled></input>`;
                }
                break;
            case 'select':
                for(let i = 0; i < this.meaning.length; i++){
                    if(personAnswers == (i+1)){
                        temp += `<option value="${i+1}" selected disabled>${this.meaning[i]}</option>`;
                    }else{
                        temp += `<option value="${i+1}" disabled>${this.meaning[i]}</option>`;
                    }
                }
                AnswerP.innerHTML = `<select class="answerInput" name="${this.id}" value="" disabled>` + temp + `</select>`;
                break;
        }
    }
}

const MyTest = new Test();

Quiz.addEventListener('click', MyTest);
Quiz.addEventListener('change',MyTest);
Quiz.addEventListener('input', MyTest);