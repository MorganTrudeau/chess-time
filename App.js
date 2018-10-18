import React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import Clock from "./components/Clock";
import GameModeBar from "./components/GameModeBar";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWhiteClockActive: false,
      isBlackClockActive: false,
      initialWhiteTime: 120,
      initialBlackTime: 120,
      gameMode: "2|1",
      isEditing: false,
      newGame: true
    };
  }

  toggleWhiteClock = () => {
    if (!this.state.isBlackClockActive && !this.state.isWhiteClockActive) {
      this.setState({
        isWhiteClockActive: true,
        newGame: false
      });
    } else if (this.state.isWhiteClockActive) {
      this.toggleClocks();
    }
  };

  toggleBlackClock = () => {
    if (!this.state.isBlackClockActive && !this.state.isWhiteClockActive) {
      this.setState({
        isBlackClockActive: true,
        newGame: false
      });
    } else if (this.state.isBlackClockActive) {
      this.toggleClocks();
    }
  };

  toggleClocks = () => {
    this.setState({
      isWhiteClockActive: !this.state.isWhiteClockActive,
      isBlackClockActive: !this.state.isBlackClockActive
    });
  };

  setGameMode = type => {
    let whiteTime;
    let blackTime;
    switch (type) {
      case "2|1":
        whiteTime = 120;
        blackTime = 120;
        break;
      case "5|5":
        whiteTime = 300;
        blackTime = 300;
        break;
      case "10|15":
        whiteTime = 600;
        blackTime = 600;
        break;
      case "20":
        whiteTime = 1200;
        blackTime = 1200;
        break;
      case "custom":
        if (this.state.isEditing) {
          this.setState({
            isEditing: false
          });
        } else {
          this.setState({
            isEditing: true,
            initialWhiteTime: null,
            initialBlackTime: null,
            isWhiteClockActive: false,
            isBlackClockActive: false,
            gameMode: "custom",
            newGame: true
          });
        }
        return;
    }
    this.setState({
      initialWhiteTime: whiteTime,
      initialBlackTime: blackTime,
      isWhiteClockActive: false,
      isBlackClockActive: false,
      gameMode: type,
      isEditing: false,
      newGame: true
    });
  };

  render() {
    const {
      gameMode,
      isEditing,
      isWhiteClockActive,
      isBlackClockActive,
      newGame
    } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Clock
          initialTime={this.state.initialWhiteTime}
          textColor={"#000"}
          color={"#fff"}
          onPress={this.toggleWhiteClock}
          isActive={isWhiteClockActive}
          isEditing={isEditing}
          gameMode={gameMode}
          newGame={newGame}
          rotated={true}
        />
        <GameModeBar onPress={this.setGameMode} gameMode={gameMode} />
        <Clock
          initialTime={this.state.initialBlackTime}
          textColor={"#fff"}
          color={"#000"}
          onPress={this.toggleBlackClock}
          isActive={isBlackClockActive}
          isEditing={isEditing}
          gameMode={gameMode}
          newGame={newGame}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
