import { Button, Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

export function DealsListScreen() {
  return (
    <View style={styles.container}>
      <Text>Deals Spotlight</Text>
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>
      <Button screen="DealDetails" params={{ deal: "testId" }}>
        Go to deal details
      </Button>
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
