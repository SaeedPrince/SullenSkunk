/*
Javascript code for the AngrySkunk web app
Author: Mohammad Saied Esmail Shoar - pg10mohammad@vfs.com May 2017
*/
'use strict';

// Constants
const AREA_COUNT = 8;
const MENU_BUTTON_COUNT = 3;
const MENU_BUTTON_HOME = 0;
const MENU_BUTTON_NEWGAME = 1;
const MENU_BUTTON_EDITOR = 2;
const EDITOR_BUTTON_COUNT = 3;
const EDITOR_BUTTON_LEVEL = 0;
const EDITOR_BUTTON_OBJECT = 1;
const EDITOR_BUTTON_BIRD = 2;
const EDITOR_LEVEL_BUTTON_COUNT = 5;
const EDITOR_LEVEL_NEW = 0;
const EDITOR_LEVEL_LOAD = 1;
const EDITOR_LEVEL_SAVE = 2;
const EDITOR_LEVEL_EDIT = 3;
const EDITOR_LEVEL_REMOVE = 4;
const EDITOR_OBJECT_BUTTON_COUNT = 5;
const EDITOR_OBJECT_NEW = 0;
const EDITOR_OBJECT_LOAD = 1;
const EDITOR_OBJECT_SAVE = 2;
const EDITOR_OBJECT_EDIT = 3;
const EDITOR_OBJECT_REMOVE = 4;
const EDITOR_OBJECT_SHAPE_COUNT = 4;
const EDITOR_OBJECT_TEXTURE_COUNT = 4;
const EDITOR_BIRD_BUTTON_COUNT = 5;
const EDITOR_BIRD_NEW = 0;
const EDITOR_BIRD_LOAD = 1;
const EDITOR_BIRD_SAVE = 2;
const EDITOR_BIRD_EDIT = 3;
const EDITOR_BIRD_REMOVE = 4;
const SERVER_URL = "http://localhost:8888/AngrySkunk/server.php";
const SERVER_READYSTATE_UNINITIALIZED = 0;
const SERVER_READYSTATE_LOADING = 1;
const SERVER_READYSTATE_LOADED = 2;
const SERVER_READYSTATE_INTERACTIVE = 3;
const SERVER_READYSTATE_COMPLETE = 4;

class mObject
{
  // Shape, Size, Mass, Texture, Bounciness

  constructor(lAction, lShape, lWidth, lHeight, lMass, lTexture, lBounciness)
  {
    this._MakeSaveForm();
    this._AddInput("Command", "Action", lAction);
    this._AddInput("Object", "Shape", lShape);
    this._AddInput('Object', 'Width', lWidth);
    this._AddInput('Object', 'Height', lHeight);
    this._AddInput('Object', 'Mass', lMass);
    this._AddInput('Object', 'Texture', lTexture);
    this._AddInput('Object', 'Bounciness', lBounciness);
  }

  _MakeSaveForm()
  {
    this.SaveForm=document.createElement('FORM');
    this.SaveForm.name='SaveForm';
    this.SaveForm.method='POST';
    this.SaveForm.action=SERVER_URL;
    document.body.appendChild(this.SaveForm);
  }

  _AddInput(lType, lName, lValue)
  {
    let SaveInput=document.createElement('INPUT');
    SaveInput.type=lType;
    SaveInput.name=lName;
    SaveInput.value=lValue;
    this.SaveForm.appendChild(SaveInput);
  }
}

// App class controls and wraps everything
class mApp
{
  // Constructor
  constructor()
  {

    // Class variables

    // Game flows via menu

    this._CreateAreas();
    this._LoadMenu();
    this._AddListenerMenu();
    this._SetMenuButtonVisible(MENU_BUTTON_HOME);
    this._LoadHomeMarkup();
  }

  _LoadRemoveBirdMarkup()
  {

  }

  _LoadEditBirdMarkup()
  {

  }

  _LoadSaveBirdMarkup()
  {

  }

  _LoadLoadBirdMarkup()
  {

  }

  _LoadNewBirdMarkup()
  {

  }

  _LoadRemoveObjectMarkup()
  {

  }

  _LoadEditObjectMarkup()
  {

  }

