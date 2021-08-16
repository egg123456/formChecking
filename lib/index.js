"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

// --------------------- form 字段 准确性 校验 --------------------

/**
 * @description: 对form表单当前已触发的校验进行检测（分为 required and format 校验）
 * @param {*} e - form.getFieldsError()
 * @param {*} v - form.getFieldsValue()
 * @param {*} type - 错误类型 - 默认 格式-format 校验
 * @param {*} callback - 错误处理函数
 * @return {bool} 是否有该错误类型触发
 */
var checkingError = function checkingError(e, v) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'format';
  var callback = arguments.length > 3 ? arguments[3] : undefined;
  var has = false;

  var hasErr = function hasErr() {
    var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (err instanceof Object) {
      Object.keys(err).some(function (item) {
        var temp = err[item];

        if (Array.isArray(temp)) {
          if (temp[0] instanceof Object) {
            temp.forEach(function (el, i) {
              hasErr(el, values[item][i]);
            });
            return;
          }

          temp.some(function (el) {
            if (!el) return;
            has = type === 'format' ? !(0, _lodash.isEmpty)(values[item]) : (0, _lodash.isEmpty)(values[item]);
            has && typeof callback === 'function' && callback(el);
            return has;
          });
          return has;
        } else if (temp instanceof Object) {
          hasErr(temp, values[item]);
        }
      });
    }

    return has;
  };

  return hasErr(e, v);
};

var _default = checkingError;
exports["default"] = _default;