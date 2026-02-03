class FeedbackController {
  getFeedback = (req, res, next) => {
    const data = [
      {
        id: 1,
        feedbackName: "feebackName1",
        feedbackType: "feedbackType",
      },
    ];

    res.json({
      data: data,
      message: "feedback fetched successfully",
      status: "OK",
    });
  };
}

const feedbackController = new FeedbackController();

module.exports = feedbackController;
