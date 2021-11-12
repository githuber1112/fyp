import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./../../components/Modal/index";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Button from "./../../components/forms/Button";
import { useHistory } from "react-router-dom";

import {
  addProductStart,
  resetLoading,
} from "./../../redux/Products/products.actions";
import CKEditor from "ckeditor4-react";
import {
  Row,
  Col,
  Form,
  Modal as Modal1,
  Upload,
  Select,
  Input,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const mapState = ({ productsData }) => ({
  loading: productsData.loading,
  status: productsData.status,
});

const AddProduct = () => {
  const { loading, status } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [productCategory, setProductCategory] = useState("facemask");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewTitle, setPreviewTitle] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { Option } = Select;
  const [form] = Form.useForm();

  useEffect(() => {
    if (status == "complete") {
      message.success("Product Added Successfully!");
      dispatch(resetLoading());
      form.resetFields();
    }
  }, [status]);

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

  const resetForm = () => {
    setProductCategory("facemask");
    setProductName("");
    setProductPrice(0);
    setProductDesc("");
    setFileList([]);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSubmit = (values) => {
    console.log(values);
    const {
      productCategory,
      productName,
      productPrice,
      productDesc,
      fileList,
    } = values;

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productPrice,
        productDesc,
        fileList,
      })
    );
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const getDesc = (e) => {
    console.log(e.editor.getData());

    setProductDesc(e);

    return productDesc;
  };

  return (
    <div>
      <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <h2 style={{ textAlign: "center" }}>Add Product</h2>
          </Col>
        </Row>

        <Row gutter={[40, 0]}>
          <Col span={18}>
            <Form {...layout} form={form} onFinish={handleSubmit}>
              <Form.Item label="Product Image">
                <Form.Item
                  name="fileList"
                  getValueFromEvent={getFile}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please insert at least one image!",
                    },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    onPreview={handlePreview}
                    onChange={handleImageChangeAnt}
                  >
                    {fileList.length >= 5 ? null : uploadButton}
                  </Upload>
                </Form.Item>
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
              </Form.Item>
              <Form.Item
                name="productCategory"
                label="Product Category"
                hasFeedback
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select placeholder="Please select a category">
                  <Option value="facemask">Face Mask</Option>
                  <Option value="sanitizer">Sanitizer</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="productName"
                label="Product Name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input product name",
                  },
                ]}
              >
                <Input placeholder="Please enter the product name" />
              </Form.Item>
              <Form.Item
                label="Product Price(RM)"
                name="productPrice"
                hasFeedback
                rules={[
                  { required: true, message: "Please input product price!" },
                ]}
              >
                <InputNumber min={1} max={10000} />
              </Form.Item>
              <Form.Item
                label="Product Description"
                name="productDesc"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input produce description!",
                  },
                ]}
                getValueFromEvent={getDesc}
              >
                <CKEditor
                  onChange={(evt) => setProductDesc(evt.editor.getData())}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddProduct;
