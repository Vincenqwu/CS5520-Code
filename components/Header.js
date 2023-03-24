import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Platform,
} from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Header({ appName }) {
  const { height, width } = useWindowDimensions();
  const paddingVerticalDynamic = height < 400 ? 0 : 5;
  const marginVerticalDynamic = height < 400 ? 5 : 0;
  return (
    <View>
      <Text
        style={[
          styles.header,
          {
            paddingVertical: paddingVerticalDynamic,
            marginTop: marginVerticalDynamic,
          },
        ]}
      >
        Welcome to {appName}{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "purple",
    borderColor: "rebeccapurple",
    borderWidth: Platform.OS === "ios" ? 2 : 6,
    // borderWidth: Platform.select({
    //   android: 4,
    //   ios: 2,
    //   default: 0,
    // }),
    padding: 5,
    fontSize: windowWidth > 380 ? 24 : 16,
    width: 350,
    maxWidth: "80%",
  },
});