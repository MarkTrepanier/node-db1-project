const db = require("../../data/db-config.js");

const getAll = async () => {
  const result = await db("accounts");
  return result;
};

const getById = async (id) => {
  const result = await db("accounts").where("id", id).first();
  return result;
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  const saidAccount = await getById(id);
  return saidAccount;
};

const updateById = async (id, account) => {
  await db("accounts").update(account).where("id", id);
  return getById(id);
};

const deleteById = async (id) => {
  const result = getById(id);
  await db("accounts").del().where("id", id);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
