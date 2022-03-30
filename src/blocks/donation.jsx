import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { $Appreciate, $Text,$Donation, $DonationWrap, $Description, $Title, $Smalltitle, $List, $ListItem, $Left, $Right, $PaypalForm } from './donation.styled';
import { $Label, $Input } from './contact.styled';
import { Container } from '../components/container';

const initialState = {
  amount: '10',
  orderID: '',
  onApproveMessage: '',
  onErrorMessage: '',
  list: [
    { value: 10, isActive: true },
    { value: 20, isActive: false },
    { value: 50, isActive: false },
    { value: 100, isActive: false },
    { value: 'Other', isActive: false },
  ],
  isInputShown: false,
};

export class Donation extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.onChange = this.onChange.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.onApprove = this.onApprove.bind(this);
    this.onError = this.onError.bind(this);
    this.onToggleInput = this.onToggleInput.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
  }

  onChange(i) {
    const updatedList = [...this.state.list];
    let updatedAmount = this.state.amount;
    updatedList.map((item, index) => {
      if (index === i) {
        item.isActive = true;

        if (typeof item.value === 'number') {
          updatedAmount = item.value;
        }
      } else {
        item.isActive = false;
      }
      return item;
    });

    this.setState({
      amount: updatedAmount,
      orderID: "",
      onApproveMessage: "",
      onErrorMessage: "",
      list: updatedList,
      isInputShown: false,
    });
  }

  createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: this.state.amount
            }
          }
        ]
      })
      .then((orderID) => {
        this.setState({ orderID: orderID });
        return orderID;
      });
  }

  onApprove(data, actions) {
    let app = this;
    return actions.order.capture().then(function(details) {
      app.setState({
        onApproveMessage: `Transaction completed by ${details.payer.name.given_name}!`
      });
    });
  }

  onError(err) {
    this.setState({
      onErrorMessage: err.toString()
    });
  }

  onToggleInput(i) {
    const updatedList = [...this.state.list];
    updatedList.map((item, index) => {
      if (index === i) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });

    this.setState((prevState) => ({
      orderID: "",
      onApproveMessage: "",
      onErrorMessage: "",
      list: updatedList,
      isInputShown: !prevState.isInputShown,
    }));
  }

  onAmountChange(event) {
    this.setState({
      amount: event.target.value,
    });
  }

  render() {
    return (
      <>
        <$Donation id='donation'>
          <Container>
            <$DonationWrap>
              <$Left>
                <$Title>Help to save Ukraine</$Title>
                <$Description>We have committed hundreds of thousands of dollars to start the fund and would love to see that amount grow with the kind contributions from all of you.</$Description>
                <$Description>To put it simply — having more funds now will help save lives. Your help with <span>$20, $200, $2000 or $20000</span> will go directly to the causes listed above.</$Description>
              </$Left>
              <$Right>
                <$PaypalForm>
                  <$Smalltitle>your donation will help</$Smalltitle>
                  <$List>
                    {this.state.list.map(({ value, isActive }, index) => (
                      <>
                        {typeof value === 'number' ? (
                          <$ListItem
                            key={index}
                            isActive={isActive}
                            onClick={() => this.onChange(index)}
                          >
                            {`$${value}`}
                          </$ListItem>
                        ) : (
                          <$ListItem
                            key={index}
                            isActive={isActive}
                            onClick={() =>this.onToggleInput(index)}
                          >
                            {value}
                          </$ListItem>
                        )}
                      </>
                    ))}
                  </$List>
                  {this.state.isInputShown && (
                    <$Label>
                      <span>Amount</span>
                      <$Input
                        type="text"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                        name="amount"
                      />
                    </$Label>
                  )}
                  <PayPalScriptProvider options={{ "client-id": "AZylOv8aUL6Zo9c9SI1BhLlMtTgiuMr8A7ovtcSAqhf3qattWodtfBbwbC09uyXeN1W9pFgEmIRsRTxF" }}>
                    <PayPalButtons
                      createOrder={this.createOrder}
                      onApprove={this.onApprove}
                      onError={this.onError}
                    />
                  </PayPalScriptProvider>
                </$PaypalForm>
              </$Right>
            </$DonationWrap>
          </Container>
        </$Donation>
        <$Appreciate>
          <Container>
            <$Text>
              All of us appreciate your care, help and sensitivity to the urgency of this situation!
            </$Text>
          </Container>
        </$Appreciate>
      </>
    );
  }
}