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
                         console.log($oWidgets);
                       }
                   }

       }).data('gridster');


       // *   *   *   *   *   *   *   *   *   *   *   *   *
       //  * * * * * * * * * * * * * * * * * * * * * * * * *
       //   *   *   *   *   *   *   *   *   *   *   *   *   *



      //  OKOKoKOKOK

      //  soooooooo check if the order is stored in localStorage
      if (localStorage.getItem('orderedArr') !== null) {
        //  if it is
        //   first add_widget from saved order
      // something like this
      // ------|||---|||---|||---|||---
        var json = JSON.parse(localStorage.getItem('orderedArr'));
          for (i = 0; i < json.length; i++) {
            console.log(json[i]['id']);
            console.log(json[i]['html']);

            gridster.add_widget('<li class="new" id="'+
                                        json[i]['id']+
                               '" ">' + json[i]['html'] +
                               '</li>', json[i]['width'],
                                        json[i]['height'],
                                        json[i]['x'],
                                        json[i]['y']
                               );
          }
      //         grid.add_widget(
      //             '<div id="' + json[i]['id'] + '"></div>',
      //         json[i]['size_x'],
      //         json[i]['size_y'],
      //         json[i]['col'],
      //         json[i]['row']);
      //     }
      // -------___-------___-------___-------

      // THEN!!!! compare widget id's and if id not there
        chrome.management.getAll( function(extensionInfos){
          for ( var xi in extensionInfos ){
            for ( var x in json ){
              if (extensionInfos[xi].isApp) {
                if (extensionInfos[xi].id  != json[x]['id']) {

                  i = biggestIcon(extensionInfos[xi].icons);

                  // add_widget to gridster
                  // gridster.add_widget('<li class="new" id="'+
                  //                    extensionInfos[xi].id +
                  //                    '" "><img id="'+ extensionInfos[xi].id +
                  //                    '" src=' +
                  //                    extensionInfos[xi].icons[i].url +
                  //                    '></br>' +
                  //                    extensionInfos[xi].shortName +
                  //                    '</li>', 2,2);
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
         i = biggestIcon(extensionInfos[xi].icons);


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

   // function apps(extensionInfos){


   //   for ( var xi in extensionInfos ){
   //     if (extensionInfos[xi].isApp) {
   //       i = biggestIcon(extensionInfos[xi].icons);


   //       gridster.add_widget('<li class="new" id="'+
   //                          extensionInfos[xi].id +
   //                          '" "><img id="'+ extensionInfos[xi].id +
   //                          '" src=' +
   //                          extensionInfos[xi].icons[i].url +
   //                          '></br>' +
   //                          extensionInfos[xi].shortName +
   //                          '</li>', 2,2);
   //      }
   //   }
   // }


   //  chrome.management.getAll(apps);
    // order();

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







      // function set_order(){
      //   $( "li" ).each(function( index ) {
      //     // console.log( index + ": " + $( this ).text() );
      //   });
      // }


      // function order() {
      //   var orderedArr = [],
      //       savedOrder = localStorage.getItem('orderedArr');

      // if (savedOrder)
      //   orderedArr = JSON.parse(savedOrder);

      // if (orderedArr.length > 0) {
      //   for (var i = 0; i < orderedArr.length; i++) {
      //     for (var x = 0; x < gridster.Length; x++) {
      //       if (orderedArr[i] !== gridster[x]) {
      //         orderedArr.push(gridster[x]);
      //         console.log(orderedArr);
      //         }
      //       }

      //     }
      //   }
      //   else {
      //     orderedArr = gridster;
      //     localStorage.setItem('orderedArr', orderedArr);
      //   }
      //   return orderedArr;
      // }


    });