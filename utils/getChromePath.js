const os = require("os");

function getChromeExecutablePath() {
  const platform = os.platform();

  if (platform === "win32") {
    return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  }

  if (platform === "linux") {
    return "/usr/bin/google-chrome"; // Confirmed for Ubuntu
  }

  throw new Error("Unsupported platform: " + platform);
}

module.exports = getChromeExecutablePath;
