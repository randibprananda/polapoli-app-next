const colors = {
  primary: '#393885',
  rose: '#FB3B6F',
  logan: '#A8ACCC',
  viola: '#C995B8',
  success: '#5FC790',
  warning: '#FFA600',
  danger: '#FF5630',
  dark: '#2E3A44',
  info: '#1CA7EC',
  black: '#2E3A44',
  grey1: '#A0AABF',
  grey2: '#C0C6D4',
  grey3: '#E3E8F1',
  light: '#F9FBFC',
  white: '#FFF'
};

function lightOrDark(color: any) {
  let r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return 'light';
  } else {
    return 'dark';
  }
}

function textLightOrDark(color: string) {
  return lightOrDark(color) === 'light' ? colors.dark : colors.white;
}

function textIsLight(color: string) {
  return lightOrDark(color) === 'dark';
}

export { colors, lightOrDark, textLightOrDark, textIsLight };
