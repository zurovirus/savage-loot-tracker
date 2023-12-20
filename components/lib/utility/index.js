export function removeSpecialCharacters(input) {
  // Define a regular expression to match special characters
  const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;

  // Replace special characters with an empty string
  const cleanedInput = input.replace(regex, "");

  return cleanedInput;
}

export function classColorText(classId) {
  if (classId >= 1 && classId <= 4) {
    return "text-blue-500";
  } else if (classId >= 5 && classId <= 9) {
    return "text-green-500";
  } else {
    return "text-red-500";
  }
}
