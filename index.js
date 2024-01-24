let startbtn = document.querySelector(".start");
let formcontainer = document.querySelector(".tag");
const URL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple";
let Currentindex = 0;
let next = document.querySelector(".next");
let quit = document.querySelector(".quit");
let questioncontianer = document.querySelector(".main");
let buttoncontainer = document.querySelector(".btncontainer");
let Quizcontainer = document.querySelector(".quizContainer")
let nav = document.querySelector(".nav");
let optioncontainer = document.querySelector(".optioncontainer");
const getdata =  async (url) =>{
    try{
        const {data : {results},} = await axios.get(url);
        return results;
    }catch(err){
        console.log("Error ", err); 
    }
}
let list = document.querySelectorAll(".contianer");

let quizzes = [];
let getquizzes = async () =>{
    quizzes = await getdata(URL);
    
}
getquizzes()
let int = 0;
let score = document.createElement("span");
function createquizzapp(quizz,index){
    console.log(quizz)
    let head = document.createElement("span");

    head.innerText = `Q${index+1}/10`;

    let question = document.createElement("p");
    question.classList.add("question","font");
    question.innerText = quizz[index].question
    Quizcontainer.appendChild(question);

    
    score.classList.add("score");
    score.innerText = `Score: ${int}`;
    let options=[ quizz[index].correct_answer, ...quizz[index].incorrect_answers].sort(()=>Math.random()-0.5);
    
    for(let i=0; i<options.length;i++){
        
        let button = document.createElement("button");
        button.setAttribute("type","button")
        button.classList.add("option","font")
        button.setAttribute("name",options[i]);
        button.innerText = options[i];
        list[i].appendChild(button);
    }
    let quit = document.createElement("button");
    quit.setAttribute("type","button")
    quit.classList.add("quit");
    quit.innerText = "Quit";


   
    nav.appendChild(head);
    nav.appendChild(score)
    
    
    
}
function buttondisable(){
    document.querySelectorAll(".option").forEach((button)=>button.setAttribute("disabled",true));

}
setTimeout(() => createquizzapp(quizzes,Currentindex),4000);
optioncontainer.addEventListener("click",(e)=>{
    let str = e.target.name;
    if(str === quizzes[Currentindex].correct_answer){
        e.target.classList.add("correct");
        int++
        score.innerText = `Score: ${int}`;
        buttondisable()
    }else if(str !== quizzes[Currentindex].correct_answer){
        e.target.classList.add("incorrect");
        buttondisable()
    }
    

})


next.addEventListener("click",(e)=>{
    if(Currentindex < 9){
        console.log
        list.forEach(list=>list.innerHTML="");
        Currentindex++;
        nav.innerHTML="";
        Quizcontainer.innerHTML = "";
        createquizzapp(quizzes,Currentindex);
    }else{
        questioncontianer.innerHTML = "";
        let result = document.createElement("span");
        result.classList.add("font");
        if(int<5){
            result.innerText = `Score:  ${int}  \n You Should Practice More`;
        
            questioncontianer.appendChild(result);
        }else{
            result.innerText = `Score:  ${int} Ver Well`;
        
            questioncontianer.appendChild(result);

        }
        
    }
    
})
startbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    formcontainer.classList.add("hide");
    questioncontianer.classList.remove("hide");
    
})
quit.addEventListener("click",(e)=>{
    formcontainer.classList.remove("hide");
    questioncontianer.classList.add("hide");
    location.reload();
})