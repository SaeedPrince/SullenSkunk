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
    appEditor.createObj();
    appEditor.InfoObj();

    /* need load level, save level, server implementation */
  }
}
/* Main app instance */
let app = new App();
