import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "./../components/Modal/index";
import FormInput from "./../components/forms/FormInput";
import FormSelect from "./../components/forms/FormSelect";
import Button from "./../components/forms/Button";
import { addProductStart } from "../redux/Products/products.actions";
import CKEditor from "ckeditor4-react";

const AddProduct = () => {

    const dispatch = useDispatch();
    const [productCategory, setProductCategory] = useState("facemask");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productDesc, setProductDesc] = useState("");
    const toggleModal = () => setHideModal(!hideModal);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);
    const [previewTitle, setPreviewTitle] = useState(false);
    const [fileList, setFileList] = useState([]);
  
    
    useEffect(()=>{
      if(hideModal){
          setFileList([])
          resetForm()
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



    return (
<div></div>
        )
}

export default AddProduct