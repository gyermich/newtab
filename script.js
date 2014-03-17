 $(function(){
   var widgets = [];
   var appList = [];
   var orderedArr = [];


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

    // check if ordered array exists, push the rest of them into an array

     for ( var xi in extensionInfos ){
      i = biggestIcon(extensionInfos[xi].icons);

       if (extensionInfos[xi].isApp) {
         appList.push('<div class="drag"><li class="new" id="'+
                              extensionInfos[xi].id +
                              '" "><img id="'+ extensionInfos[xi].id +
                              '" src=' +
                              extensionInfos[xi].icons[i].url +
                              '></br>' +
                              extensionInfos[xi].shortName +
                              '</li></div>', 2,2);
         console.log(applist);
        }
     }
     order();
     for ( var x = 0;  x < orderedArr.length; x++){
      gridster.add_widget(orderedArr[x]);
       }
   }


    chrome.management.getAll(apps);


    function order() {
      var savedOrder = localStorage.getItem('orderedArr');
          alert('im here');

    if (savedOrder)
      orderedArr = savedOrder.split(',');

    if (orderedArr.length > 0) {
      for (var i = 0; i < orderedArr.length; i++) {
        for (var x = 0; x < appList.Length; x++) {
          if (orderedArr[i] !== appList[x]) {
            orderedArr.push(appList[x]);
            console.log(orderedArr);
            }
          }

        }
      }
      else {
        orderedArr = appList;
        localStorage.setItem('orderedArr', orderedArr);
      }
      return orderedArr;
    }


    // $('.title').mousedown(function(event){
    //   event.stopPropagation();
    // });

   //  var dragging = 0;

   //  $('.drag').mousedown(function() {
   //      $(document).mousemove(function(){
   //         dragging = 1;
   //      });
   //  });

   //  $(document).mouseup(function(){
   //      dragging = 0;
   //      $(document).unbind('mousemove');
   //  });

   // $(this).on('click', function(ev){
   //      if (dragging === 0){
   //      launchApp(ev.target.id);
   //      }
   //      else {
   //        return false;
   //      }
   //  });


      $(this).on('click', function(ev){
        launchApp(ev.target.id);
      });

 // $('.drag').draggable({
 //     start: function(event, ui) {
 //         $(this).addClass('noclick');
 //     }
 // });

 // $('.drag').click(function(event) {
 //     if ($(this).hasClass('noclick')) {
 //         $(this).removeClass('noclick');
 //     }
 //     else {
 //         // actual click event code
 //           launchApp(event.target.id);
 //     }
 // });


    function launchApp(appID) {
      chrome.management.launchApp(appID);
      window.close();
    }

      gridster = $(".gridster > ul").gridster({
          widget_margins: [5, 5],
          widget_base_dimensions: [100, 55]
      }).data('gridster');

    });

