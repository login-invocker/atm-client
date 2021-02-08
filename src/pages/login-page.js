
import React from "react";

import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from "react-router-dom";
import Notification from "../component/notification-component";
import  {login} from '../service/user-service'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

// const Demo = () => {
//   const onFinish = (values) => {
//     console.log('Success:', values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };
// }
const LoginPage = () => {
    let history = useHistory();
    const onFinish = async (values) => {
        const isLogin = await login(values)
        if(isLogin) {
             Notification({
                type: "success",
                message: "Đăng nhập thành công"
              })
           return  history.push("/home")

        }else{
            Notification({
                type: "error",
                message: "Tên tài khoản hoặc mật khẩu không chính xác!"
              })
        
        }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
      return (
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="User Email"
            name="email"
            rules={[
              {
                  type: 'email',
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    )
       

}

export default LoginPage