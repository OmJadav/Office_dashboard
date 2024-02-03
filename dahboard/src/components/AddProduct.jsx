import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";
import backendUrl from "../urlHelper/urlHelper";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registered = async (data) => {
    try {
      const response = await axios.post(`${backendUrl}/add-product`, data);

      Swal.fire("Success", response.data.message, "success").then(() =>
        window.location.reload()
      );
      console.log(response.data.message);
      console.log(data);
    } catch (error) {
      console.log("Purchase Details Adding...error...", error);
      Swal.fire("Something Went Wrong", error.response.data.error, "error");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/* employee adding form  */}
        <form
          className="flex  flex-col gap-4 "
          noValidate
          onSubmit={handleSubmit(registered)}
        >
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

          <Button type="submit">Add</Button>
        </form>
      </div>
    </>
  );
}
