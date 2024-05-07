// @ts-check


// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
*/

/**
* @type {FunctionRunResult}
*/
const NO_CHANGES = {
  operations: [],
};

// The configured entrypoint for the 'purchase.payment-customization.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {

  // Find the payment method to reorder
  const targetPaymentMethod = input.paymentMethods
    .find(method => method.name.includes("Cash on Delivery"));

  if (!targetPaymentMethod) {
    console.error('No method found as the targetPaymentMethod', targetPaymentMethod)
    return NO_CHANGES;
  }

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    operations: [{
      move: {
        index: 0,
        paymentMethodId: targetPaymentMethod.id
      }
    }]
  };
};
