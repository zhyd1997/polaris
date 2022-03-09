// Keep in sync with polaris-react/src/tokens/tokens.ts imports
const depth = require('../src/tokens/token-groups/depth.json');
const legacyTokens = require('../src/tokens/token-groups/legacy-tokens.json');
const darkColorScheme = require('../src/tokens/token-groups/color.dark.json');
const lightColorScheme = require('../src/tokens/token-groups/color.light.json');
const motion = require('../src/tokens/token-groups/motion.json');
const shape = require('../src/tokens/token-groups/shape.json');
const spacing = require('../src/tokens/token-groups/spacing.json');
const typography = require('../src/tokens/token-groups/typography.json');
const zIndex = require('../src/tokens/token-groups/z-index.json');

const allTokens = {
  depth,
  legacyTokens,
  darkColorScheme,
  lightColorScheme,
  motion,
  shape,
  spacing,
  typography,
  zIndex,
};

/**
 * Updates token-group (keys) names to Polaris custom properties.
 *
 * @example
 * mapTokenNamesToCustomProperties({ text: '' }) // { '--p-text': '' }
 */
function mapTokenNamesToCustomProperties(tokenGroup) {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(([tokenName, tokenValue]) => [
      `--p-${tokenName}`,
      tokenValue,
    ]),
  );
}

/**
 * Retrieves custom properties for a given token-group.
 * If no token-group is provided, all custom properties are returned.
 *
 * @example
 * getCustomPropertyNames() // {'--p-background': '', '--p-text': '' }
 * getCustomPropertyNames('depth') // {'--p-shadow-faint': '', '--shadow-base': '' }
 */
function getCustomProperties(tokenGroupName) {
  if (tokenGroupName && !(tokenGroupName in allTokens)) {
    throw new Error('Invalid token group name');
  }

  return mapTokenNamesToCustomProperties(
    allTokens[tokenGroupName] || Object.assign({}, ...Object.values(allTokens)),
  );
}

/**
 * Retrieves a list of custom property names for a given token-group.
 * If no token-group is provided, all custom property names are returned.
 *
 * @example
 * getCustomPropertyNames() // ['--p-background', '--p-text']
 * getCustomPropertyNames('depth') // ['--p-shadow-faint', '--shadow-base']
 */
function getCustomPropertyNames(tokenGroupName) {
  return Array.from(new Set(Object.keys(getCustomProperties(tokenGroupName))));
}

module.exports.getCustomProperties = getCustomProperties;
module.exports.getCustomPropertyNames = getCustomPropertyNames;
