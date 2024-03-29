const Model = require("./Model");
const Vector = require("./vector");
function start() {
  const modelX = new Model(4, 3, 5);
  const vec = new Vector(5);
  const vec2 = new Vector(5);
  const vec3 = new Vector(5);

  vec.distancesOnAxes = [2, 2, 2, 9, 2];
  vec2.distancesOnAxes = [2, 2, 9, 2, 2];
  vec3.distancesOnAxes = [2, 9, 2, 2, 2];
  const a = [
    [0, 2, 0],
    [0, 2, 0],
    [0, 2, 0],
    [0, 2, 0],
  ];
  const b = [
    [2, 2, 2],
    [0, 0, 2],
    [0, 0, 2],
    [2, 2, 2],
  ];
  const c = [
    [2, 2, 2],
    [2, 0, 2],
    [2, 0, 2],
    [2, 2, 2],
  ];
  const vecx = [vec, vec2, vec3];
  for (let i = 0; i < 500; i++) modelX.trainForSet([a, b, c], vecx, 0.01);
  console.log(modelX.runOn(a).findDistanceAmong(vecx));

  console.log(modelX.runOn(b).findDistanceAmong(vecx));
  console.log(modelX.runOn(c).findDistanceAmong(vecx));

  console.log(modelX.runOn(a));

  console.log(modelX.runOn(b));
  console.log(modelX.runOn(c));
}
start();

const Model = require("./Model");
const Vector = require("./vector");
const ImageHandler = require("./imageHandler");
const Transformer = require("./Transformer");
async function test2(model) {
  const ih = new ImageHandler();
  await ih.loadFromImagePath("./traningData/abcd2.png");
  ih.resize(520, 18);
  const array = ih.toArray();
  const trans = new Transformer(array);
  trans.convertToBinary();
  alphabets = trans.seperateAlphabets();
  console.log(alphabets.length);
  console.log(alphabets[0].length, alphabets[0][0].length);
  console.log(model.runOn(alphabets[5]));
  console.log(model.runOn(alphabets[25]).distancesOnAxes[25]);
}
async function start() {
  const modelX = new Model(18, 13, 26);

  const ih = new ImageHandler();
  await ih.loadFromImagePath("./traningData/abcd1.png");
  ih.resize(520, 18);
  const array = ih.toArray();
  const trans = new Transformer(array);
  trans.convertToBinary();
  alphabets = trans.seperateAlphabets();
  console.log(alphabets.length);
  console.log(alphabets[0].length, alphabets[0][0].length);
  /*const a = [
    [1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
  ];*/

  /*const b = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  const d = [
    [0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 1],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0],
  ];

  const c = [
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
  ];*/

  const vecx = [];
  for (let i = 0; i < 26; i++) {
    vecx[i] = new Vector(26);
    for (let j = 0; j < 26; j++) {
      vecx[i].distancesOnAxes[j] = 2;
      if (j == i) vecx[i].distancesOnAxes[j] = 90;
    }
  }
  let rate = 0.001;
  console.log("traning started");
  modelX.train(alphabets, vecx, rate, -0.00000005, 2000);
  console.log("traning ended");

  /*console.log(
    modelX.runOn(a).findDistanceAmong(vecx)
  );

  console.log(
    modelX.runOn(b).findDistanceAmong(vecx),
  );
  console.log(
    modelX.runOn(c).findDistanceAmong(vecx),
  );
  
*/ for (let i = 0; i < 26; i++)
    console.log(modelX.runOn(alphabets[i]).findDistanceAmong(vecx)[i]);

  test2(modelX);
}
start();
