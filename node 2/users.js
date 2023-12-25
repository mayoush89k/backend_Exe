const yargs = require("yargs");
const uniqid = require("uniqid");
const { default: axios } = require("axios");
const usersUrl = "https://657621200febac18d403b5d1.mockapi.io/user";

// add user
yargs.command({
  command: "add",
  describe: "Add a new user",
  builder: {
    id: {
      describe: "user id",
      demandOption: false,
      type: "number",
    },
    name: {
      describe: "user name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "user email",
      demandOption: true,
      type: "string",
    },
    password: {
      describe: "user password",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    const id = uniqid();
    user = {
      name: argv.name,
      email: argv.email,
      password: argv.password,
    };
    fetchCreateUser(user);
    console.log(
      `id: ${id} user ${user.name} has been created as email: ${user.email} and password: ${user.password}`
    );
  },
});

// delete user
yargs.command({
  command: "delete",
  describe: "Delete a user",
  builder: {
    id: {
      describe: "user id",
      demandOption: true,
      type: "string",
    },
  },
  handler: async function (argv) {
    await fetchDeleteUser(argv);
    console.log("Deleting user : ", user.name);
  },
});

// read user
yargs.command({
  command: "read",
  describe: "Read the user",
  builder: {
    id: {
      describe: "user id",
      demandOption: true,
      type: "string",
    },
  },
  handler: async function (argv) {
    await fetchGetUser(argv);
    console.log(`user is: ${user.name} with email: ${user.email}`);
  },
});

// update a user
yargs.command({
  command: "update",
  describe: "Update the user",
  builder: {
    id: {
      describe: "user id",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "user email",
      demandOption: false,
      type: "string",
    },
    password: {
      describe: "user password",
      demandOption: false,
      type: "string",
    },
  },
  handler: async function (argv) {
    await fetchUpdateUser(argv);
    console.log("changing user's email to: ", user.email);
  },
});

let user = {};
// const users = fetchData()

const fetchCreateUser = async (user) => {
  try {
    const response = await axios.post(usersUrl, user);
    user = response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchDeleteUser = async (argv) => {
  try {
    const response = await axios.delete(usersUrl + "/" + argv.id);
    console.log(response.data);
    user = response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchGetUser = async (argv) => {
  try {
    const response = await axios.get(usersUrl + "/" + argv.id);
    console.log(response.data);
    user = response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchUpdateUser = async (argv) => {
  let key = argv.password ? "password" : argv.email ? "email" : "";
  let value = argv.password ? argv.password : argv.email ? argv.email : "";

  if (key != "") {
    try {
      const response = await axios.put(usersUrl + "/" + argv.id, {
        [key]: value,
      });
      user = response.data;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
};

yargs.parse();
