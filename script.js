async function pyatts() {
    // Main function
    var span = document.getElementById('textEntry');
    var input = span.innerText;
    // Remove whitespace
    input = input.replace(/\s/g, '');
    console.log(input);
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
    console.log(save);
    // Format the output
    var out = format(input, save);
    // Console.log the output
    console.log(out);

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
    // Interate characters of a
    var out = '';
    var bi = 0;
    // Special case for first character
    // If is numb or letter
    if (a[0].match(/[a-z0-9]/i)) {
        out += a[0];
    } else {
        out += a[0];
        out += b[0];
        bi += 1;
    }
    for (var i = 0; i < a.length; i++) {
        // Get the character
        var char = a.charAt(i + 1);
        // if the character is not a alphabet or number
        if (!char.match(/[a-z0-9]/i)) {
            // Add the character to the output
            out += "(" + b[bi] + ")";
            out += char;
            // Add b index
            bi += 1;
        } else {
            // Add the character to the output
            out += char;
        }
    }
    return out;
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