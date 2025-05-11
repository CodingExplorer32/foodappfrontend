import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CartProvider.js";

const Food = () => {
  const { category } = useLocalSearchParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const onClick = (foodId) => {
    router.push({
      pathname: "/components/foodId",
      params: { id: foodId },
    });
  };

  useEffect(() => {
    if (category) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/api/v1/food`)
        .then((response) => {
          const filteredFoods = response.data.filter(
            (item) =>
              item.category?.name?.toLowerCase() === category.toLowerCase()
          );
          setFoods(filteredFoods);
        })
        .catch((error) => {
          console.error("Error fetching foods:", error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [category]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryTitle}>{category}</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="purple"
          style={{ marginTop: 50 }}
        />
      ) : foods.length > 0 ? (
        <FlatList
          data={foods}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onClick(item._id)}
              activeOpacity={0.85}
            >
              <View style={styles.card}>
                <FlatList
                  data={item.images}
                  keyExtractor={(img, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item: img }) => (
                    <Image
                      source={{
                        uri: `${BASE_URL}/${img
                          .replace("public\\", "")
                          .replace(/\\/g, "/")}`,
                      }}
                      style={styles.foodImage}
                    />
                  )}
                />

                <View style={styles.cardContent}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodPrice}>${item.price.toFixed(2)}</Text>

                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart(item)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="cart-outline" size={20} color="white" />
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No foods found for this category.</Text>
      )}
    </SafeAreaView>
  );
};

export default Food;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  header: {
    backgroundColor: "purple",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textTransform: "capitalize",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  foodImage: {
    width: 250,
    height: 200,
    borderRadius: 12,
    marginRight: 10,
  },
  cardContent: {
    padding: 12,
  },
  foodName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
  },
  foodPrice: {
    fontSize: 18,
    color: "purple",
    fontWeight: "600",
    marginBottom: 12,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "purple",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 25,
    alignSelf: "flex-end",
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  noDataText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#6b7280",
  },
});
