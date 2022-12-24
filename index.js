const {
  addContact,
  removeContact,
  listContacts,
  getContactById,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "add":
      await addContact(name, email, phone);
      break;

    case "remove":
      await removeContact(id);
      break;

    case "list":
      console.table(await listContacts());
      break;

    case "get":
      console.log(await getContactById(id));

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
