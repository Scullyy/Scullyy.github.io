var processingQueue = false;
const messageQueue = [];

async function processMessageQueue() {
    if (processingQueue === true) return;

    processingQueue = true;

    while (messageQueue.length > 0) {
        const message = messageQueue.shift();
        await sendToConsole(message);
    }

    processingQueue = false;
}

async function sendToConsole(message) {
    const consoleDiv = document.createElement('div');
    consoleDiv.classList.add('output');
  
    const promptSpan = document.createElement('span');
    promptSpan.classList.add('prompt');
    promptSpan.textContent = '[System] ';
  
    const messageSpan = document.createElement('span');
    messageSpan.textContent = '';
  
    consoleDiv.appendChild(promptSpan);
    consoleDiv.appendChild(messageSpan);
  
    document.querySelector('.info').appendChild(consoleDiv);
  
    for (let i = 0; i < message.length; i++) {
        messageSpan.textContent += message.charAt(i);
        await sleep(50);
    }
}

function printToConsole(message) {
    messageQueue.push(message);
    processMessageQueue()
}

function jailbreakConsole() {
    printToConsole("Loading jailbreak...")
    setTimeout(webkitExploit, 1000);
}
   
function load_goldhen() {
    printToConsole("Loading latest version of GoldHen...")
    loadPayload("goldhen.bin");
    printToConsole("GoldHen loaded.")
}