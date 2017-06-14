/* Class Editor that implements editor navigation controls */
class Editor {

  constructor() {
    this.box   = $('.obj-box');
    this.canon = $('.obj-canon');
    this.bee   = $('.obj-bee');
    this.save  = $('.submitBtn');
    this.obj = {
        type: "",
        x: 0,
        y: 0,
        width:  0,
        height: 0,
    };
  }

  /* Event handler to create objetcs for the scene on click event */
  createObj(event){
    let boxCount = 1;
    /* Box */
    this.box.click(() => {
      var currentBox = this.box.clone().appendTo($('.sceneBG'));
      currentBox.addClass("draggable").draggable({
        containment: ".sceneBG"
      });
      currentBox.attr("id", "box-" +boxCount);
      boxCount++;
        /* get current object data and show on fields */
      $(currentBox).mousedown(() => {
        this.obj.type = "box";
        this.obj.width  = $(currentBox).width();
        $('input[name="Width"]').val(this.obj.width);
        this.obj.height = $(currentBox).height();
        $('input[name="Height"]').val(this.obj.height);
        this.obj.left   = $(currentBox).position().left;
        $('input[name="xPos"]').val(this.obj.left);
        this.obj.top    = $(currentBox).position().top;
        $('input[name="yPos"]').val(this.obj.top);
      });
    });

    /* Canon */
    this.canon.click(() => {
      var currentCanon = this.canon.appendTo($('.sceneBG'));
      currentCanon.removeClass("objetcs");
      currentCanon.attr("id", "canon-update").draggable({
        containment: ".sceneBG"
      });
      /* get current object data */
      this.obj.type = "canon";
      this.obj.width  = $(this.canon).width();
      $('input[name="Width"]').val(this.obj.width);
      this.obj.height = $(this.canon).height();
      $('input[name="Height"]').val(this.obj.height);
      this.obj.left   = $(this.canon).position().left;
      $('input[name="xPos"]').val(this.obj.left);
      this.obj.top    = $(this.canon).position().top;
      $('input[name="yPos"]').val(this.obj.top);
    });

    /* Bee */
    this.bee.click(() => {
      var currentBee = this.bee.clone().appendTo($('.sceneBG'));
      currentBee.removeClass("objetcs");
      currentBee.attr("id", "bee-update");
      currentBee.addClass("draggable").draggable({
        containment: ".sceneBG"
      });
      /* get current object data */
      $(currentBee).mousedown(() => {
        this.obj.type = "bee";
        this.obj.width  = $(currentBee).width();
        $('input[name="Width"]').val(this.obj.width);
        this.obj.height = $(currentBee).height();
        $('input[name="Height"]').val(this.obj.height);
        this.obj.left   = $(currentBee).position().left;
        $('input[name="xPos"]').val(this.obj.left);
        this.obj.top    = $(currentBee).position().top;
        $('input[name="yPos"]').val(this.obj.top);
      });
    });
  }

  /* Event handler to save object data in the screen */
  saveObjtData(event) {
    this.save.click(() => {
  		var name = $('#inputName').val();
  		var values= $('#layerData').html();
  		var file_data = $('#getval').prop('files')[0];
  		var form_data = new FormData();
  		form_data.append('file', file_data);

  		if(name.trim() == '' ){
  			alert('Please enter level name.');
  			$('#inputName').focus();
  			return false;
  		}else{
  			$.ajax({
  				type:'POST',
  				url:'server/savejson.php',
  				data:'saveLevel=1&name='+name+'&data='+escape(values)+'&form_data='+form_data,
  				beforeSend: function () {
  					$('.submitBtn').attr("disabled","disabled");
  				},
  				success:function(msg){
  				}
  			});
  		}
    });
  }

  /* Event handler to get information about all objects in the scene */
  loadLevelData(event) {
    this.saveData.click(() => {

    });
  }



  /* function to add background image from PC */
  readURL(event){
  	var getImagePath = URL.createObjectURL(event.target.files[0]);
  	$('.sceneBG').css('background-image', 'url(' + getImagePath + ')');
		var myFormData = new FormData();
		myFormData.append('background-image', $('#getval').prop('files')[0]);

		$.ajax({
		  url: 'server/savebg.php',
		  type: 'POST',
		  processData: false, // important
		  contentType: false, // important
		  dataType : 'text',
		  data: myFormData,
		  success: function(response){
				$('.sceneBG').css('background-image', 'url(' + response + ')');
			}
		});
  }
}

let appEditor = new Editor();
