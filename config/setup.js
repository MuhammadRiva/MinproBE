const db = require("./db");

const createTable = `
    CREATE TABLE product(
        id INTEGER PRIMARY KEY,
        merchant_id INTEGER,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now','localtime')),
        created_by TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT (DATETIME('NOW','localtime')),
        updated_by TEXT NOT NULL,
        FOREIGN KEY (merchant_id) REFERENCES merchant(id)
    );
`;

const createMerchant = `
      CREATE TABLE merchant(
          id INTEGER PRIMARY KEY,
          name VARCHAR NOT NULL,
          password VARCHAR NOT NULL,
          address TEXT NOT NULL,
          join_date TEXT NOT NULL DEFAULT (DATETIME('NOW','localtime')),
          phone_number VARCHAR NOT NULL
      )
  `;

db.serialize(() => {
  db.run(createMerchant, (err) => {
    if (!err) {
      console.log("product table created");
    } else {
      console.log(err);
    }
  });
});

db.serialize(() => {
  db.run(createTable, (err) => {
    if (!err) {
      console.log("merchant table created");
    } else {
      console.log(err);
    }
  });
});
