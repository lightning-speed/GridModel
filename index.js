const Model = require("./Model");
const Vector = require("./vector");
const ImageHandler = require("./imageHandler");
const Trans = require("./Trans");

const IO = require("./io");
const TraningBase = [];
const TraningVector = [];
async function start() {
  //const modelX = new Model(16, 16, 3);
  const modelX = await IO.loadModelFromFile("./model2.json");
  for (let i = 0; i < 8000; i++) {
    await addToTraningData("O");
    await addToTraningData("E");
    await addToTraningData("A");
  }

  let rate = 0.012;
  console.log("traning started");
  modelX.train(TraningBase, TraningVector, rate, -0.00000005, 8000);
  IO.saveModelToFile(modelX, "./model2.json");
  console.log("traning ended");
  let score = 0;
  for (let i = 0; i < 200; i++) {
    score += await testOnModel("A", modelX);
    score += await testOnModel("E", modelX);
    score += await testOnModel("O", modelX);
  }
  console.log("Correct Predictions : " + score / 6 + "%");
}
async function addToTraningData(P) {
  const ih = new ImageHandler();
  await ih.loadFromImagePath("./traningData/" + P + ".png");
  ih.resize(16, 16);
  const array = ih.toArray();
  const trans = new Trans(array);
  trans.convertToBinary();
  trans.moveDownBy(
    parseInt(Math.random() * 4) * (Math.random() > 0.5 ? 1 : -1),
    parseInt(Math.random() * 4) * (Math.random() > 0.5 ? 1 : -1),
  );
  //trans.printAlphabetMatrix(trans.imageArray);

  const vec = new Vector(3);
  if (P == "A") {
    vec.distancesOnAxes = [90, -70, -70];
  }
  if (P == "E") {
    vec.distancesOnAxes = [-70, 90, -70];
  }
  if (P == "O") {
    vec.distancesOnAxes = [-70, -70, 90];
  }
  TraningVector.push(vec);
  TraningBase.push(trans.imageArray);
  //trans.printAlphabetMatrix(trans.imageArray);
}
async function testOnModel(P, model) {
  const ih = new ImageHandler();
  await ih.loadFromImagePath("./traningData/" + P + ".png");
  ih.resize(16, 16);
  const array = ih.toArray();
  const trans = new Trans(array);
  trans.convertToBinary();
  let bjx, bjy;
  trans.moveDownBy(
    (bjx = parseInt(Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1)),
    (bjy = parseInt(Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1)),
  );
  const vecx = [new Vector(3), new Vector(3), new Vector(3)];
  vecx[0].distancesOnAxes = [90, -170, -170];
  vecx[1].distancesOnAxes = [-170, 90, -170];
  vecx[2].distancesOnAxes = [-170, -170, 90];
  let xy =
    "AEO".charAt(model.runOn(trans.imageArray).findClosestPoint(vecx)) == P;
  //console.log(xy);
  if (xy) return 1;
  return 0;
  //console.log(model.runOn(trans.imageArray).findDistanceAmong(vecx));
}
start();
