module.exports = class Trans {
  constructor(imageArray) {
    this.imageArray = imageArray;
  }
  convertToBinary() {
    let finalArray = [];
    for (let i = 0; i < this.imageArray.length; i++) {
      finalArray.push(new Array());
      for (let j = 0; j < this.imageArray[0].length; j++) {
        const pixel = this.imageArray[i][j];
        finalArray[i].push(
          parseInt((255 - (pixel[0] + pixel[1] + pixel[2]) / 3) / 50),
        );
      }
    }
    this.imageArray = finalArray;
  }
  moveDownBy(x, y) {
    const outputArray = [];
    for (let i = y; i < this.imageArray.length + y; i++) {
      outputArray.push([]);

      for (let j = x; j < this.imageArray[0].length + x; j++) {
        if (
          j > 0 &&
          j < this.imageArray[0].length &&
          i < this.imageArray.length &&
          i >= 0
        )
          outputArray[i - y].push(this.imageArray[i][j]);
        else outputArray[i - y].push(0);
      }
    }
    this.imageArray = outputArray;
  }
  printAlphabetMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      let str = "";
      for (let j = 0; j < matrix[0].length; j++) {
        str += matrix[i][j] >=1 ? '@' : ' ';
      }
      console.log(str);
    }
  }
};
