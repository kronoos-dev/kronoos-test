function factoryNum(n, l) {
  return Array.from(Array(l))
    .map(() => n)
    .join("");
}
module.exports = factoryNum;
