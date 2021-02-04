import _ from "lodash";
import {
    NETWORK_SPEEDS_TO_KEY,
    GWEI_UNIT,
    GAS_LIMIT_BUFFER
} from "./constants/network";
import { URLS } from "./constants/urls";
import api from "@/api";

/**
 * ethererm网络
 */
export const ETHEREUM_NETWORKS = {
    1: "MAINNET",
    3: "ROPSTEN"
};

/**
 * bsc网络
 */
export const BINANCE_NETWORKS = {
    56: "BSCMAINNET",
    97: "BSCTESTNET"
};

/**
 * moonbeam网络
 */
export const MOONBEAM_NETWORKS = {
    1287: "MOONBEAMTEST"
};

/**
 * 主网网络
 */
export const MAINNET_NETWORKS = {
    1: "MAINNET",
    56: "BSCMAINNET"
};

/**
 * 测试网网络
 */
export const TESTNET_NETWORKS = {
    3: "ROPSTEN",
    97: "BSCTESTNET"
    // 1287: "MOONBEAMTEST"
};

export const isEthereumNetwork = walletNetworkId => {
    return ETHEREUM_NETWORKS.hasOwnProperty(walletNetworkId);
};

export const isBinanceNetwork = walletNetworkId => {
    return BINANCE_NETWORKS.hasOwnProperty(walletNetworkId);
};

export const isMoonbeamNetwork = walletNetworkId => {
    return MOONBEAM_NETWORKS.hasOwnProperty(walletNetworkId);
};

export const isMainnetNetwork = walletNetworkId => {
    return MAINNET_NETWORKS.hasOwnProperty(walletNetworkId);
};

export const isTestnetNetwork = walletNetworkId => {
    return TESTNET_NETWORKS.hasOwnProperty(walletNetworkId);
};

/**
 * 获取所在网络其他网络id
 * @param walletNetworkId 网络Id
 */
export const getOtherNetworks = walletNetworkId => {
    let other = [];
    if (isMainnetNetwork(walletNetworkId)) {
        other = Object.keys(_.omit(MAINNET_NETWORKS, [walletNetworkId]));
    } else if (isTestnetNetwork(walletNetworkId)) {
        other = Object.keys(_.omit(TESTNET_NETWORKS, [walletNetworkId]));
    }
    return other;
};

export const SUPPORTED_NETWORKS = {
    ...ETHEREUM_NETWORKS,
    ...BINANCE_NETWORKS,
    ...MOONBEAM_NETWORKS
};

export const SUPPORTED_NETWORKS_MAP = _.invert(SUPPORTED_NETWORKS);

export const SUPPORTED_WALLETS_MAP = {
    METAMASK: "MetaMask",
    BINANCE_CHAIN: "BinanceChain",
    MOONBEAM: "Moonbeam",
    WALLET_CONNECT: "WalletConnect"
};

/**
 * PC端钱包安装地址
 */
export const WALLET_EXTENSIONS = {
    METAMASK:
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
    BINANCE:
        "https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp"
};

/**
 * 区块链浏览器地址
 */
export const BLOCKCHAIN_BROWSER = {
    1: "https://etherscan.io/tx/",
    3: "https://ropsten.etherscan.io/tx/",
    56: "https://bscscan.com/tx/",
    97: "https://testnet.bscscan.com/tx/",
    1287: "https://moonbeam-explorer.netlify.app/block/"
};

export const BLOCKCHAIN_BROWSER_API = {
    1: "https://api.etherscan.io/api",
    3: "https://api-ropsten.etherscan.io/api",
    56: "https://api.bscscan.com/api",
    97: "https://api-testnet.bscscan.com/api"
};

export const DEOSIT_PROOF_API = {
    1: process.env.DEOSIT_PROOF_MAINNET_API,
    3: process.env.DEOSIT_PROOF_TESTNET_API,
    56: process.env.DEOSIT_PROOF_MAINNET_API,
    97: process.env.DEOSIT_PROOF_TESTNET_API
};

/**
 * 链切换类型
 * network 钱包内切换网络
 * wallet 切换钱包
 */
export const CHAIN_CHANGE_TYPE = {
    NETWORK: "network",
    WALLET: "wallet"
};

/**
 * 默认gas 限制
 */
export const DEFAULT_GAS_LIMIT = {
    approve: 300000,
    staking: 300000,
    build: 500000,
    burn: 500000,
    unstake: 500000,
    claim: 140000,
    exchange: 22000,
    freeze: 250000,
    unfreeze: 250000
};

/**
 * 钱包信息更新状态
 */
export const WALLET_STATUS = {
    UNINIT: -1, //未初始化
    UPDATING: 0, //更新中
    FINISH: 1, //更新完成
    ERROR: 2 //更新失败
};

