import { useEffect, useState } from "react";

import { Button, Modal, Table } from "flowbite-react";
import axios from "axios";
import backendUrl from "../urlHelper/urlHelper";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";
import {
  calculateQuantitySold,
  calculateTotalProfit,
  calculateTotalSelling,
} from "../utils";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // setloading(true);

        const response = await axios.get(`${backendUrl}/all-product`);
        setproducts(response.data);
        // setloading(false);
      } catch (error) {
        // setloading(false);

        console.log(" Employee fetching Error:", error);
      }
    };

    fetchProducts();
  }, []);

  //Date Formating
  function formatDate(dateString) {
    const formattedDate = new Date(dateString).toLocaleDateString("en-IN");
    return formattedDate;
  }

  const quantitySold = calculateQuantitySold(products);
  const totalSelling = calculateTotalSelling(products);
  const totalProfit = calculateTotalProfit(products);

  return (
    <>
      <div className="mb-5 text-center font-bold ">
        <Table hoverable>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{"No of Product Sold(Quantity)"}</Table.Cell>
              <Table.Cell>{quantitySold}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Total Amount through Selling"}</Table.Cell>
              <Table.Cell>₹ {totalSelling}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Total Profit earned "}</Table.Cell>
              <Table.Cell>₹ {totalProfit}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Total Percentage Profit % "}</Table.Cell>
              <Table.Cell>
                {" "}
                {((totalProfit / totalSelling) * 100).toFixed(2)} %
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <div className="mt-2 ml-1 mb-5">
        <Button color="purple" onClick={() => setOpenModal(true)}>
          {" "}
          + Add Product
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Sr No.</Table.HeadCell>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>My Rate</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Customer Rate</Table.HeadCell>
            <Table.HeadCell>Total Amount</Table.HeadCell>
            <Table.HeadCell>Customer Name</Table.HeadCell>
            <Table.HeadCell>Date of Purchase</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products.map((product, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.product_name}
                </Table.Cell>
                <Table.Cell>₹ {product.my_rate}</Table.Cell>
                <Table.Cell>{product.quantity}</Table.Cell>
                <Table.Cell>₹ {product.price}</Table.Cell>
                <Table.Cell>₹ {product.quantity * product.price}</Table.Cell>
                <Table.Cell>{product.cust_name}</Table.Cell>
                <Table.Cell>{formatDate(product.dop)}</Table.Cell>
                <Table.Cell>
                  <Link to={`edit/${product._id}`}>
                    {" "}
                    <Button color="success">Edit</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Modal code start  */}
      <Modal
        dismissible
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          //   navigate("/");
        }}
      >
        <Modal.Header>Add a Product</Modal.Header>
        <Modal.Body>
          {/* Imported Form  */}

          <AddProduct />

          {/*Form end */}
        </Modal.Body>
      </Modal>
      {/* Modal code ends  */}
    </>
  );
}
