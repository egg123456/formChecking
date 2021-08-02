/*
 * @Author: wb-yangergang
 * @Date: 2021-08-02 11:52:15
 * @LastEditors: wb-yangergang
 * @LastEditTime: 2021-08-02 15:06:51
 * @Description: file content
 */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';
import formChecking from './components';

const FormItem = Form.Item;

const itemList = [
  { label: '姓名', field: 'name' },
  { label: '年龄', field: 'age' },
  { label: '性别', field: 'sex' },
];

const Demo = (props) => {
  const { 
    form: { 
      getFieldDecorator,
      getFieldsError,
      getFieldsValue,
    } = {},
  } = props;

  const save = () => {
    formChecking(getFieldsError(), getFieldsValue()) ? message.info('有问题，不可以保存') :
      message.info('没问题，可以保存');
  };
  
  return (
    <Form>
        {itemList.map(item => {
          const { label, field } = item;
          return (
            <FormItem label={label}>
              {getFieldDecorator(field, {
                rules: [
                  { required: true, message: '请输入' },
                  { max: 20, message: '20字符以内' }
                ]
              })(
                <Input />
              )}
            </FormItem>
          )
        })}
        <Button onClick={() => save()}>提交</Button>
    </Form>
  );
};

export default Form.create({})(Demo);