// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log("Request: ", request);
//     if (request.action === "readText") {
//         console.log("Request message", request.message);
//         console.log("Request text", request.text);
//          chrome.tts.speak(request.message, {
//             voiceName: "Google UK English Female",
//             // voiceName: 'Google 日本語',
//             rate: 1
//         });
//      }
//      sendResponse();
// });

// console.log("Here!");

// // // Listen for a message from the popup
// // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// //     // Check if the message contains highlighted text
// //     if (request.text) {
// //       // Speak the highlighted text using the Web Speech API
// //       chrome.tts.speak(request.text, { voiceName: "Google UK English Female" });
// //     }
// // });

// chrome.browserAction.onClicked.addListener(function() {
//     chrome.tabs.executeScript({file: "popup.js"}, function() {
//         console.log("content loaded");
//     });
// });