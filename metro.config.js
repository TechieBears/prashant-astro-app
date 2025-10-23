const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get default config
const defaultConfig = getDefaultConfig(__dirname);

// Remove 'svg' from assetExts and add it to sourceExts
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== "svg");
defaultConfig.resolver.sourceExts.push("svg");

// Add svg-transformer
defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

const config = mergeConfig(defaultConfig, {
  // Add any custom config here if needed
});

// Wrap with NativeWind
module.exports = withNativeWind(config, {
  input: "./global.css",
});