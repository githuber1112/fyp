//import React from 'react';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/forms/FormInput";
import Button from "../../components/forms/Button";
import { Divider, Row, Col } from "antd";
import { CountryDropdown } from "react-country-region-selector";
import {
  onChangePasswordStart,
  updateUserProfile,
} from "../../redux/User/user.sagas";
import { Space, Card, message } from "antd";
import "./styles.scss";
import {
  updateUserInfoStart,
  resetPasswordStart,
  resetStatus,
} from "../../redux/User/user.actions";
//import validator from "validator";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  loading: user.loading,
  status: user.status,
});

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const [userAddress, setUserAddress] = useState({ ...initialAddressState });
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { currentUser, loading, status } = useSelector(mapState);
  //const { userEmail } = useSelector(mapState);
  const {
    displayName: currentDisplayName,
    userAddress: currentAddress,
    email,
    id,
  } = currentUser;
  //const { displayEmail } = userEmail;

  useEffect(() => {
    if (status == "complete") {
      message.success("Update successfully");
    }
    if (status == "changePass"){
      message.success("Reset Password email has been sent. Please check your email!");
    }

    dispatch(resetStatus())

  }, [status]);

  useEffect(() => {
    setDisplayName(currentDisplayName);
    
    setPhoneNumber(currentUser.phoneNumber);
    if (currentAddress != null) {
      setUserAddress(currentAddress);
    }
  }, []);

  const handleAddress = (evt) => {
    const { name, value } = evt.target;
    setUserAddress({
      ...userAddress,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserInfoStart({ id, userAddress, displayName, phoneNumber })
    );
  };

  
  // const handleFormSubmit = async evt => {
  //     const { name, value } = evt.target;
  //     setUserDisplayName({
  //         ...userDisplayName,
  //         [name]: value
  //     });

  //     const updateDetails = {
  //         orderTotal: total,
  //         orderItems: cartItems.map(item => {
  //           const { displayName, email, phoneNumber, address } = item;

  //           return {
  //             displayName,
  //             email,
  //             phoneNumber,
  //             address
  //           };
  //         })
  //       }

  //       dispatch(
  //         updateUserProfile(updateDetails)
  //       );
  // }

  return (
    <div className="profileWrapper">
      <div>
      <h1>
           My Profile
        </h1>
        <h4>Account</h4>
        <h5>Update and Edit the information you share with the community</h5>
        <br />
        <h4>Login Email</h4>
        <h5 name="email">{email}</h5>
        <br />
      </div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className="profileDetails">
            <br />
            <Row gutter={[48, 48]}>
              <Col span={12}>
                <h4>Display Name</h4>
                <div className="inputWidth">
                  <FormInput
                    required
                    placeholder="Display Name"
                    name="userDisplayName"
                    handleChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    type="text"
                  />
                </div>
              </Col>
              <Col span={12}>
                <h4>Phone Number</h4>
                <div className="inputWidth">
                  <FormInput
                    required
                    placeholder="Phone Number (eg: 0123456789)"
                    name="phoneNumber"
                    handleChange={(evt) => setPhoneNumber(evt.target.value)}
                    value={phoneNumber}
                    type="text"
                    pattern= "^[0-9]*$"
                    maxLength={11}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <h4>Address</h4>
            <FormInput
              required
              placeholder="Line 1"
              name="line1"
              handleChange={(evt) => handleAddress(evt)}
              value={userAddress.line1}
              type="text"
            />

            <FormInput
              placeholder="Line 2"
              name="line2"
              handleChange={(evt) => handleAddress(evt)}
              value={userAddress.line2}
              type="text"
            />

            <FormInput
              required
              placeholder="City"
              name="city"
              handleChange={(evt) => handleAddress(evt)}
              value={userAddress.city}
              type="text"
              pattern= "^[a-zA-Z ]*$"
            />

            <FormInput
              required
              placeholder="State"
              name="state"
              handleChange={(evt) => handleAddress(evt)}
              value={userAddress.state}
              type="text"
              pattern= "^[a-zA-Z ]*$"
            />

            <FormInput
              required
              placeholder="Postal Code"
              name="postal_code"
              handleChange={(evt) => handleAddress(evt)}
              value={userAddress.postal_code}
              type="text"
              pattern= "^[0-9]*$"
              maxLength={5}
            />

<div className="formRow countryDropdown">
            <CountryDropdown
              required
              onChange={(val) =>
                handleAddress({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={userAddress.country}
              valueType="long"
            />
          </div>

            
              <table border="0" cellPadding="20" cellSpacing="0" >
                <tbody>
                  <tr>
                    <td width="400px"></td>
                    <td>
                      <div className="btnUpdate">
                      <Button htmlType="submit" loading={loading} >
                        Update Info
                      </Button>
                      </div>
                    </td>
                    
                    <td>
                      <div className="btnChangePassword">
                      <Button onClick={() => dispatch(resetPasswordStart({ email }))}>
                        Change Password
                      </Button>
                      </div>
                    </td>
                    
                  </tr>
                  </tbody>
              </table>
      
        
        </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;
