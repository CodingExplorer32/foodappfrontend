import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartProvider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import { WebView } from "react-native-webview";
import { BASE_URL } from "../../config";

const Order = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleCheckOut = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        Toast.show({
          type: "error",
          text1: "Login Error",
          text2: "You are not logged in!!!",
        });
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "https://python.bhandarishishir.com.np/api/initiate-payment/",
        {
          items: cart.map((items) => ({
            product: items.id,
            quantity: items.quantity,
          })),
          phone: "9841234567",
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setLoading(false);
      if (response.data.payment_url) {
        setPaymentUrl(response.data.payment_url);
        setShowModal(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Payment error",
          text2: "Error in payment",
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Checkout Failed",
        text2: error.message,
      });
    }
  };

  const handleWebViewNavigation = async (navState) => {
    const baseUrl = "https://python.bhandarishishir.com.np/api/verify-payment/";
    const currentUrl = navState.url;
    setCurrentUrl(currentUrl);

    if (currentUrl.startsWith(baseUrl)) {
      try {
        const url = new URL(currentUrl);
        const status = url.searchParams.get("status");

        if (status === "Completed") {
          Toast.show({
            type: "success",
            text1: "Payment Successful",
            text2: "Thank you for your purchase!",
          });
          clearCart();
        } else if (status === "Pending") {
          Toast.show({
            type: "info",
            text1: "Payment Pending",
            text2: "Your payment is still pending.",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Payment Failed",
            text2: "Payment was not successful.",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Verification Error",
          text2: "Unable to verify payment.",
        });
      } finally {
        setShowModal(false);
        setPaymentUrl(null);
      }
    } else if (currentUrl.includes("cancel")) {
      Toast.show({
        type: "error",
        text1: "Payment Canceled",
        text2: "The payment was canceled.",
      });
      setShowModal(false);
      setPaymentUrl(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "purple",
              paddingVertical: 12,
              marginBottom: 20,
              borderEndEndRadius: 12,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 4,
            }}
          >
            <Text style={styles.heading}>Your Order</Text>
          </View>

          {cart && cart.length === 0 ? (
            <Text style={styles.noOrder}>No Order</Text>
          ) : (
            cart.map((i) => (
              <View key={i.id} style={styles.itemContainer}>
                {Array.isArray(i.images) && i.images.length > 0 && (
                  <View style={{ flexDirection: "row", marginBottom: 8 }}>
                    {i.images.map((img, index) => (
                      <Image
                        key={index}
                        source={{
                          uri: `${BASE_URL}/${img
                            .replace("public\\", "")
                            .replace(/\\/g, "/")}`,
                        }}
                        style={styles.image}
                      />
                    ))}
                  </View>
                )}

                <Text style={styles.title}>{i.name}</Text>
                <Text style={styles.desc}>{i.description}</Text>
                <Text style={styles.price}>Price: ${i.price.toFixed(2)}</Text>
                <Text style={styles.quantity}>Quantity: {i.quantity || 1}</Text>

                <View style={styles.actions}>
                  <Pressable onPress={() => addToCart(i)}>
                    <Ionicons name="add-circle" size={28} color="green" />
                  </Pressable>
                  <Pressable onPress={() => removeFromCart(i.id)}>
                    <Ionicons name="remove-circle" size={28} color="orange" />
                  </Pressable>
                  <Pressable onPress={() => clearCart(i)}>
                    <Ionicons name="trash" size={28} color="red" />
                  </Pressable>
                </View>
              </View>
            ))
          )}

          {cart.length > 0 && (
            <>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
              </View>

              <Pressable
                style={styles.checkoutButton}
                onPress={handleCheckOut}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                )}
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>

      {/* WebView Modal */}
      {showModal && (
        <Modal visible={showModal} animationType="slide" transparent={true}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Payment Gateway</Text>
              <Pressable
                onPress={() => {
                  setShowModal(false);
                  setPaymentUrl(null);
                }}
              >
                <Ionicons name="close-circle" size={32} color="red" />
              </Pressable>
            </View>

            {paymentUrl && (
              <WebView
                source={{ uri: paymentUrl }}
                onNavigationStateChange={handleWebViewNavigation}
                startInLoadingState={true}
                renderLoading={() => (
                  <ActivityIndicator
                    size="large"
                    color="purple"
                    style={{ marginTop: 20 }}
                  />
                )}
              />
            )}
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  noOrder: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 40,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#f3e8ff",
    borderRadius: 12,
    elevation: 3,
    marginHorizontal: 6,
  },
  image: { width: 150, height: 200, borderRadius: 10, marginRight: 10 },
  title: { fontSize: 18, fontWeight: "700", color: "#4b0082" },
  desc: { color: "#5b21b6", marginVertical: 4 },
  price: { fontWeight: "bold", marginBottom: 4, color: "#7c3aed" },
  quantity: { fontSize: 16, marginBottom: 10, color: "#6b21a8" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#e9d5ff",
    borderRadius: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    color: "#4b0082",
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: "purple",
    padding: 14,
    borderRadius: 30,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#e0c3fc",
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#6b21b6",
  },
});
