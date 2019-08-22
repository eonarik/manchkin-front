export default (min = 0, max = 100, type = 'float') => {
  const num = Math.random() * (max - min) + min;
  switch (type) {
    case 'int':
      return parseInt(num);
    case 'float':
    default:
      return num;
  }
}
