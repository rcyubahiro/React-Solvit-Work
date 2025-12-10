// Take this array of prices, add 10% tax to each, round to 2 decimal places, and return 
//the updated array:
const prices = [100, 50, 99,200,20.5];
const updatedPrices = prices.map(price => 
  Number((price * 1.1).toFixed(2)) // 10% of P = 0.10 * P , Total price with tax = original price + 10% of price:Total=P+0.10×P, Factor out P: Total=P×(1+0.10)=P×1.1
);

console.log(updatedPrices);


