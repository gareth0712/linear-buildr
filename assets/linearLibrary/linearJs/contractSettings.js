import { getDefaultProvider } from "ethers";
import addresses from "./lib/addresses";

const SUPPORTED_NETWORKS = {
    1: "mainnet",
    3: "ropsten",
    56: "bscmainnet",
    97: "bsctestnet",
    1287: "moonbeamtest"
};

const API_KEY = {
    infura: process.env.INFURA_PROJECT_ID,
    etherscan: process.env.ETHERSCAN_KEY,
    alchemy: process.env.ALCHEMY_KEY
};

class ContractSettings {
    constructor(contractSettings) {
        contractSettings = contractSettings || {};
        const { provider, signer, networkId } = contractSettings;
        this.networkId = networkId || 1;
        this.network = SUPPORTED_NETWORKS[Number(this.networkId)];
        this.provider = provider || getDefaultProvider();
        if (!provider && networkId) {
            let tempNetwork = this.network;
            switch (this.networkId) {
                case 56: //BSC主网RPC
                    tempNetwork = "https://bsc-dataseed.binance.org/";
                    break;
                case 97: //BSC测试网RPC
                    tempNetwork =
                        "https://data-seed-prebsc-1-s1.binance.org:8545/";
                    break;
                case 1287: //moonbeam测试网RPC
                    tempNetwork = "https://rpc.testnet.moonbeam.network/";
                    break;
            }
            this.provider = getDefaultProvider(tempNetwork, API_KEY);
        }
        this.signer = signer;
        this.addressList = addresses[this.networkId];
    }
}

ContractSettings.SUPPORTED_NETWORKS = SUPPORTED_NETWORKS;

export default ContractSettings;
