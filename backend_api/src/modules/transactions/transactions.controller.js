class TransactionController {
  getTransactions = (req, res, next) => {
    const data = [
      {
        id: 1,
        transactionName: "transactionName1",
        transactionType: "transactionType",
        transactionAmount: 1000,
      },
    ];

    res.json({
      data: data,
      message: "transaction fetched successfully",
      status: "OK",
    });
  };
}

const transactionController = new TransactionController();

module.exports = transactionController;
