import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchAllProductsStart,
  deleteProductStart,
  updateProductStart,
} from "../../redux/Products/products.actions";
import Modal from "../../components/Modal/index";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import Button from "../../components/forms/Button";
import LoadMore from "../../components/LoadMore";
import CKEditor from "ckeditor4-react";
import "./styles.scss";
import InfiniteScroll from "react-infinite-scroller";
import {
  List,
  Avatar,
  Collapse,
  Input,
  Space,
  Upload,
  Modal as Modal1,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Panel } = Collapse;

const mapState = ({ productsData }) => ({
  allProducts: productsData.allProducts,
});

const ManageProduct = () => {
    const { allProducts } = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState("facemask");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productDesc, setProductDesc] = useState("");
    const [documentID, setDocumentID] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);
    const [previewTitle, setPreviewTitle] = useState(false);
    const [updateFileList, setUpdateFileList] = useState([]);
  
    useEffect(() => {
      dispatch(fetchAllProductsStart());
    }, []);
  
    useEffect(()=>{
        if(hideModal){
            setUpdateFileList([])
  
        }
    },[hideModal])
  
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
  
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
  
      console.log(updateFileList);
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    };
  
    const handleImageChangeAnt = ({ fileList }) =>
      setUpdateFileList(fileList.filter((file) => file.status !== "error"));
      console.log(updateFileList)
  
    const toggleModal = () => setHideModal(!hideModal);
  
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
  
    const productDescFormat = (productDesc1) => {
      return <span dangerouslySetInnerHTML={{ __html: productDesc1 }} />;
    };
  
    const handleUpdate = (item) => {
      setProductName(item.productName);
      setProductDesc(item.productDesc);
      setProductPrice(item.productPrice);
      setDocumentID(item.documentID);
      setProductCategory(item.productCategory);
      console.log(item);
  
        item.allImageURL.map((image) => {
          let i = 0;
          const status = "done";
          const upload = { status, url: image, name: "event" };
          updateFileList.push(upload);
          i++;
        });
   
      console.log(item.allImageURL);
      console.log(updateFileList);
      toggleModal();
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      dispatch(
        updateProductStart({
          documentID,
          productName,
         updateFileList,
          productDesc,
          productPrice,
          productCategory,
        })
      );
      resetForm();
    };
  
    return (
      <div className="admin">
        <Space className="searchContainer" direction="horizontal">
          <Search
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            enterButton
          />
        </Space>
        <div className="demo-infinite-container">
          <InfiniteScroll initialLoad={false} pageStart={0}>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={allProducts.filter((item) => {
                if (searchTerm == "") {
                  return item;
                } else if (
                  item.productName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
              })}
              renderItem={(item) => (
                <Collapse defaultActiveKey={["0"]}>
                  <Panel header={item.productName} key="1">
                    <List.Item
                      actions={[
                        <span onClick={() => handleUpdate(item)}>Update</span>,
                        <span
                          onClick={() =>
                            dispatch(deleteProductStart(item.documentID))
                          }
                        >
                          Delete
                        </span>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.allImageURL[0]} size={100} />}
                        description={productDescFormat(item.productDesc)}
                      />
                      <div style={{ textAlign: "center", marginLeft: 40 }}>
                        RM{item.productPrice}
                      </div>
                    </List.Item>
                  </Panel>
                </Collapse>
              )}
            />
          </InfiniteScroll>
          <Modal {...configModal}>
            <div className="addNewProductForm">
              <form onSubmit={handleSubmit}>
                <h2>Update new product</h2>
                <Upload
                  listType="picture-card"
                  fileList={updateFileList}
                  beforeUpload={beforeUpload}
                  onPreview={handlePreview}
                  onChange={handleImageChangeAnt}
                >
                  {updateFileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal1
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
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
                  defaultValue={productCategory}
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
                  data={productDesc}
                  onChange={(evt) => setProductDesc(evt.editor.getData())}
                />
  
                <Button type="submit">Update Product</Button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    );
}

export default ManageProduct;