const fs = require("fs");
const chalk = require("chalk");

const AsciiTable = require("ascii-table");
const table = new AsciiTable().setHeading("Buttons", "Stats").setBorder("|", "=", "0", "0");

module.exports = (client) => {
  const buttonFiles = fs.readdirSync(`./buttons/`).filter((file) => file.endsWith(".js"));
  for (const file of buttonFiles) {
    const buttonI = require(`../buttons/${file}`);
    if (buttonI.name) {
      client.buttonInteractions.set(buttonI.name, buttonI);
      table.addRow(file.split(".js")[0], "✅");
    } else {
      table.addRow(file.split(".js")[0], "⛔");
    }
  }
  console.log(chalk.yellow(table.toString()));
};
