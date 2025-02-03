import { Colors } from "../../constants/Colors";
import { etkinlik, users } from "../../data/user";
import ActivityFlatList from "../../components/Activity/ActivityFlatList";
import ActivityRenderItem from "../../components/Activity/ActivityRenderItem";
import { StyleSheet, View } from "react-native";
import { useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
export default function HomeScreen({ navigation }) {
  const renderItem = useCallback(
    ({ item }) => (
      <ActivityRenderItem item={item} navigation={navigation.navigate} />
    ),
    [navigation.navigate] // dependencies array
  );
  const keyExtractor = useCallback((item) => `${item.id}`, []);
  const itemSeparatorComponent = <View style={styles.separator} />;
  const onEndReached = () => {
    alert("sayfa bitti");
  };
  return (
    <ActivityFlatList
      showsVerticalScrollIndicator={false}
      windowSize={4}
      removeClippedSubviews={true}
      maxToRenderPerBatch={20}
      initialNumToRender={20}
      onEndReached={onEndReached}
      style={{ backgroundColor: Colors.white, height: 100 }}
      data={etkinlik}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={itemSeparatorComponent}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.inputBackgroundWhite,
  },
});
