import { useState } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
import Hyperlink from "react-native-hyperlink";

const ExpandableText = ({ style, text, maxLength = 250 }) => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const fullText = text;
  const smallText =
    text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
  return (
    <>
      <Hyperlink
        linkDefault={true}
        linkStyle={{ color: "blue", textDecorationLine: "underline" }}
      >
        <Text style={style}>{showMore ? fullText : smallText}</Text>
      </Hyperlink>

      {text.length > maxLength && (
        <Pressable
          onPress={toggleShowMore}
          hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
        >
          <Text style={styles.showMoreText}>
            {showMore ? "Daha Az Göster" : "Daha Fazla"}
          </Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  showMoreText: {
    color: Colors.black,
    marginTop: 5,
  },
});

export default ExpandableText;
