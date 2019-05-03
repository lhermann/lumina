var ImmortalDB;
if (process.browser) {
  const db = require("immortal-db");
  ImmortalDB = db.ImmortalDB;
}

export default ({ store }, inject) => {
  if (process.browser) {
    inject("persist", ImmortalDB);
    store.dispatch("initImmortalDB");
  }
};
