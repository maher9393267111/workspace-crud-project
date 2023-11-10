import React, { useState, useEffect } from "react";
import { antdFieldValidation } from "../config/uploadImage";
import {
  Button,
  Form,
  Upload,
  message,
  Input,
  Select,
  InputNumber,
  Switch,
  Modal,
} from "antd";

const { TextArea } = Input;
import { uploadImage, DEFAULT_FORM_VALUES } from "../config/uploadImage";

import Image from "next/image";
import axios from "axios";

const ProductForm = ({
  onFinish,
  initialValues,
  setInitialValues,
  file,
  setFile,
  isModalOpen,
  handleOk,
  handleCancel,
  isupdate = false,
  selectedId,
}) => {
  const [image, setImage] = useState(initialValues?.image || "");
  const [users, setUsers] = useState(initialValues?.users || []);
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");

  const [form] = Form.useForm();

  async function uploadImages(ev) {
    const files = ev.target?.files[0];
    console.log(files);
    if (!files?.length) {
      const res = await uploadImage(files);
      console.log(" Upload images", res);

      setImage(res);
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
      form.setFieldsValue(DEFAULT_FORM_VALUES);

      if (initialValues && selectedId) {
        form.setFieldsValue(initialValues);

        setImage(initialValues?.image);
        setUsers(initialValues?.users);
      }
    } else {
      setUsers([]);
      setImage("");
    }
  }, [initialValues, form, isModalOpen]);

  const onkeyDownhandler = (event) => {
    if (event.key === "Enter" && event.keyCode === 13) {
      event.preventDefault();
      if (useremail !== "" && username !== "" ) {
if( users?.length <= 3 ) {

        setUsers((prev) => [...prev, { name: username, email: useremail }]);


        setUseremail("");
        setUsername("");
        message.success(" submitted");

}

else {
  message.error('only 4 users are allowed')
}

      } else {
        message.error("username and email are required");
      }

      console.log("hello");
    }
  };

  const handleRemoveUser = (userName) => {
    console.log(userName);
    const newArr = [...users];
    newArr.filter((user) => user.name !== userName);
    console.log("array" + newArr);
    setUsers(users.filter((user) => user.name !== userName));
  };

  return (
    <Modal
      onOk={form.submit}
      open={isModalOpen}
      // onOk={handleOk}

      onCancel={handleCancel}
      title={isupdate ? "Update WorkSpace" : "Add New WorkSpace"}
    >
      <div className="  ml-2  p-6 !w-[99%] md:w-full">
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) =>
            onFinish({
              ...values,
              image,
              users,
            })
          }
          initialValues={{}}
        >
          <div className=" ">
            <Form.Item label="title" name="title" rules={antdFieldValidation}>
              <Input className="w-full" type="text" name="title" />
            </Form.Item>
          </div>

          <Form.Item name="description" label="Desc">
            <TextArea rows={4} />
          </Form.Item>

          {/* users----- */}

          <div className="">
            <div>
              <h1 className=" font-semibold flex justify-between">

<p>Users</p>
<p>{users?.length}/4</p>

              </h1>

              <div className="mb-4 ">
                {users.length > 0 ? (
                  <div>
                    {users?.map((user, index) => {
                      return (
                        <div className="border-2 bg-slate-100 mt-2 rounded-md  items-center flex justify-between gap-2 text-gray-600 p-4 ">
                          <div>
                            <p className=" font-bold text-xl">{user?.name}</p>
                            <p>{user?.email}</p>
                          </div>

                          <div>
                            <p
                              onClick={() => handleRemoveUser(user.name)}
                              className=" underline font-bold cursor-pointer"
                            >
                              Remove
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>No Users Selected Yet</div>
                )}
              </div>
            </div>

            {/* <Form.Item label="UserName" name="username" rules={antdFieldValidation}> */}

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="enter username"
              type="text"
              name="username"
            />
            {/* <Input /> */}
            {/* </Form.Item> */}

            {/* <Form.Item label="userEmail" name="useremail" rules={antdFieldValidation}> */}
            <input
              className=" mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={useremail}
              onKeyDown={onkeyDownhandler}
              onChange={(e) => setUseremail(e.target.value)}
              type="text"
              name="useremail"
              placeholder="enter useremail"
            />

            <p className=" text-red-500 font-semibold text-sm my-2">
              Press Enter To Add New User
            </p>
            {/* <Input /> */}
            {/* </Form.Item> */}

            {/* <input onKeyDown={onkeyDownhandler} placeholder="........."/> */}
          </div>

          <div className=" ">
            <h1 className="mb-2">Logo</h1>
            <label className="  h-28 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <div>Add image</div>
              <input type="file" onChange={uploadImages} className="!hidden" />
            </label>

            <div>
              {image && (
                <div>
                  {" "}
                  <img
                    className=" block mx-auto  text-center mt-2 rounded-full w-28 h-28 object-cover object-center"
                    src={image}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>

          <div className="  my-5 gap-5">
      
          </div>

          <div className="  flex justify-center">
         
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ProductForm;
