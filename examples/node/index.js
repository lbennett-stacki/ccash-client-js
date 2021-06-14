require('dotenv').config();
const { CCashClient } = require('ccash-client-js');

const user = 'blinkblinko';
const pass = 'TestPassword';
const adminPass = 'AdminPassword';

const client = new CCashClient();

async function createBalanceDelete() {
  try {
    const deletedUser = await client.deleteUser(user, pass);
  } catch {}

  const createdUser = await client.addUser(user, pass);

  console.log('User created', createdUser);

  const balance = await client.balance(user);

  console.log(`Balance: ${balance}`);

  const deletedUser = await client.deleteUser(user, pass);

  console.log('User deleted', deletedUser);
}

async function createSendFundsDelete() {
  const sender = 'sender';
  const initialBalance = 20;

  try {
    const deletedUser = await client.deleteUser(user, pass);
  } catch {}
  try {
    const deletedSender = await client.adminDeleteUser(sender, adminPass);
  } catch {}

  const createdUser = await client.addUser(user, pass);
  const createdSender = await client.adminAddUser(
    sender,
    adminPass,
    pass,
    initialBalance
  );

  console.log('Users created', createdUser, createdSender, '\n');

  let balance = await client.balance(user);
  let balanceSender = await client.balance(sender);

  console.log(`Receiver balance: ${balance}`);
  console.log(`Sender balance: ${balanceSender}\n`);

  let funds = await client.sendFunds(sender, pass, user, initialBalance / 2);

  console.log(`Sent funds: ${funds}\n`);

  balance = await client.balance(user);
  balanceSender = await client.balance(sender);

  console.log(`Receiver balance: ${balance}`);
  console.log(`Sender balance: ${balanceSender}\n`);

  const deletedUser = await client.deleteUser(user, pass);
  const deletedSender = await client.adminDeleteUser(sender, adminPass);

  console.log('Users deleted', deletedUser, deletedSender);
}

async function main() {
  console.log('Create, balance, delete.\n');

  await createBalanceDelete();

  console.log('\n\n');

  console.log('Create, send funds, delete.\n');

  await createSendFundsDelete();

  console.log('\n\n');
}

main();
