class BannerController {
  getBanner = (req, res, next) => {
    const data = [
      { id: 1, title: "Summer Sale", image: "https://placeholder.co/1200x400" },
      {
        id: 2,
        title: "Winter Deals",
        image: "https://placeholder.co/1200x400",
      },
    ];

    res.json({
      data: data,
      message: "banner fetched successfully",
      status: "OK",
    });
  };
}

const bannerController = new BannerController();


module.exports = bannerController;
