const moneyRegex = new RegExp(/(\d+\.\d{1,2}$)/);

export default function regexMoney(value) {
  return moneyRegex.test(value);
}
