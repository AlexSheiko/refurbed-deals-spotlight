import { Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

type Props = StaticScreenProps<{
  deal: string;
}>;

export function DealDetailsScreen({ route }: Props) {
  return (
    <View style={styles.container}>
      <Text>{route.params.deal}'s Profile</Text>
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
