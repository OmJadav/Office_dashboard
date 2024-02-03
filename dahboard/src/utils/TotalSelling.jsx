const calculateTotalSelling = (products) => {
  return products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
};

export default calculateTotalSelling;

// let totalSelling = 0;
// for (const product of products) {
//   const selling = product.price * product.quantity;
//   totalSelling += selling;
// }
