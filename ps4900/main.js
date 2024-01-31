let startTime;
let processingQueue = false;
let messageQueue = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
    processMessageQueue();
}

function getNewBrowserTitle(dur) {
    hrs = Math.floor(dur/1000/60/60);
    min = Math.floor(dur/1000/60-hrs*60);
    sec = Math.floor(dur/1000-min*60);
    mil = dur.toString().slice(-3);
    
    if (min != 0) {
        ShowDuration = " - PS4 Exploited In : " + min + " minute" + (min == 1 ? "" : "s") + ", " + sec + " second" + (sec == 1 ? "" : "s");
    } else {
        ShowDuration = " - PS4 Exploited In: " + sec + " second" + (sec == 1 ? "" : "s");
    }
}

function startBenchmarkTimer() {
    startTime = Date.now();
}

function endBenchmarkTimer() {
    top.document.title += getNewBrowserTitle(Date.now() - startTime);
}

function loadPayload(payloadFile) {
    var req = new XMLHttpRequest();
    
    req.responseType = "arraybuffer";
    req.open("GET", payloadFile, true);

    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            PLD = req.response;
            
            var payload_buffer = chain.syscall(477, 0, PLD.byteLength*4 , 7, 0x1002, -1, 0);
            var pl = p.array_from_address(payload_buffer, PLD.byteLength*4);
            var padding = new Uint8Array(4 - (req.response.byteLength % 4) % 4);
            var tmp = new Uint8Array(req.response.byteLength + padding.byteLength);
            
            tmp.set(new Uint8Array(req.response), 0);
            tmp.set(padding, req.response.byteLength);
            
            var shellcode = new Uint32Array(tmp.buffer);
            
            pl.set(shellcode,0);
            
            var pthread = p.malloc(0x10);
            
            chain.call(libKernelBase.add32(OFFSET_lk_pthread_create), pthread, 0x0, payload_buffer, 0);
        }
    };
}

function runHomebrewEnabler() {
    printToConsole("Loading latest version of GoldHen...")
    loadPayload("goldhen.bin");
    printToConsole("GoldHen loaded.")
}