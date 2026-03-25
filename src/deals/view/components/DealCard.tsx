import { Text } from "@react-navigation/elements";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { trackDealClick } from "../../../analytics";
import type { Deal } from "../../data/model/Deal";

type Props = {
  deal: Deal;
  onPress: () => void;
};

export const DealCard = ({ deal, onPress }: Props) => {
  const handlePress = () => {
    trackDealClick(deal.id, deal.title);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card>
        <Card.Content>
          <Text>{deal.title}</Text>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>
              {deal.price.amount} {deal.price.currency}
            </Text>
            <Text
              style={[
                styles.badge,
                { backgroundColor: "#EAF3DE", color: "#3B6D11" },
              ]}
            >
              −{deal.discountPercentage}%
            </Text>
            <Text
              style={[
                styles.badge,
                { backgroundColor: "#E6F1FB", color: "#185FA5" },
              ]}
            >
              Score {deal.refurbedScore}/100
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badgeRow: { flexDirection: "row", gap: 8, marginTop: 8 },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: "#F5F5F3",
    fontSize: 12,
    fontWeight: "500",
    overflow: "hidden",
  },
});
