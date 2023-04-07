const {
  models: { Order },
} = require("../db");

const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

exports.addNewOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
  } = req.body;

  // 1. check if required field is empty
  if (!shippingAddress) {
    const error = new Error("Shipping address for your order is required.");
    error.status = 400;
    throw error;
  }
  if (!paymentMethod) {
    const error = new Error("Payment Method for your order is required");
    error.status = 400;
    throw error;
  }
  if (!orderItems) {
    const error = new Error("Please add items to your cart");
    error.status = 400;
    throw error;
  }

  // 2. save order to database
  const createdOrder = await Order.create({
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
  });

  // 3. send created order back to client
  res.status(201).json({
    status: "Success your order was placed!",
    order: createdOrder,
  });
});
