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
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "react-native-paper";

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
      <Card>
        <Card.Content>
          <Text>{item.title}</Text>
          <Text>
            {item.price.amount} {item.price.currency}
          </Text>
          <Text>-{item.discountPercentage}%</Text>
          <Text>Refurbed Score: {item.refurbedScore}/100</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={state.deals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20, gap: 16 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
