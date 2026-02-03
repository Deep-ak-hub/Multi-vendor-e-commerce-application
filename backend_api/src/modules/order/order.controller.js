class OrderController {
  getOrder = (req, res, next) => {
    const data = [
      {
        id: 1,
        orderName: "orderName1",
        orderType: "orderType",
      },
    ];

    res.json({
      data: data,
      message: "order fetched successfully",
      status: "OK",
    });
  };
}

const orderController = new OrderController();

module.exports = orderController;
