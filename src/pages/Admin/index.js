import React, {  useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addProductStart, fetchAllProductsStart,deleteProductStart, updateProductStart } from '../../redux/Products/products.actions';
import Modal from './../../components/Modal/index';
import FormInput from './../../components/forms/FormInput'
import FormSelect from './../../components/forms/FormSelect'
import Button from './../../components/forms/Button'
import LoadMore from './../../components/LoadMore';
import CKEditor from 'ckeditor4-react';
import './styles.scss';
import InfiniteScroll from 'react-infinite-scroller';
import { List,Avatar,Collapse,Input,Space} from 'antd';

const { Search } = Input;
const { Panel } = Collapse;

const mapState = ({ productsData}) => ({
    allProducts: productsData.allProducts
})

const Admin = props => {
    const {allProducts} = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideModal,setHideModal] = useState(true);
    const [productCategory,setProductCategory] = useState('facemask');
    const [productName,setProductName] = useState('');
    const [productThumbnail,setProductThumbnail] = useState('');
    const [productPrice,setProductPrice] = useState(0);
    const [productDesc,setProductDesc] = useState('');
    const [documentID,setDocumentID] = useState('');
    const [searchTerm,setSearchTerm] = useState('')



    useEffect(() => {
        dispatch(
            fetchAllProductsStart()
        );

    },[]);
   
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
    
 
    const productDescFormat = productDesc1 =>{
        return <span dangerouslySetInnerHTML={{__html:productDesc1}}/>
    }

    const handleUpdate = item => {
        setProductName(item.productName)
        setProductThumbnail(item.productThumbnail)
        setProductDesc(item.productDesc)
        setProductPrice(item.productPrice)
        setDocumentID(item.documentID)
        setProductCategory(item.productCategory)
        toggleModal()

        
    }

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(
            updateProductStart({
                documentID,
                productName,
                productThumbnail,
                productDesc,
                productPrice,
                productCategory
            })
        );
        resetForm();
    }

 


    return(
        <div className="admin">
            <Space className="searchContainer" direction="horizontal">
                <Search placeholder="Search" onChange={(e) => setSearchTerm(e.target.value) } enterButton />
            </Space>
            <div className="demo-infinite-container">
                    <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    
                    >
                    <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={allProducts.filter((item ) =>{
                        if (searchTerm == ""){
                            return item
                        }   else if (item.productName.toLowerCase().includes(searchTerm.toLowerCase())){
                            return item
                        }
                    })}
                    renderItem={item => (
                        <Collapse defaultActiveKey={['0']}>
                        <Panel header={item.productName} key="1">
                        <List.Item
                        actions={[<span onClick={()=> handleUpdate(item)} >Update</span>,<span onClick={() => dispatch(deleteProductStart(item.documentID))}>Delete</span>]}
                        >
                            
                            <List.Item.Meta
                            avatar= {<Avatar src={item.productThumbnail} size={100}/>}
                            description= {productDescFormat(item.productDesc)}
                            />
                            <div style={{textAlign:'center',marginLeft:40}}>RM{item.productPrice}</div>
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
                <FormSelect
                label ="Category"
                options={[{
                    value:"facemask",
                    name:"Face Mask"
                }, {
                    value:"sanitizer",
                    name:"Sanitizer"
                }]}
                defaultValue={productCategory}
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
                 data={productDesc}
                 onChange={evt => setProductDesc(evt.editor.getData())}
                />

                <Button type="submit">
                    Update Product
                </Button>
            </form>
        </div>
    </Modal>
               
                </div>

          </div>
     
        
    );
};

export default Admin;