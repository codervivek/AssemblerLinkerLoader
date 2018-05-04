(function($){
  $(function(){
    $('.button-collapse').sideNav();
  });

  function printDic(x){
      var stringOut="";
      for (var key in x)
      {
        if(key != parseInt(key, 10))
          stringOut+='<li class="collection-item">'+key+": "+x[key]+"</li>";
      }
      return stringOut;
  };

  function printRealDic(x){
      var stringOut="";
      for (var key in x)
          stringOut+='<li class="collection-item">'+key+": "+x[key]+"</li>";
      return stringOut;
  };

  function printRealDic2(x){
      var stringOut="";
      for (var key in x)
          if(x[key]===parseInt(x[key],10))
            stringOut+='<li class="collection-item">'+key+": "+x[key]+"</li>";
      return stringOut;
  };

  function printRealDic3(x,offset,line){
    var stringOut="";
    var temp=parseInt(offset);
    for (var key in x){
      for (var i=0;i<parseInt(key)-temp-2;i++)
        stringOut+=(temp+i+2)+'<br>'
      stringOut+='</li>'
      if (line==key){
        stringOut+='<li class="collection-item active">'+key+": "+x[key]+'<br>';
      }
      else{
        stringOut+='<li class="collection-item">'+key+": "+x[key]+'<br>';
      }
      temp=parseInt(key)-1;
    }
    return stringOut;
};

  var idarr = ['input-files','pass1','pass2','linker','simulator'];
  	for(i=0;i<idarr.length;i++)
  	{
  			$('#'+idarr[i]).hide();
  	}
  $('#submit-code').click(function(){
    my_code = $('#mytextarea').val();
    console.log(my_code);
    fileNames = ['my_file.txt']
    $.ajax({
      type : "POST",
      url : "/load_ajax2",
      data : JSON.stringify(my_code),
      contentType: 'application/json;charset=UTF-8',
      success: function(result) {
        response = $.parseJSON(result);
        $('#registers').html("Registers ");
        $('#memlocs').html("Variable Location");
        $('#varlocs').html("Memory Location");
        $('#currentInst').html("Nothing Loaded yet");
        $('#stack').html("Stack");
        tabs = "";
        tabs += '<div class="row" style="padding-top:10%;"><div class="col s12" tab-indicator-black><ul class="tabs tabs-fixed-width ">';
        for(i=0;i<fileNames.length;i++){
          tabs += ' <li class="tab col"><a class="blue lighten-3 blue-text text-darken-4" href="#filetab'+i+'">'+fileNames[i]+'</a></li>';
        }
        tabs += '</ul></div>';
        for(i=0;i<fileNames.length;i++){
          tabs += '<div id="filetab'+i+'" class="col s12">';
          tabs+= '<div class="col s4 offset-s4 card-panel blue lighten-4 hoverable black-text" >'+response['filedata'][fileNames[i]].replace(/\n/g,"<br>")+'</div>';
          tabs+='</div>';
        }
        tabs += '</div>';
        $('#file-data').html(tabs);


        tabs = "";
        tabs += '<div class="row" ><div class="col s12"><ul class="tabs tabs-fixed-width">';
        for(i=0;i<fileNames.length;i++){
          tabs += ' <li class="tab col"><a class="blue lighten-3 blue-text text-darken-4" href="#pass1tab'+i+'">'+fileNames[i]+'</a></li>';
        }

        tabs += '</ul></div>';
        for(i=0;i<fileNames.length;i++){
          var tempname = fileNames[i].split('.')[0];
          tabs += '<div id="pass1tab'+i+'" class="col s12">';
          tabs+= '<div class="col s2 offset-s2 card-panel blue lighten-4 black-text" ><h5> Original Code</h5> <ul class="collection"><li class="collection-item">'+response['code'][fileNames[i].split('.')[0]].replace(/\n/g,'</li><li class="collection-item">')+'</li></div>';
          tabs+= '<div class="col s2 card-panel blue lighten-4 black-text" ><h5>Assembly Code</h5><ul class="collection"><li class="collection-item">'+response['pass1'][fileNames[i].split('.')[0]].replace(/\n/g,'</li><li class="collection-item">')+'</li></div>';
          tabs+= '<div id="tables" class="row col s4" style="display:block">';
          tabs+='<div class="col s12 card-panel blue lighten-4 black-text" ><ul class="collection"> <li class="collection-header"><h5>Symbols table</h5></li>'+printDic(response['symTable'][tempname])+'</ul></div>';
          tabs+='<div class="col s12 card-panel blue lighten-4 black-text" > <ul class="collection"> <li class="collection-header"><h5>Literal table</h5></li>'+printRealDic(response['litTable'][tempname])+'</ul></div>';
          tabs+='<div class="col s12 card-panel blue lighten-4 black-text" > <ul class="collection"> <li class="collection-header"><h5>Global table</h5></li>'+printDic(response['globTable'][tempname])+'</ul></div>';
          tabs+= '</div>';
          tabs+='</div>';
        }
        tabs += '</div>';
        $('#pass1').html(tabs);
        tabs = "";
        tabs += '<div class="row"><div class="col s12"><ul class="tabs tabs-fixed-width">';
        for(i=0;i<fileNames.length;i++){
          tabs += ' <li class="tab col"><a class="blue lighten-3 blue-text text-darken-4" href="#pass2tab'+i+'">'+fileNames[i]+'</a></li>';
        }

        tabs += '</ul></div>';
        for(i=0;i<fileNames.length;i++){
          var tempname = fileNames[i].split('.')[0];
          tabs += '<div id="pass2tab'+i+'" class="col s12">';
          tabs+= '<div class="col s2 offset-s2 card-panel blue lighten-4 black-text" ><h5> Original Code</h5> <ul class="collection"><li class="collection-item">'+response['code'][fileNames[i].split('.')[0]].replace(/\n/g,'</li><li class="collection-item">')+'</div>';                
          tabs+= '<div class="col s2 card-panel black-text blue lighten-4 " ><h5>Assembly Code</h5><ul class="collection"><li class="collection-item">'+response['pass2'][fileNames[i].split('.')[0]].replace(/\n/g,'</li><li class="collection-item">')+'</div>';
          tabs+= '<div id="tables" class="row col s4" style="display:block">';
          tabs+='<div class="col s12 card-panel black-text blue lighten-4 " ><ul class="collection"> <li class="collection-header"><h5>Symbols table</h5></li>'+printDic(response['symTable'][tempname])+'</ul></div>';
          tabs+='<div class="col s12 card-panel black-text blue lighten-4 " ><ul class="collection"> <li class="collection-header"><h5>Literals table</h5></li>'+printRealDic(response['litTable'][tempname])+'</ul></div>';
          tabs+='<div class="col s12 card-panel hoverable black-text blue lighten-4" ><ul class="collection"> <li class="collection-header"><h5>Global table</h5></li>'+printDic(response['globTable'][tempname])+'</ul></div>';
          tabs+= '</div>';
          tabs+='</div>';
        }
        tabs += '</div>';
        $('#pass2').html(tabs);
        $('ul.tabs').tabs();

        $('#linkText').html('<b> Linker Output: </b><br>'+response['lin'].replace(/\n/g,"<br>"));
      }
    });
  });
  $('#submit-button').click(function(){
      files = $('input[type=file]')[0].files;
      fileNames = []
      for(i=0;i<files.length;i++){
          fileNames[i] = files[i].name;
      }

      $.ajax({
            type : "POST",
            url : "/load_ajax",
            data: JSON.stringify({files: fileNames}),
            contentType: 'application/json;charset=UTF-8',
            success: function(result) {
              response = $.parseJSON(result);
              $('#registers').html("Registers ");
              $('#memlocs').html("Variable Location");
              $('#varlocs').html("Memory Location");
              $('#currentInst').html("Nothing Loaded yet");
              $('#stack').html("Stack");
              tabs = "";
              tabs += '<div class="row" style="padding-top:10%;"><div class="col s12" tab-indicator-black><ul class="tabs tabs-fixed-width ">';
              for(i=0;i<fileNames.length;i++){
                tabs += ' <li class="tab col"><a class="blue lighten-3 blue-text text-darken-4" href="#filetab'+i+'">'+fileNames[i]+'</a></li>';
              }
              tabs += '</ul></div>';
              for(i=0;i<fileNames.length;i++){
                tabs += '<div id="filetab'+i+'" class="col s12">';
                tabs+= '<div class="col s4 offset-s4 card-panel blue lighten-4 hoverable black-text" >'+response['filedata'][fileNames[i]].replace(/\n/g,"<br>")+'</div>';
                tabs+='</div>';
              }
              tabs += '</div>';
              $('#file-data').html(tabs);


              tabs = "";
              tabs += '<div class="row" ><div class="col s12"><ul class="tabs tabs-fixed-width">';
              for(i=0;i<fileNames.length;i++){
                tabs += ' <li class="tab col"><a class="blue lighten-3 blue-text text-darken-4" href="#pass1tab'+i+'">'+fileNames[i]+'</a></li>';
              }

              tabs += '</ul></div>';
              for(i=0;i<fileNames.length;i++){
                var tempname = fileNames[i].split('.')[0];
                tabs += '<div id="pass1tab'+i+'" class="col s12">';
                tabs+= '<div class="col s2 offset-s2 card-panel blue lighten-4 black-text" ><h5> Original Code</h5> <ul class="collection"><li class="collection-item">'+response['code'][fileNames[i].split('.')[0]].replace(/\n/g,'</li><li class="collection-item">')+'</li></div>';
                tabs+= '<div class="col s2 card-panel blue lighten-4 black-text" ><h5>Assembly Code</h5><ul class="collection"><li class="collection-item">'+response['pass1'][fileNames[i].split('.')[0]].replace(/\n/g,'</li><li class="collection-item">')+'</li></div>';
                tabs+= '<div id="tables" class="row col s4" style="display:block">';
                tabs+='<div class="col s12 card-panel blue lighten-4 black-text" ><ul class="collection"> <li class="collection-header"><h5>Symbols table</h5></li>'+printDic(response['symTable'][tempname])+'</ul></div>';
                tabs+='<div class="col s12 card-panel blue lighten-4 black-text" > <ul class="collection"> <li class="collection-header"><h5>Literal table</h5></li>'+printRealDic(response['litTable'][tempname])+'</ul></div>';
                tabs+='<div class="col s12 card-panel blue lighten-4 black-text" > <ul class="collection"> <li class="collection-header"><h5>Global table</h5></li>'+printDic(response['globTable'][tempname])+'</ul></div>';
                tabs+= '</div>';
                tabs+='</div>';
              }
              tabs += '</div>';
              $('#pass1').html(tabs);
              tabs = "";
              tabs += '<div class="row"><div class="col s12"><ul class="tabs tabs-fixed-width">';
              for(i=0;i<fileNames.length;i++){
                tabs += ' <li class="tab col"><a class="blue lighten-3 blue-text text-darken-4" href="#pass2tab'+i+'">'+fileNames[i]+'</a></li>';
              }

              tabs += '</ul></div>';
              for(i=0;i<fileNames.length;i++){
                var tempname = fileNames[i].split('.')[0];
                tabs += '<div id="pass2tab'+i+'" class="col s12">';
                tabs+= '<div class="col s2 offset-s2 card-panel blue lighten-4 black-text" ><h5> Original Code</h5> <ul class="collection"><li class="collection-item">'+response['code'][fileNames[i].split('.')[0]].replace(/\n/g,'</li><li class="collection-item">')+'</div>';                
                tabs+= '<div class="col s2 card-panel black-text blue lighten-4 " ><h5>Assembly Code</h5><ul class="collection"><li class="collection-item">'+response['pass2'][fileNames[i].split('.')[0]].replace(/\n/g,'</li><li class="collection-item">')+'</div>';
                tabs+= '<div id="tables" class="row col s4" style="display:block">';
                tabs+='<div class="col s12 card-panel black-text blue lighten-4 " ><ul class="collection"> <li class="collection-header"><h5>Symbols table</h5></li>'+printDic(response['symTable'][tempname])+'</ul></div>';
                tabs+='<div class="col s12 card-panel black-text blue lighten-4 " ><ul class="collection"> <li class="collection-header"><h5>Literals table</h5></li>'+printRealDic(response['litTable'][tempname])+'</ul></div>';
                tabs+='<div class="col s12 card-panel hoverable black-text blue lighten-4" ><ul class="collection"> <li class="collection-header"><h5>Global table</h5></li>'+printDic(response['globTable'][tempname])+'</ul></div>';
                tabs+= '</div>';
                tabs+='</div>';
              }
              tabs += '</div>';
              $('#pass2').html(tabs);
              $('ul.tabs').tabs();

              $('#linkText').html('<b> Linker Output: </b><br>'+response['lin'].replace(/\n/g,"<br>"));
            }
        });
  });

  function stackString(stack){
    output = '<b>STACK: </b><br>';
    for(i=0;i<stack.length;i++)
      {
        output+= stack[i]+'<br>';
      };
    return output;
  };

  $('#loadButton').click(function(){
    offset = $('#offset').val();
    $.ajax({
          type : "POST",
          url : "/loadSimulator",
          data: JSON.stringify({file: fileNames[0].split('.')[0], 'offset':parseInt(offset)}),
          contentType: 'application/json;charset=UTF-8',
          success: function(result) {

          response = $.parseJSON(result);
          $('#registers').html('<ul class="collection"> <li class="collection-header"><h5>Registers</h5></li>'+printDic(response['reg']))+'</ul>';
          $('#memlocs').html('<ul class="collection"> <li class="collection-header"><h5>Memory Locations</h5></li>'+printRealDic3(response['memory'],offset,parseInt(response['reg']['PC'])))+'</ul>';
          $('#varlocs').html('<ul class="collection"> <li class="collection-header"><h5>Variable Locations</h5></li>'+printRealDic2(response['memoryData']))+'</ul>';
          console.log(response['memoryData']);
          $('#currentInst').html('<b>CURRENT INSTRUCTION: </b>'+ response['memory'][response['reg']['PC']]);
         }
      });
  });

  $('#runButton').click(function(){
    $.ajax({
        type : "POST",
        url : "/runSimulator",
        // data: JSON.stringify({file: fileNames[0].split('.')[0]}),
        // contentType: 'application/json;charset=UTF-8',
        success: function(result) {
          response = $.parseJSON(result);
          $('#registers').html('<ul class="collection"> <li class="collection-header"><h5>Registers</h5></li>'+printDic(response['reg'])+'</ul>');
          $('#memlocs').html('<ul class="collection"> <li class="collection-header"><h5>Memory Locations</h5></li>'+printRealDic3(response['memory'],offset,parseInt(response['reg']['PC']))+'</ul>');
          $('#varlocs').html('<ul class="collection"> <li class="collection-header"><h5>Variable Locations</h5></li>'+printRealDic2(response['memoryData'])+'</ul>');
          console.log(response['memoryData']);
          $('#currentInst').html('<b> CURRENT INSTRUCTION: </b>'+ response['memory'][response['reg']['PC']]);
          // $('#stack').html(stackString(response['stack']));

       }
    });
  });

  $('.side-btn').click(function(){
  	var addressValue = $(this).attr("plink");
  	// alert(addressValue);
  	var idarr = ['input-files','pass1','pass2','linker','simulator','titleBox'];
  	for(i=0;i<idarr.length;i++)
  	{
  		if(idarr[i]!=addressValue)
  			$('#'+idarr[i]).hide();
  		else
  			$('#'+idarr[i]).show();
  	}
  });
})(jQuery);

// $('collection-item').click(function(){
//   $("body").css({"backgroundColor" : "blue"});
// })