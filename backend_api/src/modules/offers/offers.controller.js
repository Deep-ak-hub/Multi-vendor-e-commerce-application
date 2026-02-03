class OffersController {
  getOffers = (req, res, next) => {
    const data = [
      {
        id: 1,
        offersName: "offersName1",
        offersType: "offersType",
      },
    ];

    res.json({
      data: data,
      message: "offers fetched successfully",
      status: "OK",
    });
  };
}

const offersController = new OffersController();

module.exports = offersController;
