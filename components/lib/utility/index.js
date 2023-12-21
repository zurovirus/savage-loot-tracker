export function removeSpecialCharacters(input) {
  // Define a regular expression to match special characters
  const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;

  // Replace special characters with an empty string
  const cleanedInput = input.replace(regex, "");

  return cleanedInput;
}

export function classColorText(classId) {
  if (classId >= 1 && classId <= 4) {
    return "bg-blue-800";
  } else if (classId >= 5 && classId <= 9) {
    return "bg-green-700";
  } else {
    return "bg-red-900";
  }
}
