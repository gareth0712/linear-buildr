
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/moonbeamtest/LnBandProtocol';
  
      function LnBandProtocol(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnBandProtocol'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.LINA = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.LINA(txParams);
      };
    
      this.LUSD = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.LUSD(txParams);
      };
    
      this.__LnAdminUpgradeable_init = async (_admin, txParams) => {
        txParams = txParams || {};
        return await this.contract.__LnAdminUpgradeable_init(_admin, txParams);
      };
    
      this.__LnBandProtocol_init = async (_admin, _oracle, _currencyNames, _newPrices, txParams) => {
        txParams = txParams || {};
        return await this.contract.__LnBandProtocol_init(_admin, _oracle, _currencyNames, _newPrices, txParams);
      };
    
      this.__LnDefaultPrices_init = async (_admin, _oracle, _currencyNames, _newPrices, txParams) => {
        txParams = txParams || {};
        return await this.contract.__LnDefaultPrices_init(_admin, _oracle, _currencyNames, _newPrices, txParams);
      };
    
      this.addOracle = async (currencyKey, bandCurrencyKey, oracleAddress, txParams) => {
        txParams = txParams || {};
        return await this.contract.addOracle(currencyKey, bandCurrencyKey, oracleAddress, txParams);
      };
    
      this.admin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.admin(txParams);
      };
    
      this.bandCurrencyKeys = async (bytes32_1, txParams) => {
        txParams = txParams || {};
        return await this.contract.bandCurrencyKeys(bytes32_1, txParams);
      };
    
      this.bandOracleMap = async (bytes32_1, txParams) => {
        txParams = txParams || {};
        return await this.contract.bandOracleMap(bytes32_1, txParams);
      };
    
      this.bandOracleMapKeys = async (uint256_1, txParams) => {
        txParams = txParams || {};
        return await this.contract.bandOracleMapKeys(uint256_1, txParams);
      };
    
      this.becomeAdmin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.becomeAdmin(txParams);
      };
    
      this.candidate = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.candidate(txParams);
      };
    
      this.deletePrice = async (currencyName, txParams) => {
        txParams = txParams || {};
        return await this.contract.deletePrice(currencyName, txParams);
      };
    
      this.exchange = async (sourceName, sourceAmount, destName, txParams) => {
        txParams = txParams || {};
        return await this.contract.exchange(sourceName, sourceAmount, destName, txParams);
      };
    
      this.exchangeAndPrices = async (sourceName, sourceAmount, destName, txParams) => {
        txParams = txParams || {};
        return await this.contract.exchangeAndPrices(sourceName, sourceAmount, destName, txParams);
      };
    
      this.getCurrentRoundId = async (currencyName, txParams) => {
        txParams = txParams || {};
        return await this.contract.getCurrentRoundId(currencyName, txParams);
      };
    
      this.getPrice = async (currencyName, txParams) => {
        txParams = txParams || {};
        return await this.contract.getPrice(currencyName, txParams);
      };
    
      this.getPriceAndUpdatedTime = async (currencyName, txParams) => {
        txParams = txParams || {};
        return await this.contract.getPriceAndUpdatedTime(currencyName, txParams);
      };
    
      this.isStale = async (currencyName, txParams) => {
        txParams = txParams || {};
        return await this.contract.isStale(currencyName, txParams);
      };
    
      this.mPricesLastRound = async (bytes32_1, txParams) => {
        txParams = txParams || {};
        return await this.contract.mPricesLastRound(bytes32_1, txParams);
      };
    
      this.oracle = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.oracle(txParams);
      };
    
      this.removeOracle = async (currencyKey, txParams) => {
        txParams = txParams || {};
        return await this.contract.removeOracle(currencyKey, txParams);
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.setOracle = async (_oracle, txParams) => {
        txParams = txParams || {};
        return await this.contract.setOracle(_oracle, txParams);
      };
    
      this.setStalePeriod = async (_time, txParams) => {
        txParams = txParams || {};
        return await this.contract.setStalePeriod(_time, txParams);
      };
    
      this.stalePeriod = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.stalePeriod(txParams);
      };
    
      this.updateAll = async (currencyNames, newPrices, timeSent, txParams) => {
        txParams = txParams || {};
        return await this.contract.updateAll(currencyNames, newPrices, timeSent, txParams);
      };
    
      }
  
      export default LnBandProtocol;
    