  _LoadSaveObjectMarkup()
  {
    let Option0 = document.querySelector("#Option0");
    let inpShape = Option0.options[Option0.selectedIndex].text;
    let inpWidth = document.getElementById("ObjectWidthSpan").innerHTML;
    let inpHeight = document.getElementById("ObjectHeightSpan").innerHTML;
    let inpMass = document.getElementById("ObjectMassSpan").innerHTML;
    let Option1 = document.querySelector("#Option1");
    let inpTexture = Option1.options[Option1.selectedIndex].text;
    let inpBounciness = document.getElementById("ObjectBouncinessSpan").innerHTML;
    let inpDOM = document.querySelector("#Area5");
    let inpObject = new mObject("Save", inpShape, inpWidth, inpHeight, inpMass, inpTexture, inpBounciness);
    inpObject.SaveForm.submit();
  }

  _LoadLoadObjectMarkup()
  {

  }

  _AddListenerNewObject()
  {
    let theElement1 = "";
    let theElement2 = "";
    let theElement3 = "";
    let theElement4 = "";
    theElement1 = document.getElementById("ObjectWidthRange");
    theElement1.addEventListener('change', ObjectEditorWidthRangeChange =>
    {
      document.getElementById("ObjectWidthSpan").innerHTML = theElement1.value;
    });
    theElement2 = document.getElementById("ObjectHeightRange");
    theElement2.addEventListener('change', ObjectEditorHeightRangeChange =>
    {
      document.getElementById("ObjectHeightSpan").innerHTML = theElement2.value;
    });
    theElement3 = document.getElementById("ObjectMassRange");
    theElement3.addEventListener('change', ObjectEditorMassRangeChange =>
    {
      document.getElementById("ObjectMassSpan").innerHTML = theElement3.value;
    });
    theElement4 = document.getElementById("ObjectBouncinessRange");
    theElement4.addEventListener('change', ObjectEditorBouncinessRangeChange =>
    {
      document.getElementById("ObjectBouncinessSpan").innerHTML = theElement4.value;
    });
  }

  _LoadNewObjectMarkup()
  {
    let markup = "";
    let pText = ["Shape","Size","Mass","Texture","Bounciness"];
    let ShapeCombo = ["Square","Rectangle","Circle","Ellipse"];
    let TextureCombo = ["Forest","Beach","Mountain","Town"];
    for (let i=0; i<pText.length;i++)
    {
      markup += '<p class="Block'+ i + '">'+ pText[i] +':</p>';
      if (i==0)
      {
        markup += '<select id="Option0">';
        for (let j=0; j<EDITOR_OBJECT_SHAPE_COUNT; j++)
        {
          markup += '<option class="Block0" value="'+ ShapeCombo[j] + '">' + ShapeCombo[j] + '</option>';
        }
        markup += '</select><br/>';
      }
      else if (i==1)
      {
        markup += '<p class="Block1">Width:</p><input class="Block1" id="ObjectWidthRange" type="range" min="0" max="50" value="0" step="5"/>';
        markup += '<span id="ObjectWidthSpan" class="Block1">0</span>';
        markup += '<p class="Block1">&nbsp&nbspHeight:</p><input class="Block1" id="ObjectHeightRange" type="range" min="0" max="50" value="0" step="5"/>';
        markup += '<span id="ObjectHeightSpan" class="Block1">0</span><br/>';
      }
      else if (i==2)
      {
        markup += '<p class="Block2">Kilogram:</p><input class="Block2" id="ObjectMassRange" type="range" min="0" max="50" value="0" step="5"/>';
        markup += '<span id="ObjectMassSpan" class="Block2">0</span><br/><br/>';
      }
      if (i==3)
      {
        markup += '<select id="Option1">';
        for (let j=0; j<EDITOR_OBJECT_TEXTURE_COUNT; j++)
        {
          markup += '<option class="Block3" value="'+ TextureCombo[j] + '">' + TextureCombo[j] + '</option>';
        }
        markup += '</select><br/>';
      }
      else if (i==4)
      {
        markup += '<p class="Block4">Percentage:</p><input class="Block4" id="ObjectBouncinessRange" type="range" min="0" max="50" value="0" step="5"/>';
        markup += '<span id="ObjectBouncinessSpan" class="Block4">0</span><br/>';
      }
    }
    document.querySelector("#Area5").innerHTML = markup;
  }

