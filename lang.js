/* HTML Editor*/
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/html");
editor.setOption("showPrintMargin", false);
editor.setFontSize("16px");
editor.getSession().setUseWrapMode(true);
editor.$blockScrolling = Infinity;

$("#success-alert").hide(); /* lang alert*/

$(document).ready(function() {
    if (annyang) {
        function addText(text){
            editor.insert(text);
        }
        annyang.setLanguage('ru');
        var commands = {
            'переключить язык на английский': function() {
                annyang.setLanguage('en-US');
                $("#success-alert").alert();
                $("#success-alert").fadeTo(1000, 500).slideUp(500, function(){
                    $("#success-alert").slideUp(500);
                });  
            },
            'switch language to russian': function() {
                annyang.setLanguage('ru');
                $("#success-alert").alert();
                $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                    $("#success-alert").slideUp(500);
                });
            },
            'слово *wordRu': calcWordRu,
            'say *wordEn': calcWordEn,
            'открыть подсказки': function() {
                openNav();
            },
            'закрыть подсказки': function() {
                closeNav();
            },
            'открыть инструкцию': function() {
                localStorage.clear();
                tour.init();
                tour.start();
            },
            'закрыть инструкцию': function() {
                tour.end()
            },
            'энтер': function() {
                addText('\n');
            },
            'enter': function() {
                addText('\n');
            },
            'таб': function() {
                addText('    ');
            }, 
            'tab': function() {
                addText('    ');
            },
            'пробел': function() {
                addText(' ');
            },
            'space': function() {
                addText(' ');
            },  
            'удалить': function() {
                /* I don't know how this made...*/
            },
            'отменить': function() { 
                editor.undo();
            },
            'cancel': function() { 
                editor.undo();
            },
            'вернуть': function() { 
                editor.redo();
            },
            'сохранить': function() { 
                localStorage.setItem('text',editor.getValue());
            },
            'загрузить': function() { 
                var str = localStorage.getItem('text');
                editor.getSession().setValue(str);
                editor.renderer.updateFull();
            },
            'верх *stepsUp': calcStepsUp,
            'вниз *stepsDown': calcStepsDown,
            'лево *stepsLeft': calcStepsLeft,
            'право *stepsRight': calcStepsRight,
            'перейти на *row строку *col столбец':calcRowCol,
            'текст': function() {
                addText('<p></p>');
            },
            'ссылка':function(){
                addText('<a href=""');
                addText('>');
            },   
            'секция': function() {
                addText('<section id=""');
                addText('>');
                addText('\n');
            },
            'класс': function() {
                addText('class=""');
            },
            'айди': function() {
                addText('id=""');
            },
            'решетка': function() {
                addText('#');
            },
            'точка': function() {
                addText('.');
            },
            'запятая': function() {
                addText(',');
            },
            'восклицательный знак': function() {
                addText('!');
            },
            'вопросительный знак': function() {
                addText('?');
            },
            'стиль скобки': function() {
                addText('{');
                addText('\n');
            },
            'блок класс':function(){
                addText('<div class=""');
                addText('>');
                addText('\n');
            },
            'блок айди':function(){
                addText('<div id=""');
                addText('>');
                addText('\n');
            },
            'старт':function(){
                addText('<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset="utf-8">\n        <title></title>\n        <style></style>\n    </head>\n    <body>\n        <p>Hello</p>\n');
                addText('    </body>\n</html>');
                editor.gotoLine(7); 
                editor.navigateLineEnd();
                addText('\n');
            }
        };
        annyang.addCommands(commands);
        annyang.start({ autoRestart: true, continuous: false });
    }
});

/* Preview code*/
function showHTML() {
    var doc = document.getElementById('framelive').contentWindow.document;
    doc.open();
    doc.write(editor.getValue());
    doc.close();
}
editor.on("input", showHTML);


/* Step-by-step the tour */
var tour = new Tour({
    steps: [
    {
        element: "#editor",
        title: "Привет дорогой друг :)",
        backdrop: true,
        smartPlacement: true,
        backdropContainer: 'body',
        backdropPadding: 5,
        content: "Эта часть, в которой ты будешь видеть свой код и иметь возможность его редактировать!",
        duration: 10000
    },
    {
        element: "#return",
        title: "Превью",
        backdrop: true,
        smartPlacement: true,
        backdropContainer: 'body',
        backdropPadding: 5,
        content: "В этой же части будет отображаться весь твой сайт, каким его видит браузер - то есть в готовом виде!",
        duration: 10000
    },
    {
        element: "#editor",
        title: "Много-много команд!",
        backdrop: true,
        smartPlacement: true,
        content: "Когда это окно закроется - произнеси фразу: \n 'Открыть подсказки' \n И увидишь все возможности этого редактора. \n Желаю успехов! ",
        duration: 12000
    }
    ],
    template: "<div class='popover tour'>\
    <div class='arrow'></div>\
    <h3 class='popover-title'></h3>\
    <div class='popover-content'></div>\
    </div>",
});

/* wrap word media query*/
if (window.matchMedia("(max-width: 1280px)").matches) {
    editor.getSession().setWrapLimitRange(0, 40);
} 
else if (window.matchMedia("(max-width: 1366px)").matches)  {
  editor.getSession().setWrapLimitRange(0, 50);
}
else if (window.matchMedia("(max-width: 1600px)").matches) {
    editor.getSession().setWrapLimitRange(0, 100);
}
else if (window.matchMedia("(max-width: 1920px)").matches) {
    editor.getSession().setWrapLimitRange(0, 140);
}
else {}

    /* calc steps Up, Down, Left, Right by user say!*/
var calcStepsUp = function(stepsUp) {
    editor.navigateUp(stepsUp);
}
var calcStepsDown = function(stepsDown) {
    editor.navigateDown(stepsDown);
    console.log(stepsDown); /* sometimes have strange bag - cursor ignore number & go full down.*/
}
var calcStepsLeft = function(stepsLeft) {
    editor.navigateLeft(stepsLeft);
}
var calcStepsRight = function(stepsRight) {
    editor.navigateRight(stepsRight);
}

var calcRowCol = function(row,col) {
    editor.gotoLine(row,col,true);
}

var calcWordRu = function(wordRu) {
    editor.insert(wordRu);
}

var calcWordEn = function(wordEn) {
    editor.insert(wordEn);
}

/* hot-key panel*/
function openNav() {
    $("#hotkey").width("100%");
}

function closeNav() {
    $("#hotkey").width("0");
}


/* chrome only */
    // Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

if (isChrome==true) {}
else {
    console.log("Nea, ne wokr!");
    $('body').html('<h1>Извини, дорогой друг!</h1><h1>Данный сайт работает только в Google Chrome!</h1><h1><a href="https://www.google.ru/chrome/browser/desktop/">Вот тут скачать можно :)</a></h1>');
}