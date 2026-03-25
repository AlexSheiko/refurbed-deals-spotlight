import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DealDetailsScreen } from "./screens/DealDetailsScreen";
import { DealsListScreen } from "./screens/DealsListScreen";

const RootStack = createNativeStackNavigator({
  screens: {
    DealsList: {
      screen: DealsListScreen,
      options: {
        title: "Deals",
        headerShown: false,
      },
    },
    DealDetails: {
      screen: DealDetailsScreen,
      linking: {
        path: ":deal(@[a-zA-Z0-9-_]+)",
        parse: {
          deal: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          deal: (value) => `@${value}`,
        },
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
