var Migrations = artifacts.require("./Migrations.sol");
var NitrousCrowdSale = artifacts.require("./NitrousCrowdSale.sol");

module.exports = function(deployer, network, accounts) {
  const BigNumber = web3.BigNumber;

  const rate = new BigNumber(1000);
  const startTime = latestTime() + duration.minutes(10);
  const endTime = startTime + duration.weeks(20);

  deployer.deploy(Migrations);

  logDeploymentInformation(startTime, endTime, rate, accounts[0]);

  deployer.deploy(NitrousCrowdSale, startTime, endTime, rate, accounts[0])
  .then( async () => {
    const instance = await NitrousCrowdSale.deployed();
    const token = await instance.token.call();
    console.log('Token Address', token);
  });
};

function logDeploymentInformation(startTime, endTime, rate, address){
  console.log("");
  console.log("   Start Time:", startTime);
  console.log("   End Time:", endTime);
  console.log("   Rate:", rate.toNumber());
  console.log("   Wallet Address:", accounts[0]);
  console.log("");
}

function latestTime () {
  return web3.eth.getBlock('latest').timestamp;
}

const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};