module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
  	development: {
  		host: "127.0.0.1",
  		port: 8545,
  		network_id: "*"
  	},
  	live: {
  		host: process.env.ETHEREUM_HOST,
  		port: process.env.ETHEREUM_PORT,
  		network_id: process.env.CHAIN_ID
  	}
  }
};
