function getParent(el, sel) {
  if ((el.matches || el.matchesSelector).call(el,sel)) {
    return el;
  };
  while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
  return el;
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
