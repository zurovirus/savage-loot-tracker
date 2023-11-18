export function removeSpecialCharacters(input) {
  // Define a regular expression to match special characters
  const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;

  // Replace special characters with an empty string
  const cleanedInput = input.replace(regex, "");

  return cleanedInput;
}
