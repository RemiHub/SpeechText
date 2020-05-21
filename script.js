const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


const data = [
      {
        image: 'speech-text-reader/img/drink.jpg',
        text: "I'm thirsty"
      },
      { 
        image: 'speech-text-reader/img/food.jpg',
        text: "I'm Hungry"
      },
      {
        image: 'speech-text-reader/img/tired.jpg',
        text: "I'm Tired"
      },
      {
        image: 'speech-text-reader/img/hurt.jpg',
        text: "I'm Hurt"
      },
      {
        image: 'speech-text-reader/img/happy.jpg',
        text: "I'm Happy"
      },
      {
        image: 'speech-text-reader/img/angry.jpg',
        text: "I'm Angry"
      },
      {
        image: 'speech-text-reader/img/sad.jpg',
        text: "I'm Sad"
      },
      {
        image: 'speech-text-reader/img/scared.jpg',
        text: "I'm Scared"
      },
      {
        image: 'speech-text-reader/img/outside.jpg',
        text: 'I Want To Go Outside'
      },
      {
        image: 'speech-text-reader/img/home.jpg',
        text: 'I Want To Go Home'
      },
      {
        image: 'speech-text-reader/img/school.jpg',
        text: 'I Want To Go To School'
      },
      {
        image: 'speech-text-reader/img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
      }
];

data.forEach(createBox);

//creat speech boxes
function createBox(item){
    const box = document.createElement('div');

    //pulling image and text from item direct from DOM
    //instead of using dot notation one by one
    const {image, text} = item;

    box.classList.add('box');
    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText(); 

        //add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);

    })
    main.appendChild(box);
}

//init speed synth
const message = new SpeechSynthesisUtterance();

//store voices
let voices = [];

function getVoices(){
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

//set text
function setTextMessage(text){
    message.text = text;
}

//speak text
function speakText(){
    speechSynthesis.speak(message);
}

//set voice
function setVoice(e){
    message.voice = voices.find(voice => 
        voice.name === e.target.value);
}

//voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show'));

//close button
closeBtn.addEventListener('click', () => 
document.getElementById('text-box').classList.remove('show'));

//change voice on drop menu
voicesSelect.addEventListener('change', setVoice)

//read text on drop down box
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
})

getVoices();







