(function ($) {
  $(document).ready(function($) {
    
    $('.group-title').each(function() {
      $('a', this).attr('href','/games/' + $(this).next().find('.qid').attr('data-qid'));
    
    })
    
    
    
  });
}) (jQuery);