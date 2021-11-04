import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "./../components/Modal/index";
import FormInput from "./../components/forms/FormInput";
import FormSelect from "./../components/forms/FormSelect";
import Button from "./../components/forms/Button";
import { addProductStart } from "../redux/Products/products.actions";
import CKEditor from "ckeditor4-react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Upload, Modal as Modal1 } from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
  PercentageOutlined,
  PlusOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbName, setBreadCrumbName] = useState("Dashboard");

  const handleOnCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => handleOnCollapse(collapsed)}
      >
        <div className="logo2" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => setBreadCrumbName("Dashboard")}
          >
            <Link to="/admindashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<SettingOutlined />}
            onClick={() => setBreadCrumbName("Manage Product")}
          >
            <Link to="/manageproduct">Manage Product</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<PlusCircleOutlined />}
            onClick={() => setBreadCrumbName("Manage Product")}
          >
            <Link to="/addproduct">Add new product</Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<PercentageOutlined />}
            onClick={() => setBreadCrumbName("Promotion Code")}
          >
            <Link to="/promocode">Promotion code</Link>
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<FileDoneOutlined />}
            onClick={() => setBreadCrumbName("Reports")}
          >
            <Link to="/dashboardreport">Reports</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<CloseCircleOutlined />}>
            <Link to="/">Back to homepage</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin / {breadcrumbName}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>elonMask</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
