import EventEmitter from "events";

class EventManager extends EventEmitter   {
    static instance:EventManager;
    constructor() {
      super();
    }
    static getInstance() {
        if (!this.instance) {
          this.instance = new EventManager();
        }
    
        return this.instance;
      }
  }

  export default EventManager.getInstance();