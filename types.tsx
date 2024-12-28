import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Product } from "./data";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  "Home": undefined;
  "Product Details": { product: Product };
  "Cart": undefined;
  "Login": undefined;
  "Sign Up": undefined;
  "Forgot Password": undefined;
  "Check Out": { cartItems: Product[] };
  "Rating & Review": undefined;
  "Profile": undefined;
  "Settings": undefined;
  "Shipping Adress": undefined;
  "Notification": undefined;
  "Search": undefined;
  "Help & Support": undefined;
  "My Products" : undefined;

};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;