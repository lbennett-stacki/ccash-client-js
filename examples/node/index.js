require('dotenv').config();
const { CCashClient } = require('ccash-client-js');

const user = 'blinkblinko';
const pass = 'TestPassword';

const client = new CCashClient();

async function main() {
  const createdUser = await client.addUser(user, pass);
  console.log('User created', createdUser);

  const balance = await client.balance(user);
  console.log(`Balance: ${balance}`);

  const deletedUser = await client.deleteUser(user, pass);
  console.log('User deleated', deletedUser);
}

main();
