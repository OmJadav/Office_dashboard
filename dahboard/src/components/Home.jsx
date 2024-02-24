import { useEffect, useState } from "react";

import { Button, Modal, Table } from "flowbite-react";
import axios from "axios";
import backendUrl from "../urlHelper/urlHelper";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Loader from "./Loader";
import {
  calculateQuantitySold,
  calculateTotalProfit,
  calculateTotalSelling,
} from "../utils";

export default function Home() {
  const [loading, setloading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [products, setproducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalItems = products.length;
  console.log(totalItems);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const npage = Math.ceil(totalItems / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // const totalPages = Math.ceil(products.length / recordsPerPage);
  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setloading(true);

        const response = await axios.get(`${backendUrl}/all-product`);
        setproducts(response.data);
        setloading(false);
      } catch (error) {
        setloading(false);

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
      {loading && <Loader />}
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
            {records.map((product, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="wrap-text font-medium text-gray-900 dark:text-white">
                  {product.product_name}
                </Table.Cell>
                <Table.Cell>₹ {product.my_rate}</Table.Cell>
                <Table.Cell>{product.quantity}</Table.Cell>
                <Table.Cell>₹ {product.price}</Table.Cell>
                <Table.Cell>₹ {product.quantity * product.price}</Table.Cell>
                <Table.Cell>{product.cust_name}</Table.Cell>
                <Table.Cell>{formatDate(product.dop)}</Table.Cell>
                <Table.Cell>
                  <Link to={`/edit/${product._id}`}>
                    {" "}
                    <Button color="success">Edit</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* pagination starts */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={prePage}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {numbers.map((n, i) => (
                <div
                  key={n}
                  aria-current="page"
                  className={`${
                    currentPage === n
                      ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  }`}
                  onClick={() => changeCurrentPage(n)}
                >
                  {n}
                </div>
              ))}

              <div
                onClick={nextPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* pagination ends */}

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
