/* HTML Editor*/
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/html");
editor.setOption("showPrintMargin", false);
editor.setFontSize("16px");
editor.getSession().setUseWrapMode(true);


$(document).ready(function() {
    if (annyang) {
        function addText(text){
            editor.insert(text);
        }
        annyang.setLanguage('ru');
        var commands = {
            'переключить язык на английский': function() {
                annyang.setLanguage('en-US');
            },
            'switch language to russian': function() {
                annyang.setLanguage('ru');
            },
            'слово *wordRu': calcWordRu,
            'say *wordEn': calcWordEn,
            'слово дерево': function() {
                addText('дерево');
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
            'таб': function() {
                addText('    ');
            }, 
            'пробел': function() {
                addText(' ');
            }, 
            'отменить': function() { 
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
    $('#return').html(editor.getValue());
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
    console.log(wordRu);
}

var calcWordEn = function(wordEn) {
    editor.insert(wordEn);
    console.log(wordEn);
}