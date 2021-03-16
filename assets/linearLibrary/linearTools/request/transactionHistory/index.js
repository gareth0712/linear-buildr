import linearData from "../linearData/transactionData";
import flatten from "lodash/flatten";
import _ from "lodash";
import { isBinanceNetwork, isEthereumNetwork } from "../../network";

export const PAGINATION_INDEX = 10;

export const TRANSACTION_EVENTS = [
    "Build",
    "Burn",
    "Claim",
    "Stake",
    "Unstake",
    "Transfer",
    "Referral",
    "Swap",
    "Swap"
];

export const fetchTransactionHistory = async (
    walletAddress,
    networkId = undefined
) => {
    try {
        const [
            Build,
            burned,
            feesClaimed,
            collaterals,
            redeemCollaterals,
            transfers,
            referrals,
            freeZes,
            unfreezes
        ] = await Promise.all([
            linearData.lnr.minted({ account: walletAddress, networkId }),
            linearData.lnr.burned({ account: walletAddress, networkId }),
            linearData.lnr.feesClaimed({ account: walletAddress, networkId }),
            linearData.lnr.collateral({ account: walletAddress, networkId }),
            linearData.lnr.redeemCollateral({
                account: walletAddress,
                networkId
            }),
            linearData.lnr.transfer({ account: walletAddress, networkId }),
            linearData.lnr.referral({ to: walletAddress, networkId }),
            linearData.lnr.freeZe({ depositor: walletAddress, networkId }),
            linearData.lnr.unfreeze({ recipient: walletAddress, networkId })
        ]);

        let chain; //链
        if (isEthereumNetwork(networkId)) {
            chain = "ethereum";
        } else if (isBinanceNetwork(networkId)) {
            chain = "binance";
        }

        const mergedArray = flatten(
            [
                Build,
                burned,
                feesClaimed,
                collaterals,
                redeemCollaterals,
                transfers,
                referrals,
                freeZes,
                unfreezes
            ].map((eventType, i) => {
                return eventType.map(event => {
                    event.decimal = TRANSACTION_EVENTS[i] == "Swap" ? 4 : 2;
                    event.value
                        ? (event.value = _.floor(event.value, event.decimal))
                        : null;
                    event.amount
                        ? (event.amount = _.floor(event.amount, event.decimal))
                        : null;
                    event.rewardslusd
                        ? (event.rewardslusd = _.floor(event.rewardslusd, 2))
                        : null;
                    event.rewardsLina
                        ? (event.rewardsLina = _.floor(event.rewardsLina, 2))
                        : null;
                    event.source
                        ? (event.source = event.source.replace(/l/, "ℓ"))
                        : null;
                    return event.type
                        ? { networkId, chain, ...event }
                        : {
                              networkId,
                              chain,
                              type: TRANSACTION_EVENTS[i],
                              ...event
                          };
                });
            })
        );

        //所有类型的交易记录按时间戳降序排序
        const orderData = mergedArray.sort(function(record1, record2) {
            return record2.timestamp - record1.timestamp;
        });

        return orderData;
    } catch (e) {
        console.log(e, "fetchTransactionHistory error");
    }
};
