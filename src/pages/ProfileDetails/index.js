//import React from 'react';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/forms/FormInput";
import Button from "../../components/forms/Button";
import { Divider, Row, Col } from "antd";
import { updateUserProfile } from "../../redux/User/user.sagas";
import { Space, Card } from "antd";
import "./styles.scss";
import { updateUserInfoStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
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
  const { currentUser } = useSelector(mapState);
  //const { userEmail } = useSelector(mapState);
  const {
    displayName: currentDisplayName,
    userAddress: currentAddress,
    email,
    id,
  } = currentUser;
  //const { displayEmail } = userEmail;

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
        <h1>My Account</h1>
        <h5>View and edit your personal info below.</h5>
        <Divider />
      </div>
      <div>
        <h3>Display Info</h3>
        <h5>Your profile card is visible to all members of this site</h5>
        <br />
        <h4>Display Name *</h4>
        <h5 name="displayName">{displayName}</h5>
        <Divider />
      </div>
      <div>
        <div>
          <h3>Account</h3>
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
                      placeholder="Phone Number"
                      name="phoneNumber"
                      handleChange={(evt) => setPhoneNumber(evt.target.value)}
                      value={phoneNumber}
                      type="text"
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
              />

              <FormInput
                required
                placeholder="State"
                name="state"
                handleChange={(evt) => handleAddress(evt)}
                value={userAddress.state}
                type="text"
              />

              <FormInput
                required
                placeholder="Postal Code"
                name="postal_code"
                handleChange={(evt) => handleAddress(evt)}
                value={userAddress.postal_code}
                type="text"
              />

              <div className="btnContainer">
                <Button type="submit" className="btnUpdate">
                  Update Info
                </Button>

                <Button type="cancel" className="btnChangePassword">
                  Change Password
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
