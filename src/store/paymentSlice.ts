import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import getEnvVars from "../../config";

const { ENCRYPTION_KEY }: String | any = getEnvVars();

interface PaymentState {
  amount: number;
  paymentMethod: string;
  billingAddress: string;
  cardName: string;
  cardNumber: string;
  cvv: string;
}

const initialState: PaymentState = {
  amount: 0,
  paymentMethod: "",
  billingAddress: "",
  cardName: "",
  cardNumber: "",
  cvv: "",
};

const encrypt = (data: string, key: string) => {
  if (!data || !key) {
    return "";
  }
  return CryptoJS?.AES?.encrypt(data, key)?.toString();
};

const decrypt = (ciphertext: string, key: string) => {
  if (!ciphertext || !key) {
    return "";
  }
  const bytes = CryptoJS?.AES?.decrypt(ciphertext, key);
  return bytes?.toString(CryptoJS?.enc?.Utf8);
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    setBillingAddress: (state, action: PayloadAction<string>) => {
      state.billingAddress = action.payload;
    },
    setCardInfo: (
      state,
      action: PayloadAction<{
        cardName: string;
        cardNumber: string;
        cvv: string;
      }>
    ) => {
      if (!action.payload || !ENCRYPTION_KEY) {
        return;
      }
      state.cardName = encrypt(action.payload.cardName, ENCRYPTION_KEY);
      state.cardNumber = encrypt(action.payload.cardNumber, ENCRYPTION_KEY);
      state.cvv = encrypt(action.payload.cvv, ENCRYPTION_KEY);
    },
  },
});

export const { setAmount, setPaymentMethod, setBillingAddress, setCardInfo } =
  paymentSlice.actions;
export default paymentSlice.reducer;
