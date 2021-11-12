import React, { useState, useEffect } from "react";
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
  Table,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import Button from "./../forms/Button";
import { firestore } from "./../../firebase/utils";
import { fetchAllPromotionCodeStart } from "../../redux/Products/products.actions";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

const mapState = ({ productsData }) => ({
  promotionCode: productsData.promotionCode,
});

const PromoCode = () => {
  const [codeType, setCodeType] = useState("");
  const [limitedDate, setLimitedDate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPromoCode, setEditingPromoCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { promotionCode } = useSelector(mapState);
  const timestamp = new Date();
  const status = "active";
  const now = moment();

  useEffect(() => {
    dispatch(fetchAllPromotionCodeStart());
  }, []);

  useEffect(() => {
    updateForm.setFieldsValue({
      codeName: editingPromoCode?.codeName,
      codeDesc: editingPromoCode?.codeDesc,
      discountType: editingPromoCode?.discountType,
      discountAmount: editingPromoCode?.discountAmount,
      limitedDateRange: editingPromoCode?.limitedDateRange,
      limitedDate: editingPromoCode?.limitedDate
        ? moment(editingPromoCode?.limitedDate, dateFormat)
        : undefined,
    });
    console.log(editingPromoCode?.documentID);
  }, [editingPromoCode]);

  const handleSubmit = (values) => {
    const { limitedDateRange } = values;
    let allValues = {
      ...values,
      createdDate: timestamp,
      status,
      limitedDate: null,
    };

    if (limitedDateRange) {
      if (limitedDate != null && now.isAfter(values["date-picker"])) {
        message.error("Date chosen is invalid");
        return;
      }

      allValues = {
        ...values,
        limitedDate: values["date-picker"].format("YYYY-MM-DD"),
        timestamp,
        status,
        createdDate: timestamp,
      };
    }

    delete allValues["date-picker"];
    console.log("Received values of form: ", allValues);

    try {
      firestore
        .collection("promotionCode")
        .doc()
        .set(allValues)
        .then(() => {
          message.success("Promotion code added");
          dispatch(fetchAllPromotionCodeStart());
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
  const [updateForm] = Form.useForm();

  const handleRadioGroup = (e) => {
    setCodeType(e.target.value);
  };

  const handleUpdateRadioGroup = (e) => {
    setEditingPromoCode((pre) => {
      return { ...pre, discountType: e.target.value };
    });
  };

  const handleLimitedDateChange = (e) => {
    setLimitedDate(e.target.checked);
    return e.target.checked;
  };

  const handleUpdateLimitedDateChange = (e) => {
    setEditingPromoCode((pre) => {
      return { ...pre, limitedDateRange: e.target.checked };
    });
    return e.target.checked;
  };

  const handleUpdate = (values) => {
    const { limitedDate } = values;
    setLoading(true);
    const formattedDate = moment(limitedDate).format(dateFormat);

    let allValues = {
      ...values,
      limitedDate: formattedDate,
    };
    firestore
      .collection("promotionCode")
      .doc(editingPromoCode?.documentID)
      .update(allValues)
      .then(() => {
        setLoading(false);
        setIsEditing(false);
        message.success("Promotion code updated successfully!");
        dispatch(fetchAllPromotionCodeStart());
      })
      .catch((err) => {
        setLoading(false);
        message.error("Error Occured");
        console.log(err);
      });
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

  const onDeleteAction = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this promotion code?",
      onOk: () => {
        firestore
          .collection("promotionCode")
          .doc(record.documentID)
          .delete()
          .then(() => {
            dispatch(fetchAllPromotionCodeStart());
          });
      },
    });
  };

  const onEditAction = (record) => {
    setEditingPromoCode({ ...record });
    setIsEditing(true);
    console.log(editingPromoCode);
  };

  const columns = [
    {
      title: "Code Name",
      dataIndex: "codeName",
      key: "1",
    },
    {
      title: "Code Description",
      dataIndex: "codeDesc",
      key: "2",
    },
    {
      title: "Discount type",
      dataIndex: "discountType",
      key: "3",
    },
    {
      title: "Discount amount",
      dataIndex: "discountAmount",
      key: "4",
    },
    {
      title: "Limited Date Range",
      key: "5",
      render: (record) => {
        if (record.limitedDateRange) {
          return record.limitedDate;
        } else {
          return "no limit";
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "6 ",
    },
    {
      title: "Actions",
      key: "8",
      render: (record) => {
        return (
          <>
            {record.status == "active" && (
              <EditOutlined
                onClick={() => {
                  console.log("record", record);
                  onEditAction(record);
                }}
              />
            )}

            <DeleteOutlined
              onClick={() => {
                onDeleteAction(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const dateFormat = "YYYY-MM-DD";

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
              tooltip={{
                title: "Tooltip with customize icon",
                icon: <InfoCircleOutlined />,
              }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input promotion code name",
                },
              ]}
            >
              <Input placeholder="Please enter the promotion code name (e.g. TRT10)" />
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
                label="Percentage Discount (%)"
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
                label="Fixed Amount Discount (RM)"
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
              initialValue={false}
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
              <Form.Item
                name="date-picker"
                label="Promotion Code Expired After"
                {...configTime}
              >
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
      <Table dataSource={promotionCode} columns={columns} />
      <Modal
        width={900}
        title="Edit Promotion Code"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
        }}
        footer={[
          <Button form="updateFormSubmit" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <h2 style={{ textAlign: "center" }}>
              Update Promotion Code : {editingPromoCode?.codeName}
            </h2>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
          <Col span={18}>
            <Form
              {...layout}
              form={updateForm}
              id="updateFormSubmit"
              onFinish={handleUpdate}
              initialValues={editingPromoCode?.documentID}
            >
              <Form.Item
                name="codeName"
                label="Promotion Code Name"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input promotion code name",
                  },
                ]}
              >
                <Input placeholder="Please enter the promotion code name (e.g. TRT10)" />
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
                <Radio.Group onChange={(e) => handleUpdateRadioGroup(e)}>
                  <Radio value="percentage">Percentage Discount</Radio>
                  <Radio value="fixedAmount">Fixed Amount Discount</Radio>
                </Radio.Group>
              </Form.Item>
              {editingPromoCode?.discountType == "percentage" && (
                <Form.Item
                  label="Percentage Discount (%)"
                  name="discountAmount"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input percentage discount!",
                    },
                  ]}
                >
                  <Input
                    defaultValue={editingPromoCode?.discountAmount}
                    placeholder="Please enter the percentage discount"
                  />
                </Form.Item>
              )}
              {editingPromoCode?.discountType == "fixedAmount" && (
                <Form.Item
                  label="Fixed Amount Discount (RM)"
                  name="discountAmount"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input fixed amount discount!",
                    },
                  ]}
                >
                  <Input placeholder="Please enter the fixed amount discount" />
                </Form.Item>
              )}
              <Form.Item
                wrapperCol={{ span: 12, offset: 8 }}
                name="limitedDateRange"
                getValueFromEvent={handleUpdateLimitedDateChange}
                initialValue={editingPromoCode?.limitedDateRange}
              >
                <Checkbox
                  checked={editingPromoCode?.limitedDateRange}
                  onChange={(e) => {
                    handleUpdateLimitedDateChange(e);
                  }}
                >
                  Limit the date range when customer can redeem this promotion
                  code
                </Checkbox>
              </Form.Item>
              {editingPromoCode?.limitedDateRange && (
                <Form.Item
                  name="limitedDate"
                  label="Promotion Code Expired After"
                  {...configTime}
                >
                  <DatePicker />
                </Form.Item>
              )}
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default PromoCode;
