var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

diagnostic = document.querySelector('.recogoutput');
button = document.querySelector('.btn-custom')
bl = document.querySelector('div.hidden')
input = document.querySelector('input.inp')

button.onclick = function() {
    diagnostic.textContent = '...'
    recognition.start();
    console.log('Ready to receive Speech...');
    if (bl.style.display === "block") {
        bl.style.display = "none";
    } else {
        bl.style.display = "block";
    }
}

recognition.onresult = function(event) {
    if (bl.style.display === "none") {
        bl.style.display = "block";
    } else {
        bl.style.display = "none";
    }
    var last = event.results.length - 1;
    var color = event.results[last][0].transcript;
    console.log(event.results)
    processedSpeech = color;
    diagnostic.textContent = "Processed Speech: " + processedSpeech + ".";
    console.log('Confidence: ' + event.results[0][0].confidence);
    input.value = processedSpeech;
    document.forms[0].submit()
}

recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onnomatch = function(event) {
    diagnostic.textContent = "I didn't recognise that what you said. Please speak again.";
}

recognition.onerror = function(event) {
    if (bl.style.display === "none") {
        bl.style.display = "block";
    } else {
        bl.style.display = "none";
    }
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}