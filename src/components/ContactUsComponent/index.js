import React from 'react';
import {Row,Col} from 'antd';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './styles.scss';

const ContactUsComponent = () => {
    return (
        <div className="contactUsWrapper">
            <div className="contactUsPoster">
                <h1>Having trouble?</h1>
                <Row gutter={[150,48]}>
                    <Col span={12}>
                        <div className="sendEmailWrapper">
                            <div className="sendEmailWrapperTitle">
                                
                                <h2><MailOutlined style={{ fontSize: '200%'}} /><br/><br/>Send us email</h2>
                                <div className="sendEmailWrapperInput">
                                    <FormInput
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    style={{width:300,borderRadius:'30px'}}/>
                                    <FormInput
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    style={{width:300,borderRadius:'30px'}}/>
                                    <FormInput
                                    type="email"
                                    placeholder="Your Email"
                                    name="yourEmail"
                                    style={{width:300,borderRadius:'30px'}}/>
                                    <FormInput
                                    type="text"
                                    placeholder="Your Enquiries"
                                    name="enquiries"
                                    style={{width:300,height:100,borderRadius:'30px'}}/>

                                    <Button>Send Message</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={12} >
                        <div className="clickChatBotWrapper">
                            <div className="clickChatBotTitle">
                            <h2><PhoneOutlined style={{ fontSize: '200%'}} /><br/><br/>Talk to Sales</h2>
                            <div className="clickChatBotDesc">
                                <p>Interested in buying in bulk? Just pick up the phone to chat with a member of our sales team.</p>
                                <p><a href="tel:+60164229032" style={{textAlign:'center'}}>+6016 422 9023</a> Mr Teoh<br/><br/></p>
                                <p><a href="tel:+60164229033" style={{textAlign:'center'}}>+6016 422 9023</a> Ms Koay<br/><br/></p>
                                <p><a href="tel:+60164229034" style={{textAlign:'center'}}>+6016 422 9023</a> Ms Ng&nbsp;&nbsp;&nbsp;</p>


                            </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                </div>
            </div>
    
    );
};

export default ContactUsComponent;