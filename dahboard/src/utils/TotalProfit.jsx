const calculateTotalProfit = (products) => {
  let totalProfit = 0;
  for (const product of products) {
    const profit = (product.price - product.my_rate) * product.quantity;
    totalProfit += profit;
  }
  return totalProfit;
};

export default calculateTotalProfit;

// let totalProfit = 0;

// for (const product of products) {
//   const profit = (product.price - product.my_rate) * product.quantity;
//   totalProfit += profit;
// }
