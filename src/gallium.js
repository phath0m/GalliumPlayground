// eslint-disable-next-line
import Module from "./gallium.wasm.js";
import mitt from 'mitt';

export default class {
  constructor() {
    this._emitter = mitt();
    this._keys = [];
  }

  on(e, cb) {
    this._emitter.on(e, cb);
  }

  sendkey(key) {
    this._keys.unshift(key);
  }

  async doString(str) {
    const gallium = await Module({
      preRun: (arg) => {
        const stdin = () => {
          /*
           * Note: This doesn't work. Apparently emscripten does not support
           * any sort of asynchronous actions here so I have no way to block
           * execution until a key has been pressed :'(
           */
          return this._keys.pop();
        }

        const stdout = (asciiCode) => {
          if (asciiCode == 0x0A) {
             this._emitter.emit('print', "\r\n");
          } else {
            this._emitter.emit('print', String.fromCharCode(asciiCode));
          }
        }

        const stderr = (asciiCode) => {
          stdout(asciiCode);
        }
        arg.FS.init(stdin, stdout, stderr);
      }
    });

    gallium.ccall(
      "gallium_eval",
      null,
      ['string', 'string'],
      ['default', str]
    );
  }
}