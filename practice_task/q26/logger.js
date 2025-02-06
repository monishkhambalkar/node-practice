const fs = require("fs");
const path = require("path");
class Logger {
  constructor(logFilePath = "server.log") {
    this.logFilePath = path.join(__dirname, logFilePath);
  }

  _writeLog(level, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} \n`;

    // Print to console
    console[level](logMessage.trim());

    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) console.error("Failed to write log:", err);
    });
  }

  info(message) {
    this._writeLog("info", message);
  }

  warn(message) {
    this._writeLog("warn", message);
  }

  error(message) {
    this._writeLog("error", message);
  }
}

module.exports = new Logger();
