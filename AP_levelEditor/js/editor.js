/* Class Editor that implements editor navigation controls */
class Editor {

  constructor() {
    this.box   = $('.obj-box');
    this.canon = $('.obj-canon');
    this.bee   = $('.obj-bee');
    this.obj = {
        type: "",
        x: 0,
        y: 0,
        width:  0,
        height: 0,
    };
    this.saveData = $('.save-data');
    this.level = {
      lvlname: "",
      objBee: [],
      objBox: [],
      lvlBackground: ""
    }
  }

  /* Event handler to create objetcs for the scene on click event */
  createObj(event){

    /* Box */
    this.box.click(() => {
      var currentBox = this.box.clone().appendTo($('.sceneBG'));
      currentBox.addClass("draggable").draggable({
        containment: ".sceneBG"
      });
      /* get current object data */
      this.obj.type = "canon";
      this.obj.width  = $(currentBox).width();
      $('input[name="Width"]').val(this.obj.width);
      this.obj.height = $(currentBox).height();
      $('input[name="Height"]').val(this.obj.height);
      this.obj.left   = $(currentBox).position().left;
      $('input[name="xPos"]').val(this.obj.left);
      this.obj.top    = $(currentBox).position().top;
      $('input[name="yPos"]').val(this.obj.top);
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
  }

  /* Event handler to get information about all objects in the scene */
  InfoObj(event) {
    this.saveData.click(() => {
      /*
      add this.level.lvlname
      add canon position x and y
       add for loop for objBee and objBox
       obj must contain id, width, heigh, x, y
       objBee[i] = beeObj create inside to store many cloned itens

      */
    });
  }



  /* function to add background image from PC */
  readURL(event){
  	var getImagePath = URL.createObjectURL(event.target.files[0]);
  	$('.sceneBG').css('background-image', 'url(' + getImagePath + ')');
  }
}

let appEditor = new Editor();
