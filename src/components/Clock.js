import React, {createRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {scaleFontSize, formatTime, buildInitialTime} from '../utils';

export default class Clock extends React.Component {
  incrementInput = createRef();

  constructor(props) {
    super(props);
    this.state = {
      time: 120,
      increment: '1',
      newGame: false,
      seconds: '00',
      minutes: '00',
      hours: '00',
    };
  }

  // componentWillReceiveProps({
  //   isActive,
  //   initialTime,
  //   isEditing,
  //   gameMode,
  //   newGame,
  // }) {
  //   const {time, seconds, minutes, hours, increment} = this.state;
  //   if (this.props.isActive !== isActive) {
  //     if (isActive && time !== 0) {
  //       this.timer = setInterval(() => {
  //         if (this.state.time !== 0) {
  //           this.setState({time: this.state.time - 1});
  //         } else {
  //           clearInterval(this.timer);
  //         }
  //       }, 1000);
  //       if (!this.state.newGame) {
  //         this.setState({time: time + parseInt(increment)});
  //       } else {
  //         this.setState({newGame: false});
  //       }
  //     } else {
  //       clearInterval(this.timer);
  //     }
  //   }
  //   if (this.props.gameMode !== gameMode) {
  //     this.setIncrement(gameMode);
  //   }
  //   if (this.props.isEditing !== isEditing) {
  //     if (isEditing) {
  //       clearInterval(this.timer);
  //       this.setState({
  //         seconds: '00',
  //         minutes: '00',
  //         hours: '00',
  //         newGame: true,
  //       });
  //     } else {
  //       this.setState({
  //         time: buildInitialTime(seconds, minutes, hours),
  //       });
  //     }
  //   }
  //   if (newGame && initialTime) {
  //     clearInterval(this.timer);
  //     this.setState({time: initialTime, newGame: true});
  //   }
  // }

  componentDidUpdate({isActive, initialTime, isEditing, gameMode, newGame}) {
    const {time, seconds, minutes, hours, increment} = this.state;
    if (this.props.isActive !== isActive) {
      if (this.props.isActive) {
        this.setState({time: time + parseInt(increment)});
        this.timer = setInterval(() => {
          if (this.state.time !== 0) {
            this.setState({time: this.state.time - 1});
          } else {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      } else {
        clearInterval(this.timer);
      }
    }

    if (this.props.isEditing !== isEditing) {
      if (this.props.isEditing) {
        clearInterval(this.timer);
        this.setState({
          seconds: '00',
          minutes: '00',
          hours: '00',
          increment: '0',
        });
      } else {
        this.setState({
          time: buildInitialTime(seconds, minutes, hours),
        });
      }
    }
    if (
      gameMode !== this.props.gameMode ||
      initialTime !== this.props.initialTime ||
      (!newGame && this.props.newGame)
    ) {
      clearInterval(this.timer);
      this.setState({time: this.props.initialTime, newGame: true});
      this.setIncrement(this.props.gameMode);
    }
  }

  setIncrement = gameMode => {
    let increment = 0;
    switch (gameMode) {
      case '2|1':
        increment = 1;
        break;
      case '5|5':
        increment = 5;
        break;
      case '10|15':
        increment = 15;
        break;
    }
    this.setState({increment});
  };

  validNumber = time => {
    const regex = /[0-9]$/g;
    return time === '' || regex.test(time);
  };

  render() {
    const {color, textColor, onPress, isEditing, rotated, isActive, newGame} =
      this.props;
    return isEditing ? (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        enabled={true}
        behavior={'padding'}>
        <View style={styles.timeInputsContainer}>
          <TextInput
            style={[styles.timeInput, {color: textColor}]}
            onChangeText={hours => {
              if (this.validNumber(hours)) {
                this.setState({hours});
              }
            }}
            value={this.state.hours}
            maxLength={2}
            underlineColorAndroid={'transparent'}
            allowFontScaling={false}
            onFocus={() => {
              this.setState({hours: ''});
            }}
            onBlur={() => {
              const {hours} = this.state;
              if (hours === '' || hours === '0' || hours === '00') {
                this.setState({hours: '00'});
              }
            }}
            keyboardType="number-pad"
          />
          <Text style={[styles.clockText, {color: textColor}]}>:</Text>
          <TextInput
            style={[styles.timeInput, {color: textColor}]}
            onChangeText={minutes => {
              if (this.validNumber(minutes)) {
                this.setState({minutes});
              }
            }}
            value={this.state.minutes}
            maxLength={2}
            underlineColorAndroid={'transparent'}
            allowFontScaling={false}
            onFocus={() => {
              this.setState({minutes: ''});
            }}
            onBlur={() => {
              const {minutes} = this.state;
              if (minutes === '' || minutes === '0' || minutes === '00') {
                this.setState({minutes: '00'});
              }
            }}
            keyboardType="number-pad"
          />
          <Text style={[styles.clockText, {color: textColor}]}>:</Text>
          <TextInput
            style={[styles.timeInput, {color: textColor}]}
            onChangeText={seconds => {
              if (this.validNumber(seconds)) {
                this.setState({seconds});
              }
            }}
            value={this.state.seconds}
            maxLength={2}
            underlineColorAndroid={'transparent'}
            allowFontScaling={false}
            onFocus={() => {
              this.setState({seconds: ''});
            }}
            onBlur={() => {
              const {seconds} = this.state;
              if (seconds === '' || seconds === '0' || seconds === '00') {
                this.setState({seconds: '00'});
              }
            }}
            keyboardType="number-pad"
          />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.incrementInput.current?.focus();
          }}
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[{color: textColor}, styles.incrementText]}>
            Increment:{' '}
          </Text>
          <TextInput
            ref={this.incrementInput}
            style={[styles.incrementInput, {color: textColor}]}
            onChangeText={increment => {
              if (this.validNumber(increment)) {
                this.setState({
                  increment: increment,
                });
              }
            }}
            value={this.state.increment.toString()}
            maxLength={3}
            underlineColorAndroid={'transparent'}
            allowFontScaling={false}
            onFocus={() => {
              this.setState({increment: ''});
            }}
            onBlur={() => {
              const {increment} = this.state;
              if (
                increment === '' ||
                increment === '00' ||
                increment === '000'
              ) {
                this.setState({increment: '0'});
              }
            }}
            keyboardType="number-pad"
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    ) : (
      <TouchableWithoutFeedback
        onPress={
          this.state.time !== 0 &&
          (this.props.isActive || (newGame && color === '#fff'))
            ? onPress
            : null
        }>
        <View
          style={[
            styles.clockContainer,
            {
              backgroundColor: isActive || newGame ? color : '#b3b3b3',
            },
            this.state.time === 0 ? {backgroundColor: '#ff0000'} : {},
          ]}>
          <Text
            style={[
              styles.clockText,
              {color: textColor},
              rotated ? {transform: [{rotate: '180deg'}]} : {},
            ]}>
            {formatTime(this.state.time)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  timeInputsContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeInput: {
    width: '28%',
    fontSize: scaleFontSize(75),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  incrementInput: {fontSize: scaleFontSize(22)},
  incrementText: {fontSize: scaleFontSize(22)},
  clockContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockText: {fontWeight: 'bold', fontSize: scaleFontSize(80)},
});
