Array.prototype.includeRoute = function ({to, name}) {
  return this.includes(to) || this.includes(name);
};
