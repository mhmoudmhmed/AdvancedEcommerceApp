const MockPaymentGateway = {
  processPayment: async (amount: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  },
};

export default MockPaymentGateway;
