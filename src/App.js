import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Layout, Menu, Tooltip, Button  } from 'antd';
import RouteConfigExample from './config/router'
import { UploadOutlined, UserOutlined, VideoCameraOutlined, ExportOutlined, UserSwitchOutlined, InboxOutlined } from '@ant-design/icons';
import './App.css'
const { Header, Content, Footer, Sider } = Layout;

const App = () =>{
  return <>
  <Layout>
  <Router>
  <Sider
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={broken => {
      console.log(broken);
    }}
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}
  >
    <div className="logo" >
    <p >ATM</p>
    </div>
    
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
      <Menu.Item key="1" icon={<UserOutlined />}>
      <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<VideoCameraOutlined />}>
      <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UploadOutlined />}>
      <Link to="/recharge">Recharge</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<ExportOutlined />}>
      <Link to="/withdrawal">Withdrawal</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<UserSwitchOutlined />}>
      <Link to="/transfers">transfers</Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<InboxOutlined />}>
      <Link to="/balance-inquiry">Balance Inquiry</Link>
      </Menu.Item>
      <Menu.Item key="7" icon={<InboxOutlined />}>
      <Link to="/manage-user">Manage User</Link>
      </Menu.Item>
    </Menu>
    
  </Sider>
  <Layout>
    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
    <Content style={{ margin: '24px 16px 0' }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      
      <RouteConfigExample />

      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  </Router>
</Layout>
</>
}
export default App;
