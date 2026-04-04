// Placeholder for logo generation
// Can integrate Stability AI or Replicate later

const generateLogoPrompt = (brandKit) => {
  return brandKit.logoPrompt || `Minimal modern logo for ${brandKit.brandName}`;
};

module.exports = { generateLogoPrompt };