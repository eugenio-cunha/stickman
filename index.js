
const canvas = this.__canvas = new fabric.Canvas('c', { selection: false, backgroundColor: "white" });

function makeCircle(uid, left, top, line1, line2, line3, line4, radius = 5) {

  const c = new fabric.Circle({
    left: left,
    top: top,
    strokeWidth: radius > 4 ? 4 : 0,
    radius: radius || 0,
    fill: 'white',
    stroke: 'black'
  });

  c.hasControls = c.hasBorders = false;
  c.line1 = line1;
  c.line2 = line2;
  c.line3 = line3;
  c.line4 = line4;
  c.uid = uid;

  return c;
}

function makeLine(coords) {
  return new fabric.Line(coords, {
    fill: 'white',
    stroke: 'black',
    strokeWidth: 4,
    selectable: false,
    evented: false,
  });
}

function moving(target, body) {

  if (target.line1) {
    target.line1 && target.line1.set({ 'x2': target.left, 'y2': target.top });
  }
  if (target.line2) {
    target.line2 && target.line2.set({ 'x1': target.left, 'y1': target.top });
  }
  if (target.line3) {
    target.line3 && target.line3.set({ 'x1': target.left, 'y1': target.top });
  }
  if (target.line4) {
    target.line4 && target.line4.set({ 'x1': target.left, 'y1': target.top });
  }

  canvas.bringToFront(body.headCircle);
  canvas.renderAll();
}

function load() {

  fabric.Object.prototype.originX = 'center';
  fabric.Object.prototype.originY = 'center';

  const offsetX = 0;
  const offsetY = 0;

  const lines = {
    headLine: makeLine([250 + offsetX, 125 + offsetY, 250 + offsetX, 175 + offsetY]),
    hipsLine: makeLine([250 + offsetX, 175 + offsetY, 250 + offsetX, 225 + offsetY]),

    rightElbowLine: makeLine([250 + offsetX, 175 + offsetY, 285 + offsetX, 200 + offsetY]),
    rightHandLine: makeLine([285 + offsetX, 200 + offsetY, 320 + offsetX, 225 + offsetY]),

    leftElbowLine: makeLine([250 + offsetX, 175 + offsetY, 215 + offsetX, 200 + offsetY]),
    leftHand: makeLine([215 + offsetX, 200 + offsetY, 180 + offsetX, 225 + offsetY]),

    rightKneeLine: makeLine([250 + offsetX, 225 + offsetY, 270 + offsetX, 280 + offsetY]),
    rightAnkleLine: makeLine([270 + offsetX, 280 + offsetY, 280 + offsetX, 315 + offsetY]),

    leftKneeLine: makeLine([250 + offsetX, 225 + offsetY, 230 + offsetX, 280 + offsetY]),
    leftAnkleLine: makeLine([230 + offsetX, 275 + offsetY, 220 + offsetX, 315 + offsetY]),
  }

  const circles = {
    headCircle: makeCircle('headCircle', lines.headLine.get('x1'), lines.headLine.get('y1'), null, lines.headLine, null, null, 24),

    shoulderCircle: makeCircle('shoulderCircle', lines.headLine.get('x2'), lines.headLine.get('y2'), lines.headLine, lines.hipsLine, lines.rightElbowLine, lines.leftElbowLine),

    hipsCircle: makeCircle('hipsCircle', lines.hipsLine.get('x2'), lines.hipsLine.get('y2'), lines.hipsLine, lines.rightKneeLine, lines.leftKneeLine),

    rightElbowCircle: makeCircle('rightElbowCircle', lines.rightElbowLine.get('x2'), lines.rightElbowLine.get('y2'), lines.rightElbowLine, lines.rightHandLine),
    rightHandCircle: makeCircle('rightHandCircle', lines.rightHandLine.get('x2'), lines.rightHandLine.get('y2'), lines.rightHandLine),

    leftElbowCircle: makeCircle('leftElbowCircle', lines.leftElbowLine.get('x2'), lines.leftElbowLine.get('y2'), lines.leftElbowLine, lines.leftHand),
    leftHandCircle: makeCircle('leftHandCircle', lines.leftHand.get('x2'), lines.leftHand.get('y2'), lines.leftHand),

    rightKneeCircle: makeCircle('rightKneeCircle', lines.rightKneeLine.get('x2'), lines.rightKneeLine.get('y2'), lines.rightKneeLine, lines.rightAnkleLine),
    rightAnkleCircle: makeCircle('rightAnkleCircle', lines.rightAnkleLine.get('x2'), lines.rightAnkleLine.get('y2'), lines.rightAnkleLine, lines.rightFoot),

    leftKneeCircle: makeCircle('leftKneeCircle', lines.leftKneeLine.get('x2'), lines.leftKneeLine.get('y2'), lines.leftKneeLine, lines.leftAnkleLine),
    leftAnkleCircle: makeCircle('leftAnkleCircle', lines.leftAnkleLine.get('x2'), lines.leftAnkleLine.get('y2'), lines.leftAnkleLine, lines.leftFoot),
  }

  const body = { ...lines, ...circles };
  for (const key in body) {
    canvas.add(body[key]);
  }

  canvas.on('object:moving', e => moving(e.target, body));
}