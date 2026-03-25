import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
import { Text } from "@react-navigation/elements";
import type { Deal } from "../data/model/Deal";
import { useDeals } from "../logic/useDeals";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, ToggleButton } from "react-native-paper";
import { useState, useMemo } from "react";

type SortKey = "price-asc" | "price-desc" | "score-asc" | "score-desc";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
  { key: "score-asc", label: "Score ↑" },
  { key: "score-desc", label: "Score ↓" },
];

export const DealsListScreen = () => {
  const state = useDeals();
  const navigation = useNavigation();
  const [sortKey, setSortKey] = useState<SortKey>("price-asc");

  const sortedDeals = useMemo(() => {
    if (state.status !== "success") return [];
    return [...state.deals].sort((a, b) => {
      switch (sortKey) {
        case "price-asc":
          return a.price.amount - b.price.amount;
        case "price-desc":
          return b.price.amount - a.price.amount;
        case "score-asc":
          return a.refurbedScore - b.refurbedScore;
        case "score-desc":
          return b.refurbedScore - a.refurbedScore;
      }
    });
  }, [state, sortKey]);

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
      <View style={styles.sortBar}>
        {SORT_OPTIONS.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[styles.chip, sortKey === key && styles.chipActive]}
            onPress={() => setSortKey(key)}
          >
            <Text
              style={[
                styles.chipText,
                sortKey === key && styles.chipTextActive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={sortedDeals}
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
  },
  sortBar: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexWrap: "wrap",
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  chipActive: {
    backgroundColor: "#E8F1FD",
    borderColor: "#4A90D9",
  },
  chipText: {
    fontSize: 13,
    color: "#555",
  },
  chipTextActive: {
    color: "#1A5FA8",
    fontWeight: "500",
  },
});
