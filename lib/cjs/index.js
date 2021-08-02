"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _echo = require("./echo/echo.js");

Object.keys(_echo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _echo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _echo[key];
    }
  });
});
//# sourceMappingURL=index.js.map