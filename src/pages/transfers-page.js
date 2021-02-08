
import React from "react";
import transactionService from '../service/transaction-service'
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from "react-router-dom";
import Notification from "../component/notification-component";

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

const TransfersPage = () => {
    let history = useHistory();
    const onFinish = async (values) => {

      const isTransferee = await transactionService.transferee(values)
        if(isTransferee) {
             Notification({
                type: "success",
                message: "Chuyển tiền thành công thành công"
              })
           return  history.push("/balance-inquiry")

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
            label="transferee Email"
            name="emailTransferee"
            rules={[
              {
                  type: 'email',
                required: true,
                message: 'Please input transferee email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
            <br/>
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
            label="pin number"
            name="pin"
            rules={[
              {
                required: true,
                message: 'Please input your pin!',
              },
            ]}
          >
            <Input />
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
        <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                message: 'content!',
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

export default TransfersPage