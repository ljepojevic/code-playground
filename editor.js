var lightMode = document.querySelector("#light-mode");
var darkMode = document.querySelector("#dark-mode");
var inputarea = document.querySelector("textarea");
var run = document.querySelector("#run_code");
var preview = document.querySelector("#code_preview");
run.addEventListener('click', (e) => runCode(e))
function runCode(e){
    e.target.blur();
    var doc = preview.contentWindow.document;
    var script = '<script>' + inputarea.value + '<\/script>';
    doc.open();
    doc.write(`<link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet">`);
    doc.write(`<div id="logs" style="font-family: 'Fira Code', Courier, monospace; color: #999;"></div>`);
    doc.write(`
    <script>
        (function () {
    var old = console.log;
    var logger = document.getElementById('logs');
    console.log = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'object') {
                logger.innerHTML += '> ' + (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
            } else {
                logger.innerHTML += '> ' + arguments[i] + '<br />';
            }
        }
    }
    console.info = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'object') {
                logger.innerHTML += '> ' + (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
            } else {
                logger.innerHTML += '> ' + arguments[i] + '<br />';
            }
        }
    }
    console.error = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'object') {
                logger.innerHTML += '<div style="color: red; background: pink;">> ' + (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '</div>';
            } else {
                logger.innerHTML += '<div style="color: red; background: pink;">> ' + arguments[i] + '</div>';
            }
        }
    }
    console.warn = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'object') {
                logger.innerHTML += '<div style="color: sandybrown; background: moccasin;">> ' + (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '</div>';
            } else {
                logger.innerHTML += '<div style="color: sandybrown; background: moccasin;">> ' + arguments[i] + '</div>';
            }
        }
    }
})();
    <\/script>
    `);
    doc.write(script);
    doc.close();
}

var theme = 'default';
if (sessionStorage.getItem('theme')){
    theme = sessionStorage.getItem('theme');
}

var myCodeMirror = CodeMirror.fromTextArea(inputarea, {
    theme: theme,
    lineNumbers: true,
    styleActiveLine: true,
    mode: "javascript"
});

lightMode.addEventListener('click', (e) => {
    e.target.blur();
    setLightMode();
})
darkMode.addEventListener('click', (e) => {
    e.target.blur();
    setDarkMode();
    
})

function setLightMode() {
    myCodeMirror.setOption('theme', 'default');
    sessionStorage.setItem('theme', 'default');
}
function setDarkMode() {
    myCodeMirror.setOption('theme', 'material-palenight');
    sessionStorage.setItem('theme', 'material-palenight');
}
myCodeMirror.on('change',function(cm){
    inputarea.value = cm.getValue();
});