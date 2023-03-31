function setup () {
  // The coordinate is NOT the grid points, it is the reference point between grid points.
  // Coordinate x and y can be anything but the reference point will always be between 0 and 1
  const referenceX = .1;
  const referenceY = .7;
  const dotProduct1 = .9;
  const dotProduct2 = -.3;
  const dotProduct3 = .4;
  const dotProduct4 = .9;
  const interpolatedValue1 = interpolate(dotProduct1, dotProduct2, referenceX);
  const interpolatedValue2 = interpolate(dotProduct3, dotProduct4, referenceX);
  const interpolatedValue3 = interpolate(interpolatedValue1, interpolatedValue2, referenceY);
  console.log(interpolatedValue3); // Will be between -1 and 1
}

function interpolate (a0, a1, w) {
  return (a1 - a0) * w + a0; //Interpolate
  // return (a1 - a0) * (3.0 - w * 2.0) * w * w + a0; //Smoothstep
  // return (a1 - a0) * ((w * (w * 6.0 - 15.0) + 10.0) * w * w * w) + a0; //Smootherstep
}