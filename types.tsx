import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Product } from "./data";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Home: undefined;
  "Product-Details": { product: Product };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;