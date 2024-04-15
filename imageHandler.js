const { Image } = require("image-js");
const fs = require("fs");

const openedImages = [];
module.exports = class ImageHandler {
  async loadFromImagePath(path) {
    this.image = await Image.load(path);
  }
  async resize(w, h) {
    this.image = this.image.resize({ width: w, height: h });
    await this.image.save("atemp.png");
  }
  toArray() {
    const array = [];
    for (let i = 0; i < this.image.height; i++) {
      array.push(new Array());
      for (let j = 0; j < this.image.width; j++) {
        array[i].push(this.image.getPixelXY(j, i));
      }
    }
    return array;
  }
};
