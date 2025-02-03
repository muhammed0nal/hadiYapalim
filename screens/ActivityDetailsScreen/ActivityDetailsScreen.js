import { View, Text } from "react-native";
import { etkinlik } from "../../data/user";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActivityDetailsScreen({ route }) {
  const { itemId } = route.params;
  const show = etkinlik.filter((f) => f.id == itemId);
  console.log(show);
  return (
    <SafeAreaView>
      <Text>{show[0].author}</Text>
      <Text>{show[0].content}</Text>
      <Text>{show[0].title}</Text>
      <Text>{show[0].author}</Text>
      <Text>{show[0].content}</Text>
      <Text>{show[0].title}</Text>
    </SafeAreaView>
  );
}
