var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn3, res) => function __init() {
  return fn3 && (res = (0, fn3[__getOwnPropNames(fn3)[0]])(fn3 = 0)), res;
};
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to4, from8, except, desc) => {
  if (from8 && typeof from8 === "object" || typeof from8 === "function") {
    for (let key of __getOwnPropNames(from8))
      if (!__hasOwnProp.call(to4, key) && key !== except)
        __defProp(to4, key, { get: () => from8[key], enumerable: !(desc = __getOwnPropDesc(from8, key)) || desc.enumerable });
  }
  return to4;
};
var __reExport = (target, mod2, secondTarget) => (__copyProps(target, mod2, "default"), secondTarget && __copyProps(secondTarget, mod2, "default"));
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R3 = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R3 && typeof R3.apply === "function" ? R3.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R3 && typeof R3.ownKeys === "function") {
      ReflectOwnKeys = R3.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n5) {
      if (typeof n5 !== "number" || n5 < 0 || NumberIsNaN(n5)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n5 + ".");
      }
      this._maxListeners = n5;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i4 = 1; i4 < arguments.length; i4++) args.push(arguments[i4]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er3;
        if (args.length > 0)
          er3 = args[0];
        if (er3 instanceof Error) {
          throw er3;
        }
        var err = new Error("Unhandled error." + (er3 ? " (" + er3.message + ")" : ""));
        err.context = er3;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i4 = 0; i4 < len; ++i4)
          ReflectApply(listeners[i4], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m3;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m3 = _getMaxListeners(target);
        if (m3 > 0 && existing.length > m3 && !existing.warned) {
          existing.warned = true;
          var w3 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w3.name = "MaxListenersExceededWarning";
          w3.emitter = target;
          w3.type = type;
          w3.count = existing.length;
          ProcessEmitWarning(w3);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i4, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i4 = list.length - 1; i4 >= 0; i4--) {
          if (list[i4] === listener || list[i4].listener === listener) {
            originalListener = list[i4].listener;
            position = i4;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i4;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys2 = Object.keys(events);
        var key;
        for (i4 = 0; i4 < keys2.length; ++i4) {
          key = keys2[i4];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i4 = listeners.length - 1; i4 >= 0; i4--) {
          this.removeListener(type, listeners[i4]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n5) {
      var copy = new Array(n5);
      for (var i4 = 0; i4 < n5; ++i4)
        copy[i4] = arr[i4];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i4 = 0; i4 < ret.length; ++i4) {
        ret[i4] = arr[i4].listener || arr[i4];
      }
      return ret;
    }
    function once(emitter, name2) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name2, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name2, resolver, { once: true });
        if (name2 !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name2, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name2, listener);
        } else {
          emitter.on(name2, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name2, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name2, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __read: () => __read,
  __rest: () => __rest,
  __spread: () => __spread,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values
});
function __extends(d4, b5) {
  extendStatics(d4, b5);
  function __() {
    this.constructor = d4;
  }
  d4.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
}
function __rest(s3, e2) {
  var t = {};
  for (var p4 in s3) if (Object.prototype.hasOwnProperty.call(s3, p4) && e2.indexOf(p4) < 0)
    t[p4] = s3[p4];
  if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i4 = 0, p4 = Object.getOwnPropertySymbols(s3); i4 < p4.length; i4++) {
      if (e2.indexOf(p4[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p4[i4]))
        t[p4[i4]] = s3[p4[i4]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c6 = arguments.length, r3 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
  else for (var i4 = decorators.length - 1; i4 >= 0; i4--) if (d4 = decorators[i4]) r3 = (c6 < 3 ? d4(r3) : c6 > 3 ? d4(target, key, r3) : d4(target, key)) || r3;
  return c6 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P5, generator) {
  function adopt(value) {
    return value instanceof P5 ? value : new P5(function(resolve) {
      resolve(value);
    });
  }
  return new (P5 || (P5 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _4 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f5, y4, t, g3;
  return g3 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g3[Symbol.iterator] = function() {
    return this;
  }), g3;
  function verb(n5) {
    return function(v5) {
      return step([n5, v5]);
    };
  }
  function step(op) {
    if (f5) throw new TypeError("Generator is already executing.");
    while (_4) try {
      if (f5 = 1, y4 && (t = op[0] & 2 ? y4["return"] : op[0] ? y4["throw"] || ((t = y4["return"]) && t.call(y4), 0) : y4.next) && !(t = t.call(y4, op[1])).done) return t;
      if (y4 = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _4.label++;
          return { value: op[1], done: false };
        case 5:
          _4.label++;
          y4 = op[1];
          op = [0];
          continue;
        case 7:
          op = _4.ops.pop();
          _4.trys.pop();
          continue;
        default:
          if (!(t = _4.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _4 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _4.label = op[1];
            break;
          }
          if (op[0] === 6 && _4.label < t[1]) {
            _4.label = t[1];
            t = op;
            break;
          }
          if (t && _4.label < t[2]) {
            _4.label = t[2];
            _4.ops.push(op);
            break;
          }
          if (t[2]) _4.ops.pop();
          _4.trys.pop();
          continue;
      }
      op = body.call(thisArg, _4);
    } catch (e2) {
      op = [6, e2];
      y4 = 0;
    } finally {
      f5 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding(o4, m3, k5, k22) {
  if (k22 === void 0) k22 = k5;
  o4[k22] = m3[k5];
}
function __exportStar(m3, exports) {
  for (var p4 in m3) if (p4 !== "default" && !exports.hasOwnProperty(p4)) exports[p4] = m3[p4];
}
function __values(o4) {
  var s3 = typeof Symbol === "function" && Symbol.iterator, m3 = s3 && o4[s3], i4 = 0;
  if (m3) return m3.call(o4);
  if (o4 && typeof o4.length === "number") return {
    next: function() {
      if (o4 && i4 >= o4.length) o4 = void 0;
      return { value: o4 && o4[i4++], done: !o4 };
    }
  };
  throw new TypeError(s3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o4, n5) {
  var m3 = typeof Symbol === "function" && o4[Symbol.iterator];
  if (!m3) return o4;
  var i4 = m3.call(o4), r3, ar4 = [], e2;
  try {
    while ((n5 === void 0 || n5-- > 0) && !(r3 = i4.next()).done) ar4.push(r3.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r3 && !r3.done && (m3 = i4["return"])) m3.call(i4);
    } finally {
      if (e2) throw e2.error;
    }
  }
  return ar4;
}
function __spread() {
  for (var ar4 = [], i4 = 0; i4 < arguments.length; i4++)
    ar4 = ar4.concat(__read(arguments[i4]));
  return ar4;
}
function __spreadArrays() {
  for (var s3 = 0, i4 = 0, il = arguments.length; i4 < il; i4++) s3 += arguments[i4].length;
  for (var r3 = Array(s3), k5 = 0, i4 = 0; i4 < il; i4++)
    for (var a4 = arguments[i4], j6 = 0, jl = a4.length; j6 < jl; j6++, k5++)
      r3[k5] = a4[j6];
  return r3;
}
function __await(v5) {
  return this instanceof __await ? (this.v = v5, this) : new __await(v5);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g3 = generator.apply(thisArg, _arguments || []), i4, q2 = [];
  return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4;
  function verb(n5) {
    if (g3[n5]) i4[n5] = function(v5) {
      return new Promise(function(a4, b5) {
        q2.push([n5, v5, a4, b5]) > 1 || resume(n5, v5);
      });
    };
  }
  function resume(n5, v5) {
    try {
      step(g3[n5](v5));
    } catch (e2) {
      settle(q2[0][3], e2);
    }
  }
  function step(r3) {
    r3.value instanceof __await ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q2[0][2], r3);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f5, v5) {
    if (f5(v5), q2.shift(), q2.length) resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator(o4) {
  var i4, p4;
  return i4 = {}, verb("next"), verb("throw", function(e2) {
    throw e2;
  }), verb("return"), i4[Symbol.iterator] = function() {
    return this;
  }, i4;
  function verb(n5, f5) {
    i4[n5] = o4[n5] ? function(v5) {
      return (p4 = !p4) ? { value: __await(o4[n5](v5)), done: n5 === "return" } : f5 ? f5(v5) : v5;
    } : f5;
  }
}
function __asyncValues(o4) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m3 = o4[Symbol.asyncIterator], i4;
  return m3 ? m3.call(o4) : (o4 = typeof __values === "function" ? __values(o4) : o4[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4);
  function verb(n5) {
    i4[n5] = o4[n5] && function(v5) {
      return new Promise(function(resolve, reject) {
        v5 = o4[n5](v5), settle(resolve, reject, v5.done, v5.value);
      });
    };
  }
  function settle(resolve, reject, d4, v5) {
    Promise.resolve(v5).then(function(v6) {
      resolve({ value: v6, done: d4 });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod2) {
  if (mod2 && mod2.__esModule) return mod2;
  var result = {};
  if (mod2 != null) {
    for (var k5 in mod2) if (Object.hasOwnProperty.call(mod2, k5)) result[k5] = mod2[k5];
  }
  result.default = mod2;
  return result;
}
function __importDefault(mod2) {
  return mod2 && mod2.__esModule ? mod2 : { default: mod2 };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics, __assign;
var init_tslib_es6 = __esm({
  "node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js"() {
    extendStatics = function(d4, b5) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d5, b6) {
        d5.__proto__ = b6;
      } || function(d5, b6) {
        for (var p4 in b6) if (b6.hasOwnProperty(p4)) d5[p4] = b6[p4];
      };
      return extendStatics(d4, b5);
    };
    __assign = function() {
      __assign = Object.assign || function __assign3(t) {
        for (var s3, i4 = 1, n5 = arguments.length; i4 < n5; i4++) {
          s3 = arguments[i4];
          for (var p4 in s3) if (Object.prototype.hasOwnProperty.call(s3, p4)) t[p4] = s3[p4];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/delay.js
var require_delay = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delay = void 0;
    function delay(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, timeout);
      });
    }
    exports.delay = delay;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/misc.js
var require_misc = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/misc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
    exports.ONE_HUNDRED = 100;
    exports.ONE_THOUSAND = 1e3;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/time.js
var require_time = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
    exports.ONE_SECOND = 1;
    exports.FIVE_SECONDS = 5;
    exports.TEN_SECONDS = 10;
    exports.THIRTY_SECONDS = 30;
    exports.SIXTY_SECONDS = 60;
    exports.ONE_MINUTE = exports.SIXTY_SECONDS;
    exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
    exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
    exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
    exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
    exports.ONE_HOUR = exports.SIXTY_MINUTES;
    exports.THREE_HOURS = exports.ONE_HOUR * 3;
    exports.SIX_HOURS = exports.ONE_HOUR * 6;
    exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
    exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
    exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
    exports.THREE_DAYS = exports.ONE_DAY * 3;
    exports.FIVE_DAYS = exports.ONE_DAY * 5;
    exports.SEVEN_DAYS = exports.ONE_DAY * 7;
    exports.THIRTY_DAYS = exports.ONE_DAY * 30;
    exports.ONE_WEEK = exports.SEVEN_DAYS;
    exports.TWO_WEEKS = exports.ONE_WEEK * 2;
    exports.THREE_WEEKS = exports.ONE_WEEK * 3;
    exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
    exports.ONE_YEAR = exports.ONE_DAY * 365;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/index.js
var require_constants = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_misc(), exports);
    tslib_1.__exportStar(require_time(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/convert.js
var require_convert = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/convert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromMiliseconds = exports.toMiliseconds = void 0;
    var constants_1 = require_constants();
    function toMiliseconds(seconds) {
      return seconds * constants_1.ONE_THOUSAND;
    }
    exports.toMiliseconds = toMiliseconds;
    function fromMiliseconds(miliseconds) {
      return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
    }
    exports.fromMiliseconds = fromMiliseconds;
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/index.js
var require_utils = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_delay(), exports);
    tslib_1.__exportStar(require_convert(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/watch.js
var require_watch = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Watch = void 0;
    var Watch = class {
      constructor() {
        this.timestamps = /* @__PURE__ */ new Map();
      }
      start(label) {
        if (this.timestamps.has(label)) {
          throw new Error(`Watch already started for label: ${label}`);
        }
        this.timestamps.set(label, { started: Date.now() });
      }
      stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") {
          throw new Error(`Watch already stopped for label: ${label}`);
        }
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, { started: timestamp.started, elapsed });
      }
      get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") {
          throw new Error(`No timestamp found for label: ${label}`);
        }
        return timestamp;
      }
      elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
      }
    };
    exports.Watch = Watch;
    exports.default = Watch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/watch.js
var require_watch2 = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IWatch = void 0;
    var IWatch = class {
    };
    exports.IWatch = IWatch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/index.js
var require_types = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_watch2(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_utils(), exports);
    tslib_1.__exportStar(require_watch(), exports);
    tslib_1.__exportStar(require_types(), exports);
    tslib_1.__exportStar(require_constants(), exports);
  }
});

// node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "node_modules/quick-format-unescaped/index.js"(exports, module) {
    "use strict";
    function tryStringify(o4) {
      try {
        return JSON.stringify(o4);
      } catch (e2) {
        return '"[Circular]"';
      }
    }
    module.exports = format;
    function format(f5, args, opts) {
      var ss2 = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f5 === "object" && f5 !== null) {
        var len = args.length + offset;
        if (len === 1) return f5;
        var objects = new Array(len);
        objects[0] = ss2(f5);
        for (var index = 1; index < len; index++) {
          objects[index] = ss2(args[index]);
        }
        return objects.join(" ");
      }
      if (typeof f5 !== "string") {
        return f5;
      }
      var argLen = args.length;
      if (argLen === 0) return f5;
      var str = "";
      var a4 = 1 - offset;
      var lastPos = -1;
      var flen = f5 && f5.length || 0;
      for (var i4 = 0; i4 < flen; ) {
        if (f5.charCodeAt(i4) === 37 && i4 + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f5.charCodeAt(i4 + 1)) {
            case 100:
            // 'd'
            case 102:
              if (a4 >= argLen)
                break;
              if (args[a4] == null) break;
              if (lastPos < i4)
                str += f5.slice(lastPos, i4);
              str += Number(args[a4]);
              lastPos = i4 + 2;
              i4++;
              break;
            case 105:
              if (a4 >= argLen)
                break;
              if (args[a4] == null) break;
              if (lastPos < i4)
                str += f5.slice(lastPos, i4);
              str += Math.floor(Number(args[a4]));
              lastPos = i4 + 2;
              i4++;
              break;
            case 79:
            // 'O'
            case 111:
            // 'o'
            case 106:
              if (a4 >= argLen)
                break;
              if (args[a4] === void 0) break;
              if (lastPos < i4)
                str += f5.slice(lastPos, i4);
              var type = typeof args[a4];
              if (type === "string") {
                str += "'" + args[a4] + "'";
                lastPos = i4 + 2;
                i4++;
                break;
              }
              if (type === "function") {
                str += args[a4].name || "<anonymous>";
                lastPos = i4 + 2;
                i4++;
                break;
              }
              str += ss2(args[a4]);
              lastPos = i4 + 2;
              i4++;
              break;
            case 115:
              if (a4 >= argLen)
                break;
              if (lastPos < i4)
                str += f5.slice(lastPos, i4);
              str += String(args[a4]);
              lastPos = i4 + 2;
              i4++;
              break;
            case 37:
              if (lastPos < i4)
                str += f5.slice(lastPos, i4);
              str += "%";
              lastPos = i4 + 2;
              i4++;
              a4--;
              break;
          }
          ++a4;
        }
        ++i4;
      }
      if (lastPos === -1)
        return f5;
      else if (lastPos < flen) {
        str += f5.slice(lastPos);
      }
      return str;
    }
  }
});

// node_modules/pino/browser.js
var require_browser = __commonJS({
  "node_modules/pino/browser.js"(exports, module) {
    "use strict";
    var format = require_quick_format_unescaped();
    module.exports = pino;
    var _console = pfGlobalThisOrFallback().console || {};
    var stdSerializers = {
      mapHttpRequest: mock,
      mapHttpResponse: mock,
      wrapRequestSerializer: passthrough,
      wrapResponseSerializer: passthrough,
      wrapErrorSerializer: passthrough,
      req: mock,
      res: mock,
      err: asErrValue,
      errWithCause: asErrValue
    };
    function levelToValue(level, logger) {
      return level === "silent" ? Infinity : logger.levels.values[level];
    }
    var baseLogFunctionSymbol = Symbol("pino.logFuncs");
    var hierarchySymbol = Symbol("pino.hierarchy");
    var logFallbackMap = {
      error: "log",
      fatal: "error",
      warn: "error",
      info: "log",
      debug: "log",
      trace: "log"
    };
    function appendChildLogger(parentLogger, childLogger) {
      const newEntry = {
        logger: childLogger,
        parent: parentLogger[hierarchySymbol]
      };
      childLogger[hierarchySymbol] = newEntry;
    }
    function setupBaseLogFunctions(logger, levels, proto) {
      const logFunctions = {};
      levels.forEach((level) => {
        logFunctions[level] = proto[level] ? proto[level] : _console[level] || _console[logFallbackMap[level] || "log"] || noop;
      });
      logger[baseLogFunctionSymbol] = logFunctions;
    }
    function shouldSerialize(serialize, serializers) {
      if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k5) {
          return k5 !== "!stdSerializers.err";
        });
        return hasToFilter;
      } else if (serialize === true) {
        return Object.keys(serializers);
      }
      return false;
    }
    function pino(opts) {
      opts = opts || {};
      opts.browser = opts.browser || {};
      const transmit2 = opts.browser.transmit;
      if (transmit2 && typeof transmit2.send !== "function") {
        throw Error("pino: transmit option must have a send function");
      }
      const proto = opts.browser.write || _console;
      if (opts.browser.write) opts.browser.asObject = true;
      const serializers = opts.serializers || {};
      const serialize = shouldSerialize(opts.browser.serialize, serializers);
      let stdErrSerialize = opts.browser.serialize;
      if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1) stdErrSerialize = false;
      const customLevels = Object.keys(opts.customLevels || {});
      const levels = ["error", "fatal", "warn", "info", "debug", "trace"].concat(customLevels);
      if (typeof proto === "function") {
        levels.forEach(function(level2) {
          proto[level2] = proto;
        });
      }
      if (opts.enabled === false || opts.browser.disabled) opts.level = "silent";
      const level = opts.level || "info";
      const logger = Object.create(proto);
      if (!logger.log) logger.log = noop;
      setupBaseLogFunctions(logger, levels, proto);
      appendChildLogger({}, logger);
      Object.defineProperty(logger, "levelVal", {
        get: getLevelVal
      });
      Object.defineProperty(logger, "level", {
        get: getLevel,
        set: setLevel
      });
      const setOpts = {
        transmit: transmit2,
        serialize,
        asObject: opts.browser.asObject,
        asObjectBindingsOnly: opts.browser.asObjectBindingsOnly,
        formatters: opts.browser.formatters,
        levels,
        timestamp: getTimeFunction(opts),
        messageKey: opts.messageKey || "msg",
        onChild: opts.onChild || noop
      };
      logger.levels = getLevels(opts);
      logger.level = level;
      logger.isLevelEnabled = function(level2) {
        if (!this.levels.values[level2]) {
          return false;
        }
        return this.levels.values[level2] >= this.levels.values[this.level];
      };
      logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
      logger.serializers = serializers;
      logger._serialize = serialize;
      logger._stdErrSerialize = stdErrSerialize;
      logger.child = function(...args) {
        return child.call(this, setOpts, ...args);
      };
      if (transmit2) logger._logEvent = createLogEventShape();
      function getLevelVal() {
        return levelToValue(this.level, this);
      }
      function getLevel() {
        return this._level;
      }
      function setLevel(level2) {
        if (level2 !== "silent" && !this.levels.values[level2]) {
          throw Error("unknown level " + level2);
        }
        this._level = level2;
        set2(this, setOpts, logger, "error");
        set2(this, setOpts, logger, "fatal");
        set2(this, setOpts, logger, "warn");
        set2(this, setOpts, logger, "info");
        set2(this, setOpts, logger, "debug");
        set2(this, setOpts, logger, "trace");
        customLevels.forEach((level3) => {
          set2(this, setOpts, logger, level3);
        });
      }
      function child(setOpts2, bindings, childOptions) {
        if (!bindings) {
          throw new Error("missing bindings for child Pino");
        }
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) {
          childOptions.serializers = bindings.serializers;
        }
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
          var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
          var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
          delete bindings.serializers;
          applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
          this._childLevel = (parent._childLevel | 0) + 1;
          this.bindings = bindings;
          if (childSerializers) {
            this.serializers = childSerializers;
            this._serialize = childSerialize;
          }
          if (transmit2) {
            this._logEvent = createLogEventShape(
              [].concat(parent._logEvent.bindings, bindings)
            );
          }
        }
        Child.prototype = this;
        const newLogger = new Child(this);
        appendChildLogger(this, newLogger);
        newLogger.child = function(...args) {
          return child.call(this, setOpts2, ...args);
        };
        newLogger.level = childOptions.level || this.level;
        setOpts2.onChild(newLogger);
        return newLogger;
      }
      return logger;
    }
    function getLevels(opts) {
      const customLevels = opts.customLevels || {};
      const values = Object.assign({}, pino.levels.values, customLevels);
      const labels = Object.assign({}, pino.levels.labels, invertObject(customLevels));
      return {
        values,
        labels
      };
    }
    function invertObject(obj) {
      const inverted = {};
      Object.keys(obj).forEach(function(key) {
        inverted[obj[key]] = key;
      });
      return inverted;
    }
    pino.levels = {
      values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
      },
      labels: {
        10: "trace",
        20: "debug",
        30: "info",
        40: "warn",
        50: "error",
        60: "fatal"
      }
    };
    pino.stdSerializers = stdSerializers;
    pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
    function getBindingChain(logger) {
      const bindings = [];
      if (logger.bindings) {
        bindings.push(logger.bindings);
      }
      let hierarchy = logger[hierarchySymbol];
      while (hierarchy.parent) {
        hierarchy = hierarchy.parent;
        if (hierarchy.logger.bindings) {
          bindings.push(hierarchy.logger.bindings);
        }
      }
      return bindings.reverse();
    }
    function set2(self2, opts, rootLogger, level) {
      Object.defineProperty(self2, level, {
        value: levelToValue(self2.level, rootLogger) > levelToValue(level, rootLogger) ? noop : rootLogger[baseLogFunctionSymbol][level],
        writable: true,
        enumerable: true,
        configurable: true
      });
      if (self2[level] === noop) {
        if (!opts.transmit) return;
        const transmitLevel = opts.transmit.level || self2.level;
        const transmitValue = levelToValue(transmitLevel, rootLogger);
        const methodValue = levelToValue(level, rootLogger);
        if (methodValue < transmitValue) return;
      }
      self2[level] = createWrap(self2, opts, rootLogger, level);
      const bindings = getBindingChain(self2);
      if (bindings.length === 0) {
        return;
      }
      self2[level] = prependBindingsInArguments(bindings, self2[level]);
    }
    function prependBindingsInArguments(bindings, logFunc) {
      return function() {
        return logFunc.apply(this, [...bindings, ...arguments]);
      };
    }
    function createWrap(self2, opts, rootLogger, level) {
      return /* @__PURE__ */ (function(write) {
        return function LOG() {
          const ts2 = opts.timestamp();
          const args = new Array(arguments.length);
          const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
          for (var i4 = 0; i4 < args.length; i4++) args[i4] = arguments[i4];
          var argsIsSerialized = false;
          if (opts.serialize) {
            applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
            argsIsSerialized = true;
          }
          if (opts.asObject || opts.formatters) {
            write.call(proto, ...asObject(this, level, args, ts2, opts));
          } else write.apply(proto, args);
          if (opts.transmit) {
            const transmitLevel = opts.transmit.level || self2._level;
            const transmitValue = levelToValue(transmitLevel, rootLogger);
            const methodValue = levelToValue(level, rootLogger);
            if (methodValue < transmitValue) return;
            transmit(this, {
              ts: ts2,
              methodLevel: level,
              methodValue,
              transmitLevel,
              transmitValue: rootLogger.levels.values[opts.transmit.level || self2._level],
              send: opts.transmit.send,
              val: levelToValue(self2._level, rootLogger)
            }, args, argsIsSerialized);
          }
        };
      })(self2[baseLogFunctionSymbol][level]);
    }
    function asObject(logger, level, args, ts2, opts) {
      const {
        level: levelFormatter,
        log: logObjectFormatter = (obj) => obj
      } = opts.formatters || {};
      const argsCloned = args.slice();
      let msg = argsCloned[0];
      const logObject = {};
      let lvl = (logger._childLevel | 0) + 1;
      if (lvl < 1) lvl = 1;
      if (ts2) {
        logObject.time = ts2;
      }
      if (levelFormatter) {
        const formattedLevel = levelFormatter(level, logger.levels.values[level]);
        Object.assign(logObject, formattedLevel);
      } else {
        logObject.level = logger.levels.values[level];
      }
      if (opts.asObjectBindingsOnly) {
        if (msg !== null && typeof msg === "object") {
          while (lvl-- && typeof argsCloned[0] === "object") {
            Object.assign(logObject, argsCloned.shift());
          }
        }
        const formattedLogObject = logObjectFormatter(logObject);
        return [formattedLogObject, ...argsCloned];
      } else {
        if (msg !== null && typeof msg === "object") {
          while (lvl-- && typeof argsCloned[0] === "object") {
            Object.assign(logObject, argsCloned.shift());
          }
          msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
        } else if (typeof msg === "string") msg = format(argsCloned.shift(), argsCloned);
        if (msg !== void 0) logObject[opts.messageKey] = msg;
        const formattedLogObject = logObjectFormatter(logObject);
        return [formattedLogObject];
      }
    }
    function applySerializers(args, serialize, serializers, stdErrSerialize) {
      for (const i4 in args) {
        if (stdErrSerialize && args[i4] instanceof Error) {
          args[i4] = pino.stdSerializers.err(args[i4]);
        } else if (typeof args[i4] === "object" && !Array.isArray(args[i4]) && serialize) {
          for (const k5 in args[i4]) {
            if (serialize.indexOf(k5) > -1 && k5 in serializers) {
              args[i4][k5] = serializers[k5](args[i4][k5]);
            }
          }
        }
      }
    }
    function transmit(logger, opts, args, argsIsSerialized = false) {
      const send = opts.send;
      const ts2 = opts.ts;
      const methodLevel = opts.methodLevel;
      const methodValue = opts.methodValue;
      const val = opts.val;
      const bindings = logger._logEvent.bindings;
      if (!argsIsSerialized) {
        applySerializers(
          args,
          logger._serialize || Object.keys(logger.serializers),
          logger.serializers,
          logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
        );
      }
      logger._logEvent.ts = ts2;
      logger._logEvent.messages = args.filter(function(arg) {
        return bindings.indexOf(arg) === -1;
      });
      logger._logEvent.level.label = methodLevel;
      logger._logEvent.level.value = methodValue;
      send(methodLevel, logger._logEvent, val);
      logger._logEvent = createLogEventShape(bindings);
    }
    function createLogEventShape(bindings) {
      return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: { label: "", value: 0 }
      };
    }
    function asErrValue(err) {
      const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
      };
      for (const key in err) {
        if (obj[key] === void 0) {
          obj[key] = err[key];
        }
      }
      return obj;
    }
    function getTimeFunction(opts) {
      if (typeof opts.timestamp === "function") {
        return opts.timestamp;
      }
      if (opts.timestamp === false) {
        return nullTime;
      }
      return epochTime;
    }
    function mock() {
      return {};
    }
    function passthrough(a4) {
      return a4;
    }
    function noop() {
    }
    function nullTime() {
      return false;
    }
    function epochTime() {
      return Date.now();
    }
    function unixTime() {
      return Math.round(Date.now() / 1e3);
    }
    function isoTime() {
      return new Date(Date.now()).toISOString();
    }
    function pfGlobalThisOrFallback() {
      function defd(o4) {
        return typeof o4 !== "undefined" && o4;
      }
      try {
        if (typeof globalThis !== "undefined") return globalThis;
        Object.defineProperty(Object.prototype, "globalThis", {
          get: function() {
            delete Object.prototype.globalThis;
            return this.globalThis = this;
          },
          configurable: true
        });
        return globalThis;
      } catch (e2) {
        return defd(self) || defd(window) || defd(this) || {};
      }
    }
    module.exports.default = pino;
    module.exports.pino = pino;
  }
});

// node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/@walletconnect/window-getters/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
    function getFromWindow(name2) {
      let res = void 0;
      if (typeof window !== "undefined" && typeof window[name2] !== "undefined") {
        res = window[name2];
      }
      return res;
    }
    exports.getFromWindow = getFromWindow;
    function getFromWindowOrThrow(name2) {
      const res = getFromWindow(name2);
      if (!res) {
        throw new Error(`${name2} is not defined in Window`);
      }
      return res;
    }
    exports.getFromWindowOrThrow = getFromWindowOrThrow;
    function getDocumentOrThrow() {
      return getFromWindowOrThrow("document");
    }
    exports.getDocumentOrThrow = getDocumentOrThrow;
    function getDocument() {
      return getFromWindow("document");
    }
    exports.getDocument = getDocument;
    function getNavigatorOrThrow() {
      return getFromWindowOrThrow("navigator");
    }
    exports.getNavigatorOrThrow = getNavigatorOrThrow;
    function getNavigator() {
      return getFromWindow("navigator");
    }
    exports.getNavigator = getNavigator;
    function getLocationOrThrow() {
      return getFromWindowOrThrow("location");
    }
    exports.getLocationOrThrow = getLocationOrThrow;
    function getLocation() {
      return getFromWindow("location");
    }
    exports.getLocation = getLocation;
    function getCryptoOrThrow() {
      return getFromWindowOrThrow("crypto");
    }
    exports.getCryptoOrThrow = getCryptoOrThrow;
    function getCrypto() {
      return getFromWindow("crypto");
    }
    exports.getCrypto = getCrypto;
    function getLocalStorageOrThrow() {
      return getFromWindowOrThrow("localStorage");
    }
    exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
    function getLocalStorage() {
      return getFromWindow("localStorage");
    }
    exports.getLocalStorage = getLocalStorage;
  }
});

// node_modules/@walletconnect/window-metadata/dist/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/@walletconnect/window-metadata/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWindowMetadata = void 0;
    var window_getters_1 = require_cjs2();
    function getWindowMetadata() {
      let doc;
      let loc;
      try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
      } catch (e2) {
        return null;
      }
      function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons2 = [];
        for (let i4 = 0; i4 < links.length; i4++) {
          const link = links[i4];
          const rel = link.getAttribute("rel");
          if (rel) {
            if (rel.toLowerCase().indexOf("icon") > -1) {
              const href = link.getAttribute("href");
              if (href) {
                if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                  let absoluteHref = loc.protocol + "//" + loc.host;
                  if (href.indexOf("/") === 0) {
                    absoluteHref += href;
                  } else {
                    const path = loc.pathname.split("/");
                    path.pop();
                    const finalPath = path.join("/");
                    absoluteHref += finalPath + "/" + href;
                  }
                  icons2.push(absoluteHref);
                } else if (href.indexOf("//") === 0) {
                  const absoluteUrl = loc.protocol + href;
                  icons2.push(absoluteUrl);
                } else {
                  icons2.push(href);
                }
              }
            }
          }
        }
        return icons2;
      }
      function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for (let i4 = 0; i4 < metaTags.length; i4++) {
          const tag = metaTags[i4];
          const attributes = ["itemprop", "property", "name"].map((target) => tag.getAttribute(target)).filter((attr) => {
            if (attr) {
              return args.includes(attr);
            }
            return false;
          });
          if (attributes.length && attributes) {
            const content = tag.getAttribute("content");
            if (content) {
              return content;
            }
          }
        }
        return "";
      }
      function getName() {
        let name3 = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name3) {
          name3 = doc.title;
        }
        return name3;
      }
      function getDescription() {
        const description2 = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description2;
      }
      const name2 = getName();
      const description = getDescription();
      const url = loc.origin;
      const icons = getIcons();
      const meta = {
        description,
        url,
        icons,
        name: name2
      };
      return meta;
    }
    exports.getWindowMetadata = getWindowMetadata;
  }
});

// node_modules/blakejs/util.js
var require_util = __commonJS({
  "node_modules/blakejs/util.js"(exports, module) {
    var ERROR_MSG_INPUT = "Input must be an string, Buffer or Uint8Array";
    function normalizeInput(input) {
      let ret;
      if (input instanceof Uint8Array) {
        ret = input;
      } else if (typeof input === "string") {
        const encoder2 = new TextEncoder();
        ret = encoder2.encode(input);
      } else {
        throw new Error(ERROR_MSG_INPUT);
      }
      return ret;
    }
    function toHex3(bytes) {
      return Array.prototype.map.call(bytes, function(n5) {
        return (n5 < 16 ? "0" : "") + n5.toString(16);
      }).join("");
    }
    function uint32ToHex(val) {
      return (4294967296 + val).toString(16).substring(1);
    }
    function debugPrint(label, arr, size3) {
      let msg = "\n" + label + " = ";
      for (let i4 = 0; i4 < arr.length; i4 += 2) {
        if (size3 === 32) {
          msg += uint32ToHex(arr[i4]).toUpperCase();
          msg += " ";
          msg += uint32ToHex(arr[i4 + 1]).toUpperCase();
        } else if (size3 === 64) {
          msg += uint32ToHex(arr[i4 + 1]).toUpperCase();
          msg += uint32ToHex(arr[i4]).toUpperCase();
        } else throw new Error("Invalid size " + size3);
        if (i4 % 6 === 4) {
          msg += "\n" + new Array(label.length + 4).join(" ");
        } else if (i4 < arr.length - 2) {
          msg += " ";
        }
      }
      console.log(msg);
    }
    function testSpeed(hashFn, N12, M5) {
      let startMs = (/* @__PURE__ */ new Date()).getTime();
      const input = new Uint8Array(N12);
      for (let i4 = 0; i4 < N12; i4++) {
        input[i4] = i4 % 256;
      }
      const genMs = (/* @__PURE__ */ new Date()).getTime();
      console.log("Generated random input in " + (genMs - startMs) + "ms");
      startMs = genMs;
      for (let i4 = 0; i4 < M5; i4++) {
        const hashHex = hashFn(input);
        const hashMs = (/* @__PURE__ */ new Date()).getTime();
        const ms2 = hashMs - startMs;
        startMs = hashMs;
        console.log("Hashed in " + ms2 + "ms: " + hashHex.substring(0, 20) + "...");
        console.log(
          Math.round(N12 / (1 << 20) / (ms2 / 1e3) * 100) / 100 + " MB PER SECOND"
        );
      }
    }
    module.exports = {
      normalizeInput,
      toHex: toHex3,
      debugPrint,
      testSpeed
    };
  }
});

// node_modules/blakejs/blake2b.js
var require_blake2b = __commonJS({
  "node_modules/blakejs/blake2b.js"(exports, module) {
    var util = require_util();
    function ADD64AA(v6, a4, b5) {
      const o0 = v6[a4] + v6[b5];
      let o1 = v6[a4 + 1] + v6[b5 + 1];
      if (o0 >= 4294967296) {
        o1++;
      }
      v6[a4] = o0;
      v6[a4 + 1] = o1;
    }
    function ADD64AC(v6, a4, b0, b1) {
      let o0 = v6[a4] + b0;
      if (b0 < 0) {
        o0 += 4294967296;
      }
      let o1 = v6[a4 + 1] + b1;
      if (o0 >= 4294967296) {
        o1++;
      }
      v6[a4] = o0;
      v6[a4 + 1] = o1;
    }
    function B2B_GET32(arr, i4) {
      return arr[i4] ^ arr[i4 + 1] << 8 ^ arr[i4 + 2] << 16 ^ arr[i4 + 3] << 24;
    }
    function B2B_G(a4, b5, c6, d4, ix, iy) {
      const x0 = m3[ix];
      const x1 = m3[ix + 1];
      const y0 = m3[iy];
      const y1 = m3[iy + 1];
      ADD64AA(v5, a4, b5);
      ADD64AC(v5, a4, x0, x1);
      let xor0 = v5[d4] ^ v5[a4];
      let xor1 = v5[d4 + 1] ^ v5[a4 + 1];
      v5[d4] = xor1;
      v5[d4 + 1] = xor0;
      ADD64AA(v5, c6, d4);
      xor0 = v5[b5] ^ v5[c6];
      xor1 = v5[b5 + 1] ^ v5[c6 + 1];
      v5[b5] = xor0 >>> 24 ^ xor1 << 8;
      v5[b5 + 1] = xor1 >>> 24 ^ xor0 << 8;
      ADD64AA(v5, a4, b5);
      ADD64AC(v5, a4, y0, y1);
      xor0 = v5[d4] ^ v5[a4];
      xor1 = v5[d4 + 1] ^ v5[a4 + 1];
      v5[d4] = xor0 >>> 16 ^ xor1 << 16;
      v5[d4 + 1] = xor1 >>> 16 ^ xor0 << 16;
      ADD64AA(v5, c6, d4);
      xor0 = v5[b5] ^ v5[c6];
      xor1 = v5[b5 + 1] ^ v5[c6 + 1];
      v5[b5] = xor1 >>> 31 ^ xor0 << 1;
      v5[b5 + 1] = xor0 >>> 31 ^ xor1 << 1;
    }
    var BLAKE2B_IV32 = new Uint32Array([
      4089235720,
      1779033703,
      2227873595,
      3144134277,
      4271175723,
      1013904242,
      1595750129,
      2773480762,
      2917565137,
      1359893119,
      725511199,
      2600822924,
      4215389547,
      528734635,
      327033209,
      1541459225
    ]);
    var SIGMA8 = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9,
      12,
      5,
      1,
      15,
      14,
      13,
      4,
      10,
      0,
      7,
      6,
      3,
      9,
      2,
      8,
      11,
      13,
      11,
      7,
      14,
      12,
      1,
      3,
      9,
      5,
      0,
      15,
      4,
      8,
      6,
      2,
      10,
      6,
      15,
      14,
      9,
      11,
      3,
      0,
      8,
      12,
      2,
      13,
      7,
      1,
      4,
      10,
      5,
      10,
      2,
      8,
      4,
      7,
      6,
      1,
      5,
      15,
      11,
      9,
      14,
      3,
      12,
      13,
      0,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3
    ];
    var SIGMA82 = new Uint8Array(
      SIGMA8.map(function(x5) {
        return x5 * 2;
      })
    );
    var v5 = new Uint32Array(32);
    var m3 = new Uint32Array(32);
    function blake2bCompress(ctx, last) {
      let i4 = 0;
      for (i4 = 0; i4 < 16; i4++) {
        v5[i4] = ctx.h[i4];
        v5[i4 + 16] = BLAKE2B_IV32[i4];
      }
      v5[24] = v5[24] ^ ctx.t;
      v5[25] = v5[25] ^ ctx.t / 4294967296;
      if (last) {
        v5[28] = ~v5[28];
        v5[29] = ~v5[29];
      }
      for (i4 = 0; i4 < 32; i4++) {
        m3[i4] = B2B_GET32(ctx.b, 4 * i4);
      }
      for (i4 = 0; i4 < 12; i4++) {
        B2B_G(0, 8, 16, 24, SIGMA82[i4 * 16 + 0], SIGMA82[i4 * 16 + 1]);
        B2B_G(2, 10, 18, 26, SIGMA82[i4 * 16 + 2], SIGMA82[i4 * 16 + 3]);
        B2B_G(4, 12, 20, 28, SIGMA82[i4 * 16 + 4], SIGMA82[i4 * 16 + 5]);
        B2B_G(6, 14, 22, 30, SIGMA82[i4 * 16 + 6], SIGMA82[i4 * 16 + 7]);
        B2B_G(0, 10, 20, 30, SIGMA82[i4 * 16 + 8], SIGMA82[i4 * 16 + 9]);
        B2B_G(2, 12, 22, 24, SIGMA82[i4 * 16 + 10], SIGMA82[i4 * 16 + 11]);
        B2B_G(4, 14, 16, 26, SIGMA82[i4 * 16 + 12], SIGMA82[i4 * 16 + 13]);
        B2B_G(6, 8, 18, 28, SIGMA82[i4 * 16 + 14], SIGMA82[i4 * 16 + 15]);
      }
      for (i4 = 0; i4 < 16; i4++) {
        ctx.h[i4] = ctx.h[i4] ^ v5[i4] ^ v5[i4 + 16];
      }
    }
    var parameterBlock = new Uint8Array([
      0,
      0,
      0,
      0,
      //  0: outlen, keylen, fanout, depth
      0,
      0,
      0,
      0,
      //  4: leaf length, sequential mode
      0,
      0,
      0,
      0,
      //  8: node offset
      0,
      0,
      0,
      0,
      // 12: node offset
      0,
      0,
      0,
      0,
      // 16: node depth, inner length, rfu
      0,
      0,
      0,
      0,
      // 20: rfu
      0,
      0,
      0,
      0,
      // 24: rfu
      0,
      0,
      0,
      0,
      // 28: rfu
      0,
      0,
      0,
      0,
      // 32: salt
      0,
      0,
      0,
      0,
      // 36: salt
      0,
      0,
      0,
      0,
      // 40: salt
      0,
      0,
      0,
      0,
      // 44: salt
      0,
      0,
      0,
      0,
      // 48: personal
      0,
      0,
      0,
      0,
      // 52: personal
      0,
      0,
      0,
      0,
      // 56: personal
      0,
      0,
      0,
      0
      // 60: personal
    ]);
    function blake2bInit(outlen, key, salt, personal) {
      if (outlen === 0 || outlen > 64) {
        throw new Error("Illegal output length, expected 0 < length <= 64");
      }
      if (key && key.length > 64) {
        throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
      }
      if (salt && salt.length !== 16) {
        throw new Error("Illegal salt, expected Uint8Array with length is 16");
      }
      if (personal && personal.length !== 16) {
        throw new Error("Illegal personal, expected Uint8Array with length is 16");
      }
      const ctx = {
        b: new Uint8Array(128),
        h: new Uint32Array(16),
        t: 0,
        // input count
        c: 0,
        // pointer within buffer
        outlen
        // output length in bytes
      };
      parameterBlock.fill(0);
      parameterBlock[0] = outlen;
      if (key) parameterBlock[1] = key.length;
      parameterBlock[2] = 1;
      parameterBlock[3] = 1;
      if (salt) parameterBlock.set(salt, 32);
      if (personal) parameterBlock.set(personal, 48);
      for (let i4 = 0; i4 < 16; i4++) {
        ctx.h[i4] = BLAKE2B_IV32[i4] ^ B2B_GET32(parameterBlock, i4 * 4);
      }
      if (key) {
        blake2bUpdate(ctx, key);
        ctx.c = 128;
      }
      return ctx;
    }
    function blake2bUpdate(ctx, input) {
      for (let i4 = 0; i4 < input.length; i4++) {
        if (ctx.c === 128) {
          ctx.t += ctx.c;
          blake2bCompress(ctx, false);
          ctx.c = 0;
        }
        ctx.b[ctx.c++] = input[i4];
      }
    }
    function blake2bFinal(ctx) {
      ctx.t += ctx.c;
      while (ctx.c < 128) {
        ctx.b[ctx.c++] = 0;
      }
      blake2bCompress(ctx, true);
      const out = new Uint8Array(ctx.outlen);
      for (let i4 = 0; i4 < ctx.outlen; i4++) {
        out[i4] = ctx.h[i4 >> 2] >> 8 * (i4 & 3);
      }
      return out;
    }
    function blake2b(input, key, outlen, salt, personal) {
      outlen = outlen || 64;
      input = util.normalizeInput(input);
      if (salt) {
        salt = util.normalizeInput(salt);
      }
      if (personal) {
        personal = util.normalizeInput(personal);
      }
      const ctx = blake2bInit(outlen, key, salt, personal);
      blake2bUpdate(ctx, input);
      return blake2bFinal(ctx);
    }
    function blake2bHex(input, key, outlen, salt, personal) {
      const output = blake2b(input, key, outlen, salt, personal);
      return util.toHex(output);
    }
    module.exports = {
      blake2b,
      blake2bHex,
      blake2bInit,
      blake2bUpdate,
      blake2bFinal
    };
  }
});

// node_modules/blakejs/blake2s.js
var require_blake2s = __commonJS({
  "node_modules/blakejs/blake2s.js"(exports, module) {
    var util = require_util();
    function B2S_GET32(v6, i4) {
      return v6[i4] ^ v6[i4 + 1] << 8 ^ v6[i4 + 2] << 16 ^ v6[i4 + 3] << 24;
    }
    function B2S_G(a4, b5, c6, d4, x5, y4) {
      v5[a4] = v5[a4] + v5[b5] + x5;
      v5[d4] = ROTR32(v5[d4] ^ v5[a4], 16);
      v5[c6] = v5[c6] + v5[d4];
      v5[b5] = ROTR32(v5[b5] ^ v5[c6], 12);
      v5[a4] = v5[a4] + v5[b5] + y4;
      v5[d4] = ROTR32(v5[d4] ^ v5[a4], 8);
      v5[c6] = v5[c6] + v5[d4];
      v5[b5] = ROTR32(v5[b5] ^ v5[c6], 7);
    }
    function ROTR32(x5, y4) {
      return x5 >>> y4 ^ x5 << 32 - y4;
    }
    var BLAKE2S_IV = new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    var SIGMA = new Uint8Array([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9,
      12,
      5,
      1,
      15,
      14,
      13,
      4,
      10,
      0,
      7,
      6,
      3,
      9,
      2,
      8,
      11,
      13,
      11,
      7,
      14,
      12,
      1,
      3,
      9,
      5,
      0,
      15,
      4,
      8,
      6,
      2,
      10,
      6,
      15,
      14,
      9,
      11,
      3,
      0,
      8,
      12,
      2,
      13,
      7,
      1,
      4,
      10,
      5,
      10,
      2,
      8,
      4,
      7,
      6,
      1,
      5,
      15,
      11,
      9,
      14,
      3,
      12,
      13,
      0
    ]);
    var v5 = new Uint32Array(16);
    var m3 = new Uint32Array(16);
    function blake2sCompress(ctx, last) {
      let i4 = 0;
      for (i4 = 0; i4 < 8; i4++) {
        v5[i4] = ctx.h[i4];
        v5[i4 + 8] = BLAKE2S_IV[i4];
      }
      v5[12] ^= ctx.t;
      v5[13] ^= ctx.t / 4294967296;
      if (last) {
        v5[14] = ~v5[14];
      }
      for (i4 = 0; i4 < 16; i4++) {
        m3[i4] = B2S_GET32(ctx.b, 4 * i4);
      }
      for (i4 = 0; i4 < 10; i4++) {
        B2S_G(0, 4, 8, 12, m3[SIGMA[i4 * 16 + 0]], m3[SIGMA[i4 * 16 + 1]]);
        B2S_G(1, 5, 9, 13, m3[SIGMA[i4 * 16 + 2]], m3[SIGMA[i4 * 16 + 3]]);
        B2S_G(2, 6, 10, 14, m3[SIGMA[i4 * 16 + 4]], m3[SIGMA[i4 * 16 + 5]]);
        B2S_G(3, 7, 11, 15, m3[SIGMA[i4 * 16 + 6]], m3[SIGMA[i4 * 16 + 7]]);
        B2S_G(0, 5, 10, 15, m3[SIGMA[i4 * 16 + 8]], m3[SIGMA[i4 * 16 + 9]]);
        B2S_G(1, 6, 11, 12, m3[SIGMA[i4 * 16 + 10]], m3[SIGMA[i4 * 16 + 11]]);
        B2S_G(2, 7, 8, 13, m3[SIGMA[i4 * 16 + 12]], m3[SIGMA[i4 * 16 + 13]]);
        B2S_G(3, 4, 9, 14, m3[SIGMA[i4 * 16 + 14]], m3[SIGMA[i4 * 16 + 15]]);
      }
      for (i4 = 0; i4 < 8; i4++) {
        ctx.h[i4] ^= v5[i4] ^ v5[i4 + 8];
      }
    }
    function blake2sInit(outlen, key) {
      if (!(outlen > 0 && outlen <= 32)) {
        throw new Error("Incorrect output length, should be in [1, 32]");
      }
      const keylen = key ? key.length : 0;
      if (key && !(keylen > 0 && keylen <= 32)) {
        throw new Error("Incorrect key length, should be in [1, 32]");
      }
      const ctx = {
        h: new Uint32Array(BLAKE2S_IV),
        // hash state
        b: new Uint8Array(64),
        // input block
        c: 0,
        // pointer within block
        t: 0,
        // input count
        outlen
        // output length in bytes
      };
      ctx.h[0] ^= 16842752 ^ keylen << 8 ^ outlen;
      if (keylen > 0) {
        blake2sUpdate(ctx, key);
        ctx.c = 64;
      }
      return ctx;
    }
    function blake2sUpdate(ctx, input) {
      for (let i4 = 0; i4 < input.length; i4++) {
        if (ctx.c === 64) {
          ctx.t += ctx.c;
          blake2sCompress(ctx, false);
          ctx.c = 0;
        }
        ctx.b[ctx.c++] = input[i4];
      }
    }
    function blake2sFinal(ctx) {
      ctx.t += ctx.c;
      while (ctx.c < 64) {
        ctx.b[ctx.c++] = 0;
      }
      blake2sCompress(ctx, true);
      const out = new Uint8Array(ctx.outlen);
      for (let i4 = 0; i4 < ctx.outlen; i4++) {
        out[i4] = ctx.h[i4 >> 2] >> 8 * (i4 & 3) & 255;
      }
      return out;
    }
    function blake2s(input, key, outlen) {
      outlen = outlen || 32;
      input = util.normalizeInput(input);
      const ctx = blake2sInit(outlen, key);
      blake2sUpdate(ctx, input);
      return blake2sFinal(ctx);
    }
    function blake2sHex(input, key, outlen) {
      const output = blake2s(input, key, outlen);
      return util.toHex(output);
    }
    module.exports = {
      blake2s,
      blake2sHex,
      blake2sInit,
      blake2sUpdate,
      blake2sFinal
    };
  }
});

// node_modules/blakejs/index.js
var require_blakejs = __commonJS({
  "node_modules/blakejs/index.js"(exports, module) {
    var b2b = require_blake2b();
    var b2s = require_blake2s();
    module.exports = {
      blake2b: b2b.blake2b,
      blake2bHex: b2b.blake2bHex,
      blake2bInit: b2b.blake2bInit,
      blake2bUpdate: b2b.blake2bUpdate,
      blake2bFinal: b2b.blake2bFinal,
      blake2s: b2s.blake2s,
      blake2sHex: b2s.blake2sHex,
      blake2sInit: b2s.blake2sInit,
      blake2sUpdate: b2s.blake2sUpdate,
      blake2sFinal: b2s.blake2sFinal
    };
  }
});

// node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js
var tslib_es6_exports2 = {};
__export(tslib_es6_exports2, {
  __assign: () => __assign2,
  __asyncDelegator: () => __asyncDelegator2,
  __asyncGenerator: () => __asyncGenerator2,
  __asyncValues: () => __asyncValues2,
  __await: () => __await2,
  __awaiter: () => __awaiter2,
  __classPrivateFieldGet: () => __classPrivateFieldGet2,
  __classPrivateFieldSet: () => __classPrivateFieldSet2,
  __createBinding: () => __createBinding2,
  __decorate: () => __decorate2,
  __exportStar: () => __exportStar2,
  __extends: () => __extends2,
  __generator: () => __generator2,
  __importDefault: () => __importDefault2,
  __importStar: () => __importStar2,
  __makeTemplateObject: () => __makeTemplateObject2,
  __metadata: () => __metadata2,
  __param: () => __param2,
  __read: () => __read2,
  __rest: () => __rest2,
  __spread: () => __spread2,
  __spreadArrays: () => __spreadArrays2,
  __values: () => __values2
});
function __extends2(d4, b5) {
  extendStatics2(d4, b5);
  function __() {
    this.constructor = d4;
  }
  d4.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
}
function __rest2(s3, e2) {
  var t = {};
  for (var p4 in s3) if (Object.prototype.hasOwnProperty.call(s3, p4) && e2.indexOf(p4) < 0)
    t[p4] = s3[p4];
  if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i4 = 0, p4 = Object.getOwnPropertySymbols(s3); i4 < p4.length; i4++) {
      if (e2.indexOf(p4[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p4[i4]))
        t[p4[i4]] = s3[p4[i4]];
    }
  return t;
}
function __decorate2(decorators, target, key, desc) {
  var c6 = arguments.length, r3 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
  else for (var i4 = decorators.length - 1; i4 >= 0; i4--) if (d4 = decorators[i4]) r3 = (c6 < 3 ? d4(r3) : c6 > 3 ? d4(target, key, r3) : d4(target, key)) || r3;
  return c6 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param2(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata2(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter2(thisArg, _arguments, P5, generator) {
  function adopt(value) {
    return value instanceof P5 ? value : new P5(function(resolve) {
      resolve(value);
    });
  }
  return new (P5 || (P5 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator2(thisArg, body) {
  var _4 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f5, y4, t, g3;
  return g3 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g3[Symbol.iterator] = function() {
    return this;
  }), g3;
  function verb(n5) {
    return function(v5) {
      return step([n5, v5]);
    };
  }
  function step(op) {
    if (f5) throw new TypeError("Generator is already executing.");
    while (_4) try {
      if (f5 = 1, y4 && (t = op[0] & 2 ? y4["return"] : op[0] ? y4["throw"] || ((t = y4["return"]) && t.call(y4), 0) : y4.next) && !(t = t.call(y4, op[1])).done) return t;
      if (y4 = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _4.label++;
          return { value: op[1], done: false };
        case 5:
          _4.label++;
          y4 = op[1];
          op = [0];
          continue;
        case 7:
          op = _4.ops.pop();
          _4.trys.pop();
          continue;
        default:
          if (!(t = _4.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _4 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _4.label = op[1];
            break;
          }
          if (op[0] === 6 && _4.label < t[1]) {
            _4.label = t[1];
            t = op;
            break;
          }
          if (t && _4.label < t[2]) {
            _4.label = t[2];
            _4.ops.push(op);
            break;
          }
          if (t[2]) _4.ops.pop();
          _4.trys.pop();
          continue;
      }
      op = body.call(thisArg, _4);
    } catch (e2) {
      op = [6, e2];
      y4 = 0;
    } finally {
      f5 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding2(o4, m3, k5, k22) {
  if (k22 === void 0) k22 = k5;
  o4[k22] = m3[k5];
}
function __exportStar2(m3, exports) {
  for (var p4 in m3) if (p4 !== "default" && !exports.hasOwnProperty(p4)) exports[p4] = m3[p4];
}
function __values2(o4) {
  var s3 = typeof Symbol === "function" && Symbol.iterator, m3 = s3 && o4[s3], i4 = 0;
  if (m3) return m3.call(o4);
  if (o4 && typeof o4.length === "number") return {
    next: function() {
      if (o4 && i4 >= o4.length) o4 = void 0;
      return { value: o4 && o4[i4++], done: !o4 };
    }
  };
  throw new TypeError(s3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read2(o4, n5) {
  var m3 = typeof Symbol === "function" && o4[Symbol.iterator];
  if (!m3) return o4;
  var i4 = m3.call(o4), r3, ar4 = [], e2;
  try {
    while ((n5 === void 0 || n5-- > 0) && !(r3 = i4.next()).done) ar4.push(r3.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r3 && !r3.done && (m3 = i4["return"])) m3.call(i4);
    } finally {
      if (e2) throw e2.error;
    }
  }
  return ar4;
}
function __spread2() {
  for (var ar4 = [], i4 = 0; i4 < arguments.length; i4++)
    ar4 = ar4.concat(__read2(arguments[i4]));
  return ar4;
}
function __spreadArrays2() {
  for (var s3 = 0, i4 = 0, il = arguments.length; i4 < il; i4++) s3 += arguments[i4].length;
  for (var r3 = Array(s3), k5 = 0, i4 = 0; i4 < il; i4++)
    for (var a4 = arguments[i4], j6 = 0, jl = a4.length; j6 < jl; j6++, k5++)
      r3[k5] = a4[j6];
  return r3;
}
function __await2(v5) {
  return this instanceof __await2 ? (this.v = v5, this) : new __await2(v5);
}
function __asyncGenerator2(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g3 = generator.apply(thisArg, _arguments || []), i4, q2 = [];
  return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4;
  function verb(n5) {
    if (g3[n5]) i4[n5] = function(v5) {
      return new Promise(function(a4, b5) {
        q2.push([n5, v5, a4, b5]) > 1 || resume(n5, v5);
      });
    };
  }
  function resume(n5, v5) {
    try {
      step(g3[n5](v5));
    } catch (e2) {
      settle(q2[0][3], e2);
    }
  }
  function step(r3) {
    r3.value instanceof __await2 ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q2[0][2], r3);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f5, v5) {
    if (f5(v5), q2.shift(), q2.length) resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator2(o4) {
  var i4, p4;
  return i4 = {}, verb("next"), verb("throw", function(e2) {
    throw e2;
  }), verb("return"), i4[Symbol.iterator] = function() {
    return this;
  }, i4;
  function verb(n5, f5) {
    i4[n5] = o4[n5] ? function(v5) {
      return (p4 = !p4) ? { value: __await2(o4[n5](v5)), done: n5 === "return" } : f5 ? f5(v5) : v5;
    } : f5;
  }
}
function __asyncValues2(o4) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m3 = o4[Symbol.asyncIterator], i4;
  return m3 ? m3.call(o4) : (o4 = typeof __values2 === "function" ? __values2(o4) : o4[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4);
  function verb(n5) {
    i4[n5] = o4[n5] && function(v5) {
      return new Promise(function(resolve, reject) {
        v5 = o4[n5](v5), settle(resolve, reject, v5.done, v5.value);
      });
    };
  }
  function settle(resolve, reject, d4, v5) {
    Promise.resolve(v5).then(function(v6) {
      resolve({ value: v6, done: d4 });
    }, reject);
  }
}
function __makeTemplateObject2(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar2(mod2) {
  if (mod2 && mod2.__esModule) return mod2;
  var result = {};
  if (mod2 != null) {
    for (var k5 in mod2) if (Object.hasOwnProperty.call(mod2, k5)) result[k5] = mod2[k5];
  }
  result.default = mod2;
  return result;
}
function __importDefault2(mod2) {
  return mod2 && mod2.__esModule ? mod2 : { default: mod2 };
}
function __classPrivateFieldGet2(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet2(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics2, __assign2;
var init_tslib_es62 = __esm({
  "node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js"() {
    extendStatics2 = function(d4, b5) {
      extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d5, b6) {
        d5.__proto__ = b6;
      } || function(d5, b6) {
        for (var p4 in b6) if (b6.hasOwnProperty(p4)) d5[p4] = b6[p4];
      };
      return extendStatics2(d4, b5);
    };
    __assign2 = function() {
      __assign2 = Object.assign || function __assign3(t) {
        for (var s3, i4 = 1, n5 = arguments.length; i4 < n5; i4++) {
          s3 = arguments[i4];
          for (var p4 in s3) if (Object.prototype.hasOwnProperty.call(s3, p4)) t[p4] = s3[p4];
        }
        return t;
      };
      return __assign2.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/environment/dist/cjs/crypto.js
var require_crypto = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
    function getBrowerCrypto() {
      return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
    }
    exports.getBrowerCrypto = getBrowerCrypto;
    function getSubtleCrypto() {
      const browserCrypto = getBrowerCrypto();
      return browserCrypto.subtle || browserCrypto.webkitSubtle;
    }
    exports.getSubtleCrypto = getSubtleCrypto;
    function isBrowserCryptoAvailable() {
      return !!getBrowerCrypto() && !!getSubtleCrypto();
    }
    exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/env.js
var require_env = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/env.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
    function isReactNative() {
      return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
    }
    exports.isReactNative = isReactNative;
    function isNode2() {
      return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
    }
    exports.isNode = isNode2;
    function isBrowser() {
      return !isReactNative() && !isNode2();
    }
    exports.isBrowser = isBrowser;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/index.js
var require_cjs4 = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    tslib_1.__exportStar(require_crypto(), exports);
    tslib_1.__exportStar(require_env(), exports);
  }
});

// node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/browser.js
var require_browser2 = __commonJS({
  "node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/@walletconnect/sign-client/dist/index.js
var import_events8 = __toESM(require_events(), 1);

// node_modules/@walletconnect/core/dist/index.js
var import_events7 = __toESM(require_events(), 1);

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var import_events = __toESM(require_events());
var import_time = __toESM(require_cjs());

// node_modules/@walletconnect/events/dist/esm/events.js
var IEvents = class {
};

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var n = class extends IEvents {
  constructor(e2) {
    super();
  }
};
var s = import_time.FIVE_SECONDS;
var r = { pulse: "heartbeat_pulse" };
var i = class _i3 extends n {
  constructor(e2) {
    super(e2), this.events = new import_events.EventEmitter(), this.interval = s, this.interval = e2?.interval || s;
  }
  static async init(e2) {
    const t = new _i3(e2);
    return await t.init(), t;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), (0, import_time.toMiliseconds)(this.interval));
  }
  pulse() {
    this.events.emit(r.pulse);
  }
};

// node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

// node_modules/@walletconnect/core/node_modules/unstorage/dist/shared/unstorage.zVDD2mZo.mjs
function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
var BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c6) => c6.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}
function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys2) {
  return normalizeKey(keys2.join(":"));
}
function normalizeBaseKey(base3) {
  base3 = normalizeKey(base3);
  return base3 ? base3 + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base3) {
  if (base3) {
    return key.startsWith(base3) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

// node_modules/@walletconnect/core/node_modules/unstorage/dist/index.mjs
function defineDriver(factory) {
  return factory;
}
var DRIVER_NAME = "memory";
var memory = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});
function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base3 of context.mountpoints) {
      if (key.startsWith(base3)) {
        return {
          base: base3,
          relativeKey: key.slice(base3.length),
          driver: context.mounts[base3]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base3, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base3) || includeParent && base3.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base3.length > mountpoint.length ? base3.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r3) => r3.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r3) => r3.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base3, opts = {}) {
      base3 = normalizeBaseKey(base3);
      const mounts = getMounts(base3, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey(key);
          if (!maskedMounts.some((p4) => fullKey.startsWith(p4))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p4) => !p4.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base3)
      );
    },
    // Utils
    async clear(base3, opts = {}) {
      base3 = normalizeBaseKey(base3);
      await Promise.all(
        getMounts(base3, false).map(async (m3) => {
          if (m3.driver.clear) {
            return asyncCall(m3.driver.clear, m3.relativeBase, opts);
          }
          if (m3.driver.removeItem) {
            const keys2 = await m3.driver.getKeys(m3.relativeBase || "", opts);
            return Promise.all(
              keys2.map((key) => m3.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base3, driver) {
      base3 = normalizeBaseKey(base3);
      if (base3 && context.mounts[base3]) {
        throw new Error(`already mounted at ${base3}`);
      }
      if (base3) {
        context.mountpoints.push(base3);
        context.mountpoints.sort((a4, b5) => b5.length - a4.length);
      }
      context.mounts[base3] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base3)).then((unwatcher) => {
          context.unwatch[base3] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base3, _dispose = true) {
      base3 = normalizeBaseKey(base3);
      if (!base3 || !context.mounts[base3]) {
        return;
      }
      if (context.watching && base3 in context.unwatch) {
        context.unwatch[base3]?.();
        delete context.unwatch[base3];
      }
      if (_dispose) {
        await dispose(context.mounts[base3]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base3);
      delete context.mounts[base3];
    },
    getMount(key = "") {
      key = normalizeKey(key) + ":";
      const m3 = getMount(key);
      return {
        driver: m3.driver,
        base: m3.base
      };
    },
    getMounts(base3 = "", opts = {}) {
      base3 = normalizeKey(base3);
      const mounts = getMounts(base3, opts.parents);
      return mounts.map((m3) => ({
        driver: m3.driver,
        base: m3.mountpoint
      }));
    },
    // Aliases
    keys: (base3, opts = {}) => storage.getKeys(base3, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base3) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base3 + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

// node_modules/idb-keyval/dist/index.js
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  let dbp;
  const getDB = () => {
    if (dbp)
      return dbp;
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    dbp = promisifyRequest(request);
    dbp.then((db) => {
      db.onclose = () => dbp = void 0;
    }, () => {
    });
    return dbp;
  };
  return (txMode, callback) => getDB().then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
var defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
function clear(customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.clear();
    return promisifyRequest(store.transaction);
  });
}
function eachCursor(store, callback) {
  store.openCursor().onsuccess = function() {
    if (!this.result)
      return;
    callback(this.result);
    this.result.continue();
  };
  return promisifyRequest(store.transaction);
}
function keys(customStore = defaultGetStore()) {
  return customStore("readonly", (store) => {
    if (store.getAllKeys) {
      return promisifyRequest(store.getAllKeys());
    }
    const items = [];
    return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
  });
}

// node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify = (data) => JSON.stringify(data, (_4, value) => typeof value === "bigint" ? value.toString() + "n" : value);
var JSONParse = (json) => {
  const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
  const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
  return JSON.parse(serializedData, (_4, value) => {
    const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
    if (isCustomFormatBigInt)
      return BigInt(value.substring(0, value.length - 1));
    return value;
  });
};
function safeJsonParse(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse(value);
  } catch (_a2) {
    return value;
  }
}
function safeJsonStringify(value) {
  return typeof value === "string" ? value : JSONStringify(value) || "";
}

// node_modules/@walletconnect/core/node_modules/@walletconnect/keyvaluestorage/dist/index.es.js
var x = "idb-keyval";
var z = (i4 = {}) => {
  const t = i4.base && i4.base.length > 0 ? `${i4.base}:` : "", e2 = (s3) => t + s3;
  let n5;
  return i4.dbName && i4.storeName && (n5 = createStore(i4.dbName, i4.storeName)), { name: x, options: i4, async hasItem(s3) {
    return !(typeof await get(e2(s3), n5) > "u");
  }, async getItem(s3) {
    return await get(e2(s3), n5) ?? null;
  }, setItem(s3, a4) {
    return set(e2(s3), a4, n5);
  }, removeItem(s3) {
    return del(e2(s3), n5);
  }, getKeys() {
    return keys(n5);
  }, clear() {
    return clear(n5);
  } };
};
var D = "WALLET_CONNECT_V2_INDEXED_DB";
var E = "keyvaluestorage";
var _ = class {
  constructor() {
    this.indexedDb = createStorage({ driver: z({ dbName: D, storeName: E }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t) => [t.key, t.value]);
  }
  async getItem(t) {
    const e2 = await this.indexedDb.getItem(t);
    if (e2 !== null) return e2;
  }
  async setItem(t, e2) {
    await this.indexedDb.setItem(t, safeJsonStringify(e2));
  }
  async removeItem(t) {
    await this.indexedDb.removeItem(t);
  }
};
var l2 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var c = { exports: {} };
(function() {
  let i4;
  function t() {
  }
  i4 = t, i4.prototype.getItem = function(e2) {
    return this.hasOwnProperty(e2) ? String(this[e2]) : null;
  }, i4.prototype.setItem = function(e2, n5) {
    this[e2] = String(n5);
  }, i4.prototype.removeItem = function(e2) {
    delete this[e2];
  }, i4.prototype.clear = function() {
    const e2 = this;
    Object.keys(e2).forEach(function(n5) {
      e2[n5] = void 0, delete e2[n5];
    });
  }, i4.prototype.key = function(e2) {
    return e2 = e2 || 0, Object.keys(this)[e2];
  }, i4.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof l2 < "u" && l2.localStorage ? c.exports = l2.localStorage : typeof window < "u" && window.localStorage ? c.exports = window.localStorage : c.exports = new t();
})();
function k(i4) {
  var t;
  return [i4[0], safeJsonParse((t = i4[1]) != null ? t : "")];
}
var K = class {
  constructor() {
    this.localStorage = c.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(k);
  }
  async getItem(t) {
    const e2 = this.localStorage.getItem(t);
    if (e2 !== null) return safeJsonParse(e2);
  }
  async setItem(t, e2) {
    this.localStorage.setItem(t, safeJsonStringify(e2));
  }
  async removeItem(t) {
    this.localStorage.removeItem(t);
  }
};
var N = "wc_storage_version";
var y = 1;
var O = async (i4, t, e2) => {
  const n5 = N, s3 = await t.getItem(n5);
  if (s3 && s3 >= y) {
    e2(t);
    return;
  }
  const a4 = await i4.getKeys();
  if (!a4.length) {
    e2(t);
    return;
  }
  const m3 = [];
  for (; a4.length; ) {
    const r3 = a4.shift();
    if (!r3) continue;
    const o4 = r3.toLowerCase();
    if (o4.includes("wc@") || o4.includes("walletconnect") || o4.includes("wc_") || o4.includes("wallet_connect")) {
      const f5 = await i4.getItem(r3);
      await t.setItem(r3, f5), m3.push(r3);
    }
  }
  await t.setItem(n5, y), e2(t), j(i4, m3);
};
var j = async (i4, t) => {
  t.length && t.forEach(async (e2) => {
    await i4.removeItem(e2);
  });
};
var h = class {
  constructor() {
    this.initialized = false, this.setInitialized = (e2) => {
      this.storage = e2, this.initialized = true;
    };
    const t = new K();
    this.storage = t;
    try {
      const e2 = new _();
      O(t, e2, this.setInitialized);
    } catch {
      this.initialized = true;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(t) {
    return await this.initialize(), this.storage.getItem(t);
  }
  async setItem(t, e2) {
    return await this.initialize(), this.storage.setItem(t, e2);
  }
  async removeItem(t) {
    return await this.initialize(), this.storage.removeItem(t);
  }
  async initialize() {
    this.initialized || await new Promise((t) => {
      const e2 = setInterval(() => {
        this.initialized && (clearInterval(e2), t());
      }, 20);
    });
  }
};

// node_modules/@walletconnect/logger/dist/index.es.js
var import_pino = __toESM(require_browser());
var import_pino2 = __toESM(require_browser());
var b = { level: "info" };
var l3 = "custom_context";
var i2 = 1e3 * 1024;
var C = Object.defineProperty;
var B = (r3, e2, t) => e2 in r3 ? C(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var s2 = (r3, e2, t) => B(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var S = class {
  constructor(e2) {
    s2(this, "nodeValue"), s2(this, "sizeInBytes"), s2(this, "next"), this.nodeValue = e2, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
};
var v = class {
  constructor(e2) {
    s2(this, "lengthInNodes"), s2(this, "sizeInBytes"), s2(this, "head"), s2(this, "tail"), s2(this, "maxSizeInBytes"), this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e2, this.sizeInBytes = 0;
  }
  append(e2) {
    const t = new S(e2);
    if (t.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${e2} with size ${t.size}`);
    for (; this.size + t.size > this.maxSizeInBytes; ) this.shift();
    this.head ? (this.tail && (this.tail.next = t), this.tail = t) : (this.head = t, this.tail = t), this.lengthInNodes++, this.sizeInBytes += t.size;
  }
  shift() {
    if (!this.head) return;
    const e2 = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e2.size;
  }
  toArray() {
    const e2 = [];
    let t = this.head;
    for (; t !== null; ) e2.push(t.value), t = t.next;
    return e2;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let e2 = this.head;
    return { next: () => {
      if (!e2) return { done: true, value: null };
      const t = e2.value;
      return e2 = e2.next, { done: false, value: t };
    } };
  }
};
var _2 = Object.defineProperty;
var x2 = (r3, e2, t) => e2 in r3 ? _2(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var a2 = (r3, e2, t) => x2(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var L = class {
  constructor(e2, t = i2) {
    a2(this, "logs"), a2(this, "level"), a2(this, "levelValue"), a2(this, "MAX_LOG_SIZE_IN_BYTES"), this.level = e2 ?? "error", this.levelValue = import_pino.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new v(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e2, t) {
    t === import_pino.levels.values.error ? console.error(e2) : t === import_pino.levels.values.warn ? console.warn(e2) : t === import_pino.levels.values.debug ? console.debug(e2) : t === import_pino.levels.values.trace ? console.trace(e2) : console.log(e2);
  }
  appendToLogs(e2) {
    this.logs.append(safeJsonStringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e2 }));
    const t = typeof e2 == "string" ? JSON.parse(e2).level : e2.level;
    t >= this.levelValue && this.forwardToConsole(e2, t);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new v(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e2) {
    const t = this.getLogArray();
    return t.push(safeJsonStringify({ extraMetadata: e2 })), new Blob(t, { type: "application/json" });
  }
};
var z2 = Object.defineProperty;
var T = (r3, e2, t) => e2 in r3 ? z2(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var k2 = (r3, e2, t) => T(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var E2 = class {
  constructor(e2, t = i2) {
    k2(this, "baseChunkLogger"), this.baseChunkLogger = new L(e2, t);
  }
  write(e2) {
    this.baseChunkLogger.appendToLogs(e2);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e2) {
    return this.baseChunkLogger.logsToBlob(e2);
  }
  downloadLogsBlobInBrowser(e2) {
    const t = URL.createObjectURL(this.logsToBlob(e2)), o4 = document.createElement("a");
    o4.href = t, o4.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(o4), o4.click(), document.body.removeChild(o4), URL.revokeObjectURL(t);
  }
};
var A = Object.defineProperty;
var $ = (r3, e2, t) => e2 in r3 ? A(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var N2 = (r3, e2, t) => $(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var j2 = class {
  constructor(e2, t = i2) {
    N2(this, "baseChunkLogger"), this.baseChunkLogger = new L(e2, t);
  }
  write(e2) {
    this.baseChunkLogger.appendToLogs(e2);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e2) {
    return this.baseChunkLogger.logsToBlob(e2);
  }
};
var P = Object.defineProperty;
var V = Object.defineProperties;
var G = Object.getOwnPropertyDescriptors;
var p = Object.getOwnPropertySymbols;
var M = Object.prototype.hasOwnProperty;
var U = Object.prototype.propertyIsEnumerable;
var f = (r3, e2, t) => e2 in r3 ? P(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var g = (r3, e2) => {
  for (var t in e2 || (e2 = {})) M.call(e2, t) && f(r3, t, e2[t]);
  if (p) for (var t of p(e2)) U.call(e2, t) && f(r3, t, e2[t]);
  return r3;
};
var h2 = (r3, e2) => V(r3, G(e2));
function D2(r3) {
  return h2(g({}, r3), { level: r3?.level || b.level });
}
function y2(r3, e2, t = l3) {
  return r3[t] = e2, r3;
}
function w(r3, e2 = l3) {
  return r3[e2] || "";
}
function m(r3, e2, t = l3) {
  const o4 = w(r3, t);
  return o4.trim() ? `${o4}/${e2}` : e2;
}
function X(r3, e2, t = l3) {
  const o4 = m(r3, e2, t), u2 = r3.child({ context: o4 });
  return y2(u2, o4, t);
}
function I(r3) {
  var e2, t;
  const o4 = new E2((e2 = r3.opts) == null ? void 0 : e2.level, r3.maxSizeInBytes);
  return { logger: (0, import_pino.default)(h2(g({}, r3.opts), { level: "trace", browser: h2(g({}, (t = r3.opts) == null ? void 0 : t.browser), { write: (u2) => o4.write(u2) }) })), chunkLoggerController: o4 };
}
function O2(r3) {
  var e2;
  const t = new j2((e2 = r3.opts) == null ? void 0 : e2.level, r3.maxSizeInBytes);
  return { logger: (0, import_pino.default)(h2(g({}, r3.opts), { level: "trace" }), t), chunkLoggerController: t };
}
function Y(r3) {
  return typeof r3.loggerOverride < "u" && typeof r3.loggerOverride != "string" ? { logger: r3.loggerOverride, chunkLoggerController: null } : typeof window < "u" ? I(r3) : O2(r3);
}

// node_modules/@walletconnect/types/dist/index.js
var import_events4 = __toESM(require_events());
var a3 = Object.defineProperty;
var u = (e2, s3, r3) => s3 in e2 ? a3(e2, s3, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[s3] = r3;
var c3 = (e2, s3, r3) => u(e2, typeof s3 != "symbol" ? s3 + "" : s3, r3);
var h3 = class extends IEvents {
  constructor(s3) {
    super(), this.opts = s3, c3(this, "protocol", "wc"), c3(this, "version", 2);
  }
};
var p2 = Object.defineProperty;
var b2 = (e2, s3, r3) => s3 in e2 ? p2(e2, s3, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[s3] = r3;
var v2 = (e2, s3, r3) => b2(e2, typeof s3 != "symbol" ? s3 + "" : s3, r3);
var I2 = class extends IEvents {
  constructor(s3, r3) {
    super(), this.core = s3, this.logger = r3, v2(this, "records", /* @__PURE__ */ new Map());
  }
};
var y3 = class {
  constructor(s3, r3) {
    this.logger = s3, this.core = r3;
  }
};
var m2 = class extends IEvents {
  constructor(s3, r3) {
    super(), this.relayer = s3, this.logger = r3;
  }
};
var d = class extends IEvents {
  constructor(s3) {
    super();
  }
};
var f2 = class {
  constructor(s3, r3, t, q2) {
    this.core = s3, this.logger = r3, this.name = t;
  }
};
var P2 = class extends IEvents {
  constructor(s3, r3) {
    super(), this.relayer = s3, this.logger = r3;
  }
};
var S2 = class extends IEvents {
  constructor(s3, r3) {
    super(), this.core = s3, this.logger = r3;
  }
};
var M2 = class {
  constructor(s3, r3, t) {
    this.core = s3, this.logger = r3, this.store = t;
  }
};
var O3 = class {
  constructor(s3, r3) {
    this.projectId = s3, this.logger = r3;
  }
};
var R = class {
  constructor(s3, r3, t) {
    this.core = s3, this.logger = r3, this.telemetryEnabled = t;
  }
};
var T2 = Object.defineProperty;
var k3 = (e2, s3, r3) => s3 in e2 ? T2(e2, s3, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[s3] = r3;
var i3 = (e2, s3, r3) => k3(e2, typeof s3 != "symbol" ? s3 + "" : s3, r3);
var J = class {
  constructor(s3) {
    this.opts = s3, i3(this, "protocol", "wc"), i3(this, "version", 2);
  }
};
var V2 = class {
  constructor(s3) {
    this.client = s3;
  }
};

// node_modules/@walletconnect/core/dist/index.js
var import_time4 = __toESM(require_cjs(), 1);

// node_modules/@walletconnect/relay-auth/dist/index.es.js
var import_time2 = __toESM(require_cjs());
function En(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function fe(t, ...e2) {
  if (!En(t)) throw new Error("Uint8Array expected");
  if (e2.length > 0 && !e2.includes(t.length)) throw new Error("Uint8Array expected of length " + e2 + ", got length=" + t.length);
}
function De(t, e2 = true) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e2 && t.finished) throw new Error("Hash#digest() has already been called");
}
function gn(t, e2) {
  fe(t);
  const n5 = e2.outputLen;
  if (t.length < n5) throw new Error("digestInto() expects output buffer of length at least " + n5);
}
var it = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
var _t = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength);
function yn(t) {
  if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function de(t) {
  return typeof t == "string" && (t = yn(t)), fe(t), t;
}
var xn = class {
  clone() {
    return this._cloneInto();
  }
};
function Bn(t) {
  const e2 = (r3) => t().update(de(r3)).digest(), n5 = t();
  return e2.outputLen = n5.outputLen, e2.blockLen = n5.blockLen, e2.create = () => t(), e2;
}
function he(t = 32) {
  if (it && typeof it.getRandomValues == "function") return it.getRandomValues(new Uint8Array(t));
  if (it && typeof it.randomBytes == "function") return it.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
function Cn(t, e2, n5, r3) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e2, n5, r3);
  const o4 = BigInt(32), s3 = BigInt(4294967295), a4 = Number(n5 >> o4 & s3), u2 = Number(n5 & s3), i4 = r3 ? 4 : 0, D3 = r3 ? 0 : 4;
  t.setUint32(e2 + i4, a4, r3), t.setUint32(e2 + D3, u2, r3);
}
var An = class extends xn {
  constructor(e2, n5, r3, o4) {
    super(), this.blockLen = e2, this.outputLen = n5, this.padOffset = r3, this.isLE = o4, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e2), this.view = _t(this.buffer);
  }
  update(e2) {
    De(this);
    const { view: n5, buffer: r3, blockLen: o4 } = this;
    e2 = de(e2);
    const s3 = e2.length;
    for (let a4 = 0; a4 < s3; ) {
      const u2 = Math.min(o4 - this.pos, s3 - a4);
      if (u2 === o4) {
        const i4 = _t(e2);
        for (; o4 <= s3 - a4; a4 += o4) this.process(i4, a4);
        continue;
      }
      r3.set(e2.subarray(a4, a4 + u2), this.pos), this.pos += u2, a4 += u2, this.pos === o4 && (this.process(n5, 0), this.pos = 0);
    }
    return this.length += e2.length, this.roundClean(), this;
  }
  digestInto(e2) {
    De(this), gn(e2, this), this.finished = true;
    const { buffer: n5, view: r3, blockLen: o4, isLE: s3 } = this;
    let { pos: a4 } = this;
    n5[a4++] = 128, this.buffer.subarray(a4).fill(0), this.padOffset > o4 - a4 && (this.process(r3, 0), a4 = 0);
    for (let l6 = a4; l6 < o4; l6++) n5[l6] = 0;
    Cn(r3, o4 - 8, BigInt(this.length * 8), s3), this.process(r3, 0);
    const u2 = _t(e2), i4 = this.outputLen;
    if (i4 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const D3 = i4 / 4, c6 = this.get();
    if (D3 > c6.length) throw new Error("_sha2: outputLen bigger than state");
    for (let l6 = 0; l6 < D3; l6++) u2.setUint32(4 * l6, c6[l6], s3);
  }
  digest() {
    const { buffer: e2, outputLen: n5 } = this;
    this.digestInto(e2);
    const r3 = e2.slice(0, n5);
    return this.destroy(), r3;
  }
  _cloneInto(e2) {
    e2 || (e2 = new this.constructor()), e2.set(...this.get());
    const { blockLen: n5, buffer: r3, length: o4, finished: s3, destroyed: a4, pos: u2 } = this;
    return e2.length = o4, e2.pos = u2, e2.finished = s3, e2.destroyed = a4, o4 % n5 && e2.buffer.set(r3), e2;
  }
};
var wt = BigInt(2 ** 32 - 1);
var St = BigInt(32);
function le(t, e2 = false) {
  return e2 ? { h: Number(t & wt), l: Number(t >> St & wt) } : { h: Number(t >> St & wt) | 0, l: Number(t & wt) | 0 };
}
function mn(t, e2 = false) {
  let n5 = new Uint32Array(t.length), r3 = new Uint32Array(t.length);
  for (let o4 = 0; o4 < t.length; o4++) {
    const { h: s3, l: a4 } = le(t[o4], e2);
    [n5[o4], r3[o4]] = [s3, a4];
  }
  return [n5, r3];
}
var _n = (t, e2) => BigInt(t >>> 0) << St | BigInt(e2 >>> 0);
var Sn = (t, e2, n5) => t >>> n5;
var vn = (t, e2, n5) => t << 32 - n5 | e2 >>> n5;
var In = (t, e2, n5) => t >>> n5 | e2 << 32 - n5;
var Un = (t, e2, n5) => t << 32 - n5 | e2 >>> n5;
var Tn = (t, e2, n5) => t << 64 - n5 | e2 >>> n5 - 32;
var Fn = (t, e2, n5) => t >>> n5 - 32 | e2 << 64 - n5;
var Nn = (t, e2) => e2;
var Ln = (t, e2) => t;
var On = (t, e2, n5) => t << n5 | e2 >>> 32 - n5;
var Hn = (t, e2, n5) => e2 << n5 | t >>> 32 - n5;
var zn = (t, e2, n5) => e2 << n5 - 32 | t >>> 64 - n5;
var Mn = (t, e2, n5) => t << n5 - 32 | e2 >>> 64 - n5;
function qn(t, e2, n5, r3) {
  const o4 = (e2 >>> 0) + (r3 >>> 0);
  return { h: t + n5 + (o4 / 2 ** 32 | 0) | 0, l: o4 | 0 };
}
var $n = (t, e2, n5) => (t >>> 0) + (e2 >>> 0) + (n5 >>> 0);
var kn = (t, e2, n5, r3) => e2 + n5 + r3 + (t / 2 ** 32 | 0) | 0;
var Rn = (t, e2, n5, r3) => (t >>> 0) + (e2 >>> 0) + (n5 >>> 0) + (r3 >>> 0);
var jn = (t, e2, n5, r3, o4) => e2 + n5 + r3 + o4 + (t / 2 ** 32 | 0) | 0;
var Zn = (t, e2, n5, r3, o4) => (t >>> 0) + (e2 >>> 0) + (n5 >>> 0) + (r3 >>> 0) + (o4 >>> 0);
var Gn = (t, e2, n5, r3, o4, s3) => e2 + n5 + r3 + o4 + s3 + (t / 2 ** 32 | 0) | 0;
var x3 = { fromBig: le, split: mn, toBig: _n, shrSH: Sn, shrSL: vn, rotrSH: In, rotrSL: Un, rotrBH: Tn, rotrBL: Fn, rotr32H: Nn, rotr32L: Ln, rotlSH: On, rotlSL: Hn, rotlBH: zn, rotlBL: Mn, add: qn, add3L: $n, add3H: kn, add4L: Rn, add4H: jn, add5H: Gn, add5L: Zn };
var [Vn, Yn] = (() => x3.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t) => BigInt(t))))();
var P3 = new Uint32Array(80);
var Q = new Uint32Array(80);
var Jn = class extends An {
  constructor() {
    super(128, 64, 16, false), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  get() {
    const { Ah: e2, Al: n5, Bh: r3, Bl: o4, Ch: s3, Cl: a4, Dh: u2, Dl: i4, Eh: D3, El: c6, Fh: l6, Fl: p4, Gh: w3, Gl: h5, Hh: g3, Hl: S4 } = this;
    return [e2, n5, r3, o4, s3, a4, u2, i4, D3, c6, l6, p4, w3, h5, g3, S4];
  }
  set(e2, n5, r3, o4, s3, a4, u2, i4, D3, c6, l6, p4, w3, h5, g3, S4) {
    this.Ah = e2 | 0, this.Al = n5 | 0, this.Bh = r3 | 0, this.Bl = o4 | 0, this.Ch = s3 | 0, this.Cl = a4 | 0, this.Dh = u2 | 0, this.Dl = i4 | 0, this.Eh = D3 | 0, this.El = c6 | 0, this.Fh = l6 | 0, this.Fl = p4 | 0, this.Gh = w3 | 0, this.Gl = h5 | 0, this.Hh = g3 | 0, this.Hl = S4 | 0;
  }
  process(e2, n5) {
    for (let d4 = 0; d4 < 16; d4++, n5 += 4) P3[d4] = e2.getUint32(n5), Q[d4] = e2.getUint32(n5 += 4);
    for (let d4 = 16; d4 < 80; d4++) {
      const m3 = P3[d4 - 15] | 0, F = Q[d4 - 15] | 0, q2 = x3.rotrSH(m3, F, 1) ^ x3.rotrSH(m3, F, 8) ^ x3.shrSH(m3, F, 7), z5 = x3.rotrSL(m3, F, 1) ^ x3.rotrSL(m3, F, 8) ^ x3.shrSL(m3, F, 7), I3 = P3[d4 - 2] | 0, O5 = Q[d4 - 2] | 0, ot2 = x3.rotrSH(I3, O5, 19) ^ x3.rotrBH(I3, O5, 61) ^ x3.shrSH(I3, O5, 6), tt3 = x3.rotrSL(I3, O5, 19) ^ x3.rotrBL(I3, O5, 61) ^ x3.shrSL(I3, O5, 6), st3 = x3.add4L(z5, tt3, Q[d4 - 7], Q[d4 - 16]), at = x3.add4H(st3, q2, ot2, P3[d4 - 7], P3[d4 - 16]);
      P3[d4] = at | 0, Q[d4] = st3 | 0;
    }
    let { Ah: r3, Al: o4, Bh: s3, Bl: a4, Ch: u2, Cl: i4, Dh: D3, Dl: c6, Eh: l6, El: p4, Fh: w3, Fl: h5, Gh: g3, Gl: S4, Hh: v5, Hl: L2 } = this;
    for (let d4 = 0; d4 < 80; d4++) {
      const m3 = x3.rotrSH(l6, p4, 14) ^ x3.rotrSH(l6, p4, 18) ^ x3.rotrBH(l6, p4, 41), F = x3.rotrSL(l6, p4, 14) ^ x3.rotrSL(l6, p4, 18) ^ x3.rotrBL(l6, p4, 41), q2 = l6 & w3 ^ ~l6 & g3, z5 = p4 & h5 ^ ~p4 & S4, I3 = x3.add5L(L2, F, z5, Yn[d4], Q[d4]), O5 = x3.add5H(I3, v5, m3, q2, Vn[d4], P3[d4]), ot2 = I3 | 0, tt3 = x3.rotrSH(r3, o4, 28) ^ x3.rotrBH(r3, o4, 34) ^ x3.rotrBH(r3, o4, 39), st3 = x3.rotrSL(r3, o4, 28) ^ x3.rotrBL(r3, o4, 34) ^ x3.rotrBL(r3, o4, 39), at = r3 & s3 ^ r3 & u2 ^ s3 & u2, Ct3 = o4 & a4 ^ o4 & i4 ^ a4 & i4;
      v5 = g3 | 0, L2 = S4 | 0, g3 = w3 | 0, S4 = h5 | 0, w3 = l6 | 0, h5 = p4 | 0, { h: l6, l: p4 } = x3.add(D3 | 0, c6 | 0, O5 | 0, ot2 | 0), D3 = u2 | 0, c6 = i4 | 0, u2 = s3 | 0, i4 = a4 | 0, s3 = r3 | 0, a4 = o4 | 0;
      const At3 = x3.add3L(ot2, st3, Ct3);
      r3 = x3.add3H(At3, O5, tt3, at), o4 = At3 | 0;
    }
    ({ h: r3, l: o4 } = x3.add(this.Ah | 0, this.Al | 0, r3 | 0, o4 | 0)), { h: s3, l: a4 } = x3.add(this.Bh | 0, this.Bl | 0, s3 | 0, a4 | 0), { h: u2, l: i4 } = x3.add(this.Ch | 0, this.Cl | 0, u2 | 0, i4 | 0), { h: D3, l: c6 } = x3.add(this.Dh | 0, this.Dl | 0, D3 | 0, c6 | 0), { h: l6, l: p4 } = x3.add(this.Eh | 0, this.El | 0, l6 | 0, p4 | 0), { h: w3, l: h5 } = x3.add(this.Fh | 0, this.Fl | 0, w3 | 0, h5 | 0), { h: g3, l: S4 } = x3.add(this.Gh | 0, this.Gl | 0, g3 | 0, S4 | 0), { h: v5, l: L2 } = x3.add(this.Hh | 0, this.Hl | 0, v5 | 0, L2 | 0), this.set(r3, o4, s3, a4, u2, i4, D3, c6, l6, p4, w3, h5, g3, S4, v5, L2);
  }
  roundClean() {
    P3.fill(0), Q.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var Kn = Bn(() => new Jn());
var vt = BigInt(0);
var be = BigInt(1);
var Wn = BigInt(2);
function It(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Ut(t) {
  if (!It(t)) throw new Error("Uint8Array expected");
}
function Tt(t, e2) {
  if (typeof e2 != "boolean") throw new Error(t + " boolean expected, got " + e2);
}
var Xn = Array.from({ length: 256 }, (t, e2) => e2.toString(16).padStart(2, "0"));
function Ft(t) {
  Ut(t);
  let e2 = "";
  for (let n5 = 0; n5 < t.length; n5++) e2 += Xn[t[n5]];
  return e2;
}
function pe(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? vt : BigInt("0x" + t);
}
var K3 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function we(t) {
  if (t >= K3._0 && t <= K3._9) return t - K3._0;
  if (t >= K3.A && t <= K3.F) return t - (K3.A - 10);
  if (t >= K3.a && t <= K3.f) return t - (K3.a - 10);
}
function Ee(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  const e2 = t.length, n5 = e2 / 2;
  if (e2 % 2) throw new Error("hex string expected, got unpadded hex of length " + e2);
  const r3 = new Uint8Array(n5);
  for (let o4 = 0, s3 = 0; o4 < n5; o4++, s3 += 2) {
    const a4 = we(t.charCodeAt(s3)), u2 = we(t.charCodeAt(s3 + 1));
    if (a4 === void 0 || u2 === void 0) {
      const i4 = t[s3] + t[s3 + 1];
      throw new Error('hex string expected, got non-hex character "' + i4 + '" at index ' + s3);
    }
    r3[o4] = a4 * 16 + u2;
  }
  return r3;
}
function Pn(t) {
  return pe(Ft(t));
}
function Et(t) {
  return Ut(t), pe(Ft(Uint8Array.from(t).reverse()));
}
function ge(t, e2) {
  return Ee(t.toString(16).padStart(e2 * 2, "0"));
}
function Nt(t, e2) {
  return ge(t, e2).reverse();
}
function W(t, e2, n5) {
  let r3;
  if (typeof e2 == "string") try {
    r3 = Ee(e2);
  } catch (s3) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + s3);
  }
  else if (It(e2)) r3 = Uint8Array.from(e2);
  else throw new Error(t + " must be hex string or Uint8Array");
  const o4 = r3.length;
  if (typeof n5 == "number" && o4 !== n5) throw new Error(t + " of length " + n5 + " expected, got " + o4);
  return r3;
}
function ye(...t) {
  let e2 = 0;
  for (let r3 = 0; r3 < t.length; r3++) {
    const o4 = t[r3];
    Ut(o4), e2 += o4.length;
  }
  const n5 = new Uint8Array(e2);
  for (let r3 = 0, o4 = 0; r3 < t.length; r3++) {
    const s3 = t[r3];
    n5.set(s3, o4), o4 += s3.length;
  }
  return n5;
}
var Lt = (t) => typeof t == "bigint" && vt <= t;
function Qn(t, e2, n5) {
  return Lt(t) && Lt(e2) && Lt(n5) && e2 <= t && t < n5;
}
function ft(t, e2, n5, r3) {
  if (!Qn(e2, n5, r3)) throw new Error("expected valid " + t + ": " + n5 + " <= n < " + r3 + ", got " + e2);
}
function tr(t) {
  let e2;
  for (e2 = 0; t > vt; t >>= be, e2 += 1) ;
  return e2;
}
var er = (t) => (Wn << BigInt(t - 1)) - be;
var nr = { bigint: (t) => typeof t == "bigint", function: (t) => typeof t == "function", boolean: (t) => typeof t == "boolean", string: (t) => typeof t == "string", stringOrUint8Array: (t) => typeof t == "string" || It(t), isSafeInteger: (t) => Number.isSafeInteger(t), array: (t) => Array.isArray(t), field: (t, e2) => e2.Fp.isValid(t), hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen) };
function Ot(t, e2, n5 = {}) {
  const r3 = (o4, s3, a4) => {
    const u2 = nr[s3];
    if (typeof u2 != "function") throw new Error("invalid validator function");
    const i4 = t[o4];
    if (!(a4 && i4 === void 0) && !u2(i4, t)) throw new Error("param " + String(o4) + " is invalid. Expected " + s3 + ", got " + i4);
  };
  for (const [o4, s3] of Object.entries(e2)) r3(o4, s3, false);
  for (const [o4, s3] of Object.entries(n5)) r3(o4, s3, true);
  return t;
}
function xe(t) {
  const e2 = /* @__PURE__ */ new WeakMap();
  return (n5, ...r3) => {
    const o4 = e2.get(n5);
    if (o4 !== void 0) return o4;
    const s3 = t(n5, ...r3);
    return e2.set(n5, s3), s3;
  };
}
var M3 = BigInt(0);
var N3 = BigInt(1);
var nt = BigInt(2);
var rr = BigInt(3);
var Ht = BigInt(4);
var Be = BigInt(5);
var Ce = BigInt(8);
function H(t, e2) {
  const n5 = t % e2;
  return n5 >= M3 ? n5 : e2 + n5;
}
function or(t, e2, n5) {
  if (e2 < M3) throw new Error("invalid exponent, negatives unsupported");
  if (n5 <= M3) throw new Error("invalid modulus");
  if (n5 === N3) return M3;
  let r3 = N3;
  for (; e2 > M3; ) e2 & N3 && (r3 = r3 * t % n5), t = t * t % n5, e2 >>= N3;
  return r3;
}
function J2(t, e2, n5) {
  let r3 = t;
  for (; e2-- > M3; ) r3 *= r3, r3 %= n5;
  return r3;
}
function Ae(t, e2) {
  if (t === M3) throw new Error("invert: expected non-zero number");
  if (e2 <= M3) throw new Error("invert: expected positive modulus, got " + e2);
  let n5 = H(t, e2), r3 = e2, o4 = M3, s3 = N3;
  for (; n5 !== M3; ) {
    const u2 = r3 / n5, i4 = r3 % n5, D3 = o4 - s3 * u2;
    r3 = n5, n5 = i4, o4 = s3, s3 = D3;
  }
  if (r3 !== N3) throw new Error("invert: does not exist");
  return H(o4, e2);
}
function sr(t) {
  const e2 = (t - N3) / nt;
  let n5, r3, o4;
  for (n5 = t - N3, r3 = 0; n5 % nt === M3; n5 /= nt, r3++) ;
  for (o4 = nt; o4 < t && or(o4, e2, t) !== t - N3; o4++) if (o4 > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r3 === 1) {
    const a4 = (t + N3) / Ht;
    return function(i4, D3) {
      const c6 = i4.pow(D3, a4);
      if (!i4.eql(i4.sqr(c6), D3)) throw new Error("Cannot find square root");
      return c6;
    };
  }
  const s3 = (n5 + N3) / nt;
  return function(u2, i4) {
    if (u2.pow(i4, e2) === u2.neg(u2.ONE)) throw new Error("Cannot find square root");
    let D3 = r3, c6 = u2.pow(u2.mul(u2.ONE, o4), n5), l6 = u2.pow(i4, s3), p4 = u2.pow(i4, n5);
    for (; !u2.eql(p4, u2.ONE); ) {
      if (u2.eql(p4, u2.ZERO)) return u2.ZERO;
      let w3 = 1;
      for (let g3 = u2.sqr(p4); w3 < D3 && !u2.eql(g3, u2.ONE); w3++) g3 = u2.sqr(g3);
      const h5 = u2.pow(c6, N3 << BigInt(D3 - w3 - 1));
      c6 = u2.sqr(h5), l6 = u2.mul(l6, h5), p4 = u2.mul(p4, c6), D3 = w3;
    }
    return l6;
  };
}
function ir(t) {
  if (t % Ht === rr) {
    const e2 = (t + N3) / Ht;
    return function(r3, o4) {
      const s3 = r3.pow(o4, e2);
      if (!r3.eql(r3.sqr(s3), o4)) throw new Error("Cannot find square root");
      return s3;
    };
  }
  if (t % Ce === Be) {
    const e2 = (t - Be) / Ce;
    return function(r3, o4) {
      const s3 = r3.mul(o4, nt), a4 = r3.pow(s3, e2), u2 = r3.mul(o4, a4), i4 = r3.mul(r3.mul(u2, nt), a4), D3 = r3.mul(u2, r3.sub(i4, r3.ONE));
      if (!r3.eql(r3.sqr(D3), o4)) throw new Error("Cannot find square root");
      return D3;
    };
  }
  return sr(t);
}
var ur = (t, e2) => (H(t, e2) & N3) === N3;
var cr = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function ar(t) {
  const e2 = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, n5 = cr.reduce((r3, o4) => (r3[o4] = "function", r3), e2);
  return Ot(t, n5);
}
function fr(t, e2, n5) {
  if (n5 < M3) throw new Error("invalid exponent, negatives unsupported");
  if (n5 === M3) return t.ONE;
  if (n5 === N3) return e2;
  let r3 = t.ONE, o4 = e2;
  for (; n5 > M3; ) n5 & N3 && (r3 = t.mul(r3, o4)), o4 = t.sqr(o4), n5 >>= N3;
  return r3;
}
function Dr(t, e2) {
  const n5 = new Array(e2.length), r3 = e2.reduce((s3, a4, u2) => t.is0(a4) ? s3 : (n5[u2] = s3, t.mul(s3, a4)), t.ONE), o4 = t.inv(r3);
  return e2.reduceRight((s3, a4, u2) => t.is0(a4) ? s3 : (n5[u2] = t.mul(s3, n5[u2]), t.mul(s3, a4)), o4), n5;
}
function me(t, e2) {
  const n5 = e2 !== void 0 ? e2 : t.toString(2).length, r3 = Math.ceil(n5 / 8);
  return { nBitLength: n5, nByteLength: r3 };
}
function _e(t, e2, n5 = false, r3 = {}) {
  if (t <= M3) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: o4, nByteLength: s3 } = me(t, e2);
  if (s3 > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a4;
  const u2 = Object.freeze({ ORDER: t, isLE: n5, BITS: o4, BYTES: s3, MASK: er(o4), ZERO: M3, ONE: N3, create: (i4) => H(i4, t), isValid: (i4) => {
    if (typeof i4 != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof i4);
    return M3 <= i4 && i4 < t;
  }, is0: (i4) => i4 === M3, isOdd: (i4) => (i4 & N3) === N3, neg: (i4) => H(-i4, t), eql: (i4, D3) => i4 === D3, sqr: (i4) => H(i4 * i4, t), add: (i4, D3) => H(i4 + D3, t), sub: (i4, D3) => H(i4 - D3, t), mul: (i4, D3) => H(i4 * D3, t), pow: (i4, D3) => fr(u2, i4, D3), div: (i4, D3) => H(i4 * Ae(D3, t), t), sqrN: (i4) => i4 * i4, addN: (i4, D3) => i4 + D3, subN: (i4, D3) => i4 - D3, mulN: (i4, D3) => i4 * D3, inv: (i4) => Ae(i4, t), sqrt: r3.sqrt || ((i4) => (a4 || (a4 = ir(t)), a4(u2, i4))), invertBatch: (i4) => Dr(u2, i4), cmov: (i4, D3, c6) => c6 ? D3 : i4, toBytes: (i4) => n5 ? Nt(i4, s3) : ge(i4, s3), fromBytes: (i4) => {
    if (i4.length !== s3) throw new Error("Field.fromBytes: expected " + s3 + " bytes, got " + i4.length);
    return n5 ? Et(i4) : Pn(i4);
  } });
  return Object.freeze(u2);
}
var Se = BigInt(0);
var gt = BigInt(1);
function zt(t, e2) {
  const n5 = e2.negate();
  return t ? n5 : e2;
}
function ve(t, e2) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e2) throw new Error("invalid window size, expected [1.." + e2 + "], got W=" + t);
}
function Mt(t, e2) {
  ve(t, e2);
  const n5 = Math.ceil(e2 / t) + 1, r3 = 2 ** (t - 1);
  return { windows: n5, windowSize: r3 };
}
function dr(t, e2) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((n5, r3) => {
    if (!(n5 instanceof e2)) throw new Error("invalid point at index " + r3);
  });
}
function hr(t, e2) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((n5, r3) => {
    if (!e2.isValid(n5)) throw new Error("invalid scalar at index " + r3);
  });
}
var qt = /* @__PURE__ */ new WeakMap();
var Ie = /* @__PURE__ */ new WeakMap();
function $t(t) {
  return Ie.get(t) || 1;
}
function lr(t, e2) {
  return { constTimeNegate: zt, hasPrecomputes(n5) {
    return $t(n5) !== 1;
  }, unsafeLadder(n5, r3, o4 = t.ZERO) {
    let s3 = n5;
    for (; r3 > Se; ) r3 & gt && (o4 = o4.add(s3)), s3 = s3.double(), r3 >>= gt;
    return o4;
  }, precomputeWindow(n5, r3) {
    const { windows: o4, windowSize: s3 } = Mt(r3, e2), a4 = [];
    let u2 = n5, i4 = u2;
    for (let D3 = 0; D3 < o4; D3++) {
      i4 = u2, a4.push(i4);
      for (let c6 = 1; c6 < s3; c6++) i4 = i4.add(u2), a4.push(i4);
      u2 = i4.double();
    }
    return a4;
  }, wNAF(n5, r3, o4) {
    const { windows: s3, windowSize: a4 } = Mt(n5, e2);
    let u2 = t.ZERO, i4 = t.BASE;
    const D3 = BigInt(2 ** n5 - 1), c6 = 2 ** n5, l6 = BigInt(n5);
    for (let p4 = 0; p4 < s3; p4++) {
      const w3 = p4 * a4;
      let h5 = Number(o4 & D3);
      o4 >>= l6, h5 > a4 && (h5 -= c6, o4 += gt);
      const g3 = w3, S4 = w3 + Math.abs(h5) - 1, v5 = p4 % 2 !== 0, L2 = h5 < 0;
      h5 === 0 ? i4 = i4.add(zt(v5, r3[g3])) : u2 = u2.add(zt(L2, r3[S4]));
    }
    return { p: u2, f: i4 };
  }, wNAFUnsafe(n5, r3, o4, s3 = t.ZERO) {
    const { windows: a4, windowSize: u2 } = Mt(n5, e2), i4 = BigInt(2 ** n5 - 1), D3 = 2 ** n5, c6 = BigInt(n5);
    for (let l6 = 0; l6 < a4; l6++) {
      const p4 = l6 * u2;
      if (o4 === Se) break;
      let w3 = Number(o4 & i4);
      if (o4 >>= c6, w3 > u2 && (w3 -= D3, o4 += gt), w3 === 0) continue;
      let h5 = r3[p4 + Math.abs(w3) - 1];
      w3 < 0 && (h5 = h5.negate()), s3 = s3.add(h5);
    }
    return s3;
  }, getPrecomputes(n5, r3, o4) {
    let s3 = qt.get(r3);
    return s3 || (s3 = this.precomputeWindow(r3, n5), n5 !== 1 && qt.set(r3, o4(s3))), s3;
  }, wNAFCached(n5, r3, o4) {
    const s3 = $t(n5);
    return this.wNAF(s3, this.getPrecomputes(s3, n5, o4), r3);
  }, wNAFCachedUnsafe(n5, r3, o4, s3) {
    const a4 = $t(n5);
    return a4 === 1 ? this.unsafeLadder(n5, r3, s3) : this.wNAFUnsafe(a4, this.getPrecomputes(a4, n5, o4), r3, s3);
  }, setWindowSize(n5, r3) {
    ve(r3, e2), Ie.set(n5, r3), qt.delete(n5);
  } };
}
function br(t, e2, n5, r3) {
  if (dr(n5, t), hr(r3, e2), n5.length !== r3.length) throw new Error("arrays of points and scalars must have equal length");
  const o4 = t.ZERO, s3 = tr(BigInt(n5.length)), a4 = s3 > 12 ? s3 - 3 : s3 > 4 ? s3 - 2 : s3 ? 2 : 1, u2 = (1 << a4) - 1, i4 = new Array(u2 + 1).fill(o4), D3 = Math.floor((e2.BITS - 1) / a4) * a4;
  let c6 = o4;
  for (let l6 = D3; l6 >= 0; l6 -= a4) {
    i4.fill(o4);
    for (let w3 = 0; w3 < r3.length; w3++) {
      const h5 = r3[w3], g3 = Number(h5 >> BigInt(l6) & BigInt(u2));
      i4[g3] = i4[g3].add(n5[w3]);
    }
    let p4 = o4;
    for (let w3 = i4.length - 1, h5 = o4; w3 > 0; w3--) h5 = h5.add(i4[w3]), p4 = p4.add(h5);
    if (c6 = c6.add(p4), l6 !== 0) for (let w3 = 0; w3 < a4; w3++) c6 = c6.double();
  }
  return c6;
}
function pr(t) {
  return ar(t.Fp), Ot(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...me(t.n, t.nBitLength), ...t, p: t.Fp.ORDER });
}
var G2 = BigInt(0);
var j3 = BigInt(1);
var yt = BigInt(2);
var wr = BigInt(8);
var Er = { zip215: true };
function gr(t) {
  const e2 = pr(t);
  return Ot(t, { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" }, { adjustScalarBytes: "function", domain: "function", uvRatio: "function", mapToCurve: "function" }), Object.freeze({ ...e2 });
}
function yr(t) {
  const e2 = gr(t), { Fp: n5, n: r3, prehash: o4, hash: s3, randomBytes: a4, nByteLength: u2, h: i4 } = e2, D3 = yt << BigInt(u2 * 8) - j3, c6 = n5.create, l6 = _e(e2.n, e2.nBitLength), p4 = e2.uvRatio || ((y4, f5) => {
    try {
      return { isValid: true, value: n5.sqrt(y4 * n5.inv(f5)) };
    } catch {
      return { isValid: false, value: G2 };
    }
  }), w3 = e2.adjustScalarBytes || ((y4) => y4), h5 = e2.domain || ((y4, f5, b5) => {
    if (Tt("phflag", b5), f5.length || b5) throw new Error("Contexts/pre-hash are not supported");
    return y4;
  });
  function g3(y4, f5) {
    ft("coordinate " + y4, f5, G2, D3);
  }
  function S4(y4) {
    if (!(y4 instanceof d4)) throw new Error("ExtendedPoint expected");
  }
  const v5 = xe((y4, f5) => {
    const { ex: b5, ey: E4, ez: B2 } = y4, C4 = y4.is0();
    f5 == null && (f5 = C4 ? wr : n5.inv(B2));
    const A3 = c6(b5 * f5), U3 = c6(E4 * f5), _4 = c6(B2 * f5);
    if (C4) return { x: G2, y: j3 };
    if (_4 !== j3) throw new Error("invZ was invalid");
    return { x: A3, y: U3 };
  }), L2 = xe((y4) => {
    const { a: f5, d: b5 } = e2;
    if (y4.is0()) throw new Error("bad point: ZERO");
    const { ex: E4, ey: B2, ez: C4, et: A3 } = y4, U3 = c6(E4 * E4), _4 = c6(B2 * B2), T3 = c6(C4 * C4), $3 = c6(T3 * T3), R3 = c6(U3 * f5), V4 = c6(T3 * c6(R3 + _4)), Y3 = c6($3 + c6(b5 * c6(U3 * _4)));
    if (V4 !== Y3) throw new Error("bad point: equation left != right (1)");
    const Z = c6(E4 * B2), X4 = c6(C4 * A3);
    if (Z !== X4) throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class d4 {
    constructor(f5, b5, E4, B2) {
      this.ex = f5, this.ey = b5, this.ez = E4, this.et = B2, g3("x", f5), g3("y", b5), g3("z", E4), g3("t", B2), Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(f5) {
      if (f5 instanceof d4) throw new Error("extended point not allowed");
      const { x: b5, y: E4 } = f5 || {};
      return g3("x", b5), g3("y", E4), new d4(b5, E4, j3, c6(b5 * E4));
    }
    static normalizeZ(f5) {
      const b5 = n5.invertBatch(f5.map((E4) => E4.ez));
      return f5.map((E4, B2) => E4.toAffine(b5[B2])).map(d4.fromAffine);
    }
    static msm(f5, b5) {
      return br(d4, l6, f5, b5);
    }
    _setWindowSize(f5) {
      q2.setWindowSize(this, f5);
    }
    assertValidity() {
      L2(this);
    }
    equals(f5) {
      S4(f5);
      const { ex: b5, ey: E4, ez: B2 } = this, { ex: C4, ey: A3, ez: U3 } = f5, _4 = c6(b5 * U3), T3 = c6(C4 * B2), $3 = c6(E4 * U3), R3 = c6(A3 * B2);
      return _4 === T3 && $3 === R3;
    }
    is0() {
      return this.equals(d4.ZERO);
    }
    negate() {
      return new d4(c6(-this.ex), this.ey, this.ez, c6(-this.et));
    }
    double() {
      const { a: f5 } = e2, { ex: b5, ey: E4, ez: B2 } = this, C4 = c6(b5 * b5), A3 = c6(E4 * E4), U3 = c6(yt * c6(B2 * B2)), _4 = c6(f5 * C4), T3 = b5 + E4, $3 = c6(c6(T3 * T3) - C4 - A3), R3 = _4 + A3, V4 = R3 - U3, Y3 = _4 - A3, Z = c6($3 * V4), X4 = c6(R3 * Y3), et3 = c6($3 * Y3), pt3 = c6(V4 * R3);
      return new d4(Z, X4, pt3, et3);
    }
    add(f5) {
      S4(f5);
      const { a: b5, d: E4 } = e2, { ex: B2, ey: C4, ez: A3, et: U3 } = this, { ex: _4, ey: T3, ez: $3, et: R3 } = f5;
      if (b5 === BigInt(-1)) {
        const re3 = c6((C4 - B2) * (T3 + _4)), oe3 = c6((C4 + B2) * (T3 - _4)), mt3 = c6(oe3 - re3);
        if (mt3 === G2) return this.double();
        const se3 = c6(A3 * yt * R3), ie3 = c6(U3 * yt * $3), ue = ie3 + se3, ce2 = oe3 + re3, ae3 = ie3 - se3, Dn3 = c6(ue * mt3), dn3 = c6(ce2 * ae3), hn3 = c6(ue * ae3), ln3 = c6(mt3 * ce2);
        return new d4(Dn3, dn3, ln3, hn3);
      }
      const V4 = c6(B2 * _4), Y3 = c6(C4 * T3), Z = c6(U3 * E4 * R3), X4 = c6(A3 * $3), et3 = c6((B2 + C4) * (_4 + T3) - V4 - Y3), pt3 = X4 - Z, ee3 = X4 + Z, ne2 = c6(Y3 - b5 * V4), un3 = c6(et3 * pt3), cn3 = c6(ee3 * ne2), an3 = c6(et3 * ne2), fn3 = c6(pt3 * ee3);
      return new d4(un3, cn3, fn3, an3);
    }
    subtract(f5) {
      return this.add(f5.negate());
    }
    wNAF(f5) {
      return q2.wNAFCached(this, f5, d4.normalizeZ);
    }
    multiply(f5) {
      const b5 = f5;
      ft("scalar", b5, j3, r3);
      const { p: E4, f: B2 } = this.wNAF(b5);
      return d4.normalizeZ([E4, B2])[0];
    }
    multiplyUnsafe(f5, b5 = d4.ZERO) {
      const E4 = f5;
      return ft("scalar", E4, G2, r3), E4 === G2 ? F : this.is0() || E4 === j3 ? this : q2.wNAFCachedUnsafe(this, E4, d4.normalizeZ, b5);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(i4).is0();
    }
    isTorsionFree() {
      return q2.unsafeLadder(this, r3).is0();
    }
    toAffine(f5) {
      return v5(this, f5);
    }
    clearCofactor() {
      const { h: f5 } = e2;
      return f5 === j3 ? this : this.multiplyUnsafe(f5);
    }
    static fromHex(f5, b5 = false) {
      const { d: E4, a: B2 } = e2, C4 = n5.BYTES;
      f5 = W("pointHex", f5, C4), Tt("zip215", b5);
      const A3 = f5.slice(), U3 = f5[C4 - 1];
      A3[C4 - 1] = U3 & -129;
      const _4 = Et(A3), T3 = b5 ? D3 : n5.ORDER;
      ft("pointHex.y", _4, G2, T3);
      const $3 = c6(_4 * _4), R3 = c6($3 - j3), V4 = c6(E4 * $3 - B2);
      let { isValid: Y3, value: Z } = p4(R3, V4);
      if (!Y3) throw new Error("Point.fromHex: invalid y coordinate");
      const X4 = (Z & j3) === j3, et3 = (U3 & 128) !== 0;
      if (!b5 && Z === G2 && et3) throw new Error("Point.fromHex: x=0 and x_0=1");
      return et3 !== X4 && (Z = c6(-Z)), d4.fromAffine({ x: Z, y: _4 });
    }
    static fromPrivateKey(f5) {
      return O5(f5).point;
    }
    toRawBytes() {
      const { x: f5, y: b5 } = this.toAffine(), E4 = Nt(b5, n5.BYTES);
      return E4[E4.length - 1] |= f5 & j3 ? 128 : 0, E4;
    }
    toHex() {
      return Ft(this.toRawBytes());
    }
  }
  d4.BASE = new d4(e2.Gx, e2.Gy, j3, c6(e2.Gx * e2.Gy)), d4.ZERO = new d4(G2, j3, j3, G2);
  const { BASE: m3, ZERO: F } = d4, q2 = lr(d4, u2 * 8);
  function z5(y4) {
    return H(y4, r3);
  }
  function I3(y4) {
    return z5(Et(y4));
  }
  function O5(y4) {
    const f5 = n5.BYTES;
    y4 = W("private key", y4, f5);
    const b5 = W("hashed private key", s3(y4), 2 * f5), E4 = w3(b5.slice(0, f5)), B2 = b5.slice(f5, 2 * f5), C4 = I3(E4), A3 = m3.multiply(C4), U3 = A3.toRawBytes();
    return { head: E4, prefix: B2, scalar: C4, point: A3, pointBytes: U3 };
  }
  function ot2(y4) {
    return O5(y4).pointBytes;
  }
  function tt3(y4 = new Uint8Array(), ...f5) {
    const b5 = ye(...f5);
    return I3(s3(h5(b5, W("context", y4), !!o4)));
  }
  function st3(y4, f5, b5 = {}) {
    y4 = W("message", y4), o4 && (y4 = o4(y4));
    const { prefix: E4, scalar: B2, pointBytes: C4 } = O5(f5), A3 = tt3(b5.context, E4, y4), U3 = m3.multiply(A3).toRawBytes(), _4 = tt3(b5.context, U3, C4, y4), T3 = z5(A3 + _4 * B2);
    ft("signature.s", T3, G2, r3);
    const $3 = ye(U3, Nt(T3, n5.BYTES));
    return W("result", $3, n5.BYTES * 2);
  }
  const at = Er;
  function Ct3(y4, f5, b5, E4 = at) {
    const { context: B2, zip215: C4 } = E4, A3 = n5.BYTES;
    y4 = W("signature", y4, 2 * A3), f5 = W("message", f5), b5 = W("publicKey", b5, A3), C4 !== void 0 && Tt("zip215", C4), o4 && (f5 = o4(f5));
    const U3 = Et(y4.slice(A3, 2 * A3));
    let _4, T3, $3;
    try {
      _4 = d4.fromHex(b5, C4), T3 = d4.fromHex(y4.slice(0, A3), C4), $3 = m3.multiplyUnsafe(U3);
    } catch {
      return false;
    }
    if (!C4 && _4.isSmallOrder()) return false;
    const R3 = tt3(B2, T3.toRawBytes(), _4.toRawBytes(), f5);
    return T3.add(_4.multiplyUnsafe(R3)).subtract($3).clearCofactor().equals(d4.ZERO);
  }
  return m3._setWindowSize(8), { CURVE: e2, getPublicKey: ot2, sign: st3, verify: Ct3, ExtendedPoint: d4, utils: { getExtendedPublicKey: O5, randomPrivateKey: () => a4(n5.BYTES), precompute(y4 = 8, f5 = d4.BASE) {
    return f5._setWindowSize(y4), f5.multiply(BigInt(3)), f5;
  } } };
}
BigInt(0), BigInt(1);
var kt = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
var Ue = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
var xr = BigInt(1);
var Te = BigInt(2);
BigInt(3);
var Br = BigInt(5);
var Cr = BigInt(8);
function Ar(t) {
  const e2 = BigInt(10), n5 = BigInt(20), r3 = BigInt(40), o4 = BigInt(80), s3 = kt, u2 = t * t % s3 * t % s3, i4 = J2(u2, Te, s3) * u2 % s3, D3 = J2(i4, xr, s3) * t % s3, c6 = J2(D3, Br, s3) * D3 % s3, l6 = J2(c6, e2, s3) * c6 % s3, p4 = J2(l6, n5, s3) * l6 % s3, w3 = J2(p4, r3, s3) * p4 % s3, h5 = J2(w3, o4, s3) * w3 % s3, g3 = J2(h5, o4, s3) * w3 % s3, S4 = J2(g3, e2, s3) * c6 % s3;
  return { pow_p_5_8: J2(S4, Te, s3) * t % s3, b2: u2 };
}
function mr(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
function _r(t, e2) {
  const n5 = kt, r3 = H(e2 * e2 * e2, n5), o4 = H(r3 * r3 * e2, n5), s3 = Ar(t * o4).pow_p_5_8;
  let a4 = H(t * r3 * s3, n5);
  const u2 = H(e2 * a4 * a4, n5), i4 = a4, D3 = H(a4 * Ue, n5), c6 = u2 === t, l6 = u2 === H(-t, n5), p4 = u2 === H(-t * Ue, n5);
  return c6 && (a4 = i4), (l6 || p4) && (a4 = D3), ur(a4, n5) && (a4 = H(-a4, n5)), { isValid: c6 || l6, value: a4 };
}
var Sr = (() => _e(kt, void 0, true))();
var vr = (() => ({ a: BigInt(-1), d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"), Fp: Sr, n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"), h: Cr, Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"), Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"), hash: Kn, randomBytes: he, adjustScalarBytes: mr, uvRatio: _r }))();
var Rt = (() => yr(vr))();
var jt = "EdDSA";
var Zt = "JWT";
var ut = ".";
var Dt = "base64url";
var Gt = "utf8";
var xt = "utf8";
var Vt = ":";
var Yt = "did";
var Jt = "key";
var dt = "base58btc";
var Kt = "z";
var Wt = "K36";
var Ne = 32;
function Xt(t) {
  return globalThis.Buffer != null ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t;
}
function Le(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Xt(globalThis.Buffer.allocUnsafe(t)) : new Uint8Array(t);
}
function Oe(t, e2) {
  e2 || (e2 = t.reduce((o4, s3) => o4 + s3.length, 0));
  const n5 = Le(e2);
  let r3 = 0;
  for (const o4 of t) n5.set(o4, r3), r3 += o4.length;
  return Xt(n5);
}
function Ir(t, e2) {
  if (t.length >= 255) throw new TypeError("Alphabet too long");
  for (var n5 = new Uint8Array(256), r3 = 0; r3 < n5.length; r3++) n5[r3] = 255;
  for (var o4 = 0; o4 < t.length; o4++) {
    var s3 = t.charAt(o4), a4 = s3.charCodeAt(0);
    if (n5[a4] !== 255) throw new TypeError(s3 + " is ambiguous");
    n5[a4] = o4;
  }
  var u2 = t.length, i4 = t.charAt(0), D3 = Math.log(u2) / Math.log(256), c6 = Math.log(256) / Math.log(u2);
  function l6(h5) {
    if (h5 instanceof Uint8Array || (ArrayBuffer.isView(h5) ? h5 = new Uint8Array(h5.buffer, h5.byteOffset, h5.byteLength) : Array.isArray(h5) && (h5 = Uint8Array.from(h5))), !(h5 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (h5.length === 0) return "";
    for (var g3 = 0, S4 = 0, v5 = 0, L2 = h5.length; v5 !== L2 && h5[v5] === 0; ) v5++, g3++;
    for (var d4 = (L2 - v5) * c6 + 1 >>> 0, m3 = new Uint8Array(d4); v5 !== L2; ) {
      for (var F = h5[v5], q2 = 0, z5 = d4 - 1; (F !== 0 || q2 < S4) && z5 !== -1; z5--, q2++) F += 256 * m3[z5] >>> 0, m3[z5] = F % u2 >>> 0, F = F / u2 >>> 0;
      if (F !== 0) throw new Error("Non-zero carry");
      S4 = q2, v5++;
    }
    for (var I3 = d4 - S4; I3 !== d4 && m3[I3] === 0; ) I3++;
    for (var O5 = i4.repeat(g3); I3 < d4; ++I3) O5 += t.charAt(m3[I3]);
    return O5;
  }
  function p4(h5) {
    if (typeof h5 != "string") throw new TypeError("Expected String");
    if (h5.length === 0) return new Uint8Array();
    var g3 = 0;
    if (h5[g3] !== " ") {
      for (var S4 = 0, v5 = 0; h5[g3] === i4; ) S4++, g3++;
      for (var L2 = (h5.length - g3) * D3 + 1 >>> 0, d4 = new Uint8Array(L2); h5[g3]; ) {
        var m3 = n5[h5.charCodeAt(g3)];
        if (m3 === 255) return;
        for (var F = 0, q2 = L2 - 1; (m3 !== 0 || F < v5) && q2 !== -1; q2--, F++) m3 += u2 * d4[q2] >>> 0, d4[q2] = m3 % 256 >>> 0, m3 = m3 / 256 >>> 0;
        if (m3 !== 0) throw new Error("Non-zero carry");
        v5 = F, g3++;
      }
      if (h5[g3] !== " ") {
        for (var z5 = L2 - v5; z5 !== L2 && d4[z5] === 0; ) z5++;
        for (var I3 = new Uint8Array(S4 + (L2 - z5)), O5 = S4; z5 !== L2; ) I3[O5++] = d4[z5++];
        return I3;
      }
    }
  }
  function w3(h5) {
    var g3 = p4(h5);
    if (g3) return g3;
    throw new Error(`Non-${e2} character`);
  }
  return { encode: l6, decodeUnsafe: p4, decode: w3 };
}
var Ur = Ir;
var Tr = Ur;
var He = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array") return t;
  if (t instanceof ArrayBuffer) return new Uint8Array(t);
  if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var Fr = (t) => new TextEncoder().encode(t);
var Nr = (t) => new TextDecoder().decode(t);
var Lr = class {
  constructor(e2, n5, r3) {
    this.name = e2, this.prefix = n5, this.baseEncode = r3;
  }
  encode(e2) {
    if (e2 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e2)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var Or = class {
  constructor(e2, n5, r3) {
    if (this.name = e2, this.prefix = n5, n5.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = n5.codePointAt(0), this.baseDecode = r3;
  }
  decode(e2) {
    if (typeof e2 == "string") {
      if (e2.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e2.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e2) {
    return ze(this, e2);
  }
};
var Hr = class {
  constructor(e2) {
    this.decoders = e2;
  }
  or(e2) {
    return ze(this, e2);
  }
  decode(e2) {
    const n5 = e2[0], r3 = this.decoders[n5];
    if (r3) return r3.decode(e2);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e2)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var ze = (t, e2) => new Hr({ ...t.decoders || { [t.prefix]: t }, ...e2.decoders || { [e2.prefix]: e2 } });
var zr = class {
  constructor(e2, n5, r3, o4) {
    this.name = e2, this.prefix = n5, this.baseEncode = r3, this.baseDecode = o4, this.encoder = new Lr(e2, n5, r3), this.decoder = new Or(e2, n5, o4);
  }
  encode(e2) {
    return this.encoder.encode(e2);
  }
  decode(e2) {
    return this.decoder.decode(e2);
  }
};
var Bt = ({ name: t, prefix: e2, encode: n5, decode: r3 }) => new zr(t, e2, n5, r3);
var ht = ({ prefix: t, name: e2, alphabet: n5 }) => {
  const { encode: r3, decode: o4 } = Tr(n5, e2);
  return Bt({ prefix: t, name: e2, encode: r3, decode: (s3) => He(o4(s3)) });
};
var Mr = (t, e2, n5, r3) => {
  const o4 = {};
  for (let c6 = 0; c6 < e2.length; ++c6) o4[e2[c6]] = c6;
  let s3 = t.length;
  for (; t[s3 - 1] === "="; ) --s3;
  const a4 = new Uint8Array(s3 * n5 / 8 | 0);
  let u2 = 0, i4 = 0, D3 = 0;
  for (let c6 = 0; c6 < s3; ++c6) {
    const l6 = o4[t[c6]];
    if (l6 === void 0) throw new SyntaxError(`Non-${r3} character`);
    i4 = i4 << n5 | l6, u2 += n5, u2 >= 8 && (u2 -= 8, a4[D3++] = 255 & i4 >> u2);
  }
  if (u2 >= n5 || 255 & i4 << 8 - u2) throw new SyntaxError("Unexpected end of data");
  return a4;
};
var qr = (t, e2, n5) => {
  const r3 = e2[e2.length - 1] === "=", o4 = (1 << n5) - 1;
  let s3 = "", a4 = 0, u2 = 0;
  for (let i4 = 0; i4 < t.length; ++i4) for (u2 = u2 << 8 | t[i4], a4 += 8; a4 > n5; ) a4 -= n5, s3 += e2[o4 & u2 >> a4];
  if (a4 && (s3 += e2[o4 & u2 << n5 - a4]), r3) for (; s3.length * n5 & 7; ) s3 += "=";
  return s3;
};
var k4 = ({ name: t, prefix: e2, bitsPerChar: n5, alphabet: r3 }) => Bt({ prefix: e2, name: t, encode(o4) {
  return qr(o4, r3, n5);
}, decode(o4) {
  return Mr(o4, r3, n5, t);
} });
var $r = Bt({ prefix: "\0", name: "identity", encode: (t) => Nr(t), decode: (t) => Fr(t) });
var kr = Object.freeze({ __proto__: null, identity: $r });
var Rr = k4({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var jr = Object.freeze({ __proto__: null, base2: Rr });
var Zr = k4({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Gr = Object.freeze({ __proto__: null, base8: Zr });
var Vr = ht({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Yr = Object.freeze({ __proto__: null, base10: Vr });
var Jr = k4({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var Kr = k4({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Wr = Object.freeze({ __proto__: null, base16: Jr, base16upper: Kr });
var Xr = k4({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var Pr = k4({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var Qr = k4({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var to = k4({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var eo = k4({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var no = k4({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var ro = k4({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var oo = k4({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var so = k4({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var io = Object.freeze({ __proto__: null, base32: Xr, base32upper: Pr, base32pad: Qr, base32padupper: to, base32hex: eo, base32hexupper: no, base32hexpad: ro, base32hexpadupper: oo, base32z: so });
var uo = ht({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var co = ht({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var ao = Object.freeze({ __proto__: null, base36: uo, base36upper: co });
var fo = ht({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var Do = ht({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var ho = Object.freeze({ __proto__: null, base58btc: fo, base58flickr: Do });
var lo = k4({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var bo = k4({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var po = k4({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var wo = k4({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Eo = Object.freeze({ __proto__: null, base64: lo, base64pad: bo, base64url: po, base64urlpad: wo });
var Me = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var go = Me.reduce((t, e2, n5) => (t[n5] = e2, t), []);
var yo = Me.reduce((t, e2, n5) => (t[e2.codePointAt(0)] = n5, t), []);
function xo(t) {
  return t.reduce((e2, n5) => (e2 += go[n5], e2), "");
}
function Bo(t) {
  const e2 = [];
  for (const n5 of t) {
    const r3 = yo[n5.codePointAt(0)];
    if (r3 === void 0) throw new Error(`Non-base256emoji character: ${n5}`);
    e2.push(r3);
  }
  return new Uint8Array(e2);
}
var Co = Bt({ prefix: "\u{1F680}", name: "base256emoji", encode: xo, decode: Bo });
var Ao = Object.freeze({ __proto__: null, base256emoji: Co });
var mo = $e;
var qe = 128;
var _o = 127;
var So = ~_o;
var vo = Math.pow(2, 31);
function $e(t, e2, n5) {
  e2 = e2 || [], n5 = n5 || 0;
  for (var r3 = n5; t >= vo; ) e2[n5++] = t & 255 | qe, t /= 128;
  for (; t & So; ) e2[n5++] = t & 255 | qe, t >>>= 7;
  return e2[n5] = t | 0, $e.bytes = n5 - r3 + 1, e2;
}
var Io = Pt;
var Uo = 128;
var ke = 127;
function Pt(t, r3) {
  var n5 = 0, r3 = r3 || 0, o4 = 0, s3 = r3, a4, u2 = t.length;
  do {
    if (s3 >= u2) throw Pt.bytes = 0, new RangeError("Could not decode varint");
    a4 = t[s3++], n5 += o4 < 28 ? (a4 & ke) << o4 : (a4 & ke) * Math.pow(2, o4), o4 += 7;
  } while (a4 >= Uo);
  return Pt.bytes = s3 - r3, n5;
}
var To = Math.pow(2, 7);
var Fo = Math.pow(2, 14);
var No = Math.pow(2, 21);
var Lo = Math.pow(2, 28);
var Oo = Math.pow(2, 35);
var Ho = Math.pow(2, 42);
var zo = Math.pow(2, 49);
var Mo = Math.pow(2, 56);
var qo = Math.pow(2, 63);
var $o = function(t) {
  return t < To ? 1 : t < Fo ? 2 : t < No ? 3 : t < Lo ? 4 : t < Oo ? 5 : t < Ho ? 6 : t < zo ? 7 : t < Mo ? 8 : t < qo ? 9 : 10;
};
var ko = { encode: mo, decode: Io, encodingLength: $o };
var Re = ko;
var je = (t, e2, n5 = 0) => (Re.encode(t, e2, n5), e2);
var Ze = (t) => Re.encodingLength(t);
var Qt = (t, e2) => {
  const n5 = e2.byteLength, r3 = Ze(t), o4 = r3 + Ze(n5), s3 = new Uint8Array(o4 + n5);
  return je(t, s3, 0), je(n5, s3, r3), s3.set(e2, o4), new Ro(t, n5, e2, s3);
};
var Ro = class {
  constructor(e2, n5, r3, o4) {
    this.code = e2, this.size = n5, this.digest = r3, this.bytes = o4;
  }
};
var Ge = ({ name: t, code: e2, encode: n5 }) => new jo(t, e2, n5);
var jo = class {
  constructor(e2, n5, r3) {
    this.name = e2, this.code = n5, this.encode = r3;
  }
  digest(e2) {
    if (e2 instanceof Uint8Array) {
      const n5 = this.encode(e2);
      return n5 instanceof Uint8Array ? Qt(this.code, n5) : n5.then((r3) => Qt(this.code, r3));
    } else throw Error("Unknown type, must be binary type");
  }
};
var Ve = (t) => async (e2) => new Uint8Array(await crypto.subtle.digest(t, e2));
var Zo = Ge({ name: "sha2-256", code: 18, encode: Ve("SHA-256") });
var Go = Ge({ name: "sha2-512", code: 19, encode: Ve("SHA-512") });
var Vo = Object.freeze({ __proto__: null, sha256: Zo, sha512: Go });
var Ye = 0;
var Yo = "identity";
var Je = He;
var Jo = (t) => Qt(Ye, Je(t));
var Ko = { code: Ye, name: Yo, encode: Je, digest: Jo };
var Wo = Object.freeze({ __proto__: null, identity: Ko });
new TextEncoder(), new TextDecoder();
var Ke = { ...kr, ...jr, ...Gr, ...Yr, ...Wr, ...io, ...ao, ...ho, ...Eo, ...Ao };
({ ...Vo, ...Wo });
function We(t, e2, n5, r3) {
  return { name: t, prefix: e2, encoder: { name: t, prefix: e2, encode: n5 }, decoder: { decode: r3 } };
}
var Xe = We("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1)));
var te = We("ascii", "a", (t) => {
  let e2 = "a";
  for (let n5 = 0; n5 < t.length; n5++) e2 += String.fromCharCode(t[n5]);
  return e2;
}, (t) => {
  t = t.substring(1);
  const e2 = Le(t.length);
  for (let n5 = 0; n5 < t.length; n5++) e2[n5] = t.charCodeAt(n5);
  return e2;
});
var Pe = { utf8: Xe, "utf-8": Xe, hex: Ke.base16, latin1: te, ascii: te, binary: te, ...Ke };
function ct(t, e2 = "utf8") {
  const n5 = Pe[e2];
  if (!n5) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : n5.encoder.encode(t).substring(1);
}
function rt(t, e2 = "utf8") {
  const n5 = Pe[e2];
  if (!n5) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Xt(globalThis.Buffer.from(t, "utf-8")) : n5.decoder.decode(`${n5.prefix}${t}`);
}
function lt(t) {
  return safeJsonParse(ct(rt(t, Dt), Gt));
}
function bt(t) {
  return ct(rt(safeJsonStringify(t), Gt), Dt);
}
function Qe(t) {
  const e2 = rt(Wt, dt), n5 = Kt + ct(Oe([e2, t]), dt);
  return [Yt, Jt, n5].join(Vt);
}
function en(t) {
  return ct(t, Dt);
}
function nn(t) {
  return rt(t, Dt);
}
function rn(t) {
  return rt([bt(t.header), bt(t.payload)].join(ut), xt);
}
function on(t) {
  return [bt(t.header), bt(t.payload), en(t.signature)].join(ut);
}
function sn(t) {
  const e2 = t.split(ut), n5 = lt(e2[0]), r3 = lt(e2[1]), o4 = nn(e2[2]), s3 = rt(e2.slice(0, 2).join(ut), xt);
  return { header: n5, payload: r3, signature: o4, data: s3 };
}
function Po(t = he(Ne)) {
  const e2 = Rt.getPublicKey(t);
  return { secretKey: Oe([t, e2]), publicKey: e2 };
}
async function Qo(t, e2, n5, r3, o4 = (0, import_time2.fromMiliseconds)(Date.now())) {
  const s3 = { alg: jt, typ: Zt }, a4 = Qe(r3.publicKey), u2 = o4 + n5, i4 = { iss: a4, sub: t, aud: e2, iat: o4, exp: u2 }, D3 = rn({ header: s3, payload: i4 }), c6 = Rt.sign(D3, r3.secretKey.slice(0, 32));
  return on({ header: s3, payload: i4, signature: c6 });
}

// node_modules/detect-browser/es/index.js
var __spreadArray = function(to4, from8, pack) {
  if (pack || arguments.length === 2) for (var i4 = 0, l6 = from8.length, ar4; i4 < l6; i4++) {
    if (ar4 || !(i4 in from8)) {
      if (!ar4) ar4 = Array.prototype.slice.call(from8, 0, i4);
      ar4[i4] = from8[i4];
    }
  }
  return to4.concat(ar4 || Array.prototype.slice.call(from8));
};
var BrowserInfo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function BrowserInfo2(name2, version3, os2) {
      this.name = name2;
      this.version = version3;
      this.os = os2;
      this.type = "browser";
    }
    return BrowserInfo2;
  })()
);
var NodeInfo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function NodeInfo2(version3) {
      this.version = version3;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo2;
  })()
);
var SearchBotDeviceInfo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function SearchBotDeviceInfo2(name2, version3, os2, bot) {
      this.name = name2;
      this.version = version3;
      this.os = os2;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo2;
  })()
);
var BotInfo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo2;
  })()
);
var ReactNativeInfo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo2;
  })()
);
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
function matchUserAgent(ua2) {
  return ua2 !== "" && userAgentRules.reduce(function(matched, _a2) {
    var browser = _a2[0], regex = _a2[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua2);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}
function parseUserAgent(ua2) {
  var matchedRule = matchUserAgent(ua2);
  if (!matchedRule) {
    return null;
  }
  var name2 = matchedRule[0], match = matchedRule[1];
  if (name2 === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version3 = versionParts.join(".");
  var os2 = detectOS(ua2);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua2);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name2, version3, os2, searchBotMatch[1]);
  }
  return new BrowserInfo(name2, version3, os2);
}
function detectOS(ua2) {
  for (var ii3 = 0, count = operatingSystemRules.length; ii3 < count; ii3++) {
    var _a2 = operatingSystemRules[ii3], os2 = _a2[0], regex = _a2[1];
    var match = regex.exec(ua2);
    if (match) {
      return os2;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode2 = typeof process !== "undefined" && process.version;
  return isNode2 ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii3 = 0; ii3 < count; ii3++) {
    output.push("0");
  }
  return output;
}

// node_modules/@walletconnect/utils/dist/index.js
var import_time3 = __toESM(require_cjs(), 1);
var import_window_getters = __toESM(require_cjs2(), 1);
var import_window_metadata = __toESM(require_cjs3(), 1);

// node_modules/ox/_esm/core/version.js
var version = "0.1.1";

// node_modules/ox/_esm/core/internal/errors.js
function getVersion() {
  return version;
}

// node_modules/ox/_esm/core/Errors.js
var BaseError = class _BaseError extends Error {
  constructor(shortMessage, options = {}) {
    const details = (() => {
      if (options.cause instanceof _BaseError) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if (options.cause && "details" in options.cause && typeof options.cause.details === "string")
        return options.cause.details;
      if (options.cause?.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath = (() => {
      if (options.cause instanceof _BaseError)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = "https://oxlib.sh";
    const docs = `${docsBaseUrl}${docsPath ?? ""}`;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath ? `See: ${docs}` : void 0
      ] : []
    ].filter((x5) => typeof x5 === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${getVersion()}`
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsPath = docsPath;
    this.shortMessage = shortMessage;
  }
  walk(fn3) {
    return walk(this, fn3);
  }
};
function walk(err, fn3) {
  if (fn3?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn3);
  return fn3 ? null : err;
}

// node_modules/ox/node_modules/@noble/hashes/esm/crypto.js
var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// node_modules/ox/node_modules/@noble/hashes/esm/utils.js
function isBytes(a4) {
  return a4 instanceof Uint8Array || ArrayBuffer.isView(a4) && a4.constructor.name === "Uint8Array";
}
function anumber(n5) {
  if (!Number.isSafeInteger(n5) || n5 < 0)
    throw new Error("positive integer expected, got " + n5);
}
function abytes(b5, ...lengths) {
  if (!isBytes(b5))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b5.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b5.length);
}
function ahash(h5) {
  if (typeof h5 !== "function" || typeof h5.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber(h5.outputLen);
  anumber(h5.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i4 = 0; i4 < arrays.length; i4++) {
    arrays[i4].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i4 = 0; i4 < arr.length; i4++) {
    arr[i4] = byteSwap(arr[i4]);
  }
  return arr;
}
var swap32IfBE = isLE ? (u2) => u2 : byteSwap32;
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i4 = 0; i4 < arrays.length; i4++) {
    const a4 = arrays[i4];
    abytes(a4);
    sum += a4.length;
  }
  const res = new Uint8Array(sum);
  for (let i4 = 0, pad3 = 0; i4 < arrays.length; i4++) {
    const a4 = arrays[i4];
    res.set(a4, pad3);
    pad3 += a4.length;
  }
  return res;
}
var Hash = class {
};
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto2 && typeof crypto2.getRandomValues === "function") {
    return crypto2.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto2 && typeof crypto2.randomBytes === "function") {
    return Uint8Array.from(crypto2.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

// node_modules/ox/node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h5 = isLE2 ? 4 : 0;
  const l6 = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h5, wh, isLE2);
  view.setUint32(byteOffset + l6, wl, isLE2);
}
function Chi(a4, b5, c6) {
  return a4 & b5 ^ ~a4 & c6;
}
function Maj(a4, b5, c6) {
  return a4 & b5 ^ a4 & c6 ^ b5 & c6;
}
var HashMD = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i4 = pos; i4 < blockLen; i4++)
      buffer[i4] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i4 = 0; i4 < outLen; i4++)
      oview.setUint32(4 * i4, state[i4], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to4) {
    to4 || (to4 = new this.constructor());
    to4.set(...this.get());
    const { blockLen, buffer, length: length2, finished, destroyed, pos } = this;
    to4.destroyed = destroyed;
    to4.finished = finished;
    to4.length = length2;
    to4.pos = pos;
    if (length2 % blockLen)
      to4.buffer.set(buffer);
    return to4;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);

// node_modules/ox/node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n5, le3 = false) {
  if (le3)
    return { h: Number(n5 & U32_MASK64), l: Number(n5 >> _32n & U32_MASK64) };
  return { h: Number(n5 >> _32n & U32_MASK64) | 0, l: Number(n5 & U32_MASK64) | 0 };
}
function split(lst, le3 = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i4 = 0; i4 < len; i4++) {
    const { h: h5, l: l6 } = fromBig(lst[i4], le3);
    [Ah[i4], Al[i4]] = [h5, l6];
  }
  return [Ah, Al];
}
var rotlSH = (h5, l6, s3) => h5 << s3 | l6 >>> 32 - s3;
var rotlSL = (h5, l6, s3) => l6 << s3 | h5 >>> 32 - s3;
var rotlBH = (h5, l6, s3) => l6 << s3 - 32 | h5 >>> 64 - s3;
var rotlBL = (h5, l6, s3) => h5 << s3 - 32 | l6 >>> 64 - s3;

// node_modules/ox/node_modules/@noble/hashes/esm/sha3.js
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _7n = BigInt(7);
var _256n = BigInt(256);
var _0x71n = BigInt(113);
var SHA3_PI = [];
var SHA3_ROTL = [];
var _SHA3_IOTA = [];
for (let round = 0, R3 = _1n, x5 = 1, y4 = 0; round < 24; round++) {
  [x5, y4] = [y4, (2 * x5 + 3 * y4) % 5];
  SHA3_PI.push(2 * (5 * y4 + x5));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j6 = 0; j6 < 7; j6++) {
    R3 = (R3 << _1n ^ (R3 >> _7n) * _0x71n) % _256n;
    if (R3 & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j6)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var IOTAS = split(_SHA3_IOTA, true);
var SHA3_IOTA_H = IOTAS[0];
var SHA3_IOTA_L = IOTAS[1];
var rotlH = (h5, l6, s3) => s3 > 32 ? rotlBH(h5, l6, s3) : rotlSH(h5, l6, s3);
var rotlL = (h5, l6, s3) => s3 > 32 ? rotlBL(h5, l6, s3) : rotlSL(h5, l6, s3);
function keccakP(s3, rounds = 24) {
  const B2 = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x5 = 0; x5 < 10; x5++)
      B2[x5] = s3[x5] ^ s3[x5 + 10] ^ s3[x5 + 20] ^ s3[x5 + 30] ^ s3[x5 + 40];
    for (let x5 = 0; x5 < 10; x5 += 2) {
      const idx1 = (x5 + 8) % 10;
      const idx0 = (x5 + 2) % 10;
      const B0 = B2[idx0];
      const B1 = B2[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B2[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B2[idx1 + 1];
      for (let y4 = 0; y4 < 50; y4 += 10) {
        s3[x5 + y4] ^= Th;
        s3[x5 + y4 + 1] ^= Tl;
      }
    }
    let curH = s3[2];
    let curL = s3[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s3[PI];
      curL = s3[PI + 1];
      s3[PI] = Th;
      s3[PI + 1] = Tl;
    }
    for (let y4 = 0; y4 < 50; y4 += 10) {
      for (let x5 = 0; x5 < 10; x5++)
        B2[x5] = s3[y4 + x5];
      for (let x5 = 0; x5 < 10; x5++)
        s3[y4 + x5] ^= ~B2[(x5 + 2) % 10] & B2[(x5 + 4) % 10];
    }
    s3[0] ^= SHA3_IOTA_H[round];
    s3[1] ^= SHA3_IOTA_L[round];
  }
  clean(B2);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    this.enableXOF = false;
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    anumber(outputLen);
    if (!(0 < blockLen && blockLen < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    swap32IfBE(this.state32);
    keccakP(this.state32, this.rounds);
    swap32IfBE(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { blockLen, state } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i4 = 0; i4 < take; i4++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    clean(this.state);
  }
  _cloneInto(to4) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to4 || (to4 = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to4.state32.set(this.state32);
    to4.pos = this.pos;
    to4.posOut = this.posOut;
    to4.finished = this.finished;
    to4.rounds = rounds;
    to4.suffix = suffix;
    to4.outputLen = outputLen;
    to4.enableXOF = enableXOF;
    to4.destroyed = this.destroyed;
    return to4;
  }
};
var gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
var keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();

// node_modules/ox/node_modules/@noble/hashes/esm/sha2.js
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends HashMD {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A: A3, B: B2, C: C4, D: D3, E: E4, F, G: G4, H: H2 } = this;
    return [A3, B2, C4, D3, E4, F, G4, H2];
  }
  // prettier-ignore
  set(A3, B2, C4, D3, E4, F, G4, H2) {
    this.A = A3 | 0;
    this.B = B2 | 0;
    this.C = C4 | 0;
    this.D = D3 | 0;
    this.E = E4 | 0;
    this.F = F | 0;
    this.G = G4 | 0;
    this.H = H2 | 0;
  }
  process(view, offset) {
    for (let i4 = 0; i4 < 16; i4++, offset += 4)
      SHA256_W[i4] = view.getUint32(offset, false);
    for (let i4 = 16; i4 < 64; i4++) {
      const W15 = SHA256_W[i4 - 15];
      const W22 = SHA256_W[i4 - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W22, 17) ^ rotr(W22, 19) ^ W22 >>> 10;
      SHA256_W[i4] = s1 + SHA256_W[i4 - 7] + s0 + SHA256_W[i4 - 16] | 0;
    }
    let { A: A3, B: B2, C: C4, D: D3, E: E4, F, G: G4, H: H2 } = this;
    for (let i4 = 0; i4 < 64; i4++) {
      const sigma1 = rotr(E4, 6) ^ rotr(E4, 11) ^ rotr(E4, 25);
      const T1 = H2 + sigma1 + Chi(E4, F, G4) + SHA256_K[i4] + SHA256_W[i4] | 0;
      const sigma0 = rotr(A3, 2) ^ rotr(A3, 13) ^ rotr(A3, 22);
      const T22 = sigma0 + Maj(A3, B2, C4) | 0;
      H2 = G4;
      G4 = F;
      F = E4;
      E4 = D3 + T1 | 0;
      D3 = C4;
      C4 = B2;
      B2 = A3;
      A3 = T1 + T22 | 0;
    }
    A3 = A3 + this.A | 0;
    B2 = B2 + this.B | 0;
    C4 = C4 + this.C | 0;
    D3 = D3 + this.D | 0;
    E4 = E4 + this.E | 0;
    F = F + this.F | 0;
    G4 = G4 + this.G | 0;
    H2 = H2 + this.H | 0;
    this.set(A3, B2, C4, D3, E4, F, G4, H2);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var sha256 = /* @__PURE__ */ createHasher(() => new SHA256());

// node_modules/ox/node_modules/@noble/curves/esm/abstract/utils.js
var _0n2 = /* @__PURE__ */ BigInt(0);
var _1n2 = /* @__PURE__ */ BigInt(1);
function isBytes2(a4) {
  return a4 instanceof Uint8Array || ArrayBuffer.isView(a4) && a4.constructor.name === "Uint8Array";
}
function abytes2(item) {
  if (!isBytes2(item))
    throw new Error("Uint8Array expected");
}
function abool(title, value) {
  if (typeof value !== "boolean")
    throw new Error(title + " boolean expected, got " + value);
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? "0" + hex : hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n2 : BigInt("0x" + hex);
}
var hasHexBuiltin = (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
);
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_4, i4) => i4.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes2(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i4 = 0; i4 < bytes.length; i4++) {
    hex += hexes[bytes[i4]];
  }
  return hex;
}
var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai2 = 0, hi3 = 0; ai2 < al; ai2++, hi3 += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi3));
    const n22 = asciiToBase16(hex.charCodeAt(hi3 + 1));
    if (n1 === void 0 || n22 === void 0) {
      const char = hex[hi3] + hex[hi3 + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi3);
    }
    array[ai2] = n1 * 16 + n22;
  }
  return array;
}
function bytesToNumberBE(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
  abytes2(bytes);
  return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n5, len) {
  return hexToBytes(n5.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n5, len) {
  return numberToBytesBE(n5, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e2) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e2);
    }
  } else if (isBytes2(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function concatBytes2(...arrays) {
  let sum = 0;
  for (let i4 = 0; i4 < arrays.length; i4++) {
    const a4 = arrays[i4];
    abytes2(a4);
    sum += a4.length;
  }
  const res = new Uint8Array(sum);
  for (let i4 = 0, pad3 = 0; i4 < arrays.length; i4++) {
    const a4 = arrays[i4];
    res.set(a4, pad3);
    pad3 += a4.length;
  }
  return res;
}
var isPosBig = (n5) => typeof n5 === "bigint" && _0n2 <= n5;
function inRange(n5, min, max) {
  return isPosBig(n5) && isPosBig(min) && isPosBig(max) && min <= n5 && n5 < max;
}
function aInRange(title, n5, min, max) {
  if (!inRange(n5, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n5);
}
function bitLen(n5) {
  let len;
  for (len = 0; n5 > _0n2; n5 >>= _1n2, len += 1)
    ;
  return len;
}
var bitMask = (n5) => (_1n2 << BigInt(n5)) - _1n2;
var u8n = (len) => new Uint8Array(len);
var u8fr = (arr) => Uint8Array.from(arr);
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v5 = u8n(hashLen);
  let k5 = u8n(hashLen);
  let i4 = 0;
  const reset = () => {
    v5.fill(1);
    k5.fill(0);
    i4 = 0;
  };
  const h5 = (...b5) => hmacFn(k5, v5, ...b5);
  const reseed = (seed = u8n(0)) => {
    k5 = h5(u8fr([0]), seed);
    v5 = h5();
    if (seed.length === 0)
      return;
    k5 = h5(u8fr([1]), seed);
    v5 = h5();
  };
  const gen2 = () => {
    if (i4++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v5 = h5();
      const sl = v5.slice();
      out.push(sl);
      len += v5.length;
    }
    return concatBytes2(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen2())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
var validatorFns = {
  bigint: (val) => typeof val === "bigint",
  function: (val) => typeof val === "function",
  boolean: (val) => typeof val === "boolean",
  string: (val) => typeof val === "string",
  stringOrUint8Array: (val) => typeof val === "string" || isBytes2(val),
  isSafeInteger: (val) => Number.isSafeInteger(val),
  array: (val) => Array.isArray(val),
  field: (val, object) => object.Fp.isValid(val),
  hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
};
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type, isOptional) => {
    const checkVal = validatorFns[type];
    if (typeof checkVal !== "function")
      throw new Error("invalid validator function");
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
    }
  };
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}
function memoized(fn3) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn3(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}

// node_modules/ox/_esm/core/internal/bytes.js
function assertSize(bytes, size_) {
  if (size(bytes) > size_)
    throw new SizeOverflowError({
      givenSize: size(bytes),
      maxSize: size_
    });
}
var charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function pad(bytes, options = {}) {
  const { dir, size: size3 = 32 } = options;
  if (size3 === 0)
    return bytes;
  if (bytes.length > size3)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size3,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size3);
  for (let i4 = 0; i4 < size3; i4++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i4 : size3 - i4 - 1] = bytes[padEnd ? i4 : bytes.length - i4 - 1];
  }
  return paddedBytes;
}

// node_modules/ox/_esm/core/internal/hex.js
function assertSize2(hex, size_) {
  if (size2(hex) > size_)
    throw new SizeOverflowError2({
      givenSize: size2(hex),
      maxSize: size_
    });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size2(value) - 1)
    throw new SliceOffsetOutOfBoundsError2({
      offset: start,
      position: "start",
      size: size2(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size2(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError2({
      offset: end,
      position: "end",
      size: size2(value)
    });
  }
}
function pad2(hex_, options = {}) {
  const { dir, size: size3 = 32 } = options;
  if (size3 === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size3 * 2)
    throw new SizeExceedsPaddingSizeError2({
      size: Math.ceil(hex.length / 2),
      targetSize: size3,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size3 * 2, "0")}`;
}
function trim(value, options = {}) {
  const { dir = "left" } = options;
  let data = value.replace("0x", "");
  let sliceLength = 0;
  for (let i4 = 0; i4 < data.length - 1; i4++) {
    if (data[dir === "left" ? i4 : data.length - i4 - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (data === "0")
    return "0x";
  if (dir === "right" && data.length % 2 === 1)
    return `0x${data}0`;
  return `0x${data}`;
}

// node_modules/ox/_esm/core/Json.js
var bigIntSuffix = "#__bigint";
function stringify2(value, replacer, space) {
  return JSON.stringify(value, (key, value2) => {
    if (typeof replacer === "function")
      return replacer(key, value2);
    if (typeof value2 === "bigint")
      return value2.toString() + bigIntSuffix;
    return value2;
  }, space);
}

// node_modules/ox/_esm/core/Hex.js
var hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i4) => i4.toString(16).padStart(2, "0"));
function assert(value, options = {}) {
  const { strict = false } = options;
  if (!value)
    throw new InvalidHexTypeError(value);
  if (typeof value !== "string")
    throw new InvalidHexTypeError(value);
  if (strict) {
    if (!/^0x[0-9a-fA-F]*$/.test(value))
      throw new InvalidHexValueError(value);
  }
  if (!value.startsWith("0x"))
    throw new InvalidHexValueError(value);
}
function concat(...values) {
  return `0x${values.reduce((acc, x5) => acc + x5.replace("0x", ""), "")}`;
}
function from(value) {
  if (value instanceof Uint8Array)
    return fromBytes(value);
  if (Array.isArray(value))
    return fromBytes(new Uint8Array(value));
  return value;
}
function fromBytes(value, options = {}) {
  let string2 = "";
  for (let i4 = 0; i4 < value.length; i4++)
    string2 += hexes2[value[i4]];
  const hex = `0x${string2}`;
  if (typeof options.size === "number") {
    assertSize2(hex, options.size);
    return padRight(hex, options.size);
  }
  return hex;
}
function fromNumber(value, options = {}) {
  const { signed, size: size3 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size3) {
    if (signed)
      maxValue = (1n << BigInt(size3) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size3) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size3,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? (1n << BigInt(size3 * 8)) + BigInt(value_) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size3)
    return padLeft(hex, size3);
  return hex;
}
function padLeft(value, size3) {
  return pad2(value, { dir: "left", size: size3 });
}
function padRight(value, size3) {
  return pad2(value, { dir: "right", size: size3 });
}
function slice(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset(value, start);
  const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
  if (strict)
    assertEndOffset(value_, start, end);
  return value_;
}
function size2(value) {
  return Math.ceil((value.length - 2) / 2);
}
function trimLeft(value) {
  return trim(value, { dir: "left" });
}
function validate(value, options = {}) {
  const { strict = false } = options;
  try {
    assert(value, { strict });
    return true;
  } catch {
    return false;
  }
}
var IntegerOutOfRangeError = class extends BaseError {
  constructor({ max, min, signed, size: size3, value }) {
    super(`Number \`${value}\` is not in safe${size3 ? ` ${size3 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
};
var InvalidHexTypeError = class extends BaseError {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify2(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
      metaMessages: ['Hex types must be represented as `"0x${string}"`.']
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexTypeError"
    });
  }
};
var InvalidHexValueError = class extends BaseError {
  constructor(value) {
    super(`Value \`${value}\` is an invalid hex value.`, {
      metaMessages: [
        'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexValueError"
    });
  }
};
var SizeOverflowError2 = class extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
};
var SliceOffsetOutOfBoundsError2 = class extends BaseError {
  constructor({ offset, position, size: size3 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size3}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SliceOffsetOutOfBoundsError"
    });
  }
};
var SizeExceedsPaddingSizeError2 = class extends BaseError {
  constructor({ size: size3, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size3}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/ox/_esm/core/Bytes.js
var encoder = /* @__PURE__ */ new TextEncoder();
function assert2(value) {
  if (value instanceof Uint8Array)
    return;
  if (!value)
    throw new InvalidBytesTypeError(value);
  if (typeof value !== "object")
    throw new InvalidBytesTypeError(value);
  if (!("BYTES_PER_ELEMENT" in value))
    throw new InvalidBytesTypeError(value);
  if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
    throw new InvalidBytesTypeError(value);
}
function from2(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex(value, options = {}) {
  const { size: size3 } = options;
  let hex = value;
  if (size3) {
    assertSize2(value, size3);
    hex = padRight(value, size3);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length2 = hexString.length / 2;
  const bytes = new Uint8Array(length2);
  for (let index = 0, j6 = 0; index < length2; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j6++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j6++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j6 - 2]}${hexString[j6 - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function fromString(value, options = {}) {
  const { size: size3 } = options;
  const bytes = encoder.encode(value);
  if (typeof size3 === "number") {
    assertSize(bytes, size3);
    return padRight2(bytes, size3);
  }
  return bytes;
}
function padRight2(value, size3) {
  return pad(value, { dir: "right", size: size3 });
}
function size(value) {
  return value.length;
}
function validate2(value) {
  try {
    assert2(value);
    return true;
  } catch {
    return false;
  }
}
var InvalidBytesTypeError = class extends BaseError {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify2(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
      metaMessages: ["Bytes values must be of type `Bytes`."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.InvalidBytesTypeError"
    });
  }
};
var SizeOverflowError = class extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
};
var SizeExceedsPaddingSizeError = class extends BaseError {
  constructor({ size: size3, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size3}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/ox/_esm/core/Hash.js
function keccak256(value, options = {}) {
  const { as: as2 = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_256(from2(value));
  if (as2 === "Bytes")
    return bytes;
  return fromBytes(bytes);
}

// node_modules/ox/_esm/core/internal/lru.js
var LruMap = class extends Map {
  constructor(size3) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size3;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// node_modules/ox/_esm/core/Caches.js
var caches = {
  checksum: /* @__PURE__ */ new LruMap(8192)
};
var checksum = caches.checksum;

// node_modules/ox/_esm/core/PublicKey.js
function assert3(publicKey, options = {}) {
  const { compressed } = options;
  const { prefix, x: x5, y: y4 } = publicKey;
  if (compressed === false || typeof x5 === "bigint" && typeof y4 === "bigint") {
    if (prefix !== 4)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidUncompressedPrefixError()
      });
    return;
  }
  if (compressed === true || typeof x5 === "bigint" && typeof y4 === "undefined") {
    if (prefix !== 3 && prefix !== 2)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidCompressedPrefixError()
      });
    return;
  }
  throw new InvalidError({ publicKey });
}
function from3(value) {
  const publicKey = (() => {
    if (validate(value))
      return fromHex2(value);
    if (validate2(value))
      return fromBytes2(value);
    const { prefix, x: x5, y: y4 } = value;
    if (typeof x5 === "bigint" && typeof y4 === "bigint")
      return { prefix: prefix ?? 4, x: x5, y: y4 };
    return { prefix, x: x5 };
  })();
  assert3(publicKey);
  return publicKey;
}
function fromBytes2(publicKey) {
  return fromHex2(fromBytes(publicKey));
}
function fromHex2(publicKey) {
  if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
    throw new InvalidSerializedSizeError({ publicKey });
  if (publicKey.length === 130) {
    const x6 = BigInt(slice(publicKey, 0, 32));
    const y4 = BigInt(slice(publicKey, 32, 64));
    return {
      prefix: 4,
      x: x6,
      y: y4
    };
  }
  if (publicKey.length === 132) {
    const prefix2 = Number(slice(publicKey, 0, 1));
    const x6 = BigInt(slice(publicKey, 1, 33));
    const y4 = BigInt(slice(publicKey, 33, 65));
    return {
      prefix: prefix2,
      x: x6,
      y: y4
    };
  }
  const prefix = Number(slice(publicKey, 0, 1));
  const x5 = BigInt(slice(publicKey, 1, 33));
  return {
    prefix,
    x: x5
  };
}
function toBytes2(publicKey, options = {}) {
  return fromHex(toHex(publicKey, options));
}
function toHex(publicKey, options = {}) {
  assert3(publicKey);
  const { prefix, x: x5, y: y4 } = publicKey;
  const { includePrefix = true } = options;
  const publicKey_ = concat(
    includePrefix ? fromNumber(prefix, { size: 1 }) : "0x",
    fromNumber(x5, { size: 32 }),
    // If the public key is not compressed, add the y coordinate.
    typeof y4 === "bigint" ? fromNumber(y4, { size: 32 }) : "0x"
  );
  return publicKey_;
}
var InvalidError = class extends BaseError {
  constructor({ publicKey }) {
    super(`Value \`${stringify2(publicKey)}\` is not a valid public key.`, {
      metaMessages: [
        "Public key must contain:",
        "- an `x` and `prefix` value (compressed)",
        "- an `x`, `y`, and `prefix` value (uncompressed)"
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidError"
    });
  }
};
var InvalidPrefixError = class extends BaseError {
  constructor({ prefix, cause }) {
    super(`Prefix "${prefix}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidPrefixError"
    });
  }
};
var InvalidCompressedPrefixError = class extends BaseError {
  constructor() {
    super("Prefix must be 2 or 3 for compressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidCompressedPrefixError"
    });
  }
};
var InvalidUncompressedPrefixError = class extends BaseError {
  constructor() {
    super("Prefix must be 4 for uncompressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidUncompressedPrefixError"
    });
  }
};
var InvalidSerializedSizeError = class extends BaseError {
  constructor({ publicKey }) {
    super(`Value \`${publicKey}\` is an invalid public key size.`, {
      metaMessages: [
        "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
        `Received ${size2(from(publicKey))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidSerializedSizeError"
    });
  }
};

// node_modules/ox/_esm/core/Address.js
var addressRegex = /^0x[a-fA-F0-9]{40}$/;
function assert4(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex.test(value))
    throw new InvalidAddressError({
      address: value,
      cause: new InvalidInputError()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum2(value) !== value)
      throw new InvalidAddressError({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum2(address) {
  if (checksum.has(address))
    return checksum.get(address);
  assert4(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash = keccak256(fromString(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i4 = 0; i4 < 40; i4 += 2) {
    if (hash[i4 >> 1] >> 4 >= 8 && characters[i4]) {
      characters[i4] = characters[i4].toUpperCase();
    }
    if ((hash[i4 >> 1] & 15) >= 8 && characters[i4 + 1]) {
      characters[i4 + 1] = characters[i4 + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum.set(address, result);
  return result;
}
function from4(address, options = {}) {
  const { checksum: checksumVal = false } = options;
  assert4(address);
  if (checksumVal)
    return checksum2(address);
  return address;
}
function fromPublicKey(publicKey, options = {}) {
  const address = keccak256(`0x${toHex(publicKey).slice(4)}`).substring(26);
  return from4(`0x${address}`, options);
}
function isEqual(addressA, addressB) {
  assert4(addressA, { strict: false });
  assert4(addressB, { strict: false });
  return addressA.toLowerCase() === addressB.toLowerCase();
}
var InvalidAddressError = class extends BaseError {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
};
var InvalidInputError = class extends BaseError {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
};
var InvalidChecksumError = class extends BaseError {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
};

// node_modules/ox/_esm/core/Solidity.js
var maxInt8 = 2n ** (8n - 1n) - 1n;
var maxInt16 = 2n ** (16n - 1n) - 1n;
var maxInt24 = 2n ** (24n - 1n) - 1n;
var maxInt32 = 2n ** (32n - 1n) - 1n;
var maxInt40 = 2n ** (40n - 1n) - 1n;
var maxInt48 = 2n ** (48n - 1n) - 1n;
var maxInt56 = 2n ** (56n - 1n) - 1n;
var maxInt64 = 2n ** (64n - 1n) - 1n;
var maxInt72 = 2n ** (72n - 1n) - 1n;
var maxInt80 = 2n ** (80n - 1n) - 1n;
var maxInt88 = 2n ** (88n - 1n) - 1n;
var maxInt96 = 2n ** (96n - 1n) - 1n;
var maxInt104 = 2n ** (104n - 1n) - 1n;
var maxInt112 = 2n ** (112n - 1n) - 1n;
var maxInt120 = 2n ** (120n - 1n) - 1n;
var maxInt128 = 2n ** (128n - 1n) - 1n;
var maxInt136 = 2n ** (136n - 1n) - 1n;
var maxInt144 = 2n ** (144n - 1n) - 1n;
var maxInt152 = 2n ** (152n - 1n) - 1n;
var maxInt160 = 2n ** (160n - 1n) - 1n;
var maxInt168 = 2n ** (168n - 1n) - 1n;
var maxInt176 = 2n ** (176n - 1n) - 1n;
var maxInt184 = 2n ** (184n - 1n) - 1n;
var maxInt192 = 2n ** (192n - 1n) - 1n;
var maxInt200 = 2n ** (200n - 1n) - 1n;
var maxInt208 = 2n ** (208n - 1n) - 1n;
var maxInt216 = 2n ** (216n - 1n) - 1n;
var maxInt224 = 2n ** (224n - 1n) - 1n;
var maxInt232 = 2n ** (232n - 1n) - 1n;
var maxInt240 = 2n ** (240n - 1n) - 1n;
var maxInt248 = 2n ** (248n - 1n) - 1n;
var maxInt256 = 2n ** (256n - 1n) - 1n;
var minInt8 = -(2n ** (8n - 1n));
var minInt16 = -(2n ** (16n - 1n));
var minInt24 = -(2n ** (24n - 1n));
var minInt32 = -(2n ** (32n - 1n));
var minInt40 = -(2n ** (40n - 1n));
var minInt48 = -(2n ** (48n - 1n));
var minInt56 = -(2n ** (56n - 1n));
var minInt64 = -(2n ** (64n - 1n));
var minInt72 = -(2n ** (72n - 1n));
var minInt80 = -(2n ** (80n - 1n));
var minInt88 = -(2n ** (88n - 1n));
var minInt96 = -(2n ** (96n - 1n));
var minInt104 = -(2n ** (104n - 1n));
var minInt112 = -(2n ** (112n - 1n));
var minInt120 = -(2n ** (120n - 1n));
var minInt128 = -(2n ** (128n - 1n));
var minInt136 = -(2n ** (136n - 1n));
var minInt144 = -(2n ** (144n - 1n));
var minInt152 = -(2n ** (152n - 1n));
var minInt160 = -(2n ** (160n - 1n));
var minInt168 = -(2n ** (168n - 1n));
var minInt176 = -(2n ** (176n - 1n));
var minInt184 = -(2n ** (184n - 1n));
var minInt192 = -(2n ** (192n - 1n));
var minInt200 = -(2n ** (200n - 1n));
var minInt208 = -(2n ** (208n - 1n));
var minInt216 = -(2n ** (216n - 1n));
var minInt224 = -(2n ** (224n - 1n));
var minInt232 = -(2n ** (232n - 1n));
var minInt240 = -(2n ** (240n - 1n));
var minInt248 = -(2n ** (248n - 1n));
var minInt256 = -(2n ** (256n - 1n));
var maxUint8 = 2n ** 8n - 1n;
var maxUint16 = 2n ** 16n - 1n;
var maxUint24 = 2n ** 24n - 1n;
var maxUint32 = 2n ** 32n - 1n;
var maxUint40 = 2n ** 40n - 1n;
var maxUint48 = 2n ** 48n - 1n;
var maxUint56 = 2n ** 56n - 1n;
var maxUint64 = 2n ** 64n - 1n;
var maxUint72 = 2n ** 72n - 1n;
var maxUint80 = 2n ** 80n - 1n;
var maxUint88 = 2n ** 88n - 1n;
var maxUint96 = 2n ** 96n - 1n;
var maxUint104 = 2n ** 104n - 1n;
var maxUint112 = 2n ** 112n - 1n;
var maxUint120 = 2n ** 120n - 1n;
var maxUint128 = 2n ** 128n - 1n;
var maxUint136 = 2n ** 136n - 1n;
var maxUint144 = 2n ** 144n - 1n;
var maxUint152 = 2n ** 152n - 1n;
var maxUint160 = 2n ** 160n - 1n;
var maxUint168 = 2n ** 168n - 1n;
var maxUint176 = 2n ** 176n - 1n;
var maxUint184 = 2n ** 184n - 1n;
var maxUint192 = 2n ** 192n - 1n;
var maxUint200 = 2n ** 200n - 1n;
var maxUint208 = 2n ** 208n - 1n;
var maxUint216 = 2n ** 216n - 1n;
var maxUint224 = 2n ** 224n - 1n;
var maxUint232 = 2n ** 232n - 1n;
var maxUint240 = 2n ** 240n - 1n;
var maxUint248 = 2n ** 248n - 1n;
var maxUint256 = 2n ** 256n - 1n;

// node_modules/ox/_esm/core/Signature.js
var Signature_exports = {};
__export(Signature_exports, {
  InvalidRError: () => InvalidRError,
  InvalidSError: () => InvalidSError,
  InvalidSerializedSizeError: () => InvalidSerializedSizeError2,
  InvalidVError: () => InvalidVError,
  InvalidYParityError: () => InvalidYParityError,
  MissingPropertiesError: () => MissingPropertiesError,
  assert: () => assert5,
  extract: () => extract,
  from: () => from5,
  fromBytes: () => fromBytes3,
  fromDerBytes: () => fromDerBytes,
  fromDerHex: () => fromDerHex,
  fromHex: () => fromHex3,
  fromLegacy: () => fromLegacy,
  fromRpc: () => fromRpc,
  fromTuple: () => fromTuple,
  toBytes: () => toBytes3,
  toDerBytes: () => toDerBytes,
  toDerHex: () => toDerHex,
  toHex: () => toHex2,
  toLegacy: () => toLegacy,
  toRpc: () => toRpc,
  toTuple: () => toTuple,
  vToYParity: () => vToYParity,
  validate: () => validate3,
  yParityToV: () => yParityToV
});

// node_modules/ox/node_modules/@noble/hashes/esm/hmac.js
var HMAC = class extends Hash {
  constructor(hash, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    ahash(hash);
    const key = toBytes(_key);
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad3 = new Uint8Array(blockLen);
    pad3.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i4 = 0; i4 < pad3.length; i4++)
      pad3[i4] ^= 54;
    this.iHash.update(pad3);
    this.oHash = hash.create();
    for (let i4 = 0; i4 < pad3.length; i4++)
      pad3[i4] ^= 54 ^ 92;
    this.oHash.update(pad3);
    clean(pad3);
  }
  update(buf) {
    aexists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists(this);
    abytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to4) {
    to4 || (to4 = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to4 = to4;
    to4.finished = finished;
    to4.destroyed = destroyed;
    to4.blockLen = blockLen;
    to4.outputLen = outputLen;
    to4.oHash = oHash._cloneInto(to4.oHash);
    to4.iHash = iHash._cloneInto(to4.iHash);
    return to4;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
hmac.create = (hash, key) => new HMAC(hash, key);

// node_modules/ox/node_modules/@noble/curves/esm/abstract/modular.js
var _0n3 = BigInt(0);
var _1n3 = BigInt(1);
var _2n2 = /* @__PURE__ */ BigInt(2);
var _3n = /* @__PURE__ */ BigInt(3);
var _4n = /* @__PURE__ */ BigInt(4);
var _5n = /* @__PURE__ */ BigInt(5);
var _8n = /* @__PURE__ */ BigInt(8);
function mod(a4, b5) {
  const result = a4 % b5;
  return result >= _0n3 ? result : b5 + result;
}
function pow2(x5, power, modulo) {
  let res = x5;
  while (power-- > _0n3) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n3)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n3)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a4 = mod(number, modulo);
  let b5 = modulo;
  let x5 = _0n3, y4 = _1n3, u2 = _1n3, v5 = _0n3;
  while (a4 !== _0n3) {
    const q2 = b5 / a4;
    const r3 = b5 % a4;
    const m3 = x5 - u2 * q2;
    const n5 = y4 - v5 * q2;
    b5 = a4, a4 = r3, x5 = u2, y4 = v5, u2 = m3, v5 = n5;
  }
  const gcd2 = b5;
  if (gcd2 !== _1n3)
    throw new Error("invert: does not exist");
  return mod(x5, modulo);
}
function sqrt3mod4(Fp, n5) {
  const p1div4 = (Fp.ORDER + _1n3) / _4n;
  const root = Fp.pow(n5, p1div4);
  if (!Fp.eql(Fp.sqr(root), n5))
    throw new Error("Cannot find square root");
  return root;
}
function sqrt5mod8(Fp, n5) {
  const p5div8 = (Fp.ORDER - _5n) / _8n;
  const n22 = Fp.mul(n5, _2n2);
  const v5 = Fp.pow(n22, p5div8);
  const nv = Fp.mul(n5, v5);
  const i4 = Fp.mul(Fp.mul(nv, _2n2), v5);
  const root = Fp.mul(nv, Fp.sub(i4, Fp.ONE));
  if (!Fp.eql(Fp.sqr(root), n5))
    throw new Error("Cannot find square root");
  return root;
}
function tonelliShanks(P5) {
  if (P5 < BigInt(3))
    throw new Error("sqrt is not defined for small field");
  let Q4 = P5 - _1n3;
  let S4 = 0;
  while (Q4 % _2n2 === _0n3) {
    Q4 /= _2n2;
    S4++;
  }
  let Z = _2n2;
  const _Fp = Field(P5);
  while (FpLegendre(_Fp, Z) === 1) {
    if (Z++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S4 === 1)
    return sqrt3mod4;
  let cc2 = _Fp.pow(Z, Q4);
  const Q1div2 = (Q4 + _1n3) / _2n2;
  return function tonelliSlow(Fp, n5) {
    if (Fp.is0(n5))
      return n5;
    if (FpLegendre(Fp, n5) !== 1)
      throw new Error("Cannot find square root");
    let M5 = S4;
    let c6 = Fp.mul(Fp.ONE, cc2);
    let t = Fp.pow(n5, Q4);
    let R3 = Fp.pow(n5, Q1div2);
    while (!Fp.eql(t, Fp.ONE)) {
      if (Fp.is0(t))
        return Fp.ZERO;
      let i4 = 1;
      let t_tmp = Fp.sqr(t);
      while (!Fp.eql(t_tmp, Fp.ONE)) {
        i4++;
        t_tmp = Fp.sqr(t_tmp);
        if (i4 === M5)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n3 << BigInt(M5 - i4 - 1);
      const b5 = Fp.pow(c6, exponent);
      M5 = i4;
      c6 = Fp.sqr(b5);
      t = Fp.mul(t, c6);
      R3 = Fp.mul(R3, b5);
    }
    return R3;
  };
}
function FpSqrt(P5) {
  if (P5 % _4n === _3n)
    return sqrt3mod4;
  if (P5 % _8n === _5n)
    return sqrt5mod8;
  return tonelliShanks(P5);
}
var FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
function FpPow(Fp, num, power) {
  if (power < _0n3)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n3)
    return Fp.ONE;
  if (power === _1n3)
    return num;
  let p4 = Fp.ONE;
  let d4 = num;
  while (power > _0n3) {
    if (power & _1n3)
      p4 = Fp.mul(p4, d4);
    d4 = Fp.sqr(d4);
    power >>= _1n3;
  }
  return p4;
}
function FpInvertBatch(Fp, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i4) => {
    if (Fp.is0(num))
      return acc;
    inverted[i4] = acc;
    return Fp.mul(acc, num);
  }, Fp.ONE);
  const invertedAcc = Fp.inv(multipliedAcc);
  nums.reduceRight((acc, num, i4) => {
    if (Fp.is0(num))
      return acc;
    inverted[i4] = Fp.mul(acc, inverted[i4]);
    return Fp.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp, n5) {
  const p1mod2 = (Fp.ORDER - _1n3) / _2n2;
  const powered = Fp.pow(n5, p1mod2);
  const yes = Fp.eql(powered, Fp.ONE);
  const zero = Fp.eql(powered, Fp.ZERO);
  const no4 = Fp.eql(powered, Fp.neg(Fp.ONE));
  if (!yes && !zero && !no4)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n5, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n5.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLen2, isLE2 = false, redef = {}) {
  if (ORDER <= _0n3)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f5 = Object.freeze({
    ORDER,
    isLE: isLE2,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n3,
    ONE: _1n3,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n3 <= num && num < ORDER;
    },
    is0: (num) => num === _0n3,
    isOdd: (num) => (num & _1n3) === _1n3,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f5, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: redef.sqrt || ((n5) => {
      if (!sqrtP)
        sqrtP = FpSqrt(ORDER);
      return sqrtP(f5, n5);
    }),
    toBytes: (num) => isLE2 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes) => {
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      return isLE2 ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch(f5, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a4, b5, c6) => c6 ? b5 : a4
  });
  return Object.freeze(f5);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length2 = getFieldBytesLength(fieldOrder);
  return length2 + Math.ceil(length2 / 2);
}
function mapHashToField(key, fieldOrder, isLE2 = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE2 ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n3) + _1n3;
  return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}

// node_modules/ox/node_modules/@noble/curves/esm/abstract/curve.js
var _0n4 = BigInt(0);
var _1n4 = BigInt(1);
function constTimeNegate(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function validateW(W4, bits) {
  if (!Number.isSafeInteger(W4) || W4 <= 0 || W4 > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W4);
}
function calcWOpts(W4, scalarBits) {
  validateW(W4, scalarBits);
  const windows = Math.ceil(scalarBits / W4) + 1;
  const windowSize = 2 ** (W4 - 1);
  const maxNumber = 2 ** W4;
  const mask = bitMask(W4);
  const shiftBy = BigInt(W4);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n5, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n5 & mask);
  let nextN = n5 >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n4;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c6) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p4, i4) => {
    if (!(p4 instanceof c6))
      throw new Error("invalid point at index " + i4);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s3, i4) => {
    if (!field.isValid(s3))
      throw new Error("invalid scalar at index " + i4);
  });
}
var pointPrecomputes = /* @__PURE__ */ new WeakMap();
var pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P5) {
  return pointWindowSizes.get(P5) || 1;
}
function wNAF(c6, bits) {
  return {
    constTimeNegate,
    hasPrecomputes(elm) {
      return getW(elm) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(elm, n5, p4 = c6.ZERO) {
      let d4 = elm;
      while (n5 > _0n4) {
        if (n5 & _1n4)
          p4 = p4.add(d4);
        d4 = d4.double();
        n5 >>= _1n4;
      }
      return p4;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W4) {
      const { windows, windowSize } = calcWOpts(W4, bits);
      const points = [];
      let p4 = elm;
      let base3 = p4;
      for (let window2 = 0; window2 < windows; window2++) {
        base3 = p4;
        points.push(base3);
        for (let i4 = 1; i4 < windowSize; i4++) {
          base3 = base3.add(p4);
          points.push(base3);
        }
        p4 = base3.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W4, precomputes, n5) {
      let p4 = c6.ZERO;
      let f5 = c6.BASE;
      const wo4 = calcWOpts(W4, bits);
      for (let window2 = 0; window2 < wo4.windows; window2++) {
        const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n5, window2, wo4);
        n5 = nextN;
        if (isZero) {
          f5 = f5.add(constTimeNegate(isNegF, precomputes[offsetF]));
        } else {
          p4 = p4.add(constTimeNegate(isNeg, precomputes[offset]));
        }
      }
      return { p: p4, f: f5 };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(W4, precomputes, n5, acc = c6.ZERO) {
      const wo4 = calcWOpts(W4, bits);
      for (let window2 = 0; window2 < wo4.windows; window2++) {
        if (n5 === _0n4)
          break;
        const { nextN, offset, isZero, isNeg } = calcOffsets(n5, window2, wo4);
        n5 = nextN;
        if (isZero) {
          continue;
        } else {
          const item = precomputes[offset];
          acc = acc.add(isNeg ? item.negate() : item);
        }
      }
      return acc;
    },
    getPrecomputes(W4, P5, transform) {
      let comp = pointPrecomputes.get(P5);
      if (!comp) {
        comp = this.precomputeWindow(P5, W4);
        if (W4 !== 1)
          pointPrecomputes.set(P5, transform(comp));
      }
      return comp;
    },
    wNAFCached(P5, n5, transform) {
      const W4 = getW(P5);
      return this.wNAF(W4, this.getPrecomputes(W4, P5, transform), n5);
    },
    wNAFCachedUnsafe(P5, n5, transform, prev) {
      const W4 = getW(P5);
      if (W4 === 1)
        return this.unsafeLadder(P5, n5, prev);
      return this.wNAFUnsafe(W4, this.getPrecomputes(W4, P5, transform), n5, prev);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(P5, W4) {
      validateW(W4, bits);
      pointWindowSizes.set(P5, W4);
      pointPrecomputes.delete(P5);
    }
  };
}
function pippenger(c6, fieldN, points, scalars) {
  validateMSMPoints(points, c6);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c6.ZERO;
  const wbits = bitLen(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i4 = lastBits; i4 >= 0; i4 -= windowSize) {
    buckets.fill(zero);
    for (let j6 = 0; j6 < slength; j6++) {
      const scalar = scalars[j6];
      const wbits2 = Number(scalar >> BigInt(i4) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j6]);
    }
    let resI = zero;
    for (let j6 = buckets.length - 1, sumI = zero; j6 > 0; j6--) {
      sumI = sumI.add(buckets[j6]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i4 !== 0)
      for (let j6 = 0; j6 < windowSize; j6++)
        sum = sum.double();
  }
  return sum;
}
function validateBasic(curve) {
  validateField(curve.Fp);
  validateObject(curve, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve.n, curve.nBitLength),
    ...curve,
    ...{ p: curve.Fp.ORDER }
  });
}

// node_modules/ox/node_modules/@noble/curves/esm/abstract/weierstrass.js
function validateSigVerOpts(opts) {
  if (opts.lowS !== void 0)
    abool("lowS", opts.lowS);
  if (opts.prehash !== void 0)
    abool("prehash", opts.prehash);
}
function validatePointOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    a: "field",
    b: "field"
  }, {
    allowInfinityPoint: "boolean",
    allowedPrivateKeyLengths: "array",
    clearCofactor: "function",
    fromBytes: "function",
    isTorsionFree: "function",
    toBytes: "function",
    wrapPrivateKey: "boolean"
  });
  const { endo, Fp, a: a4 } = opts;
  if (endo) {
    if (!Fp.eql(a4, Fp.ZERO)) {
      throw new Error("invalid endo: CURVE.a must be 0");
    }
    if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
    }
  }
  return Object.freeze({ ...opts });
}
var DERErr = class extends Error {
  constructor(m3 = "") {
    super(m3);
  }
};
var DER = {
  // asn.1 DER encoding utils
  Err: DERErr,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (tag, data) => {
      const { Err: E4 } = DER;
      if (tag < 0 || tag > 256)
        throw new E4("tlv.encode: wrong tag");
      if (data.length & 1)
        throw new E4("tlv.encode: unpadded data");
      const dataLen = data.length / 2;
      const len = numberToHexUnpadded(dataLen);
      if (len.length / 2 & 128)
        throw new E4("tlv.encode: long form length too big");
      const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
      const t = numberToHexUnpadded(tag);
      return t + lenLen + len + data;
    },
    // v - value, l - left bytes (unparsed)
    decode(tag, data) {
      const { Err: E4 } = DER;
      let pos = 0;
      if (tag < 0 || tag > 256)
        throw new E4("tlv.encode: wrong tag");
      if (data.length < 2 || data[pos++] !== tag)
        throw new E4("tlv.decode: wrong tlv");
      const first = data[pos++];
      const isLong = !!(first & 128);
      let length2 = 0;
      if (!isLong)
        length2 = first;
      else {
        const lenLen = first & 127;
        if (!lenLen)
          throw new E4("tlv.decode(long): indefinite length not supported");
        if (lenLen > 4)
          throw new E4("tlv.decode(long): byte length is too big");
        const lengthBytes = data.subarray(pos, pos + lenLen);
        if (lengthBytes.length !== lenLen)
          throw new E4("tlv.decode: length bytes not complete");
        if (lengthBytes[0] === 0)
          throw new E4("tlv.decode(long): zero leftmost byte");
        for (const b5 of lengthBytes)
          length2 = length2 << 8 | b5;
        pos += lenLen;
        if (length2 < 128)
          throw new E4("tlv.decode(long): not minimal encoding");
      }
      const v5 = data.subarray(pos, pos + length2);
      if (v5.length !== length2)
        throw new E4("tlv.decode: wrong value length");
      return { v: v5, l: data.subarray(pos + length2) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(num) {
      const { Err: E4 } = DER;
      if (num < _0n5)
        throw new E4("integer: negative integers are not allowed");
      let hex = numberToHexUnpadded(num);
      if (Number.parseInt(hex[0], 16) & 8)
        hex = "00" + hex;
      if (hex.length & 1)
        throw new E4("unexpected DER parsing assertion: unpadded hex");
      return hex;
    },
    decode(data) {
      const { Err: E4 } = DER;
      if (data[0] & 128)
        throw new E4("invalid signature integer: negative");
      if (data[0] === 0 && !(data[1] & 128))
        throw new E4("invalid signature integer: unnecessary leading zero");
      return bytesToNumberBE(data);
    }
  },
  toSig(hex) {
    const { Err: E4, _int: int, _tlv: tlv } = DER;
    const data = ensureBytes("signature", hex);
    const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
    if (seqLeftBytes.length)
      throw new E4("invalid signature: left bytes after parsing");
    const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
    const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
    if (sLeftBytes.length)
      throw new E4("invalid signature: left bytes after parsing");
    return { r: int.decode(rBytes), s: int.decode(sBytes) };
  },
  hexFromSig(sig) {
    const { _tlv: tlv, _int: int } = DER;
    const rs2 = tlv.encode(2, int.encode(sig.r));
    const ss2 = tlv.encode(2, int.encode(sig.s));
    const seq = rs2 + ss2;
    return tlv.encode(48, seq);
  }
};
function numToSizedHex(num, size3) {
  return bytesToHex(numberToBytesBE(num, size3));
}
var _0n5 = BigInt(0);
var _1n5 = BigInt(1);
var _2n3 = BigInt(2);
var _3n2 = BigInt(3);
var _4n2 = BigInt(4);
function weierstrassPoints(opts) {
  const CURVE = validatePointOpts(opts);
  const { Fp } = CURVE;
  const Fn4 = Field(CURVE.n, CURVE.nBitLength);
  const toBytes4 = CURVE.toBytes || ((_c2, point, _isCompressed) => {
    const a4 = point.toAffine();
    return concatBytes2(Uint8Array.from([4]), Fp.toBytes(a4.x), Fp.toBytes(a4.y));
  });
  const fromBytes4 = CURVE.fromBytes || ((bytes) => {
    const tail = bytes.subarray(1);
    const x5 = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
    const y4 = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
    return { x: x5, y: y4 };
  });
  function weierstrassEquation(x5) {
    const { a: a4, b: b5 } = CURVE;
    const x22 = Fp.sqr(x5);
    const x32 = Fp.mul(x22, x5);
    return Fp.add(Fp.add(x32, Fp.mul(x5, a4)), b5);
  }
  function isValidXY(x5, y4) {
    const left = Fp.sqr(y4);
    const right = weierstrassEquation(x5);
    return Fp.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n2), _4n2);
  const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
  if (Fp.is0(Fp.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function isWithinCurveOrder(num) {
    return inRange(num, _1n5, CURVE.n);
  }
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N12 } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (isBytes2(key))
        key = bytesToHex(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("invalid private key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num;
    try {
      num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
    } catch (error) {
      throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
    }
    if (wrapPrivateKey)
      num = mod(num, N12);
    aInRange("private key", num, _1n5, N12);
    return num;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  const toAffineMemo = memoized((p4, iz) => {
    const { px: x5, py: y4, pz: z5 } = p4;
    if (Fp.eql(z5, Fp.ONE))
      return { x: x5, y: y4 };
    const is0 = p4.is0();
    if (iz == null)
      iz = is0 ? Fp.ONE : Fp.inv(z5);
    const ax = Fp.mul(x5, iz);
    const ay = Fp.mul(y4, iz);
    const zz = Fp.mul(z5, iz);
    if (is0)
      return { x: Fp.ZERO, y: Fp.ZERO };
    if (!Fp.eql(zz, Fp.ONE))
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized((p4) => {
    if (p4.is0()) {
      if (CURVE.allowInfinityPoint && !Fp.is0(p4.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: x5, y: y4 } = p4.toAffine();
    if (!Fp.isValid(x5) || !Fp.isValid(y4))
      throw new Error("bad point: x or y not FE");
    if (!isValidXY(x5, y4))
      throw new Error("bad point: equation left != right");
    if (!p4.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  class Point {
    constructor(px, py, pz) {
      if (px == null || !Fp.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp.isValid(py) || Fp.is0(py))
        throw new Error("y required");
      if (pz == null || !Fp.isValid(pz))
        throw new Error("z required");
      this.px = px;
      this.py = py;
      this.pz = pz;
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(p4) {
      const { x: x5, y: y4 } = p4 || {};
      if (!p4 || !Fp.isValid(x5) || !Fp.isValid(y4))
        throw new Error("invalid affine point");
      if (p4 instanceof Point)
        throw new Error("projective point not allowed");
      const is0 = (i4) => Fp.eql(i4, Fp.ZERO);
      if (is0(x5) && is0(y4))
        return Point.ZERO;
      return new Point(x5, y4, Fp.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(points) {
      const toInv = FpInvertBatch(Fp, points.map((p4) => p4.pz));
      return points.map((p4, i4) => p4.toAffine(toInv[i4])).map(Point.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(hex) {
      const P5 = Point.fromAffine(fromBytes4(ensureBytes("pointHex", hex)));
      P5.assertValidity();
      return P5;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    // Multiscalar Multiplication
    static msm(points, scalars) {
      return pippenger(Point, Fn4, points, scalars);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      wnaf.setWindowSize(this, windowSize);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y: y4 } = this.toAffine();
      if (Fp.isOdd)
        return !Fp.isOdd(y4);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X22, py: Y22, pz: Z2 } = other;
      const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X22, Z1));
      const U22 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y22, Z1));
      return U1 && U22;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new Point(this.px, Fp.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: a4, b: b5 } = CURVE;
      const b32 = Fp.mul(b5, _3n2);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X32 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      let t0 = Fp.mul(X1, X1);
      let t1 = Fp.mul(Y1, Y1);
      let t2 = Fp.mul(Z1, Z1);
      let t3 = Fp.mul(X1, Y1);
      t3 = Fp.add(t3, t3);
      Z3 = Fp.mul(X1, Z1);
      Z3 = Fp.add(Z3, Z3);
      X32 = Fp.mul(a4, Z3);
      Y3 = Fp.mul(b32, t2);
      Y3 = Fp.add(X32, Y3);
      X32 = Fp.sub(t1, Y3);
      Y3 = Fp.add(t1, Y3);
      Y3 = Fp.mul(X32, Y3);
      X32 = Fp.mul(t3, X32);
      Z3 = Fp.mul(b32, Z3);
      t2 = Fp.mul(a4, t2);
      t3 = Fp.sub(t0, t2);
      t3 = Fp.mul(a4, t3);
      t3 = Fp.add(t3, Z3);
      Z3 = Fp.add(t0, t0);
      t0 = Fp.add(Z3, t0);
      t0 = Fp.add(t0, t2);
      t0 = Fp.mul(t0, t3);
      Y3 = Fp.add(Y3, t0);
      t2 = Fp.mul(Y1, Z1);
      t2 = Fp.add(t2, t2);
      t0 = Fp.mul(t2, t3);
      X32 = Fp.sub(X32, t0);
      Z3 = Fp.mul(t2, t1);
      Z3 = Fp.add(Z3, Z3);
      Z3 = Fp.add(Z3, Z3);
      return new Point(X32, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X22, py: Y22, pz: Z2 } = other;
      let X32 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      const a4 = CURVE.a;
      const b32 = Fp.mul(CURVE.b, _3n2);
      let t0 = Fp.mul(X1, X22);
      let t1 = Fp.mul(Y1, Y22);
      let t2 = Fp.mul(Z1, Z2);
      let t3 = Fp.add(X1, Y1);
      let t4 = Fp.add(X22, Y22);
      t3 = Fp.mul(t3, t4);
      t4 = Fp.add(t0, t1);
      t3 = Fp.sub(t3, t4);
      t4 = Fp.add(X1, Z1);
      let t5 = Fp.add(X22, Z2);
      t4 = Fp.mul(t4, t5);
      t5 = Fp.add(t0, t2);
      t4 = Fp.sub(t4, t5);
      t5 = Fp.add(Y1, Z1);
      X32 = Fp.add(Y22, Z2);
      t5 = Fp.mul(t5, X32);
      X32 = Fp.add(t1, t2);
      t5 = Fp.sub(t5, X32);
      Z3 = Fp.mul(a4, t4);
      X32 = Fp.mul(b32, t2);
      Z3 = Fp.add(X32, Z3);
      X32 = Fp.sub(t1, Z3);
      Z3 = Fp.add(t1, Z3);
      Y3 = Fp.mul(X32, Z3);
      t1 = Fp.add(t0, t0);
      t1 = Fp.add(t1, t0);
      t2 = Fp.mul(a4, t2);
      t4 = Fp.mul(b32, t4);
      t1 = Fp.add(t1, t2);
      t2 = Fp.sub(t0, t2);
      t2 = Fp.mul(a4, t2);
      t4 = Fp.add(t4, t2);
      t0 = Fp.mul(t1, t4);
      Y3 = Fp.add(Y3, t0);
      t0 = Fp.mul(t5, t4);
      X32 = Fp.mul(t3, X32);
      X32 = Fp.sub(X32, t0);
      t0 = Fp.mul(t3, t1);
      Z3 = Fp.mul(t5, Z3);
      Z3 = Fp.add(Z3, t0);
      return new Point(X32, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    wNAF(n5) {
      return wnaf.wNAFCached(this, n5, Point.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc2) {
      const { endo: endo2, n: N12 } = CURVE;
      aInRange("scalar", sc2, _0n5, N12);
      const I3 = Point.ZERO;
      if (sc2 === _0n5)
        return I3;
      if (this.is0() || sc2 === _1n5)
        return this;
      if (!endo2 || wnaf.hasPrecomputes(this))
        return wnaf.wNAFCachedUnsafe(this, sc2, Point.normalizeZ);
      let { k1neg, k1, k2neg, k2: k22 } = endo2.splitScalar(sc2);
      let k1p = I3;
      let k2p = I3;
      let d4 = this;
      while (k1 > _0n5 || k22 > _0n5) {
        if (k1 & _1n5)
          k1p = k1p.add(d4);
        if (k22 & _1n5)
          k2p = k2p.add(d4);
        d4 = d4.double();
        k1 >>= _1n5;
        k22 >>= _1n5;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2, n: N12 } = CURVE;
      aInRange("scalar", scalar, _1n5, N12);
      let point, fake;
      if (endo2) {
        const { k1neg, k1, k2neg, k2: k22 } = endo2.splitScalar(scalar);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k22);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
        point = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p: p4, f: f5 } = this.wNAF(scalar);
        point = p4;
        fake = f5;
      }
      return Point.normalizeZ([point, fake])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(Q4, a4, b5) {
      const G4 = Point.BASE;
      const mul = (P5, a5) => a5 === _0n5 || a5 === _1n5 || !P5.equals(G4) ? P5.multiplyUnsafe(a5) : P5.multiply(a5);
      const sum = mul(this, a4).add(mul(Q4, b5));
      return sum.is0() ? void 0 : sum;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(iz) {
      return toAffineMemo(this, iz);
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n5)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n5)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      abool("isCompressed", isCompressed);
      this.assertValidity();
      return toBytes4(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      abool("isCompressed", isCompressed);
      return bytesToHex(this.toRawBytes(isCompressed));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
  Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
  const { endo, nBitLength } = CURVE;
  const wnaf = wNAF(Point, endo ? Math.ceil(nBitLength / 2) : nBitLength);
  return {
    CURVE,
    ProjectivePoint: Point,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
function validateOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  });
  return Object.freeze({ lowS: true, ...opts });
}
function weierstrass(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp, n: CURVE_ORDER, nByteLength, nBitLength } = CURVE;
  const compressedLen = Fp.BYTES + 1;
  const uncompressedLen = 2 * Fp.BYTES + 1;
  function modN(a4) {
    return mod(a4, CURVE_ORDER);
  }
  function invN(a4) {
    return invert(a4, CURVE_ORDER);
  }
  const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
    ...CURVE,
    toBytes(_c2, point, isCompressed) {
      const a4 = point.toAffine();
      const x5 = Fp.toBytes(a4.x);
      const cat = concatBytes2;
      abool("isCompressed", isCompressed);
      if (isCompressed) {
        return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x5);
      } else {
        return cat(Uint8Array.from([4]), x5, Fp.toBytes(a4.y));
      }
    },
    fromBytes(bytes) {
      const len = bytes.length;
      const head = bytes[0];
      const tail = bytes.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x5 = bytesToNumberBE(tail);
        if (!inRange(x5, _1n5, Fp.ORDER))
          throw new Error("Point is not on curve");
        const y22 = weierstrassEquation(x5);
        let y4;
        try {
          y4 = Fp.sqrt(y22);
        } catch (sqrtError) {
          const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
          throw new Error("Point is not on curve" + suffix);
        }
        const isYOdd = (y4 & _1n5) === _1n5;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y4 = Fp.neg(y4);
        return { x: x5, y: y4 };
      } else if (len === uncompressedLen && head === 4) {
        const x5 = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y4 = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return { x: x5, y: y4 };
      } else {
        const cl = compressedLen;
        const ul = uncompressedLen;
        throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
      }
    }
  });
  function isBiggerThanHalfOrder(number) {
    const HALF = CURVE_ORDER >> _1n5;
    return number > HALF;
  }
  function normalizeS(s3) {
    return isBiggerThanHalfOrder(s3) ? modN(-s3) : s3;
  }
  const slcNum = (b5, from8, to4) => bytesToNumberBE(b5.slice(from8, to4));
  class Signature {
    constructor(r3, s3, recovery) {
      aInRange("r", r3, _1n5, CURVE_ORDER);
      aInRange("s", s3, _1n5, CURVE_ORDER);
      this.r = r3;
      this.s = s3;
      if (recovery != null)
        this.recovery = recovery;
      Object.freeze(this);
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(hex) {
      const l6 = nByteLength;
      hex = ensureBytes("compactSignature", hex, l6 * 2);
      return new Signature(slcNum(hex, 0, l6), slcNum(hex, l6, 2 * l6));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(hex) {
      const { r: r3, s: s3 } = DER.toSig(ensureBytes("DER", hex));
      return new Signature(r3, s3);
    }
    /**
     * @todo remove
     * @deprecated
     */
    assertValidity() {
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r: r3, s: s3, recovery: rec } = this;
      const h5 = bits2int_modN(ensureBytes("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r3 + CURVE.n : r3;
      if (radj >= Fp.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R3 = Point.fromHex(prefix + numToSizedHex(radj, Fp.BYTES));
      const ir3 = invN(radj);
      const u1 = modN(-h5 * ir3);
      const u2 = modN(s3 * ir3);
      const Q4 = Point.BASE.multiplyAndAddUnsafe(R3, u1, u2);
      if (!Q4)
        throw new Error("point at infinify");
      Q4.assertValidity();
      return Q4;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hexToBytes(this.toDERHex());
    }
    toDERHex() {
      return DER.hexFromSig(this);
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hexToBytes(this.toCompactHex());
    }
    toCompactHex() {
      const l6 = nByteLength;
      return numToSizedHex(this.r, l6) + numToSizedHex(this.s, l6);
    }
  }
  const utils = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const length2 = getMinHashLength(CURVE.n);
      return mapHashToField(CURVE.randomBytes(length2), CURVE.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(windowSize = 8, point = Point.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  function getPublicKey2(privateKey, isCompressed = true) {
    return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  function isProbPub(item) {
    if (typeof item === "bigint")
      return false;
    if (item instanceof Point)
      return true;
    const arr = ensureBytes("key", item);
    const len = arr.length;
    const fpl = Fp.BYTES;
    const compLen = fpl + 1;
    const uncompLen = 2 * fpl + 1;
    if (CURVE.allowedPrivateKeyLengths || nByteLength === compLen) {
      return void 0;
    } else {
      return len === compLen || len === uncompLen;
    }
  }
  function getSharedSecret2(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA) === true)
      throw new Error("first arg must be private key");
    if (isProbPub(publicB) === false)
      throw new Error("second arg must be public key");
    const b5 = Point.fromHex(publicB);
    return b5.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  const bits2int = CURVE.bits2int || function(bytes) {
    if (bytes.length > 8192)
      throw new Error("input is too large");
    const num = bytesToNumberBE(bytes);
    const delta = bytes.length * 8 - nBitLength;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
    return modN(bits2int(bytes));
  };
  const ORDER_MASK = bitMask(nBitLength);
  function int2octets(num) {
    aInRange("num < 2^" + nBitLength, num, _0n5, ORDER_MASK);
    return numberToBytesBE(num, nByteLength);
  }
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k5) => k5 in opts))
      throw new Error("sign() legacy options not supported");
    const { hash, randomBytes: randomBytes2 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes("msgHash", msgHash);
    validateSigVerOpts(opts);
    if (prehash)
      msgHash = ensureBytes("prehashed msgHash", hash(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d4 = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d4), int2octets(h1int)];
    if (ent != null && ent !== false) {
      const e2 = ent === true ? randomBytes2(Fp.BYTES) : ent;
      seedArgs.push(ensureBytes("extraEntropy", e2));
    }
    const seed = concatBytes2(...seedArgs);
    const m3 = h1int;
    function k2sig(kBytes) {
      const k5 = bits2int(kBytes);
      if (!isWithinCurveOrder(k5))
        return;
      const ik = invN(k5);
      const q2 = Point.BASE.multiply(k5).toAffine();
      const r3 = modN(q2.x);
      if (r3 === _0n5)
        return;
      const s3 = modN(ik * modN(m3 + r3 * d4));
      if (s3 === _0n5)
        return;
      let recovery = (q2.x === r3 ? 0 : 2) | Number(q2.y & _1n5);
      let normS = s3;
      if (lowS && isBiggerThanHalfOrder(s3)) {
        normS = normalizeS(s3);
        recovery ^= 1;
      }
      return new Signature(r3, normS, recovery);
    }
    return { seed, k2sig };
  }
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign2(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C4 = CURVE;
    const drbg = createHmacDrbg(C4.hash.outputLen, C4.nByteLength, C4.hmac);
    return drbg(seed, k2sig);
  }
  Point.BASE._setWindowSize(8);
  function verify2(signature, msgHash, publicKey, opts = defaultVerOpts) {
    const sg = signature;
    msgHash = ensureBytes("msgHash", msgHash);
    publicKey = ensureBytes("publicKey", publicKey);
    const { lowS, prehash, format } = opts;
    validateSigVerOpts(opts);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    if (format !== void 0 && format !== "compact" && format !== "der")
      throw new Error("format must be compact or der");
    const isHex = typeof sg === "string" || isBytes2(sg);
    const isObj = !isHex && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
    if (!isHex && !isObj)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let _sig = void 0;
    let P5;
    try {
      if (isObj)
        _sig = new Signature(sg.r, sg.s);
      if (isHex) {
        try {
          if (format !== "compact")
            _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER.Err))
            throw derError;
        }
        if (!_sig && format !== "der")
          _sig = Signature.fromCompact(sg);
      }
      P5 = Point.fromHex(publicKey);
    } catch (error) {
      return false;
    }
    if (!_sig)
      return false;
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r: r3, s: s3 } = _sig;
    const h5 = bits2int_modN(msgHash);
    const is2 = invN(s3);
    const u1 = modN(h5 * is2);
    const u2 = modN(r3 * is2);
    const R3 = Point.BASE.multiplyAndAddUnsafe(P5, u1, u2)?.toAffine();
    if (!R3)
      return false;
    const v5 = modN(R3.x);
    return v5 === r3;
  }
  return {
    CURVE,
    getPublicKey: getPublicKey2,
    getSharedSecret: getSharedSecret2,
    sign: sign2,
    verify: verify2,
    ProjectivePoint: Point,
    Signature,
    utils
  };
}

// node_modules/ox/node_modules/@noble/curves/esm/_shortw_utils.js
function getHash(hash) {
  return {
    hash,
    hmac: (key, ...msgs) => hmac(hash, key, concatBytes(...msgs)),
    randomBytes
  };
}
function createCurve(curveDef, defHash) {
  const create2 = (hash) => weierstrass({ ...curveDef, ...getHash(hash) });
  return { ...create2(defHash), create: create2 };
}

// node_modules/ox/node_modules/@noble/curves/esm/secp256k1.js
var secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
var secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var _0n6 = BigInt(0);
var _1n6 = BigInt(1);
var _2n4 = BigInt(2);
var divNearest = (a4, b5) => (a4 + b5 / _2n4) / b5;
function sqrtMod(y4) {
  const P5 = secp256k1P;
  const _3n3 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b22 = y4 * y4 * y4 % P5;
  const b32 = b22 * b22 * y4 % P5;
  const b6 = pow2(b32, _3n3, P5) * b32 % P5;
  const b9 = pow2(b6, _3n3, P5) * b32 % P5;
  const b11 = pow2(b9, _2n4, P5) * b22 % P5;
  const b222 = pow2(b11, _11n, P5) * b11 % P5;
  const b44 = pow2(b222, _22n, P5) * b222 % P5;
  const b88 = pow2(b44, _44n, P5) * b44 % P5;
  const b176 = pow2(b88, _88n, P5) * b88 % P5;
  const b220 = pow2(b176, _44n, P5) * b44 % P5;
  const b223 = pow2(b220, _3n3, P5) * b32 % P5;
  const t1 = pow2(b223, _23n, P5) * b222 % P5;
  const t2 = pow2(t1, _6n, P5) * b22 % P5;
  const root = pow2(t2, _2n4, P5);
  if (!Fpk1.eql(Fpk1.sqr(root), y4))
    throw new Error("Cannot find square root");
  return root;
}
var Fpk1 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
var secp256k1 = createCurve({
  a: _0n6,
  b: BigInt(7),
  Fp: Fpk1,
  n: secp256k1N,
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: true,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (k5) => {
      const n5 = secp256k1N;
      const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
      const b1 = -_1n6 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
      const a22 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
      const b22 = a1;
      const POW_2_128 = BigInt("0x100000000000000000000000000000000");
      const c1 = divNearest(b22 * k5, n5);
      const c22 = divNearest(-b1 * k5, n5);
      let k1 = mod(k5 - c1 * a1 - c22 * a22, n5);
      let k22 = mod(-c1 * b1 - c22 * b22, n5);
      const k1neg = k1 > POW_2_128;
      const k2neg = k22 > POW_2_128;
      if (k1neg)
        k1 = n5 - k1;
      if (k2neg)
        k22 = n5 - k22;
      if (k1 > POW_2_128 || k22 > POW_2_128) {
        throw new Error("splitScalar: Endomorphism failed, k=" + k5);
      }
      return { k1neg, k1, k2neg, k2: k22 };
    }
  }
}, sha256);

// node_modules/ox/_esm/core/Signature.js
function assert5(signature, options = {}) {
  const { recovered } = options;
  if (typeof signature.r === "undefined")
    throw new MissingPropertiesError({ signature });
  if (typeof signature.s === "undefined")
    throw new MissingPropertiesError({ signature });
  if (recovered && typeof signature.yParity === "undefined")
    throw new MissingPropertiesError({ signature });
  if (signature.r < 0n || signature.r > maxUint256)
    throw new InvalidRError({ value: signature.r });
  if (signature.s < 0n || signature.s > maxUint256)
    throw new InvalidSError({ value: signature.s });
  if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
    throw new InvalidYParityError({ value: signature.yParity });
}
function fromBytes3(signature) {
  return fromHex3(fromBytes(signature));
}
function fromHex3(signature) {
  if (signature.length !== 130 && signature.length !== 132)
    throw new InvalidSerializedSizeError2({ signature });
  const r3 = BigInt(slice(signature, 0, 32));
  const s3 = BigInt(slice(signature, 32, 64));
  const yParity = (() => {
    const yParity2 = Number(`0x${signature.slice(130)}`);
    if (Number.isNaN(yParity2))
      return void 0;
    try {
      return vToYParity(yParity2);
    } catch {
      throw new InvalidYParityError({ value: yParity2 });
    }
  })();
  if (typeof yParity === "undefined")
    return {
      r: r3,
      s: s3
    };
  return {
    r: r3,
    s: s3,
    yParity
  };
}
function extract(value) {
  if (typeof value.r === "undefined")
    return void 0;
  if (typeof value.s === "undefined")
    return void 0;
  return from5(value);
}
function from5(signature) {
  const signature_ = (() => {
    if (typeof signature === "string")
      return fromHex3(signature);
    if (signature instanceof Uint8Array)
      return fromBytes3(signature);
    if (typeof signature.r === "string")
      return fromRpc(signature);
    if (signature.v)
      return fromLegacy(signature);
    return {
      r: signature.r,
      s: signature.s,
      ...typeof signature.yParity !== "undefined" ? { yParity: signature.yParity } : {}
    };
  })();
  assert5(signature_);
  return signature_;
}
function fromDerBytes(signature) {
  return fromDerHex(fromBytes(signature));
}
function fromDerHex(signature) {
  const { r: r3, s: s3 } = secp256k1.Signature.fromDER(from(signature).slice(2));
  return { r: r3, s: s3 };
}
function fromLegacy(signature) {
  return {
    r: signature.r,
    s: signature.s,
    yParity: vToYParity(signature.v)
  };
}
function fromRpc(signature) {
  const yParity = (() => {
    const v5 = signature.v ? Number(signature.v) : void 0;
    let yParity2 = signature.yParity ? Number(signature.yParity) : void 0;
    if (typeof v5 === "number" && typeof yParity2 !== "number")
      yParity2 = vToYParity(v5);
    if (typeof yParity2 !== "number")
      throw new InvalidYParityError({ value: signature.yParity });
    return yParity2;
  })();
  return {
    r: BigInt(signature.r),
    s: BigInt(signature.s),
    yParity
  };
}
function fromTuple(tuple) {
  const [yParity, r3, s3] = tuple;
  return from5({
    r: r3 === "0x" ? 0n : BigInt(r3),
    s: s3 === "0x" ? 0n : BigInt(s3),
    yParity: yParity === "0x" ? 0 : Number(yParity)
  });
}
function toBytes3(signature) {
  return fromHex(toHex2(signature));
}
function toHex2(signature) {
  assert5(signature);
  const r3 = signature.r;
  const s3 = signature.s;
  const signature_ = concat(
    fromNumber(r3, { size: 32 }),
    fromNumber(s3, { size: 32 }),
    // If the signature is recovered, add the recovery byte to the signature.
    typeof signature.yParity === "number" ? fromNumber(yParityToV(signature.yParity), { size: 1 }) : "0x"
  );
  return signature_;
}
function toDerBytes(signature) {
  const sig = new secp256k1.Signature(signature.r, signature.s);
  return sig.toDERRawBytes();
}
function toDerHex(signature) {
  const sig = new secp256k1.Signature(signature.r, signature.s);
  return `0x${sig.toDERHex()}`;
}
function toLegacy(signature) {
  return {
    r: signature.r,
    s: signature.s,
    v: yParityToV(signature.yParity)
  };
}
function toRpc(signature) {
  const { r: r3, s: s3, yParity } = signature;
  return {
    r: fromNumber(r3, { size: 32 }),
    s: fromNumber(s3, { size: 32 }),
    yParity: yParity === 0 ? "0x0" : "0x1"
  };
}
function toTuple(signature) {
  const { r: r3, s: s3, yParity } = signature;
  return [
    yParity ? "0x01" : "0x",
    r3 === 0n ? "0x" : trimLeft(fromNumber(r3)),
    s3 === 0n ? "0x" : trimLeft(fromNumber(s3))
  ];
}
function validate3(signature, options = {}) {
  try {
    assert5(signature, options);
    return true;
  } catch {
    return false;
  }
}
function vToYParity(v5) {
  if (v5 === 0 || v5 === 27)
    return 0;
  if (v5 === 1 || v5 === 28)
    return 1;
  if (v5 >= 35)
    return v5 % 2 === 0 ? 1 : 0;
  throw new InvalidVError({ value: v5 });
}
function yParityToV(yParity) {
  if (yParity === 0)
    return 27;
  if (yParity === 1)
    return 28;
  throw new InvalidYParityError({ value: yParity });
}
var InvalidSerializedSizeError2 = class extends BaseError {
  constructor({ signature }) {
    super(`Value \`${signature}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${size2(from(signature))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSerializedSizeError"
    });
  }
};
var MissingPropertiesError = class extends BaseError {
  constructor({ signature }) {
    super(`Signature \`${stringify2(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.MissingPropertiesError"
    });
  }
};
var InvalidRError = class extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidRError"
    });
  }
};
var InvalidSError = class extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSError"
    });
  }
};
var InvalidYParityError = class extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidYParityError"
    });
  }
};
var InvalidVError = class extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidVError"
    });
  }
};

// node_modules/@scure/base/lib/esm/index.js
function isBytes3(a4) {
  return a4 instanceof Uint8Array || ArrayBuffer.isView(a4) && a4.constructor.name === "Uint8Array";
}
function isArrayOf(isString, arr) {
  if (!Array.isArray(arr))
    return false;
  if (arr.length === 0)
    return true;
  if (isString) {
    return arr.every((item) => typeof item === "string");
  } else {
    return arr.every((item) => Number.isSafeInteger(item));
  }
}
function astr(label, input) {
  if (typeof input !== "string")
    throw new Error(`${label}: string expected`);
  return true;
}
function anumber2(n5) {
  if (!Number.isSafeInteger(n5))
    throw new Error(`invalid integer: ${n5}`);
}
function aArr(input) {
  if (!Array.isArray(input))
    throw new Error("array expected");
}
function astrArr(label, input) {
  if (!isArrayOf(true, input))
    throw new Error(`${label}: array of strings expected`);
}
function anumArr(label, input) {
  if (!isArrayOf(false, input))
    throw new Error(`${label}: array of numbers expected`);
}
// @__NO_SIDE_EFFECTS__
function chain(...args) {
  const id = (a4) => a4;
  const wrap = (a4, b5) => (c6) => a4(b5(c6));
  const encode6 = args.map((x5) => x5.encode).reduceRight(wrap, id);
  const decode7 = args.map((x5) => x5.decode).reduce(wrap, id);
  return { encode: encode6, decode: decode7 };
}
// @__NO_SIDE_EFFECTS__
function alphabet(letters) {
  const lettersA = typeof letters === "string" ? letters.split("") : letters;
  const len = lettersA.length;
  astrArr("alphabet", lettersA);
  const indexes = new Map(lettersA.map((l6, i4) => [l6, i4]));
  return {
    encode: (digits) => {
      aArr(digits);
      return digits.map((i4) => {
        if (!Number.isSafeInteger(i4) || i4 < 0 || i4 >= len)
          throw new Error(`alphabet.encode: digit index outside alphabet "${i4}". Allowed: ${letters}`);
        return lettersA[i4];
      });
    },
    decode: (input) => {
      aArr(input);
      return input.map((letter) => {
        astr("alphabet.decode", letter);
        const i4 = indexes.get(letter);
        if (i4 === void 0)
          throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
        return i4;
      });
    }
  };
}
// @__NO_SIDE_EFFECTS__
function join(separator = "") {
  astr("join", separator);
  return {
    encode: (from8) => {
      astrArr("join.decode", from8);
      return from8.join(separator);
    },
    decode: (to4) => {
      astr("join.decode", to4);
      return to4.split(separator);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function padding(bits, chr = "=") {
  anumber2(bits);
  astr("padding", chr);
  return {
    encode(data) {
      astrArr("padding.encode", data);
      while (data.length * bits % 8)
        data.push(chr);
      return data;
    },
    decode(input) {
      astrArr("padding.decode", input);
      let end = input.length;
      if (end * bits % 8)
        throw new Error("padding: invalid, string should have whole number of bytes");
      for (; end > 0 && input[end - 1] === chr; end--) {
        const last = end - 1;
        const byte = last * bits;
        if (byte % 8 === 0)
          throw new Error("padding: invalid, string has too much padding");
      }
      return input.slice(0, end);
    }
  };
}
var gcd = (a4, b5) => b5 === 0 ? a4 : gcd(b5, a4 % b5);
var radix2carry = /* @__NO_SIDE_EFFECTS__ */ (from8, to4) => from8 + (to4 - gcd(from8, to4));
var powers = /* @__PURE__ */ (() => {
  let res = [];
  for (let i4 = 0; i4 < 40; i4++)
    res.push(2 ** i4);
  return res;
})();
function convertRadix2(data, from8, to4, padding2) {
  aArr(data);
  if (from8 <= 0 || from8 > 32)
    throw new Error(`convertRadix2: wrong from=${from8}`);
  if (to4 <= 0 || to4 > 32)
    throw new Error(`convertRadix2: wrong to=${to4}`);
  if (/* @__PURE__ */ radix2carry(from8, to4) > 32) {
    throw new Error(`convertRadix2: carry overflow from=${from8} to=${to4} carryBits=${/* @__PURE__ */ radix2carry(from8, to4)}`);
  }
  let carry = 0;
  let pos = 0;
  const max = powers[from8];
  const mask = powers[to4] - 1;
  const res = [];
  for (const n5 of data) {
    anumber2(n5);
    if (n5 >= max)
      throw new Error(`convertRadix2: invalid data word=${n5} from=${from8}`);
    carry = carry << from8 | n5;
    if (pos + from8 > 32)
      throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from8}`);
    pos += from8;
    for (; pos >= to4; pos -= to4)
      res.push((carry >> pos - to4 & mask) >>> 0);
    const pow = powers[pos];
    if (pow === void 0)
      throw new Error("invalid carry");
    carry &= pow - 1;
  }
  carry = carry << to4 - pos & mask;
  if (!padding2 && pos >= from8)
    throw new Error("Excess padding");
  if (!padding2 && carry > 0)
    throw new Error(`Non-zero padding: ${carry}`);
  if (padding2 && pos > 0)
    res.push(carry >>> 0);
  return res;
}
// @__NO_SIDE_EFFECTS__
function radix2(bits, revPadding = false) {
  anumber2(bits);
  if (bits <= 0 || bits > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (/* @__PURE__ */ radix2carry(8, bits) > 32 || /* @__PURE__ */ radix2carry(bits, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (bytes) => {
      if (!isBytes3(bytes))
        throw new Error("radix2.encode input should be Uint8Array");
      return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
    },
    decode: (digits) => {
      anumArr("radix2.decode", digits);
      return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
    }
  };
}
var base32 = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(5), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), /* @__PURE__ */ padding(5), /* @__PURE__ */ join(""));

// node_modules/ox/_esm/core/Secp256k1.js
var Secp256k1_exports = {};
__export(Secp256k1_exports, {
  createKeyPair: () => createKeyPair,
  getPublicKey: () => getPublicKey,
  getSharedSecret: () => getSharedSecret,
  noble: () => noble,
  randomPrivateKey: () => randomPrivateKey,
  recoverAddress: () => recoverAddress,
  recoverPublicKey: () => recoverPublicKey,
  sign: () => sign,
  verify: () => verify
});

// node_modules/ox/_esm/core/internal/entropy.js
var extraEntropy = false;

// node_modules/ox/_esm/core/Secp256k1.js
var noble = secp256k1;
function createKeyPair(options = {}) {
  const { as: as2 = "Hex" } = options;
  const privateKey = randomPrivateKey({ as: as2 });
  const publicKey = getPublicKey({ privateKey });
  return {
    privateKey,
    publicKey
  };
}
function getPublicKey(options) {
  const { privateKey } = options;
  const point = secp256k1.ProjectivePoint.fromPrivateKey(from(privateKey).slice(2));
  return from3(point);
}
function getSharedSecret(options) {
  const { as: as2 = "Hex", privateKey, publicKey } = options;
  const point = secp256k1.ProjectivePoint.fromHex(toHex(publicKey).slice(2));
  const sharedPoint = point.multiply(secp256k1.utils.normPrivateKeyToScalar(from(privateKey).slice(2)));
  const sharedSecret = sharedPoint.toRawBytes(true);
  if (as2 === "Hex")
    return fromBytes(sharedSecret);
  return sharedSecret;
}
function randomPrivateKey(options = {}) {
  const { as: as2 = "Hex" } = options;
  const bytes = secp256k1.utils.randomPrivateKey();
  if (as2 === "Hex")
    return fromBytes(bytes);
  return bytes;
}
function recoverAddress(options) {
  return fromPublicKey(recoverPublicKey(options));
}
function recoverPublicKey(options) {
  const { payload, signature } = options;
  const { r: r3, s: s3, yParity } = signature;
  const signature_ = new secp256k1.Signature(BigInt(r3), BigInt(s3)).addRecoveryBit(yParity);
  const point = signature_.recoverPublicKey(from(payload).substring(2));
  return from3(point);
}
function sign(options) {
  const { extraEntropy: extraEntropy2 = extraEntropy, hash, payload, privateKey } = options;
  const { r: r3, s: s3, recovery } = secp256k1.sign(from2(payload), from2(privateKey), {
    extraEntropy: typeof extraEntropy2 === "boolean" ? extraEntropy2 : from(extraEntropy2).slice(2),
    lowS: true,
    ...hash ? { prehash: true } : {}
  });
  return {
    r: r3,
    s: s3,
    yParity: recovery
  };
}
function verify(options) {
  const { address, hash, payload, publicKey, signature } = options;
  if (address)
    return isEqual(address, recoverAddress({ payload, signature }));
  return secp256k1.verify(signature, from2(payload), toBytes2(publicKey), ...hash ? [{ prehash: true, lowS: true }] : []);
}

// node_modules/base-x/src/esm/index.js
function base(ALPHABET2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  const BASE_MAP = new Uint8Array(256);
  for (let j6 = 0; j6 < BASE_MAP.length; j6++) {
    BASE_MAP[j6] = 255;
  }
  for (let i4 = 0; i4 < ALPHABET2.length; i4++) {
    const x5 = ALPHABET2.charAt(i4);
    const xc2 = x5.charCodeAt(0);
    if (BASE_MAP[xc2] !== 255) {
      throw new TypeError(x5 + " is ambiguous");
    }
    BASE_MAP[xc2] = i4;
  }
  const BASE = ALPHABET2.length;
  const LEADER = ALPHABET2.charAt(0);
  const FACTOR = Math.log(BASE) / Math.log(256);
  const iFACTOR = Math.log(256) / Math.log(BASE);
  function encode6(source) {
    if (source instanceof Uint8Array) {
    } else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    let zeroes = 0;
    let length2 = 0;
    let pbegin = 0;
    const pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    const size3 = (pend - pbegin) * iFACTOR + 1 >>> 0;
    const b58 = new Uint8Array(size3);
    while (pbegin !== pend) {
      let carry = source[pbegin];
      let i4 = 0;
      for (let it1 = size3 - 1; (carry !== 0 || i4 < length2) && it1 !== -1; it1--, i4++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i4;
      pbegin++;
    }
    let it22 = size3 - length2;
    while (it22 !== size3 && b58[it22] === 0) {
      it22++;
    }
    let str = LEADER.repeat(zeroes);
    for (; it22 < size3; ++it22) {
      str += ALPHABET2.charAt(b58[it22]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    let psz = 0;
    let zeroes = 0;
    let length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    const size3 = (source.length - psz) * FACTOR + 1 >>> 0;
    const b256 = new Uint8Array(size3);
    while (psz < source.length) {
      const charCode = source.charCodeAt(psz);
      if (charCode > 255) {
        return;
      }
      let carry = BASE_MAP[charCode];
      if (carry === 255) {
        return;
      }
      let i4 = 0;
      for (let it3 = size3 - 1; (carry !== 0 || i4 < length2) && it3 !== -1; it3--, i4++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i4;
      psz++;
    }
    let it4 = size3 - length2;
    while (it4 !== size3 && b256[it4] === 0) {
      it4++;
    }
    const vch = new Uint8Array(zeroes + (size3 - it4));
    let j6 = zeroes;
    while (it4 !== size3) {
      vch[j6++] = b256[it4++];
    }
    return vch;
  }
  function decode7(string2) {
    const buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error("Non-base" + BASE + " character");
  }
  return {
    encode: encode6,
    decodeUnsafe,
    decode: decode7
  };
}
var esm_default = base;

// node_modules/bs58/src/esm/index.js
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var esm_default2 = esm_default(ALPHABET);

// node_modules/@msgpack/msgpack/dist.esm/utils/utf8.mjs
function utf8Count(str) {
  const strLength = str.length;
  let byteLength = 0;
  let pos = 0;
  while (pos < strLength) {
    let value = str.charCodeAt(pos++);
    if ((value & 4294967168) === 0) {
      byteLength++;
      continue;
    } else if ((value & 4294965248) === 0) {
      byteLength += 2;
    } else {
      if (value >= 55296 && value <= 56319) {
        if (pos < strLength) {
          const extra = str.charCodeAt(pos);
          if ((extra & 64512) === 56320) {
            ++pos;
            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
          }
        }
      }
      if ((value & 4294901760) === 0) {
        byteLength += 3;
      } else {
        byteLength += 4;
      }
    }
  }
  return byteLength;
}
function utf8EncodeJs(str, output, outputOffset) {
  const strLength = str.length;
  let offset = outputOffset;
  let pos = 0;
  while (pos < strLength) {
    let value = str.charCodeAt(pos++);
    if ((value & 4294967168) === 0) {
      output[offset++] = value;
      continue;
    } else if ((value & 4294965248) === 0) {
      output[offset++] = value >> 6 & 31 | 192;
    } else {
      if (value >= 55296 && value <= 56319) {
        if (pos < strLength) {
          const extra = str.charCodeAt(pos);
          if ((extra & 64512) === 56320) {
            ++pos;
            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
          }
        }
      }
      if ((value & 4294901760) === 0) {
        output[offset++] = value >> 12 & 15 | 224;
        output[offset++] = value >> 6 & 63 | 128;
      } else {
        output[offset++] = value >> 18 & 7 | 240;
        output[offset++] = value >> 12 & 63 | 128;
        output[offset++] = value >> 6 & 63 | 128;
      }
    }
    output[offset++] = value & 63 | 128;
  }
}
var sharedTextEncoder = new TextEncoder();
var TEXT_ENCODER_THRESHOLD = 50;
function utf8EncodeTE(str, output, outputOffset) {
  sharedTextEncoder.encodeInto(str, output.subarray(outputOffset));
}
function utf8Encode(str, output, outputOffset) {
  if (str.length > TEXT_ENCODER_THRESHOLD) {
    utf8EncodeTE(str, output, outputOffset);
  } else {
    utf8EncodeJs(str, output, outputOffset);
  }
}
var CHUNK_SIZE = 4096;
function utf8DecodeJs(bytes, inputOffset, byteLength) {
  let offset = inputOffset;
  const end = offset + byteLength;
  const units = [];
  let result = "";
  while (offset < end) {
    const byte1 = bytes[offset++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      const byte4 = bytes[offset++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= CHUNK_SIZE) {
      result += String.fromCharCode(...units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += String.fromCharCode(...units);
  }
  return result;
}
var sharedTextDecoder = new TextDecoder();
var TEXT_DECODER_THRESHOLD = 200;
function utf8DecodeTD(bytes, inputOffset, byteLength) {
  const stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
  return sharedTextDecoder.decode(stringBytes);
}
function utf8Decode(bytes, inputOffset, byteLength) {
  if (byteLength > TEXT_DECODER_THRESHOLD) {
    return utf8DecodeTD(bytes, inputOffset, byteLength);
  } else {
    return utf8DecodeJs(bytes, inputOffset, byteLength);
  }
}

// node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
var ExtData = class {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/DecodeError.mjs
var DecodeError = class _DecodeError extends Error {
  constructor(message) {
    super(message);
    const proto = Object.create(_DecodeError.prototype);
    Object.setPrototypeOf(this, proto);
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: _DecodeError.name
    });
  }
};

// node_modules/@msgpack/msgpack/dist.esm/utils/int.mjs
var UINT32_MAX = 4294967295;
function setUint64(view, offset, value) {
  const high = value / 4294967296;
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function setInt64(view, offset, value) {
  const high = Math.floor(value / 4294967296);
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function getInt64(view, offset) {
  const high = view.getInt32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}
function getUint64(view, offset) {
  const high = view.getUint32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}

// node_modules/@msgpack/msgpack/dist.esm/timestamp.mjs
var EXT_TIMESTAMP = -1;
var TIMESTAMP32_MAX_SEC = 4294967296 - 1;
var TIMESTAMP64_MAX_SEC = 17179869184 - 1;
function encodeTimeSpecToTimestamp({ sec, nsec }) {
  if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
    if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
      const rv = new Uint8Array(4);
      const view = new DataView(rv.buffer);
      view.setUint32(0, sec);
      return rv;
    } else {
      const secHigh = sec / 4294967296;
      const secLow = sec & 4294967295;
      const rv = new Uint8Array(8);
      const view = new DataView(rv.buffer);
      view.setUint32(0, nsec << 2 | secHigh & 3);
      view.setUint32(4, secLow);
      return rv;
    }
  } else {
    const rv = new Uint8Array(12);
    const view = new DataView(rv.buffer);
    view.setUint32(0, nsec);
    setInt64(view, 4, sec);
    return rv;
  }
}
function encodeDateToTimeSpec(date) {
  const msec = date.getTime();
  const sec = Math.floor(msec / 1e3);
  const nsec = (msec - sec * 1e3) * 1e6;
  const nsecInSec = Math.floor(nsec / 1e9);
  return {
    sec: sec + nsecInSec,
    nsec: nsec - nsecInSec * 1e9
  };
}
function encodeTimestampExtension(object) {
  if (object instanceof Date) {
    const timeSpec = encodeDateToTimeSpec(object);
    return encodeTimeSpecToTimestamp(timeSpec);
  } else {
    return null;
  }
}
function decodeTimestampToTimeSpec(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  switch (data.byteLength) {
    case 4: {
      const sec = view.getUint32(0);
      const nsec = 0;
      return { sec, nsec };
    }
    case 8: {
      const nsec30AndSecHigh2 = view.getUint32(0);
      const secLow32 = view.getUint32(4);
      const sec = (nsec30AndSecHigh2 & 3) * 4294967296 + secLow32;
      const nsec = nsec30AndSecHigh2 >>> 2;
      return { sec, nsec };
    }
    case 12: {
      const sec = getInt64(view, 4);
      const nsec = view.getUint32(0);
      return { sec, nsec };
    }
    default:
      throw new DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${data.length}`);
  }
}
function decodeTimestampExtension(data) {
  const timeSpec = decodeTimestampToTimeSpec(data);
  return new Date(timeSpec.sec * 1e3 + timeSpec.nsec / 1e6);
}
var timestampExtension = {
  type: EXT_TIMESTAMP,
  encode: encodeTimestampExtension,
  decode: decodeTimestampExtension
};

// node_modules/@msgpack/msgpack/dist.esm/ExtensionCodec.mjs
var ExtensionCodec = class {
  constructor() {
    this.builtInEncoders = [];
    this.builtInDecoders = [];
    this.encoders = [];
    this.decoders = [];
    this.register(timestampExtension);
  }
  register({ type, encode: encode6, decode: decode7 }) {
    if (type >= 0) {
      this.encoders[type] = encode6;
      this.decoders[type] = decode7;
    } else {
      const index = -1 - type;
      this.builtInEncoders[index] = encode6;
      this.builtInDecoders[index] = decode7;
    }
  }
  tryToEncode(object, context) {
    for (let i4 = 0; i4 < this.builtInEncoders.length; i4++) {
      const encodeExt = this.builtInEncoders[i4];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = -1 - i4;
          return new ExtData(type, data);
        }
      }
    }
    for (let i4 = 0; i4 < this.encoders.length; i4++) {
      const encodeExt = this.encoders[i4];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = i4;
          return new ExtData(type, data);
        }
      }
    }
    if (object instanceof ExtData) {
      return object;
    }
    return null;
  }
  decode(data, type, context) {
    const decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
    if (decodeExt) {
      return decodeExt(data, type, context);
    } else {
      return new ExtData(type, data);
    }
  }
};
ExtensionCodec.defaultCodec = new ExtensionCodec();

// node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function isArrayBufferLike(buffer) {
  return buffer instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && buffer instanceof SharedArrayBuffer;
}
function ensureUint8Array(buffer) {
  if (buffer instanceof Uint8Array) {
    return buffer;
  } else if (ArrayBuffer.isView(buffer)) {
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else if (isArrayBufferLike(buffer)) {
    return new Uint8Array(buffer);
  } else {
    return Uint8Array.from(buffer);
  }
}

// node_modules/@msgpack/msgpack/dist.esm/Encoder.mjs
var DEFAULT_MAX_DEPTH = 100;
var DEFAULT_INITIAL_BUFFER_SIZE = 2048;
var Encoder = class _Encoder {
  constructor(options) {
    this.entered = false;
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.maxDepth = options?.maxDepth ?? DEFAULT_MAX_DEPTH;
    this.initialBufferSize = options?.initialBufferSize ?? DEFAULT_INITIAL_BUFFER_SIZE;
    this.sortKeys = options?.sortKeys ?? false;
    this.forceFloat32 = options?.forceFloat32 ?? false;
    this.ignoreUndefined = options?.ignoreUndefined ?? false;
    this.forceIntegerToFloat = options?.forceIntegerToFloat ?? false;
    this.pos = 0;
    this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
    this.bytes = new Uint8Array(this.view.buffer);
  }
  clone() {
    return new _Encoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      maxDepth: this.maxDepth,
      initialBufferSize: this.initialBufferSize,
      sortKeys: this.sortKeys,
      forceFloat32: this.forceFloat32,
      ignoreUndefined: this.ignoreUndefined,
      forceIntegerToFloat: this.forceIntegerToFloat
    });
  }
  reinitializeState() {
    this.pos = 0;
  }
  /**
   * This is almost equivalent to {@link Encoder#encode}, but it returns an reference of the encoder's internal buffer and thus much faster than {@link Encoder#encode}.
   *
   * @returns Encodes the object and returns a shared reference the encoder's internal buffer.
   */
  encodeSharedRef(object) {
    if (this.entered) {
      const instance = this.clone();
      return instance.encodeSharedRef(object);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.subarray(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  /**
   * @returns Encodes the object and returns a copy of the encoder's internal buffer.
   */
  encode(object) {
    if (this.entered) {
      const instance = this.clone();
      return instance.encode(object);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.slice(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  doEncode(object, depth) {
    if (depth > this.maxDepth) {
      throw new Error(`Too deep objects in depth ${depth}`);
    }
    if (object == null) {
      this.encodeNil();
    } else if (typeof object === "boolean") {
      this.encodeBoolean(object);
    } else if (typeof object === "number") {
      if (!this.forceIntegerToFloat) {
        this.encodeNumber(object);
      } else {
        this.encodeNumberAsFloat(object);
      }
    } else if (typeof object === "string") {
      this.encodeString(object);
    } else if (this.useBigInt64 && typeof object === "bigint") {
      this.encodeBigInt64(object);
    } else {
      this.encodeObject(object, depth);
    }
  }
  ensureBufferSizeToWrite(sizeToWrite) {
    const requiredSize = this.pos + sizeToWrite;
    if (this.view.byteLength < requiredSize) {
      this.resizeBuffer(requiredSize * 2);
    }
  }
  resizeBuffer(newSize) {
    const newBuffer = new ArrayBuffer(newSize);
    const newBytes = new Uint8Array(newBuffer);
    const newView = new DataView(newBuffer);
    newBytes.set(this.bytes);
    this.view = newView;
    this.bytes = newBytes;
  }
  encodeNil() {
    this.writeU8(192);
  }
  encodeBoolean(object) {
    if (object === false) {
      this.writeU8(194);
    } else {
      this.writeU8(195);
    }
  }
  encodeNumber(object) {
    if (!this.forceIntegerToFloat && Number.isSafeInteger(object)) {
      if (object >= 0) {
        if (object < 128) {
          this.writeU8(object);
        } else if (object < 256) {
          this.writeU8(204);
          this.writeU8(object);
        } else if (object < 65536) {
          this.writeU8(205);
          this.writeU16(object);
        } else if (object < 4294967296) {
          this.writeU8(206);
          this.writeU32(object);
        } else if (!this.useBigInt64) {
          this.writeU8(207);
          this.writeU64(object);
        } else {
          this.encodeNumberAsFloat(object);
        }
      } else {
        if (object >= -32) {
          this.writeU8(224 | object + 32);
        } else if (object >= -128) {
          this.writeU8(208);
          this.writeI8(object);
        } else if (object >= -32768) {
          this.writeU8(209);
          this.writeI16(object);
        } else if (object >= -2147483648) {
          this.writeU8(210);
          this.writeI32(object);
        } else if (!this.useBigInt64) {
          this.writeU8(211);
          this.writeI64(object);
        } else {
          this.encodeNumberAsFloat(object);
        }
      }
    } else {
      this.encodeNumberAsFloat(object);
    }
  }
  encodeNumberAsFloat(object) {
    if (this.forceFloat32) {
      this.writeU8(202);
      this.writeF32(object);
    } else {
      this.writeU8(203);
      this.writeF64(object);
    }
  }
  encodeBigInt64(object) {
    if (object >= BigInt(0)) {
      this.writeU8(207);
      this.writeBigUint64(object);
    } else {
      this.writeU8(211);
      this.writeBigInt64(object);
    }
  }
  writeStringHeader(byteLength) {
    if (byteLength < 32) {
      this.writeU8(160 + byteLength);
    } else if (byteLength < 256) {
      this.writeU8(217);
      this.writeU8(byteLength);
    } else if (byteLength < 65536) {
      this.writeU8(218);
      this.writeU16(byteLength);
    } else if (byteLength < 4294967296) {
      this.writeU8(219);
      this.writeU32(byteLength);
    } else {
      throw new Error(`Too long string: ${byteLength} bytes in UTF-8`);
    }
  }
  encodeString(object) {
    const maxHeaderSize = 1 + 4;
    const byteLength = utf8Count(object);
    this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
    this.writeStringHeader(byteLength);
    utf8Encode(object, this.bytes, this.pos);
    this.pos += byteLength;
  }
  encodeObject(object, depth) {
    const ext = this.extensionCodec.tryToEncode(object, this.context);
    if (ext != null) {
      this.encodeExtension(ext);
    } else if (Array.isArray(object)) {
      this.encodeArray(object, depth);
    } else if (ArrayBuffer.isView(object)) {
      this.encodeBinary(object);
    } else if (typeof object === "object") {
      this.encodeMap(object, depth);
    } else {
      throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(object)}`);
    }
  }
  encodeBinary(object) {
    const size3 = object.byteLength;
    if (size3 < 256) {
      this.writeU8(196);
      this.writeU8(size3);
    } else if (size3 < 65536) {
      this.writeU8(197);
      this.writeU16(size3);
    } else if (size3 < 4294967296) {
      this.writeU8(198);
      this.writeU32(size3);
    } else {
      throw new Error(`Too large binary: ${size3}`);
    }
    const bytes = ensureUint8Array(object);
    this.writeU8a(bytes);
  }
  encodeArray(object, depth) {
    const size3 = object.length;
    if (size3 < 16) {
      this.writeU8(144 + size3);
    } else if (size3 < 65536) {
      this.writeU8(220);
      this.writeU16(size3);
    } else if (size3 < 4294967296) {
      this.writeU8(221);
      this.writeU32(size3);
    } else {
      throw new Error(`Too large array: ${size3}`);
    }
    for (const item of object) {
      this.doEncode(item, depth + 1);
    }
  }
  countWithoutUndefined(object, keys2) {
    let count = 0;
    for (const key of keys2) {
      if (object[key] !== void 0) {
        count++;
      }
    }
    return count;
  }
  encodeMap(object, depth) {
    const keys2 = Object.keys(object);
    if (this.sortKeys) {
      keys2.sort();
    }
    const size3 = this.ignoreUndefined ? this.countWithoutUndefined(object, keys2) : keys2.length;
    if (size3 < 16) {
      this.writeU8(128 + size3);
    } else if (size3 < 65536) {
      this.writeU8(222);
      this.writeU16(size3);
    } else if (size3 < 4294967296) {
      this.writeU8(223);
      this.writeU32(size3);
    } else {
      throw new Error(`Too large map object: ${size3}`);
    }
    for (const key of keys2) {
      const value = object[key];
      if (!(this.ignoreUndefined && value === void 0)) {
        this.encodeString(key);
        this.doEncode(value, depth + 1);
      }
    }
  }
  encodeExtension(ext) {
    if (typeof ext.data === "function") {
      const data = ext.data(this.pos + 6);
      const size4 = data.length;
      if (size4 >= 4294967296) {
        throw new Error(`Too large extension object: ${size4}`);
      }
      this.writeU8(201);
      this.writeU32(size4);
      this.writeI8(ext.type);
      this.writeU8a(data);
      return;
    }
    const size3 = ext.data.length;
    if (size3 === 1) {
      this.writeU8(212);
    } else if (size3 === 2) {
      this.writeU8(213);
    } else if (size3 === 4) {
      this.writeU8(214);
    } else if (size3 === 8) {
      this.writeU8(215);
    } else if (size3 === 16) {
      this.writeU8(216);
    } else if (size3 < 256) {
      this.writeU8(199);
      this.writeU8(size3);
    } else if (size3 < 65536) {
      this.writeU8(200);
      this.writeU16(size3);
    } else if (size3 < 4294967296) {
      this.writeU8(201);
      this.writeU32(size3);
    } else {
      throw new Error(`Too large extension object: ${size3}`);
    }
    this.writeI8(ext.type);
    this.writeU8a(ext.data);
  }
  writeU8(value) {
    this.ensureBufferSizeToWrite(1);
    this.view.setUint8(this.pos, value);
    this.pos++;
  }
  writeU8a(values) {
    const size3 = values.length;
    this.ensureBufferSizeToWrite(size3);
    this.bytes.set(values, this.pos);
    this.pos += size3;
  }
  writeI8(value) {
    this.ensureBufferSizeToWrite(1);
    this.view.setInt8(this.pos, value);
    this.pos++;
  }
  writeU16(value) {
    this.ensureBufferSizeToWrite(2);
    this.view.setUint16(this.pos, value);
    this.pos += 2;
  }
  writeI16(value) {
    this.ensureBufferSizeToWrite(2);
    this.view.setInt16(this.pos, value);
    this.pos += 2;
  }
  writeU32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setUint32(this.pos, value);
    this.pos += 4;
  }
  writeI32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setInt32(this.pos, value);
    this.pos += 4;
  }
  writeF32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setFloat32(this.pos, value);
    this.pos += 4;
  }
  writeF64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setFloat64(this.pos, value);
    this.pos += 8;
  }
  writeU64(value) {
    this.ensureBufferSizeToWrite(8);
    setUint64(this.view, this.pos, value);
    this.pos += 8;
  }
  writeI64(value) {
    this.ensureBufferSizeToWrite(8);
    setInt64(this.view, this.pos, value);
    this.pos += 8;
  }
  writeBigUint64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setBigUint64(this.pos, value);
    this.pos += 8;
  }
  writeBigInt64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setBigInt64(this.pos, value);
    this.pos += 8;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/encode.mjs
function encode(value, options) {
  const encoder2 = new Encoder(options);
  return encoder2.encodeSharedRef(value);
}

// node_modules/@msgpack/msgpack/dist.esm/utils/prettyByte.mjs
function prettyByte(byte) {
  return `${byte < 0 ? "-" : ""}0x${Math.abs(byte).toString(16).padStart(2, "0")}`;
}

// node_modules/@msgpack/msgpack/dist.esm/CachedKeyDecoder.mjs
var DEFAULT_MAX_KEY_LENGTH = 16;
var DEFAULT_MAX_LENGTH_PER_KEY = 16;
var CachedKeyDecoder = class {
  constructor(maxKeyLength = DEFAULT_MAX_KEY_LENGTH, maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY) {
    this.hit = 0;
    this.miss = 0;
    this.maxKeyLength = maxKeyLength;
    this.maxLengthPerKey = maxLengthPerKey;
    this.caches = [];
    for (let i4 = 0; i4 < this.maxKeyLength; i4++) {
      this.caches.push([]);
    }
  }
  canBeCached(byteLength) {
    return byteLength > 0 && byteLength <= this.maxKeyLength;
  }
  find(bytes, inputOffset, byteLength) {
    const records = this.caches[byteLength - 1];
    FIND_CHUNK: for (const record of records) {
      const recordBytes = record.bytes;
      for (let j6 = 0; j6 < byteLength; j6++) {
        if (recordBytes[j6] !== bytes[inputOffset + j6]) {
          continue FIND_CHUNK;
        }
      }
      return record.str;
    }
    return null;
  }
  store(bytes, value) {
    const records = this.caches[bytes.length - 1];
    const record = { bytes, str: value };
    if (records.length >= this.maxLengthPerKey) {
      records[Math.random() * records.length | 0] = record;
    } else {
      records.push(record);
    }
  }
  decode(bytes, inputOffset, byteLength) {
    const cachedValue = this.find(bytes, inputOffset, byteLength);
    if (cachedValue != null) {
      this.hit++;
      return cachedValue;
    }
    this.miss++;
    const str = utf8DecodeJs(bytes, inputOffset, byteLength);
    const slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
    this.store(slicedCopyOfBytes, str);
    return str;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/Decoder.mjs
var STATE_ARRAY = "array";
var STATE_MAP_KEY = "map_key";
var STATE_MAP_VALUE = "map_value";
var mapKeyConverter = (key) => {
  if (typeof key === "string" || typeof key === "number") {
    return key;
  }
  throw new DecodeError("The type of key must be string or number but " + typeof key);
};
var StackPool = class {
  constructor() {
    this.stack = [];
    this.stackHeadPosition = -1;
  }
  get length() {
    return this.stackHeadPosition + 1;
  }
  top() {
    return this.stack[this.stackHeadPosition];
  }
  pushArrayState(size3) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_ARRAY;
    state.position = 0;
    state.size = size3;
    state.array = new Array(size3);
  }
  pushMapState(size3) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_MAP_KEY;
    state.readCount = 0;
    state.size = size3;
    state.map = {};
  }
  getUninitializedStateFromPool() {
    this.stackHeadPosition++;
    if (this.stackHeadPosition === this.stack.length) {
      const partialState = {
        type: void 0,
        size: 0,
        array: void 0,
        position: 0,
        readCount: 0,
        map: void 0,
        key: null
      };
      this.stack.push(partialState);
    }
    return this.stack[this.stackHeadPosition];
  }
  release(state) {
    const topStackState = this.stack[this.stackHeadPosition];
    if (topStackState !== state) {
      throw new Error("Invalid stack state. Released state is not on top of the stack.");
    }
    if (state.type === STATE_ARRAY) {
      const partialState = state;
      partialState.size = 0;
      partialState.array = void 0;
      partialState.position = 0;
      partialState.type = void 0;
    }
    if (state.type === STATE_MAP_KEY || state.type === STATE_MAP_VALUE) {
      const partialState = state;
      partialState.size = 0;
      partialState.map = void 0;
      partialState.readCount = 0;
      partialState.type = void 0;
    }
    this.stackHeadPosition--;
  }
  reset() {
    this.stack.length = 0;
    this.stackHeadPosition = -1;
  }
};
var HEAD_BYTE_REQUIRED = -1;
var EMPTY_VIEW = new DataView(new ArrayBuffer(0));
var EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
try {
  EMPTY_VIEW.getInt8(0);
} catch (e2) {
  if (!(e2 instanceof RangeError)) {
    throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
  }
}
var MORE_DATA = new RangeError("Insufficient data");
var sharedCachedKeyDecoder = new CachedKeyDecoder();
var Decoder = class _Decoder {
  constructor(options) {
    this.totalPos = 0;
    this.pos = 0;
    this.view = EMPTY_VIEW;
    this.bytes = EMPTY_BYTES;
    this.headByte = HEAD_BYTE_REQUIRED;
    this.stack = new StackPool();
    this.entered = false;
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.rawStrings = options?.rawStrings ?? false;
    this.maxStrLength = options?.maxStrLength ?? UINT32_MAX;
    this.maxBinLength = options?.maxBinLength ?? UINT32_MAX;
    this.maxArrayLength = options?.maxArrayLength ?? UINT32_MAX;
    this.maxMapLength = options?.maxMapLength ?? UINT32_MAX;
    this.maxExtLength = options?.maxExtLength ?? UINT32_MAX;
    this.keyDecoder = options?.keyDecoder !== void 0 ? options.keyDecoder : sharedCachedKeyDecoder;
    this.mapKeyConverter = options?.mapKeyConverter ?? mapKeyConverter;
  }
  clone() {
    return new _Decoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      rawStrings: this.rawStrings,
      maxStrLength: this.maxStrLength,
      maxBinLength: this.maxBinLength,
      maxArrayLength: this.maxArrayLength,
      maxMapLength: this.maxMapLength,
      maxExtLength: this.maxExtLength,
      keyDecoder: this.keyDecoder
    });
  }
  reinitializeState() {
    this.totalPos = 0;
    this.headByte = HEAD_BYTE_REQUIRED;
    this.stack.reset();
  }
  setBuffer(buffer) {
    const bytes = ensureUint8Array(buffer);
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    this.pos = 0;
  }
  appendBuffer(buffer) {
    if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
      this.setBuffer(buffer);
    } else {
      const remainingData = this.bytes.subarray(this.pos);
      const newData = ensureUint8Array(buffer);
      const newBuffer = new Uint8Array(remainingData.length + newData.length);
      newBuffer.set(remainingData);
      newBuffer.set(newData, remainingData.length);
      this.setBuffer(newBuffer);
    }
  }
  hasRemaining(size3) {
    return this.view.byteLength - this.pos >= size3;
  }
  createExtraByteError(posToShow) {
    const { view, pos } = this;
    return new RangeError(`Extra ${view.byteLength - pos} of ${view.byteLength} byte(s) found at buffer[${posToShow}]`);
  }
  /**
   * @throws {@link DecodeError}
   * @throws {@link RangeError}
   */
  decode(buffer) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decode(buffer);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      const object = this.doDecodeSync();
      if (this.hasRemaining(1)) {
        throw this.createExtraByteError(this.pos);
      }
      return object;
    } finally {
      this.entered = false;
    }
  }
  *decodeMulti(buffer) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMulti(buffer);
      return;
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      while (this.hasRemaining(1)) {
        yield this.doDecodeSync();
      }
    } finally {
      this.entered = false;
    }
  }
  async decodeAsync(stream) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decodeAsync(stream);
    }
    try {
      this.entered = true;
      let decoded = false;
      let object;
      for await (const buffer of stream) {
        if (decoded) {
          this.entered = false;
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        try {
          object = this.doDecodeSync();
          decoded = true;
        } catch (e2) {
          if (!(e2 instanceof RangeError)) {
            throw e2;
          }
        }
        this.totalPos += this.pos;
      }
      if (decoded) {
        if (this.hasRemaining(1)) {
          throw this.createExtraByteError(this.totalPos);
        }
        return object;
      }
      const { headByte, pos, totalPos } = this;
      throw new RangeError(`Insufficient data in parsing ${prettyByte(headByte)} at ${totalPos} (${pos} in the current buffer)`);
    } finally {
      this.entered = false;
    }
  }
  decodeArrayStream(stream) {
    return this.decodeMultiAsync(stream, true);
  }
  decodeStream(stream) {
    return this.decodeMultiAsync(stream, false);
  }
  async *decodeMultiAsync(stream, isArray) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMultiAsync(stream, isArray);
      return;
    }
    try {
      this.entered = true;
      let isArrayHeaderRequired = isArray;
      let arrayItemsLeft = -1;
      for await (const buffer of stream) {
        if (isArray && arrayItemsLeft === 0) {
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        if (isArrayHeaderRequired) {
          arrayItemsLeft = this.readArraySize();
          isArrayHeaderRequired = false;
          this.complete();
        }
        try {
          while (true) {
            yield this.doDecodeSync();
            if (--arrayItemsLeft === 0) {
              break;
            }
          }
        } catch (e2) {
          if (!(e2 instanceof RangeError)) {
            throw e2;
          }
        }
        this.totalPos += this.pos;
      }
    } finally {
      this.entered = false;
    }
  }
  doDecodeSync() {
    DECODE: while (true) {
      const headByte = this.readHeadByte();
      let object;
      if (headByte >= 224) {
        object = headByte - 256;
      } else if (headByte < 192) {
        if (headByte < 128) {
          object = headByte;
        } else if (headByte < 144) {
          const size3 = headByte - 128;
          if (size3 !== 0) {
            this.pushMapState(size3);
            this.complete();
            continue DECODE;
          } else {
            object = {};
          }
        } else if (headByte < 160) {
          const size3 = headByte - 144;
          if (size3 !== 0) {
            this.pushArrayState(size3);
            this.complete();
            continue DECODE;
          } else {
            object = [];
          }
        } else {
          const byteLength = headByte - 160;
          object = this.decodeString(byteLength, 0);
        }
      } else if (headByte === 192) {
        object = null;
      } else if (headByte === 194) {
        object = false;
      } else if (headByte === 195) {
        object = true;
      } else if (headByte === 202) {
        object = this.readF32();
      } else if (headByte === 203) {
        object = this.readF64();
      } else if (headByte === 204) {
        object = this.readU8();
      } else if (headByte === 205) {
        object = this.readU16();
      } else if (headByte === 206) {
        object = this.readU32();
      } else if (headByte === 207) {
        if (this.useBigInt64) {
          object = this.readU64AsBigInt();
        } else {
          object = this.readU64();
        }
      } else if (headByte === 208) {
        object = this.readI8();
      } else if (headByte === 209) {
        object = this.readI16();
      } else if (headByte === 210) {
        object = this.readI32();
      } else if (headByte === 211) {
        if (this.useBigInt64) {
          object = this.readI64AsBigInt();
        } else {
          object = this.readI64();
        }
      } else if (headByte === 217) {
        const byteLength = this.lookU8();
        object = this.decodeString(byteLength, 1);
      } else if (headByte === 218) {
        const byteLength = this.lookU16();
        object = this.decodeString(byteLength, 2);
      } else if (headByte === 219) {
        const byteLength = this.lookU32();
        object = this.decodeString(byteLength, 4);
      } else if (headByte === 220) {
        const size3 = this.readU16();
        if (size3 !== 0) {
          this.pushArrayState(size3);
          this.complete();
          continue DECODE;
        } else {
          object = [];
        }
      } else if (headByte === 221) {
        const size3 = this.readU32();
        if (size3 !== 0) {
          this.pushArrayState(size3);
          this.complete();
          continue DECODE;
        } else {
          object = [];
        }
      } else if (headByte === 222) {
        const size3 = this.readU16();
        if (size3 !== 0) {
          this.pushMapState(size3);
          this.complete();
          continue DECODE;
        } else {
          object = {};
        }
      } else if (headByte === 223) {
        const size3 = this.readU32();
        if (size3 !== 0) {
          this.pushMapState(size3);
          this.complete();
          continue DECODE;
        } else {
          object = {};
        }
      } else if (headByte === 196) {
        const size3 = this.lookU8();
        object = this.decodeBinary(size3, 1);
      } else if (headByte === 197) {
        const size3 = this.lookU16();
        object = this.decodeBinary(size3, 2);
      } else if (headByte === 198) {
        const size3 = this.lookU32();
        object = this.decodeBinary(size3, 4);
      } else if (headByte === 212) {
        object = this.decodeExtension(1, 0);
      } else if (headByte === 213) {
        object = this.decodeExtension(2, 0);
      } else if (headByte === 214) {
        object = this.decodeExtension(4, 0);
      } else if (headByte === 215) {
        object = this.decodeExtension(8, 0);
      } else if (headByte === 216) {
        object = this.decodeExtension(16, 0);
      } else if (headByte === 199) {
        const size3 = this.lookU8();
        object = this.decodeExtension(size3, 1);
      } else if (headByte === 200) {
        const size3 = this.lookU16();
        object = this.decodeExtension(size3, 2);
      } else if (headByte === 201) {
        const size3 = this.lookU32();
        object = this.decodeExtension(size3, 4);
      } else {
        throw new DecodeError(`Unrecognized type byte: ${prettyByte(headByte)}`);
      }
      this.complete();
      const stack = this.stack;
      while (stack.length > 0) {
        const state = stack.top();
        if (state.type === STATE_ARRAY) {
          state.array[state.position] = object;
          state.position++;
          if (state.position === state.size) {
            object = state.array;
            stack.release(state);
          } else {
            continue DECODE;
          }
        } else if (state.type === STATE_MAP_KEY) {
          if (object === "__proto__") {
            throw new DecodeError("The key __proto__ is not allowed");
          }
          state.key = this.mapKeyConverter(object);
          state.type = STATE_MAP_VALUE;
          continue DECODE;
        } else {
          state.map[state.key] = object;
          state.readCount++;
          if (state.readCount === state.size) {
            object = state.map;
            stack.release(state);
          } else {
            state.key = null;
            state.type = STATE_MAP_KEY;
            continue DECODE;
          }
        }
      }
      return object;
    }
  }
  readHeadByte() {
    if (this.headByte === HEAD_BYTE_REQUIRED) {
      this.headByte = this.readU8();
    }
    return this.headByte;
  }
  complete() {
    this.headByte = HEAD_BYTE_REQUIRED;
  }
  readArraySize() {
    const headByte = this.readHeadByte();
    switch (headByte) {
      case 220:
        return this.readU16();
      case 221:
        return this.readU32();
      default: {
        if (headByte < 160) {
          return headByte - 144;
        } else {
          throw new DecodeError(`Unrecognized array type byte: ${prettyByte(headByte)}`);
        }
      }
    }
  }
  pushMapState(size3) {
    if (size3 > this.maxMapLength) {
      throw new DecodeError(`Max length exceeded: map length (${size3}) > maxMapLengthLength (${this.maxMapLength})`);
    }
    this.stack.pushMapState(size3);
  }
  pushArrayState(size3) {
    if (size3 > this.maxArrayLength) {
      throw new DecodeError(`Max length exceeded: array length (${size3}) > maxArrayLength (${this.maxArrayLength})`);
    }
    this.stack.pushArrayState(size3);
  }
  decodeString(byteLength, headerOffset) {
    if (!this.rawStrings || this.stateIsMapKey()) {
      return this.decodeUtf8String(byteLength, headerOffset);
    }
    return this.decodeBinary(byteLength, headerOffset);
  }
  /**
   * @throws {@link RangeError}
   */
  decodeUtf8String(byteLength, headerOffset) {
    if (byteLength > this.maxStrLength) {
      throw new DecodeError(`Max length exceeded: UTF-8 byte length (${byteLength}) > maxStrLength (${this.maxStrLength})`);
    }
    if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
      throw MORE_DATA;
    }
    const offset = this.pos + headerOffset;
    let object;
    if (this.stateIsMapKey() && this.keyDecoder?.canBeCached(byteLength)) {
      object = this.keyDecoder.decode(this.bytes, offset, byteLength);
    } else {
      object = utf8Decode(this.bytes, offset, byteLength);
    }
    this.pos += headerOffset + byteLength;
    return object;
  }
  stateIsMapKey() {
    if (this.stack.length > 0) {
      const state = this.stack.top();
      return state.type === STATE_MAP_KEY;
    }
    return false;
  }
  /**
   * @throws {@link RangeError}
   */
  decodeBinary(byteLength, headOffset) {
    if (byteLength > this.maxBinLength) {
      throw new DecodeError(`Max length exceeded: bin length (${byteLength}) > maxBinLength (${this.maxBinLength})`);
    }
    if (!this.hasRemaining(byteLength + headOffset)) {
      throw MORE_DATA;
    }
    const offset = this.pos + headOffset;
    const object = this.bytes.subarray(offset, offset + byteLength);
    this.pos += headOffset + byteLength;
    return object;
  }
  decodeExtension(size3, headOffset) {
    if (size3 > this.maxExtLength) {
      throw new DecodeError(`Max length exceeded: ext length (${size3}) > maxExtLength (${this.maxExtLength})`);
    }
    const extType = this.view.getInt8(this.pos + headOffset);
    const data = this.decodeBinary(
      size3,
      headOffset + 1
      /* extType */
    );
    return this.extensionCodec.decode(data, extType, this.context);
  }
  lookU8() {
    return this.view.getUint8(this.pos);
  }
  lookU16() {
    return this.view.getUint16(this.pos);
  }
  lookU32() {
    return this.view.getUint32(this.pos);
  }
  readU8() {
    const value = this.view.getUint8(this.pos);
    this.pos++;
    return value;
  }
  readI8() {
    const value = this.view.getInt8(this.pos);
    this.pos++;
    return value;
  }
  readU16() {
    const value = this.view.getUint16(this.pos);
    this.pos += 2;
    return value;
  }
  readI16() {
    const value = this.view.getInt16(this.pos);
    this.pos += 2;
    return value;
  }
  readU32() {
    const value = this.view.getUint32(this.pos);
    this.pos += 4;
    return value;
  }
  readI32() {
    const value = this.view.getInt32(this.pos);
    this.pos += 4;
    return value;
  }
  readU64() {
    const value = getUint64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readI64() {
    const value = getInt64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readU64AsBigInt() {
    const value = this.view.getBigUint64(this.pos);
    this.pos += 8;
    return value;
  }
  readI64AsBigInt() {
    const value = this.view.getBigInt64(this.pos);
    this.pos += 8;
    return value;
  }
  readF32() {
    const value = this.view.getFloat32(this.pos);
    this.pos += 4;
    return value;
  }
  readF64() {
    const value = this.view.getFloat64(this.pos);
    this.pos += 8;
    return value;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/decode.mjs
function decode(buffer, options) {
  const decoder = new Decoder(options);
  return decoder.decode(buffer);
}

// node_modules/uint8arrays/esm/src/util/as-uint8array.js
function asUint8Array(buf) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return buf;
}

// node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe(size3 = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return asUint8Array(globalThis.Buffer.allocUnsafe(size3));
  }
  return new Uint8Array(size3);
}

// node_modules/uint8arrays/esm/src/concat.js
function concat2(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output);
}

// node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});

// node_modules/multiformats/esm/vendor/base-x.js
function base2(ALPHABET2, name2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j6 = 0; j6 < BASE_MAP.length; j6++) {
    BASE_MAP[j6] = 255;
  }
  for (var i4 = 0; i4 < ALPHABET2.length; i4++) {
    var x5 = ALPHABET2.charAt(i4);
    var xc2 = x5.charCodeAt(0);
    if (BASE_MAP[xc2] !== 255) {
      throw new TypeError(x5 + " is ambiguous");
    }
    BASE_MAP[xc2] = i4;
  }
  var BASE = ALPHABET2.length;
  var LEADER = ALPHABET2.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode6(source) {
    if (source instanceof Uint8Array) ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size3 = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size3);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i5 = 0;
      for (var it1 = size3 - 1; (carry !== 0 || i5 < length2) && it1 !== -1; it1--, i5++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i5;
      pbegin++;
    }
    var it22 = size3 - length2;
    while (it22 !== size3 && b58[it22] === 0) {
      it22++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it22 < size3; ++it22) {
      str += ALPHABET2.charAt(b58[it22]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size3 = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size3);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i5 = 0;
      for (var it3 = size3 - 1; (carry !== 0 || i5 < length2) && it3 !== -1; it3--, i5++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i5;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size3 - length2;
    while (it4 !== size3 && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size3 - it4));
    var j7 = zeroes;
    while (it4 !== size3) {
      vch[j7++] = b256[it4++];
    }
    return vch;
  }
  function decode7(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode6,
    decodeUnsafe,
    decode: decode7
  };
}
var src = base2;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa2, bb) => {
  if (aa2 === bb)
    return true;
  if (aa2.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii3 = 0; ii3 < aa2.byteLength; ii3++) {
    if (aa2[ii3] !== bb[ii3]) {
      return false;
    }
  }
  return true;
};
var coerce = (o4) => {
  if (o4 instanceof Uint8Array && o4.constructor.name === "Uint8Array")
    return o4;
  if (o4 instanceof ArrayBuffer)
    return new Uint8Array(o4);
  if (ArrayBuffer.isView(o4)) {
    return new Uint8Array(o4.buffer, o4.byteOffset, o4.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString2 = (str) => new TextEncoder().encode(str);
var toString = (b5) => new TextDecoder().decode(b5);

// node_modules/multiformats/esm/src/bases/base.js
var Encoder2 = class {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder2 = class {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or2(this, decoder);
  }
};
var ComposedDecoder = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    return or2(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or2 = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder2(name2, prefix, baseEncode);
    this.decoder = new Decoder2(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from6 = ({ name: name2, prefix, encode: encode6, decode: decode7 }) => new Codec(name2, prefix, encode6, decode7);
var baseX = ({ prefix, name: name2, alphabet: alphabet3 }) => {
  const { encode: encode6, decode: decode7 } = base_x_default(alphabet3, name2);
  return from6({
    prefix,
    name: name2,
    encode: encode6,
    decode: (text) => coerce(decode7(text))
  });
};
var decode2 = (string2, alphabet3, bitsPerChar, name2) => {
  const codes = {};
  for (let i4 = 0; i4 < alphabet3.length; ++i4) {
    codes[alphabet3[i4]] = i4;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i4 = 0; i4 < end; ++i4) {
    const value = codes[string2[i4]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode2 = (data, alphabet3, bitsPerChar) => {
  const pad3 = alphabet3[alphabet3.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i4 = 0; i4 < data.length; ++i4) {
    buffer = buffer << 8 | data[i4];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet3[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet3[mask & buffer << bitsPerChar - bits];
  }
  if (pad3) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet3 }) => {
  return from6({
    prefix,
    name: name2,
    encode(input) {
      return encode2(input, alphabet3, bitsPerChar);
    },
    decode(input) {
      return decode2(input, alphabet3, bitsPerChar, name2);
    }
  });
};

// node_modules/multiformats/esm/src/bases/identity.js
var identity = from6({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString2(str)
});

// node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base22
});
var base22 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base322,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base322 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet2 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars = alphabet2.reduce((p4, c6, i4) => {
  p4[i4] = c6;
  return p4;
}, []);
var alphabetCharsToBytes = alphabet2.reduce((p4, c6, i4) => {
  p4[c6.codePointAt(0)] = i4;
  return p4;
}, []);
function encode3(data) {
  return data.reduce((p4, c6) => {
    p4 += alphabetBytesToChars[c6];
    return p4;
  }, "");
}
function decode3(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from6({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode3,
  decode: decode3
});

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha2562,
  sha512: () => sha512
});

// node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode4;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode4(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode4.bytes = offset - oldOffset + 1;
  return out;
}
var decode4 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b5, l6 = buf.length;
  do {
    if (counter >= l6) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b5 = buf[counter++];
    res += shift < 28 ? (b5 & REST$1) << shift : (b5 & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b5 >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N22 = Math.pow(2, 14);
var N32 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N22 ? 2 : value < N32 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode4,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/multiformats/esm/src/varint.js
var decode5 = (data, offset = 0) => {
  const code2 = varint_default.decode(data, offset);
  return [
    code2,
    varint_default.decode.bytes
  ];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// node_modules/multiformats/esm/src/hashes/digest.js
var create = (code2, digest2) => {
  const size3 = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size3);
  const bytes = new Uint8Array(digestOffset + size3);
  encodeTo(code2, bytes, 0);
  encodeTo(size3, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code2, size3, digest2, bytes);
};
var decode6 = (multihash) => {
  const bytes = coerce(multihash);
  const [code2, sizeOffset] = decode5(bytes);
  const [size3, digestOffset] = decode5(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size3) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size3, digest2, bytes);
};
var equals2 = (a4, b5) => {
  if (a4 === b5) {
    return true;
  } else {
    return a4.code === b5.code && a4.size === b5.size && equals(a4.bytes, b5.bytes);
  }
};
var Digest = class {
  constructor(code2, size3, digest2, bytes) {
    this.code = code2;
    this.size = size3;
    this.digest = digest2;
    this.bytes = bytes;
  }
};

// node_modules/multiformats/esm/src/hashes/hasher.js
var from7 = ({ name: name2, code: code2, encode: encode6 }) => new Hasher(name2, code2, encode6);
var Hasher = class {
  constructor(name2, code2, encode6) {
    this.name = name2;
    this.code = code2;
    this.encode = encode6;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
var sha2562 = from7({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from7({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode5 = coerce;
var digest = (input) => create(code, encode5(input));
var identity2 = {
  code,
  name,
  encode: encode5,
  digest
};

// node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/multiformats/esm/src/cid.js
var CID = class _CID {
  constructor(version3, code2, multihash, bytes) {
    this.code = code2;
    this.version = version3;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create(code2, digest2);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version3, _baseCache } = this;
    switch (version3) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base322.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof _CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version3, code: code2, multihash, bytes } = value;
      return new _CID(version3, code2, multihash, bytes || encodeCID(version3, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version3, multihash, code: code2 } = value;
      const digest2 = decode6(multihash);
      return _CID.create(version3, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version3, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version3) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version3, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version3, code2, digest2.bytes);
        return new _CID(version3, code2, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return _CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return _CID.create(1, code2, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i4, length2] = decode5(initialBytes.subarray(offset));
      offset += length2;
      return i4;
    };
    let version3 = next();
    let codec = DAG_PB_CODE;
    if (version3 === 18) {
      version3 = 0;
      offset = 0;
    } else if (version3 === 1) {
      codec = next();
    }
    if (version3 !== 0 && version3 !== 1) {
      throw new RangeError(`Invalid CID version ${version3}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size3 = offset + digestSize;
    const multihashSize = size3 - prefixSize;
    return {
      version: version3,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size: size3
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = _CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(source)
      ];
    }
    case base322.prefix: {
      const decoder = base3 || base322;
      return [
        base322.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version3, code2, multihash) => {
  const codeOffset = encodingLength(version3);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version3, bytes, 0);
  encodeTo(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");
var readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
var hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
var version2 = "0.0.0-dev";
var deprecate = (range, message) => {
  if (range.test(version2)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// node_modules/multiformats/esm/src/basics.js
var bases = {
  ...identity_exports,
  ...base2_exports,
  ...base8_exports,
  ...base10_exports,
  ...base16_exports,
  ...base32_exports,
  ...base36_exports,
  ...base58_exports,
  ...base64_exports,
  ...base256emoji_exports
};
var hashes = {
  ...sha2_browser_exports,
  ...identity_exports2
};

// node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode6, decode7) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode6
    },
    decoder: { decode: decode7 }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder2 = new TextEncoder();
  return encoder2.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i4 = 0; i4 < buf.length; i4++) {
    string2 += String.fromCharCode(buf[i4]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i4 = 0; i4 < str.length; i4++) {
    buf[i4] = str.charCodeAt(i4);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/uint8arrays/esm/src/from-string.js
function fromString3(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}

// node_modules/uint8arrays/esm/src/to-string.js
function toString2(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// node_modules/@walletconnect/relay-api/dist/index.es.js
var C2 = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } };

// node_modules/@walletconnect/utils/dist/index.js
var import_blakejs = __toESM(require_blakejs(), 1);
var Ae2 = ":";
function Je2(t) {
  const [e2, n5] = t.split(Ae2);
  return { namespace: e2, reference: n5 };
}
function Se2(t, e2) {
  return t.includes(":") ? [t] : e2.chains || [];
}
var ri = Object.defineProperty;
var oi = Object.defineProperties;
var si = Object.getOwnPropertyDescriptors;
var ar2 = Object.getOwnPropertySymbols;
var ii = Object.prototype.hasOwnProperty;
var ci = Object.prototype.propertyIsEnumerable;
var en2 = (t, e2, n5) => e2 in t ? ri(t, e2, { enumerable: true, configurable: true, writable: true, value: n5 }) : t[e2] = n5;
var ur2 = (t, e2) => {
  for (var n5 in e2 || (e2 = {})) ii.call(e2, n5) && en2(t, n5, e2[n5]);
  if (ar2) for (var n5 of ar2(e2)) ci.call(e2, n5) && en2(t, n5, e2[n5]);
  return t;
};
var fi = (t, e2) => oi(t, si(e2));
var lr2 = (t, e2, n5) => en2(t, typeof e2 != "symbol" ? e2 + "" : e2, n5);
var dr2 = "ReactNative";
var et = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" };
var pr2 = "js";
function rn2() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function It2() {
  return !(0, import_window_getters.getDocument)() && !!(0, import_window_getters.getNavigator)() && navigator.product === dr2;
}
function li() {
  return It2() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function di() {
  return It2() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function Wt2() {
  return !rn2() && !!(0, import_window_getters.getNavigator)() && !!(0, import_window_getters.getDocument)();
}
function Vt2() {
  return It2() ? et.reactNative : rn2() ? et.node : Wt2() ? et.browser : et.unknown;
}
function hi() {
  var t;
  try {
    return It2() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (t = global.Application) == null ? void 0 : t.applicationId : void 0;
  } catch {
    return;
  }
}
function gr2(t, e2) {
  const n5 = new URLSearchParams(t);
  return Object.entries(e2).sort(([r3], [o4]) => r3.localeCompare(o4)).forEach(([r3, o4]) => {
    o4 != null && n5.set(r3, String(o4));
  }), n5.toString();
}
function pi(t) {
  var e2, n5;
  const r3 = br2();
  try {
    return t != null && t.url && r3.url && new URL(t.url).host !== new URL(r3.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${t.url} differs from the actual page url:${r3.url}. This is probably unintended and can lead to issues.`), t.url = r3.url), (e2 = t?.icons) != null && e2.length && t.icons.length > 0 && (t.icons = t.icons.filter((o4) => o4 !== "")), fi(ur2(ur2({}, r3), t), { url: t?.url || r3.url, name: t?.name || r3.name, description: t?.description || r3.description, icons: (n5 = t?.icons) != null && n5.length && t.icons.length > 0 ? t.icons : r3.icons });
  } catch (o4) {
    return console.warn("Error populating app metadata", o4), t || r3;
  }
}
function br2() {
  return (0, import_window_metadata.getWindowMetadata)() || { name: "", description: "", url: "", icons: [""] };
}
function yr2() {
  if (Vt2() === et.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: n5, Version: r3 } = global.Platform;
    return [n5, r3].join("-");
  }
  const t = detect();
  if (t === null) return "unknown";
  const e2 = t.os ? t.os.replace(" ", "").toLowerCase() : "unknown";
  return t.type === "browser" ? [e2, t.name, t.version].join("-") : [e2, t.version].join("-");
}
function mr2() {
  var t;
  const e2 = Vt2();
  return e2 === et.browser ? [e2, ((t = (0, import_window_getters.getLocation)()) == null ? void 0 : t.host) || "unknown"].join(":") : e2;
}
function wr2(t, e2, n5) {
  const r3 = yr2(), o4 = mr2();
  return [[t, e2].join("-"), [pr2, n5].join("-"), r3, o4].join("/");
}
function bi({ protocol: t, version: e2, relayUrl: n5, sdkVersion: r3, auth: o4, projectId: s3, useOnCloseEvent: i4, bundleId: c6, packageName: f5 }) {
  const u2 = n5.split("?"), a4 = wr2(t, e2, r3), l6 = { auth: o4, ua: a4, projectId: s3, useOnCloseEvent: i4 || void 0, packageName: f5 || void 0, bundleId: c6 || void 0 }, d4 = gr2(u2[1] || "", l6);
  return u2[0] + "?" + d4;
}
function At(t, e2) {
  return t.filter((n5) => e2.includes(n5)).length === t.length;
}
function vi(t) {
  return Object.fromEntries(t.entries());
}
function xi(t) {
  return new Map(Object.entries(t));
}
function Ai(t = import_time3.FIVE_MINUTES, e2) {
  const n5 = (0, import_time3.toMiliseconds)(t || import_time3.FIVE_MINUTES);
  let r3, o4, s3, i4;
  return { resolve: (c6) => {
    s3 && r3 && (clearTimeout(s3), r3(c6), i4 = Promise.resolve(c6));
  }, reject: (c6) => {
    s3 && o4 && (clearTimeout(s3), o4(c6));
  }, done: () => new Promise((c6, f5) => {
    if (i4) return c6(i4);
    s3 = setTimeout(() => {
      const u2 = new Error(e2);
      i4 = Promise.reject(u2), f5(u2);
    }, n5), r3 = c6, o4 = f5;
  }) };
}
function Si(t, e2, n5) {
  return new Promise(async (r3, o4) => {
    const s3 = setTimeout(() => o4(new Error(n5)), e2);
    try {
      const i4 = await t;
      r3(i4);
    } catch (i4) {
      o4(i4);
    }
    clearTimeout(s3);
  });
}
function on2(t, e2) {
  if (typeof e2 == "string" && e2.startsWith(`${t}:`)) return e2;
  if (t.toLowerCase() === "topic") {
    if (typeof e2 != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e2}`;
  } else if (t.toLowerCase() === "id") {
    if (typeof e2 != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e2}`;
  }
  throw new Error(`Unknown expirer target type: ${t}`);
}
function Oi(t) {
  return on2("topic", t);
}
function Ni(t) {
  return on2("id", t);
}
function Ui(t) {
  const [e2, n5] = t.split(":"), r3 = { id: void 0, topic: void 0 };
  if (e2 === "topic" && typeof n5 == "string") r3.topic = n5;
  else if (e2 === "id" && Number.isInteger(Number(n5))) r3.id = Number(n5);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${e2}:${n5}`);
  return r3;
}
function _i(t, e2) {
  return (0, import_time3.fromMiliseconds)((e2 || Date.now()) + (0, import_time3.toMiliseconds)(t));
}
function Ri(t) {
  return Date.now() >= (0, import_time3.toMiliseconds)(t);
}
function $i(t, e2) {
  return `${t}${e2 ? `:${e2}` : ""}`;
}
function ut2(t = [], e2 = []) {
  return [.../* @__PURE__ */ new Set([...t, ...e2])];
}
async function Ti({ id: t, topic: e2, wcDeepLink: n5 }) {
  var r3;
  try {
    if (!n5) return;
    const o4 = typeof n5 == "string" ? JSON.parse(n5) : n5, s3 = o4?.href;
    if (typeof s3 != "string") return;
    const i4 = Br2(s3, t, e2), c6 = Vt2();
    if (c6 === et.browser) {
      if (!((r3 = (0, import_window_getters.getDocument)()) != null && r3.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      Ir2(i4);
    } else c6 === et.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(i4);
  } catch (o4) {
    console.error(o4);
  }
}
function Br2(t, e2, n5) {
  const r3 = `requestId=${e2}&sessionTopic=${n5}`;
  t.endsWith("/") && (t = t.slice(0, -1));
  let o4 = `${t}`;
  if (t.startsWith("https://t.me")) {
    const s3 = t.includes("?") ? "&startapp=" : "?startapp=";
    o4 = `${o4}${s3}${Or2(r3, true)}`;
  } else o4 = `${o4}/wc?${r3}`;
  return o4;
}
function Ir2(t) {
  let e2 = "_self";
  Sr2() ? e2 = "_top" : (Ar2() || t.startsWith("https://") || t.startsWith("http://")) && (e2 = "_blank"), window.open(t, e2, "noreferrer noopener");
}
async function Ci(t, e2) {
  let n5 = "";
  try {
    if (Wt2() && (n5 = localStorage.getItem(e2), n5)) return n5;
    n5 = await t.getItem(e2);
  } catch (r3) {
    console.error(r3);
  }
  return n5;
}
function ji(t, e2) {
  if (!t.includes(e2)) return null;
  const n5 = t.split(/([&,?,=])/), r3 = n5.indexOf(e2);
  return n5[r3 + 2];
}
function Li() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t) => {
    const e2 = Math.random() * 16 | 0;
    return (t === "x" ? e2 : e2 & 3 | 8).toString(16);
  });
}
function ki() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function Ar2() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function Sr2() {
  try {
    return window.self !== window.top;
  } catch {
    return false;
  }
}
function Or2(t, e2 = false) {
  const n5 = Buffer.from(t).toString("base64");
  return e2 ? n5.replace(/[=]/g, "") : n5;
}
function cn(t) {
  return Buffer.from(t, "base64").toString("utf-8");
}
function Pi(t) {
  return new Promise((e2) => setTimeout(e2, t));
}
var Hi = class {
  constructor({ limit: e2 }) {
    lr2(this, "limit"), lr2(this, "set"), this.limit = e2, this.set = /* @__PURE__ */ new Set();
  }
  add(e2) {
    if (!this.set.has(e2)) {
      if (this.set.size >= this.limit) {
        const n5 = this.set.values().next().value;
        n5 && this.set.delete(n5);
      }
      this.set.add(e2);
    }
  }
  has(e2) {
    return this.set.has(e2);
  }
};
var Ne2 = BigInt(2 ** 32 - 1);
var Nr2 = BigInt(32);
function Ur2(t, e2 = false) {
  return e2 ? { h: Number(t & Ne2), l: Number(t >> Nr2 & Ne2) } : { h: Number(t >> Nr2 & Ne2) | 0, l: Number(t & Ne2) | 0 };
}
function _r2(t, e2 = false) {
  const n5 = t.length;
  let r3 = new Uint32Array(n5), o4 = new Uint32Array(n5);
  for (let s3 = 0; s3 < n5; s3++) {
    const { h: i4, l: c6 } = Ur2(t[s3], e2);
    [r3[s3], o4[s3]] = [i4, c6];
  }
  return [r3, o4];
}
var Rr2 = (t, e2, n5) => t >>> n5;
var $r2 = (t, e2, n5) => t << 32 - n5 | e2 >>> n5;
var St2 = (t, e2, n5) => t >>> n5 | e2 << 32 - n5;
var Ot2 = (t, e2, n5) => t << 32 - n5 | e2 >>> n5;
var de2 = (t, e2, n5) => t << 64 - n5 | e2 >>> n5 - 32;
var he2 = (t, e2, n5) => t >>> n5 - 32 | e2 << 64 - n5;
var Di = (t, e2) => e2;
var Vi = (t, e2) => t;
var Mi = (t, e2, n5) => t << n5 | e2 >>> 32 - n5;
var Ki = (t, e2, n5) => e2 << n5 | t >>> 32 - n5;
var qi = (t, e2, n5) => e2 << n5 - 32 | t >>> 64 - n5;
var Fi = (t, e2, n5) => t << n5 - 32 | e2 >>> 64 - n5;
function dt2(t, e2, n5, r3) {
  const o4 = (e2 >>> 0) + (r3 >>> 0);
  return { h: t + n5 + (o4 / 2 ** 32 | 0) | 0, l: o4 | 0 };
}
var fn = (t, e2, n5) => (t >>> 0) + (e2 >>> 0) + (n5 >>> 0);
var an = (t, e2, n5, r3) => e2 + n5 + r3 + (t / 2 ** 32 | 0) | 0;
var Zi = (t, e2, n5, r3) => (t >>> 0) + (e2 >>> 0) + (n5 >>> 0) + (r3 >>> 0);
var Gi = (t, e2, n5, r3, o4) => e2 + n5 + r3 + o4 + (t / 2 ** 32 | 0) | 0;
var zi = (t, e2, n5, r3, o4) => (t >>> 0) + (e2 >>> 0) + (n5 >>> 0) + (r3 >>> 0) + (o4 >>> 0);
var Yi = (t, e2, n5, r3, o4, s3) => e2 + n5 + r3 + o4 + s3 + (t / 2 ** 32 | 0) | 0;
var Xt2 = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function Ue2(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function mt(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function ht2(t, ...e2) {
  if (!Ue2(t)) throw new Error("Uint8Array expected");
  if (e2.length > 0 && !e2.includes(t.length)) throw new Error("Uint8Array expected of length " + e2 + ", got length=" + t.length);
}
function _e2(t) {
  if (typeof t != "function" || typeof t.create != "function") throw new Error("Hash should be wrapped by utils.createHasher");
  mt(t.outputLen), mt(t.blockLen);
}
function Nt2(t, e2 = true) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e2 && t.finished) throw new Error("Hash#digest() has already been called");
}
function un(t, e2) {
  ht2(t);
  const n5 = e2.outputLen;
  if (t.length < n5) throw new Error("digestInto() expects output buffer of length at least " + n5);
}
function pe2(t) {
  return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function lt2(...t) {
  for (let e2 = 0; e2 < t.length; e2++) t[e2].fill(0);
}
function ln(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
function bt2(t, e2) {
  return t << 32 - e2 | t >>> e2;
}
var Tr2 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Cr2(t) {
  return t << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;
}
var wt2 = Tr2 ? (t) => t : (t) => Cr2(t);
function Wi(t) {
  for (let e2 = 0; e2 < t.length; e2++) t[e2] = Cr2(t[e2]);
  return t;
}
var Ut2 = Tr2 ? (t) => t : Wi;
var jr2 = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function";
var Xi = Array.from({ length: 256 }, (t, e2) => e2.toString(16).padStart(2, "0"));
function Jt2(t) {
  if (ht2(t), jr2) return t.toHex();
  let e2 = "";
  for (let n5 = 0; n5 < t.length; n5++) e2 += Xi[t[n5]];
  return e2;
}
var vt2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Lr2(t) {
  if (t >= vt2._0 && t <= vt2._9) return t - vt2._0;
  if (t >= vt2.A && t <= vt2.F) return t - (vt2.A - 10);
  if (t >= vt2.a && t <= vt2.f) return t - (vt2.a - 10);
}
function Re2(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  if (jr2) return Uint8Array.fromHex(t);
  const e2 = t.length, n5 = e2 / 2;
  if (e2 % 2) throw new Error("hex string expected, got unpadded hex of length " + e2);
  const r3 = new Uint8Array(n5);
  for (let o4 = 0, s3 = 0; o4 < n5; o4++, s3 += 2) {
    const i4 = Lr2(t.charCodeAt(s3)), c6 = Lr2(t.charCodeAt(s3 + 1));
    if (i4 === void 0 || c6 === void 0) {
      const f5 = t[s3] + t[s3 + 1];
      throw new Error('hex string expected, got non-hex character "' + f5 + '" at index ' + s3);
    }
    r3[o4] = i4 * 16 + c6;
  }
  return r3;
}
function kr2(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
function pt(t) {
  return typeof t == "string" && (t = kr2(t)), ht2(t), t;
}
function _t2(...t) {
  let e2 = 0;
  for (let r3 = 0; r3 < t.length; r3++) {
    const o4 = t[r3];
    ht2(o4), e2 += o4.length;
  }
  const n5 = new Uint8Array(e2);
  for (let r3 = 0, o4 = 0; r3 < t.length; r3++) {
    const s3 = t[r3];
    n5.set(s3, o4), o4 += s3.length;
  }
  return n5;
}
var $e2 = class {
};
function ge2(t) {
  const e2 = (r3) => t().update(pt(r3)).digest(), n5 = t();
  return e2.outputLen = n5.outputLen, e2.blockLen = n5.blockLen, e2.create = () => t(), e2;
}
function Ji(t) {
  const e2 = (r3, o4) => t(o4).update(pt(r3)).digest(), n5 = t({});
  return e2.outputLen = n5.outputLen, e2.blockLen = n5.blockLen, e2.create = (r3) => t(r3), e2;
}
function Mt2(t = 32) {
  if (Xt2 && typeof Xt2.getRandomValues == "function") return Xt2.getRandomValues(new Uint8Array(t));
  if (Xt2 && typeof Xt2.randomBytes == "function") return Uint8Array.from(Xt2.randomBytes(t));
  throw new Error("crypto.getRandomValues must be defined");
}
var Qi = BigInt(0);
var be2 = BigInt(1);
var tc = BigInt(2);
var ec = BigInt(7);
var nc = BigInt(256);
var rc = BigInt(113);
var Pr2 = [];
var Hr2 = [];
var Dr2 = [];
for (let t = 0, e2 = be2, n5 = 1, r3 = 0; t < 24; t++) {
  [n5, r3] = [r3, (2 * n5 + 3 * r3) % 5], Pr2.push(2 * (5 * r3 + n5)), Hr2.push((t + 1) * (t + 2) / 2 % 64);
  let o4 = Qi;
  for (let s3 = 0; s3 < 7; s3++) e2 = (e2 << be2 ^ (e2 >> ec) * rc) % nc, e2 & tc && (o4 ^= be2 << (be2 << BigInt(s3)) - be2);
  Dr2.push(o4);
}
var Vr2 = _r2(Dr2, true);
var oc = Vr2[0];
var sc = Vr2[1];
var Mr2 = (t, e2, n5) => n5 > 32 ? qi(t, e2, n5) : Mi(t, e2, n5);
var Kr2 = (t, e2, n5) => n5 > 32 ? Fi(t, e2, n5) : Ki(t, e2, n5);
function ic(t, e2 = 24) {
  const n5 = new Uint32Array(10);
  for (let r3 = 24 - e2; r3 < 24; r3++) {
    for (let i4 = 0; i4 < 10; i4++) n5[i4] = t[i4] ^ t[i4 + 10] ^ t[i4 + 20] ^ t[i4 + 30] ^ t[i4 + 40];
    for (let i4 = 0; i4 < 10; i4 += 2) {
      const c6 = (i4 + 8) % 10, f5 = (i4 + 2) % 10, u2 = n5[f5], a4 = n5[f5 + 1], l6 = Mr2(u2, a4, 1) ^ n5[c6], d4 = Kr2(u2, a4, 1) ^ n5[c6 + 1];
      for (let h5 = 0; h5 < 50; h5 += 10) t[i4 + h5] ^= l6, t[i4 + h5 + 1] ^= d4;
    }
    let o4 = t[2], s3 = t[3];
    for (let i4 = 0; i4 < 24; i4++) {
      const c6 = Hr2[i4], f5 = Mr2(o4, s3, c6), u2 = Kr2(o4, s3, c6), a4 = Pr2[i4];
      o4 = t[a4], s3 = t[a4 + 1], t[a4] = f5, t[a4 + 1] = u2;
    }
    for (let i4 = 0; i4 < 50; i4 += 10) {
      for (let c6 = 0; c6 < 10; c6++) n5[c6] = t[i4 + c6];
      for (let c6 = 0; c6 < 10; c6++) t[i4 + c6] ^= ~n5[(c6 + 2) % 10] & n5[(c6 + 4) % 10];
    }
    t[0] ^= oc[r3], t[1] ^= sc[r3];
  }
  lt2(n5);
}
var Jn2 = class _Jn extends $e2 {
  constructor(e2, n5, r3, o4 = false, s3 = 24) {
    if (super(), this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, this.enableXOF = false, this.blockLen = e2, this.suffix = n5, this.outputLen = r3, this.enableXOF = o4, this.rounds = s3, mt(r3), !(0 < e2 && e2 < 200)) throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200), this.state32 = pe2(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    Ut2(this.state32), ic(this.state32, this.rounds), Ut2(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e2) {
    Nt2(this), e2 = pt(e2), ht2(e2);
    const { blockLen: n5, state: r3 } = this, o4 = e2.length;
    for (let s3 = 0; s3 < o4; ) {
      const i4 = Math.min(n5 - this.pos, o4 - s3);
      for (let c6 = 0; c6 < i4; c6++) r3[this.pos++] ^= e2[s3++];
      this.pos === n5 && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = true;
    const { state: e2, suffix: n5, pos: r3, blockLen: o4 } = this;
    e2[r3] ^= n5, (n5 & 128) !== 0 && r3 === o4 - 1 && this.keccak(), e2[o4 - 1] ^= 128, this.keccak();
  }
  writeInto(e2) {
    Nt2(this, false), ht2(e2), this.finish();
    const n5 = this.state, { blockLen: r3 } = this;
    for (let o4 = 0, s3 = e2.length; o4 < s3; ) {
      this.posOut >= r3 && this.keccak();
      const i4 = Math.min(r3 - this.posOut, s3 - o4);
      e2.set(n5.subarray(this.posOut, this.posOut + i4), o4), this.posOut += i4, o4 += i4;
    }
    return e2;
  }
  xofInto(e2) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(e2);
  }
  xof(e2) {
    return mt(e2), this.xofInto(new Uint8Array(e2));
  }
  digestInto(e2) {
    if (un(e2, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(e2), this.destroy(), e2;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, lt2(this.state);
  }
  _cloneInto(e2) {
    const { blockLen: n5, suffix: r3, outputLen: o4, rounds: s3, enableXOF: i4 } = this;
    return e2 || (e2 = new _Jn(n5, r3, o4, i4, s3)), e2.state32.set(this.state32), e2.pos = this.pos, e2.posOut = this.posOut, e2.finished = this.finished, e2.rounds = s3, e2.suffix = r3, e2.outputLen = o4, e2.enableXOF = i4, e2.destroyed = this.destroyed, e2;
  }
};
var cc = (t, e2, n5) => ge2(() => new Jn2(e2, t, n5));
var fc = cc(1, 136, 256 / 8);
function ac(t, e2, n5, r3) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e2, n5, r3);
  const o4 = BigInt(32), s3 = BigInt(4294967295), i4 = Number(n5 >> o4 & s3), c6 = Number(n5 & s3), f5 = r3 ? 4 : 0, u2 = r3 ? 0 : 4;
  t.setUint32(e2 + f5, i4, r3), t.setUint32(e2 + u2, c6, r3);
}
function uc(t, e2, n5) {
  return t & e2 ^ ~t & n5;
}
function lc(t, e2, n5) {
  return t & e2 ^ t & n5 ^ e2 & n5;
}
var qr2 = class extends $e2 {
  constructor(e2, n5, r3, o4) {
    super(), this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.blockLen = e2, this.outputLen = n5, this.padOffset = r3, this.isLE = o4, this.buffer = new Uint8Array(e2), this.view = ln(this.buffer);
  }
  update(e2) {
    Nt2(this), e2 = pt(e2), ht2(e2);
    const { view: n5, buffer: r3, blockLen: o4 } = this, s3 = e2.length;
    for (let i4 = 0; i4 < s3; ) {
      const c6 = Math.min(o4 - this.pos, s3 - i4);
      if (c6 === o4) {
        const f5 = ln(e2);
        for (; o4 <= s3 - i4; i4 += o4) this.process(f5, i4);
        continue;
      }
      r3.set(e2.subarray(i4, i4 + c6), this.pos), this.pos += c6, i4 += c6, this.pos === o4 && (this.process(n5, 0), this.pos = 0);
    }
    return this.length += e2.length, this.roundClean(), this;
  }
  digestInto(e2) {
    Nt2(this), un(e2, this), this.finished = true;
    const { buffer: n5, view: r3, blockLen: o4, isLE: s3 } = this;
    let { pos: i4 } = this;
    n5[i4++] = 128, lt2(this.buffer.subarray(i4)), this.padOffset > o4 - i4 && (this.process(r3, 0), i4 = 0);
    for (let l6 = i4; l6 < o4; l6++) n5[l6] = 0;
    ac(r3, o4 - 8, BigInt(this.length * 8), s3), this.process(r3, 0);
    const c6 = ln(e2), f5 = this.outputLen;
    if (f5 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u2 = f5 / 4, a4 = this.get();
    if (u2 > a4.length) throw new Error("_sha2: outputLen bigger than state");
    for (let l6 = 0; l6 < u2; l6++) c6.setUint32(4 * l6, a4[l6], s3);
  }
  digest() {
    const { buffer: e2, outputLen: n5 } = this;
    this.digestInto(e2);
    const r3 = e2.slice(0, n5);
    return this.destroy(), r3;
  }
  _cloneInto(e2) {
    e2 || (e2 = new this.constructor()), e2.set(...this.get());
    const { blockLen: n5, buffer: r3, length: o4, finished: s3, destroyed: i4, pos: c6 } = this;
    return e2.destroyed = i4, e2.finished = s3, e2.length = o4, e2.pos = c6, o4 % n5 && e2.buffer.set(r3), e2;
  }
  clone() {
    return this._cloneInto();
  }
};
var Rt2 = Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
var X2 = Uint32Array.from([3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]);
var J3 = Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209]);
var dc = Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
var $t2 = new Uint32Array(64);
var hc = class extends qr2 {
  constructor(e2 = 32) {
    super(64, e2, 8, false), this.A = Rt2[0] | 0, this.B = Rt2[1] | 0, this.C = Rt2[2] | 0, this.D = Rt2[3] | 0, this.E = Rt2[4] | 0, this.F = Rt2[5] | 0, this.G = Rt2[6] | 0, this.H = Rt2[7] | 0;
  }
  get() {
    const { A: e2, B: n5, C: r3, D: o4, E: s3, F: i4, G: c6, H: f5 } = this;
    return [e2, n5, r3, o4, s3, i4, c6, f5];
  }
  set(e2, n5, r3, o4, s3, i4, c6, f5) {
    this.A = e2 | 0, this.B = n5 | 0, this.C = r3 | 0, this.D = o4 | 0, this.E = s3 | 0, this.F = i4 | 0, this.G = c6 | 0, this.H = f5 | 0;
  }
  process(e2, n5) {
    for (let l6 = 0; l6 < 16; l6++, n5 += 4) $t2[l6] = e2.getUint32(n5, false);
    for (let l6 = 16; l6 < 64; l6++) {
      const d4 = $t2[l6 - 15], h5 = $t2[l6 - 2], y4 = bt2(d4, 7) ^ bt2(d4, 18) ^ d4 >>> 3, m3 = bt2(h5, 17) ^ bt2(h5, 19) ^ h5 >>> 10;
      $t2[l6] = m3 + $t2[l6 - 7] + y4 + $t2[l6 - 16] | 0;
    }
    let { A: r3, B: o4, C: s3, D: i4, E: c6, F: f5, G: u2, H: a4 } = this;
    for (let l6 = 0; l6 < 64; l6++) {
      const d4 = bt2(c6, 6) ^ bt2(c6, 11) ^ bt2(c6, 25), h5 = a4 + d4 + uc(c6, f5, u2) + dc[l6] + $t2[l6] | 0, m3 = (bt2(r3, 2) ^ bt2(r3, 13) ^ bt2(r3, 22)) + lc(r3, o4, s3) | 0;
      a4 = u2, u2 = f5, f5 = c6, c6 = i4 + h5 | 0, i4 = s3, s3 = o4, o4 = r3, r3 = h5 + m3 | 0;
    }
    r3 = r3 + this.A | 0, o4 = o4 + this.B | 0, s3 = s3 + this.C | 0, i4 = i4 + this.D | 0, c6 = c6 + this.E | 0, f5 = f5 + this.F | 0, u2 = u2 + this.G | 0, a4 = a4 + this.H | 0, this.set(r3, o4, s3, i4, c6, f5, u2, a4);
  }
  roundClean() {
    lt2($t2);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), lt2(this.buffer);
  }
};
var Fr2 = _r2(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t) => BigInt(t)));
var pc = Fr2[0];
var gc = Fr2[1];
var Tt2 = new Uint32Array(80);
var Ct = new Uint32Array(80);
var dn = class extends qr2 {
  constructor(e2 = 64) {
    super(128, e2, 16, false), this.Ah = J3[0] | 0, this.Al = J3[1] | 0, this.Bh = J3[2] | 0, this.Bl = J3[3] | 0, this.Ch = J3[4] | 0, this.Cl = J3[5] | 0, this.Dh = J3[6] | 0, this.Dl = J3[7] | 0, this.Eh = J3[8] | 0, this.El = J3[9] | 0, this.Fh = J3[10] | 0, this.Fl = J3[11] | 0, this.Gh = J3[12] | 0, this.Gl = J3[13] | 0, this.Hh = J3[14] | 0, this.Hl = J3[15] | 0;
  }
  get() {
    const { Ah: e2, Al: n5, Bh: r3, Bl: o4, Ch: s3, Cl: i4, Dh: c6, Dl: f5, Eh: u2, El: a4, Fh: l6, Fl: d4, Gh: h5, Gl: y4, Hh: m3, Hl: w3 } = this;
    return [e2, n5, r3, o4, s3, i4, c6, f5, u2, a4, l6, d4, h5, y4, m3, w3];
  }
  set(e2, n5, r3, o4, s3, i4, c6, f5, u2, a4, l6, d4, h5, y4, m3, w3) {
    this.Ah = e2 | 0, this.Al = n5 | 0, this.Bh = r3 | 0, this.Bl = o4 | 0, this.Ch = s3 | 0, this.Cl = i4 | 0, this.Dh = c6 | 0, this.Dl = f5 | 0, this.Eh = u2 | 0, this.El = a4 | 0, this.Fh = l6 | 0, this.Fl = d4 | 0, this.Gh = h5 | 0, this.Gl = y4 | 0, this.Hh = m3 | 0, this.Hl = w3 | 0;
  }
  process(e2, n5) {
    for (let R3 = 0; R3 < 16; R3++, n5 += 4) Tt2[R3] = e2.getUint32(n5), Ct[R3] = e2.getUint32(n5 += 4);
    for (let R3 = 16; R3 < 80; R3++) {
      const Z = Tt2[R3 - 15] | 0, H2 = Ct[R3 - 15] | 0, j6 = St2(Z, H2, 1) ^ St2(Z, H2, 8) ^ Rr2(Z, H2, 7), L2 = Ot2(Z, H2, 1) ^ Ot2(Z, H2, 8) ^ $r2(Z, H2, 7), k5 = Tt2[R3 - 2] | 0, O5 = Ct[R3 - 2] | 0, T3 = St2(k5, O5, 19) ^ de2(k5, O5, 61) ^ Rr2(k5, O5, 6), C4 = Ot2(k5, O5, 19) ^ he2(k5, O5, 61) ^ $r2(k5, O5, 6), _4 = Zi(L2, C4, Ct[R3 - 7], Ct[R3 - 16]), p4 = Gi(_4, j6, T3, Tt2[R3 - 7], Tt2[R3 - 16]);
      Tt2[R3] = p4 | 0, Ct[R3] = _4 | 0;
    }
    let { Ah: r3, Al: o4, Bh: s3, Bl: i4, Ch: c6, Cl: f5, Dh: u2, Dl: a4, Eh: l6, El: d4, Fh: h5, Fl: y4, Gh: m3, Gl: w3, Hh: U3, Hl: F } = this;
    for (let R3 = 0; R3 < 80; R3++) {
      const Z = St2(l6, d4, 14) ^ St2(l6, d4, 18) ^ de2(l6, d4, 41), H2 = Ot2(l6, d4, 14) ^ Ot2(l6, d4, 18) ^ he2(l6, d4, 41), j6 = l6 & h5 ^ ~l6 & m3, L2 = d4 & y4 ^ ~d4 & w3, k5 = zi(F, H2, L2, gc[R3], Ct[R3]), O5 = Yi(k5, U3, Z, j6, pc[R3], Tt2[R3]), T3 = k5 | 0, C4 = St2(r3, o4, 28) ^ de2(r3, o4, 34) ^ de2(r3, o4, 39), _4 = Ot2(r3, o4, 28) ^ he2(r3, o4, 34) ^ he2(r3, o4, 39), p4 = r3 & s3 ^ r3 & c6 ^ s3 & c6, b5 = o4 & i4 ^ o4 & f5 ^ i4 & f5;
      U3 = m3 | 0, F = w3 | 0, m3 = h5 | 0, w3 = y4 | 0, h5 = l6 | 0, y4 = d4 | 0, { h: l6, l: d4 } = dt2(u2 | 0, a4 | 0, O5 | 0, T3 | 0), u2 = c6 | 0, a4 = f5 | 0, c6 = s3 | 0, f5 = i4 | 0, s3 = r3 | 0, i4 = o4 | 0;
      const g3 = fn(T3, _4, b5);
      r3 = an(g3, O5, C4, p4), o4 = g3 | 0;
    }
    ({ h: r3, l: o4 } = dt2(this.Ah | 0, this.Al | 0, r3 | 0, o4 | 0)), { h: s3, l: i4 } = dt2(this.Bh | 0, this.Bl | 0, s3 | 0, i4 | 0), { h: c6, l: f5 } = dt2(this.Ch | 0, this.Cl | 0, c6 | 0, f5 | 0), { h: u2, l: a4 } = dt2(this.Dh | 0, this.Dl | 0, u2 | 0, a4 | 0), { h: l6, l: d4 } = dt2(this.Eh | 0, this.El | 0, l6 | 0, d4 | 0), { h: h5, l: y4 } = dt2(this.Fh | 0, this.Fl | 0, h5 | 0, y4 | 0), { h: m3, l: w3 } = dt2(this.Gh | 0, this.Gl | 0, m3 | 0, w3 | 0), { h: U3, l: F } = dt2(this.Hh | 0, this.Hl | 0, U3 | 0, F | 0), this.set(r3, o4, s3, i4, c6, f5, u2, a4, l6, d4, h5, y4, m3, w3, U3, F);
  }
  roundClean() {
    lt2(Tt2, Ct);
  }
  destroy() {
    lt2(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var bc = class extends dn {
  constructor() {
    super(48), this.Ah = X2[0] | 0, this.Al = X2[1] | 0, this.Bh = X2[2] | 0, this.Bl = X2[3] | 0, this.Ch = X2[4] | 0, this.Cl = X2[5] | 0, this.Dh = X2[6] | 0, this.Dl = X2[7] | 0, this.Eh = X2[8] | 0, this.El = X2[9] | 0, this.Fh = X2[10] | 0, this.Fl = X2[11] | 0, this.Gh = X2[12] | 0, this.Gl = X2[13] | 0, this.Hh = X2[14] | 0, this.Hl = X2[15] | 0;
  }
};
var Q2 = Uint32Array.from([573645204, 4230739756, 2673172387, 3360449730, 596883563, 1867755857, 2520282905, 1497426621, 2519219938, 2827943907, 3193839141, 1401305490, 721525244, 746961066, 246885852, 2177182882]);
var yc = class extends dn {
  constructor() {
    super(32), this.Ah = Q2[0] | 0, this.Al = Q2[1] | 0, this.Bh = Q2[2] | 0, this.Bl = Q2[3] | 0, this.Ch = Q2[4] | 0, this.Cl = Q2[5] | 0, this.Dh = Q2[6] | 0, this.Dl = Q2[7] | 0, this.Eh = Q2[8] | 0, this.El = Q2[9] | 0, this.Fh = Q2[10] | 0, this.Fl = Q2[11] | 0, this.Gh = Q2[12] | 0, this.Gl = Q2[13] | 0, this.Hh = Q2[14] | 0, this.Hl = Q2[15] | 0;
  }
};
var Te2 = ge2(() => new hc());
var mc = ge2(() => new dn());
var wc = ge2(() => new bc());
var vc = ge2(() => new yc());
var xc = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9]);
var z3 = Uint32Array.from([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225]);
var S3 = new Uint32Array(32);
function jt2(t, e2, n5, r3, o4, s3) {
  const i4 = o4[s3], c6 = o4[s3 + 1];
  let f5 = S3[2 * t], u2 = S3[2 * t + 1], a4 = S3[2 * e2], l6 = S3[2 * e2 + 1], d4 = S3[2 * n5], h5 = S3[2 * n5 + 1], y4 = S3[2 * r3], m3 = S3[2 * r3 + 1], w3 = fn(f5, a4, i4);
  u2 = an(w3, u2, l6, c6), f5 = w3 | 0, { Dh: m3, Dl: y4 } = { Dh: m3 ^ u2, Dl: y4 ^ f5 }, { Dh: m3, Dl: y4 } = { Dh: Di(m3, y4), Dl: Vi(m3) }, { h: h5, l: d4 } = dt2(h5, d4, m3, y4), { Bh: l6, Bl: a4 } = { Bh: l6 ^ h5, Bl: a4 ^ d4 }, { Bh: l6, Bl: a4 } = { Bh: St2(l6, a4, 24), Bl: Ot2(l6, a4, 24) }, S3[2 * t] = f5, S3[2 * t + 1] = u2, S3[2 * e2] = a4, S3[2 * e2 + 1] = l6, S3[2 * n5] = d4, S3[2 * n5 + 1] = h5, S3[2 * r3] = y4, S3[2 * r3 + 1] = m3;
}
function Lt2(t, e2, n5, r3, o4, s3) {
  const i4 = o4[s3], c6 = o4[s3 + 1];
  let f5 = S3[2 * t], u2 = S3[2 * t + 1], a4 = S3[2 * e2], l6 = S3[2 * e2 + 1], d4 = S3[2 * n5], h5 = S3[2 * n5 + 1], y4 = S3[2 * r3], m3 = S3[2 * r3 + 1], w3 = fn(f5, a4, i4);
  u2 = an(w3, u2, l6, c6), f5 = w3 | 0, { Dh: m3, Dl: y4 } = { Dh: m3 ^ u2, Dl: y4 ^ f5 }, { Dh: m3, Dl: y4 } = { Dh: St2(m3, y4, 16), Dl: Ot2(m3, y4, 16) }, { h: h5, l: d4 } = dt2(h5, d4, m3, y4), { Bh: l6, Bl: a4 } = { Bh: l6 ^ h5, Bl: a4 ^ d4 }, { Bh: l6, Bl: a4 } = { Bh: de2(l6, a4, 63), Bl: he2(l6, a4, 63) }, S3[2 * t] = f5, S3[2 * t + 1] = u2, S3[2 * e2] = a4, S3[2 * e2 + 1] = l6, S3[2 * n5] = d4, S3[2 * n5 + 1] = h5, S3[2 * r3] = y4, S3[2 * r3 + 1] = m3;
}
function Ec(t, e2 = {}, n5, r3, o4) {
  if (mt(n5), t < 0 || t > n5) throw new Error("outputLen bigger than keyLen");
  const { key: s3, salt: i4, personalization: c6 } = e2;
  if (s3 !== void 0 && (s3.length < 1 || s3.length > n5)) throw new Error("key length must be undefined or 1.." + n5);
  if (i4 !== void 0 && i4.length !== r3) throw new Error("salt must be undefined or " + r3);
  if (c6 !== void 0 && c6.length !== o4) throw new Error("personalization must be undefined or " + o4);
}
var Bc = class extends $e2 {
  constructor(e2, n5) {
    super(), this.finished = false, this.destroyed = false, this.length = 0, this.pos = 0, mt(e2), mt(n5), this.blockLen = e2, this.outputLen = n5, this.buffer = new Uint8Array(e2), this.buffer32 = pe2(this.buffer);
  }
  update(e2) {
    Nt2(this), e2 = pt(e2), ht2(e2);
    const { blockLen: n5, buffer: r3, buffer32: o4 } = this, s3 = e2.length, i4 = e2.byteOffset, c6 = e2.buffer;
    for (let f5 = 0; f5 < s3; ) {
      this.pos === n5 && (Ut2(o4), this.compress(o4, 0, false), Ut2(o4), this.pos = 0);
      const u2 = Math.min(n5 - this.pos, s3 - f5), a4 = i4 + f5;
      if (u2 === n5 && !(a4 % 4) && f5 + u2 < s3) {
        const l6 = new Uint32Array(c6, a4, Math.floor((s3 - f5) / 4));
        Ut2(l6);
        for (let d4 = 0; f5 + n5 < s3; d4 += o4.length, f5 += n5) this.length += n5, this.compress(l6, d4, false);
        Ut2(l6);
        continue;
      }
      r3.set(e2.subarray(f5, f5 + u2), this.pos), this.pos += u2, this.length += u2, f5 += u2;
    }
    return this;
  }
  digestInto(e2) {
    Nt2(this), un(e2, this);
    const { pos: n5, buffer32: r3 } = this;
    this.finished = true, lt2(this.buffer.subarray(n5)), Ut2(r3), this.compress(r3, 0, true), Ut2(r3);
    const o4 = pe2(e2);
    this.get().forEach((s3, i4) => o4[i4] = wt2(s3));
  }
  digest() {
    const { buffer: e2, outputLen: n5 } = this;
    this.digestInto(e2);
    const r3 = e2.slice(0, n5);
    return this.destroy(), r3;
  }
  _cloneInto(e2) {
    const { buffer: n5, length: r3, finished: o4, destroyed: s3, outputLen: i4, pos: c6 } = this;
    return e2 || (e2 = new this.constructor({ dkLen: i4 })), e2.set(...this.get()), e2.buffer.set(n5), e2.destroyed = s3, e2.finished = o4, e2.length = r3, e2.pos = c6, e2.outputLen = i4, e2;
  }
  clone() {
    return this._cloneInto();
  }
};
var Ic = class extends Bc {
  constructor(e2 = {}) {
    const n5 = e2.dkLen === void 0 ? 64 : e2.dkLen;
    super(128, n5), this.v0l = z3[0] | 0, this.v0h = z3[1] | 0, this.v1l = z3[2] | 0, this.v1h = z3[3] | 0, this.v2l = z3[4] | 0, this.v2h = z3[5] | 0, this.v3l = z3[6] | 0, this.v3h = z3[7] | 0, this.v4l = z3[8] | 0, this.v4h = z3[9] | 0, this.v5l = z3[10] | 0, this.v5h = z3[11] | 0, this.v6l = z3[12] | 0, this.v6h = z3[13] | 0, this.v7l = z3[14] | 0, this.v7h = z3[15] | 0, Ec(n5, e2, 64, 16, 16);
    let { key: r3, personalization: o4, salt: s3 } = e2, i4 = 0;
    if (r3 !== void 0 && (r3 = pt(r3), i4 = r3.length), this.v0l ^= this.outputLen | i4 << 8 | 65536 | 1 << 24, s3 !== void 0) {
      s3 = pt(s3);
      const c6 = pe2(s3);
      this.v4l ^= wt2(c6[0]), this.v4h ^= wt2(c6[1]), this.v5l ^= wt2(c6[2]), this.v5h ^= wt2(c6[3]);
    }
    if (o4 !== void 0) {
      o4 = pt(o4);
      const c6 = pe2(o4);
      this.v6l ^= wt2(c6[0]), this.v6h ^= wt2(c6[1]), this.v7l ^= wt2(c6[2]), this.v7h ^= wt2(c6[3]);
    }
    if (r3 !== void 0) {
      const c6 = new Uint8Array(this.blockLen);
      c6.set(r3), this.update(c6);
    }
  }
  get() {
    let { v0l: e2, v0h: n5, v1l: r3, v1h: o4, v2l: s3, v2h: i4, v3l: c6, v3h: f5, v4l: u2, v4h: a4, v5l: l6, v5h: d4, v6l: h5, v6h: y4, v7l: m3, v7h: w3 } = this;
    return [e2, n5, r3, o4, s3, i4, c6, f5, u2, a4, l6, d4, h5, y4, m3, w3];
  }
  set(e2, n5, r3, o4, s3, i4, c6, f5, u2, a4, l6, d4, h5, y4, m3, w3) {
    this.v0l = e2 | 0, this.v0h = n5 | 0, this.v1l = r3 | 0, this.v1h = o4 | 0, this.v2l = s3 | 0, this.v2h = i4 | 0, this.v3l = c6 | 0, this.v3h = f5 | 0, this.v4l = u2 | 0, this.v4h = a4 | 0, this.v5l = l6 | 0, this.v5h = d4 | 0, this.v6l = h5 | 0, this.v6h = y4 | 0, this.v7l = m3 | 0, this.v7h = w3 | 0;
  }
  compress(e2, n5, r3) {
    this.get().forEach((f5, u2) => S3[u2] = f5), S3.set(z3, 16);
    let { h: o4, l: s3 } = Ur2(BigInt(this.length));
    S3[24] = z3[8] ^ s3, S3[25] = z3[9] ^ o4, r3 && (S3[28] = ~S3[28], S3[29] = ~S3[29]);
    let i4 = 0;
    const c6 = xc;
    for (let f5 = 0; f5 < 12; f5++) jt2(0, 4, 8, 12, e2, n5 + 2 * c6[i4++]), Lt2(0, 4, 8, 12, e2, n5 + 2 * c6[i4++]), jt2(1, 5, 9, 13, e2, n5 + 2 * c6[i4++]), Lt2(1, 5, 9, 13, e2, n5 + 2 * c6[i4++]), jt2(2, 6, 10, 14, e2, n5 + 2 * c6[i4++]), Lt2(2, 6, 10, 14, e2, n5 + 2 * c6[i4++]), jt2(3, 7, 11, 15, e2, n5 + 2 * c6[i4++]), Lt2(3, 7, 11, 15, e2, n5 + 2 * c6[i4++]), jt2(0, 5, 10, 15, e2, n5 + 2 * c6[i4++]), Lt2(0, 5, 10, 15, e2, n5 + 2 * c6[i4++]), jt2(1, 6, 11, 12, e2, n5 + 2 * c6[i4++]), Lt2(1, 6, 11, 12, e2, n5 + 2 * c6[i4++]), jt2(2, 7, 8, 13, e2, n5 + 2 * c6[i4++]), Lt2(2, 7, 8, 13, e2, n5 + 2 * c6[i4++]), jt2(3, 4, 9, 14, e2, n5 + 2 * c6[i4++]), Lt2(3, 4, 9, 14, e2, n5 + 2 * c6[i4++]);
    this.v0l ^= S3[0] ^ S3[16], this.v0h ^= S3[1] ^ S3[17], this.v1l ^= S3[2] ^ S3[18], this.v1h ^= S3[3] ^ S3[19], this.v2l ^= S3[4] ^ S3[20], this.v2h ^= S3[5] ^ S3[21], this.v3l ^= S3[6] ^ S3[22], this.v3h ^= S3[7] ^ S3[23], this.v4l ^= S3[8] ^ S3[24], this.v4h ^= S3[9] ^ S3[25], this.v5l ^= S3[10] ^ S3[26], this.v5h ^= S3[11] ^ S3[27], this.v6l ^= S3[12] ^ S3[28], this.v6h ^= S3[13] ^ S3[29], this.v7l ^= S3[14] ^ S3[30], this.v7h ^= S3[15] ^ S3[31], lt2(S3);
  }
  destroy() {
    this.destroyed = true, lt2(this.buffer32), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var Ac = Ji((t) => new Ic(t));
var Sc = "https://rpc.walletconnect.org/v1";
function hn(t) {
  const e2 = `Ethereum Signed Message:
${t.length}`, n5 = new TextEncoder().encode(e2 + t);
  return "0x" + Buffer.from(fc(n5)).toString("hex");
}
async function Zr2(t, e2, n5, r3, o4, s3) {
  switch (n5.t) {
    case "eip191":
      return await Gr2(t, e2, n5.s);
    case "eip1271":
      return await zr2(t, e2, n5.s, r3, o4, s3);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${n5.t}`);
  }
}
function Gr2(t, e2, n5) {
  const r3 = Signature_exports.fromHex(n5);
  return Secp256k1_exports.recoverAddress({ payload: hn(e2), signature: r3 }).toLowerCase() === t.toLowerCase();
}
async function zr2(t, e2, n5, r3, o4, s3) {
  const i4 = Je2(r3);
  if (!i4.namespace || !i4.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r3}`);
  try {
    const c6 = "0x1626ba7e", f5 = "0000000000000000000000000000000000000000000000000000000000000040", u2 = n5.substring(2), a4 = (u2.length / 2).toString(16).padStart(64, "0"), l6 = (e2.startsWith("0x") ? e2 : hn(e2)).substring(2), d4 = c6 + l6 + f5 + a4 + u2, h5 = await fetch(`${s3 || Sc}/?chainId=${r3}&projectId=${o4}`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ id: Oc(), jsonrpc: "2.0", method: "eth_call", params: [{ to: t, data: d4 }, "latest"] }) }), { result: y4 } = await h5.json();
    return y4 ? y4.slice(0, c6.length).toLowerCase() === c6.toLowerCase() : false;
  } catch (c6) {
    return console.error("isValidEip1271Signature: ", c6), false;
  }
}
function Oc() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function Nc(t) {
  const e2 = atob(t), n5 = new Uint8Array(e2.length);
  for (let i4 = 0; i4 < e2.length; i4++) n5[i4] = e2.charCodeAt(i4);
  const r3 = n5[0];
  if (r3 === 0) throw new Error("No signatures found");
  const o4 = 1 + r3 * 64;
  if (n5.length < o4) throw new Error("Transaction data too short for claimed signature count");
  if (n5.length < 100) throw new Error("Transaction too short");
  const s3 = Buffer.from(t, "base64").slice(1, 65);
  return esm_default2.encode(s3);
}
function Uc(t) {
  const e2 = new Uint8Array(Buffer.from(t, "base64")), n5 = Array.from("TransactionData::").map((s3) => s3.charCodeAt(0)), r3 = new Uint8Array(n5.length + e2.length);
  r3.set(n5), r3.set(e2, n5.length);
  const o4 = Ac(r3, { dkLen: 32 });
  return esm_default2.encode(o4);
}
function _c(t) {
  const e2 = new Uint8Array(Te2(Yr2(t)));
  return esm_default2.encode(e2);
}
function Yr2(t) {
  if (t instanceof Uint8Array) return t;
  if (Array.isArray(t)) return new Uint8Array(t);
  if (typeof t == "object" && t != null && t.data) return new Uint8Array(Object.values(t.data));
  if (typeof t == "object" && t) return new Uint8Array(Object.values(t));
  throw new Error("getNearUint8ArrayFromBytes: Unexpected result type from bytes array");
}
function Rc(t) {
  const e2 = Buffer.from(t, "base64"), n5 = decode(e2).txn;
  if (!n5) throw new Error("Invalid signed transaction: missing 'txn' field");
  const r3 = encode(n5), o4 = Buffer.from("TX"), s3 = Buffer.concat([o4, Buffer.from(r3)]), i4 = vc(s3);
  return base32.encode(i4).replace(/=+$/, "");
}
function pn(t) {
  const e2 = [];
  let n5 = BigInt(t);
  for (; n5 >= BigInt(128); ) e2.push(Number(n5 & BigInt(127) | BigInt(128))), n5 >>= BigInt(7);
  return e2.push(Number(n5)), Buffer.from(e2);
}
function $c(t) {
  const e2 = Buffer.from(t.signed.bodyBytes, "base64"), n5 = Buffer.from(t.signed.authInfoBytes, "base64"), r3 = Buffer.from(t.signature.signature, "base64"), o4 = [];
  o4.push(Buffer.from([10])), o4.push(pn(e2.length)), o4.push(e2), o4.push(Buffer.from([18])), o4.push(pn(n5.length)), o4.push(n5), o4.push(Buffer.from([26])), o4.push(pn(r3.length)), o4.push(r3);
  const s3 = Buffer.concat(o4), i4 = Te2(s3);
  return Buffer.from(i4).toString("hex").toUpperCase();
}
function Tc(t) {
  var e2, n5;
  const r3 = [];
  try {
    if (typeof t == "string") return r3.push(t), r3;
    if (typeof t != "object") return r3;
    t != null && t.id && r3.push(t.id);
    const o4 = (n5 = (e2 = t?.capabilities) == null ? void 0 : e2.caip345) == null ? void 0 : n5.transactionHashes;
    o4 && r3.push(...o4);
  } catch (o4) {
    console.warn("getWalletSendCallsHashes failed: ", o4);
  }
  return r3;
}
var Cc = Object.defineProperty;
var jc = Object.defineProperties;
var Lc = Object.getOwnPropertyDescriptors;
var Wr2 = Object.getOwnPropertySymbols;
var kc = Object.prototype.hasOwnProperty;
var Pc = Object.prototype.propertyIsEnumerable;
var Xr2 = (t, e2, n5) => e2 in t ? Cc(t, e2, { enumerable: true, configurable: true, writable: true, value: n5 }) : t[e2] = n5;
var gn2 = (t, e2) => {
  for (var n5 in e2 || (e2 = {})) kc.call(e2, n5) && Xr2(t, n5, e2[n5]);
  if (Wr2) for (var n5 of Wr2(e2)) Pc.call(e2, n5) && Xr2(t, n5, e2[n5]);
  return t;
};
var Jr2 = (t, e2) => jc(t, Lc(e2));
var Qr2 = "did:pkh:";
var Hc = { eip155: "Ethereum", solana: "Solana", bip122: "Bitcoin" };
var Dc = (t) => t ? Hc[t] || t : "";
var ye2 = (t) => t?.split(":");
var to2 = (t) => {
  const e2 = t && ye2(t);
  if (e2) return t.includes(Qr2) ? e2[3] : e2[1];
};
var eo2 = (t) => {
  const e2 = t && ye2(t);
  if (e2) return t.includes(Qr2) ? e2[2] : e2[0];
};
var no2 = (t) => {
  const e2 = t && ye2(t);
  if (e2) return e2[2] + ":" + e2[3];
};
var bn2 = (t) => {
  const e2 = t && ye2(t);
  if (e2) return e2.pop();
};
async function Vc(t) {
  const { cacao: e2, projectId: n5 } = t, { s: r3, p: o4 } = e2, s3 = ro2(o4, o4.iss), i4 = bn2(o4.iss);
  return await Zr2(i4, s3, r3, no2(o4.iss), n5);
}
var ro2 = (t, e2) => {
  const n5 = eo2(e2);
  if (!n5) throw new Error("Invalid issuer: " + e2);
  const r3 = `${t.domain} wants you to sign in with your ${Dc(n5)} account:`, o4 = bn2(e2);
  if (!t.aud && !t.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let s3 = t.statement || void 0;
  const i4 = `URI: ${t.aud || t.uri}`, c6 = `Version: ${t.version}`, f5 = `Chain ID: ${to2(e2)}`, u2 = `Nonce: ${t.nonce}`, a4 = `Issued At: ${t.iat}`, l6 = t.exp ? `Expiration Time: ${t.exp}` : void 0, d4 = t.nbf ? `Not Before: ${t.nbf}` : void 0, h5 = t.requestId ? `Request ID: ${t.requestId}` : void 0, y4 = t.resources ? `Resources:${t.resources.map((w3) => `
- ${w3}`).join("")}` : void 0, m3 = je2(t.resources);
  if (m3) {
    const w3 = kt2(m3);
    s3 = wn(s3, w3);
  }
  return [r3, o4, "", s3, "", i4, c6, f5, u2, a4, l6, d4, h5, y4].filter((w3) => w3 != null).join(`
`);
};
function co2(t) {
  return Buffer.from(JSON.stringify(t)).toString("base64");
}
function fo2(t) {
  return JSON.parse(Buffer.from(t, "base64").toString("utf-8"));
}
function yt2(t) {
  if (!t) throw new Error("No recap provided, value is undefined");
  if (!t.att) throw new Error("No `att` property found");
  const e2 = Object.keys(t.att);
  if (!(e2 != null && e2.length)) throw new Error("No resources found in `att` property");
  e2.forEach((n5) => {
    const r3 = t.att[n5];
    if (Array.isArray(r3)) throw new Error(`Resource must be an object: ${n5}`);
    if (typeof r3 != "object") throw new Error(`Resource must be an object: ${n5}`);
    if (!Object.keys(r3).length) throw new Error(`Resource object is empty: ${n5}`);
    Object.keys(r3).forEach((o4) => {
      const s3 = r3[o4];
      if (!Array.isArray(s3)) throw new Error(`Ability limits ${o4} must be an array of objects, found: ${s3}`);
      if (!s3.length) throw new Error(`Value of ${o4} is empty array, must be an array with objects`);
      s3.forEach((i4) => {
        if (typeof i4 != "object") throw new Error(`Ability limits (${o4}) must be an array of objects, found: ${i4}`);
      });
    });
  });
}
function ao2(t, e2, n5, r3 = {}) {
  return n5?.sort((o4, s3) => o4.localeCompare(s3)), { att: { [t]: yn2(e2, n5, r3) } };
}
function yn2(t, e2, n5 = {}) {
  e2 = e2?.sort((o4, s3) => o4.localeCompare(s3));
  const r3 = e2.map((o4) => ({ [`${t}/${o4}`]: [n5] }));
  return Object.assign({}, ...r3);
}
function Ce2(t) {
  return yt2(t), `urn:recap:${co2(t).replace(/=/g, "")}`;
}
function kt2(t) {
  const e2 = fo2(t.replace("urn:recap:", ""));
  return yt2(e2), e2;
}
function Zc(t, e2, n5) {
  const r3 = ao2(t, e2, n5);
  return Ce2(r3);
}
function mn2(t) {
  return t && t.includes("urn:recap:");
}
function Gc(t, e2) {
  const n5 = kt2(t), r3 = kt2(e2), o4 = lo2(n5, r3);
  return Ce2(o4);
}
function lo2(t, e2) {
  yt2(t), yt2(e2);
  const n5 = Object.keys(t.att).concat(Object.keys(e2.att)).sort((o4, s3) => o4.localeCompare(s3)), r3 = { att: {} };
  return n5.forEach((o4) => {
    var s3, i4;
    Object.keys(((s3 = t.att) == null ? void 0 : s3[o4]) || {}).concat(Object.keys(((i4 = e2.att) == null ? void 0 : i4[o4]) || {})).sort((c6, f5) => c6.localeCompare(f5)).forEach((c6) => {
      var f5, u2;
      r3.att[o4] = Jr2(gn2({}, r3.att[o4]), { [c6]: ((f5 = t.att[o4]) == null ? void 0 : f5[c6]) || ((u2 = e2.att[o4]) == null ? void 0 : u2[c6]) });
    });
  }), r3;
}
function wn(t = "", e2) {
  yt2(e2);
  const n5 = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (t.includes(n5)) return t;
  const r3 = [];
  let o4 = 0;
  Object.keys(e2.att).forEach((c6) => {
    const f5 = Object.keys(e2.att[c6]).map((l6) => ({ ability: l6.split("/")[0], action: l6.split("/")[1] }));
    f5.sort((l6, d4) => l6.action.localeCompare(d4.action));
    const u2 = {};
    f5.forEach((l6) => {
      u2[l6.ability] || (u2[l6.ability] = []), u2[l6.ability].push(l6.action);
    });
    const a4 = Object.keys(u2).map((l6) => (o4++, `(${o4}) '${l6}': '${u2[l6].join("', '")}' for '${c6}'.`));
    r3.push(a4.join(", ").replace(".,", "."));
  });
  const s3 = r3.join(" "), i4 = `${n5}${s3}`;
  return `${t ? t + " " : ""}${i4}`;
}
function zc(t) {
  var e2;
  const n5 = kt2(t);
  yt2(n5);
  const r3 = (e2 = n5.att) == null ? void 0 : e2.eip155;
  return r3 ? Object.keys(r3).map((o4) => o4.split("/")[1]) : [];
}
function Yc(t) {
  const e2 = kt2(t);
  yt2(e2);
  const n5 = [];
  return Object.values(e2.att).forEach((r3) => {
    Object.values(r3).forEach((o4) => {
      var s3;
      (s3 = o4?.[0]) != null && s3.chains && n5.push(o4[0].chains);
    });
  }), [...new Set(n5.flat())];
}
function je2(t) {
  if (!t) return;
  const e2 = t?.[t.length - 1];
  return mn2(e2) ? e2 : void 0;
}
function po2(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function vn2(t) {
  if (typeof t != "boolean") throw new Error(`boolean expected, not ${t}`);
}
function xn2(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function ot(t, ...e2) {
  if (!po2(t)) throw new Error("Uint8Array expected");
  if (e2.length > 0 && !e2.includes(t.length)) throw new Error("Uint8Array expected of length " + e2 + ", got length=" + t.length);
}
function go2(t, e2 = true) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e2 && t.finished) throw new Error("Hash#digest() has already been called");
}
function Wc(t, e2) {
  ot(t);
  const n5 = e2.outputLen;
  if (t.length < n5) throw new Error("digestInto() expects output buffer of length at least " + n5);
}
function Pt2(t) {
  return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function Qt2(...t) {
  for (let e2 = 0; e2 < t.length; e2++) t[e2].fill(0);
}
function Xc(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
var Jc = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Qc(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
function En2(t) {
  if (typeof t == "string") t = Qc(t);
  else if (po2(t)) t = Bn2(t);
  else throw new Error("Uint8Array expected, got " + typeof t);
  return t;
}
function tf(t, e2) {
  if (e2 == null || typeof e2 != "object") throw new Error("options must be defined");
  return Object.assign(t, e2);
}
function ef(t, e2) {
  if (t.length !== e2.length) return false;
  let n5 = 0;
  for (let r3 = 0; r3 < t.length; r3++) n5 |= t[r3] ^ e2[r3];
  return n5 === 0;
}
var nf = (t, e2) => {
  function n5(r3, ...o4) {
    if (ot(r3), !Jc) throw new Error("Non little-endian hardware is not yet supported");
    if (t.nonceLength !== void 0) {
      const a4 = o4[0];
      if (!a4) throw new Error("nonce / iv required");
      t.varSizeNonce ? ot(a4) : ot(a4, t.nonceLength);
    }
    const s3 = t.tagLength;
    s3 && o4[1] !== void 0 && ot(o4[1]);
    const i4 = e2(r3, ...o4), c6 = (a4, l6) => {
      if (l6 !== void 0) {
        if (a4 !== 2) throw new Error("cipher output not supported");
        ot(l6);
      }
    };
    let f5 = false;
    return { encrypt(a4, l6) {
      if (f5) throw new Error("cannot encrypt() twice with same key + nonce");
      return f5 = true, ot(a4), c6(i4.encrypt.length, l6), i4.encrypt(a4, l6);
    }, decrypt(a4, l6) {
      if (ot(a4), s3 && a4.length < s3) throw new Error("invalid ciphertext length: smaller than tagLength=" + s3);
      return c6(i4.decrypt.length, l6), i4.decrypt(a4, l6);
    } };
  }
  return Object.assign(n5, t), n5;
};
function bo2(t, e2, n5 = true) {
  if (e2 === void 0) return new Uint8Array(t);
  if (e2.length !== t) throw new Error("invalid output length, expected " + t + ", got: " + e2.length);
  if (n5 && !of(e2)) throw new Error("invalid output, must be aligned");
  return e2;
}
function yo2(t, e2, n5, r3) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e2, n5, r3);
  const o4 = BigInt(32), s3 = BigInt(4294967295), i4 = Number(n5 >> o4 & s3), c6 = Number(n5 & s3), f5 = r3 ? 4 : 0, u2 = r3 ? 0 : 4;
  t.setUint32(e2 + f5, i4, r3), t.setUint32(e2 + u2, c6, r3);
}
function rf(t, e2, n5) {
  vn2(n5);
  const r3 = new Uint8Array(16), o4 = Xc(r3);
  return yo2(o4, 0, BigInt(e2), n5), yo2(o4, 8, BigInt(t), n5), r3;
}
function of(t) {
  return t.byteOffset % 4 === 0;
}
function Bn2(t) {
  return Uint8Array.from(t);
}
var mo2 = (t) => Uint8Array.from(t.split("").map((e2) => e2.charCodeAt(0)));
var sf = mo2("expand 16-byte k");
var cf = mo2("expand 32-byte k");
var ff = Pt2(sf);
var af = Pt2(cf);
function K4(t, e2) {
  return t << e2 | t >>> 32 - e2;
}
function In2(t) {
  return t.byteOffset % 4 === 0;
}
var Le2 = 64;
var uf = 16;
var wo2 = 2 ** 32 - 1;
var vo2 = new Uint32Array();
function lf(t, e2, n5, r3, o4, s3, i4, c6) {
  const f5 = o4.length, u2 = new Uint8Array(Le2), a4 = Pt2(u2), l6 = In2(o4) && In2(s3), d4 = l6 ? Pt2(o4) : vo2, h5 = l6 ? Pt2(s3) : vo2;
  for (let y4 = 0; y4 < f5; i4++) {
    if (t(e2, n5, r3, a4, i4, c6), i4 >= wo2) throw new Error("arx: counter overflow");
    const m3 = Math.min(Le2, f5 - y4);
    if (l6 && m3 === Le2) {
      const w3 = y4 / 4;
      if (y4 % 4 !== 0) throw new Error("arx: invalid block position");
      for (let U3 = 0, F; U3 < uf; U3++) F = w3 + U3, h5[F] = d4[F] ^ a4[U3];
      y4 += Le2;
      continue;
    }
    for (let w3 = 0, U3; w3 < m3; w3++) U3 = y4 + w3, s3[U3] = o4[U3] ^ u2[w3];
    y4 += m3;
  }
}
function df(t, e2) {
  const { allowShortKeys: n5, extendNonceFn: r3, counterLength: o4, counterRight: s3, rounds: i4 } = tf({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, e2);
  if (typeof t != "function") throw new Error("core must be a function");
  return xn2(o4), xn2(i4), vn2(s3), vn2(n5), (c6, f5, u2, a4, l6 = 0) => {
    ot(c6), ot(f5), ot(u2);
    const d4 = u2.length;
    if (a4 === void 0 && (a4 = new Uint8Array(d4)), ot(a4), xn2(l6), l6 < 0 || l6 >= wo2) throw new Error("arx: counter overflow");
    if (a4.length < d4) throw new Error(`arx: output (${a4.length}) is shorter than data (${d4})`);
    const h5 = [];
    let y4 = c6.length, m3, w3;
    if (y4 === 32) h5.push(m3 = Bn2(c6)), w3 = af;
    else if (y4 === 16 && n5) m3 = new Uint8Array(32), m3.set(c6), m3.set(c6, 16), w3 = ff, h5.push(m3);
    else throw new Error(`arx: invalid 32-byte key, got length=${y4}`);
    In2(f5) || h5.push(f5 = Bn2(f5));
    const U3 = Pt2(m3);
    if (r3) {
      if (f5.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      r3(w3, U3, Pt2(f5.subarray(0, 16)), U3), f5 = f5.subarray(16);
    }
    const F = 16 - o4;
    if (F !== f5.length) throw new Error(`arx: nonce must be ${F} or 16 bytes`);
    if (F !== 12) {
      const Z = new Uint8Array(12);
      Z.set(f5, s3 ? 0 : 12 - f5.length), f5 = Z, h5.push(f5);
    }
    const R3 = Pt2(f5);
    return lf(t, w3, U3, R3, u2, a4, l6, i4), Qt2(...h5), a4;
  };
}
var W2 = (t, e2) => t[e2++] & 255 | (t[e2++] & 255) << 8;
var hf = class {
  constructor(e2) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = false, e2 = En2(e2), ot(e2, 32);
    const n5 = W2(e2, 0), r3 = W2(e2, 2), o4 = W2(e2, 4), s3 = W2(e2, 6), i4 = W2(e2, 8), c6 = W2(e2, 10), f5 = W2(e2, 12), u2 = W2(e2, 14);
    this.r[0] = n5 & 8191, this.r[1] = (n5 >>> 13 | r3 << 3) & 8191, this.r[2] = (r3 >>> 10 | o4 << 6) & 7939, this.r[3] = (o4 >>> 7 | s3 << 9) & 8191, this.r[4] = (s3 >>> 4 | i4 << 12) & 255, this.r[5] = i4 >>> 1 & 8190, this.r[6] = (i4 >>> 14 | c6 << 2) & 8191, this.r[7] = (c6 >>> 11 | f5 << 5) & 8065, this.r[8] = (f5 >>> 8 | u2 << 8) & 8191, this.r[9] = u2 >>> 5 & 127;
    for (let a4 = 0; a4 < 8; a4++) this.pad[a4] = W2(e2, 16 + 2 * a4);
  }
  process(e2, n5, r3 = false) {
    const o4 = r3 ? 0 : 2048, { h: s3, r: i4 } = this, c6 = i4[0], f5 = i4[1], u2 = i4[2], a4 = i4[3], l6 = i4[4], d4 = i4[5], h5 = i4[6], y4 = i4[7], m3 = i4[8], w3 = i4[9], U3 = W2(e2, n5 + 0), F = W2(e2, n5 + 2), R3 = W2(e2, n5 + 4), Z = W2(e2, n5 + 6), H2 = W2(e2, n5 + 8), j6 = W2(e2, n5 + 10), L2 = W2(e2, n5 + 12), k5 = W2(e2, n5 + 14);
    let O5 = s3[0] + (U3 & 8191), T3 = s3[1] + ((U3 >>> 13 | F << 3) & 8191), C4 = s3[2] + ((F >>> 10 | R3 << 6) & 8191), _4 = s3[3] + ((R3 >>> 7 | Z << 9) & 8191), p4 = s3[4] + ((Z >>> 4 | H2 << 12) & 8191), b5 = s3[5] + (H2 >>> 1 & 8191), g3 = s3[6] + ((H2 >>> 14 | j6 << 2) & 8191), x5 = s3[7] + ((j6 >>> 11 | L2 << 5) & 8191), E4 = s3[8] + ((L2 >>> 8 | k5 << 8) & 8191), I3 = s3[9] + (k5 >>> 5 | o4), v5 = 0, B2 = v5 + O5 * c6 + T3 * (5 * w3) + C4 * (5 * m3) + _4 * (5 * y4) + p4 * (5 * h5);
    v5 = B2 >>> 13, B2 &= 8191, B2 += b5 * (5 * d4) + g3 * (5 * l6) + x5 * (5 * a4) + E4 * (5 * u2) + I3 * (5 * f5), v5 += B2 >>> 13, B2 &= 8191;
    let A3 = v5 + O5 * f5 + T3 * c6 + C4 * (5 * w3) + _4 * (5 * m3) + p4 * (5 * y4);
    v5 = A3 >>> 13, A3 &= 8191, A3 += b5 * (5 * h5) + g3 * (5 * d4) + x5 * (5 * l6) + E4 * (5 * a4) + I3 * (5 * u2), v5 += A3 >>> 13, A3 &= 8191;
    let N12 = v5 + O5 * u2 + T3 * f5 + C4 * c6 + _4 * (5 * w3) + p4 * (5 * m3);
    v5 = N12 >>> 13, N12 &= 8191, N12 += b5 * (5 * y4) + g3 * (5 * h5) + x5 * (5 * d4) + E4 * (5 * l6) + I3 * (5 * a4), v5 += N12 >>> 13, N12 &= 8191;
    let D3 = v5 + O5 * a4 + T3 * u2 + C4 * f5 + _4 * c6 + p4 * (5 * w3);
    v5 = D3 >>> 13, D3 &= 8191, D3 += b5 * (5 * m3) + g3 * (5 * y4) + x5 * (5 * h5) + E4 * (5 * d4) + I3 * (5 * l6), v5 += D3 >>> 13, D3 &= 8191;
    let P5 = v5 + O5 * l6 + T3 * a4 + C4 * u2 + _4 * f5 + p4 * c6;
    v5 = P5 >>> 13, P5 &= 8191, P5 += b5 * (5 * w3) + g3 * (5 * m3) + x5 * (5 * y4) + E4 * (5 * h5) + I3 * (5 * d4), v5 += P5 >>> 13, P5 &= 8191;
    let $3 = v5 + O5 * d4 + T3 * l6 + C4 * a4 + _4 * u2 + p4 * f5;
    v5 = $3 >>> 13, $3 &= 8191, $3 += b5 * c6 + g3 * (5 * w3) + x5 * (5 * m3) + E4 * (5 * y4) + I3 * (5 * h5), v5 += $3 >>> 13, $3 &= 8191;
    let V4 = v5 + O5 * h5 + T3 * d4 + C4 * l6 + _4 * a4 + p4 * u2;
    v5 = V4 >>> 13, V4 &= 8191, V4 += b5 * f5 + g3 * c6 + x5 * (5 * w3) + E4 * (5 * m3) + I3 * (5 * y4), v5 += V4 >>> 13, V4 &= 8191;
    let q2 = v5 + O5 * y4 + T3 * h5 + C4 * d4 + _4 * l6 + p4 * a4;
    v5 = q2 >>> 13, q2 &= 8191, q2 += b5 * u2 + g3 * f5 + x5 * c6 + E4 * (5 * w3) + I3 * (5 * m3), v5 += q2 >>> 13, q2 &= 8191;
    let G4 = v5 + O5 * m3 + T3 * y4 + C4 * h5 + _4 * d4 + p4 * l6;
    v5 = G4 >>> 13, G4 &= 8191, G4 += b5 * a4 + g3 * u2 + x5 * f5 + E4 * c6 + I3 * (5 * w3), v5 += G4 >>> 13, G4 &= 8191;
    let M5 = v5 + O5 * w3 + T3 * m3 + C4 * y4 + _4 * h5 + p4 * d4;
    v5 = M5 >>> 13, M5 &= 8191, M5 += b5 * l6 + g3 * a4 + x5 * u2 + E4 * f5 + I3 * c6, v5 += M5 >>> 13, M5 &= 8191, v5 = (v5 << 2) + v5 | 0, v5 = v5 + B2 | 0, B2 = v5 & 8191, v5 = v5 >>> 13, A3 += v5, s3[0] = B2, s3[1] = A3, s3[2] = N12, s3[3] = D3, s3[4] = P5, s3[5] = $3, s3[6] = V4, s3[7] = q2, s3[8] = G4, s3[9] = M5;
  }
  finalize() {
    const { h: e2, pad: n5 } = this, r3 = new Uint16Array(10);
    let o4 = e2[1] >>> 13;
    e2[1] &= 8191;
    for (let c6 = 2; c6 < 10; c6++) e2[c6] += o4, o4 = e2[c6] >>> 13, e2[c6] &= 8191;
    e2[0] += o4 * 5, o4 = e2[0] >>> 13, e2[0] &= 8191, e2[1] += o4, o4 = e2[1] >>> 13, e2[1] &= 8191, e2[2] += o4, r3[0] = e2[0] + 5, o4 = r3[0] >>> 13, r3[0] &= 8191;
    for (let c6 = 1; c6 < 10; c6++) r3[c6] = e2[c6] + o4, o4 = r3[c6] >>> 13, r3[c6] &= 8191;
    r3[9] -= 8192;
    let s3 = (o4 ^ 1) - 1;
    for (let c6 = 0; c6 < 10; c6++) r3[c6] &= s3;
    s3 = ~s3;
    for (let c6 = 0; c6 < 10; c6++) e2[c6] = e2[c6] & s3 | r3[c6];
    e2[0] = (e2[0] | e2[1] << 13) & 65535, e2[1] = (e2[1] >>> 3 | e2[2] << 10) & 65535, e2[2] = (e2[2] >>> 6 | e2[3] << 7) & 65535, e2[3] = (e2[3] >>> 9 | e2[4] << 4) & 65535, e2[4] = (e2[4] >>> 12 | e2[5] << 1 | e2[6] << 14) & 65535, e2[5] = (e2[6] >>> 2 | e2[7] << 11) & 65535, e2[6] = (e2[7] >>> 5 | e2[8] << 8) & 65535, e2[7] = (e2[8] >>> 8 | e2[9] << 5) & 65535;
    let i4 = e2[0] + n5[0];
    e2[0] = i4 & 65535;
    for (let c6 = 1; c6 < 8; c6++) i4 = (e2[c6] + n5[c6] | 0) + (i4 >>> 16) | 0, e2[c6] = i4 & 65535;
    Qt2(r3);
  }
  update(e2) {
    go2(this), e2 = En2(e2), ot(e2);
    const { buffer: n5, blockLen: r3 } = this, o4 = e2.length;
    for (let s3 = 0; s3 < o4; ) {
      const i4 = Math.min(r3 - this.pos, o4 - s3);
      if (i4 === r3) {
        for (; r3 <= o4 - s3; s3 += r3) this.process(e2, s3);
        continue;
      }
      n5.set(e2.subarray(s3, s3 + i4), this.pos), this.pos += i4, s3 += i4, this.pos === r3 && (this.process(n5, 0, false), this.pos = 0);
    }
    return this;
  }
  destroy() {
    Qt2(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(e2) {
    go2(this), Wc(e2, this), this.finished = true;
    const { buffer: n5, h: r3 } = this;
    let { pos: o4 } = this;
    if (o4) {
      for (n5[o4++] = 1; o4 < 16; o4++) n5[o4] = 0;
      this.process(n5, 0, true);
    }
    this.finalize();
    let s3 = 0;
    for (let i4 = 0; i4 < 8; i4++) e2[s3++] = r3[i4] >>> 0, e2[s3++] = r3[i4] >>> 8;
    return e2;
  }
  digest() {
    const { buffer: e2, outputLen: n5 } = this;
    this.digestInto(e2);
    const r3 = e2.slice(0, n5);
    return this.destroy(), r3;
  }
};
function pf(t) {
  const e2 = (r3, o4) => t(o4).update(En2(r3)).digest(), n5 = t(new Uint8Array(32));
  return e2.outputLen = n5.outputLen, e2.blockLen = n5.blockLen, e2.create = (r3) => t(r3), e2;
}
var gf = pf((t) => new hf(t));
function bf(t, e2, n5, r3, o4, s3 = 20) {
  let i4 = t[0], c6 = t[1], f5 = t[2], u2 = t[3], a4 = e2[0], l6 = e2[1], d4 = e2[2], h5 = e2[3], y4 = e2[4], m3 = e2[5], w3 = e2[6], U3 = e2[7], F = o4, R3 = n5[0], Z = n5[1], H2 = n5[2], j6 = i4, L2 = c6, k5 = f5, O5 = u2, T3 = a4, C4 = l6, _4 = d4, p4 = h5, b5 = y4, g3 = m3, x5 = w3, E4 = U3, I3 = F, v5 = R3, B2 = Z, A3 = H2;
  for (let D3 = 0; D3 < s3; D3 += 2) j6 = j6 + T3 | 0, I3 = K4(I3 ^ j6, 16), b5 = b5 + I3 | 0, T3 = K4(T3 ^ b5, 12), j6 = j6 + T3 | 0, I3 = K4(I3 ^ j6, 8), b5 = b5 + I3 | 0, T3 = K4(T3 ^ b5, 7), L2 = L2 + C4 | 0, v5 = K4(v5 ^ L2, 16), g3 = g3 + v5 | 0, C4 = K4(C4 ^ g3, 12), L2 = L2 + C4 | 0, v5 = K4(v5 ^ L2, 8), g3 = g3 + v5 | 0, C4 = K4(C4 ^ g3, 7), k5 = k5 + _4 | 0, B2 = K4(B2 ^ k5, 16), x5 = x5 + B2 | 0, _4 = K4(_4 ^ x5, 12), k5 = k5 + _4 | 0, B2 = K4(B2 ^ k5, 8), x5 = x5 + B2 | 0, _4 = K4(_4 ^ x5, 7), O5 = O5 + p4 | 0, A3 = K4(A3 ^ O5, 16), E4 = E4 + A3 | 0, p4 = K4(p4 ^ E4, 12), O5 = O5 + p4 | 0, A3 = K4(A3 ^ O5, 8), E4 = E4 + A3 | 0, p4 = K4(p4 ^ E4, 7), j6 = j6 + C4 | 0, A3 = K4(A3 ^ j6, 16), x5 = x5 + A3 | 0, C4 = K4(C4 ^ x5, 12), j6 = j6 + C4 | 0, A3 = K4(A3 ^ j6, 8), x5 = x5 + A3 | 0, C4 = K4(C4 ^ x5, 7), L2 = L2 + _4 | 0, I3 = K4(I3 ^ L2, 16), E4 = E4 + I3 | 0, _4 = K4(_4 ^ E4, 12), L2 = L2 + _4 | 0, I3 = K4(I3 ^ L2, 8), E4 = E4 + I3 | 0, _4 = K4(_4 ^ E4, 7), k5 = k5 + p4 | 0, v5 = K4(v5 ^ k5, 16), b5 = b5 + v5 | 0, p4 = K4(p4 ^ b5, 12), k5 = k5 + p4 | 0, v5 = K4(v5 ^ k5, 8), b5 = b5 + v5 | 0, p4 = K4(p4 ^ b5, 7), O5 = O5 + T3 | 0, B2 = K4(B2 ^ O5, 16), g3 = g3 + B2 | 0, T3 = K4(T3 ^ g3, 12), O5 = O5 + T3 | 0, B2 = K4(B2 ^ O5, 8), g3 = g3 + B2 | 0, T3 = K4(T3 ^ g3, 7);
  let N12 = 0;
  r3[N12++] = i4 + j6 | 0, r3[N12++] = c6 + L2 | 0, r3[N12++] = f5 + k5 | 0, r3[N12++] = u2 + O5 | 0, r3[N12++] = a4 + T3 | 0, r3[N12++] = l6 + C4 | 0, r3[N12++] = d4 + _4 | 0, r3[N12++] = h5 + p4 | 0, r3[N12++] = y4 + b5 | 0, r3[N12++] = m3 + g3 | 0, r3[N12++] = w3 + x5 | 0, r3[N12++] = U3 + E4 | 0, r3[N12++] = F + I3 | 0, r3[N12++] = R3 + v5 | 0, r3[N12++] = Z + B2 | 0, r3[N12++] = H2 + A3 | 0;
}
var yf = df(bf, { counterRight: false, counterLength: 4, allowShortKeys: false });
var mf = new Uint8Array(16);
var xo2 = (t, e2) => {
  t.update(e2);
  const n5 = e2.length % 16;
  n5 && t.update(mf.subarray(n5));
};
var wf = new Uint8Array(32);
function Eo2(t, e2, n5, r3, o4) {
  const s3 = t(e2, n5, wf), i4 = gf.create(s3);
  o4 && xo2(i4, o4), xo2(i4, r3);
  const c6 = rf(r3.length, o4 ? o4.length : 0, true);
  i4.update(c6);
  const f5 = i4.digest();
  return Qt2(s3, c6), f5;
}
var vf = (t) => (e2, n5, r3) => ({ encrypt(s3, i4) {
  const c6 = s3.length;
  i4 = bo2(c6 + 16, i4, false), i4.set(s3);
  const f5 = i4.subarray(0, -16);
  t(e2, n5, f5, f5, 1);
  const u2 = Eo2(t, e2, n5, f5, r3);
  return i4.set(u2, c6), Qt2(u2), i4;
}, decrypt(s3, i4) {
  i4 = bo2(s3.length - 16, i4, false);
  const c6 = s3.subarray(0, -16), f5 = s3.subarray(-16), u2 = Eo2(t, e2, n5, c6, r3);
  if (!ef(f5, u2)) throw new Error("invalid tag");
  return i4.set(s3.subarray(0, -16)), t(e2, n5, i4, i4, 1), Qt2(u2), i4;
} });
var Bo2 = nf({ blockSize: 64, nonceLength: 12, tagLength: 16 }, vf(yf));
var Io2 = class extends $e2 {
  constructor(e2, n5) {
    super(), this.finished = false, this.destroyed = false, _e2(e2);
    const r3 = pt(n5);
    if (this.iHash = e2.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const o4 = this.blockLen, s3 = new Uint8Array(o4);
    s3.set(r3.length > o4 ? e2.create().update(r3).digest() : r3);
    for (let i4 = 0; i4 < s3.length; i4++) s3[i4] ^= 54;
    this.iHash.update(s3), this.oHash = e2.create();
    for (let i4 = 0; i4 < s3.length; i4++) s3[i4] ^= 106;
    this.oHash.update(s3), lt2(s3);
  }
  update(e2) {
    return Nt2(this), this.iHash.update(e2), this;
  }
  digestInto(e2) {
    Nt2(this), ht2(e2, this.outputLen), this.finished = true, this.iHash.digestInto(e2), this.oHash.update(e2), this.oHash.digestInto(e2), this.destroy();
  }
  digest() {
    const e2 = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e2), e2;
  }
  _cloneInto(e2) {
    e2 || (e2 = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n5, iHash: r3, finished: o4, destroyed: s3, blockLen: i4, outputLen: c6 } = this;
    return e2 = e2, e2.finished = o4, e2.destroyed = s3, e2.blockLen = i4, e2.outputLen = c6, e2.oHash = n5._cloneInto(e2.oHash), e2.iHash = r3._cloneInto(e2.iHash), e2;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
};
var ke2 = (t, e2, n5) => new Io2(t, e2).update(n5).digest();
ke2.create = (t, e2) => new Io2(t, e2);
function xf(t, e2, n5) {
  return _e2(t), n5 === void 0 && (n5 = new Uint8Array(t.outputLen)), ke2(t, pt(n5), pt(e2));
}
var An2 = Uint8Array.from([0]);
var Ao2 = Uint8Array.of();
function Ef(t, e2, n5, r3 = 32) {
  _e2(t), mt(r3);
  const o4 = t.outputLen;
  if (r3 > 255 * o4) throw new Error("Length should be <= 255*HashLen");
  const s3 = Math.ceil(r3 / o4);
  n5 === void 0 && (n5 = Ao2);
  const i4 = new Uint8Array(s3 * o4), c6 = ke2.create(t, e2), f5 = c6._cloneInto(), u2 = new Uint8Array(c6.outputLen);
  for (let a4 = 0; a4 < s3; a4++) An2[0] = a4 + 1, f5.update(a4 === 0 ? Ao2 : u2).update(n5).update(An2).digestInto(u2), i4.set(u2, o4 * a4), c6._cloneInto(f5);
  return c6.destroy(), f5.destroy(), lt2(u2, An2), i4.slice(0, r3);
}
var Bf = (t, e2, n5, r3, o4) => Ef(t, xf(t, e2, n5), r3, o4);
var Pe2 = Te2;
var Sn2 = BigInt(0);
var On2 = BigInt(1);
function He2(t, e2 = "") {
  if (typeof t != "boolean") {
    const n5 = e2 && `"${e2}"`;
    throw new Error(n5 + "expected boolean, got type=" + typeof t);
  }
  return t;
}
function Kt2(t, e2, n5 = "") {
  const r3 = Ue2(t), o4 = t?.length, s3 = e2 !== void 0;
  if (!r3 || s3 && o4 !== e2) {
    const i4 = n5 && `"${n5}" `, c6 = s3 ? ` of length ${e2}` : "", f5 = r3 ? `length=${o4}` : `type=${typeof t}`;
    throw new Error(i4 + "expected Uint8Array" + c6 + ", got " + f5);
  }
  return t;
}
function De2(t) {
  const e2 = t.toString(16);
  return e2.length & 1 ? "0" + e2 : e2;
}
function So2(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? Sn2 : BigInt("0x" + t);
}
function Ve2(t) {
  return So2(Jt2(t));
}
function Me2(t) {
  return ht2(t), So2(Jt2(Uint8Array.from(t).reverse()));
}
function Nn2(t, e2) {
  return Re2(t.toString(16).padStart(e2 * 2, "0"));
}
function Un2(t, e2) {
  return Nn2(t, e2).reverse();
}
function tt(t, e2, n5) {
  let r3;
  if (typeof e2 == "string") try {
    r3 = Re2(e2);
  } catch (s3) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + s3);
  }
  else if (Ue2(e2)) r3 = Uint8Array.from(e2);
  else throw new Error(t + " must be hex string or Uint8Array");
  const o4 = r3.length;
  if (typeof n5 == "number" && o4 !== n5) throw new Error(t + " of length " + n5 + " expected, got " + o4);
  return r3;
}
var _n2 = (t) => typeof t == "bigint" && Sn2 <= t;
function If(t, e2, n5) {
  return _n2(t) && _n2(e2) && _n2(n5) && e2 <= t && t < n5;
}
function Rn2(t, e2, n5, r3) {
  if (!If(e2, n5, r3)) throw new Error("expected valid " + t + ": " + n5 + " <= n < " + r3 + ", got " + e2);
}
function Oo2(t) {
  let e2;
  for (e2 = 0; t > Sn2; t >>= On2, e2 += 1) ;
  return e2;
}
var me2 = (t) => (On2 << BigInt(t)) - On2;
function Af(t, e2, n5) {
  if (typeof t != "number" || t < 2) throw new Error("hashLen must be a number");
  if (typeof e2 != "number" || e2 < 2) throw new Error("qByteLen must be a number");
  if (typeof n5 != "function") throw new Error("hmacFn must be a function");
  const r3 = (h5) => new Uint8Array(h5), o4 = (h5) => Uint8Array.of(h5);
  let s3 = r3(t), i4 = r3(t), c6 = 0;
  const f5 = () => {
    s3.fill(1), i4.fill(0), c6 = 0;
  }, u2 = (...h5) => n5(i4, s3, ...h5), a4 = (h5 = r3(0)) => {
    i4 = u2(o4(0), h5), s3 = u2(), h5.length !== 0 && (i4 = u2(o4(1), h5), s3 = u2());
  }, l6 = () => {
    if (c6++ >= 1e3) throw new Error("drbg: tried 1000 values");
    let h5 = 0;
    const y4 = [];
    for (; h5 < e2; ) {
      s3 = u2();
      const m3 = s3.slice();
      y4.push(m3), h5 += s3.length;
    }
    return _t2(...y4);
  };
  return (h5, y4) => {
    f5(), a4(h5);
    let m3;
    for (; !(m3 = y4(l6())); ) a4();
    return f5(), m3;
  };
}
function Ke2(t, e2, n5 = {}) {
  if (!t || typeof t != "object") throw new Error("expected valid options object");
  function r3(o4, s3, i4) {
    const c6 = t[o4];
    if (i4 && c6 === void 0) return;
    const f5 = typeof c6;
    if (f5 !== s3 || c6 === null) throw new Error(`param "${o4}" is invalid: expected ${s3}, got ${f5}`);
  }
  Object.entries(e2).forEach(([o4, s3]) => r3(o4, s3, false)), Object.entries(n5).forEach(([o4, s3]) => r3(o4, s3, true));
}
function No2(t) {
  const e2 = /* @__PURE__ */ new WeakMap();
  return (n5, ...r3) => {
    const o4 = e2.get(n5);
    if (o4 !== void 0) return o4;
    const s3 = t(n5, ...r3);
    return e2.set(n5, s3), s3;
  };
}
var st = BigInt(0);
var nt2 = BigInt(1);
var qt2 = BigInt(2);
var Uo2 = BigInt(3);
var _o2 = BigInt(4);
var Ro2 = BigInt(5);
var Sf = BigInt(7);
var $o2 = BigInt(8);
var Of = BigInt(9);
var To2 = BigInt(16);
function ct2(t, e2) {
  const n5 = t % e2;
  return n5 >= st ? n5 : e2 + n5;
}
function gt2(t, e2, n5) {
  let r3 = t;
  for (; e2-- > st; ) r3 *= r3, r3 %= n5;
  return r3;
}
function Co2(t, e2) {
  if (t === st) throw new Error("invert: expected non-zero number");
  if (e2 <= st) throw new Error("invert: expected positive modulus, got " + e2);
  let n5 = ct2(t, e2), r3 = e2, o4 = st, s3 = nt2;
  for (; n5 !== st; ) {
    const c6 = r3 / n5, f5 = r3 % n5, u2 = o4 - s3 * c6;
    r3 = n5, n5 = f5, o4 = s3, s3 = u2;
  }
  if (r3 !== nt2) throw new Error("invert: does not exist");
  return ct2(o4, e2);
}
function $n2(t, e2, n5) {
  if (!t.eql(t.sqr(e2), n5)) throw new Error("Cannot find square root");
}
function jo2(t, e2) {
  const n5 = (t.ORDER + nt2) / _o2, r3 = t.pow(e2, n5);
  return $n2(t, r3, e2), r3;
}
function Nf(t, e2) {
  const n5 = (t.ORDER - Ro2) / $o2, r3 = t.mul(e2, qt2), o4 = t.pow(r3, n5), s3 = t.mul(e2, o4), i4 = t.mul(t.mul(s3, qt2), o4), c6 = t.mul(s3, t.sub(i4, t.ONE));
  return $n2(t, c6, e2), c6;
}
function Uf(t) {
  const e2 = Ht2(t), n5 = Lo2(t), r3 = n5(e2, e2.neg(e2.ONE)), o4 = n5(e2, r3), s3 = n5(e2, e2.neg(r3)), i4 = (t + Sf) / To2;
  return (c6, f5) => {
    let u2 = c6.pow(f5, i4), a4 = c6.mul(u2, r3);
    const l6 = c6.mul(u2, o4), d4 = c6.mul(u2, s3), h5 = c6.eql(c6.sqr(a4), f5), y4 = c6.eql(c6.sqr(l6), f5);
    u2 = c6.cmov(u2, a4, h5), a4 = c6.cmov(d4, l6, y4);
    const m3 = c6.eql(c6.sqr(a4), f5), w3 = c6.cmov(u2, a4, m3);
    return $n2(c6, w3, f5), w3;
  };
}
function Lo2(t) {
  if (t < Uo2) throw new Error("sqrt is not defined for small field");
  let e2 = t - nt2, n5 = 0;
  for (; e2 % qt2 === st; ) e2 /= qt2, n5++;
  let r3 = qt2;
  const o4 = Ht2(t);
  for (; Po2(o4, r3) === 1; ) if (r3++ > 1e3) throw new Error("Cannot find square root: probably non-prime P");
  if (n5 === 1) return jo2;
  let s3 = o4.pow(r3, e2);
  const i4 = (e2 + nt2) / qt2;
  return function(f5, u2) {
    if (f5.is0(u2)) return u2;
    if (Po2(f5, u2) !== 1) throw new Error("Cannot find square root");
    let a4 = n5, l6 = f5.mul(f5.ONE, s3), d4 = f5.pow(u2, e2), h5 = f5.pow(u2, i4);
    for (; !f5.eql(d4, f5.ONE); ) {
      if (f5.is0(d4)) return f5.ZERO;
      let y4 = 1, m3 = f5.sqr(d4);
      for (; !f5.eql(m3, f5.ONE); ) if (y4++, m3 = f5.sqr(m3), y4 === a4) throw new Error("Cannot find square root");
      const w3 = nt2 << BigInt(a4 - y4 - 1), U3 = f5.pow(l6, w3);
      a4 = y4, l6 = f5.sqr(U3), d4 = f5.mul(d4, l6), h5 = f5.mul(h5, U3);
    }
    return h5;
  };
}
function _f(t) {
  return t % _o2 === Uo2 ? jo2 : t % $o2 === Ro2 ? Nf : t % To2 === Of ? Uf(t) : Lo2(t);
}
var Rf = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function $f(t) {
  const e2 = { ORDER: "bigint", MASK: "bigint", BYTES: "number", BITS: "number" }, n5 = Rf.reduce((r3, o4) => (r3[o4] = "function", r3), e2);
  return Ke2(t, n5), t;
}
function Tf(t, e2, n5) {
  if (n5 < st) throw new Error("invalid exponent, negatives unsupported");
  if (n5 === st) return t.ONE;
  if (n5 === nt2) return e2;
  let r3 = t.ONE, o4 = e2;
  for (; n5 > st; ) n5 & nt2 && (r3 = t.mul(r3, o4)), o4 = t.sqr(o4), n5 >>= nt2;
  return r3;
}
function ko2(t, e2, n5 = false) {
  const r3 = new Array(e2.length).fill(n5 ? t.ZERO : void 0), o4 = e2.reduce((i4, c6, f5) => t.is0(c6) ? i4 : (r3[f5] = i4, t.mul(i4, c6)), t.ONE), s3 = t.inv(o4);
  return e2.reduceRight((i4, c6, f5) => t.is0(c6) ? i4 : (r3[f5] = t.mul(i4, r3[f5]), t.mul(i4, c6)), s3), r3;
}
function Po2(t, e2) {
  const n5 = (t.ORDER - nt2) / qt2, r3 = t.pow(e2, n5), o4 = t.eql(r3, t.ONE), s3 = t.eql(r3, t.ZERO), i4 = t.eql(r3, t.neg(t.ONE));
  if (!o4 && !s3 && !i4) throw new Error("invalid Legendre symbol result");
  return o4 ? 1 : s3 ? 0 : -1;
}
function Ho2(t, e2) {
  e2 !== void 0 && mt(e2);
  const n5 = e2 !== void 0 ? e2 : t.toString(2).length, r3 = Math.ceil(n5 / 8);
  return { nBitLength: n5, nByteLength: r3 };
}
function Ht2(t, e2, n5 = false, r3 = {}) {
  if (t <= st) throw new Error("invalid field: expected ORDER > 0, got " + t);
  let o4, s3, i4 = false, c6;
  if (typeof e2 == "object" && e2 != null) {
    if (r3.sqrt || n5) throw new Error("cannot specify opts in two arguments");
    const d4 = e2;
    d4.BITS && (o4 = d4.BITS), d4.sqrt && (s3 = d4.sqrt), typeof d4.isLE == "boolean" && (n5 = d4.isLE), typeof d4.modFromBytes == "boolean" && (i4 = d4.modFromBytes), c6 = d4.allowedLengths;
  } else typeof e2 == "number" && (o4 = e2), r3.sqrt && (s3 = r3.sqrt);
  const { nBitLength: f5, nByteLength: u2 } = Ho2(t, o4);
  if (u2 > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a4;
  const l6 = Object.freeze({ ORDER: t, isLE: n5, BITS: f5, BYTES: u2, MASK: me2(f5), ZERO: st, ONE: nt2, allowedLengths: c6, create: (d4) => ct2(d4, t), isValid: (d4) => {
    if (typeof d4 != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof d4);
    return st <= d4 && d4 < t;
  }, is0: (d4) => d4 === st, isValidNot0: (d4) => !l6.is0(d4) && l6.isValid(d4), isOdd: (d4) => (d4 & nt2) === nt2, neg: (d4) => ct2(-d4, t), eql: (d4, h5) => d4 === h5, sqr: (d4) => ct2(d4 * d4, t), add: (d4, h5) => ct2(d4 + h5, t), sub: (d4, h5) => ct2(d4 - h5, t), mul: (d4, h5) => ct2(d4 * h5, t), pow: (d4, h5) => Tf(l6, d4, h5), div: (d4, h5) => ct2(d4 * Co2(h5, t), t), sqrN: (d4) => d4 * d4, addN: (d4, h5) => d4 + h5, subN: (d4, h5) => d4 - h5, mulN: (d4, h5) => d4 * h5, inv: (d4) => Co2(d4, t), sqrt: s3 || ((d4) => (a4 || (a4 = _f(t)), a4(l6, d4))), toBytes: (d4) => n5 ? Un2(d4, u2) : Nn2(d4, u2), fromBytes: (d4, h5 = true) => {
    if (c6) {
      if (!c6.includes(d4.length) || d4.length > u2) throw new Error("Field.fromBytes: expected " + c6 + " bytes, got " + d4.length);
      const m3 = new Uint8Array(u2);
      m3.set(d4, n5 ? 0 : m3.length - d4.length), d4 = m3;
    }
    if (d4.length !== u2) throw new Error("Field.fromBytes: expected " + u2 + " bytes, got " + d4.length);
    let y4 = n5 ? Me2(d4) : Ve2(d4);
    if (i4 && (y4 = ct2(y4, t)), !h5 && !l6.isValid(y4)) throw new Error("invalid field element: outside of range 0..ORDER");
    return y4;
  }, invertBatch: (d4) => ko2(l6, d4), cmov: (d4, h5, y4) => y4 ? h5 : d4 });
  return Object.freeze(l6);
}
function Do2(t) {
  if (typeof t != "bigint") throw new Error("field order must be bigint");
  const e2 = t.toString(2).length;
  return Math.ceil(e2 / 8);
}
function Vo2(t) {
  const e2 = Do2(t);
  return e2 + Math.ceil(e2 / 2);
}
function Cf(t, e2, n5 = false) {
  const r3 = t.length, o4 = Do2(e2), s3 = Vo2(e2);
  if (r3 < 16 || r3 < s3 || r3 > 1024) throw new Error("expected " + s3 + "-1024 bytes of input, got " + r3);
  const i4 = n5 ? Me2(t) : Ve2(t), c6 = ct2(i4, e2 - nt2) + nt2;
  return n5 ? Un2(c6, o4) : Nn2(c6, o4);
}
var te2 = BigInt(0);
var Ft2 = BigInt(1);
function qe2(t, e2) {
  const n5 = e2.negate();
  return t ? n5 : e2;
}
function Tn2(t, e2) {
  const n5 = ko2(t.Fp, e2.map((r3) => r3.Z));
  return e2.map((r3, o4) => t.fromAffine(r3.toAffine(n5[o4])));
}
function Mo2(t, e2) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e2) throw new Error("invalid window size, expected [1.." + e2 + "], got W=" + t);
}
function Cn2(t, e2) {
  Mo2(t, e2);
  const n5 = Math.ceil(e2 / t) + 1, r3 = 2 ** (t - 1), o4 = 2 ** t, s3 = me2(t), i4 = BigInt(t);
  return { windows: n5, windowSize: r3, mask: s3, maxNumber: o4, shiftBy: i4 };
}
function Ko2(t, e2, n5) {
  const { windowSize: r3, mask: o4, maxNumber: s3, shiftBy: i4 } = n5;
  let c6 = Number(t & o4), f5 = t >> i4;
  c6 > r3 && (c6 -= s3, f5 += Ft2);
  const u2 = e2 * r3, a4 = u2 + Math.abs(c6) - 1, l6 = c6 === 0, d4 = c6 < 0, h5 = e2 % 2 !== 0;
  return { nextN: f5, offset: a4, isZero: l6, isNeg: d4, isNegF: h5, offsetF: u2 };
}
function jf(t, e2) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((n5, r3) => {
    if (!(n5 instanceof e2)) throw new Error("invalid point at index " + r3);
  });
}
function Lf(t, e2) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((n5, r3) => {
    if (!e2.isValid(n5)) throw new Error("invalid scalar at index " + r3);
  });
}
var jn2 = /* @__PURE__ */ new WeakMap();
var qo2 = /* @__PURE__ */ new WeakMap();
function Ln2(t) {
  return qo2.get(t) || 1;
}
function Fo2(t) {
  if (t !== te2) throw new Error("invalid wNAF");
}
var kf = class {
  constructor(e2, n5) {
    this.BASE = e2.BASE, this.ZERO = e2.ZERO, this.Fn = e2.Fn, this.bits = n5;
  }
  _unsafeLadder(e2, n5, r3 = this.ZERO) {
    let o4 = e2;
    for (; n5 > te2; ) n5 & Ft2 && (r3 = r3.add(o4)), o4 = o4.double(), n5 >>= Ft2;
    return r3;
  }
  precomputeWindow(e2, n5) {
    const { windows: r3, windowSize: o4 } = Cn2(n5, this.bits), s3 = [];
    let i4 = e2, c6 = i4;
    for (let f5 = 0; f5 < r3; f5++) {
      c6 = i4, s3.push(c6);
      for (let u2 = 1; u2 < o4; u2++) c6 = c6.add(i4), s3.push(c6);
      i4 = c6.double();
    }
    return s3;
  }
  wNAF(e2, n5, r3) {
    if (!this.Fn.isValid(r3)) throw new Error("invalid scalar");
    let o4 = this.ZERO, s3 = this.BASE;
    const i4 = Cn2(e2, this.bits);
    for (let c6 = 0; c6 < i4.windows; c6++) {
      const { nextN: f5, offset: u2, isZero: a4, isNeg: l6, isNegF: d4, offsetF: h5 } = Ko2(r3, c6, i4);
      r3 = f5, a4 ? s3 = s3.add(qe2(d4, n5[h5])) : o4 = o4.add(qe2(l6, n5[u2]));
    }
    return Fo2(r3), { p: o4, f: s3 };
  }
  wNAFUnsafe(e2, n5, r3, o4 = this.ZERO) {
    const s3 = Cn2(e2, this.bits);
    for (let i4 = 0; i4 < s3.windows && r3 !== te2; i4++) {
      const { nextN: c6, offset: f5, isZero: u2, isNeg: a4 } = Ko2(r3, i4, s3);
      if (r3 = c6, !u2) {
        const l6 = n5[f5];
        o4 = o4.add(a4 ? l6.negate() : l6);
      }
    }
    return Fo2(r3), o4;
  }
  getPrecomputes(e2, n5, r3) {
    let o4 = jn2.get(n5);
    return o4 || (o4 = this.precomputeWindow(n5, e2), e2 !== 1 && (typeof r3 == "function" && (o4 = r3(o4)), jn2.set(n5, o4))), o4;
  }
  cached(e2, n5, r3) {
    const o4 = Ln2(e2);
    return this.wNAF(o4, this.getPrecomputes(o4, e2, r3), n5);
  }
  unsafe(e2, n5, r3, o4) {
    const s3 = Ln2(e2);
    return s3 === 1 ? this._unsafeLadder(e2, n5, o4) : this.wNAFUnsafe(s3, this.getPrecomputes(s3, e2, r3), n5, o4);
  }
  createCache(e2, n5) {
    Mo2(n5, this.bits), qo2.set(e2, n5), jn2.delete(e2);
  }
  hasCache(e2) {
    return Ln2(e2) !== 1;
  }
};
function Pf(t, e2, n5, r3) {
  let o4 = e2, s3 = t.ZERO, i4 = t.ZERO;
  for (; n5 > te2 || r3 > te2; ) n5 & Ft2 && (s3 = s3.add(o4)), r3 & Ft2 && (i4 = i4.add(o4)), o4 = o4.double(), n5 >>= Ft2, r3 >>= Ft2;
  return { p1: s3, p2: i4 };
}
function Hf(t, e2, n5, r3) {
  jf(n5, t), Lf(r3, e2);
  const o4 = n5.length, s3 = r3.length;
  if (o4 !== s3) throw new Error("arrays of points and scalars must have equal length");
  const i4 = t.ZERO, c6 = Oo2(BigInt(o4));
  let f5 = 1;
  c6 > 12 ? f5 = c6 - 3 : c6 > 4 ? f5 = c6 - 2 : c6 > 0 && (f5 = 2);
  const u2 = me2(f5), a4 = new Array(Number(u2) + 1).fill(i4), l6 = Math.floor((e2.BITS - 1) / f5) * f5;
  let d4 = i4;
  for (let h5 = l6; h5 >= 0; h5 -= f5) {
    a4.fill(i4);
    for (let m3 = 0; m3 < s3; m3++) {
      const w3 = r3[m3], U3 = Number(w3 >> BigInt(h5) & u2);
      a4[U3] = a4[U3].add(n5[m3]);
    }
    let y4 = i4;
    for (let m3 = a4.length - 1, w3 = i4; m3 > 0; m3--) w3 = w3.add(a4[m3]), y4 = y4.add(w3);
    if (d4 = d4.add(y4), h5 !== 0) for (let m3 = 0; m3 < f5; m3++) d4 = d4.double();
  }
  return d4;
}
function Zo2(t, e2, n5) {
  if (e2) {
    if (e2.ORDER !== t) throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    return $f(e2), e2;
  } else return Ht2(t, { isLE: n5 });
}
function Df(t, e2, n5 = {}, r3) {
  if (r3 === void 0 && (r3 = t === "edwards"), !e2 || typeof e2 != "object") throw new Error(`expected valid ${t} CURVE object`);
  for (const f5 of ["p", "n", "h"]) {
    const u2 = e2[f5];
    if (!(typeof u2 == "bigint" && u2 > te2)) throw new Error(`CURVE.${f5} must be positive bigint`);
  }
  const o4 = Zo2(e2.p, n5.Fp, r3), s3 = Zo2(e2.n, n5.Fn, r3), c6 = ["Gx", "Gy", "a", t === "weierstrass" ? "b" : "d"];
  for (const f5 of c6) if (!o4.isValid(e2[f5])) throw new Error(`CURVE.${f5} must be valid field element of CURVE.Fp`);
  return e2 = Object.freeze(Object.assign({}, e2)), { CURVE: e2, Fp: o4, Fn: s3 };
}
BigInt(0), BigInt(1), BigInt(2), BigInt(8), kr2("HashToScalar-");
var we2 = BigInt(0);
var ee = BigInt(1);
var Fe = BigInt(2);
function Vf(t) {
  return Ke2(t, { adjustScalarBytes: "function", powPminus2: "function" }), Object.freeze({ ...t });
}
function Mf(t) {
  const e2 = Vf(t), { P: n5, type: r3, adjustScalarBytes: o4, powPminus2: s3, randomBytes: i4 } = e2, c6 = r3 === "x25519";
  if (!c6 && r3 !== "x448") throw new Error("invalid type");
  const f5 = i4 || Mt2, u2 = c6 ? 255 : 448, a4 = c6 ? 32 : 56, l6 = BigInt(c6 ? 9 : 5), d4 = BigInt(c6 ? 121665 : 39081), h5 = c6 ? Fe ** BigInt(254) : Fe ** BigInt(447), y4 = c6 ? BigInt(8) * Fe ** BigInt(251) - ee : BigInt(4) * Fe ** BigInt(445) - ee, m3 = h5 + y4 + ee, w3 = (p4) => ct2(p4, n5), U3 = F(l6);
  function F(p4) {
    return Un2(w3(p4), a4);
  }
  function R3(p4) {
    const b5 = tt("u coordinate", p4, a4);
    return c6 && (b5[31] &= 127), w3(Me2(b5));
  }
  function Z(p4) {
    return Me2(o4(tt("scalar", p4, a4)));
  }
  function H2(p4, b5) {
    const g3 = k5(R3(b5), Z(p4));
    if (g3 === we2) throw new Error("invalid private or public key received");
    return F(g3);
  }
  function j6(p4) {
    return H2(p4, U3);
  }
  function L2(p4, b5, g3) {
    const x5 = w3(p4 * (b5 - g3));
    return b5 = w3(b5 - x5), g3 = w3(g3 + x5), { x_2: b5, x_3: g3 };
  }
  function k5(p4, b5) {
    Rn2("u", p4, we2, n5), Rn2("scalar", b5, h5, m3);
    const g3 = b5, x5 = p4;
    let E4 = ee, I3 = we2, v5 = p4, B2 = ee, A3 = we2;
    for (let D3 = BigInt(u2 - 1); D3 >= we2; D3--) {
      const P5 = g3 >> D3 & ee;
      A3 ^= P5, { x_2: E4, x_3: v5 } = L2(A3, E4, v5), { x_2: I3, x_3: B2 } = L2(A3, I3, B2), A3 = P5;
      const $3 = E4 + I3, V4 = w3($3 * $3), q2 = E4 - I3, G4 = w3(q2 * q2), M5 = V4 - G4, Y3 = v5 + B2, Yt3 = v5 - B2, ce2 = w3(Yt3 * $3), fe3 = w3(Y3 * q2), Qn3 = ce2 + fe3, tr2 = ce2 - fe3;
      v5 = w3(Qn3 * Qn3), B2 = w3(x5 * w3(tr2 * tr2)), E4 = w3(V4 * G4), I3 = w3(M5 * (V4 + w3(d4 * M5)));
    }
    ({ x_2: E4, x_3: v5 } = L2(A3, E4, v5)), { x_2: I3, x_3: B2 } = L2(A3, I3, B2);
    const N12 = s3(I3);
    return w3(E4 * N12);
  }
  const O5 = { secretKey: a4, publicKey: a4, seed: a4 }, T3 = (p4 = f5(a4)) => (ht2(p4, O5.seed), p4);
  function C4(p4) {
    const b5 = T3(p4);
    return { secretKey: b5, publicKey: j6(b5) };
  }
  return { keygen: C4, getSharedSecret: (p4, b5) => H2(p4, b5), getPublicKey: (p4) => j6(p4), scalarMult: H2, scalarMultBase: j6, utils: { randomSecretKey: T3, randomPrivateKey: T3 }, GuBytes: U3.slice(), lengths: O5 };
}
var Kf = BigInt(1);
var Go2 = BigInt(2);
var qf = BigInt(3);
var Ff = BigInt(5);
var Zf = BigInt(8);
var zo2 = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed");
var Gf = { p: zo2, n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"), h: Zf, a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"), d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"), Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"), Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658") };
function zf(t) {
  const e2 = BigInt(10), n5 = BigInt(20), r3 = BigInt(40), o4 = BigInt(80), s3 = zo2, c6 = t * t % s3 * t % s3, f5 = gt2(c6, Go2, s3) * c6 % s3, u2 = gt2(f5, Kf, s3) * t % s3, a4 = gt2(u2, Ff, s3) * u2 % s3, l6 = gt2(a4, e2, s3) * a4 % s3, d4 = gt2(l6, n5, s3) * l6 % s3, h5 = gt2(d4, r3, s3) * d4 % s3, y4 = gt2(h5, o4, s3) * h5 % s3, m3 = gt2(y4, o4, s3) * h5 % s3, w3 = gt2(m3, e2, s3) * a4 % s3;
  return { pow_p_5_8: gt2(w3, Go2, s3) * t % s3, b2: c6 };
}
function Yf(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
var Wf = Ht2(Gf.p, { isLE: true });
var kn2 = (() => {
  const t = Wf.ORDER;
  return Mf({ P: t, type: "x25519", powPminus2: (e2) => {
    const { pow_p_5_8: n5, b2: r3 } = zf(e2);
    return ct2(gt2(n5, qf, t) * r3, t);
  }, adjustScalarBytes: Yf });
})();
var Yo2 = (t, e2) => (t + (t >= 0 ? e2 : -e2) / Wo2) / e2;
function Xf(t, e2, n5) {
  const [[r3, o4], [s3, i4]] = e2, c6 = Yo2(i4 * t, n5), f5 = Yo2(-o4 * t, n5);
  let u2 = t - c6 * r3 - f5 * s3, a4 = -c6 * o4 - f5 * i4;
  const l6 = u2 < Et2, d4 = a4 < Et2;
  l6 && (u2 = -u2), d4 && (a4 = -a4);
  const h5 = me2(Math.ceil(Oo2(n5) / 2)) + ne;
  if (u2 < Et2 || u2 >= h5 || a4 < Et2 || a4 >= h5) throw new Error("splitScalar (endomorphism): failed, k=" + t);
  return { k1neg: l6, k1: u2, k2neg: d4, k2: a4 };
}
function Pn2(t) {
  if (!["compact", "recovered", "der"].includes(t)) throw new Error('Signature format must be "compact", "recovered", or "der"');
  return t;
}
function Hn2(t, e2) {
  const n5 = {};
  for (let r3 of Object.keys(e2)) n5[r3] = t[r3] === void 0 ? e2[r3] : t[r3];
  return He2(n5.lowS, "lowS"), He2(n5.prehash, "prehash"), n5.format !== void 0 && Pn2(n5.format), n5;
}
var Jf = class extends Error {
  constructor(e2 = "") {
    super(e2);
  }
};
var xt2 = { Err: Jf, _tlv: { encode: (t, e2) => {
  const { Err: n5 } = xt2;
  if (t < 0 || t > 256) throw new n5("tlv.encode: wrong tag");
  if (e2.length & 1) throw new n5("tlv.encode: unpadded data");
  const r3 = e2.length / 2, o4 = De2(r3);
  if (o4.length / 2 & 128) throw new n5("tlv.encode: long form length too big");
  const s3 = r3 > 127 ? De2(o4.length / 2 | 128) : "";
  return De2(t) + s3 + o4 + e2;
}, decode(t, e2) {
  const { Err: n5 } = xt2;
  let r3 = 0;
  if (t < 0 || t > 256) throw new n5("tlv.encode: wrong tag");
  if (e2.length < 2 || e2[r3++] !== t) throw new n5("tlv.decode: wrong tlv");
  const o4 = e2[r3++], s3 = !!(o4 & 128);
  let i4 = 0;
  if (!s3) i4 = o4;
  else {
    const f5 = o4 & 127;
    if (!f5) throw new n5("tlv.decode(long): indefinite length not supported");
    if (f5 > 4) throw new n5("tlv.decode(long): byte length is too big");
    const u2 = e2.subarray(r3, r3 + f5);
    if (u2.length !== f5) throw new n5("tlv.decode: length bytes not complete");
    if (u2[0] === 0) throw new n5("tlv.decode(long): zero leftmost byte");
    for (const a4 of u2) i4 = i4 << 8 | a4;
    if (r3 += f5, i4 < 128) throw new n5("tlv.decode(long): not minimal encoding");
  }
  const c6 = e2.subarray(r3, r3 + i4);
  if (c6.length !== i4) throw new n5("tlv.decode: wrong value length");
  return { v: c6, l: e2.subarray(r3 + i4) };
} }, _int: { encode(t) {
  const { Err: e2 } = xt2;
  if (t < Et2) throw new e2("integer: negative integers are not allowed");
  let n5 = De2(t);
  if (Number.parseInt(n5[0], 16) & 8 && (n5 = "00" + n5), n5.length & 1) throw new e2("unexpected DER parsing assertion: unpadded hex");
  return n5;
}, decode(t) {
  const { Err: e2 } = xt2;
  if (t[0] & 128) throw new e2("invalid signature integer: negative");
  if (t[0] === 0 && !(t[1] & 128)) throw new e2("invalid signature integer: unnecessary leading zero");
  return Ve2(t);
} }, toSig(t) {
  const { Err: e2, _int: n5, _tlv: r3 } = xt2, o4 = tt("signature", t), { v: s3, l: i4 } = r3.decode(48, o4);
  if (i4.length) throw new e2("invalid signature: left bytes after parsing");
  const { v: c6, l: f5 } = r3.decode(2, s3), { v: u2, l: a4 } = r3.decode(2, f5);
  if (a4.length) throw new e2("invalid signature: left bytes after parsing");
  return { r: n5.decode(c6), s: n5.decode(u2) };
}, hexFromSig(t) {
  const { _tlv: e2, _int: n5 } = xt2, r3 = e2.encode(2, n5.encode(t.r)), o4 = e2.encode(2, n5.encode(t.s)), s3 = r3 + o4;
  return e2.encode(48, s3);
} };
var Et2 = BigInt(0);
var ne = BigInt(1);
var Wo2 = BigInt(2);
var Ze2 = BigInt(3);
var Qf = BigInt(4);
function re(t, e2) {
  const { BYTES: n5 } = t;
  let r3;
  if (typeof e2 == "bigint") r3 = e2;
  else {
    let o4 = tt("private key", e2);
    try {
      r3 = t.fromBytes(o4);
    } catch {
      throw new Error(`invalid private key: expected ui8a of size ${n5}, got ${typeof e2}`);
    }
  }
  if (!t.isValidNot0(r3)) throw new Error("invalid private key: out of range [1..N-1]");
  return r3;
}
function ta(t, e2 = {}) {
  const n5 = Df("weierstrass", t, e2), { Fp: r3, Fn: o4 } = n5;
  let s3 = n5.CURVE;
  const { h: i4, n: c6 } = s3;
  Ke2(e2, {}, { allowInfinityPoint: "boolean", clearCofactor: "function", isTorsionFree: "function", fromBytes: "function", toBytes: "function", endo: "object", wrapPrivateKey: "boolean" });
  const { endo: f5 } = e2;
  if (f5 && (!r3.is0(s3.a) || typeof f5.beta != "bigint" || !Array.isArray(f5.basises))) throw new Error('invalid endo: expected "beta": bigint and "basises": array');
  const u2 = Jo2(r3, o4);
  function a4() {
    if (!r3.isOdd) throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function l6(_4, p4, b5) {
    const { x: g3, y: x5 } = p4.toAffine(), E4 = r3.toBytes(g3);
    if (He2(b5, "isCompressed"), b5) {
      a4();
      const I3 = !r3.isOdd(x5);
      return _t2(Xo(I3), E4);
    } else return _t2(Uint8Array.of(4), E4, r3.toBytes(x5));
  }
  function d4(_4) {
    Kt2(_4, void 0, "Point");
    const { publicKey: p4, publicKeyUncompressed: b5 } = u2, g3 = _4.length, x5 = _4[0], E4 = _4.subarray(1);
    if (g3 === p4 && (x5 === 2 || x5 === 3)) {
      const I3 = r3.fromBytes(E4);
      if (!r3.isValid(I3)) throw new Error("bad point: is not on curve, wrong x");
      const v5 = m3(I3);
      let B2;
      try {
        B2 = r3.sqrt(v5);
      } catch (D3) {
        const P5 = D3 instanceof Error ? ": " + D3.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + P5);
      }
      a4();
      const A3 = r3.isOdd(B2);
      return (x5 & 1) === 1 !== A3 && (B2 = r3.neg(B2)), { x: I3, y: B2 };
    } else if (g3 === b5 && x5 === 4) {
      const I3 = r3.BYTES, v5 = r3.fromBytes(E4.subarray(0, I3)), B2 = r3.fromBytes(E4.subarray(I3, I3 * 2));
      if (!w3(v5, B2)) throw new Error("bad point: is not on curve");
      return { x: v5, y: B2 };
    } else throw new Error(`bad point: got length ${g3}, expected compressed=${p4} or uncompressed=${b5}`);
  }
  const h5 = e2.toBytes || l6, y4 = e2.fromBytes || d4;
  function m3(_4) {
    const p4 = r3.sqr(_4), b5 = r3.mul(p4, _4);
    return r3.add(r3.add(b5, r3.mul(_4, s3.a)), s3.b);
  }
  function w3(_4, p4) {
    const b5 = r3.sqr(p4), g3 = m3(_4);
    return r3.eql(b5, g3);
  }
  if (!w3(s3.Gx, s3.Gy)) throw new Error("bad curve params: generator point");
  const U3 = r3.mul(r3.pow(s3.a, Ze2), Qf), F = r3.mul(r3.sqr(s3.b), BigInt(27));
  if (r3.is0(r3.add(U3, F))) throw new Error("bad curve params: a or b");
  function R3(_4, p4, b5 = false) {
    if (!r3.isValid(p4) || b5 && r3.is0(p4)) throw new Error(`bad point coordinate ${_4}`);
    return p4;
  }
  function Z(_4) {
    if (!(_4 instanceof O5)) throw new Error("ProjectivePoint expected");
  }
  function H2(_4) {
    if (!f5 || !f5.basises) throw new Error("no endo");
    return Xf(_4, f5.basises, o4.ORDER);
  }
  const j6 = No2((_4, p4) => {
    const { X: b5, Y: g3, Z: x5 } = _4;
    if (r3.eql(x5, r3.ONE)) return { x: b5, y: g3 };
    const E4 = _4.is0();
    p4 == null && (p4 = E4 ? r3.ONE : r3.inv(x5));
    const I3 = r3.mul(b5, p4), v5 = r3.mul(g3, p4), B2 = r3.mul(x5, p4);
    if (E4) return { x: r3.ZERO, y: r3.ZERO };
    if (!r3.eql(B2, r3.ONE)) throw new Error("invZ was invalid");
    return { x: I3, y: v5 };
  }), L2 = No2((_4) => {
    if (_4.is0()) {
      if (e2.allowInfinityPoint && !r3.is0(_4.Y)) return;
      throw new Error("bad point: ZERO");
    }
    const { x: p4, y: b5 } = _4.toAffine();
    if (!r3.isValid(p4) || !r3.isValid(b5)) throw new Error("bad point: x or y not field elements");
    if (!w3(p4, b5)) throw new Error("bad point: equation left != right");
    if (!_4.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  function k5(_4, p4, b5, g3, x5) {
    return b5 = new O5(r3.mul(b5.X, _4), b5.Y, b5.Z), p4 = qe2(g3, p4), b5 = qe2(x5, b5), p4.add(b5);
  }
  class O5 {
    constructor(p4, b5, g3) {
      this.X = R3("x", p4), this.Y = R3("y", b5, true), this.Z = R3("z", g3), Object.freeze(this);
    }
    static CURVE() {
      return s3;
    }
    static fromAffine(p4) {
      const { x: b5, y: g3 } = p4 || {};
      if (!p4 || !r3.isValid(b5) || !r3.isValid(g3)) throw new Error("invalid affine point");
      if (p4 instanceof O5) throw new Error("projective point not allowed");
      return r3.is0(b5) && r3.is0(g3) ? O5.ZERO : new O5(b5, g3, r3.ONE);
    }
    static fromBytes(p4) {
      const b5 = O5.fromAffine(y4(Kt2(p4, void 0, "point")));
      return b5.assertValidity(), b5;
    }
    static fromHex(p4) {
      return O5.fromBytes(tt("pointHex", p4));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(p4 = 8, b5 = true) {
      return C4.createCache(this, p4), b5 || this.multiply(Ze2), this;
    }
    assertValidity() {
      L2(this);
    }
    hasEvenY() {
      const { y: p4 } = this.toAffine();
      if (!r3.isOdd) throw new Error("Field doesn't support isOdd");
      return !r3.isOdd(p4);
    }
    equals(p4) {
      Z(p4);
      const { X: b5, Y: g3, Z: x5 } = this, { X: E4, Y: I3, Z: v5 } = p4, B2 = r3.eql(r3.mul(b5, v5), r3.mul(E4, x5)), A3 = r3.eql(r3.mul(g3, v5), r3.mul(I3, x5));
      return B2 && A3;
    }
    negate() {
      return new O5(this.X, r3.neg(this.Y), this.Z);
    }
    double() {
      const { a: p4, b: b5 } = s3, g3 = r3.mul(b5, Ze2), { X: x5, Y: E4, Z: I3 } = this;
      let v5 = r3.ZERO, B2 = r3.ZERO, A3 = r3.ZERO, N12 = r3.mul(x5, x5), D3 = r3.mul(E4, E4), P5 = r3.mul(I3, I3), $3 = r3.mul(x5, E4);
      return $3 = r3.add($3, $3), A3 = r3.mul(x5, I3), A3 = r3.add(A3, A3), v5 = r3.mul(p4, A3), B2 = r3.mul(g3, P5), B2 = r3.add(v5, B2), v5 = r3.sub(D3, B2), B2 = r3.add(D3, B2), B2 = r3.mul(v5, B2), v5 = r3.mul($3, v5), A3 = r3.mul(g3, A3), P5 = r3.mul(p4, P5), $3 = r3.sub(N12, P5), $3 = r3.mul(p4, $3), $3 = r3.add($3, A3), A3 = r3.add(N12, N12), N12 = r3.add(A3, N12), N12 = r3.add(N12, P5), N12 = r3.mul(N12, $3), B2 = r3.add(B2, N12), P5 = r3.mul(E4, I3), P5 = r3.add(P5, P5), N12 = r3.mul(P5, $3), v5 = r3.sub(v5, N12), A3 = r3.mul(P5, D3), A3 = r3.add(A3, A3), A3 = r3.add(A3, A3), new O5(v5, B2, A3);
    }
    add(p4) {
      Z(p4);
      const { X: b5, Y: g3, Z: x5 } = this, { X: E4, Y: I3, Z: v5 } = p4;
      let B2 = r3.ZERO, A3 = r3.ZERO, N12 = r3.ZERO;
      const D3 = s3.a, P5 = r3.mul(s3.b, Ze2);
      let $3 = r3.mul(b5, E4), V4 = r3.mul(g3, I3), q2 = r3.mul(x5, v5), G4 = r3.add(b5, g3), M5 = r3.add(E4, I3);
      G4 = r3.mul(G4, M5), M5 = r3.add($3, V4), G4 = r3.sub(G4, M5), M5 = r3.add(b5, x5);
      let Y3 = r3.add(E4, v5);
      return M5 = r3.mul(M5, Y3), Y3 = r3.add($3, q2), M5 = r3.sub(M5, Y3), Y3 = r3.add(g3, x5), B2 = r3.add(I3, v5), Y3 = r3.mul(Y3, B2), B2 = r3.add(V4, q2), Y3 = r3.sub(Y3, B2), N12 = r3.mul(D3, M5), B2 = r3.mul(P5, q2), N12 = r3.add(B2, N12), B2 = r3.sub(V4, N12), N12 = r3.add(V4, N12), A3 = r3.mul(B2, N12), V4 = r3.add($3, $3), V4 = r3.add(V4, $3), q2 = r3.mul(D3, q2), M5 = r3.mul(P5, M5), V4 = r3.add(V4, q2), q2 = r3.sub($3, q2), q2 = r3.mul(D3, q2), M5 = r3.add(M5, q2), $3 = r3.mul(V4, M5), A3 = r3.add(A3, $3), $3 = r3.mul(Y3, M5), B2 = r3.mul(G4, B2), B2 = r3.sub(B2, $3), $3 = r3.mul(G4, V4), N12 = r3.mul(Y3, N12), N12 = r3.add(N12, $3), new O5(B2, A3, N12);
    }
    subtract(p4) {
      return this.add(p4.negate());
    }
    is0() {
      return this.equals(O5.ZERO);
    }
    multiply(p4) {
      const { endo: b5 } = e2;
      if (!o4.isValidNot0(p4)) throw new Error("invalid scalar: out of range");
      let g3, x5;
      const E4 = (I3) => C4.cached(this, I3, (v5) => Tn2(O5, v5));
      if (b5) {
        const { k1neg: I3, k1: v5, k2neg: B2, k2: A3 } = H2(p4), { p: N12, f: D3 } = E4(v5), { p: P5, f: $3 } = E4(A3);
        x5 = D3.add($3), g3 = k5(b5.beta, N12, P5, I3, B2);
      } else {
        const { p: I3, f: v5 } = E4(p4);
        g3 = I3, x5 = v5;
      }
      return Tn2(O5, [g3, x5])[0];
    }
    multiplyUnsafe(p4) {
      const { endo: b5 } = e2, g3 = this;
      if (!o4.isValid(p4)) throw new Error("invalid scalar: out of range");
      if (p4 === Et2 || g3.is0()) return O5.ZERO;
      if (p4 === ne) return g3;
      if (C4.hasCache(this)) return this.multiply(p4);
      if (b5) {
        const { k1neg: x5, k1: E4, k2neg: I3, k2: v5 } = H2(p4), { p1: B2, p2: A3 } = Pf(O5, g3, E4, v5);
        return k5(b5.beta, B2, A3, x5, I3);
      } else return C4.unsafe(g3, p4);
    }
    multiplyAndAddUnsafe(p4, b5, g3) {
      const x5 = this.multiplyUnsafe(b5).add(p4.multiplyUnsafe(g3));
      return x5.is0() ? void 0 : x5;
    }
    toAffine(p4) {
      return j6(this, p4);
    }
    isTorsionFree() {
      const { isTorsionFree: p4 } = e2;
      return i4 === ne ? true : p4 ? p4(O5, this) : C4.unsafe(this, c6).is0();
    }
    clearCofactor() {
      const { clearCofactor: p4 } = e2;
      return i4 === ne ? this : p4 ? p4(O5, this) : this.multiplyUnsafe(i4);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(i4).is0();
    }
    toBytes(p4 = true) {
      return He2(p4, "isCompressed"), this.assertValidity(), h5(O5, this, p4);
    }
    toHex(p4 = true) {
      return Jt2(this.toBytes(p4));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(p4 = true) {
      return this.toBytes(p4);
    }
    _setWindowSize(p4) {
      this.precompute(p4);
    }
    static normalizeZ(p4) {
      return Tn2(O5, p4);
    }
    static msm(p4, b5) {
      return Hf(O5, o4, p4, b5);
    }
    static fromPrivateKey(p4) {
      return O5.BASE.multiply(re(o4, p4));
    }
  }
  O5.BASE = new O5(s3.Gx, s3.Gy, r3.ONE), O5.ZERO = new O5(r3.ZERO, r3.ONE, r3.ZERO), O5.Fp = r3, O5.Fn = o4;
  const T3 = o4.BITS, C4 = new kf(O5, e2.endo ? Math.ceil(T3 / 2) : T3);
  return O5.BASE.precompute(8), O5;
}
function Xo(t) {
  return Uint8Array.of(t ? 2 : 3);
}
function Jo2(t, e2) {
  return { secretKey: e2.BYTES, publicKey: 1 + t.BYTES, publicKeyUncompressed: 1 + 2 * t.BYTES, publicKeyHasPrefix: true, signature: 2 * e2.BYTES };
}
function ea(t, e2 = {}) {
  const { Fn: n5 } = t, r3 = e2.randomBytes || Mt2, o4 = Object.assign(Jo2(t.Fp, n5), { seed: Vo2(n5.ORDER) });
  function s3(h5) {
    try {
      return !!re(n5, h5);
    } catch {
      return false;
    }
  }
  function i4(h5, y4) {
    const { publicKey: m3, publicKeyUncompressed: w3 } = o4;
    try {
      const U3 = h5.length;
      return y4 === true && U3 !== m3 || y4 === false && U3 !== w3 ? false : !!t.fromBytes(h5);
    } catch {
      return false;
    }
  }
  function c6(h5 = r3(o4.seed)) {
    return Cf(Kt2(h5, o4.seed, "seed"), n5.ORDER);
  }
  function f5(h5, y4 = true) {
    return t.BASE.multiply(re(n5, h5)).toBytes(y4);
  }
  function u2(h5) {
    const y4 = c6(h5);
    return { secretKey: y4, publicKey: f5(y4) };
  }
  function a4(h5) {
    if (typeof h5 == "bigint") return false;
    if (h5 instanceof t) return true;
    const { secretKey: y4, publicKey: m3, publicKeyUncompressed: w3 } = o4;
    if (n5.allowedLengths || y4 === m3) return;
    const U3 = tt("key", h5).length;
    return U3 === m3 || U3 === w3;
  }
  function l6(h5, y4, m3 = true) {
    if (a4(h5) === true) throw new Error("first arg must be private key");
    if (a4(y4) === false) throw new Error("second arg must be public key");
    const w3 = re(n5, h5);
    return t.fromHex(y4).multiply(w3).toBytes(m3);
  }
  return Object.freeze({ getPublicKey: f5, getSharedSecret: l6, keygen: u2, Point: t, utils: { isValidSecretKey: s3, isValidPublicKey: i4, randomSecretKey: c6, isValidPrivateKey: s3, randomPrivateKey: c6, normPrivateKeyToScalar: (h5) => re(n5, h5), precompute(h5 = 8, y4 = t.BASE) {
    return y4.precompute(h5, false);
  } }, lengths: o4 });
}
function na(t, e2, n5 = {}) {
  _e2(e2), Ke2(n5, {}, { hmac: "function", lowS: "boolean", randomBytes: "function", bits2int: "function", bits2int_modN: "function" });
  const r3 = n5.randomBytes || Mt2, o4 = n5.hmac || ((b5, ...g3) => ke2(e2, b5, _t2(...g3))), { Fp: s3, Fn: i4 } = t, { ORDER: c6, BITS: f5 } = i4, { keygen: u2, getPublicKey: a4, getSharedSecret: l6, utils: d4, lengths: h5 } = ea(t, n5), y4 = { prehash: false, lowS: typeof n5.lowS == "boolean" ? n5.lowS : false, format: void 0, extraEntropy: false }, m3 = "compact";
  function w3(b5) {
    const g3 = c6 >> ne;
    return b5 > g3;
  }
  function U3(b5, g3) {
    if (!i4.isValidNot0(g3)) throw new Error(`invalid signature ${b5}: out of range 1..Point.Fn.ORDER`);
    return g3;
  }
  function F(b5, g3) {
    Pn2(g3);
    const x5 = h5.signature, E4 = g3 === "compact" ? x5 : g3 === "recovered" ? x5 + 1 : void 0;
    return Kt2(b5, E4, `${g3} signature`);
  }
  class R3 {
    constructor(g3, x5, E4) {
      this.r = U3("r", g3), this.s = U3("s", x5), E4 != null && (this.recovery = E4), Object.freeze(this);
    }
    static fromBytes(g3, x5 = m3) {
      F(g3, x5);
      let E4;
      if (x5 === "der") {
        const { r: A3, s: N12 } = xt2.toSig(Kt2(g3));
        return new R3(A3, N12);
      }
      x5 === "recovered" && (E4 = g3[0], x5 = "compact", g3 = g3.subarray(1));
      const I3 = i4.BYTES, v5 = g3.subarray(0, I3), B2 = g3.subarray(I3, I3 * 2);
      return new R3(i4.fromBytes(v5), i4.fromBytes(B2), E4);
    }
    static fromHex(g3, x5) {
      return this.fromBytes(Re2(g3), x5);
    }
    addRecoveryBit(g3) {
      return new R3(this.r, this.s, g3);
    }
    recoverPublicKey(g3) {
      const x5 = s3.ORDER, { r: E4, s: I3, recovery: v5 } = this;
      if (v5 == null || ![0, 1, 2, 3].includes(v5)) throw new Error("recovery id invalid");
      if (c6 * Wo2 < x5 && v5 > 1) throw new Error("recovery id is ambiguous for h>1 curve");
      const A3 = v5 === 2 || v5 === 3 ? E4 + c6 : E4;
      if (!s3.isValid(A3)) throw new Error("recovery id 2 or 3 invalid");
      const N12 = s3.toBytes(A3), D3 = t.fromBytes(_t2(Xo((v5 & 1) === 0), N12)), P5 = i4.inv(A3), $3 = H2(tt("msgHash", g3)), V4 = i4.create(-$3 * P5), q2 = i4.create(I3 * P5), G4 = t.BASE.multiplyUnsafe(V4).add(D3.multiplyUnsafe(q2));
      if (G4.is0()) throw new Error("point at infinify");
      return G4.assertValidity(), G4;
    }
    hasHighS() {
      return w3(this.s);
    }
    toBytes(g3 = m3) {
      if (Pn2(g3), g3 === "der") return Re2(xt2.hexFromSig(this));
      const x5 = i4.toBytes(this.r), E4 = i4.toBytes(this.s);
      if (g3 === "recovered") {
        if (this.recovery == null) throw new Error("recovery bit must be present");
        return _t2(Uint8Array.of(this.recovery), x5, E4);
      }
      return _t2(x5, E4);
    }
    toHex(g3) {
      return Jt2(this.toBytes(g3));
    }
    assertValidity() {
    }
    static fromCompact(g3) {
      return R3.fromBytes(tt("sig", g3), "compact");
    }
    static fromDER(g3) {
      return R3.fromBytes(tt("sig", g3), "der");
    }
    normalizeS() {
      return this.hasHighS() ? new R3(this.r, i4.neg(this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return this.toBytes("der");
    }
    toDERHex() {
      return Jt2(this.toBytes("der"));
    }
    toCompactRawBytes() {
      return this.toBytes("compact");
    }
    toCompactHex() {
      return Jt2(this.toBytes("compact"));
    }
  }
  const Z = n5.bits2int || function(g3) {
    if (g3.length > 8192) throw new Error("input is too large");
    const x5 = Ve2(g3), E4 = g3.length * 8 - f5;
    return E4 > 0 ? x5 >> BigInt(E4) : x5;
  }, H2 = n5.bits2int_modN || function(g3) {
    return i4.create(Z(g3));
  }, j6 = me2(f5);
  function L2(b5) {
    return Rn2("num < 2^" + f5, b5, Et2, j6), i4.toBytes(b5);
  }
  function k5(b5, g3) {
    return Kt2(b5, void 0, "message"), g3 ? Kt2(e2(b5), void 0, "prehashed message") : b5;
  }
  function O5(b5, g3, x5) {
    if (["recovered", "canonical"].some((V4) => V4 in x5)) throw new Error("sign() legacy options not supported");
    const { lowS: E4, prehash: I3, extraEntropy: v5 } = Hn2(x5, y4);
    b5 = k5(b5, I3);
    const B2 = H2(b5), A3 = re(i4, g3), N12 = [L2(A3), L2(B2)];
    if (v5 != null && v5 !== false) {
      const V4 = v5 === true ? r3(h5.secretKey) : v5;
      N12.push(tt("extraEntropy", V4));
    }
    const D3 = _t2(...N12), P5 = B2;
    function $3(V4) {
      const q2 = Z(V4);
      if (!i4.isValidNot0(q2)) return;
      const G4 = i4.inv(q2), M5 = t.BASE.multiply(q2).toAffine(), Y3 = i4.create(M5.x);
      if (Y3 === Et2) return;
      const Yt3 = i4.create(G4 * i4.create(P5 + Y3 * A3));
      if (Yt3 === Et2) return;
      let ce2 = (M5.x === Y3 ? 0 : 2) | Number(M5.y & ne), fe3 = Yt3;
      return E4 && w3(Yt3) && (fe3 = i4.neg(Yt3), ce2 ^= 1), new R3(Y3, fe3, ce2);
    }
    return { seed: D3, k2sig: $3 };
  }
  function T3(b5, g3, x5 = {}) {
    b5 = tt("message", b5);
    const { seed: E4, k2sig: I3 } = O5(b5, g3, x5);
    return Af(e2.outputLen, i4.BYTES, o4)(E4, I3);
  }
  function C4(b5) {
    let g3;
    const x5 = typeof b5 == "string" || Ue2(b5), E4 = !x5 && b5 !== null && typeof b5 == "object" && typeof b5.r == "bigint" && typeof b5.s == "bigint";
    if (!x5 && !E4) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    if (E4) g3 = new R3(b5.r, b5.s);
    else if (x5) {
      try {
        g3 = R3.fromBytes(tt("sig", b5), "der");
      } catch (I3) {
        if (!(I3 instanceof xt2.Err)) throw I3;
      }
      if (!g3) try {
        g3 = R3.fromBytes(tt("sig", b5), "compact");
      } catch {
        return false;
      }
    }
    return g3 || false;
  }
  function _4(b5, g3, x5, E4 = {}) {
    const { lowS: I3, prehash: v5, format: B2 } = Hn2(E4, y4);
    if (x5 = tt("publicKey", x5), g3 = k5(tt("message", g3), v5), "strict" in E4) throw new Error("options.strict was renamed to lowS");
    const A3 = B2 === void 0 ? C4(b5) : R3.fromBytes(tt("sig", b5), B2);
    if (A3 === false) return false;
    try {
      const N12 = t.fromBytes(x5);
      if (I3 && A3.hasHighS()) return false;
      const { r: D3, s: P5 } = A3, $3 = H2(g3), V4 = i4.inv(P5), q2 = i4.create($3 * V4), G4 = i4.create(D3 * V4), M5 = t.BASE.multiplyUnsafe(q2).add(N12.multiplyUnsafe(G4));
      return M5.is0() ? false : i4.create(M5.x) === D3;
    } catch {
      return false;
    }
  }
  function p4(b5, g3, x5 = {}) {
    const { prehash: E4 } = Hn2(x5, y4);
    return g3 = k5(g3, E4), R3.fromBytes(b5, "recovered").recoverPublicKey(g3).toBytes();
  }
  return Object.freeze({ keygen: u2, getPublicKey: a4, getSharedSecret: l6, utils: d4, lengths: h5, Point: t, sign: T3, verify: _4, recoverPublicKey: p4, Signature: R3, hash: e2 });
}
function ra(t) {
  const e2 = { a: t.a, b: t.b, p: t.Fp.ORDER, n: t.n, h: t.h, Gx: t.Gx, Gy: t.Gy }, n5 = t.Fp;
  let r3 = t.allowedPrivateKeyLengths ? Array.from(new Set(t.allowedPrivateKeyLengths.map((i4) => Math.ceil(i4 / 2)))) : void 0;
  const o4 = Ht2(e2.n, { BITS: t.nBitLength, allowedLengths: r3, modFromBytes: t.wrapPrivateKey }), s3 = { Fp: n5, Fn: o4, allowInfinityPoint: t.allowInfinityPoint, endo: t.endo, isTorsionFree: t.isTorsionFree, clearCofactor: t.clearCofactor, fromBytes: t.fromBytes, toBytes: t.toBytes };
  return { CURVE: e2, curveOpts: s3 };
}
function oa(t) {
  const { CURVE: e2, curveOpts: n5 } = ra(t), r3 = { hmac: t.hmac, randomBytes: t.randomBytes, lowS: t.lowS, bits2int: t.bits2int, bits2int_modN: t.bits2int_modN };
  return { CURVE: e2, curveOpts: n5, hash: t.hash, ecdsaOpts: r3 };
}
function sa(t, e2) {
  const n5 = e2.Point;
  return Object.assign({}, e2, { ProjectivePoint: n5, CURVE: Object.assign({}, t, Ho2(n5.Fn.ORDER, n5.Fn.BITS)) });
}
function ia(t) {
  const { CURVE: e2, curveOpts: n5, hash: r3, ecdsaOpts: o4 } = oa(t), s3 = ta(e2, n5), i4 = na(s3, r3, o4);
  return sa(t, i4);
}
function Dn(t, e2) {
  const n5 = (r3) => ia({ ...t, hash: r3 });
  return { ...n5(e2), create: n5 };
}
var Qo2 = { p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"), n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), h: BigInt(1), a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"), b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5") };
var ts = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"), n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"), h: BigInt(1), a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"), b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"), Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"), Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f") };
var es = { p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"), h: BigInt(1), a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"), b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"), Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"), Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650") };
var ca = Ht2(Qo2.p);
var fa = Ht2(ts.p);
var aa = Ht2(es.p);
var ua = Dn({ ...Qo2, Fp: ca, lowS: false }, Te2);
Dn({ ...ts, Fp: fa, lowS: false }, wc), Dn({ ...es, Fp: aa, lowS: false, allowedPrivateKeyLengths: [130, 131, 132] }, mc);
var la = ua;
var Vn2 = "base10";
var rt2 = "base16";
var oe = "base64pad";
var Ge2 = "base64url";
var se = "utf8";
var Mn2 = 0;
var ie = 1;
var ve2 = 2;
var da = 0;
var ns = 1;
var xe2 = 12;
var Kn2 = 32;
function ha() {
  const t = kn2.utils.randomPrivateKey(), e2 = kn2.getPublicKey(t);
  return { privateKey: toString2(t, rt2), publicKey: toString2(e2, rt2) };
}
function pa() {
  const t = Mt2(Kn2);
  return toString2(t, rt2);
}
function ga(t, e2) {
  const n5 = kn2.getSharedSecret(fromString3(t, rt2), fromString3(e2, rt2)), r3 = Bf(Pe2, n5, void 0, void 0, Kn2);
  return toString2(r3, rt2);
}
function ba(t) {
  const e2 = Pe2(fromString3(t, rt2));
  return toString2(e2, rt2);
}
function ya(t) {
  const e2 = Pe2(fromString3(t, se));
  return toString2(e2, rt2);
}
function qn2(t) {
  return fromString3(`${t}`, Vn2);
}
function Zt2(t) {
  return Number(toString2(t, Vn2));
}
function rs(t) {
  return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function os(t) {
  const e2 = t.replace(/-/g, "+").replace(/_/g, "/"), n5 = (4 - e2.length % 4) % 4;
  return e2 + "=".repeat(n5);
}
function ma(t) {
  const e2 = qn2(typeof t.type < "u" ? t.type : Mn2);
  if (Zt2(e2) === ie && typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const n5 = typeof t.senderPublicKey < "u" ? fromString3(t.senderPublicKey, rt2) : void 0, r3 = typeof t.iv < "u" ? fromString3(t.iv, rt2) : Mt2(xe2), o4 = fromString3(t.symKey, rt2), s3 = Bo2(o4, r3).encrypt(fromString3(t.message, se)), i4 = Fn2({ type: e2, sealed: s3, iv: r3, senderPublicKey: n5 });
  return t.encoding === Ge2 ? rs(i4) : i4;
}
function wa(t) {
  const e2 = fromString3(t.symKey, rt2), { sealed: n5, iv: r3 } = ze2({ encoded: t.encoded, encoding: t.encoding }), o4 = Bo2(e2, r3).decrypt(n5);
  if (o4 === null) throw new Error("Failed to decrypt");
  return toString2(o4, se);
}
function va(t, e2) {
  const n5 = qn2(ve2), r3 = Mt2(xe2), o4 = fromString3(t, se), s3 = Fn2({ type: n5, sealed: o4, iv: r3 });
  return e2 === Ge2 ? rs(s3) : s3;
}
function xa(t, e2) {
  const { sealed: n5 } = ze2({ encoded: t, encoding: e2 });
  return toString2(n5, se);
}
function Fn2(t) {
  if (Zt2(t.type) === ve2) return toString2(concat2([t.type, t.sealed]), oe);
  if (Zt2(t.type) === ie) {
    if (typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return toString2(concat2([t.type, t.senderPublicKey, t.iv, t.sealed]), oe);
  }
  return toString2(concat2([t.type, t.iv, t.sealed]), oe);
}
function ze2(t) {
  const e2 = (t.encoding || oe) === Ge2 ? os(t.encoded) : t.encoded, n5 = fromString3(e2, oe), r3 = n5.slice(da, ns), o4 = ns;
  if (Zt2(r3) === ie) {
    const f5 = o4 + Kn2, u2 = f5 + xe2, a4 = n5.slice(o4, f5), l6 = n5.slice(f5, u2), d4 = n5.slice(u2);
    return { type: r3, sealed: d4, iv: l6, senderPublicKey: a4 };
  }
  if (Zt2(r3) === ve2) {
    const f5 = n5.slice(o4), u2 = Mt2(xe2);
    return { type: r3, sealed: f5, iv: u2 };
  }
  const s3 = o4 + xe2, i4 = n5.slice(o4, s3), c6 = n5.slice(s3);
  return { type: r3, sealed: c6, iv: i4 };
}
function Ea(t, e2) {
  const n5 = ze2({ encoded: t, encoding: e2?.encoding });
  return ss({ type: Zt2(n5.type), senderPublicKey: typeof n5.senderPublicKey < "u" ? toString2(n5.senderPublicKey, rt2) : void 0, receiverPublicKey: e2?.receiverPublicKey });
}
function ss(t) {
  const e2 = t?.type || Mn2;
  if (e2 === ie) {
    if (typeof t?.senderPublicKey > "u") throw new Error("missing sender public key");
    if (typeof t?.receiverPublicKey > "u") throw new Error("missing receiver public key");
  }
  return { type: e2, senderPublicKey: t?.senderPublicKey, receiverPublicKey: t?.receiverPublicKey };
}
function Ba(t) {
  return t.type === ie && typeof t.senderPublicKey == "string" && typeof t.receiverPublicKey == "string";
}
function Ia(t) {
  return t.type === ve2;
}
function is(t) {
  const e2 = Buffer.from(t.x, "base64"), n5 = Buffer.from(t.y, "base64");
  return concat2([new Uint8Array([4]), e2, n5]);
}
function Aa(t, e2) {
  const [n5, r3, o4] = t.split("."), s3 = Buffer.from(os(o4), "base64");
  if (s3.length !== 64) throw new Error("Invalid signature length");
  const i4 = s3.slice(0, 32), c6 = s3.slice(32, 64), f5 = `${n5}.${r3}`, u2 = Pe2(f5), a4 = is(e2);
  if (!la.verify(concat2([i4, c6]), u2, a4)) throw new Error("Invalid signature");
  return sn(t).payload;
}
var cs = "irn";
function Sa(t) {
  return t?.relay || { protocol: cs };
}
function Oa(t) {
  const e2 = C2[t];
  if (typeof e2 > "u") throw new Error(`Relay Protocol not supported: ${t}`);
  return e2;
}
var Na = Object.defineProperty;
var Ua = Object.defineProperties;
var _a = Object.getOwnPropertyDescriptors;
var fs = Object.getOwnPropertySymbols;
var Ra = Object.prototype.hasOwnProperty;
var $a = Object.prototype.propertyIsEnumerable;
var as = (t, e2, n5) => e2 in t ? Na(t, e2, { enumerable: true, configurable: true, writable: true, value: n5 }) : t[e2] = n5;
var Zn2 = (t, e2) => {
  for (var n5 in e2 || (e2 = {})) Ra.call(e2, n5) && as(t, n5, e2[n5]);
  if (fs) for (var n5 of fs(e2)) $a.call(e2, n5) && as(t, n5, e2[n5]);
  return t;
};
var Ta = (t, e2) => Ua(t, _a(e2));
function us(t, e2 = "-") {
  const n5 = {}, r3 = "relay" + e2;
  return Object.keys(t).forEach((o4) => {
    if (o4.startsWith(r3)) {
      const s3 = o4.replace(r3, ""), i4 = t[o4];
      n5[s3] = i4;
    }
  }), n5;
}
function Ca(t) {
  if (!t.includes("wc:")) {
    const u2 = cn(t);
    u2 != null && u2.includes("wc:") && (t = u2);
  }
  t = t.includes("wc://") ? t.replace("wc://", "") : t, t = t.includes("wc:") ? t.replace("wc:", "") : t;
  const e2 = t.indexOf(":"), n5 = t.indexOf("?") !== -1 ? t.indexOf("?") : void 0, r3 = t.substring(0, e2), o4 = t.substring(e2 + 1, n5).split("@"), s3 = typeof n5 < "u" ? t.substring(n5) : "", i4 = new URLSearchParams(s3), c6 = Object.fromEntries(i4.entries()), f5 = typeof c6.methods == "string" ? c6.methods.split(",") : void 0;
  return { protocol: r3, topic: ls(o4[0]), version: parseInt(o4[1], 10), symKey: c6.symKey, relay: us(c6), methods: f5, expiryTimestamp: c6.expiryTimestamp ? parseInt(c6.expiryTimestamp, 10) : void 0 };
}
function ls(t) {
  return t.startsWith("//") ? t.substring(2) : t;
}
function ds(t, e2 = "-") {
  const n5 = "relay", r3 = {};
  return Object.keys(t).forEach((o4) => {
    const s3 = o4, i4 = n5 + e2 + s3;
    t[s3] && (r3[i4] = t[s3]);
  }), r3;
}
function ja(t) {
  const e2 = new URLSearchParams(), n5 = Zn2(Zn2(Ta(Zn2({}, ds(t.relay)), { symKey: t.symKey }), t.expiryTimestamp && { expiryTimestamp: t.expiryTimestamp.toString() }), t.methods && { methods: t.methods.join(",") });
  return Object.entries(n5).sort(([r3], [o4]) => r3.localeCompare(o4)).forEach(([r3, o4]) => {
    o4 !== void 0 && e2.append(r3, String(o4));
  }), `${t.protocol}:${t.topic}@${t.version}?${e2}`;
}
function La(t, e2, n5) {
  return `${t}?wc_ev=${n5}&topic=${e2}`;
}
var ka = Object.defineProperty;
var Pa = Object.defineProperties;
var Ha = Object.getOwnPropertyDescriptors;
var hs = Object.getOwnPropertySymbols;
var Da = Object.prototype.hasOwnProperty;
var Va = Object.prototype.propertyIsEnumerable;
var ps = (t, e2, n5) => e2 in t ? ka(t, e2, { enumerable: true, configurable: true, writable: true, value: n5 }) : t[e2] = n5;
var Ma = (t, e2) => {
  for (var n5 in e2 || (e2 = {})) Da.call(e2, n5) && ps(t, n5, e2[n5]);
  if (hs) for (var n5 of hs(e2)) Va.call(e2, n5) && ps(t, n5, e2[n5]);
  return t;
};
var Ka = (t, e2) => Pa(t, Ha(e2));
function Gt2(t) {
  const e2 = [];
  return t.forEach((n5) => {
    const [r3, o4] = n5.split(":");
    e2.push(`${r3}:${o4}`);
  }), e2;
}
function gs(t) {
  const e2 = [];
  return Object.values(t).forEach((n5) => {
    e2.push(...Gt2(n5.accounts));
  }), [...new Set(e2)];
}
function qa(t) {
  const e2 = [];
  return Object.values(t).forEach((n5) => {
    e2.push(...n5.methods);
  }), [...new Set(e2)];
}
function Fa(t) {
  const e2 = [];
  return Object.values(t).forEach((n5) => {
    e2.push(...n5.events);
  }), [...new Set(e2)];
}
function bs(t, e2) {
  const n5 = [];
  return Object.values(t).forEach((r3) => {
    Gt2(r3.accounts).includes(e2) && n5.push(...r3.methods);
  }), n5;
}
function ys(t, e2) {
  const n5 = [];
  return Object.values(t).forEach((r3) => {
    Gt2(r3.accounts).includes(e2) && n5.push(...r3.events);
  }), n5;
}
function Gn2(t) {
  return t.includes(":");
}
function ms(t) {
  return Gn2(t) ? t.split(":")[0] : t;
}
function Ee2(t) {
  var e2, n5, r3;
  const o4 = {};
  if (!Ye2(t)) return o4;
  for (const [s3, i4] of Object.entries(t)) {
    const c6 = Gn2(s3) ? [s3] : i4.chains, f5 = i4.methods || [], u2 = i4.events || [], a4 = ms(s3);
    o4[a4] = Ka(Ma({}, o4[a4]), { chains: ut2(c6, (e2 = o4[a4]) == null ? void 0 : e2.chains), methods: ut2(f5, (n5 = o4[a4]) == null ? void 0 : n5.methods), events: ut2(u2, (r3 = o4[a4]) == null ? void 0 : r3.events) });
  }
  return o4;
}
function ws(t) {
  const e2 = {};
  return t?.forEach((n5) => {
    var r3;
    const [o4, s3] = n5.split(":");
    e2[o4] || (e2[o4] = { accounts: [], chains: [], events: [], methods: [] }), e2[o4].accounts.push(n5), (r3 = e2[o4].chains) == null || r3.push(`${o4}:${s3}`);
  }), e2;
}
function za(t, e2) {
  e2 = e2.map((r3) => r3.replace("did:pkh:", ""));
  const n5 = ws(e2);
  for (const [r3, o4] of Object.entries(n5)) o4.methods ? o4.methods = ut2(o4.methods, t) : o4.methods = t, o4.events = ["chainChanged", "accountsChanged"];
  return n5;
}
function Ya(t, e2) {
  var n5, r3, o4, s3, i4, c6;
  const f5 = Ee2(t), u2 = Ee2(e2), a4 = {}, l6 = Object.keys(f5).concat(Object.keys(u2));
  for (const d4 of l6) a4[d4] = { chains: ut2((n5 = f5[d4]) == null ? void 0 : n5.chains, (r3 = u2[d4]) == null ? void 0 : r3.chains), methods: ut2((o4 = f5[d4]) == null ? void 0 : o4.methods, (s3 = u2[d4]) == null ? void 0 : s3.methods), events: ut2((i4 = f5[d4]) == null ? void 0 : i4.events, (c6 = u2[d4]) == null ? void 0 : c6.events) };
  return a4;
}
var vs = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } };
var xs = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function Bt2(t, e2) {
  const { message: n5, code: r3 } = xs[t];
  return { message: e2 ? `${n5} ${e2}` : n5, code: r3 };
}
function zt2(t, e2) {
  const { message: n5, code: r3 } = vs[t];
  return { message: e2 ? `${n5} ${e2}` : n5, code: r3 };
}
function Be2(t, e2) {
  return Array.isArray(t) ? typeof e2 < "u" && t.length ? t.every(e2) : true : false;
}
function Ye2(t) {
  return Object.getPrototypeOf(t) === Object.prototype && Object.keys(t).length;
}
function Dt2(t) {
  return typeof t > "u";
}
function ft2(t, e2) {
  return e2 && Dt2(t) ? true : typeof t == "string" && !!t.trim().length;
}
function We2(t, e2) {
  return e2 && Dt2(t) ? true : typeof t == "number" && !isNaN(t);
}
function Wa(t, e2) {
  const { requiredNamespaces: n5 } = e2, r3 = Object.keys(t.namespaces), o4 = Object.keys(n5);
  let s3 = true;
  return At(o4, r3) ? (r3.forEach((i4) => {
    const { accounts: c6, methods: f5, events: u2 } = t.namespaces[i4], a4 = Gt2(c6), l6 = n5[i4];
    (!At(Se2(i4, l6), a4) || !At(l6.methods, f5) || !At(l6.events, u2)) && (s3 = false);
  }), s3) : false;
}
function Ie2(t) {
  return ft2(t, false) && t.includes(":") ? t.split(":").length === 2 : false;
}
function Es(t) {
  if (ft2(t, false) && t.includes(":")) {
    const e2 = t.split(":");
    if (e2.length === 3) {
      const n5 = e2[0] + ":" + e2[1];
      return !!e2[2] && Ie2(n5);
    }
  }
  return false;
}
function Xa(t) {
  function e2(n5) {
    try {
      return typeof new URL(n5) < "u";
    } catch {
      return false;
    }
  }
  try {
    if (ft2(t, false)) {
      if (e2(t)) return true;
      const n5 = cn(t);
      return e2(n5);
    }
  } catch {
  }
  return false;
}
function Ja(t) {
  var e2;
  return (e2 = t?.proposer) == null ? void 0 : e2.publicKey;
}
function Qa(t) {
  return t?.topic;
}
function tu(t, e2) {
  let n5 = null;
  return ft2(t?.publicKey, false) || (n5 = Bt2("MISSING_OR_INVALID", `${e2} controller public key should be a string`)), n5;
}
function zn2(t) {
  let e2 = true;
  return Be2(t) ? t.length && (e2 = t.every((n5) => ft2(n5, false))) : e2 = false, e2;
}
function Bs(t, e2, n5) {
  let r3 = null;
  return Be2(e2) && e2.length ? e2.forEach((o4) => {
    r3 || Ie2(o4) || (r3 = zt2("UNSUPPORTED_CHAINS", `${n5}, chain ${o4} should be a string and conform to "namespace:chainId" format`));
  }) : Ie2(t) || (r3 = zt2("UNSUPPORTED_CHAINS", `${n5}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r3;
}
function Is(t, e2, n5) {
  let r3 = null;
  return Object.entries(t).forEach(([o4, s3]) => {
    if (r3) return;
    const i4 = Bs(o4, Se2(o4, s3), `${e2} ${n5}`);
    i4 && (r3 = i4);
  }), r3;
}
function As(t, e2) {
  let n5 = null;
  return Be2(t) ? t.forEach((r3) => {
    n5 || Es(r3) || (n5 = zt2("UNSUPPORTED_ACCOUNTS", `${e2}, account ${r3} should be a string and conform to "namespace:chainId:address" format`));
  }) : n5 = zt2("UNSUPPORTED_ACCOUNTS", `${e2}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), n5;
}
function Ss(t, e2) {
  let n5 = null;
  return Object.values(t).forEach((r3) => {
    if (n5) return;
    const o4 = As(r3?.accounts, `${e2} namespace`);
    o4 && (n5 = o4);
  }), n5;
}
function Os(t, e2) {
  let n5 = null;
  return zn2(t?.methods) ? zn2(t?.events) || (n5 = zt2("UNSUPPORTED_EVENTS", `${e2}, events should be an array of strings or empty array for no events`)) : n5 = zt2("UNSUPPORTED_METHODS", `${e2}, methods should be an array of strings or empty array for no methods`), n5;
}
function Yn2(t, e2) {
  let n5 = null;
  return Object.values(t).forEach((r3) => {
    if (n5) return;
    const o4 = Os(r3, `${e2}, namespace`);
    o4 && (n5 = o4);
  }), n5;
}
function eu(t, e2, n5) {
  let r3 = null;
  if (t && Ye2(t)) {
    const o4 = Yn2(t, e2);
    o4 && (r3 = o4);
    const s3 = Is(t, e2, n5);
    s3 && (r3 = s3);
  } else r3 = Bt2("MISSING_OR_INVALID", `${e2}, ${n5} should be an object with data`);
  return r3;
}
function Ns(t, e2) {
  let n5 = null;
  if (t && Ye2(t)) {
    const r3 = Yn2(t, e2);
    r3 && (n5 = r3);
    const o4 = Ss(t, e2);
    o4 && (n5 = o4);
  } else n5 = Bt2("MISSING_OR_INVALID", `${e2}, namespaces should be an object with data`);
  return n5;
}
function Us(t) {
  return ft2(t.protocol, true);
}
function nu(t, e2) {
  let n5 = false;
  return e2 && !t ? n5 = true : t && Be2(t) && t.length && t.forEach((r3) => {
    n5 = Us(r3);
  }), n5;
}
function ru(t) {
  return typeof t == "number";
}
function ou(t) {
  return typeof t < "u" && typeof t !== null;
}
function su(t) {
  return !(!t || typeof t != "object" || !t.code || !We2(t.code, false) || !t.message || !ft2(t.message, false));
}
function iu(t) {
  return !(Dt2(t) || !ft2(t.method, false));
}
function cu(t) {
  return !(Dt2(t) || Dt2(t.result) && Dt2(t.error) || !We2(t.id, false) || !ft2(t.jsonrpc, false));
}
function fu(t) {
  return !(Dt2(t) || !ft2(t.name, false));
}
function au(t, e2) {
  return !(!Ie2(e2) || !gs(t).includes(e2));
}
function uu(t, e2, n5) {
  return ft2(n5, false) ? bs(t, e2).includes(n5) : false;
}
function lu(t, e2, n5) {
  return ft2(n5, false) ? ys(t, e2).includes(n5) : false;
}
function _s(t, e2, n5) {
  let r3 = null;
  const o4 = du(t), s3 = hu(e2), i4 = Object.keys(o4), c6 = Object.keys(s3), f5 = Rs(Object.keys(t)), u2 = Rs(Object.keys(e2)), a4 = f5.filter((l6) => !u2.includes(l6));
  return a4.length && (r3 = Bt2("NON_CONFORMING_NAMESPACES", `${n5} namespaces keys don't satisfy requiredNamespaces.
      Required: ${a4.toString()}
      Received: ${Object.keys(e2).toString()}`)), At(i4, c6) || (r3 = Bt2("NON_CONFORMING_NAMESPACES", `${n5} namespaces chains don't satisfy required namespaces.
      Required: ${i4.toString()}
      Approved: ${c6.toString()}`)), Object.keys(e2).forEach((l6) => {
    if (!l6.includes(":") || r3) return;
    const d4 = Gt2(e2[l6].accounts);
    d4.includes(l6) || (r3 = Bt2("NON_CONFORMING_NAMESPACES", `${n5} namespaces accounts don't satisfy namespace accounts for ${l6}
        Required: ${l6}
        Approved: ${d4.toString()}`));
  }), i4.forEach((l6) => {
    r3 || (At(o4[l6].methods, s3[l6].methods) ? At(o4[l6].events, s3[l6].events) || (r3 = Bt2("NON_CONFORMING_NAMESPACES", `${n5} namespaces events don't satisfy namespace events for ${l6}`)) : r3 = Bt2("NON_CONFORMING_NAMESPACES", `${n5} namespaces methods don't satisfy namespace methods for ${l6}`));
  }), r3;
}
function du(t) {
  const e2 = {};
  return Object.keys(t).forEach((n5) => {
    var r3;
    n5.includes(":") ? e2[n5] = t[n5] : (r3 = t[n5].chains) == null || r3.forEach((o4) => {
      e2[o4] = { methods: t[n5].methods, events: t[n5].events };
    });
  }), e2;
}
function Rs(t) {
  return [...new Set(t.map((e2) => e2.includes(":") ? e2.split(":")[0] : e2))];
}
function hu(t) {
  const e2 = {};
  return Object.keys(t).forEach((n5) => {
    if (n5.includes(":")) e2[n5] = t[n5];
    else {
      const r3 = Gt2(t[n5].accounts);
      r3?.forEach((o4) => {
        e2[o4] = { accounts: t[n5].accounts.filter((s3) => s3.includes(`${o4}:`)), methods: t[n5].methods, events: t[n5].events };
      });
    }
  }), e2;
}
function pu(t, e2) {
  return We2(t, false) && t <= e2.max && t >= e2.min;
}
function gu() {
  const t = Vt2();
  return new Promise((e2) => {
    switch (t) {
      case et.browser:
        e2($s());
        break;
      case et.reactNative:
        e2(Ts());
        break;
      case et.node:
        e2(Cs());
        break;
      default:
        e2(true);
    }
  });
}
function $s() {
  return Wt2() && navigator?.onLine;
}
async function Ts() {
  if (It2() && typeof global < "u" && global != null && global.NetInfo) {
    const t = await (global == null ? void 0 : global.NetInfo.fetch());
    return t?.isConnected;
  }
  return true;
}
function Cs() {
  return true;
}
function bu(t) {
  switch (Vt2()) {
    case et.browser:
      js(t);
      break;
    case et.reactNative:
      Ls(t);
      break;
    case et.node:
      break;
  }
}
function js(t) {
  !It2() && Wt2() && (window.addEventListener("online", () => t(true)), window.addEventListener("offline", () => t(false)));
}
function Ls(t) {
  It2() && typeof global < "u" && global != null && global.NetInfo && global?.NetInfo.addEventListener((e2) => t(e2?.isConnected));
}
function yu() {
  var t;
  return Wt2() && (0, import_window_getters.getDocument)() ? ((t = (0, import_window_getters.getDocument)()) == null ? void 0 : t.visibilityState) === "visible" : true;
}
var Wn2 = {};
var mu = class {
  static get(e2) {
    return Wn2[e2];
  }
  static set(e2, n5) {
    Wn2[e2] = n5;
  }
  static delete(e2) {
    delete Wn2[e2];
  }
};
function ks(t) {
  const e2 = esm_default2.decode(t);
  if (e2.length < 33) throw new Error("Too short to contain a public key");
  return e2.slice(1, 33);
}
function Ps({ publicKey: t, signature: e2, payload: n5 }) {
  var r3;
  const o4 = Xn2(n5.method), s3 = 128 | parseInt(((r3 = n5.version) == null ? void 0 : r3.toString()) || "4"), i4 = vu(n5.address), c6 = n5.era === "00" ? new Uint8Array([0]) : Xn2(n5.era);
  if (c6.length !== 1 && c6.length !== 2) throw new Error("Invalid era length");
  const f5 = parseInt(n5.nonce, 16), u2 = new Uint8Array([f5 & 255, f5 >> 8 & 255]), a4 = BigInt(`0x${wu(n5.tip)}`), l6 = Eu(a4), d4 = new Uint8Array([0, ...t, i4, ...e2, ...c6, ...u2, ...l6, ...o4]), h5 = xu(d4.length + 1);
  return new Uint8Array([...h5, s3, ...d4]);
}
function Hs(t) {
  const e2 = Xn2(t), n5 = (0, import_blakejs.blake2b)(e2, void 0, 32);
  return "0x" + Buffer.from(n5).toString("hex");
}
function Xn2(t) {
  return new Uint8Array(t.replace(/^0x/, "").match(/.{1,2}/g).map((e2) => parseInt(e2, 16)));
}
function wu(t) {
  return t.startsWith("0x") ? t.slice(2) : t;
}
function vu(t) {
  const e2 = esm_default2.decode(t)[0];
  return e2 === 42 ? 0 : e2 === 60 ? 2 : 1;
}
function xu(t) {
  if (t < 64) return new Uint8Array([t << 2]);
  if (t < 16384) {
    const e2 = t << 2 | 1;
    return new Uint8Array([e2 & 255, e2 >> 8 & 255]);
  } else if (t < 1 << 30) {
    const e2 = t << 2 | 2;
    return new Uint8Array([e2 & 255, e2 >> 8 & 255, e2 >> 16 & 255, e2 >> 24 & 255]);
  } else throw new Error("Compact encoding > 2^30 not supported");
}
function Eu(t) {
  if (t < BigInt(1) << BigInt(6)) return new Uint8Array([Number(t << BigInt(2))]);
  if (t < BigInt(1) << BigInt(14)) {
    const e2 = t << BigInt(2) | BigInt(1);
    return new Uint8Array([Number(e2 & BigInt(255)), Number(e2 >> BigInt(8) & BigInt(255))]);
  } else if (t < BigInt(1) << BigInt(30)) {
    const e2 = t << BigInt(2) | BigInt(2);
    return new Uint8Array([Number(e2 & BigInt(255)), Number(e2 >> BigInt(8) & BigInt(255)), Number(e2 >> BigInt(16) & BigInt(255)), Number(e2 >> BigInt(24) & BigInt(255))]);
  } else throw new Error("BigInt compact encoding not supported > 2^30");
}
function Bu(t) {
  const e2 = Uint8Array.from(Buffer.from(t.signature, "hex")), n5 = ks(t.transaction.address), r3 = Ps({ publicKey: n5, signature: e2, payload: t.transaction }), o4 = Buffer.from(r3).toString("hex");
  return Hs(o4);
}
function Iu({ logger: t, name: e2 }) {
  const n5 = typeof t == "string" ? Y({ opts: { level: t, name: e2 } }).logger : t;
  return n5.level = typeof t == "string" ? t : t.level, n5;
}

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var import_events5 = __toESM(require_events());

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DEFAULT_ERROR: () => DEFAULT_ERROR,
  IBaseJsonRpcProvider: () => n4,
  IEvents: () => e,
  IJsonRpcConnection: () => o2,
  IJsonRpcProvider: () => r2,
  INTERNAL_ERROR: () => INTERNAL_ERROR,
  INVALID_PARAMS: () => INVALID_PARAMS,
  INVALID_REQUEST: () => INVALID_REQUEST,
  METHOD_NOT_FOUND: () => METHOD_NOT_FOUND,
  PARSE_ERROR: () => PARSE_ERROR,
  RESERVED_ERROR_CODES: () => RESERVED_ERROR_CODES,
  SERVER_ERROR: () => SERVER_ERROR,
  SERVER_ERROR_CODE_RANGE: () => SERVER_ERROR_CODE_RANGE,
  STANDARD_ERROR_MAP: () => STANDARD_ERROR_MAP,
  formatErrorMessage: () => formatErrorMessage,
  formatJsonRpcError: () => formatJsonRpcError,
  formatJsonRpcRequest: () => formatJsonRpcRequest,
  formatJsonRpcResult: () => formatJsonRpcResult,
  getBigIntRpcId: () => getBigIntRpcId,
  getError: () => getError,
  getErrorByCode: () => getErrorByCode,
  isHttpUrl: () => isHttpUrl,
  isJsonRpcError: () => isJsonRpcError,
  isJsonRpcPayload: () => isJsonRpcPayload,
  isJsonRpcRequest: () => isJsonRpcRequest,
  isJsonRpcResponse: () => isJsonRpcResponse,
  isJsonRpcResult: () => isJsonRpcResult,
  isJsonRpcValidationInvalid: () => isJsonRpcValidationInvalid,
  isLocalhostUrl: () => isLocalhostUrl,
  isNodeJs: () => isNodeJs,
  isReservedErrorCode: () => isReservedErrorCode,
  isServerErrorCode: () => isServerErrorCode,
  isValidDefaultRoute: () => isValidDefaultRoute,
  isValidErrorCode: () => isValidErrorCode,
  isValidLeadingWildcardRoute: () => isValidLeadingWildcardRoute,
  isValidRoute: () => isValidRoute,
  isValidTrailingWildcardRoute: () => isValidTrailingWildcardRoute,
  isValidWildcardRoute: () => isValidWildcardRoute,
  isWsUrl: () => isWsUrl,
  parseConnectionError: () => parseConnectionError,
  payloadId: () => payloadId,
  validateJsonRpcError: () => validateJsonRpcError
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js
var PARSE_ERROR = "PARSE_ERROR";
var INVALID_REQUEST = "INVALID_REQUEST";
var METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
var INVALID_PARAMS = "INVALID_PARAMS";
var INTERNAL_ERROR = "INTERNAL_ERROR";
var SERVER_ERROR = "SERVER_ERROR";
var RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
var SERVER_ERROR_CODE_RANGE = [-32e3, -32099];
var STANDARD_ERROR_MAP = {
  [PARSE_ERROR]: { code: -32700, message: "Parse error" },
  [INVALID_REQUEST]: { code: -32600, message: "Invalid Request" },
  [METHOD_NOT_FOUND]: { code: -32601, message: "Method not found" },
  [INVALID_PARAMS]: { code: -32602, message: "Invalid params" },
  [INTERNAL_ERROR]: { code: -32603, message: "Internal error" },
  [SERVER_ERROR]: { code: -32e3, message: "Server error" }
};
var DEFAULT_ERROR = SERVER_ERROR;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js
function isServerErrorCode(code2) {
  return code2 <= SERVER_ERROR_CODE_RANGE[0] && code2 >= SERVER_ERROR_CODE_RANGE[1];
}
function isReservedErrorCode(code2) {
  return RESERVED_ERROR_CODES.includes(code2);
}
function isValidErrorCode(code2) {
  return typeof code2 === "number";
}
function getError(type) {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return STANDARD_ERROR_MAP[type];
}
function getErrorByCode(code2) {
  const match = Object.values(STANDARD_ERROR_MAP).find((e2) => e2.code === code2);
  if (!match) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return match;
}
function validateJsonRpcError(response) {
  if (typeof response.error.code === "undefined") {
    return { valid: false, error: "Missing code for JSON-RPC error" };
  }
  if (typeof response.error.message === "undefined") {
    return { valid: false, error: "Missing message for JSON-RPC error" };
  }
  if (!isValidErrorCode(response.error.code)) {
    return {
      valid: false,
      error: `Invalid error code type for JSON-RPC: ${response.error.code}`
    };
  }
  if (isReservedErrorCode(response.error.code)) {
    const error = getErrorByCode(response.error.code);
    if (error.message !== STANDARD_ERROR_MAP[DEFAULT_ERROR].message && response.error.message === error.message) {
      return {
        valid: false,
        error: `Invalid error code message for JSON-RPC: ${response.error.code}`
      };
    }
  }
  return { valid: true };
}
function parseConnectionError(e2, url, type) {
  return e2.message.includes("getaddrinfo ENOTFOUND") || e2.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e2;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js
var env_exports = {};
__export(env_exports, {
  isNodeJs: () => isNodeJs
});
var import_environment = __toESM(require_cjs4());
__reExport(env_exports, __toESM(require_cjs4()));
var isNodeJs = import_environment.isNode;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
__reExport(esm_exports, env_exports);

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js
function payloadId(entropy = 3) {
  const date = Date.now() * Math.pow(10, entropy);
  const extra = Math.floor(Math.random() * Math.pow(10, entropy));
  return date + extra;
}
function getBigIntRpcId(entropy = 6) {
  return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
  return {
    id: id || payloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
}
function formatJsonRpcResult(id, result) {
  return {
    id,
    jsonrpc: "2.0",
    result
  };
}
function formatJsonRpcError(id, error, data) {
  return {
    id,
    jsonrpc: "2.0",
    error: formatErrorMessage(error, data)
  };
}
function formatErrorMessage(error, data) {
  if (typeof error === "undefined") {
    return getError(INTERNAL_ERROR);
  }
  if (typeof error === "string") {
    error = Object.assign(Object.assign({}, getError(SERVER_ERROR)), { message: error });
  }
  if (typeof data !== "undefined") {
    error.data = data;
  }
  if (isReservedErrorCode(error.code)) {
    error = getErrorByCode(error.code);
  }
  return error;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js
function isValidRoute(route) {
  if (route.includes("*")) {
    return isValidWildcardRoute(route);
  }
  if (/\W/g.test(route)) {
    return false;
  }
  return true;
}
function isValidDefaultRoute(route) {
  return route === "*";
}
function isValidWildcardRoute(route) {
  if (isValidDefaultRoute(route)) {
    return true;
  }
  if (!route.includes("*")) {
    return false;
  }
  if (route.split("*").length !== 2) {
    return false;
  }
  if (route.split("*").filter((x5) => x5.trim() === "").length !== 1) {
    return false;
  }
  return true;
}
function isValidLeadingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}

// node_modules/@walletconnect/jsonrpc-types/dist/index.es.js
var e = class {
};
var o2 = class extends e {
  constructor(c6) {
    super();
  }
};
var n4 = class extends e {
  constructor() {
    super();
  }
};
var r2 = class extends n4 {
  constructor(c6) {
    super();
  }
};

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js
var HTTP_REGEX = "^https?:";
var WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
  const matches = url.match(new RegExp(/^\w+:/, "gi"));
  if (!matches || !matches.length)
    return;
  return matches[0];
}
function matchRegexProtocol(url, regex) {
  const protocol = getUrlProtocol(url);
  if (typeof protocol === "undefined")
    return false;
  return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
  return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
  return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js
function isJsonRpcPayload(payload) {
  return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
  return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
  return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
  return "result" in payload;
}
function isJsonRpcError(payload) {
  return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
  return "error" in validation && validation.valid === false;
}

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var o3 = class extends r2 {
  constructor(t) {
    super(t), this.events = new import_events5.EventEmitter(), this.hasRegisteredEventListeners = false, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners();
  }
  async connect(t = this.connection) {
    await this.open(t);
  }
  async disconnect() {
    await this.close();
  }
  on(t, e2) {
    this.events.on(t, e2);
  }
  once(t, e2) {
    this.events.once(t, e2);
  }
  off(t, e2) {
    this.events.off(t, e2);
  }
  removeListener(t, e2) {
    this.events.removeListener(t, e2);
  }
  async request(t, e2) {
    return this.requestStrict(formatJsonRpcRequest(t.method, t.params || [], t.id || getBigIntRpcId().toString()), e2);
  }
  async requestStrict(t, e2) {
    return new Promise(async (i4, s3) => {
      if (!this.connection.connected) try {
        await this.open();
      } catch (n5) {
        s3(n5);
      }
      this.events.on(`${t.id}`, (n5) => {
        isJsonRpcError(n5) ? s3(n5.error) : i4(n5.result);
      });
      try {
        await this.connection.send(t, e2);
      } catch (n5) {
        s3(n5);
      }
    });
  }
  setConnection(t = this.connection) {
    return t;
  }
  onPayload(t) {
    this.events.emit("payload", t), isJsonRpcResponse(t) ? this.events.emit(`${t.id}`, t) : this.events.emit("message", { type: t.method, data: t.params });
  }
  onClose(t) {
    t && t.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason ? `(${t.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(t = this.connection) {
    this.connection === t && this.connection.connected || (this.connection.connected && this.close(), typeof t == "string" && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (t) => this.onPayload(t)), this.connection.on("close", (t) => this.onClose(t)), this.connection.on("error", (t) => this.events.emit("error", t)), this.connection.on("register_error", (t) => this.onClose()), this.hasRegisteredEventListeners = true);
  }
};

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js
var import_events6 = __toESM(require_events());
var v3 = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require_browser2();
var w2 = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u";
var d2 = (r3) => r3.split("?")[0];
var h4 = 10;
var b3 = v3();
var f3 = class {
  constructor(e2) {
    if (this.url = e2, this.events = new import_events6.EventEmitter(), this.registering = false, !isWsUrl(e2)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e2}`);
    this.url = e2;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async open(e2 = this.url) {
    await this.register(e2);
  }
  async close() {
    return new Promise((e2, t) => {
      if (typeof this.socket > "u") {
        t(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (n5) => {
        this.onClose(n5), e2();
      }, this.socket.close();
    });
  }
  async send(e2) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(safeJsonStringify(e2));
    } catch (t) {
      this.onError(e2.id, t);
    }
  }
  register(e2 = this.url) {
    if (!isWsUrl(e2)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e2}`);
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((n5, s3) => {
        this.events.once("register_error", (o4) => {
          this.resetMaxListeners(), s3(o4);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u") return s3(new Error("WebSocket connection is missing or invalid"));
          n5(this.socket);
        });
      });
    }
    return this.url = e2, this.registering = true, new Promise((t, n5) => {
      const s3 = (0, esm_exports.isReactNative)() ? void 0 : { rejectUnauthorized: !isLocalhostUrl(e2) }, o4 = new b3(e2, [], s3);
      w2() ? o4.onerror = (i4) => {
        const a4 = i4;
        n5(this.emitError(a4.error));
      } : o4.on("error", (i4) => {
        n5(this.emitError(i4));
      }), o4.onopen = () => {
        this.onOpen(o4), t(o4);
      };
    });
  }
  onOpen(e2) {
    e2.onmessage = (t) => this.onPayload(t), e2.onclose = (t) => this.onClose(t), this.socket = e2, this.registering = false, this.events.emit("open");
  }
  onClose(e2) {
    this.socket = void 0, this.registering = false, this.events.emit("close", e2);
  }
  onPayload(e2) {
    if (typeof e2.data > "u") return;
    const t = typeof e2.data == "string" ? safeJsonParse(e2.data) : e2.data;
    this.events.emit("payload", t);
  }
  onError(e2, t) {
    const n5 = this.parseError(t), s3 = n5.message || n5.toString(), o4 = formatJsonRpcError(e2, s3);
    this.events.emit("payload", o4);
  }
  parseError(e2, t = this.url) {
    return parseConnectionError(e2, d2(t), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > h4 && this.events.setMaxListeners(h4);
  }
  emitError(e2) {
    const t = this.parseError(new Error(e2?.message || `WebSocket connection failed for host: ${d2(this.url)}`));
    return this.events.emit("register_error", t), t;
  }
};

// node_modules/@walletconnect/core/dist/index.js
var import_window_getters2 = __toESM(require_cjs2(), 1);
var Ue3 = "wc";
var Fe2 = 2;
var ge3 = "core";
var W3 = `${Ue3}@2:${ge3}:`;
var Et3 = { name: ge3, logger: "error" };
var It3 = { database: ":memory:" };
var Tt3 = "crypto";
var Me3 = "client_ed25519_seed";
var Ct2 = import_time4.ONE_DAY;
var Pt3 = "keychain";
var St3 = "0.3";
var Ot3 = "messages";
var Rt3 = "0.3";
var At2 = import_time4.SIX_HOURS;
var xt3 = "publisher";
var Nt3 = "irn";
var $t3 = "error";
var Ke3 = "wss://relay.walletconnect.org";
var zt3 = "relayer";
var C3 = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" };
var Lt3 = "_subscription";
var M4 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" };
var kt3 = 0.1;
var Pe3 = "2.23.0";
var ee2 = { link_mode: "link_mode", relay: "relay" };
var ye3 = { inbound: "inbound", outbound: "outbound" };
var jt3 = "0.3";
var Ut3 = "WALLETCONNECT_CLIENT_ID";
var Be3 = "WALLETCONNECT_LINK_MODE_APPS";
var j4 = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" };
var Ft3 = "subscription";
var Mt3 = "0.3";
var Qs = import_time4.FIVE_SECONDS * 1e3;
var Kt3 = "pairing";
var Bt3 = "0.3";
var oe2 = { wc_pairingDelete: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 0 } } };
var ae2 = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" };
var V3 = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
var Vt3 = "history";
var qt3 = "0.3";
var Gt3 = "expirer";
var q = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" };
var Wt3 = "0.3";
var Ht3 = "verify-api";
var ir2 = "https://verify.walletconnect.com";
var Yt2 = "https://verify.walletconnect.org";
var be3 = Yt2;
var Jt3 = `${be3}/v3`;
var Xt3 = [ir2, Yt2];
var Zt3 = "echo";
var Qt3 = "https://echo.walletconnect.com";
var Y2 = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" };
var X3 = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" };
var rr3 = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success", session_request_response_started: "session_request_response_started", session_request_response_validation_success: "session_request_response_validation_success", session_request_response_publish_started: "session_request_response_publish_started" };
var nr3 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found", session_request_response_validation_failure: "session_request_response_validation_failure", session_request_response_publish_failure: "session_request_response_publish_failure" };
var or3 = { authenticated_session_approve_started: "authenticated_session_approve_started", authenticated_session_not_expired: "authenticated_session_not_expired", chains_caip2_compliant: "chains_caip2_compliant", chains_evm_compliant: "chains_evm_compliant", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve", authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success" };
var ar3 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", missing_session_authenticate_request: "missing_session_authenticate_request", session_authenticate_request_expired: "session_authenticate_request_expired", chains_caip2_compliant_failure: "chains_caip2_compliant_failure", chains_evm_compliant_failure: "chains_evm_compliant_failure", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" };
var ei = 0.1;
var ti = "event-client";
var ii2 = 86400;
var si2 = "https://pulse.walletconnect.org/batch";
function cr2(r3, e2) {
  if (r3.length >= 255) throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), i4 = 0; i4 < t.length; i4++) t[i4] = 255;
  for (var s3 = 0; s3 < r3.length; s3++) {
    var n5 = r3.charAt(s3), o4 = n5.charCodeAt(0);
    if (t[o4] !== 255) throw new TypeError(n5 + " is ambiguous");
    t[o4] = s3;
  }
  var a4 = r3.length, c6 = r3.charAt(0), h5 = Math.log(a4) / Math.log(256), l6 = Math.log(256) / Math.log(a4);
  function g3(u2) {
    if (u2 instanceof Uint8Array || (ArrayBuffer.isView(u2) ? u2 = new Uint8Array(u2.buffer, u2.byteOffset, u2.byteLength) : Array.isArray(u2) && (u2 = Uint8Array.from(u2))), !(u2 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (u2.length === 0) return "";
    for (var m3 = 0, D3 = 0, w3 = 0, E4 = u2.length; w3 !== E4 && u2[w3] === 0; ) w3++, m3++;
    for (var L2 = (E4 - w3) * l6 + 1 >>> 0, I3 = new Uint8Array(L2); w3 !== E4; ) {
      for (var k5 = u2[w3], T3 = 0, S4 = L2 - 1; (k5 !== 0 || T3 < D3) && S4 !== -1; S4--, T3++) k5 += 256 * I3[S4] >>> 0, I3[S4] = k5 % a4 >>> 0, k5 = k5 / a4 >>> 0;
      if (k5 !== 0) throw new Error("Non-zero carry");
      D3 = T3, w3++;
    }
    for (var O5 = L2 - D3; O5 !== L2 && I3[O5] === 0; ) O5++;
    for (var te3 = c6.repeat(m3); O5 < L2; ++O5) te3 += r3.charAt(I3[O5]);
    return te3;
  }
  function y4(u2) {
    if (typeof u2 != "string") throw new TypeError("Expected String");
    if (u2.length === 0) return new Uint8Array();
    var m3 = 0;
    if (u2[m3] !== " ") {
      for (var D3 = 0, w3 = 0; u2[m3] === c6; ) D3++, m3++;
      for (var E4 = (u2.length - m3) * h5 + 1 >>> 0, L2 = new Uint8Array(E4); u2[m3]; ) {
        var I3 = t[u2.charCodeAt(m3)];
        if (I3 === 255) return;
        for (var k5 = 0, T3 = E4 - 1; (I3 !== 0 || k5 < w3) && T3 !== -1; T3--, k5++) I3 += a4 * L2[T3] >>> 0, L2[T3] = I3 % 256 >>> 0, I3 = I3 / 256 >>> 0;
        if (I3 !== 0) throw new Error("Non-zero carry");
        w3 = k5, m3++;
      }
      if (u2[m3] !== " ") {
        for (var S4 = E4 - w3; S4 !== E4 && L2[S4] === 0; ) S4++;
        for (var O5 = new Uint8Array(D3 + (E4 - S4)), te3 = D3; S4 !== E4; ) O5[te3++] = L2[S4++];
        return O5;
      }
    }
  }
  function _4(u2) {
    var m3 = y4(u2);
    if (m3) return m3;
    throw new Error(`Non-${e2} character`);
  }
  return { encode: g3, decodeUnsafe: y4, decode: _4 };
}
var hr2 = cr2;
var lr3 = hr2;
var ri2 = (r3) => {
  if (r3 instanceof Uint8Array && r3.constructor.name === "Uint8Array") return r3;
  if (r3 instanceof ArrayBuffer) return new Uint8Array(r3);
  if (ArrayBuffer.isView(r3)) return new Uint8Array(r3.buffer, r3.byteOffset, r3.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var ur3 = (r3) => new TextEncoder().encode(r3);
var dr3 = (r3) => new TextDecoder().decode(r3);
var pr3 = class {
  constructor(e2, t, i4) {
    this.name = e2, this.prefix = t, this.baseEncode = i4;
  }
  encode(e2) {
    if (e2 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e2)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var gr3 = class {
  constructor(e2, t, i4) {
    if (this.name = e2, this.prefix = t, t.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i4;
  }
  decode(e2) {
    if (typeof e2 == "string") {
      if (e2.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e2.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e2) {
    return ni(this, e2);
  }
};
var yr3 = class {
  constructor(e2) {
    this.decoders = e2;
  }
  or(e2) {
    return ni(this, e2);
  }
  decode(e2) {
    const t = e2[0], i4 = this.decoders[t];
    if (i4) return i4.decode(e2);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e2)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var ni = (r3, e2) => new yr3({ ...r3.decoders || { [r3.prefix]: r3 }, ...e2.decoders || { [e2.prefix]: e2 } });
var br3 = class {
  constructor(e2, t, i4, s3) {
    this.name = e2, this.prefix = t, this.baseEncode = i4, this.baseDecode = s3, this.encoder = new pr3(e2, t, i4), this.decoder = new gr3(e2, t, s3);
  }
  encode(e2) {
    return this.encoder.encode(e2);
  }
  decode(e2) {
    return this.decoder.decode(e2);
  }
};
var Se3 = ({ name: r3, prefix: e2, encode: t, decode: i4 }) => new br3(r3, e2, t, i4);
var me3 = ({ prefix: r3, name: e2, alphabet: t }) => {
  const { encode: i4, decode: s3 } = lr3(t, e2);
  return Se3({ prefix: r3, name: e2, encode: i4, decode: (n5) => ri2(s3(n5)) });
};
var mr3 = (r3, e2, t, i4) => {
  const s3 = {};
  for (let l6 = 0; l6 < e2.length; ++l6) s3[e2[l6]] = l6;
  let n5 = r3.length;
  for (; r3[n5 - 1] === "="; ) --n5;
  const o4 = new Uint8Array(n5 * t / 8 | 0);
  let a4 = 0, c6 = 0, h5 = 0;
  for (let l6 = 0; l6 < n5; ++l6) {
    const g3 = s3[r3[l6]];
    if (g3 === void 0) throw new SyntaxError(`Non-${i4} character`);
    c6 = c6 << t | g3, a4 += t, a4 >= 8 && (a4 -= 8, o4[h5++] = 255 & c6 >> a4);
  }
  if (a4 >= t || 255 & c6 << 8 - a4) throw new SyntaxError("Unexpected end of data");
  return o4;
};
var fr2 = (r3, e2, t) => {
  const i4 = e2[e2.length - 1] === "=", s3 = (1 << t) - 1;
  let n5 = "", o4 = 0, a4 = 0;
  for (let c6 = 0; c6 < r3.length; ++c6) for (a4 = a4 << 8 | r3[c6], o4 += 8; o4 > t; ) o4 -= t, n5 += e2[s3 & a4 >> o4];
  if (o4 && (n5 += e2[s3 & a4 << t - o4]), i4) for (; n5.length * t & 7; ) n5 += "=";
  return n5;
};
var x4 = ({ name: r3, prefix: e2, bitsPerChar: t, alphabet: i4 }) => Se3({ prefix: e2, name: r3, encode(s3) {
  return fr2(s3, i4, t);
}, decode(s3) {
  return mr3(s3, i4, t, r3);
} });
var Dr3 = Se3({ prefix: "\0", name: "identity", encode: (r3) => dr3(r3), decode: (r3) => ur3(r3) });
var vr2 = Object.freeze({ __proto__: null, identity: Dr3 });
var _r3 = x4({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var wr3 = Object.freeze({ __proto__: null, base2: _r3 });
var Er2 = x4({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Ir3 = Object.freeze({ __proto__: null, base8: Er2 });
var Tr3 = me3({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Cr3 = Object.freeze({ __proto__: null, base10: Tr3 });
var Pr3 = x4({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var Sr3 = x4({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Or3 = Object.freeze({ __proto__: null, base16: Pr3, base16upper: Sr3 });
var Rr3 = x4({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var Ar3 = x4({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var xr2 = x4({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var Nr3 = x4({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var $r3 = x4({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var zr3 = x4({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var Lr3 = x4({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var kr3 = x4({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var jr3 = x4({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var Ur3 = Object.freeze({ __proto__: null, base32: Rr3, base32upper: Ar3, base32pad: xr2, base32padupper: Nr3, base32hex: $r3, base32hexupper: zr3, base32hexpad: Lr3, base32hexpadupper: kr3, base32z: jr3 });
var Fr3 = me3({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var Mr3 = me3({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var Kr3 = Object.freeze({ __proto__: null, base36: Fr3, base36upper: Mr3 });
var Br3 = me3({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var Vr3 = me3({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var qr3 = Object.freeze({ __proto__: null, base58btc: Br3, base58flickr: Vr3 });
var Gr3 = x4({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var Wr3 = x4({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var Hr3 = x4({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var Yr3 = x4({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Jr3 = Object.freeze({ __proto__: null, base64: Gr3, base64pad: Wr3, base64url: Hr3, base64urlpad: Yr3 });
var oi2 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var Xr3 = oi2.reduce((r3, e2, t) => (r3[t] = e2, r3), []);
var Zr3 = oi2.reduce((r3, e2, t) => (r3[e2.codePointAt(0)] = t, r3), []);
function Qr3(r3) {
  return r3.reduce((e2, t) => (e2 += Xr3[t], e2), "");
}
function en3(r3) {
  const e2 = [];
  for (const t of r3) {
    const i4 = Zr3[t.codePointAt(0)];
    if (i4 === void 0) throw new Error(`Non-base256emoji character: ${t}`);
    e2.push(i4);
  }
  return new Uint8Array(e2);
}
var tn = Se3({ prefix: "\u{1F680}", name: "base256emoji", encode: Qr3, decode: en3 });
var sn2 = Object.freeze({ __proto__: null, base256emoji: tn });
var rn3 = ci2;
var ai = 128;
var nn2 = 127;
var on3 = ~nn2;
var an2 = Math.pow(2, 31);
function ci2(r3, e2, t) {
  e2 = e2 || [], t = t || 0;
  for (var i4 = t; r3 >= an2; ) e2[t++] = r3 & 255 | ai, r3 /= 128;
  for (; r3 & on3; ) e2[t++] = r3 & 255 | ai, r3 >>>= 7;
  return e2[t] = r3 | 0, ci2.bytes = t - i4 + 1, e2;
}
var cn2 = Ve3;
var hn2 = 128;
var hi2 = 127;
function Ve3(r3, i4) {
  var t = 0, i4 = i4 || 0, s3 = 0, n5 = i4, o4, a4 = r3.length;
  do {
    if (n5 >= a4) throw Ve3.bytes = 0, new RangeError("Could not decode varint");
    o4 = r3[n5++], t += s3 < 28 ? (o4 & hi2) << s3 : (o4 & hi2) * Math.pow(2, s3), s3 += 7;
  } while (o4 >= hn2);
  return Ve3.bytes = n5 - i4, t;
}
var ln2 = Math.pow(2, 7);
var un2 = Math.pow(2, 14);
var dn2 = Math.pow(2, 21);
var pn2 = Math.pow(2, 28);
var gn3 = Math.pow(2, 35);
var yn3 = Math.pow(2, 42);
var bn3 = Math.pow(2, 49);
var mn3 = Math.pow(2, 56);
var fn2 = Math.pow(2, 63);
var Dn2 = function(r3) {
  return r3 < ln2 ? 1 : r3 < un2 ? 2 : r3 < dn2 ? 3 : r3 < pn2 ? 4 : r3 < gn3 ? 5 : r3 < yn3 ? 6 : r3 < bn3 ? 7 : r3 < mn3 ? 8 : r3 < fn2 ? 9 : 10;
};
var vn3 = { encode: rn3, decode: cn2, encodingLength: Dn2 };
var li2 = vn3;
var ui = (r3, e2, t = 0) => (li2.encode(r3, e2, t), e2);
var di2 = (r3) => li2.encodingLength(r3);
var qe3 = (r3, e2) => {
  const t = e2.byteLength, i4 = di2(r3), s3 = i4 + di2(t), n5 = new Uint8Array(s3 + t);
  return ui(r3, n5, 0), ui(t, n5, i4), n5.set(e2, s3), new _n3(r3, t, e2, n5);
};
var _n3 = class {
  constructor(e2, t, i4, s3) {
    this.code = e2, this.size = t, this.digest = i4, this.bytes = s3;
  }
};
var pi2 = ({ name: r3, code: e2, encode: t }) => new wn2(r3, e2, t);
var wn2 = class {
  constructor(e2, t, i4) {
    this.name = e2, this.code = t, this.encode = i4;
  }
  digest(e2) {
    if (e2 instanceof Uint8Array) {
      const t = this.encode(e2);
      return t instanceof Uint8Array ? qe3(this.code, t) : t.then((i4) => qe3(this.code, i4));
    } else throw Error("Unknown type, must be binary type");
  }
};
var gi = (r3) => async (e2) => new Uint8Array(await crypto.subtle.digest(r3, e2));
var En3 = pi2({ name: "sha2-256", code: 18, encode: gi("SHA-256") });
var In3 = pi2({ name: "sha2-512", code: 19, encode: gi("SHA-512") });
var Tn3 = Object.freeze({ __proto__: null, sha256: En3, sha512: In3 });
var yi = 0;
var Cn3 = "identity";
var bi2 = ri2;
var Pn3 = (r3) => qe3(yi, bi2(r3));
var Sn3 = { code: yi, name: Cn3, encode: bi2, digest: Pn3 };
var On3 = Object.freeze({ __proto__: null, identity: Sn3 });
new TextEncoder(), new TextDecoder();
var mi = { ...vr2, ...wr3, ...Ir3, ...Cr3, ...Or3, ...Ur3, ...Kr3, ...qr3, ...Jr3, ...sn2 };
({ ...Tn3, ...On3 });
function fi2(r3) {
  return globalThis.Buffer != null ? new Uint8Array(r3.buffer, r3.byteOffset, r3.byteLength) : r3;
}
function Rn3(r3 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? fi2(globalThis.Buffer.allocUnsafe(r3)) : new Uint8Array(r3);
}
function Di2(r3, e2, t, i4) {
  return { name: r3, prefix: e2, encoder: { name: r3, prefix: e2, encode: t }, decoder: { decode: i4 } };
}
var vi2 = Di2("utf8", "u", (r3) => "u" + new TextDecoder("utf8").decode(r3), (r3) => new TextEncoder().encode(r3.substring(1)));
var Ge3 = Di2("ascii", "a", (r3) => {
  let e2 = "a";
  for (let t = 0; t < r3.length; t++) e2 += String.fromCharCode(r3[t]);
  return e2;
}, (r3) => {
  r3 = r3.substring(1);
  const e2 = Rn3(r3.length);
  for (let t = 0; t < r3.length; t++) e2[t] = r3.charCodeAt(t);
  return e2;
});
var An3 = { utf8: vi2, "utf-8": vi2, hex: mi.base16, latin1: Ge3, ascii: Ge3, binary: Ge3, ...mi };
function xn3(r3, e2 = "utf8") {
  const t = An3[e2];
  if (!t) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? fi2(globalThis.Buffer.from(r3, "utf-8")) : t.decoder.decode(`${t.prefix}${r3}`);
}
var Nn3 = Object.defineProperty;
var $n3 = (r3, e2, t) => e2 in r3 ? Nn3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var J4 = (r3, e2, t) => $n3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var _i2 = class {
  constructor(e2, t) {
    this.core = e2, this.logger = t, J4(this, "keychain", /* @__PURE__ */ new Map()), J4(this, "name", Pt3), J4(this, "version", St3), J4(this, "initialized", false), J4(this, "storagePrefix", W3), J4(this, "init", async () => {
      if (!this.initialized) {
        const i4 = await this.getKeyChain();
        typeof i4 < "u" && (this.keychain = i4), this.initialized = true;
      }
    }), J4(this, "has", (i4) => (this.isInitialized(), this.keychain.has(i4))), J4(this, "set", async (i4, s3) => {
      this.isInitialized(), this.keychain.set(i4, s3), await this.persist();
    }), J4(this, "get", (i4) => {
      this.isInitialized();
      const s3 = this.keychain.get(i4);
      if (typeof s3 > "u") {
        const { message: n5 } = Bt2("NO_MATCHING_KEY", `${this.name}: ${i4}`);
        throw new Error(n5);
      }
      return s3;
    }), J4(this, "del", async (i4) => {
      this.isInitialized(), this.keychain.delete(i4), await this.persist();
    }), this.core = e2, this.logger = X(t, this.name);
  }
  get context() {
    return w(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e2) {
    await this.core.storage.setItem(this.storageKey, vi(e2));
  }
  async getKeyChain() {
    const e2 = await this.core.storage.getItem(this.storageKey);
    return typeof e2 < "u" ? xi(e2) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = Bt2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var zn3 = Object.defineProperty;
var Ln3 = (r3, e2, t) => e2 in r3 ? zn3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var R2 = (r3, e2, t) => Ln3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var wi = class {
  constructor(e2, t, i4) {
    this.core = e2, this.logger = t, R2(this, "name", Tt3), R2(this, "keychain"), R2(this, "randomSessionIdentifier", pa()), R2(this, "initialized", false), R2(this, "clientId"), R2(this, "init", async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }), R2(this, "hasKeys", (s3) => (this.isInitialized(), this.keychain.has(s3))), R2(this, "getClientId", async () => {
      if (this.isInitialized(), this.clientId) return this.clientId;
      const s3 = await this.getClientSeed(), n5 = Po(s3), o4 = Qe(n5.publicKey);
      return this.clientId = o4, o4;
    }), R2(this, "generateKeyPair", () => {
      this.isInitialized();
      const s3 = ha();
      return this.setPrivateKey(s3.publicKey, s3.privateKey);
    }), R2(this, "signJWT", async (s3) => {
      this.isInitialized();
      const n5 = await this.getClientSeed(), o4 = Po(n5), a4 = this.randomSessionIdentifier, c6 = Ct2;
      return await Qo(a4, s3, c6, o4);
    }), R2(this, "generateSharedKey", (s3, n5, o4) => {
      this.isInitialized();
      const a4 = this.getPrivateKey(s3), c6 = ga(a4, n5);
      return this.setSymKey(c6, o4);
    }), R2(this, "setSymKey", async (s3, n5) => {
      this.isInitialized();
      const o4 = n5 || ba(s3);
      return await this.keychain.set(o4, s3), o4;
    }), R2(this, "deleteKeyPair", async (s3) => {
      this.isInitialized(), await this.keychain.del(s3);
    }), R2(this, "deleteSymKey", async (s3) => {
      this.isInitialized(), await this.keychain.del(s3);
    }), R2(this, "encode", async (s3, n5, o4) => {
      this.isInitialized();
      const a4 = ss(o4), c6 = safeJsonStringify(n5);
      if (Ia(a4)) return va(c6, o4?.encoding);
      if (Ba(a4)) {
        const y4 = a4.senderPublicKey, _4 = a4.receiverPublicKey;
        s3 = await this.generateSharedKey(y4, _4);
      }
      const h5 = this.getSymKey(s3), { type: l6, senderPublicKey: g3 } = a4;
      return ma({ type: l6, symKey: h5, message: c6, senderPublicKey: g3, encoding: o4?.encoding });
    }), R2(this, "decode", async (s3, n5, o4) => {
      this.isInitialized();
      const a4 = Ea(n5, o4);
      if (Ia(a4)) {
        const c6 = xa(n5, o4?.encoding);
        return safeJsonParse(c6);
      }
      if (Ba(a4)) {
        const c6 = a4.receiverPublicKey, h5 = a4.senderPublicKey;
        s3 = await this.generateSharedKey(c6, h5);
      }
      try {
        const c6 = this.getSymKey(s3), h5 = wa({ symKey: c6, encoded: n5, encoding: o4?.encoding });
        return safeJsonParse(h5);
      } catch (c6) {
        this.logger.error(`Failed to decode message from topic: '${s3}', clientId: '${await this.getClientId()}'`), this.logger.error(c6);
      }
    }), R2(this, "getPayloadType", (s3, n5 = oe) => {
      const o4 = ze2({ encoded: s3, encoding: n5 });
      return Zt2(o4.type);
    }), R2(this, "getPayloadSenderPublicKey", (s3, n5 = oe) => {
      const o4 = ze2({ encoded: s3, encoding: n5 });
      return o4.senderPublicKey ? toString2(o4.senderPublicKey, rt2) : void 0;
    }), this.core = e2, this.logger = X(t, this.name), this.keychain = i4 || new _i2(this.core, this.logger);
  }
  get context() {
    return w(this.logger);
  }
  async setPrivateKey(e2, t) {
    return await this.keychain.set(e2, t), e2;
  }
  getPrivateKey(e2) {
    return this.keychain.get(e2);
  }
  async getClientSeed() {
    let e2 = "";
    try {
      e2 = this.keychain.get(Me3);
    } catch {
      e2 = pa(), await this.keychain.set(Me3, e2);
    }
    return xn3(e2, "base16");
  }
  getSymKey(e2) {
    return this.keychain.get(e2);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = Bt2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var kn3 = Object.defineProperty;
var jn3 = Object.defineProperties;
var Un3 = Object.getOwnPropertyDescriptors;
var Ei = Object.getOwnPropertySymbols;
var Fn3 = Object.prototype.hasOwnProperty;
var Mn3 = Object.prototype.propertyIsEnumerable;
var We3 = (r3, e2, t) => e2 in r3 ? kn3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var Kn3 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) Fn3.call(e2, t) && We3(r3, t, e2[t]);
  if (Ei) for (var t of Ei(e2)) Mn3.call(e2, t) && We3(r3, t, e2[t]);
  return r3;
};
var Bn3 = (r3, e2) => jn3(r3, Un3(e2));
var K5 = (r3, e2, t) => We3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Ii = class extends y3 {
  constructor(e2, t) {
    super(e2, t), this.logger = e2, this.core = t, K5(this, "messages", /* @__PURE__ */ new Map()), K5(this, "messagesWithoutClientAck", /* @__PURE__ */ new Map()), K5(this, "name", Ot3), K5(this, "version", Rt3), K5(this, "initialized", false), K5(this, "storagePrefix", W3), K5(this, "init", async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const i4 = await this.getRelayerMessages();
          typeof i4 < "u" && (this.messages = i4);
          const s3 = await this.getRelayerMessagesWithoutClientAck();
          typeof s3 < "u" && (this.messagesWithoutClientAck = s3), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (i4) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i4);
        } finally {
          this.initialized = true;
        }
      }
    }), K5(this, "set", async (i4, s3, n5) => {
      this.isInitialized();
      const o4 = ya(s3);
      let a4 = this.messages.get(i4);
      if (typeof a4 > "u" && (a4 = {}), typeof a4[o4] < "u") return o4;
      if (a4[o4] = s3, this.messages.set(i4, a4), n5 === ye3.inbound) {
        const c6 = this.messagesWithoutClientAck.get(i4) || {};
        this.messagesWithoutClientAck.set(i4, Bn3(Kn3({}, c6), { [o4]: s3 }));
      }
      return await this.persist(), o4;
    }), K5(this, "get", (i4) => {
      this.isInitialized();
      let s3 = this.messages.get(i4);
      return typeof s3 > "u" && (s3 = {}), s3;
    }), K5(this, "getWithoutAck", (i4) => {
      this.isInitialized();
      const s3 = {};
      for (const n5 of i4) {
        const o4 = this.messagesWithoutClientAck.get(n5) || {};
        s3[n5] = Object.values(o4);
      }
      return s3;
    }), K5(this, "has", (i4, s3) => {
      this.isInitialized();
      const n5 = this.get(i4), o4 = ya(s3);
      return typeof n5[o4] < "u";
    }), K5(this, "ack", async (i4, s3) => {
      this.isInitialized();
      const n5 = this.messagesWithoutClientAck.get(i4);
      if (typeof n5 > "u") return;
      const o4 = ya(s3);
      delete n5[o4], Object.keys(n5).length === 0 ? this.messagesWithoutClientAck.delete(i4) : this.messagesWithoutClientAck.set(i4, n5), await this.persist();
    }), K5(this, "del", async (i4) => {
      this.isInitialized(), this.messages.delete(i4), this.messagesWithoutClientAck.delete(i4), await this.persist();
    }), this.logger = X(e2, this.name), this.core = t;
  }
  get context() {
    return w(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  async setRelayerMessages(e2) {
    await this.core.storage.setItem(this.storageKey, vi(e2));
  }
  async setRelayerMessagesWithoutClientAck(e2) {
    await this.core.storage.setItem(this.storageKeyWithoutClientAck, vi(e2));
  }
  async getRelayerMessages() {
    const e2 = await this.core.storage.getItem(this.storageKey);
    return typeof e2 < "u" ? xi(e2) : void 0;
  }
  async getRelayerMessagesWithoutClientAck() {
    const e2 = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
    return typeof e2 < "u" ? xi(e2) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = Bt2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var Vn3 = Object.defineProperty;
var qn3 = Object.defineProperties;
var Gn3 = Object.getOwnPropertyDescriptors;
var Ti2 = Object.getOwnPropertySymbols;
var Wn3 = Object.prototype.hasOwnProperty;
var Hn3 = Object.prototype.propertyIsEnumerable;
var He3 = (r3, e2, t) => e2 in r3 ? Vn3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var ce = (r3, e2) => {
  for (var t in e2 || (e2 = {})) Wn3.call(e2, t) && He3(r3, t, e2[t]);
  if (Ti2) for (var t of Ti2(e2)) Hn3.call(e2, t) && He3(r3, t, e2[t]);
  return r3;
};
var Ci2 = (r3, e2) => qn3(r3, Gn3(e2));
var G3 = (r3, e2, t) => He3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Yn3 = class extends m2 {
  constructor(e2, t) {
    super(e2, t), this.relayer = e2, this.logger = t, G3(this, "events", new import_events7.EventEmitter()), G3(this, "name", xt3), G3(this, "queue", /* @__PURE__ */ new Map()), G3(this, "publishTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE)), G3(this, "initialPublishTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15)), G3(this, "needsTransportRestart", false), G3(this, "publish", async (i4, s3, n5) => {
      var o4, a4, c6, h5, l6;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i4, message: s3, opts: n5 } });
      const g3 = n5?.ttl || At2, y4 = n5?.prompt || false, _4 = n5?.tag || 0, u2 = n5?.id || getBigIntRpcId().toString(), m3 = Oa(Sa().protocol), D3 = { id: u2, method: n5?.publishMethod || m3.publish, params: ce({ topic: i4, message: s3, ttl: g3, prompt: y4, tag: _4, attestation: n5?.attestation }, n5?.tvf) }, w3 = `Failed to publish payload, please try again. id:${u2} tag:${_4}`;
      try {
        Dt2((o4 = D3.params) == null ? void 0 : o4.prompt) && ((a4 = D3.params) == null || delete a4.prompt), Dt2((c6 = D3.params) == null ? void 0 : c6.tag) && ((h5 = D3.params) == null || delete h5.tag);
        const E4 = new Promise(async (L2) => {
          const I3 = ({ id: T3 }) => {
            var S4;
            ((S4 = D3.id) == null ? void 0 : S4.toString()) === T3.toString() && (this.removeRequestFromQueue(T3), this.relayer.events.removeListener(C3.publish, I3), L2());
          };
          this.relayer.events.on(C3.publish, I3);
          const k5 = Si(new Promise((T3, S4) => {
            this.rpcPublish(D3, n5).then(T3).catch((O5) => {
              this.logger.warn(O5, O5?.message), S4(O5);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${u2} tag:${_4}`);
          try {
            await k5, this.events.removeListener(C3.publish, I3);
          } catch (T3) {
            this.queue.set(u2, { request: D3, opts: n5, attempt: 1 }), this.logger.warn(T3, T3?.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: u2, topic: i4, message: s3, opts: n5 } }), await Si(E4, this.publishTimeout, w3);
      } catch (E4) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(E4), (l6 = n5?.internal) != null && l6.throwOnFailedPublish) throw E4;
      } finally {
        this.queue.delete(u2);
      }
    }), G3(this, "publishCustom", async (i4) => {
      var s3, n5, o4, a4, c6;
      this.logger.debug("Publishing custom payload"), this.logger.trace({ type: "method", method: "publishCustom", params: i4 });
      const { payload: h5, opts: l6 = {} } = i4, { attestation: g3, tvf: y4, publishMethod: _4, prompt: u2, tag: m3, ttl: D3 = import_time4.FIVE_MINUTES } = l6, w3 = l6.id || getBigIntRpcId().toString(), E4 = Oa(Sa().protocol), L2 = _4 || E4.publish, I3 = { id: w3, method: L2, params: ce(Ci2(ce({}, h5), { ttl: D3, prompt: u2, tag: m3, attestation: g3 }), y4) }, k5 = `Failed to publish custom payload, please try again. id:${w3} tag:${m3}`;
      try {
        Dt2((s3 = I3.params) == null ? void 0 : s3.prompt) && ((n5 = I3.params) == null || delete n5.prompt), Dt2((o4 = I3.params) == null ? void 0 : o4.tag) && ((a4 = I3.params) == null || delete a4.tag);
        const T3 = new Promise(async (S4) => {
          const O5 = ({ id: Z }) => {
            var we4;
            ((we4 = I3.id) == null ? void 0 : we4.toString()) === Z.toString() && (this.removeRequestFromQueue(Z), this.relayer.events.removeListener(C3.publish, O5), S4());
          };
          this.relayer.events.on(C3.publish, O5);
          const te3 = Si(new Promise((Z, we4) => {
            this.rpcPublish(I3, l6).then(Z).catch((Ee3) => {
              this.logger.warn(Ee3, Ee3?.message), we4(Ee3);
            });
          }), this.initialPublishTimeout, `Failed initial custom payload publish, retrying.... method:${L2} id:${w3} tag:${m3}`);
          try {
            await te3, this.events.removeListener(C3.publish, O5);
          } catch (Z) {
            this.queue.set(w3, { request: I3, opts: l6, attempt: 1 }), this.logger.warn(Z, Z?.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: w3, payload: h5, opts: l6 } }), await Si(T3, this.publishTimeout, k5);
      } catch (T3) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(T3), (c6 = l6?.internal) != null && c6.throwOnFailedPublish) throw T3;
      } finally {
        this.queue.delete(w3);
      }
    }), G3(this, "on", (i4, s3) => {
      this.events.on(i4, s3);
    }), G3(this, "once", (i4, s3) => {
      this.events.once(i4, s3);
    }), G3(this, "off", (i4, s3) => {
      this.events.off(i4, s3);
    }), G3(this, "removeListener", (i4, s3) => {
      this.events.removeListener(i4, s3);
    }), this.relayer = e2, this.logger = X(t, this.name), this.registerEventListeners();
  }
  get context() {
    return w(this.logger);
  }
  async rpcPublish(e2, t) {
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: e2 });
    const i4 = await this.relayer.request(e2);
    return this.relayer.events.emit(C3.publish, ce(ce({}, e2), t)), this.logger.debug("Successfully Published Payload"), i4;
  }
  removeRequestFromQueue(e2) {
    this.queue.delete(e2);
  }
  checkQueue() {
    this.queue.forEach(async (e2, t) => {
      var i4;
      const s3 = e2.attempt + 1;
      this.queue.set(t, Ci2(ce({}, e2), { attempt: s3 })), this.logger.warn({}, `Publisher: queue->publishing: ${e2.request.id}, tag: ${(i4 = e2.request.params) == null ? void 0 : i4.tag}, attempt: ${s3}`), await this.rpcPublish(e2.request, e2.opts), this.logger.warn({}, `Publisher: queue->published: ${e2.request.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(C3.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(C3.message_ack, (e2) => {
      this.removeRequestFromQueue(e2.id.toString());
    });
  }
};
var Jn3 = Object.defineProperty;
var Xn3 = (r3, e2, t) => e2 in r3 ? Jn3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var he3 = (r3, e2, t) => Xn3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Zn3 = class {
  constructor() {
    he3(this, "map", /* @__PURE__ */ new Map()), he3(this, "set", (e2, t) => {
      const i4 = this.get(e2);
      this.exists(e2, t) || this.map.set(e2, [...i4, t]);
    }), he3(this, "get", (e2) => this.map.get(e2) || []), he3(this, "exists", (e2, t) => this.get(e2).includes(t)), he3(this, "delete", (e2, t) => {
      if (typeof t > "u") {
        this.map.delete(e2);
        return;
      }
      if (!this.map.has(e2)) return;
      const i4 = this.get(e2);
      if (!this.exists(e2, t)) return;
      const s3 = i4.filter((n5) => n5 !== t);
      if (!s3.length) {
        this.map.delete(e2);
        return;
      }
      this.map.set(e2, s3);
    }), he3(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
};
var Qn2 = Object.defineProperty;
var eo3 = Object.defineProperties;
var to3 = Object.getOwnPropertyDescriptors;
var Pi2 = Object.getOwnPropertySymbols;
var io2 = Object.prototype.hasOwnProperty;
var so2 = Object.prototype.propertyIsEnumerable;
var Ye3 = (r3, e2, t) => e2 in r3 ? Qn2(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var fe2 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) io2.call(e2, t) && Ye3(r3, t, e2[t]);
  if (Pi2) for (var t of Pi2(e2)) so2.call(e2, t) && Ye3(r3, t, e2[t]);
  return r3;
};
var Je3 = (r3, e2) => eo3(r3, to3(e2));
var f4 = (r3, e2, t) => Ye3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Si2 = class extends P2 {
  constructor(e2, t) {
    super(e2, t), this.relayer = e2, this.logger = t, f4(this, "subscriptions", /* @__PURE__ */ new Map()), f4(this, "topicMap", new Zn3()), f4(this, "events", new import_events7.EventEmitter()), f4(this, "name", Ft3), f4(this, "version", Mt3), f4(this, "pending", /* @__PURE__ */ new Map()), f4(this, "cached", []), f4(this, "initialized", false), f4(this, "storagePrefix", W3), f4(this, "subscribeTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE)), f4(this, "initialSubscribeTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15)), f4(this, "clientId"), f4(this, "batchSubscribeTopicsLimit", 500), f4(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = true;
    }), f4(this, "subscribe", async (i4, s3) => {
      var n5;
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i4, opts: s3 } });
      try {
        const o4 = Sa(s3), a4 = { topic: i4, relay: o4, transportType: s3?.transportType };
        (n5 = s3?.internal) != null && n5.skipSubscribe || this.pending.set(i4, a4);
        const c6 = await this.rpcSubscribe(i4, o4, s3);
        return typeof c6 == "string" && (this.onSubscribe(c6, a4), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i4, opts: s3 } })), c6;
      } catch (o4) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(o4), o4;
      }
    }), f4(this, "unsubscribe", async (i4, s3) => {
      this.isInitialized(), typeof s3?.id < "u" ? await this.unsubscribeById(i4, s3.id, s3) : await this.unsubscribeByTopic(i4, s3);
    }), f4(this, "isSubscribed", (i4) => new Promise((s3) => {
      s3(this.topicMap.topics.includes(i4));
    })), f4(this, "isKnownTopic", (i4) => new Promise((s3) => {
      s3(this.topicMap.topics.includes(i4) || this.pending.has(i4) || this.cached.some((n5) => n5.topic === i4));
    })), f4(this, "on", (i4, s3) => {
      this.events.on(i4, s3);
    }), f4(this, "once", (i4, s3) => {
      this.events.once(i4, s3);
    }), f4(this, "off", (i4, s3) => {
      this.events.off(i4, s3);
    }), f4(this, "removeListener", (i4, s3) => {
      this.events.removeListener(i4, s3);
    }), f4(this, "start", async () => {
      await this.onConnect();
    }), f4(this, "stop", async () => {
      await this.onDisconnect();
    }), f4(this, "restart", async () => {
      await this.restore(), await this.onRestart();
    }), f4(this, "checkPending", async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const i4 = [];
      this.pending.forEach((s3) => {
        i4.push(s3);
      }), await this.batchSubscribe(i4);
    }), f4(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(r.pulse, async () => {
        await this.checkPending();
      }), this.events.on(j4.created, async (i4) => {
        const s3 = j4.created;
        this.logger.info(`Emitting ${s3}`), this.logger.debug({ type: "event", event: s3, data: i4 }), await this.persist();
      }), this.events.on(j4.deleted, async (i4) => {
        const s3 = j4.deleted;
        this.logger.info(`Emitting ${s3}`), this.logger.debug({ type: "event", event: s3, data: i4 }), await this.persist();
      });
    }), this.relayer = e2, this.logger = X(t, this.name), this.clientId = "";
  }
  get context() {
    return w(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(e2, t) {
    let i4 = false;
    try {
      i4 = this.getSubscription(e2).topic === t;
    } catch {
    }
    return i4;
  }
  reset() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e2, t) {
    const i4 = this.topicMap.get(e2);
    await Promise.all(i4.map(async (s3) => await this.unsubscribeById(e2, s3, t)));
  }
  async unsubscribeById(e2, t, i4) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e2, id: t, opts: i4 } });
    try {
      const s3 = Sa(i4);
      await this.restartToComplete({ topic: e2, id: t, relay: s3 }), await this.rpcUnsubscribe(e2, t, s3);
      const n5 = zt2("USER_DISCONNECTED", `${this.name}, ${e2}`);
      await this.onUnsubscribe(e2, t, n5), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e2, id: t, opts: i4 } });
    } catch (s3) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(s3), s3;
    }
  }
  async rpcSubscribe(e2, t, i4) {
    var s3, n5;
    const o4 = await this.getSubscriptionId(e2);
    if ((s3 = i4?.internal) != null && s3.skipSubscribe) return o4;
    (!i4 || i4?.transportType === ee2.relay) && await this.restartToComplete({ topic: e2, id: e2, relay: t });
    const a4 = { method: Oa(t.protocol).subscribe, params: { topic: e2 } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: a4 });
    const c6 = (n5 = i4?.internal) == null ? void 0 : n5.throwOnFailedPublish;
    try {
      if (i4?.transportType === ee2.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(a4).catch((g3) => this.logger.warn(g3));
      }, (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND)), o4;
      const h5 = new Promise(async (g3) => {
        const y4 = (_4) => {
          _4.topic === e2 && (this.events.removeListener(j4.created, y4), g3(_4.id));
        };
        this.events.on(j4.created, y4);
        try {
          const _4 = await Si(new Promise((u2, m3) => {
            this.relayer.request(a4).catch((D3) => {
              this.logger.warn(D3, D3?.message), m3(D3);
            }).then(u2);
          }), this.initialSubscribeTimeout, `Subscribing to ${e2} failed, please try again`);
          this.events.removeListener(j4.created, y4), g3(_4);
        } catch {
        }
      }), l6 = await Si(h5, this.subscribeTimeout, `Subscribing to ${e2} failed, please try again`);
      if (!l6 && c6) throw new Error(`Subscribing to ${e2} failed, please try again`);
      return l6 ? o4 : null;
    } catch (h5) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(C3.connection_stalled), c6) throw h5;
    }
    return null;
  }
  async rpcBatchSubscribe(e2) {
    if (!e2.length) return;
    const t = e2[0].relay, i4 = { method: Oa(t.protocol).batchSubscribe, params: { topics: e2.map((s3) => s3.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i4 });
    try {
      await await Si(new Promise((s3) => {
        this.relayer.request(i4).catch((n5) => this.logger.warn(n5)).then(s3);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(C3.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e2) {
    if (!e2.length) return;
    const t = e2[0].relay, i4 = { method: Oa(t.protocol).batchFetchMessages, params: { topics: e2.map((n5) => n5.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i4 });
    let s3;
    try {
      s3 = await await Si(new Promise((n5, o4) => {
        this.relayer.request(i4).catch((a4) => {
          this.logger.warn(a4), o4(a4);
        }).then(n5);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(C3.connection_stalled);
    }
    return s3;
  }
  rpcUnsubscribe(e2, t, i4) {
    const s3 = { method: Oa(i4.protocol).unsubscribe, params: { topic: e2, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s3 }), this.relayer.request(s3);
  }
  onSubscribe(e2, t) {
    this.setSubscription(e2, Je3(fe2({}, t), { id: e2 })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e2) {
    e2.length && e2.forEach((t) => {
      this.setSubscription(t.id, fe2({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e2, t, i4) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e2) && this.deleteSubscription(t, i4), await this.relayer.messages.del(e2);
  }
  async setRelayerSubscriptions(e2) {
    await this.relayer.core.storage.setItem(this.storageKey, e2);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e2, t) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e2, subscription: t }), this.addSubscription(e2, t);
  }
  addSubscription(e2, t) {
    this.subscriptions.set(e2, fe2({}, t)), this.topicMap.set(t.topic, e2), this.events.emit(j4.created, t);
  }
  getSubscription(e2) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e2 });
    const t = this.subscriptions.get(e2);
    if (!t) {
      const { message: i4 } = Bt2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw new Error(i4);
    }
    return t;
  }
  deleteSubscription(e2, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e2, reason: t });
    const i4 = this.getSubscription(e2);
    this.subscriptions.delete(e2), this.topicMap.delete(i4.topic, e2), this.events.emit(j4.deleted, Je3(fe2({}, i4), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(j4.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e2 = [...this.cached], t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let i4 = 0; i4 < t; i4++) {
        const s3 = e2.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(s3);
      }
    }
    this.events.emit(j4.resubscribed);
  }
  async restore() {
    try {
      const e2 = await this.getRelayerSubscriptions();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.subscriptions.size && !e2.every((t) => {
        var i4;
        return t.topic === ((i4 = this.subscriptions.get(t.id)) == null ? void 0 : i4.topic);
      })) {
        const { message: t } = Bt2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e2);
    }
  }
  async batchSubscribe(e2) {
    e2.length && (await this.rpcBatchSubscribe(e2), this.onBatchSubscribe(await Promise.all(e2.map(async (t) => Je3(fe2({}, t), { id: await this.getSubscriptionId(t.topic) })))));
  }
  async batchFetchMessages(e2) {
    if (!e2.length) return;
    this.logger.trace(`Fetching batch messages for ${e2.length} subscriptions`);
    const t = await this.rpcBatchFetchMessages(e2);
    t && t.messages && (await Pi((0, import_time4.toMiliseconds)(import_time4.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = Bt2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  async restartToComplete(e2) {
    !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e2), await this.relayer.transportOpen());
  }
  async getClientId() {
    return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
  }
  async getSubscriptionId(e2) {
    return ya(e2 + await this.getClientId());
  }
};
var ro3 = Object.defineProperty;
var Oi2 = Object.getOwnPropertySymbols;
var no3 = Object.prototype.hasOwnProperty;
var oo2 = Object.prototype.propertyIsEnumerable;
var Xe3 = (r3, e2, t) => e2 in r3 ? ro3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var Ri2 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) no3.call(e2, t) && Xe3(r3, t, e2[t]);
  if (Oi2) for (var t of Oi2(e2)) oo2.call(e2, t) && Xe3(r3, t, e2[t]);
  return r3;
};
var p3 = (r3, e2, t) => Xe3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Ai2 = class extends d {
  constructor(e2) {
    var t;
    super(e2), p3(this, "protocol", "wc"), p3(this, "version", 2), p3(this, "core"), p3(this, "logger"), p3(this, "events", new import_events7.EventEmitter()), p3(this, "provider"), p3(this, "messages"), p3(this, "subscriber"), p3(this, "publisher"), p3(this, "name", zt3), p3(this, "transportExplicitlyClosed", false), p3(this, "initialized", false), p3(this, "connectionAttemptInProgress", false), p3(this, "relayUrl"), p3(this, "projectId"), p3(this, "packageName"), p3(this, "bundleId"), p3(this, "hasExperiencedNetworkDisruption", false), p3(this, "pingTimeout"), p3(this, "heartBeatTimeout", (0, import_time4.toMiliseconds)(import_time4.THIRTY_SECONDS + import_time4.FIVE_SECONDS)), p3(this, "reconnectTimeout"), p3(this, "connectPromise"), p3(this, "reconnectInProgress", false), p3(this, "requestsInFlight", []), p3(this, "connectTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15)), p3(this, "request", async (i4) => {
      var s3, n5;
      this.logger.debug("Publishing Request Payload");
      const o4 = i4.id || getBigIntRpcId().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: o4, method: i4.method, topic: (s3 = i4.params) == null ? void 0 : s3.topic }, "relayer.request - publishing...");
        const a4 = `${o4}:${((n5 = i4.params) == null ? void 0 : n5.tag) || ""}`;
        this.requestsInFlight.push(a4);
        const c6 = await this.provider.request(i4);
        return this.requestsInFlight = this.requestsInFlight.filter((h5) => h5 !== a4), c6;
      } catch (a4) {
        throw this.logger.debug(`Failed to Publish Request: ${o4}`), a4;
      }
    }), p3(this, "resetPingTimeout", () => {
      rn2() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        var i4, s3, n5, o4;
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (o4 = (n5 = (s3 = (i4 = this.provider) == null ? void 0 : i4.connection) == null ? void 0 : s3.socket) == null ? void 0 : n5.terminate) == null || o4.call(n5);
        } catch (a4) {
          this.logger.warn(a4, a4?.message);
        }
      }, this.heartBeatTimeout));
    }), p3(this, "onPayloadHandler", (i4) => {
      this.onProviderPayload(i4), this.resetPingTimeout();
    }), p3(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected \u{1F6DC}"), this.startPingTimeout(), this.events.emit(C3.connect);
    }), p3(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected \u{1F6D1}"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), p3(this, "onProviderErrorHandler", (i4) => {
      this.logger.fatal(`Fatal socket error: ${i4.message}`), this.events.emit(C3.error, i4), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), p3(this, "registerProviderListeners", () => {
      this.provider.on(M4.payload, this.onPayloadHandler), this.provider.on(M4.connect, this.onConnectHandler), this.provider.on(M4.disconnect, this.onDisconnectHandler), this.provider.on(M4.error, this.onProviderErrorHandler);
    }), this.core = e2.core, this.logger = Iu({ logger: (t = e2.logger) != null ? t : $t3, name: this.name }), this.messages = new Ii(this.logger, e2.core), this.subscriber = new Si2(this, this.logger), this.publisher = new Yn3(this, this.logger), this.projectId = e2?.projectId, this.relayUrl = e2?.relayUrl || Ke3, li() ? this.packageName = hi() : di() && (this.bundleId = hi()), this.provider = {};
  }
  async init() {
    this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = true, this.transportOpen().catch((e2) => this.logger.warn(e2, e2?.message));
  }
  get context() {
    return w(this.logger);
  }
  get connected() {
    var e2, t, i4;
    return ((i4 = (t = (e2 = this.provider) == null ? void 0 : e2.connection) == null ? void 0 : t.socket) == null ? void 0 : i4.readyState) === 1 || false;
  }
  get connecting() {
    var e2, t, i4;
    return ((i4 = (t = (e2 = this.provider) == null ? void 0 : e2.connection) == null ? void 0 : t.socket) == null ? void 0 : i4.readyState) === 0 || this.connectPromise !== void 0 || false;
  }
  async publish(e2, t, i4) {
    this.isInitialized(), await this.publisher.publish(e2, t, i4), await this.recordMessageEvent({ topic: e2, message: t, publishedAt: Date.now(), transportType: ee2.relay }, ye3.outbound);
  }
  async publishCustom(e2) {
    this.isInitialized(), await this.publisher.publishCustom(e2);
  }
  async subscribe(e2, t) {
    var i4, s3, n5;
    this.isInitialized(), (!(t != null && t.transportType) || t?.transportType === "relay") && await this.toEstablishConnection();
    const o4 = typeof ((i4 = t?.internal) == null ? void 0 : i4.throwOnFailedPublish) > "u" ? true : (s3 = t?.internal) == null ? void 0 : s3.throwOnFailedPublish;
    let a4 = ((n5 = this.subscriber.topicMap.get(e2)) == null ? void 0 : n5[0]) || "", c6;
    const h5 = (l6) => {
      l6.topic === e2 && (this.subscriber.off(j4.created, h5), c6());
    };
    return await Promise.all([new Promise((l6) => {
      c6 = l6, this.subscriber.on(j4.created, h5);
    }), new Promise(async (l6, g3) => {
      a4 = await this.subscriber.subscribe(e2, Ri2({ internal: { throwOnFailedPublish: o4 } }, t)).catch((y4) => {
        o4 && g3(y4);
      }) || a4, l6();
    })]), a4;
  }
  async unsubscribe(e2, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e2, t);
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await Si(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, await this.transportDisconnect();
  }
  async transportOpen(e2) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.info("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t, i4) => {
      await this.connect(e2).then(t).catch(i4).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e2) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e2 || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await gu()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e2) {
    if (e2?.length === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t = e2.sort((i4, s3) => i4.publishedAt - s3.publishedAt);
    this.logger.debug(`Batch of ${t.length} message events sorted`);
    for (const i4 of t) try {
      await this.onMessageEvent(i4);
    } catch (s3) {
      this.logger.warn(s3, "Error while processing batch message event: " + s3?.message);
    }
    this.logger.trace(`Batch of ${t.length} message events processed`);
  }
  async onLinkMessageEvent(e2, t) {
    const { topic: i4 } = e2;
    if (!t.sessionExists) {
      const s3 = _i(import_time4.FIVE_MINUTES), n5 = { topic: i4, expiry: s3, relay: { protocol: "irn" }, active: false };
      await this.core.pairing.pairings.set(i4, n5);
    }
    this.events.emit(C3.message, e2), await this.recordMessageEvent(e2, ye3.inbound);
  }
  async connect(e2) {
    await this.confirmOnlineStateOrThrow(), e2 && e2 !== this.relayUrl && (this.relayUrl = e2, await this.transportDisconnect()), this.connectionAttemptInProgress = true, this.transportExplicitlyClosed = false;
    let t = 1;
    for (; t < 6; ) {
      try {
        if (this.transportExplicitlyClosed) break;
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t}...`), await this.createProvider(), await new Promise(async (i4, s3) => {
          const n5 = () => {
            s3(new Error("Connection interrupted while trying to connect"));
          };
          this.provider.once(M4.disconnect, n5), await Si(new Promise((o4, a4) => {
            this.provider.connect().then(o4).catch(a4);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o4) => {
            s3(o4);
          }).finally(() => {
            this.provider.off(M4.disconnect, n5), clearTimeout(this.reconnectTimeout);
          }), await new Promise(async (o4, a4) => {
            const c6 = () => {
              s3(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(M4.disconnect, c6), await this.subscriber.start().then(o4).catch(a4).finally(() => {
              this.provider.off(M4.disconnect, c6);
            });
          }), this.hasExperiencedNetworkDisruption = false, i4();
        });
      } catch (i4) {
        await this.subscriber.stop();
        const s3 = i4;
        this.logger.warn({}, s3.message), this.hasExperiencedNetworkDisruption = true;
      } finally {
        this.connectionAttemptInProgress = false;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t}`);
        break;
      }
      await new Promise((i4) => setTimeout(i4, (0, import_time4.toMiliseconds)(t * 1))), t++;
    }
  }
  startPingTimeout() {
    var e2, t, i4, s3, n5;
    if (rn2()) try {
      (t = (e2 = this.provider) == null ? void 0 : e2.connection) != null && t.socket && ((n5 = (s3 = (i4 = this.provider) == null ? void 0 : i4.connection) == null ? void 0 : s3.socket) == null || n5.on("ping", () => {
        this.resetPingTimeout();
      })), this.resetPingTimeout();
    } catch (o4) {
      this.logger.warn(o4, o4?.message);
    }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e2 = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new o3(new f3(bi({ sdkVersion: Pe3, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e2, useOnCloseEvent: true, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e2, t) {
    const { topic: i4, message: s3 } = e2;
    await this.messages.set(i4, s3, t);
  }
  async shouldIgnoreMessageEvent(e2) {
    const { topic: t, message: i4 } = e2;
    if (!i4 || i4.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${i4}`), true;
    if (!await this.subscriber.isKnownTopic(t)) return this.logger.warn(`Ignoring message for unknown topic ${t}`), true;
    const s3 = this.messages.has(t, i4);
    return s3 && this.logger.warn(`Ignoring duplicate message: ${i4}`), s3;
  }
  async onProviderPayload(e2) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e2 }), isJsonRpcRequest(e2)) {
      if (!e2.method.endsWith(Lt3)) return;
      const t = e2.params, { topic: i4, message: s3, publishedAt: n5, attestation: o4 } = t.data, a4 = { topic: i4, message: s3, publishedAt: n5, transportType: ee2.relay, attestation: o4 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Ri2({ type: "event", event: t.id }, a4)), this.events.emit(t.id, a4), await this.acknowledgePayload(e2), await this.onMessageEvent(a4);
    } else isJsonRpcResponse(e2) && this.events.emit(C3.message_ack, e2);
  }
  async onMessageEvent(e2) {
    await this.shouldIgnoreMessageEvent(e2) || (await this.recordMessageEvent(e2, ye3.inbound), this.events.emit(C3.message, e2));
  }
  async acknowledgePayload(e2) {
    const t = formatJsonRpcResult(e2.id, true);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(M4.payload, this.onPayloadHandler), this.provider.off(M4.connect, this.onConnectHandler), this.provider.off(M4.disconnect, this.onDisconnectHandler), this.provider.off(M4.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e2 = await gu();
    bu(async (t) => {
      e2 !== t && (e2 = t, t ? await this.transportOpen().catch((i4) => this.logger.error(i4, i4?.message)) : (this.hasExperiencedNetworkDisruption = true, await this.transportDisconnect(), this.transportExplicitlyClosed = false));
    }), this.core.heartbeat.on(r.pulse, async () => {
      if (!this.transportExplicitlyClosed && !this.connected && yu()) try {
        await this.confirmOnlineStateOrThrow(), await this.transportOpen();
      } catch (t) {
        this.logger.warn(t, t?.message);
      }
    });
  }
  async onProviderDisconnect() {
    clearTimeout(this.pingTimeout), this.events.emit(C3.disconnect), this.connectionAttemptInProgress = false, !this.reconnectInProgress && (this.reconnectInProgress = true, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e2) => this.logger.error(e2, e2?.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = false;
    }, (0, import_time4.toMiliseconds)(kt3)))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = Bt2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  async toEstablishConnection() {
    if (await this.confirmOnlineStateOrThrow(), !this.connected) {
      if (this.connectPromise) {
        await this.connectPromise;
        return;
      }
      await this.connect();
    }
  }
};
function ao3(r3, e2) {
  return r3 === e2 || Number.isNaN(r3) && Number.isNaN(e2);
}
function xi2(r3) {
  return Object.getOwnPropertySymbols(r3).filter((e2) => Object.prototype.propertyIsEnumerable.call(r3, e2));
}
function Ni2(r3) {
  return r3 == null ? r3 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r3);
}
var co3 = "[object RegExp]";
var ho2 = "[object String]";
var lo3 = "[object Number]";
var uo2 = "[object Boolean]";
var $i2 = "[object Arguments]";
var po3 = "[object Symbol]";
var go3 = "[object Date]";
var yo3 = "[object Map]";
var bo3 = "[object Set]";
var mo3 = "[object Array]";
var fo3 = "[object Function]";
var Do3 = "[object ArrayBuffer]";
var Ze3 = "[object Object]";
var vo3 = "[object Error]";
var _o3 = "[object DataView]";
var wo3 = "[object Uint8Array]";
var Eo3 = "[object Uint8ClampedArray]";
var Io3 = "[object Uint16Array]";
var To3 = "[object Uint32Array]";
var Co3 = "[object BigUint64Array]";
var Po3 = "[object Int8Array]";
var So3 = "[object Int16Array]";
var Oo3 = "[object Int32Array]";
var Ro3 = "[object BigInt64Array]";
var Ao3 = "[object Float32Array]";
var xo3 = "[object Float64Array]";
function No3() {
}
function zi2(r3) {
  if (!r3 || typeof r3 != "object") return false;
  const e2 = Object.getPrototypeOf(r3);
  return e2 === null || e2 === Object.prototype || Object.getPrototypeOf(e2) === null ? Object.prototype.toString.call(r3) === "[object Object]" : false;
}
function $o3(r3, e2, t) {
  return De3(r3, e2, void 0, void 0, void 0, void 0, t);
}
function De3(r3, e2, t, i4, s3, n5, o4) {
  const a4 = o4(r3, e2, t, i4, s3, n5);
  if (a4 !== void 0) return a4;
  if (typeof r3 == typeof e2) switch (typeof r3) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return r3 === e2;
    case "number":
      return r3 === e2 || Object.is(r3, e2);
    case "function":
      return r3 === e2;
    case "object":
      return ve3(r3, e2, n5, o4);
  }
  return ve3(r3, e2, n5, o4);
}
function ve3(r3, e2, t, i4) {
  if (Object.is(r3, e2)) return true;
  let s3 = Ni2(r3), n5 = Ni2(e2);
  if (s3 === $i2 && (s3 = Ze3), n5 === $i2 && (n5 = Ze3), s3 !== n5) return false;
  switch (s3) {
    case ho2:
      return r3.toString() === e2.toString();
    case lo3: {
      const c6 = r3.valueOf(), h5 = e2.valueOf();
      return ao3(c6, h5);
    }
    case uo2:
    case go3:
    case po3:
      return Object.is(r3.valueOf(), e2.valueOf());
    case co3:
      return r3.source === e2.source && r3.flags === e2.flags;
    case fo3:
      return r3 === e2;
  }
  t = t ?? /* @__PURE__ */ new Map();
  const o4 = t.get(r3), a4 = t.get(e2);
  if (o4 != null && a4 != null) return o4 === e2;
  t.set(r3, e2), t.set(e2, r3);
  try {
    switch (s3) {
      case yo3: {
        if (r3.size !== e2.size) return false;
        for (const [c6, h5] of r3.entries()) if (!e2.has(c6) || !De3(h5, e2.get(c6), c6, r3, e2, t, i4)) return false;
        return true;
      }
      case bo3: {
        if (r3.size !== e2.size) return false;
        const c6 = Array.from(r3.values()), h5 = Array.from(e2.values());
        for (let l6 = 0; l6 < c6.length; l6++) {
          const g3 = c6[l6], y4 = h5.findIndex((_4) => De3(g3, _4, void 0, r3, e2, t, i4));
          if (y4 === -1) return false;
          h5.splice(y4, 1);
        }
        return true;
      }
      case mo3:
      case wo3:
      case Eo3:
      case Io3:
      case To3:
      case Co3:
      case Po3:
      case So3:
      case Oo3:
      case Ro3:
      case Ao3:
      case xo3: {
        if (typeof Buffer < "u" && Buffer.isBuffer(r3) !== Buffer.isBuffer(e2) || r3.length !== e2.length) return false;
        for (let c6 = 0; c6 < r3.length; c6++) if (!De3(r3[c6], e2[c6], c6, r3, e2, t, i4)) return false;
        return true;
      }
      case Do3:
        return r3.byteLength !== e2.byteLength ? false : ve3(new Uint8Array(r3), new Uint8Array(e2), t, i4);
      case _o3:
        return r3.byteLength !== e2.byteLength || r3.byteOffset !== e2.byteOffset ? false : ve3(new Uint8Array(r3), new Uint8Array(e2), t, i4);
      case vo3:
        return r3.name === e2.name && r3.message === e2.message;
      case Ze3: {
        if (!(ve3(r3.constructor, e2.constructor, t, i4) || zi2(r3) && zi2(e2))) return false;
        const h5 = [...Object.keys(r3), ...xi2(r3)], l6 = [...Object.keys(e2), ...xi2(e2)];
        if (h5.length !== l6.length) return false;
        for (let g3 = 0; g3 < h5.length; g3++) {
          const y4 = h5[g3], _4 = r3[y4];
          if (!Object.hasOwn(e2, y4)) return false;
          const u2 = e2[y4];
          if (!De3(_4, u2, y4, r3, e2, t, i4)) return false;
        }
        return true;
      }
      default:
        return false;
    }
  } finally {
    t.delete(r3), t.delete(e2);
  }
}
function zo3(r3, e2) {
  return $o3(r3, e2, No3);
}
var Lo3 = Object.defineProperty;
var Li2 = Object.getOwnPropertySymbols;
var ko3 = Object.prototype.hasOwnProperty;
var jo3 = Object.prototype.propertyIsEnumerable;
var Qe2 = (r3, e2, t) => e2 in r3 ? Lo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var ki2 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) ko3.call(e2, t) && Qe2(r3, t, e2[t]);
  if (Li2) for (var t of Li2(e2)) jo3.call(e2, t) && Qe2(r3, t, e2[t]);
  return r3;
};
var U2 = (r3, e2, t) => Qe2(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var ji2 = class extends f2 {
  constructor(e2, t, i4, s3 = W3, n5 = void 0) {
    super(e2, t, i4, s3), this.core = e2, this.logger = t, this.name = i4, U2(this, "map", /* @__PURE__ */ new Map()), U2(this, "version", jt3), U2(this, "cached", []), U2(this, "initialized", false), U2(this, "getKey"), U2(this, "storagePrefix", W3), U2(this, "recentlyDeleted", []), U2(this, "recentlyDeletedLimit", 200), U2(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o4) => {
        this.getKey && o4 !== null && !Dt2(o4) ? this.map.set(this.getKey(o4), o4) : Ja(o4) ? this.map.set(o4.id, o4) : Qa(o4) && this.map.set(o4.topic, o4);
      }), this.cached = [], this.initialized = true);
    }), U2(this, "set", async (o4, a4) => {
      this.isInitialized(), this.map.has(o4) ? await this.update(o4, a4) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o4, value: a4 }), this.map.set(o4, a4), await this.persist());
    }), U2(this, "get", (o4) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o4 }), this.getData(o4))), U2(this, "getAll", (o4) => (this.isInitialized(), o4 ? this.values.filter((a4) => Object.keys(o4).every((c6) => zo3(a4[c6], o4[c6]))) : this.values)), U2(this, "update", async (o4, a4) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o4, update: a4 });
      const c6 = ki2(ki2({}, this.getData(o4)), a4);
      this.map.set(o4, c6), await this.persist();
    }), U2(this, "delete", async (o4, a4) => {
      this.isInitialized(), this.map.has(o4) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o4, reason: a4 }), this.map.delete(o4), this.addToRecentlyDeleted(o4), await this.persist());
    }), this.logger = X(t, this.name), this.storagePrefix = s3, this.getKey = n5;
  }
  get context() {
    return w(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e2) {
    this.recentlyDeleted.push(e2), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e2) {
    const t = this.map.get(e2);
    if (!t) {
      if (this.recentlyDeleted.includes(e2)) {
        const { message: s3 } = Bt2("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e2}`);
        throw this.logger.error(s3), new Error(s3);
      }
      const { message: i4 } = Bt2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw this.logger.error(i4), new Error(i4);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e2 = await this.getDataStore();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.map.size) {
        const { message: t } = Bt2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e2);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = Bt2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var Uo3 = Object.defineProperty;
var Fo3 = (r3, e2, t) => e2 in r3 ? Uo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var d3 = (r3, e2, t) => Fo3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Ui2 = class {
  constructor(e2, t) {
    this.core = e2, this.logger = t, d3(this, "name", Kt3), d3(this, "version", Bt3), d3(this, "events", new import_events7.default()), d3(this, "pairings"), d3(this, "initialized", false), d3(this, "storagePrefix", W3), d3(this, "ignoredPayloadTypes", [ie]), d3(this, "registeredMethods", []), d3(this, "init", async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }), d3(this, "register", ({ methods: i4 }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i4])];
    }), d3(this, "create", async (i4) => {
      this.isInitialized();
      const s3 = pa(), n5 = await this.core.crypto.setSymKey(s3), o4 = _i(import_time4.FIVE_MINUTES), a4 = { protocol: Nt3 }, c6 = { topic: n5, expiry: o4, relay: a4, active: false, methods: i4?.methods }, h5 = ja({ protocol: this.core.protocol, version: this.core.version, topic: n5, symKey: s3, relay: a4, expiryTimestamp: o4, methods: i4?.methods });
      return this.events.emit(ae2.create, c6), this.core.expirer.set(n5, o4), await this.pairings.set(n5, c6), await this.core.relayer.subscribe(n5, { transportType: i4?.transportType, internal: i4?.internal }), { topic: n5, uri: h5 };
    }), d3(this, "pair", async (i4) => {
      this.isInitialized();
      const s3 = this.core.eventClient.createEvent({ properties: { topic: i4?.uri, trace: [Y2.pairing_started] } });
      this.isValidPair(i4, s3);
      const { topic: n5, symKey: o4, relay: a4, expiryTimestamp: c6, methods: h5 } = Ca(i4.uri);
      s3.props.properties.topic = n5, s3.addTrace(Y2.pairing_uri_validation_success), s3.addTrace(Y2.pairing_uri_not_expired);
      let l6;
      if (this.pairings.keys.includes(n5)) {
        if (l6 = this.pairings.get(n5), s3.addTrace(Y2.existing_pairing), l6.active) throw s3.setError(X3.active_pairing_already_exists), new Error(`Pairing already exists: ${n5}. Please try again with a new connection URI.`);
        s3.addTrace(Y2.pairing_not_expired);
      }
      const g3 = c6 || _i(import_time4.FIVE_MINUTES), y4 = { topic: n5, relay: a4, expiry: g3, active: false, methods: h5 };
      this.core.expirer.set(n5, g3), await this.pairings.set(n5, y4), s3.addTrace(Y2.store_new_pairing), i4.activatePairing && await this.activate({ topic: n5 }), this.events.emit(ae2.create, y4), s3.addTrace(Y2.emit_inactive_pairing), this.core.crypto.keychain.has(n5) || await this.core.crypto.setSymKey(o4, n5), s3.addTrace(Y2.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        s3.setError(X3.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(n5, { relay: a4 });
      } catch (_4) {
        throw s3.setError(X3.subscribe_pairing_topic_failure), _4;
      }
      return s3.addTrace(Y2.subscribe_pairing_topic_success), y4;
    }), d3(this, "activate", async ({ topic: i4 }) => {
      this.isInitialized();
      const s3 = _i(import_time4.FIVE_MINUTES);
      this.core.expirer.set(i4, s3), await this.pairings.update(i4, { active: true, expiry: s3 });
    }), d3(this, "ping", async (i4) => {
      this.isInitialized(), await this.isValidPing(i4), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: s3 } = i4;
      if (this.pairings.keys.includes(s3)) {
        const n5 = await this.sendRequest(s3, "wc_pairingPing", {}), { done: o4, resolve: a4, reject: c6 } = Ai();
        this.events.once($i("pairing_ping", n5), ({ error: h5 }) => {
          h5 ? c6(h5) : a4();
        }), await o4();
      }
    }), d3(this, "updateExpiry", async ({ topic: i4, expiry: s3 }) => {
      this.isInitialized(), await this.pairings.update(i4, { expiry: s3 });
    }), d3(this, "updateMetadata", async ({ topic: i4, metadata: s3 }) => {
      this.isInitialized(), await this.pairings.update(i4, { peerMetadata: s3 });
    }), d3(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), d3(this, "disconnect", async (i4) => {
      this.isInitialized(), await this.isValidDisconnect(i4);
      const { topic: s3 } = i4;
      this.pairings.keys.includes(s3) && (await this.sendRequest(s3, "wc_pairingDelete", zt2("USER_DISCONNECTED")), await this.deletePairing(s3));
    }), d3(this, "formatUriFromPairing", (i4) => {
      this.isInitialized();
      const { topic: s3, relay: n5, expiry: o4, methods: a4 } = i4, c6 = this.core.crypto.keychain.get(s3);
      return ja({ protocol: this.core.protocol, version: this.core.version, topic: s3, symKey: c6, relay: n5, expiryTimestamp: o4, methods: a4 });
    }), d3(this, "sendRequest", async (i4, s3, n5) => {
      const o4 = formatJsonRpcRequest(s3, n5), a4 = await this.core.crypto.encode(i4, o4), c6 = oe2[s3].req;
      return this.core.history.set(i4, o4), this.core.relayer.publish(i4, a4, c6), o4.id;
    }), d3(this, "sendResult", async (i4, s3, n5) => {
      const o4 = formatJsonRpcResult(i4, n5), a4 = await this.core.crypto.encode(s3, o4), c6 = (await this.core.history.get(s3, i4)).request.method, h5 = oe2[c6].res;
      await this.core.relayer.publish(s3, a4, h5), await this.core.history.resolve(o4);
    }), d3(this, "sendError", async (i4, s3, n5) => {
      const o4 = formatJsonRpcError(i4, n5), a4 = await this.core.crypto.encode(s3, o4), c6 = (await this.core.history.get(s3, i4)).request.method, h5 = oe2[c6] ? oe2[c6].res : oe2.unregistered_method.res;
      await this.core.relayer.publish(s3, a4, h5), await this.core.history.resolve(o4);
    }), d3(this, "deletePairing", async (i4, s3) => {
      await this.core.relayer.unsubscribe(i4), await Promise.all([this.pairings.delete(i4, zt2("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(i4), s3 ? Promise.resolve() : this.core.expirer.del(i4)]);
    }), d3(this, "cleanup", async () => {
      const i4 = this.pairings.getAll().filter((s3) => Ri(s3.expiry));
      await Promise.all(i4.map((s3) => this.deletePairing(s3.topic)));
    }), d3(this, "onRelayEventRequest", async (i4) => {
      const { topic: s3, payload: n5 } = i4;
      switch (n5.method) {
        case "wc_pairingPing":
          return await this.onPairingPingRequest(s3, n5);
        case "wc_pairingDelete":
          return await this.onPairingDeleteRequest(s3, n5);
        default:
          return await this.onUnknownRpcMethodRequest(s3, n5);
      }
    }), d3(this, "onRelayEventResponse", async (i4) => {
      const { topic: s3, payload: n5 } = i4, o4 = (await this.core.history.get(s3, n5.id)).request.method;
      switch (o4) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(s3, n5);
        default:
          return this.onUnknownRpcMethodResponse(o4);
      }
    }), d3(this, "onPairingPingRequest", async (i4, s3) => {
      const { id: n5 } = s3;
      try {
        this.isValidPing({ topic: i4 }), await this.sendResult(n5, i4, true), this.events.emit(ae2.ping, { id: n5, topic: i4 });
      } catch (o4) {
        await this.sendError(n5, i4, o4), this.logger.error(o4);
      }
    }), d3(this, "onPairingPingResponse", (i4, s3) => {
      const { id: n5 } = s3;
      setTimeout(() => {
        isJsonRpcResult(s3) ? this.events.emit($i("pairing_ping", n5), {}) : isJsonRpcError(s3) && this.events.emit($i("pairing_ping", n5), { error: s3.error });
      }, 500);
    }), d3(this, "onPairingDeleteRequest", async (i4, s3) => {
      const { id: n5 } = s3;
      try {
        this.isValidDisconnect({ topic: i4 }), await this.deletePairing(i4), this.events.emit(ae2.delete, { id: n5, topic: i4 });
      } catch (o4) {
        await this.sendError(n5, i4, o4), this.logger.error(o4);
      }
    }), d3(this, "onUnknownRpcMethodRequest", async (i4, s3) => {
      const { id: n5, method: o4 } = s3;
      try {
        if (this.registeredMethods.includes(o4)) return;
        const a4 = zt2("WC_METHOD_UNSUPPORTED", o4);
        await this.sendError(n5, i4, a4), this.logger.error(a4);
      } catch (a4) {
        await this.sendError(n5, i4, a4), this.logger.error(a4);
      }
    }), d3(this, "onUnknownRpcMethodResponse", (i4) => {
      this.registeredMethods.includes(i4) || this.logger.error(zt2("WC_METHOD_UNSUPPORTED", i4));
    }), d3(this, "isValidPair", (i4, s3) => {
      var n5;
      if (!ou(i4)) {
        const { message: a4 } = Bt2("MISSING_OR_INVALID", `pair() params: ${i4}`);
        throw s3.setError(X3.malformed_pairing_uri), new Error(a4);
      }
      if (!Xa(i4.uri)) {
        const { message: a4 } = Bt2("MISSING_OR_INVALID", `pair() uri: ${i4.uri}`);
        throw s3.setError(X3.malformed_pairing_uri), new Error(a4);
      }
      const o4 = Ca(i4?.uri);
      if (!((n5 = o4?.relay) != null && n5.protocol)) {
        const { message: a4 } = Bt2("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw s3.setError(X3.malformed_pairing_uri), new Error(a4);
      }
      if (!(o4 != null && o4.symKey)) {
        const { message: a4 } = Bt2("MISSING_OR_INVALID", "pair() uri#symKey");
        throw s3.setError(X3.malformed_pairing_uri), new Error(a4);
      }
      if (o4 != null && o4.expiryTimestamp && (0, import_time4.toMiliseconds)(o4?.expiryTimestamp) < Date.now()) {
        s3.setError(X3.pairing_expired);
        const { message: a4 } = Bt2("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a4);
      }
    }), d3(this, "isValidPing", async (i4) => {
      if (!ou(i4)) {
        const { message: n5 } = Bt2("MISSING_OR_INVALID", `ping() params: ${i4}`);
        throw new Error(n5);
      }
      const { topic: s3 } = i4;
      await this.isValidPairingTopic(s3);
    }), d3(this, "isValidDisconnect", async (i4) => {
      if (!ou(i4)) {
        const { message: n5 } = Bt2("MISSING_OR_INVALID", `disconnect() params: ${i4}`);
        throw new Error(n5);
      }
      const { topic: s3 } = i4;
      await this.isValidPairingTopic(s3);
    }), d3(this, "isValidPairingTopic", async (i4) => {
      if (!ft2(i4, false)) {
        const { message: s3 } = Bt2("MISSING_OR_INVALID", `pairing topic should be a string: ${i4}`);
        throw new Error(s3);
      }
      if (!this.pairings.keys.includes(i4)) {
        const { message: s3 } = Bt2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i4}`);
        throw new Error(s3);
      }
      if (Ri(this.pairings.get(i4).expiry)) {
        await this.deletePairing(i4);
        const { message: s3 } = Bt2("EXPIRED", `pairing topic: ${i4}`);
        throw new Error(s3);
      }
    }), this.core = e2, this.logger = X(t, this.name), this.pairings = new ji2(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return w(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = Bt2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(C3.message, async (e2) => {
      const { topic: t, message: i4, transportType: s3 } = e2;
      if (this.pairings.keys.includes(t) && s3 !== ee2.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i4))) try {
        const n5 = await this.core.crypto.decode(t, i4);
        isJsonRpcRequest(n5) ? (this.core.history.set(t, n5), await this.onRelayEventRequest({ topic: t, payload: n5 })) : isJsonRpcResponse(n5) && (await this.core.history.resolve(n5), await this.onRelayEventResponse({ topic: t, payload: n5 }), this.core.history.delete(t, n5.id)), await this.core.relayer.messages.ack(t, i4);
      } catch (n5) {
        this.logger.error(n5);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(q.expired, async (e2) => {
      const { topic: t } = Ui(e2.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, true), this.events.emit(ae2.expire, { topic: t }));
    });
  }
};
var Mo3 = Object.defineProperty;
var Ko3 = (r3, e2, t) => e2 in r3 ? Mo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var N10 = (r3, e2, t) => Ko3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Fi2 = class extends I2 {
  constructor(e2, t) {
    super(e2, t), this.core = e2, this.logger = t, N10(this, "records", /* @__PURE__ */ new Map()), N10(this, "events", new import_events7.EventEmitter()), N10(this, "name", Vt3), N10(this, "version", qt3), N10(this, "cached", []), N10(this, "initialized", false), N10(this, "storagePrefix", W3), N10(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i4) => this.records.set(i4.id, i4)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), N10(this, "set", (i4, s3, n5) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: i4, request: s3, chainId: n5 }), this.records.has(s3.id)) return;
      const o4 = { id: s3.id, topic: i4, request: { method: s3.method, params: s3.params || null }, chainId: n5, expiry: _i(import_time4.THIRTY_DAYS) };
      this.records.set(o4.id, o4), this.persist(), this.events.emit(V3.created, o4);
    }), N10(this, "resolve", async (i4) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: i4 }), !this.records.has(i4.id)) return;
      const s3 = await this.getRecord(i4.id);
      typeof s3.response > "u" && (s3.response = isJsonRpcError(i4) ? { error: i4.error } : { result: i4.result }, this.records.set(s3.id, s3), this.persist(), this.events.emit(V3.updated, s3));
    }), N10(this, "get", async (i4, s3) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: i4, id: s3 }), await this.getRecord(s3))), N10(this, "delete", (i4, s3) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: s3 }), this.values.forEach((n5) => {
        if (n5.topic === i4) {
          if (typeof s3 < "u" && n5.id !== s3) return;
          this.records.delete(n5.id), this.events.emit(V3.deleted, n5);
        }
      }), this.persist();
    }), N10(this, "exists", async (i4, s3) => (this.isInitialized(), this.records.has(s3) ? (await this.getRecord(s3)).topic === i4 : false)), N10(this, "on", (i4, s3) => {
      this.events.on(i4, s3);
    }), N10(this, "once", (i4, s3) => {
      this.events.once(i4, s3);
    }), N10(this, "off", (i4, s3) => {
      this.events.off(i4, s3);
    }), N10(this, "removeListener", (i4, s3) => {
      this.events.removeListener(i4, s3);
    }), this.logger = X(t, this.name);
  }
  get context() {
    return w(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e2 = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u") return;
      const i4 = { topic: t.topic, request: formatJsonRpcRequest(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e2.push(i4);
    }), e2;
  }
  async setJsonRpcRecords(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e2) {
    this.isInitialized();
    const t = this.records.get(e2);
    if (!t) {
      const { message: i4 } = Bt2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw new Error(i4);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(V3.sync);
  }
  async restore() {
    try {
      const e2 = await this.getJsonRpcRecords();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.records.size) {
        const { message: t } = Bt2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e2);
    }
  }
  registerEventListeners() {
    this.events.on(V3.created, (e2) => {
      const t = V3.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.events.on(V3.updated, (e2) => {
      const t = V3.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.events.on(V3.deleted, (e2) => {
      const t = V3.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.core.heartbeat.on(r.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e2 = false;
      this.records.forEach((t) => {
        (0, import_time4.toMiliseconds)(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(V3.deleted, t, false), e2 = true);
      }), e2 && this.persist();
    } catch (e2) {
      this.logger.warn(e2);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = Bt2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var Bo3 = Object.defineProperty;
var Vo3 = (r3, e2, t) => e2 in r3 ? Bo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var z4 = (r3, e2, t) => Vo3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Mi2 = class extends S2 {
  constructor(e2, t) {
    super(e2, t), this.core = e2, this.logger = t, z4(this, "expirations", /* @__PURE__ */ new Map()), z4(this, "events", new import_events7.EventEmitter()), z4(this, "name", Gt3), z4(this, "version", Wt3), z4(this, "cached", []), z4(this, "initialized", false), z4(this, "storagePrefix", W3), z4(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i4) => this.expirations.set(i4.target, i4)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), z4(this, "has", (i4) => {
      try {
        const s3 = this.formatTarget(i4);
        return typeof this.getExpiration(s3) < "u";
      } catch {
        return false;
      }
    }), z4(this, "set", (i4, s3) => {
      this.isInitialized();
      const n5 = this.formatTarget(i4), o4 = { target: n5, expiry: s3 };
      this.expirations.set(n5, o4), this.checkExpiry(n5, o4), this.events.emit(q.created, { target: n5, expiration: o4 });
    }), z4(this, "get", (i4) => {
      this.isInitialized();
      const s3 = this.formatTarget(i4);
      return this.getExpiration(s3);
    }), z4(this, "del", (i4) => {
      if (this.isInitialized(), this.has(i4)) {
        const s3 = this.formatTarget(i4), n5 = this.getExpiration(s3);
        this.expirations.delete(s3), this.events.emit(q.deleted, { target: s3, expiration: n5 });
      }
    }), z4(this, "on", (i4, s3) => {
      this.events.on(i4, s3);
    }), z4(this, "once", (i4, s3) => {
      this.events.once(i4, s3);
    }), z4(this, "off", (i4, s3) => {
      this.events.off(i4, s3);
    }), z4(this, "removeListener", (i4, s3) => {
      this.events.removeListener(i4, s3);
    }), this.logger = X(t, this.name);
  }
  get context() {
    return w(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e2) {
    if (typeof e2 == "string") return Oi(e2);
    if (typeof e2 == "number") return Ni(e2);
    const { message: t } = Bt2("UNKNOWN_TYPE", `Target type: ${typeof e2}`);
    throw new Error(t);
  }
  async setExpirations(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(q.sync);
  }
  async restore() {
    try {
      const e2 = await this.getExpirations();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.expirations.size) {
        const { message: t } = Bt2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e2);
    }
  }
  getExpiration(e2) {
    const t = this.expirations.get(e2);
    if (!t) {
      const { message: i4 } = Bt2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw this.logger.warn(i4), new Error(i4);
    }
    return t;
  }
  checkExpiry(e2, t) {
    const { expiry: i4 } = t;
    (0, import_time4.toMiliseconds)(i4) - Date.now() <= 0 && this.expire(e2, t);
  }
  expire(e2, t) {
    this.expirations.delete(e2), this.events.emit(q.expired, { target: e2, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e2, t) => this.checkExpiry(t, e2));
  }
  registerEventListeners() {
    this.core.heartbeat.on(r.pulse, () => this.checkExpirations()), this.events.on(q.created, (e2) => {
      const t = q.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    }), this.events.on(q.expired, (e2) => {
      const t = q.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    }), this.events.on(q.deleted, (e2) => {
      const t = q.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = Bt2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var qo3 = Object.defineProperty;
var Go3 = (r3, e2, t) => e2 in r3 ? qo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var P4 = (r3, e2, t) => Go3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Ki2 = class extends M2 {
  constructor(e2, t, i4) {
    super(e2, t, i4), this.core = e2, this.logger = t, this.store = i4, P4(this, "name", Ht3), P4(this, "abortController"), P4(this, "isDevEnv"), P4(this, "verifyUrlV3", Jt3), P4(this, "storagePrefix", W3), P4(this, "version", Fe2), P4(this, "publicKey"), P4(this, "fetchPromise"), P4(this, "init", async () => {
      var s3;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && (0, import_time4.toMiliseconds)((s3 = this.publicKey) == null ? void 0 : s3.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }), P4(this, "register", async (s3) => {
      if (!Wt2() || this.isDevEnv) return;
      const n5 = window.location.origin, { id: o4, decryptedId: a4 } = s3, c6 = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${n5}&id=${o4}&decryptedId=${a4}`;
      try {
        const h5 = (0, import_window_getters2.getDocument)(), l6 = this.startAbortTimer(import_time4.ONE_SECOND * 5), g3 = await new Promise((y4, _4) => {
          const u2 = () => {
            window.removeEventListener("message", D3), h5.body.removeChild(m3), _4("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", u2);
          const m3 = h5.createElement("iframe");
          m3.src = c6, m3.style.display = "none", m3.addEventListener("error", u2, { signal: this.abortController.signal });
          const D3 = (w3) => {
            if (w3.data && typeof w3.data == "string") try {
              const E4 = JSON.parse(w3.data);
              if (E4.type === "verify_attestation") {
                if (sn(E4.attestation).payload.id !== o4) return;
                clearInterval(l6), h5.body.removeChild(m3), this.abortController.signal.removeEventListener("abort", u2), window.removeEventListener("message", D3), y4(E4.attestation === null ? "" : E4.attestation);
              }
            } catch (E4) {
              this.logger.warn(E4);
            }
          };
          h5.body.appendChild(m3), window.addEventListener("message", D3, { signal: this.abortController.signal });
        });
        return this.logger.debug(g3, "jwt attestation"), g3;
      } catch (h5) {
        this.logger.warn(h5);
      }
      return "";
    }), P4(this, "resolve", async (s3) => {
      if (this.isDevEnv) return "";
      const { attestationId: n5, hash: o4, encryptedId: a4 } = s3;
      if (n5 === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (n5) {
        if (sn(n5).payload.id !== a4) return;
        const h5 = await this.isValidJwtAttestation(n5);
        if (h5) {
          if (!h5.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h5;
        }
      }
      if (!o4) return;
      const c6 = this.getVerifyUrl(s3?.verifyUrl);
      return this.fetchAttestation(o4, c6);
    }), P4(this, "fetchAttestation", async (s3, n5) => {
      this.logger.debug(`resolving attestation: ${s3} from url: ${n5}`);
      const o4 = this.startAbortTimer(import_time4.ONE_SECOND * 5), a4 = await fetch(`${n5}/attestation/${s3}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o4), a4.status === 200 ? await a4.json() : void 0;
    }), P4(this, "getVerifyUrl", (s3) => {
      let n5 = s3 || be3;
      return Xt3.includes(n5) || (this.logger.info(`verify url: ${n5}, not included in trusted list, assigning default: ${be3}`), n5 = be3), n5;
    }), P4(this, "fetchPublicKey", async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const s3 = this.startAbortTimer(import_time4.FIVE_SECONDS), n5 = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(s3), await n5.json();
      } catch (s3) {
        this.logger.warn(s3);
      }
    }), P4(this, "persistPublicKey", async (s3) => {
      this.logger.debug(s3, "persisting public key to local storage"), await this.store.setItem(this.storeKey, s3), this.publicKey = s3;
    }), P4(this, "removePublicKey", async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }), P4(this, "isValidJwtAttestation", async (s3) => {
      const n5 = await this.getPublicKey();
      try {
        if (n5) return this.validateAttestation(s3, n5);
      } catch (a4) {
        this.logger.error(a4), this.logger.warn("error validating attestation");
      }
      const o4 = await this.fetchAndPersistPublicKey();
      try {
        if (o4) return this.validateAttestation(s3, o4);
      } catch (a4) {
        this.logger.error(a4), this.logger.warn("error validating attestation");
      }
    }), P4(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), P4(this, "fetchAndPersistPublicKey", async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (n5) => {
        const o4 = await this.fetchPublicKey();
        o4 && (await this.persistPublicKey(o4), n5(o4));
      });
      const s3 = await this.fetchPromise;
      return this.fetchPromise = void 0, s3;
    }), P4(this, "validateAttestation", (s3, n5) => {
      const o4 = Aa(s3, n5.publicKey), a4 = { hasExpired: (0, import_time4.toMiliseconds)(o4.exp) < Date.now(), payload: o4 };
      if (a4.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a4.payload.origin, isScam: a4.payload.isScam, isVerified: a4.payload.isVerified };
    }), this.logger = X(t, this.name), this.abortController = new AbortController(), this.isDevEnv = ki(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return w(this.logger);
  }
  startAbortTimer(e2) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), (0, import_time4.toMiliseconds)(e2));
  }
};
var Wo3 = Object.defineProperty;
var Ho3 = (r3, e2, t) => e2 in r3 ? Wo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var Bi = (r3, e2, t) => Ho3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Vi2 = class extends O3 {
  constructor(e2, t) {
    super(e2, t), this.projectId = e2, this.logger = t, Bi(this, "context", Zt3), Bi(this, "registerDeviceToken", async (i4) => {
      const { clientId: s3, token: n5, notificationType: o4, enableEncrypted: a4 = false } = i4, c6 = `${Qt3}/${this.projectId}/clients`;
      await fetch(c6, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: s3, type: o4, token: n5, always_raw: a4 }) });
    }), this.logger = X(t, this.context);
  }
};
var Yo3 = Object.defineProperty;
var qi2 = Object.getOwnPropertySymbols;
var Jo3 = Object.prototype.hasOwnProperty;
var Xo2 = Object.prototype.propertyIsEnumerable;
var et2 = (r3, e2, t) => e2 in r3 ? Yo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var _e3 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) Jo3.call(e2, t) && et2(r3, t, e2[t]);
  if (qi2) for (var t of qi2(e2)) Xo2.call(e2, t) && et2(r3, t, e2[t]);
  return r3;
};
var A2 = (r3, e2, t) => et2(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Gi2 = class extends R {
  constructor(e2, t, i4 = true) {
    super(e2, t, i4), this.core = e2, this.logger = t, A2(this, "context", ti), A2(this, "storagePrefix", W3), A2(this, "storageVersion", ei), A2(this, "events", /* @__PURE__ */ new Map()), A2(this, "shouldPersist", false), A2(this, "init", async () => {
      if (!ki()) try {
        const s3 = { eventId: Li(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: wr2(this.core.relayer.protocol, this.core.relayer.version, Pe3) } } };
        await this.sendEvent([s3]);
      } catch (s3) {
        this.logger.warn(s3);
      }
    }), A2(this, "createEvent", (s3) => {
      const { event: n5 = "ERROR", type: o4 = "", properties: { topic: a4, trace: c6 } } = s3, h5 = Li(), l6 = this.core.projectId || "", g3 = Date.now(), y4 = _e3({ eventId: h5, timestamp: g3, props: { event: n5, type: o4, properties: { topic: a4, trace: c6 } }, bundleId: l6, domain: this.getAppDomain() }, this.setMethods(h5));
      return this.telemetryEnabled && (this.events.set(h5, y4), this.shouldPersist = true), y4;
    }), A2(this, "getEvent", (s3) => {
      const { eventId: n5, topic: o4 } = s3;
      if (n5) return this.events.get(n5);
      const a4 = Array.from(this.events.values()).find((c6) => c6.props.properties.topic === o4);
      if (a4) return _e3(_e3({}, a4), this.setMethods(a4.eventId));
    }), A2(this, "deleteEvent", (s3) => {
      const { eventId: n5 } = s3;
      this.events.delete(n5), this.shouldPersist = true;
    }), A2(this, "setEventListeners", () => {
      this.core.heartbeat.on(r.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((s3) => {
          (0, import_time4.fromMiliseconds)(Date.now()) - (0, import_time4.fromMiliseconds)(s3.timestamp) > ii2 && (this.events.delete(s3.eventId), this.shouldPersist = true);
        });
      });
    }), A2(this, "setMethods", (s3) => ({ addTrace: (n5) => this.addTrace(s3, n5), setError: (n5) => this.setError(s3, n5) })), A2(this, "addTrace", (s3, n5) => {
      const o4 = this.events.get(s3);
      o4 && (o4.props.properties.trace.push(n5), this.events.set(s3, o4), this.shouldPersist = true);
    }), A2(this, "setError", (s3, n5) => {
      const o4 = this.events.get(s3);
      o4 && (o4.props.type = n5, o4.timestamp = Date.now(), this.events.set(s3, o4), this.shouldPersist = true);
    }), A2(this, "persist", async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = false;
    }), A2(this, "restore", async () => {
      try {
        const s3 = await this.core.storage.getItem(this.storageKey) || [];
        if (!s3.length) return;
        s3.forEach((n5) => {
          this.events.set(n5.eventId, _e3(_e3({}, n5), this.setMethods(n5.eventId)));
        });
      } catch (s3) {
        this.logger.warn(s3);
      }
    }), A2(this, "submit", async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const s3 = [];
      for (const [n5, o4] of this.events) o4.props.type && s3.push(o4);
      if (s3.length !== 0) try {
        if ((await this.sendEvent(s3)).ok) for (const n5 of s3) this.events.delete(n5.eventId), this.shouldPersist = true;
      } catch (n5) {
        this.logger.warn(n5);
      }
    }), A2(this, "sendEvent", async (s3) => {
      const n5 = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${si2}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${Pe3}${n5}`, { method: "POST", body: JSON.stringify(s3) });
    }), A2(this, "getAppDomain", () => br2().url), this.logger = X(t, this.context), this.telemetryEnabled = i4, i4 ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
};
var Zo3 = Object.defineProperty;
var Wi2 = Object.getOwnPropertySymbols;
var Qo3 = Object.prototype.hasOwnProperty;
var ea2 = Object.prototype.propertyIsEnumerable;
var tt2 = (r3, e2, t) => e2 in r3 ? Zo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var Hi2 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) Qo3.call(e2, t) && tt2(r3, t, e2[t]);
  if (Wi2) for (var t of Wi2(e2)) ea2.call(e2, t) && tt2(r3, t, e2[t]);
  return r3;
};
var v4 = (r3, e2, t) => tt2(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Oe2 = class _Oe extends h3 {
  constructor(e2) {
    var t;
    super(e2), v4(this, "protocol", Ue3), v4(this, "version", Fe2), v4(this, "name", ge3), v4(this, "relayUrl"), v4(this, "projectId"), v4(this, "customStoragePrefix"), v4(this, "events", new import_events7.EventEmitter()), v4(this, "logger"), v4(this, "heartbeat"), v4(this, "relayer"), v4(this, "crypto"), v4(this, "storage"), v4(this, "history"), v4(this, "expirer"), v4(this, "pairing"), v4(this, "verify"), v4(this, "echoClient"), v4(this, "linkModeSupportedApps"), v4(this, "eventClient"), v4(this, "initialized", false), v4(this, "logChunkController"), v4(this, "on", (a4, c6) => this.events.on(a4, c6)), v4(this, "once", (a4, c6) => this.events.once(a4, c6)), v4(this, "off", (a4, c6) => this.events.off(a4, c6)), v4(this, "removeListener", (a4, c6) => this.events.removeListener(a4, c6)), v4(this, "dispatchEnvelope", ({ topic: a4, message: c6, sessionExists: h5 }) => {
      if (!a4 || !c6) return;
      const l6 = { topic: a4, message: c6, publishedAt: Date.now(), transportType: ee2.link_mode };
      this.relayer.onLinkMessageEvent(l6, { sessionExists: h5 });
    });
    const i4 = this.getGlobalCore(e2?.customStoragePrefix);
    if (i4) try {
      return this.customStoragePrefix = i4.customStoragePrefix, this.logger = i4.logger, this.heartbeat = i4.heartbeat, this.crypto = i4.crypto, this.history = i4.history, this.expirer = i4.expirer, this.storage = i4.storage, this.relayer = i4.relayer, this.pairing = i4.pairing, this.verify = i4.verify, this.echoClient = i4.echoClient, this.linkModeSupportedApps = i4.linkModeSupportedApps, this.eventClient = i4.eventClient, this.initialized = i4.initialized, this.logChunkController = i4.logChunkController, i4;
    } catch (a4) {
      console.warn("Failed to copy global core", a4);
    }
    this.projectId = e2?.projectId, this.relayUrl = e2?.relayUrl || Ke3, this.customStoragePrefix = e2 != null && e2.customStoragePrefix ? `:${e2.customStoragePrefix}` : "";
    const s3 = D2({ level: typeof e2?.logger == "string" && e2.logger ? e2.logger : Et3.logger, name: ge3 }), { logger: n5, chunkLoggerController: o4 } = Y({ opts: s3, maxSizeInBytes: e2?.maxLogBlobSizeInBytes, loggerOverride: e2?.logger });
    this.logChunkController = o4, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var a4, c6;
      (a4 = this.logChunkController) != null && a4.downloadLogsBlobInBrowser && ((c6 = this.logChunkController) == null || c6.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = X(n5, this.name), this.heartbeat = new i(), this.crypto = new wi(this, this.logger, e2?.keychain), this.history = new Fi2(this, this.logger), this.expirer = new Mi2(this, this.logger), this.storage = e2 != null && e2.storage ? e2.storage : new h(Hi2(Hi2({}, It3), e2?.storageOptions)), this.relayer = new Ai2({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Ui2(this, this.logger), this.verify = new Ki2(this, this.logger, this.storage), this.echoClient = new Vi2(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new Gi2(this, this.logger, e2?.telemetryEnabled), this.setGlobalCore(this);
  }
  static async init(e2) {
    const t = new _Oe(e2);
    await t.initialize();
    const i4 = await t.crypto.getClientId();
    return await t.storage.setItem(Ut3, i4), t;
  }
  get context() {
    return w(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e2;
    return (e2 = this.logChunkController) == null ? void 0 : e2.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e2) {
    this.linkModeSupportedApps.includes(e2) || (this.linkModeSupportedApps.push(e2), await this.storage.setItem(Be3, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(Be3) || [], this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e2) {
      throw this.logger.warn(e2, `Core Initialization Failure at epoch ${Date.now()}`), this.logger.error(e2.message), e2;
    }
  }
  getGlobalCore(e2 = "") {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const t = `_walletConnectCore_${e2}`, i4 = `${t}_count`;
      return globalThis[i4] = (globalThis[i4] || 0) + 1, globalThis[i4] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[i4]} times.`), globalThis[t];
    } catch (t) {
      console.warn("Failed to get global WalletConnect core", t);
      return;
    }
  }
  setGlobalCore(e2) {
    var t;
    try {
      if (this.isGlobalCoreDisabled()) return;
      const i4 = `_walletConnectCore_${((t = e2.opts) == null ? void 0 : t.customStoragePrefix) || ""}`;
      globalThis[i4] = e2;
    } catch (i4) {
      console.warn("Failed to set global WalletConnect core", i4);
    }
  }
  isGlobalCoreDisabled() {
    try {
      return typeof process < "u" && process.env.DISABLE_GLOBAL_CORE === "true";
    } catch {
      return true;
    }
  }
};
var ta2 = Oe2;

// node_modules/@walletconnect/sign-client/dist/index.js
var import_time5 = __toESM(require_cjs(), 1);
var De4 = "wc";
var Le3 = 2;
var Me4 = "client";
var Re4 = `${De4}@${Le3}:${Me4}:`;
var Ie3 = { name: Me4, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.org" };
var Is2 = { session_proposal: "session_proposal", session_update: "session_update", session_extend: "session_extend", session_ping: "session_ping", session_delete: "session_delete", session_expire: "session_expire", session_request: "session_request", session_request_sent: "session_request_sent", session_event: "session_event", proposal_expire: "proposal_expire", session_authenticate: "session_authenticate", session_request_expire: "session_request_expire", session_connect: "session_connect" };
var Ts2 = { database: ":memory:" };
var $e3 = "WALLETCONNECT_DEEPLINK_CHOICE";
var qs = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
var Ps2 = "history";
var Ns2 = "0.3";
var dt3 = "proposal";
var Os2 = import_time5.THIRTY_DAYS;
var Ke4 = "Proposal expired";
var ut3 = "session";
var se2 = import_time5.SEVEN_DAYS;
var gt3 = "engine";
var N11 = { wc_sessionPropose: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1101 }, reject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1120 }, autoReject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1121 } }, wc_sessionSettle: { req: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1114 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: import_time5.ONE_HOUR, prompt: true, tag: 1116 }, res: { ttl: import_time5.ONE_HOUR, prompt: false, tag: 1117 }, reject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1118 }, autoReject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1119 } } };
var Te3 = { min: import_time5.FIVE_MINUTES, max: import_time5.SEVEN_DAYS };
var K6 = { idle: "IDLE", active: "ACTIVE" };
var yt3 = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" }, sui_signAndExecuteTransaction: { key: "digest" }, sui_signTransaction: { key: "" }, hedera_signAndExecuteTransaction: { key: "transactionId" }, hedera_executeTransaction: { key: "transactionId" }, near_signTransaction: { key: "" }, near_signTransactions: { key: "" }, tron_signTransaction: { key: "txID" }, xrpl_signTransaction: { key: "" }, xrpl_signTransactionFor: { key: "" }, algo_signTxn: { key: "" }, sendTransfer: { key: "txid" }, stacks_stxTransfer: { key: "txId" }, polkadot_signTransaction: { key: "" }, cosmos_signDirect: { key: "" } };
var mt2 = "request";
var wt3 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"];
var _t3 = "wc";
var bs2 = 1.5;
var vt3 = "auth";
var St4 = "authKeys";
var Et4 = "pairingTopics";
var ft3 = "requests";
var we3 = `${_t3}@${1.5}:${vt3}:`;
var _e4 = `${we3}:PUB_KEY`;
var As2 = Object.defineProperty;
var xs2 = Object.defineProperties;
var Cs2 = Object.getOwnPropertyDescriptors;
var Rt4 = Object.getOwnPropertySymbols;
var Vs2 = Object.prototype.hasOwnProperty;
var ks2 = Object.prototype.propertyIsEnumerable;
var Ue4 = (S4, o4, e2) => o4 in S4 ? As2(S4, o4, { enumerable: true, configurable: true, writable: true, value: e2 }) : S4[o4] = e2;
var E3 = (S4, o4) => {
  for (var e2 in o4 || (o4 = {})) Vs2.call(o4, e2) && Ue4(S4, e2, o4[e2]);
  if (Rt4) for (var e2 of Rt4(o4)) ks2.call(o4, e2) && Ue4(S4, e2, o4[e2]);
  return S4;
};
var b4 = (S4, o4) => xs2(S4, Cs2(o4));
var c5 = (S4, o4, e2) => Ue4(S4, typeof o4 != "symbol" ? o4 + "" : o4, e2);
var Ds = class extends V2 {
  constructor(o4) {
    super(o4), c5(this, "name", gt3), c5(this, "events", new import_events8.default()), c5(this, "initialized", false), c5(this, "requestQueue", { state: K6.idle, queue: [] }), c5(this, "sessionRequestQueue", { state: K6.idle, queue: [] }), c5(this, "emittedSessionRequests", new Hi({ limit: 500 })), c5(this, "requestQueueDelay", import_time5.ONE_SECOND), c5(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), c5(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), c5(this, "recentlyDeletedLimit", 200), c5(this, "relayMessageCache", []), c5(this, "pendingSessions", /* @__PURE__ */ new Map()), c5(this, "init", async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(N11) }), this.initialized = true, setTimeout(async () => {
        await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, (0, import_time5.toMiliseconds)(this.requestQueueDelay)));
    }), c5(this, "connect", async (e2) => {
      var t;
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const s3 = b4(E3({}, e2), { requiredNamespaces: e2.requiredNamespaces || {}, optionalNamespaces: e2.optionalNamespaces || {} });
      await this.isValidConnect(s3), s3.optionalNamespaces = Ya(s3.requiredNamespaces, s3.optionalNamespaces), s3.requiredNamespaces = {};
      const { pairingTopic: i4, requiredNamespaces: r3, optionalNamespaces: n5, sessionProperties: a4, scopedProperties: l6, relays: h5, authentication: p4, walletPay: y4 } = s3, d4 = ((t = p4?.[0]) == null ? void 0 : t.ttl) || N11.wc_sessionPropose.req.ttl || import_time5.FIVE_MINUTES;
      this.validateRequestExpiry(d4);
      let u2 = i4, w3, g3 = false;
      try {
        if (u2) {
          const R3 = this.client.core.pairing.pairings.get(u2);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), g3 = R3.active;
        }
      } catch (R3) {
        throw this.client.logger.error(`connect() -> pairing.get(${u2}) failed`), R3;
      }
      if (!u2 || !g3) {
        const { topic: R3, uri: q2 } = await this.client.core.pairing.create({ internal: { skipSubscribe: true } });
        u2 = R3, w3 = q2;
      }
      if (!u2) {
        const { message: R3 } = Bt2("NO_MATCHING_KEY", `connect() pairing topic: ${u2}`);
        throw new Error(R3);
      }
      const f5 = await this.client.core.crypto.generateKeyPair(), v5 = _i(d4), T3 = E3(b4(E3(E3({ requiredNamespaces: r3, optionalNamespaces: n5, relays: h5 ?? [{ protocol: Nt3 }], proposer: { publicKey: f5, metadata: this.client.metadata }, expiryTimestamp: v5, pairingTopic: u2 }, a4 && { sessionProperties: a4 }), l6 && { scopedProperties: l6 }), { id: payloadId() }), (p4 || y4) && { requests: { authentication: p4?.map((R3) => {
        const { domain: q2, chains: ve4, nonce: ce2, uri: Y3, exp: ie3, nbf: le3, type: J5, statement: pe3, requestId: he4, resources: C4, signatureTypes: D3 } = R3;
        return { domain: q2, chains: ve4, nonce: ce2, type: J5 ?? "caip122", aud: Y3, version: "1", iat: (/* @__PURE__ */ new Date()).toISOString(), exp: ie3, nbf: le3, statement: pe3, requestId: he4, resources: C4, signatureTypes: D3 };
      }), walletPay: y4 } }), A3 = $i("session_connect", T3.id), { reject: V4, resolve: x5, done: U3 } = Ai(d4, Ke4), z5 = ({ id: R3 }) => {
        R3 === T3.id && (this.client.events.off("proposal_expire", z5), this.pendingSessions.delete(T3.id), this.events.emit(A3, { error: { message: Ke4, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", z5), this.events.once(A3, ({ error: R3, session: q2 }) => {
        this.client.events.off("proposal_expire", z5), R3 ? V4(R3) : q2 && x5(q2);
      }), await this.setProposal(T3.id, T3), await this.sendProposeSession({ proposal: T3, publishOpts: { internal: { throwOnFailedPublish: true }, tvf: { correlationId: T3.id } } }).catch((R3) => {
        throw this.deleteProposal(T3.id), R3;
      }), { uri: w3, approval: U3 };
    }), c5(this, "pair", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(e2);
      } catch (t) {
        throw this.client.logger.error("pair() failed"), t;
      }
    }), c5(this, "approve", async (e2) => {
      var t, s3, i4;
      const r3 = this.client.core.eventClient.createEvent({ properties: { topic: (t = e2?.id) == null ? void 0 : t.toString(), trace: [rr3.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (q2) {
        throw r3.setError(nr3.no_internet_connection), q2;
      }
      try {
        await this.isValidProposalId(e2?.id);
      } catch (q2) {
        throw this.client.logger.error(`approve() -> proposal.get(${e2?.id}) failed`), r3.setError(nr3.proposal_not_found), q2;
      }
      try {
        await this.isValidApprove(e2);
      } catch (q2) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), r3.setError(nr3.session_approve_namespace_validation_failure), q2;
      }
      const { id: n5, relayProtocol: a4, namespaces: l6, sessionProperties: h5, scopedProperties: p4, sessionConfig: y4, proposalRequestsResponses: d4 } = e2, u2 = this.client.proposal.get(n5);
      this.client.core.eventClient.deleteEvent({ eventId: r3.eventId });
      const { pairingTopic: w3, proposer: g3, requiredNamespaces: f5, optionalNamespaces: v5 } = u2;
      let T3 = (s3 = this.client.core.eventClient) == null ? void 0 : s3.getEvent({ topic: w3 });
      T3 || (T3 = (i4 = this.client.core.eventClient) == null ? void 0 : i4.createEvent({ type: rr3.session_approve_started, properties: { topic: w3, trace: [rr3.session_approve_started, rr3.session_namespaces_validation_success] } }));
      const A3 = await this.client.core.crypto.generateKeyPair(), V4 = g3.publicKey, x5 = await this.client.core.crypto.generateSharedKey(A3, V4), U3 = b4(E3(E3(E3({ relay: { protocol: a4 ?? "irn" }, namespaces: l6, controller: { publicKey: A3, metadata: this.client.metadata }, expiry: _i(se2) }, h5 && { sessionProperties: h5 }), p4 && { scopedProperties: p4 }), y4 && { sessionConfig: y4 }), { proposalRequestsResponses: d4 }), z5 = ee2.relay;
      T3.addTrace(rr3.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(x5, { transportType: z5, internal: { skipSubscribe: true } });
      } catch (q2) {
        throw T3.setError(nr3.subscribe_session_topic_failure), q2;
      }
      T3.addTrace(rr3.subscribe_session_topic_success);
      const R3 = b4(E3({}, U3), { topic: x5, requiredNamespaces: f5, optionalNamespaces: v5, pairingTopic: w3, acknowledged: false, self: U3.controller, peer: { publicKey: g3.publicKey, metadata: g3.metadata }, controller: A3, transportType: ee2.relay, authentication: d4?.authentication, walletPayResult: d4?.walletPay });
      await this.client.session.set(x5, R3), T3.addTrace(rr3.store_session);
      try {
        await this.sendApproveSession({ sessionTopic: x5, proposal: u2, pairingProposalResponse: { relay: { protocol: a4 ?? "irn" }, responderPublicKey: A3 }, sessionSettleRequest: U3, publishOpts: { internal: { throwOnFailedPublish: true }, tvf: E3({ correlationId: n5 }, this.getTVFApproveParams(R3)) } }), T3.addTrace(rr3.session_approve_publish_success);
      } catch (q2) {
        throw this.client.logger.error(q2), this.client.session.delete(x5, zt2("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(x5), q2;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: T3.eventId }), await this.client.core.pairing.updateMetadata({ topic: w3, metadata: g3.metadata }), await this.deleteProposal(n5), await this.client.core.pairing.activate({ topic: w3 }), await this.setExpiry(x5, _i(se2)), { topic: x5, acknowledged: () => Promise.resolve(this.client.session.get(x5)) };
    }), c5(this, "reject", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(e2);
      } catch (r3) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), r3;
      }
      const { id: t, reason: s3 } = e2;
      let i4;
      try {
        i4 = this.client.proposal.get(t).pairingTopic;
      } catch (r3) {
        throw this.client.logger.error(`reject() -> proposal.get(${t}) failed`), r3;
      }
      i4 && await this.sendError({ id: t, topic: i4, error: s3, rpcOpts: N11.wc_sessionPropose.reject }), await this.deleteProposal(t);
    }), c5(this, "update", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(e2);
      } catch (p4) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), p4;
      }
      const { topic: t, namespaces: s3 } = e2, { done: i4, resolve: r3, reject: n5 } = Ai(import_time5.FIVE_MINUTES, "Session update request expired without receiving any acknowledgement"), a4 = payloadId(), l6 = getBigIntRpcId().toString(), h5 = this.client.session.get(t).namespaces;
      return this.events.once($i("session_update", a4), ({ error: p4 }) => {
        p4 ? n5(p4) : r3();
      }), await this.client.session.update(t, { namespaces: s3 }), await this.sendRequest({ topic: t, method: "wc_sessionUpdate", params: { namespaces: s3 }, throwOnFailedPublish: true, clientRpcId: a4, relayRpcId: l6 }).catch((p4) => {
        this.client.logger.error(p4), this.client.session.update(t, { namespaces: h5 }), n5(p4);
      }), { acknowledged: i4 };
    }), c5(this, "extend", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(e2);
      } catch (a4) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), a4;
      }
      const { topic: t } = e2, s3 = payloadId(), { done: i4, resolve: r3, reject: n5 } = Ai(import_time5.FIVE_MINUTES, "Session extend request expired without receiving any acknowledgement");
      return this.events.once($i("session_extend", s3), ({ error: a4 }) => {
        a4 ? n5(a4) : r3();
      }), await this.setExpiry(t, _i(se2)), this.sendRequest({ topic: t, method: "wc_sessionExtend", params: {}, clientRpcId: s3, throwOnFailedPublish: true }).catch((a4) => {
        n5(a4);
      }), { acknowledged: i4 };
    }), c5(this, "request", async (e2) => {
      this.isInitialized();
      try {
        await this.isValidRequest(e2);
      } catch (g3) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), g3;
      }
      const { chainId: t, request: s3, topic: i4, expiry: r3 = N11.wc_sessionRequest.req.ttl } = e2, n5 = this.client.session.get(i4);
      n5?.transportType === ee2.relay && await this.confirmOnlineStateOrThrow();
      const a4 = payloadId(), l6 = getBigIntRpcId().toString(), { done: h5, resolve: p4, reject: y4 } = Ai(r3, "Request expired. Please try again.");
      this.events.once($i("session_request", a4), ({ error: g3, result: f5 }) => {
        g3 ? y4(g3) : p4(f5);
      });
      const d4 = "wc_sessionRequest", u2 = this.getAppLinkIfEnabled(n5.peer.metadata, n5.transportType);
      if (u2) return await this.sendRequest({ clientRpcId: a4, relayRpcId: l6, topic: i4, method: d4, params: { request: b4(E3({}, s3), { expiryTimestamp: _i(r3) }), chainId: t }, expiry: r3, throwOnFailedPublish: true, appLink: u2 }).catch((g3) => y4(g3)), this.client.events.emit("session_request_sent", { topic: i4, request: s3, chainId: t, id: a4 }), await h5();
      const w3 = { request: b4(E3({}, s3), { expiryTimestamp: _i(r3) }), chainId: t };
      return await Promise.all([new Promise(async (g3) => {
        await this.sendRequest({ clientRpcId: a4, relayRpcId: l6, topic: i4, method: d4, params: w3, expiry: r3, throwOnFailedPublish: true, tvf: this.getTVFParams(a4, w3) }).catch((f5) => y4(f5)), this.client.events.emit("session_request_sent", { topic: i4, request: s3, chainId: t, id: a4 }), g3();
      }), new Promise(async (g3) => {
        var f5;
        if (!((f5 = n5.sessionConfig) != null && f5.disableDeepLink)) {
          const v5 = await Ci(this.client.core.storage, $e3);
          await Ti({ id: a4, topic: i4, wcDeepLink: v5 });
        }
        g3();
      }), h5()]).then((g3) => g3[2]);
    }), c5(this, "respond", async (e2) => {
      var t, s3;
      this.isInitialized();
      const i4 = this.client.core.eventClient.createEvent({ properties: { topic: e2?.topic || ((s3 = (t = e2?.response) == null ? void 0 : t.id) == null ? void 0 : s3.toString()), trace: [rr3.session_request_response_started] } });
      try {
        await this.isValidRespond(e2);
      } catch (p4) {
        throw i4.addTrace(p4?.message), i4.setError(nr3.session_request_response_validation_failure), p4;
      }
      i4.addTrace(rr3.session_request_response_validation_success);
      const { topic: r3, response: n5 } = e2, { id: a4 } = n5, l6 = this.client.session.get(r3);
      l6.transportType === ee2.relay && await this.confirmOnlineStateOrThrow();
      const h5 = this.getAppLinkIfEnabled(l6.peer.metadata, l6.transportType);
      try {
        i4.addTrace(rr3.session_request_response_publish_started), isJsonRpcResult(n5) ? await this.sendResult({ id: a4, topic: r3, result: n5.result, throwOnFailedPublish: true, appLink: h5 }) : isJsonRpcError(n5) && await this.sendError({ id: a4, topic: r3, error: n5.error, appLink: h5 }), this.cleanupAfterResponse(e2);
      } catch (p4) {
        throw i4.addTrace(p4?.message), i4.setError(nr3.session_request_response_publish_failure), p4;
      }
    }), c5(this, "ping", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(e2);
      } catch (s3) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), s3;
      }
      const { topic: t } = e2;
      if (this.client.session.keys.includes(t)) {
        const s3 = payloadId(), i4 = getBigIntRpcId().toString(), { done: r3, resolve: n5, reject: a4 } = Ai(import_time5.FIVE_MINUTES, "Ping request expired without receiving any acknowledgement");
        this.events.once($i("session_ping", s3), ({ error: l6 }) => {
          l6 ? a4(l6) : n5();
        }), await Promise.all([this.sendRequest({ topic: t, method: "wc_sessionPing", params: {}, throwOnFailedPublish: true, clientRpcId: s3, relayRpcId: i4 }), r3()]);
      } else this.client.core.pairing.pairings.keys.includes(t) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: t }));
    }), c5(this, "emit", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(e2);
      const { topic: t, event: s3, chainId: i4 } = e2, r3 = getBigIntRpcId().toString(), n5 = payloadId();
      await this.sendRequest({ topic: t, method: "wc_sessionEvent", params: { event: s3, chainId: i4 }, throwOnFailedPublish: true, relayRpcId: r3, clientRpcId: n5 });
    }), c5(this, "disconnect", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(e2);
      const { topic: t } = e2;
      if (this.client.session.keys.includes(t)) await this.sendRequest({ topic: t, method: "wc_sessionDelete", params: zt2("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession({ topic: t, emitEvent: false });
      else if (this.client.core.pairing.pairings.keys.includes(t)) await this.client.core.pairing.disconnect({ topic: t });
      else {
        const { message: s3 } = Bt2("MISMATCHED_TOPIC", `Session or pairing topic not found: ${t}`);
        throw new Error(s3);
      }
    }), c5(this, "find", (e2) => (this.isInitialized(), this.client.session.getAll().filter((t) => Wa(t, e2)))), c5(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), c5(this, "authenticate", async (e2, t) => {
      var s3;
      this.isInitialized(), this.isValidAuthenticate(e2);
      const i4 = t && this.client.core.linkModeSupportedApps.includes(t) && ((s3 = this.client.metadata.redirect) == null ? void 0 : s3.linkMode), r3 = i4 ? ee2.link_mode : ee2.relay;
      r3 === ee2.relay && await this.confirmOnlineStateOrThrow();
      const { chains: n5, statement: a4 = "", uri: l6, domain: h5, nonce: p4, type: y4, exp: d4, nbf: u2, methods: w3 = [], expiry: g3 } = e2, f5 = [...e2.resources || []], { topic: v5, uri: T3 } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: r3 });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: v5, uri: T3 } });
      const A3 = await this.client.core.crypto.generateKeyPair(), V4 = ba(A3);
      if (await Promise.all([this.client.auth.authKeys.set(_e4, { responseTopic: V4, publicKey: A3 }), this.client.auth.pairingTopics.set(V4, { topic: V4, pairingTopic: v5 })]), await this.client.core.relayer.subscribe(V4, { transportType: r3 }), this.client.logger.info(`sending request to new pairing topic: ${v5}`), w3.length > 0) {
        const { namespace: C4 } = Je2(n5[0]);
        let D3 = Zc(C4, "request", w3);
        je2(f5) && (D3 = Gc(D3, f5.pop())), f5.push(D3);
      }
      const x5 = g3 && g3 > N11.wc_sessionAuthenticate.req.ttl ? g3 : N11.wc_sessionAuthenticate.req.ttl, U3 = { authPayload: { type: y4 ?? "caip122", chains: n5, statement: a4, aud: l6, domain: h5, version: "1", nonce: p4, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: d4, nbf: u2, resources: f5 }, requester: { publicKey: A3, metadata: this.client.metadata }, expiryTimestamp: _i(x5) }, z5 = { eip155: { chains: n5, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...w3])], events: ["chainChanged", "accountsChanged"] } }, R3 = { requiredNamespaces: {}, optionalNamespaces: z5, relays: [{ protocol: "irn" }], pairingTopic: v5, proposer: { publicKey: A3, metadata: this.client.metadata }, expiryTimestamp: _i(N11.wc_sessionPropose.req.ttl), id: payloadId() }, { done: q2, resolve: ve4, reject: ce2 } = Ai(x5, "Request expired"), Y3 = payloadId(), ie3 = $i("session_connect", R3.id), le3 = $i("session_request", Y3), J5 = async ({ error: C4, session: D3 }) => {
        this.events.off(le3, pe3), C4 ? ce2(C4) : D3 && ve4({ session: D3 });
      }, pe3 = async (C4) => {
        var D3, je3, Fe3;
        if (await this.deletePendingAuthRequest(Y3, { message: "fulfilled", code: 0 }), C4.error) {
          const ue = zt2("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return C4.error.code === ue.code ? void 0 : (this.events.off(ie3, J5), ce2(C4.error.message));
        }
        await this.deleteProposal(R3.id), this.events.off(ie3, J5);
        const { cacaos: He4, responder: X4 } = C4.result, Pe4 = [], Qe3 = [];
        for (const ue of He4) {
          await Vc({ cacao: ue, projectId: this.client.core.projectId }) || (this.client.logger.error(ue, "Signature verification failed"), ce2(zt2("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: Ne3 } = ue, Oe3 = je2(Ne3.resources), ze3 = [no2(Ne3.iss)], Tt4 = bn2(Ne3.iss);
          if (Oe3) {
            const be4 = zc(Oe3), qt4 = Yc(Oe3);
            Pe4.push(...be4), ze3.push(...qt4);
          }
          for (const be4 of ze3) Qe3.push(`${be4}:${Tt4}`);
        }
        const de3 = await this.client.core.crypto.generateSharedKey(A3, X4.publicKey);
        let Se4;
        Pe4.length > 0 && (Se4 = { topic: de3, acknowledged: true, self: { publicKey: A3, metadata: this.client.metadata }, peer: X4, controller: X4.publicKey, expiry: _i(se2), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: v5, namespaces: za([...new Set(Pe4)], [...new Set(Qe3)]), transportType: r3 }, await this.client.core.relayer.subscribe(de3, { transportType: r3 }), await this.client.session.set(de3, Se4), v5 && await this.client.core.pairing.updateMetadata({ topic: v5, metadata: X4.metadata }), Se4 = this.client.session.get(de3)), (D3 = this.client.metadata.redirect) != null && D3.linkMode && (je3 = X4.metadata.redirect) != null && je3.linkMode && (Fe3 = X4.metadata.redirect) != null && Fe3.universal && t && (this.client.core.addLinkModeSupportedApp(X4.metadata.redirect.universal), this.client.session.update(de3, { transportType: ee2.link_mode })), ve4({ auths: He4, session: Se4 });
      };
      this.events.once(ie3, J5), this.events.once(le3, pe3);
      let he4;
      try {
        if (i4) {
          const C4 = formatJsonRpcRequest("wc_sessionAuthenticate", U3, Y3);
          this.client.core.history.set(v5, C4);
          const D3 = await this.client.core.crypto.encode("", C4, { type: ve2, encoding: Ge2 });
          he4 = La(t, v5, D3);
        } else await Promise.all([this.sendRequest({ topic: v5, method: "wc_sessionAuthenticate", params: U3, expiry: e2.expiry, throwOnFailedPublish: true, clientRpcId: Y3 }), this.sendRequest({ topic: v5, method: "wc_sessionPropose", params: R3, expiry: N11.wc_sessionPropose.req.ttl, throwOnFailedPublish: true, clientRpcId: R3.id })]);
      } catch (C4) {
        throw this.events.off(ie3, J5), this.events.off(le3, pe3), C4;
      }
      return await this.setProposal(R3.id, R3), await this.setAuthRequest(Y3, { request: b4(E3({}, U3), { verifyContext: {} }), pairingTopic: v5, transportType: r3 }), { uri: he4 ?? T3, response: q2 };
    }), c5(this, "approveSessionAuthenticate", async (e2) => {
      const { id: t, auths: s3 } = e2, i4 = this.client.core.eventClient.createEvent({ properties: { topic: t.toString(), trace: [or3.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (g3) {
        throw i4.setError(ar3.no_internet_connection), g3;
      }
      const r3 = this.getPendingAuthRequest(t);
      if (!r3) throw i4.setError(ar3.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${t}`);
      const n5 = r3.transportType || ee2.relay;
      n5 === ee2.relay && await this.confirmOnlineStateOrThrow();
      const a4 = r3.requester.publicKey, l6 = await this.client.core.crypto.generateKeyPair(), h5 = ba(a4), p4 = { type: ie, receiverPublicKey: a4, senderPublicKey: l6 }, y4 = [], d4 = [];
      for (const g3 of s3) {
        if (!await Vc({ cacao: g3, projectId: this.client.core.projectId })) {
          i4.setError(ar3.invalid_cacao);
          const V4 = zt2("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: t, topic: h5, error: V4, encodeOpts: p4 }), new Error(V4.message);
        }
        i4.addTrace(or3.cacaos_verified);
        const { p: f5 } = g3, v5 = je2(f5.resources), T3 = [no2(f5.iss)], A3 = bn2(f5.iss);
        if (v5) {
          const V4 = zc(v5), x5 = Yc(v5);
          y4.push(...V4), T3.push(...x5);
        }
        for (const V4 of T3) d4.push(`${V4}:${A3}`);
      }
      const u2 = await this.client.core.crypto.generateSharedKey(l6, a4);
      i4.addTrace(or3.create_authenticated_session_topic);
      let w3;
      if (y4?.length > 0) {
        w3 = { topic: u2, acknowledged: true, self: { publicKey: l6, metadata: this.client.metadata }, peer: { publicKey: a4, metadata: r3.requester.metadata }, controller: a4, expiry: _i(se2), authentication: s3, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: r3.pairingTopic, namespaces: za([...new Set(y4)], [...new Set(d4)]), transportType: n5 }, i4.addTrace(or3.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(u2, { transportType: n5 });
        } catch (g3) {
          throw i4.setError(ar3.subscribe_authenticated_session_topic_failure), g3;
        }
        i4.addTrace(or3.subscribe_authenticated_session_topic_success), await this.client.session.set(u2, w3), i4.addTrace(or3.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: r3.pairingTopic, metadata: r3.requester.metadata });
      }
      i4.addTrace(or3.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: h5, id: t, result: { cacaos: s3, responder: { publicKey: l6, metadata: this.client.metadata } }, encodeOpts: p4, throwOnFailedPublish: true, appLink: this.getAppLinkIfEnabled(r3.requester.metadata, n5) });
      } catch (g3) {
        throw i4.setError(ar3.authenticated_session_approve_publish_failure), g3;
      }
      return await this.client.auth.requests.delete(t, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: r3.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i4.eventId }), { session: w3 };
    }), c5(this, "rejectSessionAuthenticate", async (e2) => {
      this.isInitialized();
      const { id: t, reason: s3 } = e2, i4 = this.getPendingAuthRequest(t);
      if (!i4) throw new Error(`Could not find pending auth request with id ${t}`);
      i4.transportType === ee2.relay && await this.confirmOnlineStateOrThrow();
      const r3 = i4.requester.publicKey, n5 = await this.client.core.crypto.generateKeyPair(), a4 = ba(r3), l6 = { type: ie, receiverPublicKey: r3, senderPublicKey: n5 };
      await this.sendError({ id: t, topic: a4, error: s3, encodeOpts: l6, rpcOpts: N11.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i4.requester.metadata, i4.transportType) }), await this.client.auth.requests.delete(t, { message: "rejected", code: 0 }), await this.deleteProposal(t);
    }), c5(this, "formatAuthMessage", (e2) => {
      this.isInitialized();
      const { request: t, iss: s3 } = e2;
      return ro2(t, s3);
    }), c5(this, "processRelayMessageCache", () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const e2 = this.relayMessageCache.shift();
          e2 && await this.onRelayMessage(e2);
        } catch (e2) {
          this.client.logger.error(e2);
        }
      }, 50);
    }), c5(this, "cleanupDuplicatePairings", async (e2) => {
      if (e2.pairingTopic) try {
        const t = this.client.core.pairing.pairings.get(e2.pairingTopic), s3 = this.client.core.pairing.pairings.getAll().filter((i4) => {
          var r3, n5;
          return ((r3 = i4.peerMetadata) == null ? void 0 : r3.url) && ((n5 = i4.peerMetadata) == null ? void 0 : n5.url) === e2.peer.metadata.url && i4.topic && i4.topic !== t.topic;
        });
        if (s3.length === 0) return;
        this.client.logger.info(`Cleaning up ${s3.length} duplicate pairing(s)`), await Promise.all(s3.map((i4) => this.client.core.pairing.disconnect({ topic: i4.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (t) {
        this.client.logger.error(t);
      }
    }), c5(this, "deleteSession", async (e2) => {
      var t;
      const { topic: s3, expirerHasDeleted: i4 = false, emitEvent: r3 = true, id: n5 = 0 } = e2, { self: a4 } = this.client.session.get(s3);
      await this.client.core.relayer.unsubscribe(s3), await this.client.session.delete(s3, zt2("USER_DISCONNECTED")), this.addToRecentlyDeleted(s3, "session"), this.client.core.crypto.keychain.has(a4.publicKey) && await this.client.core.crypto.deleteKeyPair(a4.publicKey), this.client.core.crypto.keychain.has(s3) && await this.client.core.crypto.deleteSymKey(s3), i4 || this.client.core.expirer.del(s3), this.client.core.storage.removeItem($e3).catch((l6) => this.client.logger.warn(l6)), s3 === ((t = this.sessionRequestQueue.queue[0]) == null ? void 0 : t.topic) && (this.sessionRequestQueue.state = K6.idle), await Promise.all(this.getPendingSessionRequests().filter((l6) => l6.topic === s3).map((l6) => this.deletePendingSessionRequest(l6.id, zt2("USER_DISCONNECTED")))), r3 && this.client.events.emit("session_delete", { id: n5, topic: s3 });
    }), c5(this, "deleteProposal", async (e2, t) => {
      if (t) try {
        const s3 = this.client.proposal.get(e2), i4 = this.client.core.eventClient.getEvent({ topic: s3.pairingTopic });
        i4?.setError(nr3.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(e2, zt2("USER_DISCONNECTED")), t ? Promise.resolve() : this.client.core.expirer.del(e2)]), this.addToRecentlyDeleted(e2, "proposal");
    }), c5(this, "deletePendingSessionRequest", async (e2, t, s3 = false) => {
      await Promise.all([this.client.pendingRequest.delete(e2, t), s3 ? Promise.resolve() : this.client.core.expirer.del(e2)]), this.addToRecentlyDeleted(e2, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i4) => i4.id !== e2), s3 && (this.sessionRequestQueue.state = K6.idle, this.client.events.emit("session_request_expire", { id: e2 }));
    }), c5(this, "deletePendingAuthRequest", async (e2, t, s3 = false) => {
      await Promise.all([this.client.auth.requests.delete(e2, t), s3 ? Promise.resolve() : this.client.core.expirer.del(e2)]);
    }), c5(this, "setExpiry", async (e2, t) => {
      this.client.session.keys.includes(e2) && (this.client.core.expirer.set(e2, t), await this.client.session.update(e2, { expiry: t }));
    }), c5(this, "setProposal", async (e2, t) => {
      this.client.core.expirer.set(e2, _i(N11.wc_sessionPropose.req.ttl)), await this.client.proposal.set(e2, t);
    }), c5(this, "setAuthRequest", async (e2, t) => {
      const { request: s3, pairingTopic: i4, transportType: r3 = ee2.relay } = t;
      this.client.core.expirer.set(e2, s3.expiryTimestamp), await this.client.auth.requests.set(e2, { authPayload: s3.authPayload, requester: s3.requester, expiryTimestamp: s3.expiryTimestamp, id: e2, pairingTopic: i4, verifyContext: s3.verifyContext, transportType: r3 });
    }), c5(this, "setPendingSessionRequest", async (e2) => {
      const { id: t, topic: s3, params: i4, verifyContext: r3 } = e2, n5 = i4.request.expiryTimestamp || _i(N11.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(t, n5), await this.client.pendingRequest.set(t, { id: t, topic: s3, params: i4, verifyContext: r3 });
    }), c5(this, "sendRequest", async (e2) => {
      const { topic: t, method: s3, params: i4, expiry: r3, relayRpcId: n5, clientRpcId: a4, throwOnFailedPublish: l6, appLink: h5, tvf: p4, publishOpts: y4 = {} } = e2, d4 = formatJsonRpcRequest(s3, i4, a4);
      let u2;
      const w3 = !!h5;
      try {
        const v5 = w3 ? Ge2 : oe;
        u2 = await this.client.core.crypto.encode(t, d4, { encoding: v5 });
      } catch (v5) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${t} failed`), v5;
      }
      let g3;
      if (wt3.includes(s3)) {
        const v5 = ya(JSON.stringify(d4)), T3 = ya(u2);
        g3 = await this.client.core.verify.register({ id: T3, decryptedId: v5 });
      }
      const f5 = E3(E3({}, N11[s3].req), y4);
      if (f5.attestation = g3, r3 && (f5.ttl = r3), n5 && (f5.id = n5), this.client.core.history.set(t, d4), w3) {
        const v5 = La(h5, t, u2);
        await global.Linking.openURL(v5, this.client.name);
      } else f5.tvf = b4(E3({}, p4), { correlationId: d4.id }), l6 ? (f5.internal = b4(E3({}, f5.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t, u2, f5)) : this.client.core.relayer.publish(t, u2, f5).catch((v5) => this.client.logger.error(v5));
      return d4.id;
    }), c5(this, "sendProposeSession", async (e2) => {
      const { proposal: t, publishOpts: s3 } = e2, i4 = formatJsonRpcRequest("wc_sessionPropose", t, t.id);
      this.client.core.history.set(t.pairingTopic, i4);
      const r3 = await this.client.core.crypto.encode(t.pairingTopic, i4, { encoding: oe }), n5 = ya(JSON.stringify(i4)), a4 = ya(r3), l6 = await this.client.core.verify.register({ id: a4, decryptedId: n5 });
      await this.client.core.relayer.publishCustom({ payload: { pairingTopic: t.pairingTopic, sessionProposal: r3 }, opts: b4(E3({}, s3), { publishMethod: "wc_proposeSession", attestation: l6 }) });
    }), c5(this, "sendApproveSession", async (e2) => {
      const { sessionTopic: t, pairingProposalResponse: s3, proposal: i4, sessionSettleRequest: r3, publishOpts: n5 } = e2, a4 = formatJsonRpcResult(i4.id, s3), l6 = await this.client.core.crypto.encode(i4.pairingTopic, a4, { encoding: oe }), h5 = formatJsonRpcRequest("wc_sessionSettle", r3, n5?.id), p4 = await this.client.core.crypto.encode(t, h5, { encoding: oe });
      this.client.core.history.set(t, h5), await this.client.core.relayer.publishCustom({ payload: { sessionTopic: t, pairingTopic: i4.pairingTopic, sessionProposalResponse: l6, sessionSettlementRequest: p4 }, opts: b4(E3({}, n5), { publishMethod: "wc_approveSession" }) });
    }), c5(this, "sendResult", async (e2) => {
      const { id: t, topic: s3, result: i4, throwOnFailedPublish: r3, encodeOpts: n5, appLink: a4 } = e2, l6 = formatJsonRpcResult(t, i4);
      let h5;
      const p4 = a4 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const u2 = p4 ? Ge2 : oe;
        h5 = await this.client.core.crypto.encode(s3, l6, b4(E3({}, n5 || {}), { encoding: u2 }));
      } catch (u2) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s3} failed`), u2;
      }
      let y4, d4;
      try {
        y4 = await this.client.core.history.get(s3, t);
        const u2 = y4.request;
        try {
          d4 = this.getTVFParams(t, u2.params, i4);
        } catch (w3) {
          this.client.logger.warn(`sendResult() -> getTVFParams() failed: ${w3?.message}`);
        }
      } catch (u2) {
        throw this.client.logger.error(`sendResult() -> history.get(${s3}, ${t}) failed`), u2;
      }
      if (p4) {
        const u2 = La(a4, s3, h5);
        await global.Linking.openURL(u2, this.client.name);
      } else {
        const u2 = y4.request.method, w3 = N11[u2].res;
        w3.tvf = b4(E3({}, d4), { correlationId: t }), r3 ? (w3.internal = b4(E3({}, w3.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s3, h5, w3)) : this.client.core.relayer.publish(s3, h5, w3).catch((g3) => this.client.logger.error(g3));
      }
      await this.client.core.history.resolve(l6);
    }), c5(this, "sendError", async (e2) => {
      const { id: t, topic: s3, error: i4, encodeOpts: r3, rpcOpts: n5, appLink: a4 } = e2, l6 = formatJsonRpcError(t, i4);
      let h5;
      const p4 = a4 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const d4 = p4 ? Ge2 : oe;
        h5 = await this.client.core.crypto.encode(s3, l6, b4(E3({}, r3 || {}), { encoding: d4 }));
      } catch (d4) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s3} failed`), d4;
      }
      let y4;
      try {
        y4 = await this.client.core.history.get(s3, t);
      } catch (d4) {
        throw this.client.logger.error(`sendError() -> history.get(${s3}, ${t}) failed`), d4;
      }
      if (p4) {
        const d4 = La(a4, s3, h5);
        await global.Linking.openURL(d4, this.client.name);
      } else {
        const d4 = y4.request.method, u2 = n5 || N11[d4].res;
        this.client.core.relayer.publish(s3, h5, u2);
      }
      await this.client.core.history.resolve(l6);
    }), c5(this, "cleanup", async () => {
      const e2 = [], t = [];
      this.client.session.getAll().forEach((s3) => {
        let i4 = false;
        Ri(s3.expiry) && (i4 = true), this.client.core.crypto.keychain.has(s3.topic) || (i4 = true), i4 && e2.push(s3.topic);
      }), this.client.proposal.getAll().forEach((s3) => {
        Ri(s3.expiryTimestamp) && t.push(s3.id);
      }), await Promise.all([...e2.map((s3) => this.deleteSession({ topic: s3 })), ...t.map((s3) => this.deleteProposal(s3))]);
    }), c5(this, "onProviderMessageEvent", async (e2) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(e2) : await this.onRelayMessage(e2);
    }), c5(this, "onRelayEventRequest", async (e2) => {
      this.requestQueue.queue.push(e2), await this.processRequestsQueue();
    }), c5(this, "processRequestsQueue", async () => {
      if (this.requestQueue.state === K6.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = K6.active;
        const e2 = this.requestQueue.queue.shift();
        if (e2) try {
          await this.processRequest(e2);
        } catch (t) {
          this.client.logger.warn(t);
        }
      }
      this.requestQueue.state = K6.idle;
    }), c5(this, "processRequest", async (e2) => {
      const { topic: t, payload: s3, attestation: i4, transportType: r3, encryptedId: n5 } = e2, a4 = s3.method;
      if (!this.shouldIgnorePairingRequest({ topic: t, requestMethod: a4 })) switch (a4) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: t, payload: s3, attestation: i4, encryptedId: n5 });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(t, s3);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(t, s3);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(t, s3);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(t, s3);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(t, s3);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: t, payload: s3, attestation: i4, encryptedId: n5, transportType: r3 });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(t, s3);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: t, payload: s3, attestation: i4, encryptedId: n5, transportType: r3 });
        default:
          return this.client.logger.info(`Unsupported request method ${a4}`);
      }
    }), c5(this, "onRelayEventResponse", async (e2) => {
      const { topic: t, payload: s3, transportType: i4 } = e2, r3 = (await this.client.core.history.get(t, s3.id)).request.method;
      switch (r3) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(t, s3, i4);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(t, s3);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(t, s3);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(t, s3);
        case "wc_sessionPing":
          return this.onSessionPingResponse(t, s3);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(t, s3);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(t, s3);
        default:
          return this.client.logger.info(`Unsupported response method ${r3}`);
      }
    }), c5(this, "onRelayEventUnknownPayload", (e2) => {
      const { topic: t } = e2, { message: s3 } = Bt2("MISSING_OR_INVALID", `Decoded payload on topic ${t} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(s3);
    }), c5(this, "shouldIgnorePairingRequest", (e2) => {
      const { topic: t, requestMethod: s3 } = e2, i4 = this.expectedPairingMethodMap.get(t);
      return !i4 || i4.includes(s3) ? false : !!(i4.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), c5(this, "onSessionProposeRequest", async (e2) => {
      const { topic: t, payload: s3, attestation: i4, encryptedId: r3 } = e2, { params: n5, id: a4 } = s3;
      try {
        const l6 = this.client.core.eventClient.getEvent({ topic: t });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l6?.setError(X3.proposal_listener_not_found)), this.isValidConnect(E3({}, s3.params));
        const h5 = n5.expiryTimestamp || _i(N11.wc_sessionPropose.req.ttl), p4 = E3({ id: a4, pairingTopic: t, expiryTimestamp: h5, attestation: i4, encryptedId: r3 }, n5);
        await this.setProposal(a4, p4);
        const y4 = await this.getVerifyContext({ attestationId: i4, hash: ya(JSON.stringify(s3)), encryptedId: r3, metadata: p4.proposer.metadata });
        l6?.addTrace(Y2.emit_session_proposal), this.client.events.emit("session_proposal", { id: a4, params: p4, verifyContext: y4 });
      } catch (l6) {
        await this.sendError({ id: a4, topic: t, error: l6, rpcOpts: N11.wc_sessionPropose.autoReject }), this.client.logger.error(l6);
      }
    }), c5(this, "onSessionProposeResponse", async (e2, t, s3) => {
      const { id: i4 } = t;
      if (isJsonRpcResult(t)) {
        const { result: r3 } = t;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r3 });
        const n5 = this.client.proposal.get(i4);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: n5 });
        const a4 = n5.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a4 });
        const l6 = r3.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l6 });
        const h5 = await this.client.core.crypto.generateSharedKey(a4, l6);
        this.pendingSessions.set(i4, { sessionTopic: h5, pairingTopic: e2, proposalId: i4, publicKey: a4 });
        const p4 = await this.client.core.relayer.subscribe(h5, { transportType: s3 });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: p4 }), await this.client.core.pairing.activate({ topic: e2 });
      } else if (isJsonRpcError(t)) {
        await this.deleteProposal(i4);
        const r3 = $i("session_connect", i4);
        if (this.events.listenerCount(r3) === 0) throw new Error(`emitting ${r3} without any listeners, 954`);
        this.events.emit(r3, { error: t.error });
      }
    }), c5(this, "onSessionSettleRequest", async (e2, t) => {
      const { id: s3, params: i4 } = t;
      try {
        this.isValidSessionSettleRequest(i4);
        const { relay: r3, controller: n5, expiry: a4, namespaces: l6, sessionProperties: h5, scopedProperties: p4, sessionConfig: y4, proposalRequestsResponses: d4 } = t.params, u2 = [...this.pendingSessions.values()].find((f5) => f5.sessionTopic === e2);
        if (!u2) return this.client.logger.error(`Pending session not found for topic ${e2}`);
        const w3 = this.client.proposal.get(u2.proposalId), g3 = b4(E3(E3(E3({ topic: e2, relay: r3, expiry: a4, namespaces: l6, acknowledged: true, pairingTopic: u2.pairingTopic, requiredNamespaces: w3.requiredNamespaces, optionalNamespaces: w3.optionalNamespaces, controller: n5.publicKey, self: { publicKey: u2.publicKey, metadata: this.client.metadata }, peer: { publicKey: n5.publicKey, metadata: n5.metadata } }, h5 && { sessionProperties: h5 }), p4 && { scopedProperties: p4 }), y4 && { sessionConfig: y4 }), { transportType: ee2.relay, authentication: d4?.authentication, walletPayResult: d4?.walletPay });
        await this.client.session.set(g3.topic, g3), await this.setExpiry(g3.topic, g3.expiry), await this.client.core.pairing.updateMetadata({ topic: u2.pairingTopic, metadata: g3.peer.metadata }), this.pendingSessions.delete(u2.proposalId), this.deleteProposal(u2.proposalId, false), this.cleanupDuplicatePairings(g3), await this.sendResult({ id: t.id, topic: e2, throwOnFailedPublish: true, result: true }), this.client.events.emit("session_connect", { session: g3 }), this.events.emit($i("session_connect", u2.proposalId), { session: g3 });
      } catch (r3) {
        await this.sendError({ id: s3, topic: e2, error: r3 }), this.client.logger.error(r3);
      }
    }), c5(this, "onSessionSettleResponse", async (e2, t) => {
      const { id: s3 } = t;
      isJsonRpcResult(t) ? (await this.client.session.update(e2, { acknowledged: true }), this.events.emit($i("session_approve", s3), {})) : isJsonRpcError(t) && (await this.client.session.delete(e2, zt2("USER_DISCONNECTED")), this.events.emit($i("session_approve", s3), { error: t.error }));
    }), c5(this, "onSessionUpdateRequest", async (e2, t) => {
      const { params: s3, id: i4 } = t;
      try {
        const r3 = `${e2}_session_update`, n5 = mu.get(r3);
        if (n5 && this.isRequestOutOfSync(n5, i4)) {
          this.client.logger.warn(`Discarding out of sync request - ${i4}`), this.sendError({ id: i4, topic: e2, error: zt2("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(E3({ topic: e2 }, s3));
        try {
          mu.set(r3, i4), await this.client.session.update(e2, { namespaces: s3.namespaces }), await this.sendResult({ id: i4, topic: e2, result: true });
        } catch (a4) {
          throw mu.delete(r3), a4;
        }
        this.client.events.emit("session_update", { id: i4, topic: e2, params: s3 });
      } catch (r3) {
        await this.sendError({ id: i4, topic: e2, error: r3 }), this.client.logger.error(r3);
      }
    }), c5(this, "isRequestOutOfSync", (e2, t) => t.toString().slice(0, -3) < e2.toString().slice(0, -3)), c5(this, "onSessionUpdateResponse", (e2, t) => {
      const { id: s3 } = t, i4 = $i("session_update", s3);
      if (this.events.listenerCount(i4) === 0) throw new Error(`emitting ${i4} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit($i("session_update", s3), {}) : isJsonRpcError(t) && this.events.emit($i("session_update", s3), { error: t.error });
    }), c5(this, "onSessionExtendRequest", async (e2, t) => {
      const { id: s3 } = t;
      try {
        this.isValidExtend({ topic: e2 }), await this.setExpiry(e2, _i(se2)), await this.sendResult({ id: s3, topic: e2, result: true }), this.client.events.emit("session_extend", { id: s3, topic: e2 });
      } catch (i4) {
        await this.sendError({ id: s3, topic: e2, error: i4 }), this.client.logger.error(i4);
      }
    }), c5(this, "onSessionExtendResponse", (e2, t) => {
      const { id: s3 } = t, i4 = $i("session_extend", s3);
      if (this.events.listenerCount(i4) === 0) throw new Error(`emitting ${i4} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit($i("session_extend", s3), {}) : isJsonRpcError(t) && this.events.emit($i("session_extend", s3), { error: t.error });
    }), c5(this, "onSessionPingRequest", async (e2, t) => {
      const { id: s3 } = t;
      try {
        this.isValidPing({ topic: e2 }), await this.sendResult({ id: s3, topic: e2, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_ping", { id: s3, topic: e2 });
      } catch (i4) {
        await this.sendError({ id: s3, topic: e2, error: i4 }), this.client.logger.error(i4);
      }
    }), c5(this, "onSessionPingResponse", (e2, t) => {
      const { id: s3 } = t, i4 = $i("session_ping", s3);
      setTimeout(() => {
        if (this.events.listenerCount(i4) === 0) throw new Error(`emitting ${i4} without any listeners 2176`);
        isJsonRpcResult(t) ? this.events.emit($i("session_ping", s3), {}) : isJsonRpcError(t) && this.events.emit($i("session_ping", s3), { error: t.error });
      }, 500);
    }), c5(this, "onSessionDeleteRequest", async (e2, t) => {
      const { id: s3 } = t;
      try {
        await this.isValidDisconnect({ topic: e2, reason: t.params }), this.cleanupPendingSentRequestsForTopic({ topic: e2, error: zt2("USER_DISCONNECTED") }), await this.deleteSession({ topic: e2, id: s3 });
      } catch (i4) {
        this.client.logger.error(i4);
      }
    }), c5(this, "onSessionRequest", async (e2) => {
      var t, s3, i4;
      const { topic: r3, payload: n5, attestation: a4, encryptedId: l6, transportType: h5 } = e2, { id: p4, params: y4 } = n5;
      try {
        await this.isValidRequest(E3({ topic: r3 }, y4));
        const d4 = this.client.session.get(r3), u2 = await this.getVerifyContext({ attestationId: a4, hash: ya(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", y4, p4))), encryptedId: l6, metadata: d4.peer.metadata, transportType: h5 }), w3 = { id: p4, topic: r3, params: y4, verifyContext: u2 };
        await this.setPendingSessionRequest(w3), h5 === ee2.link_mode && (t = d4.peer.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp((s3 = d4.peer.metadata.redirect) == null ? void 0 : s3.universal), (i4 = this.client.signConfig) != null && i4.disableRequestQueue ? this.emitSessionRequest(w3) : (this.addSessionRequestToSessionRequestQueue(w3), this.processSessionRequestQueue());
      } catch (d4) {
        await this.sendError({ id: p4, topic: r3, error: d4 }), this.client.logger.error(d4);
      }
    }), c5(this, "onSessionRequestResponse", (e2, t) => {
      const { id: s3 } = t, i4 = $i("session_request", s3);
      if (this.events.listenerCount(i4) === 0) throw new Error(`emitting ${i4} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit($i("session_request", s3), { result: t.result }) : isJsonRpcError(t) && this.events.emit($i("session_request", s3), { error: t.error });
    }), c5(this, "onSessionEventRequest", async (e2, t) => {
      const { id: s3, params: i4 } = t;
      try {
        const r3 = `${e2}_session_event_${i4.event.name}`, n5 = mu.get(r3);
        if (n5 && this.isRequestOutOfSync(n5, s3)) {
          this.client.logger.info(`Discarding out of sync request - ${s3}`);
          return;
        }
        this.isValidEmit(E3({ topic: e2 }, i4)), this.client.events.emit("session_event", { id: s3, topic: e2, params: i4 }), mu.set(r3, s3);
      } catch (r3) {
        await this.sendError({ id: s3, topic: e2, error: r3 }), this.client.logger.error(r3);
      }
    }), c5(this, "onSessionAuthenticateResponse", (e2, t) => {
      const { id: s3 } = t;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: e2, payload: t }), isJsonRpcResult(t) ? this.events.emit($i("session_request", s3), { result: t.result }) : isJsonRpcError(t) && this.events.emit($i("session_request", s3), { error: t.error });
    }), c5(this, "onSessionAuthenticateRequest", async (e2) => {
      var t;
      const { topic: s3, payload: i4, attestation: r3, encryptedId: n5, transportType: a4 } = e2;
      try {
        const { requester: l6, authPayload: h5, expiryTimestamp: p4 } = i4.params, y4 = await this.getVerifyContext({ attestationId: r3, hash: ya(JSON.stringify(i4)), encryptedId: n5, metadata: l6.metadata, transportType: a4 }), d4 = { requester: l6, pairingTopic: s3, id: i4.id, authPayload: h5, verifyContext: y4, expiryTimestamp: p4 };
        await this.setAuthRequest(i4.id, { request: d4, pairingTopic: s3, transportType: a4 }), a4 === ee2.link_mode && (t = l6.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp(l6.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: s3, params: i4.params, id: i4.id, verifyContext: y4 });
      } catch (l6) {
        this.client.logger.error(l6);
        const h5 = i4.params.requester.publicKey, p4 = await this.client.core.crypto.generateKeyPair(), y4 = this.getAppLinkIfEnabled(i4.params.requester.metadata, a4), d4 = { type: ie, receiverPublicKey: h5, senderPublicKey: p4 };
        await this.sendError({ id: i4.id, topic: s3, error: l6, encodeOpts: d4, rpcOpts: N11.wc_sessionAuthenticate.autoReject, appLink: y4 });
      }
    }), c5(this, "addSessionRequestToSessionRequestQueue", (e2) => {
      this.sessionRequestQueue.queue.push(e2);
    }), c5(this, "cleanupAfterResponse", (e2) => {
      this.deletePendingSessionRequest(e2.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = K6.idle, this.processSessionRequestQueue();
      }, (0, import_time5.toMiliseconds)(this.requestQueueDelay));
    }), c5(this, "cleanupPendingSentRequestsForTopic", ({ topic: e2, error: t }) => {
      const s3 = this.client.core.history.pending;
      s3.length > 0 && s3.filter((i4) => i4.topic === e2 && i4.request.method === "wc_sessionRequest").forEach((i4) => {
        this.events.emit($i("session_request", i4.request.id), { error: t });
      });
    }), c5(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === K6.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e2 = this.sessionRequestQueue.queue[0];
      if (!e2) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.emitSessionRequest(e2);
      } catch (t) {
        this.client.logger.error(t);
      }
    }), c5(this, "emitSessionRequest", (e2) => {
      if (this.emittedSessionRequests.has(e2.id)) {
        this.client.logger.warn({ id: e2.id }, `Skipping emitting \`session_request\` event for duplicate request. id: ${e2.id}`);
        return;
      }
      this.sessionRequestQueue.state = K6.active, this.emittedSessionRequests.add(e2.id), this.client.events.emit("session_request", e2);
    }), c5(this, "onPairingCreated", (e2) => {
      if (e2.methods && this.expectedPairingMethodMap.set(e2.topic, e2.methods), e2.active) return;
      const t = this.client.proposal.getAll().find((s3) => s3.pairingTopic === e2.topic);
      t && this.onSessionProposeRequest({ topic: e2.topic, payload: formatJsonRpcRequest("wc_sessionPropose", b4(E3({}, t), { requiredNamespaces: t.requiredNamespaces, optionalNamespaces: t.optionalNamespaces, relays: t.relays, proposer: t.proposer, sessionProperties: t.sessionProperties, scopedProperties: t.scopedProperties }), t.id), attestation: t.attestation, encryptedId: t.encryptedId });
    }), c5(this, "isValidConnect", async (e2) => {
      if (!ou(e2)) {
        const { message: l6 } = Bt2("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e2)}`);
        throw new Error(l6);
      }
      const { pairingTopic: t, requiredNamespaces: s3, optionalNamespaces: i4, sessionProperties: r3, scopedProperties: n5, relays: a4 } = e2;
      if (Dt2(t) || await this.isValidPairingTopic(t), !nu(a4, true)) {
        const { message: l6 } = Bt2("MISSING_OR_INVALID", `connect() relays: ${a4}`);
        throw new Error(l6);
      }
      if (s3 && !Dt2(s3) && Ye2(s3) !== 0) {
        const l6 = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
        ["fatal", "error", "silent"].includes(this.client.logger.level) ? console.warn(l6) : this.client.logger.warn(l6), this.validateNamespaces(s3, "requiredNamespaces");
      }
      if (i4 && !Dt2(i4) && Ye2(i4) !== 0 && this.validateNamespaces(i4, "optionalNamespaces"), r3 && !Dt2(r3) && this.validateSessionProps(r3, "sessionProperties"), n5 && !Dt2(n5)) {
        this.validateSessionProps(n5, "scopedProperties");
        const l6 = Object.keys(s3 || {}).concat(Object.keys(i4 || {}));
        if (!Object.keys(n5).every((h5) => l6.includes(h5.split(":")[0]))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(n5)}, required/optional namespaces: ${JSON.stringify(l6)}`);
      }
    }), c5(this, "validateNamespaces", (e2, t) => {
      const s3 = eu(e2, "connect()", t);
      if (s3) throw new Error(s3.message);
    }), c5(this, "isValidApprove", async (e2) => {
      if (!ou(e2)) throw new Error(Bt2("MISSING_OR_INVALID", `approve() params: ${e2}`).message);
      const { id: t, namespaces: s3, relayProtocol: i4, sessionProperties: r3, scopedProperties: n5 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidProposalId(t);
      const a4 = this.client.proposal.get(t), l6 = Ns(s3, "approve()");
      if (l6) throw new Error(l6.message);
      const h5 = _s(a4.requiredNamespaces, s3, "approve()");
      if (h5) throw new Error(h5.message);
      if (!ft2(i4, true)) {
        const { message: p4 } = Bt2("MISSING_OR_INVALID", `approve() relayProtocol: ${i4}`);
        throw new Error(p4);
      }
      if (r3 && !Dt2(r3) && this.validateSessionProps(r3, "sessionProperties"), n5 && !Dt2(n5)) {
        this.validateSessionProps(n5, "scopedProperties");
        const p4 = new Set(Object.keys(s3));
        if (!Object.keys(n5).every((y4) => p4.has(y4.split(":")[0]))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(n5)}, approved namespaces: ${Array.from(p4).join(", ")}`);
      }
    }), c5(this, "isValidReject", async (e2) => {
      if (!ou(e2)) {
        const { message: i4 } = Bt2("MISSING_OR_INVALID", `reject() params: ${e2}`);
        throw new Error(i4);
      }
      const { id: t, reason: s3 } = e2;
      if (this.checkRecentlyDeleted(t), await this.isValidProposalId(t), !su(s3)) {
        const { message: i4 } = Bt2("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s3)}`);
        throw new Error(i4);
      }
    }), c5(this, "isValidSessionSettleRequest", (e2) => {
      if (!ou(e2)) {
        const { message: l6 } = Bt2("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e2}`);
        throw new Error(l6);
      }
      const { relay: t, controller: s3, namespaces: i4, expiry: r3 } = e2;
      if (!Us(t)) {
        const { message: l6 } = Bt2("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l6);
      }
      const n5 = tu(s3, "onSessionSettleRequest()");
      if (n5) throw new Error(n5.message);
      const a4 = Ns(i4, "onSessionSettleRequest()");
      if (a4) throw new Error(a4.message);
      if (Ri(r3)) {
        const { message: l6 } = Bt2("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l6);
      }
    }), c5(this, "isValidUpdate", async (e2) => {
      if (!ou(e2)) {
        const { message: a4 } = Bt2("MISSING_OR_INVALID", `update() params: ${e2}`);
        throw new Error(a4);
      }
      const { topic: t, namespaces: s3 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const i4 = this.client.session.get(t), r3 = Ns(s3, "update()");
      if (r3) throw new Error(r3.message);
      const n5 = _s(i4.requiredNamespaces, s3, "update()");
      if (n5) throw new Error(n5.message);
    }), c5(this, "isValidExtend", async (e2) => {
      if (!ou(e2)) {
        const { message: s3 } = Bt2("MISSING_OR_INVALID", `extend() params: ${e2}`);
        throw new Error(s3);
      }
      const { topic: t } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
    }), c5(this, "isValidRequest", async (e2) => {
      if (!ou(e2)) {
        const { message: a4 } = Bt2("MISSING_OR_INVALID", `request() params: ${e2}`);
        throw new Error(a4);
      }
      const { topic: t, request: s3, chainId: i4, expiry: r3 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const { namespaces: n5 } = this.client.session.get(t);
      if (!au(n5, i4)) {
        const { message: a4 } = Bt2("MISSING_OR_INVALID", `request() chainId: ${i4}`);
        throw new Error(a4);
      }
      if (!iu(s3)) {
        const { message: a4 } = Bt2("MISSING_OR_INVALID", `request() ${JSON.stringify(s3)}`);
        throw new Error(a4);
      }
      if (!uu(n5, i4, s3.method)) {
        const { message: a4 } = Bt2("MISSING_OR_INVALID", `request() method: ${s3.method}`);
        throw new Error(a4);
      }
      this.validateRequestExpiry(r3);
    }), c5(this, "isValidRespond", async (e2) => {
      var t;
      if (!ou(e2)) {
        const { message: n5 } = Bt2("MISSING_OR_INVALID", `respond() params: ${e2}`);
        throw new Error(n5);
      }
      const { topic: s3, response: i4 } = e2;
      try {
        await this.isValidSessionTopic(s3);
      } catch (n5) {
        throw (t = e2?.response) != null && t.id && this.cleanupAfterResponse(e2), n5;
      }
      if (!cu(i4)) {
        const { message: n5 } = Bt2("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i4)}`);
        throw new Error(n5);
      }
      const r3 = this.client.pendingRequest.get(i4.id);
      if (r3.topic !== s3) {
        const { message: n5 } = Bt2("MISMATCHED_TOPIC", `Request response topic mismatch. reqId: ${i4.id}, expected topic: ${r3.topic}, received topic: ${s3}`);
        throw new Error(n5);
      }
    }), c5(this, "isValidPing", async (e2) => {
      if (!ou(e2)) {
        const { message: s3 } = Bt2("MISSING_OR_INVALID", `ping() params: ${e2}`);
        throw new Error(s3);
      }
      const { topic: t } = e2;
      await this.isValidSessionOrPairingTopic(t);
    }), c5(this, "isValidEmit", async (e2) => {
      if (!ou(e2)) {
        const { message: n5 } = Bt2("MISSING_OR_INVALID", `emit() params: ${e2}`);
        throw new Error(n5);
      }
      const { topic: t, event: s3, chainId: i4 } = e2;
      await this.isValidSessionTopic(t);
      const { namespaces: r3 } = this.client.session.get(t);
      if (!au(r3, i4)) {
        const { message: n5 } = Bt2("MISSING_OR_INVALID", `emit() chainId: ${i4}`);
        throw new Error(n5);
      }
      if (!fu(s3)) {
        const { message: n5 } = Bt2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s3)}`);
        throw new Error(n5);
      }
      if (!lu(r3, i4, s3.name)) {
        const { message: n5 } = Bt2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s3)}`);
        throw new Error(n5);
      }
    }), c5(this, "isValidDisconnect", async (e2) => {
      if (!ou(e2)) {
        const { message: s3 } = Bt2("MISSING_OR_INVALID", `disconnect() params: ${e2}`);
        throw new Error(s3);
      }
      const { topic: t } = e2;
      await this.isValidSessionOrPairingTopic(t);
    }), c5(this, "isValidAuthenticate", (e2) => {
      const { chains: t, uri: s3, domain: i4, nonce: r3 } = e2;
      if (!Array.isArray(t) || t.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!ft2(s3, false)) throw new Error("uri is required parameter");
      if (!ft2(i4, false)) throw new Error("domain is required parameter");
      if (!ft2(r3, false)) throw new Error("nonce is required parameter");
      if ([...new Set(t.map((a4) => Je2(a4).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: n5 } = Je2(t[0]);
      if (n5 !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), c5(this, "getVerifyContext", async (e2) => {
      const { attestationId: t, hash: s3, encryptedId: i4, metadata: r3, transportType: n5 } = e2, a4 = { verified: { verifyUrl: r3.verifyUrl || be3, validation: "UNKNOWN", origin: r3.url || "" } };
      try {
        if (n5 === ee2.link_mode) {
          const h5 = this.getAppLinkIfEnabled(r3, n5);
          return a4.verified.validation = h5 && new URL(h5).origin === new URL(r3.url).origin ? "VALID" : "INVALID", a4;
        }
        const l6 = await this.client.core.verify.resolve({ attestationId: t, hash: s3, encryptedId: i4, verifyUrl: r3.verifyUrl });
        l6 && (a4.verified.origin = l6.origin, a4.verified.isScam = l6.isScam, a4.verified.validation = l6.origin === new URL(r3.url).origin ? "VALID" : "INVALID");
      } catch (l6) {
        this.client.logger.warn(l6);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(a4)}`), a4;
    }), c5(this, "validateSessionProps", (e2, t) => {
      Object.values(e2).forEach((s3, i4) => {
        if (s3 == null) {
          const { message: r3 } = Bt2("MISSING_OR_INVALID", `${t} must contain an existing value for each key. Received: ${s3} for key ${Object.keys(e2)[i4]}`);
          throw new Error(r3);
        }
      });
    }), c5(this, "getPendingAuthRequest", (e2) => {
      const t = this.client.auth.requests.get(e2);
      return typeof t == "object" ? t : void 0;
    }), c5(this, "addToRecentlyDeleted", (e2, t) => {
      if (this.recentlyDeletedMap.set(e2, t), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let s3 = 0;
        const i4 = this.recentlyDeletedLimit / 2;
        for (const r3 of this.recentlyDeletedMap.keys()) {
          if (s3++ >= i4) break;
          this.recentlyDeletedMap.delete(r3);
        }
      }
    }), c5(this, "checkRecentlyDeleted", (e2) => {
      const t = this.recentlyDeletedMap.get(e2);
      if (t) {
        const { message: s3 } = Bt2("MISSING_OR_INVALID", `Record was recently deleted - ${t}: ${e2}`);
        throw new Error(s3);
      }
    }), c5(this, "isLinkModeEnabled", (e2, t) => {
      var s3, i4, r3, n5, a4, l6, h5, p4, y4;
      return !e2 || t !== ee2.link_mode ? false : ((i4 = (s3 = this.client.metadata) == null ? void 0 : s3.redirect) == null ? void 0 : i4.linkMode) === true && ((n5 = (r3 = this.client.metadata) == null ? void 0 : r3.redirect) == null ? void 0 : n5.universal) !== void 0 && ((l6 = (a4 = this.client.metadata) == null ? void 0 : a4.redirect) == null ? void 0 : l6.universal) !== "" && ((h5 = e2?.redirect) == null ? void 0 : h5.universal) !== void 0 && ((p4 = e2?.redirect) == null ? void 0 : p4.universal) !== "" && ((y4 = e2?.redirect) == null ? void 0 : y4.linkMode) === true && this.client.core.linkModeSupportedApps.includes(e2.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), c5(this, "getAppLinkIfEnabled", (e2, t) => {
      var s3;
      return this.isLinkModeEnabled(e2, t) ? (s3 = e2?.redirect) == null ? void 0 : s3.universal : void 0;
    }), c5(this, "handleLinkModeMessage", ({ url: e2 }) => {
      if (!e2 || !e2.includes("wc_ev") || !e2.includes("topic")) return;
      const t = ji(e2, "topic") || "", s3 = decodeURIComponent(ji(e2, "wc_ev") || ""), i4 = this.client.session.keys.includes(t);
      i4 && this.client.session.update(t, { transportType: ee2.link_mode }), this.client.core.dispatchEnvelope({ topic: t, message: s3, sessionExists: i4 });
    }), c5(this, "registerLinkModeListeners", async () => {
      var e2;
      if (ki() || It2() && (e2 = this.client.metadata.redirect) != null && e2.linkMode) {
        const t = global == null ? void 0 : global.Linking;
        if (typeof t < "u") {
          t.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const s3 = await t.getInitialURL();
          s3 && setTimeout(() => {
            this.handleLinkModeMessage({ url: s3 });
          }, 50);
        }
      }
    }), c5(this, "getTVFApproveParams", (e2) => {
      try {
        const t = gs(e2.namespaces), s3 = qa(e2.namespaces), i4 = Fa(e2.namespaces), r3 = e2.sessionProperties, n5 = e2.scopedProperties;
        return { approvedChains: t, approvedMethods: s3, approvedEvents: i4, sessionProperties: r3, scopedProperties: n5 };
      } catch (t) {
        return this.client.logger.warn(t, "Error getting TVF approve params"), {};
      }
    }), c5(this, "getTVFParams", (e2, t, s3) => {
      var i4, r3, n5;
      if (!((i4 = t.request) != null && i4.method)) return {};
      const a4 = { correlationId: e2, rpcMethods: [t.request.method], chainId: t.chainId };
      try {
        const l6 = this.extractTxHashesFromResult(t.request, s3);
        a4.txHashes = l6, a4.contractAddresses = this.isValidContractData(t.request.params) ? [(n5 = (r3 = t.request.params) == null ? void 0 : r3[0]) == null ? void 0 : n5.to] : [];
      } catch (l6) {
        this.client.logger.warn(l6, "Error getting TVF params");
      }
      return a4;
    }), c5(this, "isValidContractData", (e2) => {
      var t;
      if (!e2) return false;
      try {
        const s3 = e2?.data || ((t = e2?.[0]) == null ? void 0 : t.data);
        if (!s3.startsWith("0x")) return false;
        const i4 = s3.slice(2);
        return /^[0-9a-fA-F]*$/.test(i4) ? i4.length % 2 === 0 : false;
      } catch {
      }
      return false;
    }), c5(this, "extractTxHashesFromResult", (e2, t) => {
      var s3;
      try {
        if (!t) return [];
        const i4 = e2.method, r3 = yt3[i4];
        if (i4 === "sui_signTransaction") return [Uc(t.transactionBytes)];
        if (i4 === "near_signTransaction") return [_c(t)];
        if (i4 === "near_signTransactions") return t.map((a4) => _c(a4));
        if (i4 === "xrpl_signTransactionFor" || i4 === "xrpl_signTransaction") return [(s3 = t.tx_json) == null ? void 0 : s3.hash];
        if (i4 === "polkadot_signTransaction") return [Bu({ transaction: e2.params.transactionPayload, signature: t.signature })];
        if (i4 === "algo_signTxn") return Be2(t) ? t.map((a4) => Rc(a4)) : [Rc(t)];
        if (i4 === "cosmos_signDirect") return [$c(t)];
        if (i4 === "wallet_sendCalls") return Tc(t);
        if (typeof t == "string") return [t];
        const n5 = t[r3.key];
        if (Be2(n5)) return i4 === "solana_signAllTransactions" ? n5.map((a4) => Nc(a4)) : n5;
        if (typeof n5 == "string") return [n5];
      } catch (i4) {
        this.client.logger.warn(i4, "Error extracting tx hashes from result");
      }
      return [];
    });
  }
  async processPendingMessageEvents() {
    try {
      const o4 = this.client.session.keys, e2 = this.client.core.relayer.messages.getWithoutAck(o4);
      for (const [t, s3] of Object.entries(e2)) for (const i4 of s3) try {
        await this.onProviderMessageEvent({ topic: t, message: i4, publishedAt: Date.now() });
      } catch {
        this.client.logger.warn(`Error processing pending message event for topic: ${t}, message: ${i4}`);
      }
    } catch (o4) {
      this.client.logger.warn(o4, "processPendingMessageEvents failed");
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: o4 } = Bt2("NOT_INITIALIZED", this.name);
      throw new Error(o4);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(C3.message, (o4) => {
      this.onProviderMessageEvent(o4);
    });
  }
  async onRelayMessage(o4) {
    const { topic: e2, message: t, attestation: s3, transportType: i4 } = o4, { publicKey: r3 } = this.client.auth.authKeys.keys.includes(_e4) ? this.client.auth.authKeys.get(_e4) : { responseTopic: void 0, publicKey: void 0 };
    try {
      const n5 = await this.client.core.crypto.decode(e2, t, { receiverPublicKey: r3, encoding: i4 === ee2.link_mode ? Ge2 : oe });
      isJsonRpcRequest(n5) ? (this.client.core.history.set(e2, n5), await this.onRelayEventRequest({ topic: e2, payload: n5, attestation: s3, transportType: i4, encryptedId: ya(t) })) : isJsonRpcResponse(n5) ? (await this.client.core.history.resolve(n5), await this.onRelayEventResponse({ topic: e2, payload: n5, transportType: i4 }), this.client.core.history.delete(e2, n5.id)) : (this.client.logger.error(`onRelayMessage() -> unknown payload: ${JSON.stringify(n5)}`), await this.onRelayEventUnknownPayload({ topic: e2, payload: n5, transportType: i4 })), await this.client.core.relayer.messages.ack(e2, t);
    } catch (n5) {
      this.client.logger.error(`onRelayMessage() -> failed to process an inbound message: ${t}`), this.client.logger.error(n5);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(q.expired, async (o4) => {
      const { topic: e2, id: t } = Ui(o4.target);
      if (t && this.client.pendingRequest.keys.includes(t)) return await this.deletePendingSessionRequest(t, Bt2("EXPIRED"), true);
      if (t && this.client.auth.requests.keys.includes(t)) return await this.deletePendingAuthRequest(t, Bt2("EXPIRED"), true);
      e2 ? this.client.session.keys.includes(e2) && (await this.deleteSession({ topic: e2, expirerHasDeleted: true }), this.client.events.emit("session_expire", { topic: e2 })) : t && (await this.deleteProposal(t, true), this.client.events.emit("proposal_expire", { id: t }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(ae2.create, (o4) => this.onPairingCreated(o4)), this.client.core.pairing.events.on(ae2.delete, (o4) => {
      this.addToRecentlyDeleted(o4.topic, "pairing");
    });
  }
  isValidPairingTopic(o4) {
    if (!ft2(o4, false)) {
      const { message: e2 } = Bt2("MISSING_OR_INVALID", `pairing topic should be a string: ${o4}`);
      throw new Error(e2);
    }
    if (!this.client.core.pairing.pairings.keys.includes(o4)) {
      const { message: e2 } = Bt2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${o4}`);
      throw new Error(e2);
    }
    if (Ri(this.client.core.pairing.pairings.get(o4).expiry)) {
      const { message: e2 } = Bt2("EXPIRED", `pairing topic: ${o4}`);
      throw new Error(e2);
    }
  }
  async isValidSessionTopic(o4) {
    if (!ft2(o4, false)) {
      const { message: e2 } = Bt2("MISSING_OR_INVALID", `session topic should be a string: ${o4}`);
      throw new Error(e2);
    }
    if (this.checkRecentlyDeleted(o4), !this.client.session.keys.includes(o4)) {
      const { message: e2 } = Bt2("NO_MATCHING_KEY", `session topic doesn't exist: ${o4}`);
      throw new Error(e2);
    }
    if (Ri(this.client.session.get(o4).expiry)) {
      await this.deleteSession({ topic: o4 });
      const { message: e2 } = Bt2("EXPIRED", `session topic: ${o4}`);
      throw new Error(e2);
    }
    if (!this.client.core.crypto.keychain.has(o4)) {
      const { message: e2 } = Bt2("MISSING_OR_INVALID", `session topic does not exist in keychain: ${o4}`);
      throw await this.deleteSession({ topic: o4 }), new Error(e2);
    }
  }
  async isValidSessionOrPairingTopic(o4) {
    if (this.checkRecentlyDeleted(o4), this.client.session.keys.includes(o4)) await this.isValidSessionTopic(o4);
    else if (this.client.core.pairing.pairings.keys.includes(o4)) this.isValidPairingTopic(o4);
    else if (ft2(o4, false)) {
      const { message: e2 } = Bt2("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${o4}`);
      throw new Error(e2);
    } else {
      const { message: e2 } = Bt2("MISSING_OR_INVALID", `session or pairing topic should be a string: ${o4}`);
      throw new Error(e2);
    }
  }
  async isValidProposalId(o4) {
    if (!ru(o4)) {
      const { message: e2 } = Bt2("MISSING_OR_INVALID", `proposal id should be a number: ${o4}`);
      throw new Error(e2);
    }
    if (!this.client.proposal.keys.includes(o4)) {
      const { message: e2 } = Bt2("NO_MATCHING_KEY", `proposal id doesn't exist: ${o4}`);
      throw new Error(e2);
    }
    if (Ri(this.client.proposal.get(o4).expiryTimestamp)) {
      await this.deleteProposal(o4);
      const { message: e2 } = Bt2("EXPIRED", `proposal id: ${o4}`);
      throw new Error(e2);
    }
  }
  validateRequestExpiry(o4) {
    if (o4 && !pu(o4, Te3)) {
      const { message: e2 } = Bt2("MISSING_OR_INVALID", `request() expiry: ${o4}. Expiry must be a number (in seconds) between ${Te3.min} and ${Te3.max}`);
      throw new Error(e2);
    }
  }
};
var Ls2 = class extends ji2 {
  constructor(o4, e2) {
    super(o4, e2, dt3, Re4), this.core = o4, this.logger = e2;
  }
};
var It4 = class extends ji2 {
  constructor(o4, e2) {
    super(o4, e2, ut3, Re4), this.core = o4, this.logger = e2;
  }
};
var Ms2 = class extends ji2 {
  constructor(o4, e2) {
    super(o4, e2, mt2, Re4, (t) => t.id), this.core = o4, this.logger = e2;
  }
};
var $s2 = class extends ji2 {
  constructor(o4, e2) {
    super(o4, e2, St4, we3, () => _e4), this.core = o4, this.logger = e2;
  }
};
var Ks = class extends ji2 {
  constructor(o4, e2) {
    super(o4, e2, Et4, we3), this.core = o4, this.logger = e2;
  }
};
var Us2 = class extends ji2 {
  constructor(o4, e2) {
    super(o4, e2, ft3, we3, (t) => t.id), this.core = o4, this.logger = e2;
  }
};
var Gs = Object.defineProperty;
var js2 = (S4, o4, e2) => o4 in S4 ? Gs(S4, o4, { enumerable: true, configurable: true, writable: true, value: e2 }) : S4[o4] = e2;
var Ge4 = (S4, o4, e2) => js2(S4, typeof o4 != "symbol" ? o4 + "" : o4, e2);
var Fs = class {
  constructor(o4, e2) {
    this.core = o4, this.logger = e2, Ge4(this, "authKeys"), Ge4(this, "pairingTopics"), Ge4(this, "requests"), this.authKeys = new $s2(this.core, this.logger), this.pairingTopics = new Ks(this.core, this.logger), this.requests = new Us2(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
};
var Hs2 = Object.defineProperty;
var Qs2 = (S4, o4, e2) => o4 in S4 ? Hs2(S4, o4, { enumerable: true, configurable: true, writable: true, value: e2 }) : S4[o4] = e2;
var _3 = (S4, o4, e2) => Qs2(S4, typeof o4 != "symbol" ? o4 + "" : o4, e2);
var qe4 = class _qe extends J {
  constructor(o4) {
    super(o4), _3(this, "protocol", De4), _3(this, "version", Le3), _3(this, "name", Ie3.name), _3(this, "metadata"), _3(this, "core"), _3(this, "logger"), _3(this, "events", new import_events8.EventEmitter()), _3(this, "engine"), _3(this, "session"), _3(this, "proposal"), _3(this, "pendingRequest"), _3(this, "auth"), _3(this, "signConfig"), _3(this, "on", (t, s3) => this.events.on(t, s3)), _3(this, "once", (t, s3) => this.events.once(t, s3)), _3(this, "off", (t, s3) => this.events.off(t, s3)), _3(this, "removeListener", (t, s3) => this.events.removeListener(t, s3)), _3(this, "removeAllListeners", (t) => this.events.removeAllListeners(t)), _3(this, "connect", async (t) => {
      try {
        return await this.engine.connect(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "pair", async (t) => {
      try {
        return await this.engine.pair(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "approve", async (t) => {
      try {
        return await this.engine.approve(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "reject", async (t) => {
      try {
        return await this.engine.reject(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "update", async (t) => {
      try {
        return await this.engine.update(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "extend", async (t) => {
      try {
        return await this.engine.extend(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "request", async (t) => {
      try {
        return await this.engine.request(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "respond", async (t) => {
      try {
        return await this.engine.respond(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "ping", async (t) => {
      try {
        return await this.engine.ping(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "emit", async (t) => {
      try {
        return await this.engine.emit(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "disconnect", async (t) => {
      try {
        return await this.engine.disconnect(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "find", (t) => {
      try {
        return this.engine.find(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }), _3(this, "authenticate", async (t, s3) => {
      try {
        return await this.engine.authenticate(t, s3);
      } catch (i4) {
        throw this.logger.error(i4.message), i4;
      }
    }), _3(this, "formatAuthMessage", (t) => {
      try {
        return this.engine.formatAuthMessage(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "approveSessionAuthenticate", async (t) => {
      try {
        return await this.engine.approveSessionAuthenticate(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), _3(this, "rejectSessionAuthenticate", async (t) => {
      try {
        return await this.engine.rejectSessionAuthenticate(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), this.name = o4?.name || Ie3.name, this.metadata = pi(o4?.metadata), this.signConfig = o4?.signConfig;
    const e2 = Iu({ logger: o4?.logger || Ie3.logger, name: this.name });
    this.logger = e2, this.core = o4?.core || new ta2(o4), this.session = new It4(this.core, this.logger), this.proposal = new Ls2(this.core, this.logger), this.pendingRequest = new Ms2(this.core, this.logger), this.engine = new Ds(this), this.auth = new Fs(this.core, this.logger);
  }
  static async init(o4) {
    const e2 = new _qe(o4);
    return await e2.initialize(), e2;
  }
  get context() {
    return w(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success");
    } catch (o4) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(o4.message), o4;
    }
  }
};
var zs = It4;
var Ys2 = qe4;
export {
  vt3 as AUTH_CONTEXT,
  St4 as AUTH_KEYS_CONTEXT,
  Et4 as AUTH_PAIRING_TOPIC_CONTEXT,
  _t3 as AUTH_PROTOCOL,
  _e4 as AUTH_PUBLIC_KEY_NAME,
  ft3 as AUTH_REQUEST_CONTEXT,
  we3 as AUTH_STORAGE_PREFIX,
  bs2 as AUTH_VERSION,
  gt3 as ENGINE_CONTEXT,
  K6 as ENGINE_QUEUE_STATES,
  N11 as ENGINE_RPC_OPTS,
  Ps2 as HISTORY_CONTEXT,
  qs as HISTORY_EVENTS,
  Ns2 as HISTORY_STORAGE_VERSION,
  wt3 as METHODS_TO_VERIFY,
  dt3 as PROPOSAL_CONTEXT,
  Os2 as PROPOSAL_EXPIRY,
  Ke4 as PROPOSAL_EXPIRY_MESSAGE,
  mt2 as REQUEST_CONTEXT,
  ut3 as SESSION_CONTEXT,
  se2 as SESSION_EXPIRY,
  Te3 as SESSION_REQUEST_EXPIRY_BOUNDARIES,
  Me4 as SIGN_CLIENT_CONTEXT,
  Ie3 as SIGN_CLIENT_DEFAULT,
  Is2 as SIGN_CLIENT_EVENTS,
  De4 as SIGN_CLIENT_PROTOCOL,
  Ts2 as SIGN_CLIENT_STORAGE_OPTIONS,
  Re4 as SIGN_CLIENT_STORAGE_PREFIX,
  Le3 as SIGN_CLIENT_VERSION,
  zs as SessionStore,
  Ys2 as SignClient,
  yt3 as TVF_METHODS,
  $e3 as WALLETCONNECT_DEEPLINK_CHOICE,
  qe4 as default
};
/*! Bundled license information:

tslib/tslib.es6.js:
tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@walletconnect/relay-auth/dist/index.es.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
@noble/curves/esm/abstract/modular.js:
@noble/curves/esm/abstract/curve.js:
@noble/curves/esm/abstract/weierstrass.js:
@noble/curves/esm/_shortw_utils.js:
@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@scure/base/lib/esm/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@walletconnect/utils/dist/index.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/
