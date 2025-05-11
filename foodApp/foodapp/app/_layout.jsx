import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthProvider";
import Toast from "react-native-toast-message";
import { CartProvider } from "./context/CartProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        >
          {/* Match route names to file paths */}
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="Screen/Welcome/index" />
          <Stack.Screen name="Screen/singin/index" />
          <Stack.Screen name="Screen/singup/index" />
        </Stack>
        <Toast />
      </CartProvider>
    </AuthProvider>
  );
}