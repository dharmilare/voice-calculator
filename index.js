const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const microphone = document.getElementById('microphone');
const themeTogglerBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.calculator');
const togglerIcon = document.querySelector('.toggler-icon');

buttons.forEach((item) =>{
    item.onclick = () => {
        if(item.id == 'clear'){
            display.innerText='';
        }else if(item.id == 'backspace') {
            let string = display.innerText.toString();
            display.innerText = string.substr(0, string.length - 1);
        }else if(display.innerText != '' && item.id == 'equal') {
            display.innerText = eval(display.innerText);
        }else if(display.innerText == '' && item.id == 'equal') {
            display.innerText = 'Empty!';
            setTimeout(() => (display.innerText = ''), 2000);
        }else{
            display.innerText += item.id;
        }
    }
})

let isDark =true;
themeTogglerBtn.onclick =() =>{
    calculator.classList.toggle('dark');
    themeTogglerBtn.classList.toggle('active');
    isDark= !isDark;
}
microphone.onclick = function(){
    microphone.classList.add('record')
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition 
    || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang ='en-US';
    recognition.start();
    recognition.onresult = function (event) {
        var input = event.results[0][0].transcript;
        display.innerText = input;
        setTimeout(function(){
            evaluate(input);
        },1000)
        microphone.classList.remove('record')
    }
}
function evaluate(input){
    try{
        var result = eval(input);
        display.innerText = result;
    }catch(e){
        console.log(e);
        display.innerText = '';
    }
}