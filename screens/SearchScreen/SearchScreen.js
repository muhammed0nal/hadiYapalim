import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { ip } from "../../ip/ip";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import SCREENS from "../index";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useAuth } from "../../contexts/AuthContext";
export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { userId } = useAuth().authState;
  useEffect(() => {
    if (searchQuery?.length > 2) {
      const delayDebounce = setTimeout(() => {
        fetchResults();
      }, 500);

      return () => clearTimeout(delayDebounce);
    } else {
      setUsers([]);
    }
  }, [searchQuery]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ip}/user/search?q=${searchQuery}`);
      const filteredUsers = response.data.users.filter((u) => u.id !== userId);
      console.log(filteredUsers);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Arama hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToOtherUsersProfile = (user_id) => {
    navigation.navigate(SCREENS.OtherUsersProfileScreen, { user_id });
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => goToOtherUsersProfile(item.id)}
      style={styles.userItem}
    >
      <View style={styles.userItemContent}>
        <View style={styles.userAvatar}>
          <Text style={styles.userInitial}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {item.name} {item.surname}
          </Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
    </TouchableOpacity>
  );

  const EmptySearchResults = () => (
    <View style={styles.emptyContainer}>
      {searchQuery.length > 2 ? (
        <>
          <Ionicons name="search" size={50} color="#ddd" />
          <Text style={styles.emptyText}>Kullanıcı bulunamadı</Text>
        </>
      ) : searchQuery.length > 0 ? (
        <Text style={styles.tipText}>
          En az 3 karakter girerek arama yapabilirsiniz
        </Text>
      ) : (
        <>
          <Ionicons name="people" size={50} color="#ddd" />
          <Text style={styles.emptyText}>
            Kullanıcı aramak için yukarıdaki arama çubuğunu kullanın
          </Text>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.gray}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Kullanıcı ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          placeholderTextColor={Colors.gray}
          returnKeyType="search"
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color={Colors.gray} />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      ) : (
        <>
          {users?.length > 0 && (
            <Text style={styles.resultsTitle}>
              Kullanıcılar ({users.length})
            </Text>
          )}

          <FlatList
            keyboardShouldPersistTaps="handled"
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={EmptySearchResults}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: scale(10),
    marginHorizontal: scale(16),
    marginVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    paddingVertical: verticalScale(12),
    fontSize: scale(16),
    color: Colors.black,
  },
  clearButton: {
    padding: scale(8),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultsTitle: {
    fontSize: scale(16),
    fontWeight: "600",
    marginHorizontal: scale(16),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
    color: Colors.blue,
  },
  listContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(80),
    flexGrow: 1,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    marginVertical: verticalScale(4),
    borderRadius: scale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  userInitial: {
    color: Colors.white,
    fontSize: scale(18),
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: scale(15),
    fontWeight: "600",
    color: Colors.black,
  },
  username: {
    fontSize: scale(13),
    color: Colors.gray,
    marginTop: verticalScale(2),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: verticalScale(100),
    paddingHorizontal: scale(30),
  },
  emptyText: {
    fontSize: scale(15),
    color: "#888",
    textAlign: "center",
    marginTop: verticalScale(16),
  },
  tipText: {
    fontSize: scale(14),
    color: Colors.blue,
    textAlign: "center",
  },
});
