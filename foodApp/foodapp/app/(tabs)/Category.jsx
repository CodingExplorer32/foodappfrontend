import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { BASE_URL } from "../../config";

const Category = () => {
  const [data, setData] = useState([]);
  const [food, setFood] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/category`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/food`)
      .then((response) => {
        setFood(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error.message);
      });
  }, []);

  const handleCategoryPress = (categoryName) => {
 
    const matchingFoods = food.filter((f) => f.category === categoryName);

 
    router.push({
      pathname: "../components/food", 
      params: { category: categoryName }, 
    });
  };

  return (
    <ScrollView>
      <View contentContainerStyle={styles.container}>
        <View
          style={{
            backgroundColor: "purple",
            paddingVertical: 10,
            marginBottom: 15,
            borderEndEndRadius: 12,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 4,
          }}
        >
          <Text style={styles.heading}>CATEGORIES</Text>
        </View>
        <View style={styles.grid}>
          {data.map((item) => {
            const fixedPath = item.icon
              .replace("public\\", "")
              .replace(/\\/g, "/");

            return (
              <TouchableOpacity
                key={item._id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(item.name)} // <- handle on press here
              >
                <Image
                  source={{ uri: `${BASE_URL}/${fixedPath}` }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
  },
  grid: {
    marginTop: 12,
    gap: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderColor: "purple",
  },
  categoryCard: {
    width: 140,
    height: 160,
    margin: 10,
    backgroundColor: "lavender",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 17,
    elevation: 8,
    shadowColor: "purple",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderColor: "purple",
  },
  categoryCardHovered: {
    transform: [{ scale: 1.05 }],
  },
  categoryImage: {
    width: 90,
    height: 90,
    marginBottom: 12,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "purple",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#3E2A47",
    textTransform: "capitalize",
    paddingHorizontal: 5,
  },
});
