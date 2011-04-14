;(function($) {

  $.modal = function() {

    var args = arguments;
    var opts = {};
    var callback = arguments[2] || function() { };

    if ( args[1] && typeof(args[1]) == "object" ) {
      opts = args[1];
    }
    
    if ( args[1] && typeof(args[1]) == "function" ) {
      callback = args[1];
    }

    if ( typeof(args[0]) == "object" ) {
      opts['target'] = args[0];
    }

    if( !opts['target'] ) {
      if ( isHTTPRequest() == 0 ) {
        opts['iframe'] = true;
      }
      opts['href'] = args[0];
    }

    var config = $.extend({
      height: 300,
      width: 400,
      iframe : false,
    }, opts);
    

    function isHTTPRequest() {
      return args[0].indexOf("http://");
    }

    function removeModal() {
      $("#modal-overlay, #modal-container").remove();
    }

    function createOverlay() {
      $("<div />").attr({
          'id' : 'modal-overlay'
        }).css({
          'width' : $(document).width(),
          'height' : $(document).height(),
          'position' : 'absolute',
          'top' : 0,
          'left' : 0,
        }).bind("click", function(e) {
          removeModal();
        }).appendTo("body");
    }

    function calculateLeftPos() {
      return (parseInt($(window).width()/2)) - (parseInt(config.width/2));
    }

    function calculateTopPos() {
      return '10%';
    }

    function createContainer() {
      $("<div />").attr({
        'id' : 'modal-container'
      }).css({
        'width' : config.width,
        'height' : config.height,
        'position' : 'absolute',
        'left' : calculateLeftPos(),
        'top' : calculateTopPos(),
        'z-index' : 1000000
      }).hide().appendTo("body");
    }

    function createiFrame() {
      $("<iframe />").attr({
        'src' : config.href,
        'frameborder' : 0,
        'width' : '100%',
        'height' : '100%',
        'scrolling' : 'no'
      }).appendTo("#modal-container").load(callback);

    };

    removeModal();
    createOverlay();
    createContainer();
    if( config.iframe ) {
      createiFrame();
    } else {
      if ( config.href ) {
        $("#modal-container").get(config.href, callback);
      } else {
        $("#modal-container").append(config.target);
        callback();
      }
    }
    
    $("#modal-container").fadeIn();

    $(window).bind('resize', function() {
      $("#modal-overlay").css({
        'width' : '100%',
        'height' : '100%'
      });
      $("#modal-container").css({
        'left' : calculateLeftPos()
      });
    });
  };

})(jQuery);
