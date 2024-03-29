module.exports = class Transformer {
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
  seperateAlphabets() {
    this.alphabets = [];
    let dat = { end: 0 };
    do {
      dat = this.getAlphabetStartingAt(dat.end);
      this.alphabets.push(dat.alphabet);
      //this.printAlphabetMatrix(dat.alphabet);
    } while (dat.end < this.imageArray[0].length - 10);
    return this.alphabets;
  }
  printAlphabetMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      let str = "";
      for (let j = 0; j < matrix[0].length; j++) {
        str += matrix[i][j] >= 1 ? "@" : " ";
      }
      console.log(str);
    }
  }
  getAlphabetStartingAt(start) {
    const sumOfColumns = [];
    const height = this.imageArray.length;
    for (let i = start; i < start + 100 && i < this.imageArray[0].length; i++) {
      let sum = 0;
      for (let j = 0; j < height; j++) {
        sum += this.imageArray[j][i];
      }
      sumOfColumns.push(sum);
    }
    let startX, endX;
    for (let i = 0; i < sumOfColumns.length; i++) {
      if (sumOfColumns[i] > 1) {
        startX = i;
        break;
      }
    }
    for (let i = startX + 1; i < sumOfColumns.length; i++) {
      if (
        sumOfColumns[i] < 1 &&
        sumOfColumns[i + 1] < 1 &&
        sumOfColumns[i + 2] < 1 &&
        sumOfColumns[i + 3] < 1
      ) {
        endX = i;
        break;
      }
    }

    let ret = [];
    for (let i = 0; i < 15; i++) {
      ret.push(this.imageArray[i].slice(startX + start, start + startX + 13));
    }
    return { alphabet: ret, end: endX + start + 2 };
  }
};
