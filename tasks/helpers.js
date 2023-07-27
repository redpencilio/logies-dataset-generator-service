function parseGmlCoordinate(gml, coordinate) {
  if (gml) {
    const gmlReg = />([\d.]+\s[\d.]+)</g;
    const match = gmlReg.exec(gml);
    if (match) {
      const xy = match[1]; // first regex capturing group
      const [x, y] = xy.split(' ');
      return coordinate == 'x' ? x : y;
    }
  }
  return null;
}

export function parseGmlX(gml) {
  return parseGmlCoordinate(gml, 'x');
}

export function parseGmlY(gml) {
  return parseGmlCoordinate(gml, 'y');
}
