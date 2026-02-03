class FrontController {
  getFrontHome = (req, res, next) => {
    const data = {
      slider: [
        {
          _id: 1,
          title: "banner info",
          image: "https://placeholder.co/1200*400",
          link: "https:hello.com",
        },

        {
          _id: 2,
          title: "banner info",
          image: "https://placeholder.co/1200*400",
          link: "https:hello.com",
        },
        {
          _id: 3,
          title: "banner info",
          image: "https://placeholder.co/1200*400",
          link: "https:hello.com",
        },
      ],
    };

    res.json({
      data: data,
      message: "sucessful",
      status: "OK",
    });
  };

  getFrontAboutUs = (req, res, next) => {
    res.json({
      data: "",
      message: "Success",
      status: "OK",
    });
  };
}

const frontController = new FrontController();

module.exports = frontController;
