import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { scaleFontSize, formatTime, buildInitialTime } from "../utils";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newGame: true, time: 0, increment: "0" };
  }

  componentWillReceiveProps({
    isActive,
    initialTime,
    isEditing,
    gameMode,
    newGame
  }) {
    const { time, seconds, minutes, hours, increment } = this.state;
    if (this.props.isActive !== isActive) {
      if (isActive && time !== 0) {
        this.timer = setInterval(() => {
          if (this.state.time !== 0) {
            this.setState({ time: this.state.time - 1 });
          } else {
            clearInterval(this.timer);
          }
        }, 1000);
        if (!this.state.newGame) {
          this.setState({ time: time + increment });
        } else {
          this.setState({ newGame: false });
        }
      } else {
        clearInterval(this.timer);
      }
    }
    if (this.props.gameMode !== gameMode) {
      this.setIncrement(gameMode);
    }
    if (this.props.isEditing !== isEditing) {
      if (isEditing) {
        clearInterval(this.timer);
        this.setState({
          seconds: "00",
          minutes: "00",
          hours: "00",
          newGame: true
        });
      } else {
        this.setState({
          time: buildInitialTime(seconds, minutes, hours)
        });
      }
    }
    if (newGame && initialTime) {
      clearInterval(this.timer);
      this.setState({ time: initialTime, newGame: true });
    }
  }

  setIncrement = gameMode => {
    let increment = 0;
    switch (gameMode) {
      case "2|1":
        increment = 1;
        break;
      case "5|5":
        increment = 5;
        break;
      case "10|15":
        increment = 15;
        break;
    }
    this.setState({ increment });
  };

  render() {
    const {
      color,
      textColor,
      onPress,
      isEditing,
      rotated,
      isActive,
      newGame
    } = this.props;
    return isEditing ? (
      <View style={{ flex: 1, width: "100%", backgroundColor: color }}>
        <View style={styles.timeInputsContainer}>
          <TextInput
            style={[styles.timeInput, { color: textColor }]}
            onChangeText={hours => this.setState({ hours })}
            value={this.state.hours}
            maxLength={2}
            underlineColorAndroid={"transparent"}
          />
          <Text style={[styles.clockText, { color: textColor }]}>:</Text>
          <TextInput
            style={[styles.timeInput, { color: textColor }]}
            onChangeText={minutes => this.setState({ minutes })}
            value={this.state.minutes}
            maxLength={2}
            underlineColorAndroid={"transparent"}
          />
          <Text style={[styles.clockText, { color: textColor }]}>:</Text>
          <TextInput
            style={[styles.timeInput, { color: textColor }]}
            onChangeText={seconds => this.setState({ seconds })}
            value={this.state.seconds}
            maxLength={2}
            underlineColorAndroid={"transparent"}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
            marginTop: -50
          }}
        >
          <Text style={[{ color: textColor }, styles.incrementText]}>
            Increment:{" "}
          </Text>
          <TextInput
            style={[styles.incrementInput, { color: textColor }]}
            onChangeText={increment =>
              this.setState({
                increment: !isNaN(parseInt(increment))
                  ? parseInt(increment)
                  : increment
              })
            }
            value={this.state.increment.toString()}
            maxLength={3}
            underlineColorAndroid={"transparent"}
          />
        </View>
      </View>
    ) : (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            styles.clockContainer,
            { backgroundColor: isActive || newGame ? color : "#b3b3b3" },
            rotated ? { transform: [{ rotate: "180deg" }] } : {}
          ]}
        >
          <Text style={[styles.clockText, { color: textColor }]}>
            {formatTime(this.state.time)}
          </Text>
          {/*{!isActive && !newGame ? (*/}
          {/*<View*/}
          {/*style={{*/}
          {/*position: "absolute",*/}
          {/*width: "100%",*/}
          {/*height: "100%",*/}
          {/*backgroundColor: "rgba(0,0,0,0.1)"*/}
          {/*}}*/}
          {/*/>*/}
          {/*) : null}*/}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  timeInputsContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  timeInput: {
    width: "28%",
    fontSize: scaleFontSize(80),
    fontWeight: "bold",
    textAlign: "center"
  },
  incrementInput: { width: 40, fontSize: scaleFontSize(22) },
  incrementText: { fontSize: scaleFontSize(22) },
  clockContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  clockText: { fontWeight: "bold", fontSize: scaleFontSize(80) }
});
