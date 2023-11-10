import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import axios from "axios";
import { WorkType } from "@/config/interface";
import { useProducts } from "../config/hooks/fetchWorkSpaces";

import WorkForm from "../components/workForm";
export default function Home() {
  const [selectedId, setSelectedId] = useState(undefined);
  const [initialValues, setInitialValues] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  // const [works, setWorks] = useState([]);
  const [file, setFile] = useState("");

  const { works, isLoading, fetchWorks } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsOpen(false);
    setSelectedId(undefined);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedId(undefined);
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  // async function checkInStock() {
  //   // get item detail
  //   const { data } = await axios.get(`/api/work`);
  //   console.log(data?.data);
  //   if (data) setWorks(data?.data);
  // }

  const onFinish = async (values :any) => {
    try {
      if (selectedId) {
        await axios.put(`/api/work?id=${initialValues?._id }`, values);
        message.success("WorkSpace Updated successfully");
        // checkInStock();
        fetchWorks();
        setIsModalOpen(false);
      } else {
        await axios.post(`/api/work`, values);
        message.success("WorkSpace Added successfully");
        //  checkInStock();
        fetchWorks();
        setIsModalOpen(false);
      }

      
    } catch (error) {
      message.error('something went wrong');
    } finally {
    }
  };

  const onUpdateHandler = async (data :any) => {
    setSelectedId(data._id);
    setInitialValues(data);
    console.log("datra--->", data);
    setIsModalOpen(true);
    //setIsOpen(true);
  };

  return (
    <div className=" bg-green-800 mt-24 mb-24  w-[80%] md:w-1/2 mx-auto ">
      <div className="mb-6">
        <button
       
          className="    bg-white left-12 py-4 font-semibold text-xl rounded-xl px-6 mb-4  flex items-center text-center  block w-[300px]  text-black"
          // type="primary"
          onClick={showModal}
        >
          <p>Create a new workSpace</p>
        </button>

        <div>
          <div className="">
            <img
              className="  mb-12 w-28 h-28 rounded-full"
              src="https://assets.hongkiat.com/uploads/psd-text-svg/logo-example.jpg"
              alt=""
            />

            <h1 className=" text-white text-4xl font-bold mb-2">Welcome Back!</h1>

            <p className=" text-semibold text-white  text-xl ">Choose your workspace to reach out of the box</p>
          </div>
        </div>
      </div>

      <WorkForm
        {...{
          onFinish,
          file,
          setFile,
          isModalOpen,
          handleOk,
          handleCancel,
          selectedId,
          initialValues,
          setInitialValues,
        }}
      />

      {/* -----show workspaces---- */}
      <div>
        {/* w-[80%] md:w-1/2  */}
        <div className=" border-2  bg-white rounded-md text-black mx-auto min-h-[300px] mt-4">
          {/* header */}
          <h1 className=" bg-gray-200 text-gray-600 font-semibold pl-12 text-xl py-4">WorkSpaces List</h1>

          {/* ---workspaces list---- */}
          <div className="mt-2">
            {works?.length > 0 &&
              works?.map((work : any) => {
                return (
                  <div className="my-2">
                    <div
                      onClick={() => onUpdateHandler(work)}
                      className=" mx-auto h-[130px] cursor-pointer w-[90%] border-b-2 items-center border-b-slate-200 flex my-4 px-12  justify-between"
                    >
                      <div className=" flex gap-5 items-center justify-between">
                        <img
                          className=" rounded-lg !w-[100px] h-[100px] object-cover"
                          src={work?.image}
                          alt=""
                        />
                        <h1 className=" text-3xl font-bold">{work?.title}</h1>
                      </div>

                      <div className="">
                        <h2 className=" px-4  bg-green-700 text-white rounded-md py-2">
                          {work?.users?.length} user
                        </h2>
                      </div>
                    </div>

                    {/* <hr /> */}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
