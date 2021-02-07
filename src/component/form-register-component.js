import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {register} from '../service/user-service'
import { Form, Input, InputNumber, Button, Select } from 'antd';
import Notification from "./notification-component";
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
   
  }
  
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="84">+84</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);
const FormRegister = () => {
  const onFinish = async (user) => {
    
    const isRegister = await register(user)
    if(isRegister){
     return Notification({
       type: "success",
       message: "Đăng kí thành công"
     })
    }else{
      return Notification({
        type: "error",
        message: "Thử lại sau"
      })
    }
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
    <Form.Item
      name={['user', 'fullName']}
      label="Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
      rules={[
        {
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
        name={['user', 'phoneNumber']}
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

    <Form.Item
        label="Password"
        name={['user', 'password']}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  );
};
export default FormRegister