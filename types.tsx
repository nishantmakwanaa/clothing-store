import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Product } from "./data";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Home: undefined;
  "Product Details": { product: Product };
  Cart: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  CheckOut: undefined;
  OrderHistory: undefined;
  OrderTracking: undefined;
  Exchange: undefined;
  WishList: undefined;
  RatingReview: undefined;
  Profile: undefined;
  Settings: undefined;
  ShippingAdress: undefined;
  Notification: undefined;
  HelpSupport: undefined;
  AdminPanel: undefined;

};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;