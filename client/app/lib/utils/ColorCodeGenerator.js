import * as UI from '../../common/constants/uiConstants';

const isSpecialCharacter = (asciiCode) => asciiCode < 65 || asciiCode > 90;

const charCodeStartPoint = 'A'.charCodeAt(0);
const colorCodes = Object.keys(UI.colors).map(key => UI.colors[key]);
const numColorCodes = colorCodes.length;

const asciiCodeToArrayIndex = (asciiCode) => {
  let index = asciiCode - charCodeStartPoint;

  while (index >= numColorCodes) {
    index -= numColorCodes;
  }

  return index;
};

const call = (character) => {
  const asciiCode = character.toUpperCase().charCodeAt(0);

  if (isSpecialCharacter(asciiCode)) {
    return null;
  }

  const colorCodeIndex = asciiCodeToArrayIndex(asciiCode);

  return colorCodes[colorCodeIndex];
};

module.exports = { call };
