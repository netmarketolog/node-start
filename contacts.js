/*
 * Раскомментируй и запиши значение

 * const contactsPath = ;
 */
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументировать каждую функцию
async function readDb() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function writeDb(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 4));
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = {
    id,
    name,
    email,
    phone,
  };

  const db = await readDb();
  db.push(contact);
  await writeDb(db);
}

async function removeContact(id) {
  const db = await readDb();
  const updateDb = db.filter((contact) => contact.id !== String(id));
  await writeDb(updateDb);
}
async function listContacts() {
  const db = await readDb();
  return db;
}

async function getContactById(id) {
  const db = await readDb();
  const updateDb = db.filter((contact) => contact.id === String(id));
  return updateDb;
}

module.exports = {
  addContact,
  removeContact,
  listContacts,
  getContactById,
};
