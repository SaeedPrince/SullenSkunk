
class GameObjects{
  constructor(object_type, id, pos_x, pos_y, width, height){

  }

  _makeObjects(object_type, setid, xpos, ypos, w, h ){

    this.id = object_type + setid;
    this.pos_x = xpos;
    this.pos_y = ypos;
    this.width = w;
    this.height = h;

  }
}

var level={}


level.blocks = [];
level.bird = [];
levle.cannon = [];