//infura project id
export const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

export const INFURA_JSON_RPC_URLS = {
    1: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
    3: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`
};

// export const BLOCKCHAIN = {
//     ETHEREUM: "ethereum",
//     BINANCE: "binance"
// };

export async function getEthereumNetwork() {
    const isMobile = $nuxt.$store.state?.isMobile;
    if (!window.ethereum && !isMobile) {
        window.open(WALLET_EXTENSIONS.METAMASK);
        return {};
    }
    let networkId = 1;
    try {
        if (window.ethereum?.chainId) {
            networkId = Number(window.ethereum?.chainId);
            return {
                name: SUPPORTED_NETWORKS[networkId],
                networkId: networkId
            };
        } else if (window.ethereum?.networkVersion) {
            networkId = Number(window.ethereum?.networkVersion);
            return {
                name: SUPPORTED_NETWORKS[networkId],
                networkId: networkId
            };
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getBinanceNetwork() {
    const isMobile = $nuxt.$store.state?.isMobile;
    if (!window.BinanceChain && !isMobile) {
        window.open(WALLET_EXTENSIONS.BINANCE);
        return {};
    }
    let networkId = 56;
    try {
        if (window.BinanceChain?.chainId) {
            networkId = Number(window.BinanceChain?.chainId);
            return {
                name: SUPPORTED_NETWORKS[networkId],
                networkId: networkId
            };
        }
    } catch (e) {
        console.log(e);
    }
}

export const getNetworkSpeeds = async walletNetworkId => {
    !walletNetworkId && (walletNetworkId = $nuxt.$store.state?.walletNetworkId);

    if (isEthereumNetwork(walletNetworkId)) {
        let result = await fetch(URLS.ETH_GAS_STATION, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        if (result?.status != 200) {
            result = await fetch(URLS.DEFI_PULSE_STATION, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            });
        }
        const networkInfo = await result.json();
        return {
            [NETWORK_SPEEDS_TO_KEY.SLOW]: {
                price: networkInfo.safeLow / 10,
                time: networkInfo.safeLowWait
            },
            [NETWORK_SPEEDS_TO_KEY.MEDIUM]: {
                price: networkInfo.average / 10,
                time: networkInfo.avgWait
            },
            [NETWORK_SPEEDS_TO_KEY.FAST]: {
                price: networkInfo.fast / 10,
                time: networkInfo.fastWait
            }
        };
    } else if (isBinanceNetwork(walletNetworkId)) {
        let currentGasPrice = 0;
        const res = await api.getBSCGasPrice();
        if (res?.result) {
            currentGasPrice = unFormatGasPrice(res.result);
        }
        return {
            [NETWORK_SPEEDS_TO_KEY.SLOW]: {
                price: currentGasPrice * 0.75,
                time: 1
            },
            [NETWORK_SPEEDS_TO_KEY.MEDIUM]: {
                price: currentGasPrice,
                time: 0.5
            },
            [NETWORK_SPEEDS_TO_KEY.FAST]: {
                price: currentGasPrice * 1.25,
                time: 0.2
            }
        };
    }else if (isMoonbeamNetwork(walletNetworkId)) {
        let currentGasPrice = 1;
        return {
            [NETWORK_SPEEDS_TO_KEY.SLOW]: {
                price: currentGasPrice * 0.75,
                time: 1
            },
            [NETWORK_SPEEDS_TO_KEY.MEDIUM]: {
                price: currentGasPrice,
                time: 0.5
            },
            [NETWORK_SPEEDS_TO_KEY.FAST]: {
                price: currentGasPrice * 1.25,
                time: 0.2
            }
        };
    }
};

export const formatGasPrice = gasPrice => gasPrice * GWEI_UNIT;

export const unFormatGasPrice = gasPrice => gasPrice / GWEI_UNIT;

export function onMetamaskAccountChange(cb) {
    if (!window.ethereum) return;
    const listener = _.throttle(cb, 2000);
    window.ethereum.on("accountsChanged", listener);
}

export function onMetamaskChainChange(cb) {
    if (!window.ethereum) return;
    const listener = _.throttle(cb, 2000);
    window.ethereum.on("chainChanged", listener);
}

export function onBinanceAccountChange(cb) {
    if (!window.BinanceChain) return;
    const listener = _.throttle(cb, 2000);
    window.BinanceChain.on("accountsChanged", listener);
}

export function onBinanceChainChange(cb) {
    if (!window.BinanceChain) return;
    const listener = _.throttle(cb, 2000);
    window.BinanceChain.on("chainChanged", listener);
}

export const bufferGasLimit = gasLimit =>
    Math.round(Number(gasLimit) * (1 + GAS_LIMIT_BUFFER));
