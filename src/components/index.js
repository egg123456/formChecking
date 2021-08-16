// --------------------- form 字段 准确性 校验 --------------------
/**
 * @description: 对form表单当前已触发的校验进行检测（分为 required and format 校验）
 * @param {*} e - form.getFieldsError()
 * @param {*} v - form.getFieldsValue()
 * @param {*} type - 错误类型 - 默认 格式-format 校验
 * @param {*} callback - 错误处理函数
 * @return {bool} 是否有该错误类型触发
 */
import { isEmpty } from 'lodash';
const checkingError = (e, v, type = 'format', callback) => {
  let has = false;
  const hasErr = (err = {}, values = {}) => {
    if (err instanceof Object) {
      Object.keys(err).some(item => {
        const temp = err[item];
        if (Array.isArray(temp)) {
          if (temp[0] instanceof Object) {
            temp.forEach((el, i) => {
              hasErr(el, values[item][i]);
            });
            return;
          } 
          temp.some(el => { 
            if (!el) return;
            has = type === 'format' ? !isEmpty(values[item]) : isEmpty(values[item]);
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

export default checkingError;