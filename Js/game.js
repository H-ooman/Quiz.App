import formatdata from "./helper.js";

const level = localStorage.getItem("level") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const qustiontext = document.getElementById("qustion-text");
const answeList = document.querySelectorAll(".answer-text");
const ScoreText = document.getElementById("Score");
const nextButtom = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNumber = document.getElementById("qustion-number");
const error = document.getElementById("error");
const URL = 
   `https://opentdb.com/api.php?amount=10&category=21&difficulty=${level}&type=multiple`;

let formatteddata = null;
let qustionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;
const CORROCT_BONUS = 10;

    const fetchData = async () => {
        try{
            const response = await fetch(URL);
            const json = await response.json();
            formatteddata = formatdata(json.results);
            console.log(json.results)
            start();
        }
        catch(err){
            loader.style.display = "none";
            error.style.display = "block"
        }
    }; 

    

    const start = () => {
       showQuestion();
        loader.style.display = "none";
        container.style.display = "block";
    };

    
const showQuestion = () => {
    questionNumber.innerText = qustionIndex + 1;
   const {question,answers,correctAnswerIndex} =
   formatteddata[qustionIndex];
   correctAnswer = correctAnswerIndex;
   qustiontext.innerText = question;
    answeList.forEach((button,index) =>{
        button.innerText = answers[index];
    });
};

const checkAnswers = (event,index) => {
    if(!isAccepted) return;
    isAccepted = false;
    const isCorroct = index === correctAnswer ? true : false;
    if(isCorroct){
        event.target.classList.add("correct");
        score += CORROCT_BONUS;
        ScoreText.innerText = score;
    }else{
        event.target.classList.add("incorrect");
        answeList[correctAnswer].classList.add("correct");
    }
};

const nextHandeler = () => {
    qustionIndex++;
    if(qustionIndex < formatteddata.length){
        isAccepted = true;
        showQuestion();
        removeClass();
    }else{
        finishHandeler();
    }
}

const removeClass = () => {
    answeList.forEach(button => button.className = "answer-text");
}
const finishHandeler = () =>{
    localStorage.setItem("score",JSON.stringify(score));
    window.location.assign("/end.html");
}

window.addEventListener("load",fetchData);
nextButtom.addEventListener("click",nextHandeler);
finishButton.addEventListener("click",finishHandeler);
answeList.forEach((button,index) => {
    button.addEventListener("click",(event) => checkAnswers(event,index));
});
