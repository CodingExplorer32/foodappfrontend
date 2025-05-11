import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
  } from "react-native";
  import React, { useState, useEffect, useContext } from "react";
  import { useLocalSearchParams } from "expo-router";
  import axios from "axios";
  import { BASE_URL } from "../../config";
  import { Ionicons } from "@expo/vector-icons";
  import { CartContext } from "../context/CartProvider.js";
  
  const FoodDetails = () => {
    const { id } = useLocalSearchParams(); 
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(false);
    const { addToCart } = useContext(CartContext);
  
    useEffect(() => {
      if (id) {
        setLoading(true);
        axios
          .get(`${BASE_URL}/api/v1/food/${id}`)
          .then((response) => {
            setFood(response.data);
          })
          .catch((error) => {
            console.error("Error fetching food details:", error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [id]);
  
    if (loading) {
      return (
        <SafeAreaView style={styles.centered}>
          <ActivityIndicator size="large" color="purple" />
        </SafeAreaView>
      );
    }
  
    if (!food) {
      return (
        <SafeAreaView style={styles.centered}>
          <Text style={styles.errorText}>Food not found.</Text>
        </SafeAreaView>
      );
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <FlatList
              data={food.images}
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
              style={styles.imageList}
            />
  
            <View style={styles.cardContent}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.foodPrice}>${food.price.toFixed(2)}</Text>
  
              {food.description && (
                <Text style={styles.description}>{food.description}</Text>
              )}
  
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(food)}
                activeOpacity={0.7}
              >
                <Ionicons name="cart-outline" size={22} color="white" />
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default FoodDetails;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f1f5f9",
      marginTop: 10,
      paddingHorizontal: 8,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      fontSize: 18,
      color: "#6b7280",
    },
    imageList: {
      marginVertical: 14,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 16,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      marginBottom: 30,
      marginHorizontal: 10,
      paddingBottom: 15,
    },
    cardContent: {
      paddingHorizontal: 16,
      paddingTop: 10,
    },
    foodImage: {
      width: 400,
      height: 380,
      borderRadius: 16,
      marginHorizontal: 10,
      alignSelf: "center",
    },
    foodName: {
      fontSize: 26,
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: 8,
    },
    foodPrice: {
      fontSize: 22,
      color: "purple",
      fontWeight: "600",
      marginBottom: 14,
    },
    description: {
      fontSize: 16,
      color: "#374151",
      lineHeight: 22,
      marginBottom: 20,
    },
    addButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "purple",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 30,
      alignSelf: "flex-end",
    },
    addButtonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 16,
      marginLeft: 8,
    },
  });
  