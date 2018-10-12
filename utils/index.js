import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export function scaleFontSize(size) {
  return size * (width / 380);
}

function pad(num) {
  return ("0" + num).slice(-2);
}
export function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return (
    (hours > 0 ? pad(hours) + ":" + pad(minutes) : minutes) + ":" + pad(seconds)
  );
}

export function buildInitialTime(secs, mins, hours) {
  return parseInt(secs) + parseInt(mins) * 60 + parseInt(hours) * 3600;
}
