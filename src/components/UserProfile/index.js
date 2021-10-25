import './styles.scss';
import { useSelector } from 'react-redux'
import userIMG from './../../assets/user.png';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio } from 'antd';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const UserProfile = () => {
  const { currentUser } = useSelector(mapState);
  const { displayName } = currentUser;
  const [currentDisplayName,setCurrentDisplayName]  = useState(displayName)

  useEffect(()=> {
    setCurrentDisplayName(displayName)
  },[currentUser])

  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            
            <img src={userIMG}/>
          </div>
        </li>
        <li>
          <span className="displayName">
            {currentDisplayName && currentDisplayName}
          </span>
        </li>
      </ul>
    </div>
  );
}


// const FormLayoutDemo = () => {
//   const [form] = Form.useForm();
//   const [formLayout, setFormLayout] = useState('horizontal');

//   const onFormLayoutChange = ({ layout }) => {
//     setFormLayout(layout);
//   };

//   const formItemLayout =
//     formLayout === 'horizontal'
//       ? {
//           labelCol: {
//             span: 4,
//           },
//           wrapperCol: {
//             span: 14,
//           },
//         }
//       : null;
//   const buttonItemLayout =
//     formLayout === 'horizontal'
//       ? {
//           wrapperCol: {
//             span: 14,
//             offset: 4,
//           },
//         }
//       : null;
//   return (
//     <>
//       <Form
//         {...formItemLayout}
//         layout={formLayout}
//         form={form}
//         initialValues={{
//           layout: formLayout,
//         }}
//         onValuesChange={onFormLayoutChange}
//       >
//         <Form.Item label="Form Layout" name="layout">
//           <Radio.Group value={formLayout}>
//             <Radio.Button value="horizontal">Horizontal</Radio.Button>
//             <Radio.Button value="vertical">Vertical</Radio.Button>
//             <Radio.Button value="inline">Inline</Radio.Button>
//           </Radio.Group>
//         </Form.Item>
//         <Form.Item label="Field A">
//           <Input placeholder="input placeholder" />
//         </Form.Item>
//         <Form.Item label="Field B">
//           <Input placeholder="input placeholder" />
//         </Form.Item>
//         <Form.Item {...buttonItemLayout}>
//           <Button type="primary">Submit</Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
//    };




export default UserProfile;