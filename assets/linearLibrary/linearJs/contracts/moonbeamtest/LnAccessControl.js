
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/moonbeamtest/LnAccessControl';
  
      function LnAccessControl(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnAccessControl'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.BURN_ASSET_ROLE = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.BURN_ASSET_ROLE(txParams);
      };
    
      this.DEBT_SYSTEM = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.DEBT_SYSTEM(txParams);
      };
    
      this.DEFAULT_ADMIN_ROLE = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.DEFAULT_ADMIN_ROLE(txParams);
      };
    
      this.ISSUE_ASSET_ROLE = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.ISSUE_ASSET_ROLE(txParams);
      };
    
      this.IsAdmin = async (_address, txParams) => {
        txParams = txParams || {};
        return await this.contract.IsAdmin(_address, txParams);
      };
    
      this.SetAdmin = async (_address, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetAdmin(_address, txParams);
      };
    
      this.SetBurnAssetRole = async (burner, setTo, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetBurnAssetRole(burner, setTo, txParams);
      };
    
      this.SetDebtSystemRole = async (_address, _setTo, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetDebtSystemRole(_address, _setTo, txParams);
      };
    
      this.SetIssueAssetRole = async (issuer, setTo, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetIssueAssetRole(issuer, setTo, txParams);
      };
    
      this.SetRoles = async (roleType, addresses, setTo, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetRoles(roleType, addresses, setTo, txParams);
      };
    
      this.__LnAccessControl_init = async (admin, txParams) => {
        txParams = txParams || {};
        return await this.contract.__LnAccessControl_init(admin, txParams);
      };
    
      this.getRoleAdmin = async (role, txParams) => {
        txParams = txParams || {};
        return await this.contract.getRoleAdmin(role, txParams);
      };
    
      this.getRoleMember = async (role, index, txParams) => {
        txParams = txParams || {};
        return await this.contract.getRoleMember(role, index, txParams);
      };
    
      this.getRoleMemberCount = async (role, txParams) => {
        txParams = txParams || {};
        return await this.contract.getRoleMemberCount(role, txParams);
      };
    
      this.grantRole = async (role, account, txParams) => {
        txParams = txParams || {};
        return await this.contract.grantRole(role, account, txParams);
      };
    
      this.hasRole = async (role, account, txParams) => {
        txParams = txParams || {};
        return await this.contract.hasRole(role, account, txParams);
      };
    
      this.renounceRole = async (role, account, txParams) => {
        txParams = txParams || {};
        return await this.contract.renounceRole(role, account, txParams);
      };
    
      this.revokeRole = async (role, account, txParams) => {
        txParams = txParams || {};
        return await this.contract.revokeRole(role, account, txParams);
      };
    
      }
  
      export default LnAccessControl;
    