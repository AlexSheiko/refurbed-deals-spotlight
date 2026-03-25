import { Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Deal } from "../data/model/Deal";
import { useDeals } from "../logic/useDeals";

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
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>
              {item.price.amount} {item.price.currency}
            </Text>
            <Text
              style={[
                styles.badge,
                { backgroundColor: "#EAF3DE", color: "#3B6D11" },
              ]}
            >
              −{item.discountPercentage}%
            </Text>
            <Text
              style={[
                styles.badge,
                { backgroundColor: "#E6F1FB", color: "#185FA5" },
              ]}
            >
              Score {item.refurbedScore}/100
            </Text>
          </View>
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
    backgroundColor: "#FFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  chipActive: { backgroundColor: "#E6F1FB" },
  chipText: { fontSize: 13 },
  chipTextActive: { color: "#185FA5", fontWeight: "500" },
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
