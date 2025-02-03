import { useState } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  Modal,
  View,
  ScrollView,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export default function illuminationText({ touched, errors }) {
  const [isGotoIlluminationText, setIsGoToIlluminationText] = useState(false);

  function gotoIlluminationText() {
    setIsGoToIlluminationText(!isGotoIlluminationText);
  }

  return (
    <>
      <Pressable
        style={({ pressed }) => (pressed ? [styles.pressed] : "")}
        onPress={gotoIlluminationText}
      >
        <Text
          style={[
            touched && errors
              ? { color: "red", textDecorationLine: "underline" }
              : { textDecorationLine: "underline" },
          ]}
        >
          Aydınlatma metnini
        </Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isGotoIlluminationText}
        onRequestClose={() => {
          setIsGoToIlluminationText(!isGotoIlluminationText);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.modalText}>
                {/* Add your content here */}
                bu bir aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...bu bir
                aydınlatma metnidir...bu bir aydınlatma metnidir...
              </Text>
            </ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsGoToIlluminationText(!isGotoIlluminationText)}
            >
              <Text style={styles.textStyle}>Kapat</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(22),
  },
  modalView: {
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(35),
    backgroundColor: "white",
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(5),
  },
  button: {
    marginTop: verticalScale(20),
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    elevation: moderateScale(2),
  },
  buttonOpen: {
    backgroundColor: Colors.inputBackgroundWhite,
  },
  buttonClose: {
    backgroundColor: Colors.blue,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: moderateScale(16),
  },
  modalText: {
    marginBottom: verticalScale(15),
    textAlign: "center",
    fontSize: moderateScale(14),
  },
});
