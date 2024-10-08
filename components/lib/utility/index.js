// Removes special characters from a string.
export function removeSpecialCharacters(input) {
  const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;

  const cleanedInput = input.replace(regex, "");

  return cleanedInput;
}

// Responsible for changing the colors based off the class id.
export function classColorText(classId) {
  if (classId >= 1 && classId <= 4) {
    return "bg-blue-800";
  } else if (classId >= 5 && classId <= 8) {
    return "bg-green-700";
  } else {
    return "bg-red-800";
  }
}
