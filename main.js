 
//-----------------------Main start
   const elMenuBlock = document.querySelector(".js-menu");
   const elMenuBtn = document.querySelector(".js-menu-btn"); 

//-----------------------Menu form start 
   const elStartMenu = document.querySelector(".js-start-menu");
   const elForm = document.querySelector(".js-form");
   const elFormSelectComplex = elForm.querySelector(".js-complext-select");
   const elFormSelectTime = elForm.querySelector(".js-time-select");
   
//------------------------Department 
const elDepartment = document.querySelector(".js-department-menu");
const elScore = elDepartment.querySelector(".js-score");
const elAttempts = elDepartment.querySelector(".js-attempts");
const elTime = elDepartment.querySelector(".js-time");
const elDepartmentText = elDepartment.querySelector(".js-department-text");
const elDepartmentList = elDepartment.querySelector(".js-list");
const elDepartmenBtn = elDepartment.querySelector(".js-btn-box");

//-------------------------- Game
const elGameBox = document.querySelector(".js-game-box");
const elGameImg = elGameBox.querySelector(".js-game-img")
const elGameScore = elGameBox.querySelector(".js-game-score");
const elGameAttempts = elGameBox.querySelector(".js-game-attempts");
const elGameTime = elGameBox.querySelector(".js-game-time");
const elGameBtn = elGameBox.querySelector(".js-game-btn");

//-------------------------you 
const elYouBox = document.querySelector(".js-you-box");
const elYouScore = elYouBox.querySelector(".js-you-score");
const elYouAttempts = elYouBox.querySelector(".js-you-attempts");
const elYouTime = elYouBox.querySelector(".js-you-time");
const elYouBtn = elYouBox.querySelector(".js-you-btn");
 
  
   elMenuBtn.addEventListener("click", function(){ 

      elMenuBlock.classList.add("d-none")
      elStartMenu.classList.remove("d-none")
   }); 

   const randomArrey = [];
   const arryTextRandum = [];
   const newArrey = [];

  let num = 21;
  let time = 172800;
  let attempts = 5;
  let score = 0; 

  function funImgAdd(){
   elGameImg.classList.add("add-img");
  }; 

  function renderGameOver(newTime){
  
   setTimeout(funImgAdd, 2500)
   elMenuBtn.classList.add("d-none");
   elStartMenu.classList.add("d-none");
   elDepartment.classList.add("d-none");
   elGameBox.classList.remove("d-none");
   elGameScore.textContent = `Score: ${score}`;
   elGameAttempts.textContent = `Attempts: ${attempts}`;
   elGameTime.textContent = `${newTime}`;
  } 

  function WinYou(WinText){
   
   
   elMenuBtn.classList.add("d-none");
   elStartMenu.classList.add("d-none");
   elDepartment.classList.add("d-none");

   elYouBox.classList.remove("d-none");
   elYouScore.textContent = `Score: ${score}`;
   elYouAttempts.textContent = `Attempts: ${attempts}`;
   elYouTime.textContent = `${WinText}`;
} 


function dateTime(){
   if(time > 1000){
       elTime.innerHTML = `Осталось: 00:00`
   }
   else{
       let minuts = Math.floor(time / 60);
       let second = time % 60;

       if(time == 0){
           clearInterval(setIntervalId);
           renderGameOver("00:00");
       }
       
       if(minuts < 10){
           minuts = "0" + minuts
       }
       
       if(second < 10){
           second = "0" + second
       }
       elTime.innerHTML = `Осталось: ${minuts}:${second}`
       time--
   }
} 

let setIntervalId = setInterval(dateTime, 1000);

elScore.textContent = `Score: ${score}`
elAttempts.textContent = `Attempts: ${attempts}` 

function scoreAttemptrs(){
   elScore.textContent = `Score: ${score}`
   elAttempts.textContent = `Attempts: ${attempts}`
}

function randomElements(arrey){

   const randomArray = []

   for (let i = 0; i < num;){

       const newObj = arrey[Math.floor(Math.random()*arrey.length)]

       if(!randomArray.includes(newObj)){

           randomArray.push(newObj);
           i++
       }
   }
   return randomArray
}  
 
function rendumArryText(){

   if(arryTextRandum.length == 0){

       clearInterval(setIntervalId);   
       WinYou(elTime.innerHTML)
   }
   else{
       elDepartmentText.textContent = arryTextRandum[0].symbol_title;
   }
}

function newArrayRendum(){

   elDepartmentList.innerHTML = "";

   const cloneTemplate = document.querySelector(".js-template").content;
    const newFragment = document.createDocumentFragment();

   randomArrey.forEach((item, index)=> {

       const cloneItem = cloneTemplate.cloneNode(true);

       cloneItem.querySelector(".js-templet-btn").dataset.id = item.id;

       if(newArrey.includes(index)){

           cloneItem.querySelector(".js-templet-btn").classList.add("box-disabled");
       }

       cloneItem.querySelector(".js-images").dataset.id = item.id;
       cloneItem.querySelector(".js-images").src = item.symbol_img;
       cloneItem.querySelector(".js-images").alt = item.symbol_title;

       newFragment.appendChild(cloneItem);
   });

   elDepartmentList.appendChild(newFragment);
};

elForm.addEventListener("submit", function(evt){
   evt.preventDefault();

   num = elFormSelectComplex.value;

   if(elFormSelectComplex.value == "easy"){
       num = 21
   }
   else if(elFormSelectComplex.value == "medium"){
       num = 42
   }
   else if(elFormSelectComplex.value == "hard"){
       num = 63
   }

   if(elFormSelectTime.value == "3-min"){
       time = 180 
   }
   else if(elFormSelectTime.value == "8-min"){
       time = 480
   }
   else if(elFormSelectTime.value == "10-min"){
       time = 600
   }

   elStartMenu.classList.add("d-none");
   elDepartment.classList.remove("d-none");

   Array.prototype.push.apply(randomArrey, randomElements(roadSymbol));
   Array.prototype.push.apply(arryTextRandum, randomElements(randomArrey));

   newArrayRendum();
   rendumArryText();
});

function newAttempts(){

   if(attempts == 0){
       clearInterval(setIntervalId);
       renderGameOver(elTime.innerHTML)
   }
};

const parentElement = Node.parentElement;

elDepartmentList.addEventListener("click", function(evt){

   if(evt.target.matches(".js-templet-btn") || evt.target.matches(".js-images")){

       if(evt.target.dataset.id == arryTextRandum[0].id){
           if(evt.target.matches(".js-templet-btn")){
               evt.target.classList.add("sign-img", "bg-warning");
           }
           else{
               evt.target.parentElement.classList.add("sign-img", "bg-warning")
           }
           const rederId = randomArrey.findIndex(item => item.id == evt.target.dataset.id)
           newArrey.push(rederId); 
           score += 2;

           scoreAttemptrs();
           newAttempts();
           arryTextRandum.splice(0, 1);
           rendumArryText();
           setTimeout(newArrayRendum, 1600);
       }

       else{
           if(evt.target.className.indexOf("error-img") == -1){                
               if(evt.target.matches(".js-templet-btn")){
                   evt.target.classList.add("error-img", "bg-danger");
               }
               else{
                   evt.target.parentElement.classList.add("error-img", "bg-danger")
                   evt.target.classList.add("error-img");
               }
               score--
               attempts--

               scoreAttemptrs();
               newAttempts();

           }
       }
   }
});

elGameBox.addEventListener("click", function(){
   window.location.reload();
});

elYouBox.addEventListener("click", function(){
   window.location.reload();
});
 









