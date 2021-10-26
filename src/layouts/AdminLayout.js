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
  PlusOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = (props) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("facemask");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [breadcrumbName, setBreadCrumbName] = useState("Dashboard");
  const toggleModal = () => setHideModal(!hideModal);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewTitle, setPreviewTitle] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (hideModal) {
      setFileList([]);
      resetForm();
    }
  }, [hideModal]);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const beforeUpload = (file) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      console.log(`${file.name} is not a valid image type`, 2);
      return null;
    }
    return false;
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    console.log(fileList);
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleImageChangeAnt = ({ fileList }) =>
    setFileList(fileList.filter((file) => file.status !== "error"));

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("facemask");
    setProductName("");
    setProductPrice(0);
    setProductDesc("");
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productPrice,
        productDesc,
        fileList,
      })
    );
    resetForm();
  };

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
            icon={<FileDoneOutlined />}
            onClick={() => setBreadCrumbName("Reports")}
          >
            <Link to="/dashboardreport">Reports</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<CloseCircleOutlined />}>
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
      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>
            <h3>Product Thumbnail</h3>
            <Upload
              name="ProductThumbnail"
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onPreview={handlePreview}
              onChange={handleImageChangeAnt}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal1
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal1>

            <FormSelect
              label="Category"
              options={[
                {
                  value: "facemask",
                  name: "Face Mask",
                },
                {
                  value: "sanitizer",
                  name: "Sanitizer",
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />
            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={(e) => setProductPrice(e.target.value)}
            />
            <CKEditor
              onChange={(evt) => setProductDesc(evt.editor.getData())}
            />
            <br />
            <Button type="submit">Add Product</Button>
          </form>
        </div>
      </Modal>
    </Layout>
  );
};

export default AdminLayout;
