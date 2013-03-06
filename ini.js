"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {  //jquery
   $("#fileinput").change(calculate);
});

function calculate(evt) {  //Se le pasa el evento														//git checkout -b develop
  var f = evt.target.files[0]; 																							//git push origin develop
                                                                            //git checkout master
  if (f) {                                                                  //git merge develop
    var r = new FileReader();
    r.onload = function(e) { // crea funcion cuando el fichero se lea
      var contents = e.target.result;
      
      var tokens = lexer(contents);
      var pretty = tokensToString(tokens);
      
      out.className = 'unhidden';
      initialinput.contents = contents;
      finaloutput.pretty = pretty;
    }
    r.readAsText(f); // Leer como texto
  } else { 
    alert("Failed to load file");
  }
}

var temp = '<li> <span class = "<%= token.type %>"> <%= match %> </span>\n';   //intrepola, ponemos tipo de token

function tokensToString(tokens) {
   var r = '';
   for(var i in tokens) {
     var t = tokens[i];
     var s = JSON.stringify(t, undefined, 2);
     s = _.template(temp, {token: t, match: s});  //No sustiturir, templete es un método de la libreria underscore
     r += s;
   }
   return '<ol>\n'+r+'</ol>';
}

function lexer(input) {
  var blanks         = /^\s+/;
  var iniheader      = /^\[([^\]\r\n]+)\]/;
  var comments       = /^[;#](.*)/;
  var nameEqualValue = /^([^=;\r\n]+)=([^;\r\n]*)/;
  var any            = /^(.|\n)+/;

  var out = [];
  var m = null;

  while (input != '') {
    if (m = blanks.exec(input)) {
      input = input.substr(m.index+m.lastIndex);
      out.push({ type : input, match: m });
    }
    else if (m = iniheader.exec(input)) {
      input = input.substr(m.index+m.lastIndex);
      input.lastIndex; // avanzemos en input
    }
    else if (m = comments.exec(input)) {
      input = input.substr(m.index+m.lastIndex);
      input.lastIndex;
    }
    else if (m = nameEqualValue.exec(input)) {
      input = input.substr(m.index+m.lastIndex);
      input.lastIndex;
    }
    else if (m = any.exec(input)) {
      input.lastIndex;
      input = '';
    }
    else {
      alert("Fatal Error!"+substr(input,0,20));
      input = '';
    }
  }
  return out;
}