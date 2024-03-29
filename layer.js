module.exports = class layer {
  constructor(height, width) {
    this.map = [];
    for (let i = 0; i < height; i++) {
      this.map.push(new Array(width).fill(0));
    }
  }
  getSum(data) {
    if (
      data.length != this.map.length ||
      data[0].length != this.map[0].length
    ) {
      console.log("Layer: Invalid Size of Input Data");
      return;
    }
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        sum += this.map[i][j] * data[i][j];
      }
    }
    return sum;
  }
  trainLayer(data, expectedOuputs, rate) {
    const outputs = [];
    for (let i = 0; i < data.length; i++) {
      outputs.push(this.getSum(data[i]));
    }
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        //FOR EACH CELL
        let temp = this.map[i][j];
        for (let k = 0; k < data.length; k++) {
          const element = data[k][i][j];
          if (element == 0) continue;
          //Reduce
          else if (outputs[k] > expectedOuputs[k]) {
            temp -= rate * element;
          }
          //Increase
          else if (outputs[k] < expectedOuputs[k]) {
            temp += rate * element;
          }
        }
        this.map[i][j] = temp;
      }
    }
  }
};
