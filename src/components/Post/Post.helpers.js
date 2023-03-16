export const changeWordEnding = (num, wordForOneItem, wordForTwoItems, wordForFiveItems) => {
  let remain10 = num % 10;
  let remain100 = num % 100;

  if (remain10 === 1) return wordForOneItem;

  if (remain10 >= 2 && remain10 <= 4) return wordForTwoItems;

  if (remain100 >= 5 && remain100 <= 20) return wordForFiveItems;

  return wordForFiveItems;
};
