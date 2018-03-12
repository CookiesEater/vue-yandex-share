class Script {
  constructor() {
    // Script is attached
    this.attached = false;
    // Script is loaded
    this.loaded = false;
    // Error while loading script
    this.error = false;
    // Callbacks stack from moment when script attached, but not loaded
    this.stack = [];
  }

  /**
   * Attach script. Returns promise to know when it will loaded.
   * @return {Promise}
   */
  attach() {
    return new Promise((resolve, reject) => {
      if (!this.attached) {
        const script = document.createElement('script');
        script.setAttribute('src', 'https://yastatic.net/share2/share.js');
        script.setAttribute('async', '');
        document.head.appendChild(script);
        script.onload = () => {
          resolve();
          this.loaded = true;
          this.stack.forEach((cb) => {
            cb[0]();
          });
          this.stack = [];
        };
        script.onerror = () => {
          reject();
          this.loaded = true;
          this.error = true;
          this.stack.forEach((cb) => {
            cb[1]();
          });
          this.stack = [];
        };
        this.attached = true;
      }

      if (this.error) {
        reject();
      }

      if (this.loaded) {
        resolve();
      } else {
        this.stack.push([resolve, reject]);
      }
    });
  }
}

export default new Script();
