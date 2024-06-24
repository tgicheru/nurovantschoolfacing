export const AllNationsCode = [
  {
    label: "🇺🇸 United States",
    value: "+1",
    code: "US",
    emoji: "🇺🇸",
    new_field: "United States",
  },

  {
    label: "🇨🇦 Canada",
    value: "+1",
    code: "CA",
    emoji: "🇨🇦",
    new_field: "Canada",
  },

  {
    label: "🇳🇬 Nigeria",
    value: "+234",
    code: "NG",
    emoji: "🇳🇬",
    new_field: "Nigeria",
  },
];

export const extractAvatar = (name: string) => {
  const splitName = name?.split(" ");
  if (splitName.length === 1) return splitName[0].charAt(0).toUpperCase();
  const firstLetter = splitName?.[0]?.charAt(0);
  const secondLetter = splitName?.[1]?.charAt(0);
  return `${firstLetter}${secondLetter}`;
};

export const transformText = (
  input: string,
  textToReplace: string,
  newText: string
) => {
  // Create a regular expression using the textToReplace variable
  const regex = new RegExp(`\\b${textToReplace}\\b`, "gi");
  // Use the regular expression to replace textToReplace with newText, case insensitive
  return input.replace(regex, newText);
};
