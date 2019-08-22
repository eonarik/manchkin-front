export default (classes) => {
  if (Array.isArray(classes)) {
    const newClasses = [];
    for (let i in classes) {
      const cls = classes[i];
      if (typeof cls === 'object') {
        for (let keyCls in cls) {
          cls[keyCls] && newClasses.push(keyCls);
        }
      } else {
        newClasses.push(cls);
      }
    }
    return newClasses.join(' ');
  }
  return classes;
}
