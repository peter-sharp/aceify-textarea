// global jQuery, window, document
var head = document.head, body = document.body;
var sources = ['https://code.jquery.com/jquery-2.1.4.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.2/ace.js'];
for (var i = 0; i <= sources.length-1; i++) {
  (function(sources){
    var script=document.createElement('SCRIPT');
     script.type='text/javascript';
     script.src= sources[i];
     head.appendChild(script);
   })(sources);
}

window.setTimeout(function(){
 ( function($) {
    $.expr[':'].contains = $.expr.createPseudo(function(arg){
      return function(elem){
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
      }
    });
    var $textAreas = $('textarea');
    $textAreas.each(function(index,object){
    var $object = $(object);
    var id = 'ace_editor_'+index;
     var $ace_editor = $('<div id='+id+'>');
     var $ace_language_selector = $('<span>language</span><select id="ace_language_selector" class="form-control"><option val="php">php</option><option val="javascript">javascript</option><option val="html">html</option><option val="css">css</option><option val="less">less</option></select>');

     $ace_editor.height( $object.height() );
     $object.after($ace_editor).after($ace_language_selector);
     $object.hide();
     console.log('object: ',$ace_editor,$ace_editor.height() );
     var editor=ace.edit(id);
     editor.setTheme('ace/theme/monokai');
     editor.getSession().setMode('ace/mode/php');
     editor.getSession().setValue($object.val());
     editor.getSession().on('change', function(){ $object.val(editor.getSession().getValue());
     });
     $ace_language_selector.on('change',function(){ editor.getSession().setMode('ace/mode/'+ $(this).val() );
     });
   })
   $(window).keydown(function(event) {
     if ((event.ctrlKey || event.metaKey) && (event.which == 83)) {
       event.preventDefault();
       event.stopPropagation();
       $submit = $('button:contains(save)');
       $submit.trigger('click');
     }
   });
  })(jQuery);
},1500);
