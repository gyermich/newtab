 $(function(){
   var widgets = [];

   function biggestIcon(icons) {
    var biggest = 0;
    var size = 0;
    for( var i in icons) {
      if(icons[i].size > size) {
        size = icons[i].size;
        biggest = i;
      }
    }
    return biggest;
   }

   function apps(extensionInfos){


     for ( var xi in extensionInfos ){
       if (extensionInfos[xi].isApp) {
         i = biggestIcon(extensionInfos[xi].icons);

         gridster.add_widget('<div class="title"><li class="new" id="'+
                            extensionInfos[xi].id +
                            '" "><img id="'+ extensionInfos[xi].id +
                            '" src=' +
                            extensionInfos[xi].icons[i].url +
                            '></br>' +
                            extensionInfos[xi].shortName +
                            '</li></div>', 2,2);
        }
     }
   }


    chrome.management.getAll(apps);

    var dragged = false;

      $(this).on('mouseup', function(ev){
        if (dragged) {
          dragged = false;
        }
        else {
          launchApp(ev.target.id);
        }
      });
      $(this).on('mousemove', function(ev){
        dragged = true;
        });


    function launchApp(appID) {
      chrome.management.launchApp(appID);
      window.close();
    }

      gridster = $(".gridster > ul").gridster({
          widget_margins: [5, 5],
          widget_base_dimensions: [100, 55]
      }).data('gridster');

    });