import {React, useEffect, useState} from "react";
import 'antd/dist/antd.css';
import Notification from "../component/notification-component";
import {  Table  } from 'antd';
import {Balance} from "../service/transaction-service"
const { Column, ColumnGroup } = Table;

const BalancePage = () => {

  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    const callApi = async () => {
      const dataRes = await Balance();
      if(dataRes){
        setTransactions(dataRes)
        Notification({
          type: "success",
          message: "Lấy dữ liệu thành công!"
        })
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
return (
  <Table dataSource={transactions}>
    <ColumnGroup title="Balance Inquiry">
      <Column title="Người chuyển" dataIndex="idUser" key="idUser" />
      <Column title="Người được chuyển" dataIndex="transfereeId" key="transfereeId" />
    </ColumnGroup>
    <Column title="createAt" dataIndex="createAt" key="createAt" />
    <Column title="Content" dataIndex="content" key="content" />
  </Table>)
}

export default BalancePage