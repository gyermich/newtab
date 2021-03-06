  (function($, window){
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

     function launchApp(appID) {
       chrome.management.launchApp(appID);
       window.close();
     }

    $(function(){
     var widgets = [],
         dragged = false;
         extIds = [];

    var gridster = $(".gridster > ul").gridster({
         widget_margins: [5, 5],
         widget_base_dimensions: [100, 55],
          serialize_params: function($w, wgd) {
             return {
                 x: wgd.col,
                 y: wgd.row,
                 width: wgd.size_x,
                 height: wgd.size_y,
                 id: $($w).attr('id'),
                 class: $($w).attr('class'),
                 html: $($w)[0].innerHTML,
             };
         },

         draggable: {
                     start: function(event, ui) {
                                dragged = true;
                        },
                     stop: function(event, ui){
                       dragged = false;
                       $oWidgets = this.serialize();
                       localStorage.removeItem("orderedArr");
                       localStorage.setItem("orderedArr", JSON.stringify($oWidgets));
                     }
                 }

     }).data('gridster');

    function gridster_widget(extensionInfo){
      var i = biggestIcon(extensionInfo.icons);
      gridster.add_widget('<li class="new" id="'+
                         extensionInfo.id +
                         '" "><img id="'+ extensionInfo.id +
                         '" src=' +
                         extensionInfo.icons[i].url +
                         '><br>' +
                         extensionInfo.shortName +
                         '</li>', 2,2);
    }

    if (localStorage.getItem('orderedArr') !== null) {
      var json = JSON.parse(localStorage.getItem('orderedArr'));
      var lsIds = json.map(function(el){
        return el.id;
      });
        for (var i = 0; i < json.length; i++) {
          gridster.add_widget('<li class="new" id="'+
                                      json[i]['id']+
                             '" ">' + json[i]['html'] +
                             '</li>', json[i]['width'],
                                      json[i]['height'],
                                      json[i]['x'],
                                      json[i]['y']
                             );
        }

        chrome.management.getAll( function(extensionInfos){
          extensionInfos.forEach(function(xi){
            if(xi.isApp){
              extIds.push(xi.id);
            }
          });
          return extIds;
        });

          chrome.management.getAll( function(extensionInfos){
          extensionInfos.forEach(function(xi) {
            if (xi.isApp) {
                if (lsIds.indexOf(xi.id) < 0) {
                  gridster_widget(xi);
                }
             }
          });
          json.forEach(function(el, index){
            if (extIds.indexOf(el.id) < 0){
               gridster.remove_widget( $('.gridster li#' + el.id));
               $oWidgets = gridster.serialize();
               localStorage.removeItem("orderedArr");
               localStorage.setItem("orderedArr", JSON.stringify($oWidgets));
            }
          });
        });
      } else {
        chrome.management.getAll(function(extensionInfos){
          extensionInfos.forEach(function(xi) {
         if (xi.isApp) {
            gridster_widget(xi);
          }
       });
     });
    }
      $('body').on('mouseup', 'li', function(ev){
        if (!dragged) {
          launchApp(ev.target.id);
        }
    });
  });
 })( jQuery, this );