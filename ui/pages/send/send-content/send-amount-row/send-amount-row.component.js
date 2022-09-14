import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import SendRowWrapper from '../send-row-wrapper';
import UserPreferencedCurrencyInput from '../../../../components/app/user-preferenced-currency-input';
import UserPreferencedTokenInput from '../../../../components/app/user-preferenced-token-input';
import { ASSET_TYPES } from '../../../../../shared/constants/transaction';
import AmountMaxButton from './amount-max-button';

export default class SendAmountRow extends Component {
  static propTypes = {
    amount: PropTypes.string,
    inError: PropTypes.bool,
    asset: PropTypes.object,
    updateSendAmount: PropTypes.func,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  handleChange = (newAmount) => {
    this.props.updateSendAmount(newAmount);
  };

  debouncedHandleChange = debounce(this.handleChange, 500);

  renderInput() {
    const { amount, inError, asset } = this.props;

    return asset.type === ASSET_TYPES.TOKEN ? (
      <UserPreferencedTokenInput
        error={inError}
        onChange={this.debouncedHandleChange}
        token={asset.details}
        value={amount}
      />
    ) : (
      <UserPreferencedCurrencyInput
        error={inError}
        onChange={this.debouncedHandleChange}
        hexValue={amount}
      />
    );
  }

  render() {
    const { inError, asset } = this.props;

    if (asset.type === ASSET_TYPES.COLLECTIBLE) {
      return null;
    }

    return (
      <SendRowWrapper
        label={`${this.context.t('amount')}:`}
        showError={inError}
        errorType="amount"
      >
        <AmountMaxButton inError={inError} />
        {this.renderInput()}
      </SendRowWrapper>
    );
  }
}
