import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));  // Assuming the user data is stored in AsyncStorage
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage", error);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  return { user, loading };
};

export default useAuth;
