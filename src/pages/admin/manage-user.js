import React, { useState, useEffect } from 'react';
import "./manage-user.css"
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';

import Notification from "../../component/notification-component";
import userSevice from "../../service/user-service"



const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ManagerUser = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    const callApi = async () => {
      const dataRes = await userSevice.listUser();
      let dataMap = []
      if(dataRes){
        for (let i = 0; i < dataRes.length; i++) {
            dataMap.push({
              key: i.toString(),
              email: dataRes[i]['email'],
              fullName: dataRes[i]['fullName'] || "Chưa cập nhập",
              password: dataRes[i]['password'],
              phoneNumber: dataRes[i]['phoneNumber'] || "Chưa cập nhập",
              pin: dataRes[i]['pin'] || "Chưa cập nhập",
              roles: dataRes[i]['roles'] || "Chưa cập nhập",
            });
          }
        console.log(dataMap)
        setData(dataMap)
        Notification({
          type: "success",
          message: "Lấy dữ liệu thành công!"
        })
        console.log(data)
      }
      else{
        Notification({
          type: "error",
          message: "Lấy dữ liệu thất bại!"
        })
      }
    }
    callApi()
  }, [])

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      email: '',
      fullName: '',
      password: '',
      phoneNumber: 0,
      pin: '',
      roles:'',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
        
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
      
      const dataRes = await userSevice.listUser();

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'phone number',
      dataIndex: 'phoneNumber',
      width: '10%',
      editable: true,
    },
    {
      title: 'full name',
      dataIndex: 'fullName',
      width: '15%',
      editable: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: '20%',
      editable: true,
    },
    {
        title: 'Pass User',
        dataIndex: 'password',
        width: '10%',
        editable: true,
      },
    {
        title: 'Pin User',
        dataIndex: 'pin',
        width: '10%',
        editable: true,
    },
    {
        title: 'roles User',
        dataIndex: 'roles',
        width: '15%',
        editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'pin' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default ManagerUser
