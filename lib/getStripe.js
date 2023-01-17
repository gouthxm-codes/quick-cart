import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51MLo8WSBE6P6fV6eGKlAZWz9PCG1j6H7npnu7xiT6SG3tNxSM9ynm1BmCQihajkEP2Ek3Rlb0pFu96r5y8nICpuK00mFe8BpMX"
    );
  }

  return stripePromise;
};

export default getStripe;
