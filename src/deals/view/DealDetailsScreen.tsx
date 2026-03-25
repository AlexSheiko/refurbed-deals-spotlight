import { Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Deal } from "../data/model/Deal";

type Props = StaticScreenProps<{
  deal: Deal;
}>;

export function DealDetailsScreen({ route }: Props) {
  const { deal } = route.params;
  
  return (
    <View style={styles.container}>
      <Text>{deal.title}</Text>
      <Text>{deal.price.amount} {deal.price.currency}</Text>
      <Text>Discount: {deal.discountPercentage}%</Text>
      <Text>Refurbed Score: {deal.refurbedScore}/100</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
