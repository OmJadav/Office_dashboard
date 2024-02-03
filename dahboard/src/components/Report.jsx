import React, { useState, useRef } from "react";
import { DatePicker, Space } from "antd";
import axios from "axios";
import backendUrl from "../urlHelper/urlHelper";
import { useReactToPrint } from "react-to-print";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  calculateQuantitySold,
  calculateTotalProfit,
  calculateTotalSelling,
} from "../utils";
const { RangePicker } = DatePicker;
function Report() {
  const [products, setProducts] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const componentPDF = useRef();
  const fetchDataByDateRange = async (start, end) => {
    try {
      const response = await axios.get(`${backendUrl}/fetchby-date`, {
        params: {
          start,
          end,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    const [start, end] = dates;
    if (start && end) {
      fetchDataByDateRange(
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD")
      );
    }
  };

  function formatDate(dateString) {
    const formattedDate = new Date(dateString).toLocaleDateString("en-IN");
    return formattedDate;
  }

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Report",
  });
  const quantitySold = calculateQuantitySold(products);
  const totalSelling = calculateTotalSelling(products);
  const totalProfit = calculateTotalProfit(products);
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <h1>Select Date to PDF your statistics</h1>
          <RangePicker onChange={handleDateChange} />
        </div>
        <div ref={componentPDF}>
          <div className="mb-2 mt-5">
            <h1 className="text-center font-bold">
              {dateRange.length > 0 && (
                <>
                  {dateRange[0].format("DD-MM-YYYY")} to{" "}
                  {dateRange[1].format("DD-MM-YYYY")} : Statistics Report
                </>
              )}
            </h1>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Sr No.</Table.HeadCell>
              <Table.HeadCell>Customer Name</Table.HeadCell>
              <Table.HeadCell>Product name</Table.HeadCell>
              <Table.HeadCell>Date of Purchase</Table.HeadCell>
              <Table.HeadCell>My Rate</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Customer Rate</Table.HeadCell>
              <Table.HeadCell>Total Amount</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {products.map((product, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.cust_name}
                  </Table.Cell>
                  <Table.Cell>{product.product_name}</Table.Cell>
                  <Table.Cell>{formatDate(product.dop)}</Table.Cell>
                  <Table.Cell>₹ {product.my_rate}</Table.Cell>
                  <Table.Cell>{product.quantity}</Table.Cell>
                  <Table.Cell>₹ {product.price}</Table.Cell>
                  <Table.Cell>₹ {product.quantity * product.price}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className="mt-5 text-center font-bold ">
            {/* <Table hoverable>
              <Table.Head>
                <Table.HeadCell>
                  {"No of Product Sold(Quantity)"}
                </Table.HeadCell>
                <Table.HeadCell>{quantitySold}</Table.HeadCell>
              </Table.Head>
              <Table.Head>
                <Table.HeadCell>
                  {"Total Amount through Selling"}
                </Table.HeadCell>
                <Table.HeadCell>₹ {totalSelling}</Table.HeadCell>
              </Table.Head>
              <Table.Head>
                <Table.HeadCell>{"Total Profit earned "}</Table.HeadCell>
                <Table.HeadCell>₹ {totalProfit}</Table.HeadCell>
              </Table.Head>
              <Table.Head>
                <Table.HeadCell>{"Total Percentage Profit % "}</Table.HeadCell>
                <Table.HeadCell>
                  {" "}
                  {((totalProfit / totalSelling) * 100).toFixed(2)} %
                </Table.HeadCell>
              </Table.Head>
            </Table> */}
            <Table hoverable className="w-full">
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell className="w-1/3">
                    {"No of Product Sold(Quantity)"}
                  </Table.HeadCell>
                  <Table.HeadCell className="w-2/3">
                    {quantitySold}
                  </Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell className="w-1/3">
                    {"Total Amount through Selling"}
                  </Table.HeadCell>
                  <Table.HeadCell className="w-2/3">
                    ₹ {totalSelling}
                  </Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell className="w-1/3">
                    {"Total Profit earned "}
                  </Table.HeadCell>
                  <Table.HeadCell className="w-2/3">
                    ₹ {totalProfit}
                  </Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell className="w-1/3">
                    {"Total Percentage Profit % "}
                  </Table.HeadCell>
                  <Table.HeadCell className="w-2/3">
                    {((totalProfit / totalSelling) * 100).toFixed(2)} %
                  </Table.HeadCell>
                </Table.Row>
              </Table.Head>
            </Table>
          </div>
        </div>
      </Space>

      <Link>
        <Button className="mt-5" color="failure" onClick={generatePDF}>
          Report
        </Button>
      </Link>
    </>
  );
}

export default Report;
