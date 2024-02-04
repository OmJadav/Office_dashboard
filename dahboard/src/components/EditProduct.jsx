import React, { Fragment, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loader from "./Loader";
import Swal from "sweetalert2";
import backendUrl from "../urlHelper/urlHelper";

export default function Edit() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  let [loading, setLoading] = useState(true);
  let [productName, setProductName] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    const fetchEmpById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/view/${productId}`);
        setProductName(response.data.product_name);
        setValue("product_name", response.data.product_name);
        setValue("my_rate", response.data.my_rate);
        setValue("quantity", response.data.quantity);
        setValue("price", response.data.price);
        setValue("cust_name", response.data.cust_name);
        setValue("dop", response.data.dop);
        setValue("remarks", response.data.remarks);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error edit by id axios:", error);
      }
    };
    fetchEmpById();
  }, [productId, setValue]);

  const updateDetails = async (data) => {
    try {
      const response = await axios.post(
        `${backendUrl}/edit/${productId}`,
        data
      );
      Swal.fire("Success", response.data.message, "success").then(() => {
        navigate("/");
      });
      console.log(response.data.message);
    } catch (error) {
      console.log("Error Updating user axios:", error);
      Swal.fire("Something Went Wrong", error.response.data.error, "error");
    }
  };

  const deleteEntry = async () => {
    setOpen(false);
    try {
      const response = await axios
        .get(`${backendUrl}/delete/${productId}`)
        .then(() => {
          window.location.href = "/";
        });
      console.log(response.message);
    } catch (error) {
      console.log("Employee deleting Error :", error.response.data.error);
    }
  };

  return (
    <>
      {/* empform edit starts here / */}
      <form
        className="flex  flex-col gap-4 mr-1 ml-1 "
        noValidate
        onSubmit={handleSubmit(updateDetails)}
      >
        {loading && <Loader />}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="product_name" value="Product Name" />
          </div>
          <TextInput
            id="product_name"
            type="text"
            {...register("product_name", {
              required: "Product name is Required",
            })}
          />
          {errors.product_name && (
            <p className="text-red-500">{errors.product_name.message}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="my_rate" value="My Rate" />
            </div>
            <TextInput
              id="my_rate"
              type="number"
              {...register("my_rate", {
                required: "Rate is Required",
              })}
            />
            {errors.my_rate && (
              <p className="text-red-500">{errors.my_rate.message}</p>
            )}
          </div>
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="quantity" value="Quantity" />
            </div>
            <TextInput
              id="quantity"
              type="number"
              {...register("quantity", {
                required: "Quantity is Required",
              })}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="price" value="Customer Price" />
            </div>
            <TextInput
              id="price"
              type="number"
              {...register("price", {
                required: "Price is Required",
              })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="cust_name" value="Customer name" />
          </div>
          <TextInput
            id="cust_name"
            type="text"
            {...register("cust_name", {
              required: "Customer name is Required",
            })}
          />
          {errors.cust_name && (
            <p className="text-red-500">{errors.cust_name.message}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dop" value="Date of Purchasing" />
          </div>
          {/* <Datepicker
              id="dop"
              {...register("dop", { valueAsDate: true })}
              dateFormat="yyyy-MM-dd"
            /> */}
          <TextInput type="date" id="dop" {...register("dop")} />

          {errors.dop && <p className="text-red-500">{errors.dop.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="remarks" value="Remarks" />
          </div>
          <Textarea id="remarks" type="text" {...register("remarks")} />
        </div>

        <div className="flex flex-row gap-4">
          <Button
            className="w-1/2"
            color="failure"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
          <Button className="w-1/2" type="submit">
            Update
          </Button>
        </div>
        {/* <Button type="submit">Update</Button> */}
        {/* <Button color="failure">Delete</Button> */}
      </form>
      {/* empform edit ends here / */}

      {/* delete modal  */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Deactivate account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete{" "}
                            <span className="text-red-600">{productName}</span>?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={deleteEntry}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
