module.exports = class Vector {
  constructor(axes) {
    this.distancesOnAxes = new Array(axes).fill(0);
  }
  setDistanceOnAxis(distance, axis) {
    this.distancesOnAxes[axis] = distance;
  }
  findDistanceBetween(pointA) {
    let pointB = this;
    if (pointA.distancesOnAxes.length != pointB.distancesOnAxes.length) {
      console.log("Vector: Dimensions Of Point A doesn't match Point B");
      return;
    }
    let distance = 0;
    for (let i = 0; i < pointA.distancesOnAxes.length; i++) {
      distance += Math.pow(
        pointA.distancesOnAxes[i] - pointB.distancesOnAxes[i],
        2,
      );
    }
    return Math.sqrt(distance);
  }
  findDistanceAmong(points) {
    const distances = [];
    points.forEach((point) => distances.push(this.findDistanceBetween(point)));
    return distances;
  }
  findClosestPoint(points) {
    const distances = this.findDistanceAmong(points);
    return distances.indexOf(Math.min(...distances));
  }
};
