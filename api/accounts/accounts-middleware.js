const Account = require("./accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    next({ status: 400, message: "name and budget are required" });
  } else if (typeof name !== "string") {
    next({ status: 400, message: "name of account must be a string" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number") {
    next({ status: 400, message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const accounts = await Account.getAll();
  const accountMatches = accounts.filter((account) => {
    return account.name === req.body.name.trim();
  });
  if (accountMatches.length >= 1) {
    next({ status: 400, message: "that name is taken" });
  }
  next();
};

exports.checkAccountId = async (req, res, next) => {
  Account.getById(req.params.id)
    .then((account) => {
      if (account) {
        req.account = account;
        next();
      } else {
        next({ status: 404, message: "account not found" });
      }
    })
    .catch(next);
};
