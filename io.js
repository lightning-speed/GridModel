const fs = require("fs").promises;
const Model = require("./Model");

module.exports = class IO {
  static async saveModelToFile(model, file) {
    const object = {
      height: model.height,
      width: model.width,
      number_of_layers: model.number_of_layers,
      layers: model.layers,
    };
    //Save to file object
    await fs.writeFile(file, JSON.stringify(object));
  }
  static async loadModelFromFile(file) {
    try {
      // Read the file asynchronously
      const data = await fs.readFile(file);

      // Parse the JSON data
      const jsonData = JSON.parse(data);
      const model = new Model(
        jsonData.height,
        jsonData.width,
        jsonData.number_of_layers,
      );
      for (let i = 0; i < jsonData.number_of_layers; i++)
        model.layers[i].map = jsonData.layers[i].map;
      return model;
    } catch (error) {
      // Handle errors
      console.error("Error reading JSON file:", error);
      throw error;
    }
  }
};
