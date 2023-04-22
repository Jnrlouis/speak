document.addEventListener('DOMContentLoaded', function() {
    var speechSynthesis = window.speechSynthesis;
    var voiceSelect = document.getElementById("voiceSelect");
    var voices;
    function populateVoiceList() {
        if (typeof speechSynthesis === "undefined") {
            return;
        }
        
        voices = speechSynthesis.getVoices();
        
        for (let i = 0; i < voices.length; i++) {
            const option = document.createElement("option");
            option.textContent = `${voices[i].name} (${voices[i].lang})`;
        
            if (voices[i].default) {
            option.textContent += " — DEFAULT";
            }
        
            option.setAttribute("data-lang", voices[i].lang);
            option.setAttribute("data-name", voices[i].name);
            voiceSelect.appendChild(option);
        }
    }

    function getSelectedOption () {
        populateVoiceList();
        const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
        for (let i = 0; i < voices.length; i++) { 
            if (voices[i].name === selectedOption) { 
            utterance.voice = voices[i]; 
            } 
        }
    }
        
    populateVoiceList();
    if (
    typeof speechSynthesis !== "undefined" &&
    speechSynthesis.onvoiceschanged !== undefined
    ) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
    }
        
    // Find the button element in the popup.html file
    var readTextBtn = document.getElementById('read-text-btn');
    var stopBtn = document.getElementById('stop-btn');
    var utterance = new SpeechSynthesisUtterance();
    var isSpeaking = false;

    var toggleSpeech = function() {
        if (isSpeaking) {
            getSelectedOption();
            window.speechSynthesis.pause();
            console.log("Paused");
            isSpeaking = false;
            readTextBtn.textContent = 'Resume';
        } else if (isSpeaking == false && readTextBtn.textContent == 'Resume') {
            getSelectedOption();
            window.speechSynthesis.resume();
            console.log("Resumed");
            isSpeaking = true;
            readTextBtn.textContent = 'Pause';
        } else {
            chrome.tabs.executeScript({
                code: 'window.getSelection().toString()'
            }, function(selection) {
                console.log("Voice Select: ", voiceSelect);
                const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
                for (let i = 0; i < voices.length; i++) {
                    if (voices[i].name === selectedOption) {
                    utterance.voice = voices[i];
                    }
                }
                utterance.text = selection[0];
                window.speechSynthesis.speak(utterance);
                isSpeaking = true;
            });
            isSpeaking = true;
            readTextBtn.textContent = 'Pause';
        }
    };

    // voiceSelect.addEventListener('change', function() {
    //     getSelectedOption();
    // });
    
    // Add a click event listener to the button
    readTextBtn.addEventListener('click', toggleSpeech);

    stopBtn.addEventListener('click', function() {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        readTextBtn.textContent = 'Start';
    });

    utterance.onstart = function(event) {
        console.log('Speech started');
    };

    utterance.onend = function(event) {
        window.speechSynthesis.cancel();
        console.log('Speech ended');
        isSpeaking = false;
        readTextBtn.textContent = 'Start';
    };

    utterance.onpause = function(event) {
        console.log('Speech paused');
        isSpeaking = false;
        readTextBtn.textContent = 'Resume';
    };
});

// document.addEventListener('DOMContentLoaded', function() {
//     var message = document.getElementById('message');
// });

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {action: "getSelectedText"}, function(response) {
//         message.innerHTML = response.selectedText;
//     });
// });