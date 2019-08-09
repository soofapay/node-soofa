# node-soofa

This package is aimed at simplifying the process of integrating soofapay payment solution in your Nodejs application. You can check our
[website] for more information.

#### Installation

```sh
 $ npm i soofa
```

#### Usage

##### 1. Checking for a transaction

```JavaScript
const soofa = require('soofa');

// Initialize
soofa.init("you_soofa_till_number", "your_client_secret_here");

async getTransaction(transactionId, callback) => {
  if (transactionId) {
    let transaction = await soofa.find(transactionId);

    if (
      transaction.hasOwnProperty("tid") &&
      transaction.tid === transactionId
    ) {
          callback(200, { transaction: transaction });

    }else{
        callback(404, { error: "no such transaction" });
    }
  }
};

```

The expected response for transaction check is a JSON
object as shown below.

```JSON
{
    "status": "SUCCESSFUL",
    "sender_currency": "KES",
    "receiver_currency": "KES",
    "tid": "QTMB3",
    "reference": "T5004",
    "receipt_no": "NFQ6U45W28",
    "timestamp": 1561499777.715254,
    "gross_amount": 5,
    "net_amount": 4.8605,
    "transacted_via": "mpesa",
    "is_money_in": true,
    "sender": "+254701234567",
    "receiver": "Dev Market"
}
```

The table below describes all the attributes of the transaction object.

| Key               | Description                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| status            | The state of the transaction, either `SUCCESSFUL` or `PENDING`                                             |
| sender_currency   | The currency of the person who performed the transaction                                                   |
| receiver_currency | The currency of the business, if the transaction was Money in for the business                             |
| reference         | The transaction reference passed when making a transaction                                                 |
| timestamp         | Unix timestamp for the transaction                                                                         |
| gross_amount      | The amount of the transaction                                                                              |
| net_amount        | The amount received after deducting soofa                                                                  |
| transacted_via    | The service provider which facilitated the transaction eg. mpesa, visa, airtelmoney, mastercard, tkash ... |
| is_money_in       | A boolean indicating if the money was to the business or out of the business                               |
| sender            | The performer of transaction                                                                               |
| receiver          | The receiver of the transaction which is the business if the transaction was inbound                       |

##### 2. Checking your soofa business account balance

```JavaScript
const soofa = require('soofa');

// Initialize
soofa.init("you_soofa_till_number", "your_client_secret_here");

const balance = soofa.getBalance()
print(balance)
```

The expected response for checking balance is a JSON with three fields:

[website]: https://www.soofapay.com

```JSON
{
    "balance": "1587.49",
    "currency": "KES",
    "timestamp": 1561820831.623298
}
```
