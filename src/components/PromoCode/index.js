import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Radio,
  Checkbox,
  DatePicker,
  message,
} from "antd";
import Button from "./../forms/Button";
import { firestore } from "./../../firebase/utils";
import firebase from "firebase";

const PromoCode = () => {
  const [codeType, setCodeType] = useState("");
  const [limitedDate, setLimitedDate] = useState(false);

  const handleSubmit = (values) => {
    const { limitedDateRange } = values;
    let allValues = values;

    if (limitedDateRange) {
      allValues = {
        ...values,
        "date-picker": values["date-picker"].format("YYYY-MM-DD"),
      };
    }
    console.log("Received values of form: ", allValues);

    try {
      firestore
        .collection("promotionCode")
        .doc()
        .set(allValues)
        .then(() => {
          message.success("Promotion code added");
        })
        .catch((err) => {
          message.error("Error adding. Please try again");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [form] = Form.useForm();

  const handleRadioGroup = (e) => {
    setCodeType(e.target.value);
  };

  const handleLimitedDateChange = (e) => {
    setLimitedDate(e.target.checked);
    return e.target.checked;
  };

  const configTime = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  return (
    <div>
      {" "}
      <Row gutter={[40, 0]}>
        <Col span={23}>
          <h2 style={{ textAlign: "center" }}>Promotion Code Generator</h2>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={18}>
          <Form {...layout} form={form} onFinish={handleSubmit}>
            <Form.Item
              name="codeName"
              label="Promotion Code Name"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input promotion code name",
                },
              ]}
            >
              <Input placeholder="Please enter the promotion code name" />
            </Form.Item>
            <Form.Item
              label="Promotion Code Description"
              name="codeDesc"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input promotion code description!",
                },
              ]}
            >
              <Input placeholder="Please enter the promotion code description" />
            </Form.Item>
            <Form.Item
              name="discountType"
              label="Discount Type"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please choose type of discount!",
                },
              ]}
            >
              <Radio.Group onChange={(e) => handleRadioGroup(e)}>
                <Radio value="percentage">Percentage Discount</Radio>
                <Radio value="fixedAmount">Fixed Amount Discount</Radio>
              </Radio.Group>
            </Form.Item>
            {codeType == "percentage" && (
              <Form.Item
                label="Percentage Discount"
                name="discountAmount"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input percentage discount!",
                  },
                ]}
              >
                <Input placeholder="Please enter the percentage discount" />
              </Form.Item>
            )}
            {codeType == "fixedAmount" && (
              <Form.Item
                label="Fixed Amount Discount"
                name="discountAmount"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input fixed amount discount!",
                  },
                ]}
              >
                <Input placeholder="Please enter the fixed amount discountz" />
              </Form.Item>
            )}
            <Form.Item
              wrapperCol={{ span: 12, offset: 8 }}
              name="limitedDateRange"
              getValueFromEvent={handleLimitedDateChange}
            >
              <Checkbox
                onChange={(e) => {
                  handleLimitedDateChange(e);
                }}
              >
                Limit the date range when customer can redeem this promotion
                code
              </Checkbox>
            </Form.Item>
            {limitedDate && (
              <Form.Item name="date-picker" label="DatePicker" {...configTime}>
                <DatePicker />
              </Form.Item>
            )}
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default PromoCode;
