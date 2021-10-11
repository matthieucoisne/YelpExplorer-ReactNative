export const getRatingImage = (rating: number) => {
  switch (rating) {
    case 5:
      return require('../../../../assets/stars_small_5.png');
    case 4.5:
      return require('../../../../assets/stars_small_4_half.png');
    case 4:
      return require('../../../../assets/stars_small_4.png');
    case 3.5:
      return require('../../../../assets/stars_small_3_half.png');
    case 3:
      return require('../../../../assets/stars_small_3.png');
    case 2.5:
      return require('../../../../assets/stars_small_2_half.png');
    case 2:
      return require('../../../../assets/stars_small_2.png');
    case 1.5:
      return require('../../../../assets/stars_small_1_half.png');
    case 1:
      return require('../../../../assets/stars_small_1.png');
    default:
      return require('../../../../assets/stars_small_0.png');
  }
};

export const formatPriceAndCategories = (price: string, categories: string[]) => {
  let separator: string;
  if (price && price.trim() !== '' && categories.length > 0) {
    separator = '\u0020\u0020\u2022\u0020\u0020'; // "  •  "
  } else {
    separator = '';
  }
  return `${price}${separator}${categories.join(', ')}`; // "$$  •  Sushi, Poke"
};