  _LoadRemoveLevelMarkup()
  {

  }

  _LoadEditLevelMarkup()
  {

  }

  _LoadSaveLevelMarkup()
  {

  }

  _LoadLoadLevelMarkup()
  {

  }

  _LoadNewLevelMarkup()
  {
    /*
    let markup = "";
    let btnId = "";
    let btnFile = ["SetBackground","ObjectEditor","BirdEditor"];
    let btnName = ["Set Background","Object Editor","Bird Editor"];
    for (let col=0; col < EDITOR_BUTTON_COUNT; col++)
    {
      btnId = "btnEditor" + col;
      markup += '<img src="images/btn' + btnFile[col] + 'On.jpg" id=' + btnId + ' class="EditorButton">';
    }
    document.querySelector("#Area5").innerHTML = markup;
    */
  }

  _AddListenerBirdEditor()
  {

  }

  _LoadBirdEditorMarkup()
  {

  }

  _AddListenerObjectEditor()
  {
    let btnId = "";
    for (let col=0; col < EDITOR_OBJECT_BUTTON_COUNT; col++)
    {
      btnId = "btnObjectEditor" + col;
      document.getElementById(btnId).addEventListener('click', ObjectEditorMouseClick =>
      {
        switch(col)
        {
          case EDITOR_OBJECT_NEW:
            this._LoadNewObjectMarkup();
            this._AddListenerNewObject();
            break;
          case EDITOR_OBJECT_LOAD:

            break;
          case EDITOR_OBJECT_SAVE:
            this._LoadSaveObjectMarkup();
            break;
         case EDITOR_OBJECT_EDIT:

            break;
         case EDITOR_OBJECT_REMOVE:

            break;
        }
      });
    }
  }

  _LoadObjectEditorMarkup()
  {
    let markup = "";
    let btnId = "";
    let btnFile = ["NewObject","LoadObject","SaveObject","EditObject","RemoveObject"];
    let btnName = ["New Object","Load Object","Save Object","Edit Object","Remove Object"];
    for (let col=0; col < EDITOR_OBJECT_BUTTON_COUNT; col++)
    {
      btnId = "btnObjectEditor" + col;
      markup += '<img src="images/btn' + btnFile[col] + 'On.jpg" id=' + btnId + ' class="ObjectEditorButton">';
    }
    document.querySelector("#Area4").innerHTML = markup;
  }

  _AddListenerLevelEditor()
  {
    let btnId = "";
    for (let col=0; col < EDITOR_LEVEL_BUTTON_COUNT; col++)
    {
      btnId = "btnLevelEditor" + col;
      document.getElementById(btnId).addEventListener('click', LevelEditorMouseClick =>
      {
        switch(col)
        {
          case EDITOR_LEVEL_NEW:

            break;
          case EDITOR_LEVEL_LOAD:

            break;
          case EDITOR_LEVEL_SAVE:

            break;
         case EDITOR_LEVEL_EDIT:

            break;
         case EDITOR_LEVEL_REMOVE:

            break;
        }
      });
    }
  }

  _LoadLevelEditorMarkup()
  {
    let markup = "";
    let btnId = "";
    let btnFile = ["NewLevel","LoadLevel","SaveLevel","EditLevel","RemoveLevel"];
    let btnName = ["New Level","Load Level","Save Level","Edit Level","Remove Level"];
    for (let col=0; col < EDITOR_LEVEL_BUTTON_COUNT; col++)
    {
      btnId = "btnLevelEditor" + col;
      markup += '<img src="images/btn' + btnFile[col] + 'On.jpg" id=' + btnId + ' class="LevelEditorButton">';
    }
    document.querySelector("#Area4").innerHTML = markup;
  }

