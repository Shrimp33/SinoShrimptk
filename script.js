var bulk = false;
// Codes of legal of ā,ē,ī,ō,ū,ǖ,á,é,í,ó,ú,ǘ,ǎ,ě,ǐ,ǒ,ǔ,ǚ,à,è,ì,ò,ù,ǜ
const legals = [257, 275, 299, 333, 363, 470, 225, 233, 237, 243, 250, 472, 462, 283, 464, 466, 468, 474, 224, 232, 236, 242, 249, 476]
// console.log(legals);

function cache(data, key) {
    // Cache the data
    localStorage.setItem(key, data);
}
function read(key) {
    // Read the data
    return localStorage.getItem(key);
}

async function pyatts() {
    // Main function
    let span = document.getElementById('textEntry');
    // Easy case
    if (read("iliteration") != null && span.textContent == ' Place Input Here') {
        span.innerHTML = read("iliteration");
        span.contentEditable = false;
    }
    else // Hard case
    {    let input = span.innerText;
        // Replace new lines with u-newlines
        input = input.replace(/\n/g, 'u-newline');
        // Replace spaces with u-spaces
        input = input.replace(/\s/g, 'u-space');
        // Replace tabs with u-tabs
        input = input.replace(/\t/g, 'u-tab');
        // log input
        // console.log(input);
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
        // Divs
        // Replace all occurrences of newline with </div>
        out = out.replace(/\n/g, '</div><br><div style= "display: inline-block">');
        // Find all occurrences of %py() and replace with the <p class="pingying">content</p>
        out = out.replace(/%py\((.*?)\)/g, '<p class="pingying" style="display: inline;">$1</p>');
        // Find all occurrences of %or() and replace with the <p class="original">content</p>
        out = out.replace(/%or\((.*?)\)/g, '<p class="original" style="display: inline;">$1</p>');
        // Add div to the start
        out = '<div style= "display: inline-block;">' + out + '</div>';
        // Output
        span.innerHTML = out;
        // Cache
        cache(out, "iliteration");
        // // Testing
        // let speech = new SpeechSynthesisUtterance();
        // // Mandarin
        // speech.lang = 'zh-CN';
        // // Set the text
        // speech.text = input;
        // // Speak
        // window.speechSynthesis.speak(speech);
        // Get an array of all the original elements
    }
    var original = document.getElementsByClassName('original');
    // Iterate through all of the original elements
    for (var i = 0; i < original.length; i++) {
        // Add event listeners
        // On mouse click
        original[i].addEventListener('click', function() {
            // If bulk
            if (bulk) {
                // Get div parent
                var parent = this.parentNode;
                // Get all original elements
                var originals = parent.getElementsByClassName('original');
                // Concatenate all of the original elements into a string
                var text = '';
                for (var j = 0; j < originals.length; j++) {
                    // Also make them red
                    originals[j].style.color = 'red';
                    text += originals[j].innerText;
                }
                // Speak
                let speech = new SpeechSynthesisUtterance();
                // Mandarin
                speech.lang = 'zh-CN';
                // Set the text
                speech.text = text;
                // Speak
                window.speechSynthesis.speak(speech);
                // Turn them back to #fffb00
                // wait for 1 second
                setTimeout(function() {
                for (var j = 0; j < originals.length; j++) {
                    originals[j].style.color = '#fffb00';
                    // log color
                    // console.log(originals[j].style.color);
                }
                }, 1000);
            } else {
                // Read text
                let speech = new SpeechSynthesisUtterance();
                // self
                var self = this;
                // Mandarin
                speech.lang = 'zh-CN';
                // Set the text
                speech.text = self.innerText;
                // Turn it red
                self.style.color = 'red';
                // Speak
                window.speechSynthesis.speak(speech);
                // Turn it back to #fffb00
                // wait for .5 second
                setTimeout(function() {
                    self.style.color = '#fffb00';
                }, 500);
            }
        });
        // On copy and paste
        original[i].addEventListener('copy', function() {
            // Get selection
            var selection = getSelectionTextAndContainerElement();
            // Get the text
            var text = selection.text;
            // Remove non-chinese characters
            text = text.replace(/[\u0000-\u4dff]/g, '');
            // Set clipboard data
            navigator.clipboard.writeText(text);
        });
    }
    // Intreate through all of the pingying elements
    var pingying = document.getElementsByClassName('pingying');
    for (var i = 0; i < pingying.length; i++) {
        // Add event listeners
        // Copy and paste
        pingying[i].addEventListener('copy', function() {
            // Get selection
            var selection = getSelectionTextAndContainerElement();
            // Get the text
            var text = selection.text;
            // Remove non-chinese characters
            text = text.replace(/[\u4e00-\u9fa5]/g, '');
            // Set clipboard data
            navigator.clipboard.writeText(text);
        });
    }
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
            // console.log(b);
            bi = phasepy(b, bi) + 1; // Update index after value is spent
            out += "%or(" + a[i] + ")" + "%py(" + b[bi - 1] + ")"; // Add the character and the pinyin
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
    // If i is not the last index
    if (i < b.length - 1) {
        var c = b[i][0]; // Get val
        // Iterate through all of c
        for (var j = 0; j < c.length; j++) {
            // If c is not in extended latin
            if (!legalcharacter(c[j])) {  // Works for most cases but not all
                // Recurse
                return phasepy(b, i + 1);
            }
        }
        return i;
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
function toggle(){
    bulk = !bulk;
}
function legalcharacter(c) {  // Takes a character c and returns true if is legal pingyin
    // If c is in A-Za-z then return true
    if (c.match(/[A-Za-z]/)) {
        return true;
    }
    // Get the unicode of the character in hex
    var hex = c.charCodeAt(0)
    // If hex is in legal hex then return true
    if (legals.includes(hex)) {
        return true;
    }
    return false;
}
function clearText(){
    // Clear text in box and allow for new input
    let handle = document.getElementById('textEntry');
    handle.textContent = ' Place Input Here';
    handle.contentEditable = true;
    // Delete cache
    localStorage.removeItem('iliteration');
}