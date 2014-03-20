 $(function(){
   var widgets = [];
   var dragged = false;

   // localStorage.setItem('string', "hello");

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

         extensionInfos

         gridster.add_widget('<li class="new" id="'+
                            extensionInfos[xi].id +
                            '" "><img id="'+ extensionInfos[xi].id +
                            '" src=' +
                            extensionInfos[xi].icons[i].url +
                            '></br>' +
                            extensionInfos[xi].shortName +
                            '</li>', 2,2);
        }
     }
   }


    chrome.management.getAll(apps);

      $(this).on('mouseup', function(ev){
        if (dragged) {
          // set_order();
          dragged = false;
        }
        else {
          launchApp(ev.target.id);
        }
      });

    function launchApp(appID) {
      chrome.management.launchApp(appID);
      window.close();
    }




      gridster = $(".gridster > ul").gridster({
          widget_margins: [5, 5],
          widget_base_dimensions: [100, 55],
              serialize_params: function($w, wgd) {
              return {
                  x: wgd.col,
                  y: wgd.row,
                  width: wgd.size_x,
                  height: wgd.size_y,
                  id: $($w).attr('id'),
                  class: $($w).attr('class')
              };
          },

          draggable: {
                      start: function(event, ui) {
                                 dragged = true;
                         },
                      stop: function(event, ui){
                        $oWidgets = this.serialize_changed();
                        // saveWidgets($oWidgets);
                        localStorage.setItem("orderedArr", JSON.stringify($oWidgets));
                        console.log($oWidgets)
                      }
                  }

      }).data('gridster');


      function set_order(){
        $( "li" ).each(function( index ) {
          // console.log( index + ": " + $( this ).text() );
        });
      }

    });