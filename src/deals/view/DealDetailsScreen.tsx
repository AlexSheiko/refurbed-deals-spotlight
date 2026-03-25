import { Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { trackDealImpression } from "../../analytics";
import { Deal } from "../data/model/Deal";

type Props = StaticScreenProps<{
  deal: Deal;
}>;

export function DealDetailsScreen({ route }: Props) {
  const { deal } = route.params;

  useEffect(() => {
    trackDealImpression(deal.id, deal.title);
  }, [deal.id, deal.title]);

  return (
    <View style={styles.container}>
      <Text>{deal.title}</Text>
      <Text>
        {deal.price.amount} {deal.price.currency}
      </Text>
      <Text>Discount: {deal.discountPercentage}%</Text>
      <Text>Refurbed Score: {deal.refurbedScore}/100</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 24,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
