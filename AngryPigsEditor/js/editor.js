
 buzz.defaults.formats = ['wav'];
 var sounds = {
 MUSPlayLoop: new buzz.sound('sounds/Farm_8_bit',{
   loop:true,
   volume:5
 }),
 SFXError: new  buzz.sound('sounds/errorbeep',{
 }),
 SFXPlace: new buzz.sound('sounds/place',{
   volume:30
 })
};

sounds.MUSPlayLoop.play();
$('.draggable').css('cursor', 'move');
$('.button').css('cursor', 'pointer');

//save level
$("#saveWindow").dialog({
    autoOpen  : false,
    modal     : true,
    title     : "Save Level",
    buttons   : {
              'OK' : function() {
                  var textValue = $('#gameSaveTittle').val();
                  //get all objects in scene
                  let entities = $('.scene').children()
                   for (var i = 0; i < entities.length; i++) {
                     let ent = $(entities[i]);

                     let obj = {}
                     obj.x = ent.position().left;
                     obj.y = ent.position().top;


                       if (ent.id == block1) {
                       obj.background = ent.background-image

                       level.blocks.push(obj);

                     }
                     else if (ent.id=="block5")
                     {
                     obj.background = ent.background-image
                     level.bird.push(obj);
                    }

                  }//end of entity loop

                  var b = { "table":"customers", "limit":20 };
                   //json strigify the level and send to server to save
                  var data = JSON.strigify(b);


                  document.getElementById("properties").innerHTML = b;
                  alert('Level Saved as ' + '"' + textValue + '"');
                  //Now you have the value of the textbox, you can do something with it, maybe an AJAX call to your server!
              },
             }
});

// if button save is pressed open a new window
$('#save').click(function() {
    $("#saveWindow").dialog("open");
});

//allow only draggables into droppables
$( function() {
  $( ".draggable" ).draggable({revert: "invalid"});
  $( ".droppable" ).droppable({
    drop: function( event, ui ) {
      $( this )
        .addClass( "ui-state-highlight" )

          $(ui.draggable).appendTo(event.target)
          //let x = event.pageX - event.target.offsetLeft
        //  let y = event.pageY - event.target.offsetTop
          $(ui.draggable).css({
            "position" : "absolute"
            //"left" : x,
            // "top" : y
        });
          sounds.SFXPlace.play();
    }
  });
});

//reset the page
$('#reset').click(function(){
  location.reload();
});


//clone an object
/*
jQuery(function() {
    jQuery(".component").draggable({
        //  use a helper-clone that is append to 'body' so is not 'contained' by a pane
        helper: function() {
            return jQuery(this).clone().appendTo('body').css({
                'zIndex': 5
            });
        },
        cursor: 'move',
        containment: "document"
    });

    jQuery('.ui-layout-center').droppable({
        activeClass: 'ui-state-hover',
        accept: '.component',
        drop: function(event, ui) {
            if (!ui.draggable.hasClass("dropped"))
                jQuery(this).append(jQuery(ui.draggable).clone().addClass("dropped").draggable());
            }
        });
    });
*/
