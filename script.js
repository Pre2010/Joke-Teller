const button = document.getElementById('button');

const voiceSelect = document.getElementById('voices-select');
const pitch = document.getElementById('pitch');
const rate = document.getElementById('rate');

const pitchValue = document.getElementById('pitch-value');
const rateValue = document.getElementById('rate-value');

const speechSynth = window.speechSynthesis;

const apiUrl = 'https://official-joke-api.appspot.com/jokes/programming/random';

let joke = '';
let voices = [];

async function tellMeAJoke() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        joke = data[0].setup + " " + data[0].punchline;

        let speechSynthUtterance = new SpeechSynthesisUtterance(joke);

        let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

        for (voice of voices) {
            if (voice.name === selectedOption) {
                speechSynthUtterance.voice = voice;
            }
        }

        speechSynthUtterance.pitch = pitch.value;
        speechSynthUtterance.rate = rate.value;

        speechSynthesis.speak(speechSynthUtterance);

        // audio.src = 
    } catch (error) {
        console.log('error', error);

    }
}

function populateVoicesList() {
    voices = speechSynth.getVoices();
    for(let voice of voices) {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';

        if (voice.default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    }
}

pitch.onchange = function() {
    pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
    rateValue.textContent = rate.value;
}

populateVoicesList();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoicesList;
}

button.addEventListener('click', tellMeAJoke); 
