class OrderDetailsController {
  getOrderDetails = (req, res, next) => {
    const data = [
      {
        id: 1,
        orderDetailsName: "orderDetailsName1",
        orderDetailsType: "orderDetailsType",
      },
    ];

    res.json({
      data: data,
      message: "orderDetails fetched successfully",
      status: "OK",
    });
  };
}

const orderDetailsController = new OrderDetailsController();

module.exports = orderDetailsController;
