import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Text } from "@react-navigation/elements";
import type { Deal } from "../data/model/Deal";
import { useDeals } from "../logic/useDeals";

export const DealsListScreen = () => {
  const state = useDeals();
  const navigation = useNavigation();

  if (state.status === "initial" || state.status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (state.status === "error") {
    return <Text>Error: {state.errorMessage}</Text>;
  }

  const renderItem = ({ item }: { item: Deal }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DealDetails", { deal: item })}
    >
      <View>
        <Text>{item.title}</Text>
        <Text>
          {item.price.amount} {item.price.currency}
        </Text>
        <Text>-{item.discountPercentage}%</Text>
        <Text>Refurbed Score: {item.refurbedScore}/100</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={state.deals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
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
