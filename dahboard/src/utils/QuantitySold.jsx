const calculateQuantitySold = (products) => {
  return products.reduce((acc, product) => acc + product.quantity, 0);
};

export default calculateQuantitySold;

// const quantitySold = products.reduce(
//   (acc, product) => acc + product.quantity,
//   0
// );
