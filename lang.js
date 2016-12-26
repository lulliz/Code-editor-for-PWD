/* HTML Editor*/
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/html");
editor.setOption("showPrintMargin", false);
editor.setFontSize("16px");

$(document).ready(function() {
    if (annyang) {
        function addText(text){
            editor.insert(text);
        }
        annyang.setLanguage('ru');
        var commands = {
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
            'вверх': function() { 
                editor.navigateUp(1);
            },
            'вниз': function() { 
                editor.navigateDown(1);
            },
            'право': function() { 
                editor.navigateRight(1);
            },
            'лево': function() { 
                editor.navigateLeft(1);
            },
            'файл стилей': function() {
                addText('<link href="styles.css" rel="stylesheet">');
            },
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
                addText('<!DOCTYPE html>\n<html>\n    <head>\n       <title></title>\n    </head>\n    <body>\n        <p>Hello</p>\n');
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
function showHTMLInIFrame() {
    $('#return').html("<iframe src=" + "data:text/html," + encodeURIComponent(editor.getValue()) + "></iframe>");
}
editor.on("input", showHTMLInIFrame);


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
