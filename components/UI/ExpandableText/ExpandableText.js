import { useState, useRef, useEffect } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  Animated,
  LayoutAnimation,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import Hyperlink from "react-native-hyperlink";

const ExpandableText = ({ style, text, maxLines = 3 }) => {
  const [showMore, setShowMore] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleShowMore = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowMore(!showMore);
  };

  const onTextLayout = (e) => {
    const lines = e.nativeEvent.lines;
    setIsTextTruncated(lines.length > maxLines);

    // Tam metin yüksekliğini hesapla
    if (lines.length > 0) {
      const fullHeight = lines.reduce((total, line) => total + line.height, 0);
      setTextHeight(fullHeight);
    }
  };

  return (
    <>
      <Hyperlink
        linkDefault={true}
        linkStyle={{ color: "blue", textDecorationLine: "underline" }}
      >
        <Text
          style={[style, { overflow: "hidden" }]}
          numberOfLines={showMore ? undefined : maxLines}
          onTextLayout={onTextLayout}
        >
          {text}
        </Text>
      </Hyperlink>

      {isTextTruncated && (
        <Pressable
          onPress={toggleShowMore}
          hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
        >
          <Text style={styles.showMoreText}>
            {showMore ? "Küçült" : "Devamı"}
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
    fontSize: 16,
  },
});

export default ExpandableText;
