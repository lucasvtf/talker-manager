const fs = require('fs').promises;

const writeFile = async (path, content) => {
  try {
    await fs.writeFile(path, JSON.stringify(content, null, 2));
    return true;
   } catch (error) {
    console.error(`Arquivo não pode ser lido: ${error}`);
  }
};

module.exports = writeFile;