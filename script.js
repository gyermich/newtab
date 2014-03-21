 $(function(){
   var widgets = [],
       dragged = false;

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
                   class: $($w).attr('class'),
                   html: $($w)[0].innerHTML,
               };
           },

           draggable: {
                       start: function(event, ui) {
                                  dragged = true;
                          },
                       stop: function(event, ui){
                         $oWidgets = this.serialize();
                         localStorage.removeItem("orderedArr");
                         localStorage.setItem("orderedArr", JSON.stringify($oWidgets));
                       }
                   }

       }).data('gridster');


       // *   *   *   *   *   *   *   *   *   *   *   *   *
       //  * * * * * * * * * * * * * * * * * * * * * * * * *
       //   *   *   *   *   *   *   *   *   *   *   *   *   *

      //  check if the order is stored in localStorage
      if (localStorage.getItem('orderedArr') !== null) {
        //   first add_widget from saved order
        var json = JSON.parse(localStorage.getItem('orderedArr'));
          for (i = 0; i < json.length; i++) {

            gridster.add_widget('<li class="new" id="'+
                                        json[i]['id']+
                               '" ">' + json[i]['html'] +
                               '</li>', json[i]['width'],
                                        json[i]['height'],
                                        json[i]['x'],
                                        json[i]['y']
                               );
          }

      // compare widget id's and if id not there
        chrome.management.getAll( function(extensionInfos){
          console.log(extensionInfos);
          var appID;
          for ( var xi in extensionInfos ){
            if (extensionInfos[xi].isApp) {
              appID = extensionInfos[xi].id;
              for ( var x in json ){
                if (appID !== json[x]['id']) {
                  console.log(extensionInfos[xi].id );
                  // console.log(json[x]['id']);

                  // gridster_widget(extensionInfos[xi]);
                  }
                }
             }
          }

        });

        // if order is not stored in localstorage just render the apps
    } else {
      chrome.management.getAll(function(extensionInfos){
     for ( var xi in extensionInfos ){
       if (extensionInfos[xi].isApp) {
          gridster_widget(extensionInfos[xi]);
        }
     }
   });
  }

      //   TADA!


      // *   *   *   *   *   *   *   *   *   *   *   *   *
      //  * * * * * * * * * * * * * * * * * * * * * * * * *
      //   *   *   *   *   *   *   *   *   *   *   *   *   *

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

   function gridster_widget(extensionInfo){
     i = biggestIcon(extensionInfos[xi].icons);
     gridster.add_widget('<li class="new" id="'+
                        extensionInfo.id +
                        '" "><img id="'+ extensionInfo.id +
                        '" src=' +
                        extensionInfo.icons[i].url +
                        '><br>' +
                        extensionInfo.shortName +
                        '</li>', 2,2);
   }

    $(this).on('mouseup', function(ev){
      if (dragged) {
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
  });