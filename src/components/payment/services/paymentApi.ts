import instanceAPI, { BASE_API_URL } from "../../../Api/baseApi";
import { paymentData } from "../../../types/appTypes";

export const proceedPayment = async (data: paymentData) => {
  try {
    await instanceAPI.post(
      `${BASE_API_URL}a8645bc0?count=3&key=d8691d10`,
      data
    );
  } catch (error) {}
};
