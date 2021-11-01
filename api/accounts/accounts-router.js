const router = require("express").Router();
const Account = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
} = require("./accounts-middleware");

//eslint-disable-next-line
router.get("/", (req, res, next) => {
  Account.getAll().then((resp) => {
    res.status(200).json(resp);
  });
});

//eslint-disable-next-line
router.get("/:id", checkAccountId, async (req, res, next) => {
  res.status(200).json(req.account);
});

//eslint-disable-next-line
router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      req.body.name = req.body.name.trim();
      const newAccount = await Account.create(req.body);
      res.status(201).json(newAccount);
    } catch (er) {
      next(er);
    }
  }
);

//eslint-disable-next-line
router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const changes = await Account.updateById(req.params.id, req.body);
      res.status(200).json(changes);
    } catch (er) {
      next(er);
    }
  }
);

//eslint-disable-next-line
router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json(err);
});

module.exports = router;
