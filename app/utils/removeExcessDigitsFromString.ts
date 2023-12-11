export function removeExcessDigitsFromString(convert: string) {
  let number = parseFloat(convert);
  if (!isNaN(number)) {
    let formattedNumber = number.toFixed(2);
    return formattedNumber;
  } else {
    return "";
  }
}
