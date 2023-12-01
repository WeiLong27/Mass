const hre = require("hardhat");
const path = require("path");

async function main() {

  const massToken = await hre.ethers.deployContract("MassToken", [100000000]);
  await massToken.waitForDeployment();

  console.log("Mass Token deployed: ", massToken.target);

  saveFrontendFiles(massToken);

}

function saveFrontendFiles(massToken) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ MassToken: massToken.target }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("MassToken");

  fs.writeFileSync(
    path.join(contractsDir, "MassToken.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
