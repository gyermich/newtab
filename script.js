 $(function(){
   var widgets = [],
       dragged = false;
       // orderedArr = localStorage.getItem('orderedArr');
       // orderedArr = JSON.parse(orderedArr);

       // console.log(orderedArr);


       // *   *   *   *   *   *   *   *   *   *   *   *   *
       //  * * * * * * * * * * * * * * * * * * * * * * * * *
       //   *   *   *   *   *   *   *   *   *   *   *   *   *



      //  OKOKoKOKOK

      //  soooooooo check if the order is stored in localStorage
      //  if it is
      //   first add_widget from saved order
      // something like this
      // ------|||---|||---|||---|||---
      // var json = JSON.parse(localStorage.getItem('orderedArr'));
      // for (i = 0; i < json.length; i++) {
      //         grid.add_widget(
      //             '<div id="' + json[i]['id'] + '"></div>',
      //         json[i]['size_x'],
      //         json[i]['size_y'],
      //         json[i]['col'],
      //         json[i]['row']);
      //     }
      // -------___-------___-------___-------

      // THEN!!!! compare widget id's and if id not there
      // add_widget to gridster


      // if order is not stored in localstorage just render the apps
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

   function apps(extensionInfos){


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
   }


    chrome.management.getAll(apps);
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




      gridster = $(".gridster > ul").gridster({
          widget_margins: [5, 5],
          widget_base_dimensions: [100, 55],
              serialize_params: function($w, wgd) {
                console.log($w, wgd);
              return {
                  x: wgd.col,
                  y: wgd.row,
                  width: wgd.size_x,
                  height: wgd.size_y,
                  id: $($w).attr('id'),
                  class: $($w).attr('class')
                  // id: "aohghmighlieiainnegkcijnfilokake"
                  // innerHTML: "<img id="aohghmighlieiainnegkcijnfilokake" src="chrome://extension-icon/aohghmighlieiainnegkcijnfilokake/128/0"><br>Google Docs"
                  // innerText: "↵Google Docs"
                  // textContent: "Google Docs"
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
                        console.log($oWidgets);
                      }
                  }

      }).data('gridster');


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