  _AddListenerEditor()
  {
    let btnId = "";
    for (let col=0; col < EDITOR_BUTTON_COUNT; col++)
    {
      btnId = "btnEditor" + col;
      document.getElementById(btnId).addEventListener('click', EditorMouseClick =>
      {
        switch(col)
        {
          case EDITOR_BUTTON_LEVEL:
            this._LoadLevelEditorMarkup();
            this._AddListenerLevelEditor();
            break;
          case EDITOR_BUTTON_OBJECT:
            this._LoadObjectEditorMarkup();
            this._AddListenerObjectEditor();
            break;
          case EDITOR_BUTTON_BIRD:

            break;
        }
      });
    }
  }

  _LoadEditorMarkup()
  {
    let markup = "";
    let btnId = "";
    let btnFile = ["LevelEditor","ObjectEditor","BirdEditor"];
    let btnName = ["Level Editor","Object Editor","Bird Editor"];
    for (let col=0; col < EDITOR_BUTTON_COUNT; col++)
    {
      btnId = "btnEditor" + col;
      markup += '<img src="images/btn' + btnFile[col] + 'On.jpg" id=' + btnId + ' class="EditorButton">';
    }
    document.querySelector("#Area3").innerHTML = markup;
  }

  _LoadNewGameMarkup()
  {

  }

  _LoadHomeMarkup()
  {

  }

  _SetMenuButtonVisible(index)
  {
    for (let i=0;i<MENU_BUTTON_COUNT;i++)
    {
      if (i==index)
      {
        document.getElementById("btnMenu" + i).style.visibility = "hidden";
      }
      else
      {
        document.getElementById("btnMenu" + i).style.visibility = "visible";
      }
    }
  }

  _AddListenerMenu()
  {
    let btnId = "";
    for (let col=0; col < MENU_BUTTON_COUNT; col++)
    {
      btnId = "btnMenu" + col;
      document.getElementById(btnId).addEventListener('click', MenuMouseClick =>
      {
        this._SetMenuButtonVisible(col);
        switch(col)
        {
          case MENU_BUTTON_HOME:
            this._LoadHomeMarkup();
            break;
          case MENU_BUTTON_NEWGAME:
            this._LoadNewGameMarkup();
            break;
          case MENU_BUTTON_EDITOR:
            this._LoadEditorMarkup();
            this._AddListenerEditor();
            break;
        }
      });
    }
  }

  // Create menu and menu buttons
  _LoadMenu()
  {
    let btnFile = ["Home","NewGame","Editor"];
    let btnName = ["Home","New Game","Editor"];
    let btnId = "";
    let markup = "";
    for (let col=0; col < MENU_BUTTON_COUNT; col++)
    {
      btnId = "btnMenu" + col;
      markup += '<img src="images/btn' + btnFile[col] + 'On.jpg" id=' + btnId + ' class="MenuButton">';
    }
    document.querySelector("#Area2").innerHTML = markup;
    //this.MenuMarkUp = markup;
  }

  // Create and assign areas
  _CreateAreas()
  {
    let markup = "";
    for (let i=0 ; i < AREA_COUNT ; i++)
    {
      markup += '<div id="Area' + i + '" class="Area"></div>';
    }
    document.querySelector("#Wrap").innerHTML = markup;
  }
}

class mResponse
{
  constructor(lhttpReq, lmessage)
  {
    this.httpReq = lhttpReq;
    this.message = lmessage;
  }
}

class mSaver
{
  constructor(lObject, lUrl)
  {
    this.Object = lObject.PostString;
    this.Url = lUrl;
    let msg = "";
    if (window.XMLHttpRequest)
    {
       this.httpReq = new XMLHttpRequest();
    }
    else
    {
       this.httpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    this.httpReq.addEventListener('readystatechange', ReadyStateChange =>
    {
      console.log(this.httpReq.readyState);
      switch(this.httpReq.readyState)
      {
        case SERVER_READYSTATE_LOADING:
          this.httpReq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          this.httpReq.send(this.Object);
          break;
        case SERVER_READYSTATE_COMPLETE:
          document.querySelector("#Area5").innerHTML = "Done";
          document.querySelector("#Area6").innerHTML = this.httpReq.responseText;
          console.log(this.httpReq.status);
          console.log(this.httpReq.responseText);
          break;
      }
    });
  }

  OpenServer()
  {
    this.httpReq.open("POST", this.Url, true);
  }
}

let app = new mApp();
