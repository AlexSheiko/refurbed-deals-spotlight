import { Text } from "@react-navigation/elements";
import { FlatList, StyleSheet } from "react-native";
import { useDeals } from "../logic/useDeals";

export const DealsListScreen = () => {
  const state = useDeals();

  if (state.status === "initial") return null;
  if (state.status === "loading") return <Text>Loading...</Text>;
  if (state.status === "error") return <Text>{state.errorMessage}</Text>;

  return (
    <FlatList
      data={state.deals}
      keyExtractor={(deal) => deal.id}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
