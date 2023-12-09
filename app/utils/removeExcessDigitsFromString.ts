export function removeExcessDigitsFromString(convert: string) {
  let number = parseFloat(convert);
  if (!isNaN(number)) {
    let formattedNumber = number.toFixed(4);
    return formattedNumber;
  } else {
    return "";
  }
}
