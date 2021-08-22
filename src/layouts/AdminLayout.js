import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import Modal from './../components/Modal/index';
import FormInput from './../components/forms/FormInput'
import FormSelect from './../components/forms/FormSelect'
import Button from './../components/forms/Button'
import { addProductStart } from '../redux/Products/products.actions';
import CKEditor from 'ckeditor4-react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined

} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;


const AdminLayout = props => {
  const dispatch = useDispatch();
  const [collapsed,setCollapsed]= useState(false)
  const [hideModal,setHideModal] = useState(true);
  const [productCategory,setProductCategory] = useState('facemask');
  const [productName,setProductName] = useState('');
  const [productThumbnail,setProductThumbnail] = useState('');
  const [productPrice,setProductPrice] = useState(0);
  const [productDesc,setProductDesc] = useState('');
  const [breadcrumbName,setBreadCrumbName] = useState('Dashboard');
  const toggleModal=() => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
   
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory('facemask');
    setProductName('');
    setProductThumbnail('');
    setProductPrice(0);
    setProductDesc('');
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
        addProductStart({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productDesc,
        })
    );
    resetForm();
    };

  const handleOnCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(!collapsed)
  }

  return (
    
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={() => handleOnCollapse(collapsed)}>
      <div className="logo2" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />} onClick={()=>setBreadCrumbName('Dashboard')}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<SettingOutlined />} onClick={()=>setBreadCrumbName('Manage Product')}>
          Manage Product
        </Menu.Item>
        <Menu.Item key="3" icon={<PlusCircleOutlined />} onClick={()=> toggleModal()}>
          Add new product
        </Menu.Item>
        <Menu.Item key="4" icon={<CloseCircleOutlined />}>
        <Link to="/">
          Back to homepage
          </Link>
        </Menu.Item>
        
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin / {breadcrumbName}</Breadcrumb.Item>
 
          </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>elonMask</Footer>
    </Layout>
    <Modal {...configModal}>
        <div className="addNewProductForm">
            <form onSubmit={handleSubmit}>
                <h2>Add new product</h2>
                <FormSelect
                label ="Category"
                options={[{
                    value:"facemask",
                    name:"Face Mask"
                }, {
                    value:"sanitizer",
                    name:"Sanitizer"
                }]}
                handleChange={e => setProductCategory(e.target.value)}
                />

                <FormInput
                label="Name"
                type="text"
                value={productName}
                handleChange={e => setProductName(e.target.value)}
                />

                <FormInput
                label="Main image URL"
                type="url"
                value={productThumbnail}
                handleChange={e=>setProductThumbnail(e.target.value)}
                />

                <FormInput
                label="Price"
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                value={productPrice}
                handleChange={e=> setProductPrice(e.target.value)}
                />

                <CKEditor
                 onChange={evt => setProductDesc(evt.editor.getData())}
                />

                <br/>

                <Button type="submit">
                    Add Product
                </Button>
            </form>
        </div>
    </Modal>
  
  </Layout>
  
  
  );
};

export default AdminLayout;