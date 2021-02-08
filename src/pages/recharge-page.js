
import React from "react";
import { Form, Input, Button } from 'antd';
import { useHistory } from "react-router-dom";
import Notification from "../component/notification-component";
const transactionService = require('../service/transaction-service')

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
const RechargePage = () => {
    let history = useHistory();
    const onFinish = async (values) => {
        
        const isrecharge = await transactionService.recharge(values)
        if(isrecharge) {
             Notification({
                type: "success",
                message: "Nạp tiền thành công"
              })
           return  history.push("/home")

        }else{
            Notification({
                type: "error",
                message: "Thử lại sau!"
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
          <Form.Item
            label="amount"
            name="amount"
            rules={[
              {
                required: true,
                message: 'Please input amount for user!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    )
       

}

export default RechargePage