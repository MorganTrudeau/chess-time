import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import React from "react";
import { scaleFontSize } from "../utils";

const GameModeBar = ({ onPress, gameMode }) => (
  <View style={styles.timeSetBarContainer}>
    <TouchableOpacity
      onPress={() => onPress("2|1")}
      style={[
        styles.timeSetButton,
        gameMode === "2|1" ? { backgroundColor: "#4d4d4d" } : {}
      ]}
    >
      <Text style={styles.timeSetText}>2 | 1</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress("5|5")}
      style={[
        styles.timeSetButton,
        gameMode === "5|5" ? { backgroundColor: "#4d4d4d" } : {}
      ]}
    >
      <Text style={styles.timeSetText}>5 | 5</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress("10|15")}
      style={[
        styles.timeSetButton,
        gameMode === "10|15" ? { backgroundColor: "#4d4d4d" } : {}
      ]}
    >
      <Text style={styles.timeSetText}>10 | 15</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress("20")}
      style={[
        styles.timeSetButton,
        gameMode === "20" ? { backgroundColor: "#4d4d4d" } : {}
      ]}
    >
      <Text style={styles.timeSetText}>20</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress("custom")}
      style={[
        styles.timeSetButton,
        { borderRightWidth: 0 },
        gameMode === "custom" ? { backgroundColor: "#4d4d4d" } : {}
      ]}
    >
      <Text style={styles.timeSetText}>Custom</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  timeSetBarContainer: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    backgroundColor: "#808080",
    justifyContent: "center"
  },
  timeSetButton: {
      flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 10
  },
  timeSetText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: scaleFontSize(18)
  }
});

export default GameModeBar;
