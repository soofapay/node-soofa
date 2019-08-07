const { request } = require("https");

const soofa = {};

soofa.init = (till, clientSecret) => {
  soofa.clientSecret = clientSecret;
  soofa.tillNumber = till;
};

soofa.transaction = null;
soofa.balance = null;

soofa.find = tid => {
  const options = {
    host: "api.soofapay.com",
    path: `/v1/transactions/${tid}/`,
    method: "GET",
    headers: {
      "X-TILL": soofa.tillNumber,
      Authorization: soofa.clientSecret
    }
  };

  return new Promise((resolve, reject) => {
    const rqst = request(options, res => {
      if (res.statusCode === 403) {
        resolve({
          Error:
            "A transaction is not available yet. Please ensure you call find method and verify that one exists before proceeding."
        });
      } else if (res.statusCode === 404) {
        resolve({ Error: `Transaction with id ${tid} does not exist.` });
      }

      let result = "";
      res.on("data", function(chunk) {
        result += chunk;
      });

      res.on("end", function() {
        soofa.transaction = result;
        resolve(JSON.parse(result));
      });

      res.on("error", function(error) {
        reject(error);
      });
    });

    rqst.end();
  });
};

soofa.getBalance = () => {
  const options = {
    host: "api.soofapay.com",
    path: `/v1/balance/`,
    method: "GET",
    headers: {
      "X-TILL": soofa.tillNumber,
      Authorization: soofa.clientSecret
    }
  };

  return new Promise((resolve, reject) => {
    const rqst = request(options, res => {
      if (res.statusCode === 403) {
        resolve({ Error: "Your are not allowed to perform this action." });
      }

      let result = "";
      res.on("data", function(chunk) {
        result += chunk;
      });

      res.on("end", function() {
        soofa.balance = result;
        resolve(JSON.parse(result));
      });

      res.on("error", function(error) {
        reject(error);
      });
    });

    rqst.end();
  });
};

soofa.getTransaction = () => {
  if (soofa.transaction === null) {
    return {
      Error:
        "A transaction is not available yet. Please ensure you call find method and verify that one exists before proceeding."
    };
  } else {
    return JSON.parse(soofa.transaction);
  }
};

module.exports = soofa;
