require('dotenv').config();
const { CCashClient } = require('ccash-client-js');

const user = 'blinkblinko';
const password = 'TestPassword';
const adminPassword = 'AdminPassword';
const initialBalance = 20;

const client = new CCashClient();

async function pingHelp() {
  const ping = await client.ping();

  console.log(`Ping: ${ping}`);

  const help = await client.help();

  console.log(`Help: ${help}`);
}

async function contains() {
  await client.deleteUser(user, password);
  await client.addUser(user, password);

  const contains = await client.contains(user);

  console.log(`Contains: ${contains}`);

  await client.deleteUser(user, password);
}

async function verifyPasswords() {
  await client.deleteUser(user, password);
  await client.addUser(user, password);

  const verifyPassword = await client.verifyPassword(user, password);

  console.log(`User password verified: ${verifyPassword}`);

  const adminVerifyPassword = await client.adminVerifyPassword(adminPassword);

  console.log(`Admin password verified: ${adminVerifyPassword}`);

  await client.deleteUser(user, password);
}

async function changePassword() {
  const newPassword = 'newPassword';

  await client.deleteUser(user, password);
  await client.deleteUser(user, newPassword);
  await client.addUser(user, password);

  let verifyPassword = await client.verifyPassword(user, password);

  console.log(`User password verified: ${verifyPassword}`);

  await client.changePassword(user, password, newPassword);

  console.log(`Password changed`);

  const verifyOldPassword = await client.verifyPassword(user, password);
  verifyPassword = await client.verifyPassword(user, newPassword);

  console.log(`User old password verified: ${verifyOldPassword}`);
  console.log(`User new password verified: ${verifyPassword}`);

  await client.deleteUser(user, newPassword);
}

async function setGetBalance() {
  await client.deleteUser(user, password);
  await client.addUser(user, password);

  await client.setBalance(user, adminPassword, initialBalance);

  console.log('Balance set');

  const balance = await client.balance(user);

  console.log(`Balance: ${balance}`);

  await client.deleteUser(user, password);
}

async function sendFundsGetLog() {
  const sender = 'sender';

  await client.deleteUser(user, password);
  await client.adminDeleteUser(sender, adminPassword);
  await client.addUser(user, password);
  await client.adminAddUser(sender, adminPassword, password, initialBalance);

  const funds = await client.sendFunds(
    sender,
    password,
    user,
    initialBalance / 2
  );

  console.log(`Sent funds`);

  const log = await client.log(user, password);
  const logSender = await client.log(sender, password);

  console.log('Receiver log:', log);
  console.log('Sender log:', logSender);

  await client.deleteUser(user, password);
  await client.adminDeleteUser(sender, adminPassword);
}

async function createLogDelete() {
  await client.adminDeleteUser(sender, adminPassword);
  await client.adminAddUser(sender, adminPassword, password, initialBalance);

  let balance = await client.balance(user);
  let balanceSender = await client.balance(sender);

  console.log(`Receiver balance: ${balance}`);
  console.log(`Sender balance: ${balanceSender}`);

  const funds = await client.sendFunds(
    sender,
    password,
    user,
    initialBalance / 2
  );

  console.log(`Sent funds`);

  balance = await client.balance(user);
  balanceSender = await client.balance(sender);

  console.log(`Receiver balance: ${balance}`);
  console.log(`Sender balance: ${balanceSender}`);

  await client.deleteUser(user, password);
  await client.adminDeleteUser(sender, adminPassword);
}

async function main() {
  console.log('Ping, help\n');

  await pingHelp();

  console.log('\n');

  console.log('Contains\n');

  await contains();

  console.log('\n');

  console.log('Verify user password, verify admin password\n');

  await verifyPasswords();

  console.log('\n');

  console.log('Verify password, change password, verify password\n');

  await changePassword();

  console.log('\n');

  console.log('Set balance, get balance\n');

  await setGetBalance();

  console.log('\n');

  console.log('Send funds, get log\n');

  await sendFundsGetLog();

  console.log('\n');
}

main();
