class ProductsController {
  getProducts = (req, res, next) => {
    const data = [
      {
        id: 1,
        productsName: "productsName1",
        productsType: "productsType",
      },
    ];

    res.json({
      data: data,
      message: "products fetched successfully",
      status: "OK",
    });
  };
}

const productsController = new ProductsController();

module.exports = productsController;
