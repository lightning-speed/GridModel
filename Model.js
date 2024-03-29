const Vector = require("./vector");
const Layer = require("./layer");

module.exports = class Model {
  constructor(height, width, number_of_layers) {
    this.height = height;
    this.width = width;
    this.number_of_layers = number_of_layers;
    this.create();
  }
  create() {
    this.layers = [];
    for (let i = 0; i < this.number_of_layers; i++) {
      this.layers.push(new Layer(this.height, this.width));
    }
  }
  runOn(data) {
    if (data.length != this.height || data[0].length != this.width) {
      console.log("Model: Invalid Size of Input Data");
    }
    let outputVector = new Vector(this.number_of_layers);
    for (let i = 0; i < this.number_of_layers; i++) {
      outputVector.distancesOnAxes[i] = this.layers[i].getSum(data);
    }
    return outputVector;
  }

  trainForSet(dataset, vectorset, rateToEdit) {
    const vecLen = vectorset[0].distancesOnAxes.length;
    for (let i = 0; i < vecLen; i++) {
      const outputsForThisLayer = [];
      //COLLECTING OUTPUT FOR EACH LAYER
      for (let j = 0; j < vectorset.length; j++) {
        outputsForThisLayer.push(vectorset[j].distancesOnAxes[i]);
      }
      this.layers[i].trainLayer(dataset, outputsForThisLayer, rateToEdit);
    }
  }
  train(dataset, vectorset, rate, increaseInRate, iterations) {
    const vecLen = vectorset[0].distancesOnAxes.length;
    for (let i = 0; i < vecLen; i++) {
      const outputsForThisLayer = [];
      //COLLECTING OUTPUT FOR EACH LAYER
      for (let j = 0; j < vectorset.length; j++) {
        outputsForThisLayer.push(vectorset[j].distancesOnAxes[i]);
      }
      const d = new Date().getTime();
      for (let it = 0; it < iterations; it++) {
        this.layers[i].trainLayer(
          dataset,
          outputsForThisLayer,
          rate + increaseInRate * it,
        );
      }
      console.log(
        "Layer Trained: " + (i + 1),
        "\nIn Time: " + (new Date().getTime() - d) / 1000,
      );
    }
  }
};
