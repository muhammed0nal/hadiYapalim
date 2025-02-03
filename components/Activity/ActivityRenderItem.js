import { Text, Pressable, StyleSheet, Image, View } from "react-native";
import { ImageConst } from "../../constants/ImageConst";
import { Colors } from "../../constants/Colors";
import { formatDate } from "../../utils/formattedDateString";
import { memo } from "react";
import ExpandableText from "../UI/ExpandableText/ExpandableText";
import { scale, verticalScale } from "react-native-size-matters"; // size-matter'ı import ediyoruz
const ActivityRenderItem = memo(({ item, navigation }) => {
  const formattedDate = formatDate(item.date, "-");

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.pressableOut, styles.pressed] : [styles.pressableOut]
      }
      onPress={() =>
        navigation(SCREENS.ActivityDetailsScreen, {
          itemId: item.id,
        })
      }
    >
      <View style={styles.contentContainer}>
        <Pressable
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={({ pressed }) => (pressed ? [styles.pressed] : "")}
        >
          <Image source={ImageConst.user} style={styles.image} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Pressable
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={({ pressed }) =>
              pressed
                ? [styles.pressed, { alignSelf: "flex-start" }]
                : { alignSelf: "flex-start" }
            }
          >
            <Text>{item.author}</Text>
          </Pressable>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <ExpandableText text={item.content} style={styles.content} />
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
        <Text>dfafaf</Text>
      </View>
    </Pressable>
  );
});

export default ActivityRenderItem;

const styles = StyleSheet.create({
  pressableOut: {
    backgroundColor: Colors.white,
    padding: scale(5), // Dinamik padding
    paddingTop: verticalScale(10), // Yükseklik bazlı padding
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  contentContainer: { flexDirection: "row", gap: scale(5) }, // Gap değeri dinamik

  image: {
    width: scale(30), // Dinamik genişlik
    height: scale(30), // Dinamik yükseklik
  },
  title: {
    marginTop: verticalScale(2), // Yükseklik bazlı margin
    fontSize: scale(15), // Dinamik font büyüklüğü
    fontWeight: "500",
    marginBottom: verticalScale(5),
  },
  content: {
    fontSize: scale(12), // Dinamik font büyüklüğü
    marginBottom: verticalScale(5),
  },
  date: {
    alignSelf: "flex-end",
    marginBottom: verticalScale(5),
  },
  pressed: {
    opacity: 0.5,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.inputBackgroundWhite,
  },
});
