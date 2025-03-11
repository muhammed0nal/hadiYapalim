import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const handleGotoEditProfileSettings = () => {
    navigation.navigate("EditProfileScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={scale(24)}
          onPress={() => navigation.goBack()}
          color={Colors.blue}
        />
        <Text style={styles.headerText}>Ayarlar</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Profil Ayarları</Text>
          <View style={styles.settingsGroup}>
            <Pressable
              style={styles.settingItem}
              onPress={handleGotoEditProfileSettings}
            >
              <View style={styles.settingContent}>
                <FontAwesome6
                  name="user-pen"
                  size={scale(18)}
                  color={Colors.blue}
                />
                <Text style={styles.settingText}>Profili Düzenle</Text>
              </View>
              <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
            </Pressable>

            <Pressable style={styles.settingItem}>
              <View style={styles.settingContent}>
                <FontAwesome6 name="key" size={scale(18)} color={Colors.blue} />
                <Text style={styles.settingText}>Şifreyi Değiştir</Text>
              </View>
              <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
            </Pressable>
          </View>
        </View>

        {/* Notification Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
          <View style={styles.settingsGroup}>
            <Pressable style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Ionicons
                  name="notifications-outline"
                  size={scale(20)}
                  color={Colors.blue}
                />
                <Text style={styles.settingText}>Push Bildirimleri</Text>
              </View>
              <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
            </Pressable>

            <Pressable style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Ionicons
                  name="mail-outline"
                  size={scale(20)}
                  color={Colors.blue}
                />
                <Text style={styles.settingText}>Email Bildirimleri</Text>
              </View>
              <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
            </Pressable>
          </View>
        </View>

        {/* Privacy Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Gizlilik</Text>
          <View style={styles.settingsGroup}>
            <Pressable style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Ionicons
                  name="lock-closed-outline"
                  size={scale(20)}
                  color={Colors.blue}
                />
                <Text style={styles.settingText}>Hesap Gizliliği</Text>
              </View>
              <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
            </Pressable>

            <Pressable style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Ionicons
                  name="eye-outline"
                  size={scale(20)}
                  color={Colors.blue}
                />
                <Text style={styles.settingText}>Görünürlük Ayarları</Text>
              </View>
              <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
            </Pressable>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Hakkında</Text>
          <View style={styles.settingsGroup}>
            <Pressable style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Ionicons
                  name="information-circle-outline"
                  size={scale(20)}
                  color={Colors.blue}
                />
                <Text style={styles.settingText}>Uygulama Hakkında</Text>
              </View>
              <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
            </Pressable>

            <Pressable style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Ionicons
                  name="document-text-outline"
                  size={scale(20)}
                  color={Colors.blue}
                />
                <Text style={styles.settingText}>Kullanım Koşulları</Text>
              </View>
              <Ionicons name="chevron-forward" size={scale(20)} color="#999" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2,
  },
  headerText: {
    flex: 1,
    fontSize: scale(18),
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginRight: scale(24),
  },
  sectionContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: scale(12),
    marginTop: verticalScale(16),
    borderRadius: verticalScale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2,
  },
  sectionTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#333",
    padding: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingsGroup: {
    paddingVertical: verticalScale(4),
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  settingText: {
    fontSize: scale(14),
    color: "#333",
    fontWeight: "500",
  },
});
