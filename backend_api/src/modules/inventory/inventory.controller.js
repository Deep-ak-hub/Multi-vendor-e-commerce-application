class InventoryController {
  getInventory = (req, res, next) => {
    const data = [
      {
        id: 1,
        inventoryName: "inventoryName1",
        inventoryType: "inventoryType",
      },
    ];

    res.json({
      data: data,
      message: "inventory fetched successfully",
      status: "OK",
    });
  };
}

const inventoryController = new InventoryController();

module.exports = inventoryController;
