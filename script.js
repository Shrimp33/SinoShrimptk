async function pyatts() {
    // Main function
    var span = document.getElementById('textEntry');
    var input = span.innerText;
    // Replace new lines with u-newlines
    input = input.replace(/\n/g, 'u-newline');
    // Replace spaces with u-spaces
    input = input.replace(/\s/g, 'u-space');
    // Replace tabs with u-tabs
    input = input.replace(/\t/g, 'u-tab');
    // log input
    console.log(input);
    // Remove all whitespace
    input = input.replace(/\s/g, '');
    // Lock the input
    span.contentEditable = false;
    // Send to server
    var json;
    safe = urlsafe_base64_encode(input);
    await fetch('https://PingYingServer.shrimp33.repl.co/pingying/' + safe, {  // Please don't ddos me
    method: 'GET',
    }).then(response => response.text()).then(data => {
        json = data;
    });
    // Convert the output
    var out = JSON.parse(json);
    // Console.log the output
    // console.log(out['response']);
    // Save
    var save = out['response'];
    // Phrase
    // Format the output
    var out = format(input, save);
    // Console.log the output

    // Set text to output
    span.innerText = out;
    // Unlock the input
    span.contentEditable = true;
    
    // Testing
    let speech = new SpeechSynthesisUtterance();
    // Mandarin
    speech.lang = 'zh-CN';
    // Set the text
    speech.text = input;
    // Speak
    window.speechSynthesis.speak(speech);
}
function format(a, b) {
    // Master output
    var out = '';
    // Counter vars
    var bi = 0;
    // Iterate through all of a
    for (var i = 0; i < a.length; i++) {
        // If a is a chinese character
        if (a[i].match(/[\u4e00-\u9fa5]/)) {
            bi = phasepy(b, bi) + 1; // Update index after value is spent
            out += a[i] + "(" + b[bi - 1] + ")"; // Add the character and the pinyin
        }
        else {
            out += a[i]; // Add the character
        }
    }
    // Where there is u-newline, replace with newline
    out = out.replace(/u-newline/g, '\n');
    // Where there is u-space, replace with space
    out = out.replace(/u-space/g, ' ');
    // Where there is u-tab, replace with tab
    out = out.replace(/u-tab/g, '\t');

    // Return the output
    return out;
}
function phasepy(b, i) {
    // Get b at i
    var c = b[i];
    // Iterate through all of c
    for (var j = 0; j < c.length; j++) {
        // If c is not in extended latin
        if (!c[j].match(/[\u0000-\u00ff]/) || c[j].match(/[\u0020-\u003E]/)) {
            // Recurse
            return phasepy(b, i + 1);
        }
    }
    return i;
}
function urlsafe_base64_encode(a) {
    // Encode the input
    a = a.replace(/\+/g, 'uplus');
    a = a.replace(/\//g, 'uslash');
    a = a.replace(/=/g, 'uequal');
    // Return the output
    return a;
}
function unicodetochar(a) {
    // Convert the input
    a = a.replace(/\\u/g, '\\x');
    // Return the output
    return a;
}