/**
 * App Singleton MAIN
 *
 * @summary:   Framework Singleton Class to contain a web app
 *
 */
var __private__ = new WeakMap();

class App {

  constructor() {
  	var local = { l : false  };
    __private__.set( this, local );

    /* My Editor functions */

    //create objects to the scene and turn them draggable
    appEditor.createObj();
    //save objects to a json file
    appEditor.saveObjtData();
    //load scene objects

  }
}
/* Main app instance */
let app = new App();
