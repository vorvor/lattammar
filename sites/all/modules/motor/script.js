(function ($) {
  $(document).ready(function($) {
    
    var ltxs = new Array();
    var ltys = new Array();
    var rbxs = new Array();
    var rbys = new Array();
    
    var ltxd;
    var ltyd;
    var rbxd;
    var rbyd;
    
    var selection;
    
    var imgHeight;
    
    $('.field-name-field-image-original .field-items').append('<div class="img_shadow"></div>');
    $('.field-name-field-image-modified .field-items').append('<div class="img_shadow"></div>');
    $('.field-name-field-image .field-items').append('<div class="img_shadow2"></div>');
    
    $('.field-name-field-image-original .field-items').prepend('<div class="img_sticker"></div>');
    $('.field-name-field-image-modified .field-items').prepend('<div class="img_sticker"></div>');
    $('.field-name-field-image .field-items').prepend('<div class="img_sticker"></div>');
    
    
    
    //$('.node-knowledge-crumb .field-name-body .field-item').prepend('<div id="knowledge_crumb_prefix">Tudtad?</div>');
    
    //$('#next_task_button a').html('<img src="/sites/all/themes/mftheme/images/next_button.png">');
    
    
    
    $('.field-name-field-image-original img').load(function(){
      imgHeight = $('.field-name-field-image-original img').height();
      console.log('VAR' + $('.field-name-field-image-original img').attr('height'));
    })
    

    
    
    if ($('body').hasClass('page-node-edit') && $('body').hasClass('node-type-game-find-difference')) {
      console.log('yep');
      $(".field-name-field-image-modified .image-widget-data").append('<div id="mouse"></div>');
      $('.field-name-field-image-modified img').mousemove(function(e){
        var parentOffset = $(this).parent().offset();
        var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
        var relativeYPosition = (e.pageY - parentOffset.top);
        $("#mouse").html("<p><strong>X-Position: </strong>"+relativeXPosition+" | <strong>Y-Position: </strong>"+relativeYPosition+"</p>")
      }).mouseout(function(){
          //$("#mouse").html("<p><strong>X-Position: </strong>"+relativeXPosition+" | <strong>Y-Position: </strong>"+relativeYPosition+"</p>")
      });
      
      
      /* $('.field-name-field-image-modified img').click(function(e) {
        var parentOffset = $(this).parent().offset();
        var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
        var relativeYPosition = (e.pageY - parentOffset.top);
        
        $('#field-difference-values tr').each(function() {
          if ($('.form-item:eq(0) input',this).attr('value') == '') {
            $('.form-item:eq(0) input',this).attr('value',relativeXPosition);
            $('.form-item:eq(1) input',this).attr('value',relativeYPosition);
            return false;
          } else if ($('.form-item:eq(2) input',this).attr('value') == '') {
            $('.form-item:eq(2) input',this).attr('value',relativeXPosition);
            $('.form-item:eq(3) input',this).attr('value',relativeYPosition);
            
            ltx = $('.form-item:eq(0) input',this).attr('value');
            lty = $('.form-item:eq(1) input',this).attr('value');
            rbx = $('.form-item:eq(2) input',this).attr('value');
            rby = $('.form-item:eq(3) input',this).attr('value');
            
            console.log('HOPP:' + ltx + ':' + lty + ':' + rbx + ':' + rby);
            
            $('.field-name-field-image-modified .image-preview').append('<div style="position:absolute;margin-left:' + ltx + 'px;margin-top:' + (lty-(imgHeight+5)) + 'px;width:' + (rbx-ltx) + 'px;height:' + (rby-lty) + 'px;border:1px solid red;"></div>');
            return false;
          }
        })
      })*/

      $('.field-name-field-image-modified img').imgAreaSelect({
        handles: true,
        onSelectEnd: function(img,selection) {
        var relativeXPosition = selection.x1; 
        var relativeYPosition = selection.y1;
        
        ch = $("#refresh_counter input[type='radio']:checked").val();
        console.log('#field-difference-values tr:nth('+ ch +') .form-item:eq(0) input');
        
        $('#field-difference-values tr:nth('+ ch +') .form-item:eq(0) input').attr('value',selection.x1);
        $('#field-difference-values tr:nth('+ ch +') .form-item:eq(1) input').attr('value',selection.y1);
        $('#field-difference-values tr:nth('+ ch +') .form-item:eq(2) input').attr('value',selection.x2);
        $('#field-difference-values tr:nth('+ ch +') .form-item:eq(3) input').attr('value',selection.y2);
        
        ltx = selection.x1;
        lty = selection.y1;
        rbx = selection.x2;
        rby = selection.y2;
        
        $('.field-name-field-image-modified .image-preview').append('<div style="position:absolute;margin-left:' + ltx + 'px;margin-top:' + (lty-(imgHeight+5)) + 'px;width:' + (rbx-ltx) + 'px;height:' + (rby-lty) + 'px;border:1px solid #ccc;"></div>');
        
        
        }
      });
      
      $('.form-item-title').append('<input type="button" value="edit differences ON" id="edit-diff">');
      $('#edit-diff').click(function() {
        if ($(this).attr('value') == 'edit differences ON') {
          $(this).attr('value','edit differences OFF');
          $('.node-game_find_difference-form  .field-name-field-image-modified').css('margin-top',$('.node-game_find_difference-form  .field-name-field-image-modified img').height() * -1 -63 + 'px').css('opacity','0.5');
          
        } else {
          $(this).attr('value','edit differences ON');
          $('.node-game_find_difference-form  .field-name-field-image-modified').css('margin-top','0px').css('opacity','1');
        }
      })
      
      console.log('L' + $('.field-name-field-difference').length);
      
      $(".field-name-field-image-modified .image-widget-data").append('<div id="refresh_counter"><div id="rbut">REFRESH</div><div id="coord_boxes"></div></div>');
      $('#refresh_counter #rbut').click(function() {
        console.log('FRESH');
        els = $('.field-name-field-difference tbody tr').length;
        $('#refresh_counter #coord_boxes').html('');
        for (c=0; c<els; c++) {
          $('#refresh_counter #coord_boxes').append('<input type="radio" name="coords" value="' + (c + 1) + '">' + (c + 1) + '<br />');
        }
      })
      
      
      $('.field-name-field-difference tr.draggable').each(function(index) {
        ltx = $('.field-name-field-left-top-x .form-text',this).attr('value');
        lty = $('.field-name-field-left-top-y .form-text',this).attr('value');
        rbx = $('.field-name-field-right-bottom-x .form-text',this).attr('value');
        rby = $('.field-name-field-right-bottom-y .form-text',this).attr('value');
        
        console.log(index + ':' + ltx + ':' + lty + ':' + rbx + ':' + rby);
        
        $('.field-name-field-image-modified .image-preview').append('<div style="position:absolute;margin-left:' + ltx + 'px;margin-top:' + (lty-259) + 'px;width:' + (rbx-ltx) + 'px;height:' + (rby-lty) + 'px;border:1px solid #ccc;"></div>');
        
        })
    }
    
    if ($('body').hasClass('page-game-spot-difference') || $('#game_type').attr('type') == 'game_find_difference') {
      diffs = $('.field-name-field-difference > .field-items').children().length;
      console.log('DIFFS' + diffs);
      $('#diffs').html(diffs);
      $('.field-name-field-difference .field-item').each(function(index) {
        var ltx = $('.entity .field-name-field-left-top-x .field-item',this).html();
        var lty = $('.entity .field-name-field-left-top-y .field-item',this).html();
        var rbx = $('.entity .field-name-field-right-bottom-x .field-item',this).html();
        var rby = $('.entity .field-name-field-right-bottom-y .field-item',this).html();
        
        
        
        if (ltx !== null) {
          console.log(index + ':' + ltx + ':' + lty + ':' + rbx + ':' + rby);
          
          $('.field-name-field-image-original img').load(function(){
            var imgHeight = $('.field-name-field-image-original img').height();
            console.log('IMG' + imgHeight);
            //$('.field-name-field-image-modified .field-item').append('<div style="position:absolute;margin-left:' + ltx + 'px;margin-top:' + (lty-(imgHeight+5)) + 'px;width:' + (rbx-ltx) + 'px;height:' + (rby-lty) + 'px;border:1px solid red;">' + ((index/5)+1) + '</div>');
            //$('.field-name-field-image-original .field-item').append('<div style="position:absolute;margin-left:' + ltx + 'px;margin-top:' + (lty-(imgHeight+5)) + 'px;width:' + (rbx-ltx) + 'px;height:' + (rby-lty) + 'px;border:1px solid red;">' + ((index/5)+1) + '</div>');
            $('.field-name-field-image-modified .field-item').append('<div class="resp_surface" style="position:absolute;margin-left:' + ltx + 'px;margin-top:' + (lty-(imgHeight+5)) + 'px;width:' + (rbx-ltx) + 'px;height:' + (rby-lty) + 'px;"></div>');
            $('.field-name-field-image-original .field-item').append('<div class="resp_surface" style="position:absolute;margin-left:' + ltx + 'px;margin-top:' + (lty-(imgHeight+5)) + 'px;width:' + (rbx-ltx) + 'px;height:' + (rby-lty) + 'px;"></div>');

          })
          
          
          ltxs.push(ltx);
          ltys.push(lty);
          rbxs.push(rbx);
          rbys.push(rby);
        }
        
      })
      
      $('.field-name-field-image-original').click(function() {
        $('#num_of_click').html($('#num_of_click').html()*1+1);
      })
      
      
      
      $('.field-name-field-image-original .field-item').click(function(e){
        var parentOffset = $(this).parent().offset();
        var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
        var relativeYPosition = (e.pageY - parentOffset.top);
        //console.log("<p><strong>X-Position: </strong>"+relativeXPosition+" | <strong>Y-Position: </strong>"+relativeYPosition+"</p>");
        found = 0;
        
        for (i = 0; i < ltxs.length; i++) {
          if (relativeXPosition > ltxs[i] && relativeXPosition < rbxs[i] && relativeYPosition > ltys[i] && relativeYPosition < rbys[i]) {
            console.log('yepp!' + imgHeight);
            found = 1;
            $('.field-name-field-image-original .field-item').append('<div style="position:absolute;margin-left:' + ltxs[i] + 'px;margin-top:' + (ltys[i]-(imgHeight+5)) + 'px;width:' + (rbxs[i]-ltxs[i]) + 'px;height:' + (rbys[i]-ltys[i]) + 'px;border:4px solid red;"></div>');
            ltxs.splice(i,1);
            ltys.splice(i,1);
            rbxs.splice(i,1);
            rbys.splice(i,1);
            
            
            diffBack = parseInt($('#diffs').html()) -1;
            $('#diffs').html(diffBack);
            
            $('#num_of_click').html($('#num_of_click').html()*1-1);
            
            if (diffBack == 0) {
              datastring = 'nid=' + $('#task_nid').attr('value') + '&qid=' + $('#game_nid').attr('value');
              console.log(datastring);
              $.ajax({  
                type: "POST",  
                url: "/ajaxify/task_completed",  
                data: datastring,
                
                success: function(databack) {
                  
                  $('#ajax').html(databack);
                  self.location = '/game';
                  
                }  
              });
            } 
            
          } else {
            console.log('nope :(');
            console.log(relativeXPosition + ':' + relativeYPosition + '|' + ':' + ltxs[i] + ':' + ltys[i] + ':' + rbxs[i] + ':' + rbys[i]);
          }
        };
        
        
        
      })
    }
    
    //FIND DETAIL
    
    if ($('.overlay form').hasClass('node-game_find_detail-form')) {
      console.log('yep');
      $(".field-name-field-image-original .image-widget-data").append('<div id="mouse"></div>');
      $('.field-name-field-image-original img').mousemove(function(e){
        var parentOffset = $(this).parent().offset();
        var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
        var relativeYPosition = (e.pageY - parentOffset.top);
        $("#mouse").html("<p><strong>X-Position: </strong>"+relativeXPosition+" | <strong>Y-Position: </strong>"+relativeYPosition+"</p>")
      }).mouseout(function(){
          $("#mouse").html("<p><strong>X-Position: </strong>"+relativeXPosition+" | <strong>Y-Position: </strong>"+relativeYPosition+"</p>")
      });
    }
    
    
    
    
    
    
    
    if ($('body').hasClass('page-game-find-detail') || $('#game_type').attr('type') == 'game_find_detail') {
      
      $('.field-name-field-detail .field-item').each(function(index) {
        ltxd = $('.entity .field-name-field-left-top-x .field-item',this).html();
        ltyd = $('.entity .field-name-field-left-top-y .field-item',this).html();
        rbxd = $('.entity .field-name-field-right-bottom-x .field-item',this).html();
        rbyd = $('.entity .field-name-field-right-bottom-y .field-item',this).html();
        
        if (ltxd !== null) {
          ltxdd = ltxd;
          ltydd = ltyd;
          rbxdd = rbxd;
          rbydd = rbyd;
        }
        
        

      })
      
      $('.field-name-field-image-original').click(function() {
        $('#num_of_click').html($('#num_of_click').html()*1+1);  
      })
      
      
      
      $('.field-name-field-image-original .field-item').click(function(e){
        var parentOffset = $(this).parent().offset();
        var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
        var relativeYPosition = (e.pageY - parentOffset.top);
        //console.log("<p><strong>X-Position: </strong>"+relativeXPosition+" | <strong>Y-Position: </strong>"+relativeYPosition+"</p>");
        if (relativeXPosition > ltxdd && relativeXPosition < rbxdd && relativeYPosition > ltydd && relativeYPosition < rbydd) {
            console.log('yepp!');
            found = 1;
            $('.field-name-field-image-original .field-item').append('<div style="position:absolute;margin-left:' + ltxdd+ 'px;margin-top:' + (ltydd-(imgHeight+5)) + 'px;width:' + (rbxdd-ltxdd) + 'px;height:' + (rbydd-ltydd) + 'px;border:4px solid red;"></div>');


              console.log('YAY! :)');
              $('#num_of_click').html($('#num_of_click').html()*1-1); 
              
              //datastring = 'nid=' + $('#game_nid').attr('value');
              datastring = 'nid=' + $('#task_nid').attr('value') + '&qid=' + $('#game_nid').attr('value');
              $.ajax({  
                type: "POST",  
                url: "/ajaxify/task_completed",  
                data: datastring,
                
                success: function(databack) {
                  $('#ajax').html(databack);
                  self.location = '/game'; //***
                  
                }  
              });

            
          } else {
            console.log('nope :(');
            console.log(relativeXPosition + ':' + relativeYPosition + '|' + ':' + ltxdd + ':' + ltydd + ':' + rbxdd + ':' + rbydd);
          }

        
        
        
      })
    }
    
    $('#next_task_button').click(function() {
      datastring = 'nid=' + $('#task_nid').attr('value') + '&qid=' + $('#game_nid').attr('value');
      $.ajax({  
        type: "POST",  
        url: "/ajaxify/shift",
        data: datastring,
        success: function(databack) {
          $('#ajax').html('shift');
          self.location = '/game';
          
        }  
      });
    })
    
    if ($('.field-name-field-image-original img').length > 0) {
      
    
      imgSrc = $('.field-name-field-image-original img').attr('src');
      imgSrc2 = $('.field-name-field-image-modified img').attr('src');
      parts = imgSrc.split('.');
      type = parts[1];
      if (type == 'gif') {
        parts2 = imgSrc.split('/');
        parts3 = imgSrc2.split('/');
        filename1 = parts2[parts2.length-1];
        filename2 = parts3[parts2.length-1];
        path = '';
        for (c=0;c<parts2.length;c++) {
          path+=parts2[c]+'/';
          if (parts2[c] == 'files') {
            break;
          }
          
          
        }
        
        
        $('.field-name-field-image-original img').attr('src',path+filename1);
        $('.field-name-field-image-modified img').attr('src',path+filename2);
      }
    }
    
    
    $('#diffs').hover(function() {
      $('.resp_surface').css('border','1px solid #ccc');
    },
    function() {
      $('.resp_surface').css('border','none');
    }
    )
    
  });
}) (jQuery);