import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import axios from "axios";
import { useVideoPlayer, VideoView } from "expo-video";
import { BASE_URL } from "../../config";
import { useRouter } from "expo-router";

export default function MediaScreen() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const router = useRouter();

  const videoSource = require("../../assets/videos/Offer.mp4");
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    try {
      player.play();
    } catch (e) {
      console.warn("Video play failed:", e);
    }
  });

  const images = [
    { id: "1", image: require("../../assets/images/lux3.jpg") },
    { id: "2", image: require("../../assets/images/pala1.jpg") },
    { id: "3", image: require("../../assets/images/foodd.jpg") },
    { id: "4", image: require("../../assets/images/lux4.jpg") },
  ];

  const handleClick = (categoryName) => {
    router.push({ pathname: "/components/food", params: { category: categoryName } });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/restaurant`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("error", error));
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.heading}>Order And Grab</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search restaurants"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.image} />
        )}
        showsHorizontalScrollIndicator={false}
      />

      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />

      <Text style={styles.sectionTitle}>Restaurants</Text>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => handleClick(item.foodType)}
          >
            {/* Image Slider */}
            {item.images && item.images.length > 0 ? (
              <FlatList
                data={item.images}
                keyExtractor={(img, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: img }) => (
                  <Image
                    source={{
                      uri: img
                        ? `${BASE_URL}/${img
                            .replace("public\\", "")
                            .replace(/\\/g, "/")}`
                        : "https://via.placeholder.com/400x200",
                    }}
                    style={styles.sliderImage}
                  />
                )}
              />
            ) : (
              <Image
                source={{ uri: "https://via.placeholder.com/400x200" }}
                style={styles.sliderImage}
              />
            )}

            <View style={styles.cardContent}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.addressText}>{item.address}</Text>
              <Text style={styles.addressText}>{item.phone}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>View Menu</Text>
            </View>
          </Pressable>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  topSection: {
    backgroundColor: "purple",
    paddingVertical: 20,
    marginBottom: 20,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  heading: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 2,
    borderColor: "#A020F0",
    paddingHorizontal: 12,
    marginBottom: 20,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 200,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E0A1F5",
  },
  video: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    backgroundColor: "purple",
    color: "white",
    padding: 10,
    textAlign: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sliderImage: {
    width: 300,
    height: 150,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#A020F0",
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#3E2A47",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    color: "#555",
    marginBottom: 2,
  },
  buttonContainer: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
