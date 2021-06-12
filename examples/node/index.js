const { CCashClient } = require('ccash-client-js');

const client = new CCashClient()

async function main() {
  const balance = await client.balance('twix');
  console.log(`Balance: ${balance}`)
}

main()
