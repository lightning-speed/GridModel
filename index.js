const Model = require("./Model");
const Vector = require("./vector");
const ImageHandler = require("./imageHandler");
const Trans = require("./Trans");

const IO = require("./io");
const TraningBase = [];
const TraningVector = [];
async function start() {
  const modelX = new Model(16, 16, 3);
  //const modelX = await IO.loadModelFromFile("./model3.json");
  const times = 2;

  await addToTraningData("O.png", "O", times, 7);
  await addToTraningData("E.png", "E", times, 7);
  await addToTraningData("A.png", "A", times, 7);
  await addToTraningData("O2.png", "O", times, 7);
  await addToTraningData("E2.png", "E", times, 7);
  await addToTraningData("A2.png", "A", times, 7);

  const iterations =200;
  console.log(
    "traning started",
    "samples = " + times,
    "iterations = " + iterations,
  );
  modelX.train(TraningBase, TraningVector, iterations);
  IO.saveModelToFile(modelX, "./model3.json");
  console.log("traning ended");
  let score = 0;
  const runs = 1000;
  score += await testOnModel("A", modelX, runs);
  score += await testOnModel("E", modelX, runs);
  score += await testOnModel("O", modelX, runs);
  score += await testOnModel("A2", modelX, runs);
  score += await testOnModel("E2", modelX, runs);
  score += await testOnModel("O2", modelX, runs);
  console.log("Correct Predictions : " + score / 60 + "%");
}
async function addToTraningData(P, type, times, limit) {
  const ih = new ImageHandler();
  await ih.loadFromImagePath("./traningData/" + P);
  ih.resize(16, 16);
  const array = ih.toArray();
  for (let k = 0; k < times; k++)
    for (let i = 0; i < limit; i++) {
      for (let j = 0; j < limit; j++) {
        const trans = new Trans(array);
        trans.convertToBinary();
        trans.moveDownBy(parseInt(-limit / 2 + j), parseInt(-limit / 2 + i));
        /*trans.moveDownBy(
          parseInt(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1),
          parseInt(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1),
        );*/
        //trans.printAlphabetMatrix(trans.imageArray);

        const vec = new Vector(3);
        if (type == "A") {
          vec.distancesOnAxes = [90, -70, -70];
        }
        if (type == "E") {
          vec.distancesOnAxes = [-70, 90, -70];
        }
        if (type == "O") {
          vec.distancesOnAxes = [-70, -70, 90,];
        }
        TraningVector.push(vec);
        TraningBase.push(trans.imageArray);
      }
    }
  //trans.printAlphabetMatrix(trans.imageArray);
}
async function testOnModel(P, model, runs) {
  const ih = new ImageHandler();
  await ih.loadFromImagePath("./traningData/" + P + ".png");
  ih.resize(16, 16);
  const array = ih.toArray();
  let bjx, bjy;
  let sum = 0;
  for (let i = 0; i < runs; i++) {
    const trans = new Trans(array);

    trans.convertToBinary();

    trans.moveDownBy(
      (bjx = parseInt(Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1)),
      (bjy = parseInt(Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1)),
    );
    const vecx = [new Vector(3), new Vector(3), new Vector(3)];
    vecx[0].distancesOnAxes = [90, -170, -170, ];
    vecx[1].distancesOnAxes = [-170, 90, -170,];
    vecx[2].distancesOnAxes = [-170, -170, 90, ];
    let xy =
      "AEO".charAt(model.runOn(trans.imageArray).findClosestPoint(vecx)) ==
      P.charAt(0);
    //console.log(xy);
    if (xy) sum += 1;
  }
  return sum;
  //console.log(model.runOn(trans.imageArray).findDistanceAmong(vecx));
}
start();
