const canvasRectangle = document.getElementById('canvasRectangle');
const ctxRectangle = canvasRectangle.getContext('2d');

const canvasPolygon = document.getElementById('canvasPolygon');
const ctxPolygon = canvasPolygon.getContext('2d');


let scaleRectangle = 50.0; 
const minScaleRectangle = 10.0;
const maxScaleRectangle = 200.0;
const scaleStepRectangle = 10.0;


let scalePolygon = 50.0; 
const minScalePolygon = 10.0;
const maxScalePolygon = 200.0;
const scaleStepPolygon = 10.0;


const offsetXRectangle = canvasRectangle.width / 2;
const offsetYRectangle = canvasRectangle.height / 2;

const offsetXPolygon = canvasPolygon.width / 2;
const offsetYPolygon = canvasPolygon.height / 2;


let segmentsRectangle = [];
let windowRectangle = {};

let segmentsPolygon = [];
let polygonVertices = [];


let stepsRectangle = [];
let stepsPolygon = [];


function updateScaleDisplayRectangle() {
    document.getElementById('currentScaleRectangle').innerText = (scaleRectangle / 50).toFixed(1);
}


function updateScaleDisplayPolygon() {
    document.getElementById('currentScalePolygon').innerText = (scalePolygon / 50).toFixed(1);
}


function zoomInRectangle() {
    if (scaleRectangle < maxScaleRectangle) {
        scaleRectangle += scaleStepRectangle;
        updateScaleDisplayRectangle();
        drawRectangleSystem();
        drawRectangleClipping();
    }
}

function zoomOutRectangle() {
    if (scaleRectangle > minScaleRectangle) {
        scaleRectangle -= scaleStepRectangle;
        updateScaleDisplayRectangle();
        drawRectangleSystem();
        drawRectangleClipping();
    }
}


function zoomInPolygon() {
    if (scalePolygon < maxScalePolygon) {
        scalePolygon += scaleStepPolygon;
        updateScaleDisplayPolygon();
        drawPolygonSystem();
        drawPolygonClipping();
    }
}

function zoomOutPolygon() {
    if (scalePolygon > minScalePolygon) {
        scalePolygon -= scaleStepPolygon;
        updateScaleDisplayPolygon();
        drawPolygonSystem();
        drawPolygonClipping();
    }
}


function clearCanvasRectangle() {
    segmentsRectangle = [];
    windowRectangle = {};
    stepsRectangle = [];
    const container = document.getElementById('stepsRectangle');
    container.innerHTML = '';
    drawRectangleSystem();
    drawRectangleClipping();
}


function clearCanvasPolygon() {
    segmentsPolygon = [];
    polygonVertices = [];
    stepsPolygon = [];
    const container = document.getElementById('stepsPolygon');
    container.innerHTML = '';
    drawPolygonSystem();
    drawPolygonClipping();
}


function drawSystem(ctx, scale, offsetX, offsetY) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.save();
    ctx.translate(offsetX, offsetY);

    const step = 1;
    const scaledStep = step * scale;
    const numLinesX = Math.ceil(width / scaledStep);
    const numLinesY = Math.ceil(height / scaledStep);

    ctx.beginPath();
    for (let i = -Math.floor(numLinesX / 2); i <= Math.floor(numLinesX / 2); i++) {
        ctx.moveTo(i * scaledStep, -height / 2);
        ctx.lineTo(i * scaledStep, height / 2);
    }
    for (let i = -Math.floor(numLinesY / 2); i <= Math.floor(numLinesY / 2); i++) {
        ctx.moveTo(-width / 2, i * scaledStep);
        ctx.lineTo(width / 2, i * scaledStep);
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(-width / 2, 0);
    ctx.lineTo(width / 2, 0);
    ctx.moveTo(0, -height / 2);
    ctx.lineTo(0, height / 2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();


    ctx.fillStyle = 'black';
    let fontSize = 12;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';


    for (let i = -Math.floor(numLinesX / 2); i <= Math.floor(numLinesX / 2); i++) {
        if (i !== 0) {
            ctx.fillText(i.toString(), i * scaledStep, 5);
        }
    }


    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = -Math.floor(numLinesY / 2); i <= Math.floor(numLinesY / 2); i++) {
        if (i !== 0) {
            ctx.fillText(i.toString(), -5, i * scaledStep);
        }
    }


    for (let i = -Math.floor(numLinesX / 2); i <= Math.floor(numLinesX / 2); i++) {
        if (i !== 0) {
            ctx.beginPath();
            ctx.moveTo(i * scaledStep, -5);
            ctx.lineTo(i * scaledStep, 5);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }


    for (let i = -Math.floor(numLinesY / 2); i <= Math.floor(numLinesY / 2); i++) {
        if (i !== 0) {
            ctx.beginPath();
            ctx.moveTo(-5, i * scaledStep);
            ctx.lineTo(5, i * scaledStep);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    ctx.restore();
}


function drawRectangleSystem() {
    ctxRectangle.clearRect(0, 0, canvasRectangle.width, canvasRectangle.height);
    drawSystem(ctxRectangle, scaleRectangle, offsetXRectangle, offsetYRectangle);
}


function drawPolygonSystem() {
    ctxPolygon.clearRect(0, 0, canvasPolygon.width, canvasPolygon.height);
    drawSystem(ctxPolygon, scalePolygon, offsetXPolygon, offsetYPolygon);
}


function drawRectangleCustom(ctx, xmin, ymin, xmax, ymax, scale, offsetX, offsetY) {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.beginPath();
    ctx.rect(xmin * scale, -ymax * scale, (xmax - xmin) * scale, (ymax - ymin) * scale);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}


function drawPolygonCustom(ctx, vertices, color, scale, offsetX, offsetY) {
    if (vertices.length < 3) return; 

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.beginPath();
    vertices.forEach((vertex, index) => {
        const [x, y] = vertex;
        if (index === 0) {
            ctx.moveTo(x * scale, -y * scale);
        } else {
            ctx.lineTo(x * scale, -y * scale);
        }
    });
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

function drawLineSegment(ctx, x1, y1, x2, y2, color, scale, offsetX, offsetY, lineWidth = 2) {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.beginPath();
    ctx.moveTo(x1 * scale, -y1 * scale);
    ctx.lineTo(x2 * scale, -y2 * scale);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.restore();
}

function addStep(container, text, type = 'info') {
    const stepElement = document.createElement('div');
    stepElement.classList.add('step', type);
    stepElement.innerHTML = text;
    container.appendChild(stepElement);
}


function liangBarsky(x1, y1, x2, y2, xmin, ymin, xmax, ymax, container) {
    let p = [-(x2 - x1), (x2 - x1), -(y2 - y1), (y2 - y1)];
    let q = [x1 - xmin, xmax - x1, y1 - ymin, ymax - y1];
    let t0 = 0, t1 = 1;

    addStep(container, `<strong>Обрабатываем отрезок от (${x1}, ${y1}) до (${x2}, ${y2})</strong>`);
    addStep(container, `Границы окна: <span class="highlight">Xmin=${xmin}</span>, <span class="highlight">Ymin=${ymin}</span>, <span class="highlight">Xmax=${xmax}</span>, <span class="highlight">Ymax=${ymax}</span>`);

    for (let i = 0; i < 4; i++) {
        let edge;
        switch(i) {
            case 0: edge = 'левой границей'; break;
            case 1: edge = 'правой границей'; break;
            case 2: edge = 'нижней границей'; break;
            case 3: edge = 'верхней границей'; break;
        }

        addStep(container, `<span class="calculation">Обрабатываем ${edge}: p[${i}] = ${p[i]}, q[${i}] = ${q[i]}</span>`);

        if (p[i] === 0) {
            if (q[i] < 0) {
                addStep(container, `<span class="error">Отрезок параллелен ${edge} и полностью вне окна.</span>`);
                return null; 
            } else {
                addStep(container, `<span class="info">Отрезок параллелен ${edge} и входит в допустимую область.</span>`);
                continue; 
            }
        } else {
            let r = q[i] / p[i];
            addStep(container, `<span class="calculation">Вычисляем r = q/p = ${q[i]}/${p[i]} = ${r.toFixed(3)}</span>`);
            if (p[i] < 0) {
                if (r > t1) {
                    addStep(container, `<span class="error">r > t1 (${r.toFixed(3)} > ${t1}) => отрезок полностью вне окна.</span>`);
                    return null;
                }
                if (r > t0) {
                    addStep(container, `<span class="result">Обновляем t0 = max(t0, r) = max(${t0}, ${r.toFixed(3)}) = ${r.toFixed(3)}</span>`);
                    t0 = r;
                }
            } else {
                if (r < t0) {
                    addStep(container, `<span class="error">r < t0 (${r.toFixed(3)} < ${t0}) => отрезок полностью вне окна.</span>`);
                    return null;
                }
                if (r < t1) {
                    addStep(container, `<span class="result">Обновляем t1 = min(t1, r) = min(${t1}, ${r.toFixed(3)}) = ${r.toFixed(3)}</span>`);
                    t1 = r;
                }
            }
        }
    }

    addStep(container, `<span class="result">Итоговые параметры: t0=${t0.toFixed(3)}, t1=${t1.toFixed(3)}</span>`);


    let xStart = x1 + t0 * (x2 - x1);
    let yStart = y1 + t0 * (y2 - y1);
    let xEnd = x1 + t1 * (x2 - x1);
    let yEnd = y1 + t1 * (y2 - y1);

    addStep(container, `<span class="result">Отсечённый отрезок от (<span class="highlight">${xStart.toFixed(3)}</span>, <span class="highlight">${yStart.toFixed(3)}</span>) до (<span class="highlight">${xEnd.toFixed(3)}</span>, <span class="highlight">${yEnd.toFixed(3)}</span>)</span>`);

    return { xStart, yStart, xEnd, yEnd };
}


function cyrusBeck(x1, y1, x2, y2, polygon, container) {
    const n = polygon.length;
    let tE = 0; 
    let tL = 1; 

    addStep(container, `<strong>Обрабатываем отрезок от (${x1}, ${y1}) до (${x2}, ${y2})</strong>`);
    addStep(container, `Многоугольник имеет <span class="highlight">${n}</span> ребер.`);

    for (let i = 0; i < n; i++) {
        let [x0, y0] = polygon[i];
        let [x1_p, y1_p] = polygon[(i + 1) % n];

        let edgeX = x1_p - x0;
        let edgeY = y1_p - y0;

        let normalX = edgeY;
        let normalY = -edgeX;

        addStep(container, `<span class="calculation"><em>Ребро ${i + 1}: от (${x0}, ${y0}) до (${x1_p}, ${y1_p})</em></span>`);
        addStep(container, `<span class="calculation">Внешняя нормаль к ребру: N=(${normalX}, ${normalY})</span>`);

        let dx = x1 - x0;
        let dy = y1 - y0;

        let D_x = x2 - x1;
        let D_y = y2 - y1;
        let N_dot_D = normalX * D_x + normalY * D_y;
        let N_dot_P_A = normalX * dx + normalY * dy;

        addStep(container, `<span class="calculation">Вычисляем N·D = ${normalX}*${D_x} + ${normalY}*${D_y} = ${N_dot_D}</span>`);
        addStep(container, `<span class="calculation">Вычисляем N·(P - A) = ${normalX}*${dx} + ${normalY}*${dy} = ${N_dot_P_A}</span>`);

        if (N_dot_D === 0) {
            if (N_dot_P_A < 0) {
                addStep(container, `<span class="error">Отрезок параллелен ребру и полностью вне многоугольника.</span>`);
                return null; 
            } else {
                addStep(container, `<span class="info">Отрезок параллелен ребру и входит в допустимую область.</span>`);
                continue; 
            }
        }

        let t = -N_dot_P_A / N_dot_D;
        addStep(container, `<span class="calculation">Вычисляем t = - (N·(P - A)) / (N·D) = ${t.toFixed(3)}</span>`);

        if (N_dot_D < 0) {

            if (t > tE) {
                addStep(container, `<span class="result">Обновляем tE = max(tE, t) = max(${tE}, ${t.toFixed(3)}) = ${t.toFixed(3)}</span>`);
                tE = t;
            }
            if (tE > tL) {
                addStep(container, `<span class="error">tE > tL (${tE.toFixed(3)} > ${tL}) => отрезок полностью вне многоугольника.</span>`);
                return null;
            }
        } else {
            if (t < tL) {
                addStep(container, `<span class="result">Обновляем tL = min(tL, t) = min(${tL}, ${t.toFixed(3)}) = ${t.toFixed(3)}</span>`);
                tL = t;
            }
            if (tE > tL) {
                addStep(container, `<span class="error">tE > tL (${tE.toFixed(3)} > ${tL}) => отрезок полностью вне многоугольника.</span>`);
                return null;
            }
        }
    }

    addStep(container, `<span class="result">Итоговые параметры: tE=${tE.toFixed(3)}, tL=${tL.toFixed(3)}</span>`);


    let xStart = x1 + tE * (x2 - x1);
    let yStart = y1 + tE * (y2 - y1);
    let xEnd = x1 + tL * (x2 - x1);
    let yEnd = y1 + tL * (y2 - y1);

    addStep(container, `<span class="result">Отсечённый отрезок от (<span class="highlight">${xStart.toFixed(3)}</span>, <span class="highlight">${yStart.toFixed(3)}</span>) до (<span class="highlight">${xEnd.toFixed(3)}</span>, <span class="highlight">${yEnd.toFixed(3)}</span>)</span>`);

    return { xStart, yStart, xEnd, yEnd };
}


function processRectangleClipping() {
    stepsRectangle = [];
    const container = document.getElementById('stepsRectangle');
    container.innerHTML = '';

    const data = document.getElementById('inputDataRectangle').value.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const n = parseInt(data[0]); 
    segmentsRectangle = [];

    for (let i = 1; i <= n; i++) {
        const coords = data[i].split(' ').map(Number);
        segmentsRectangle.push({
            x1: coords[0],
            y1: coords[1],
            x2: coords[2],
            y2: coords[3]
        });
    }


    const [xmin, ymin, xmax, ymax] = data[n + 1].split(' ').map(Number);
    windowRectangle = { xmin, ymin, xmax, ymax };

    adjustScaleRectangle();

    drawRectangleSystem();
    drawRectangleClipping();

}


function processPolygonClipping() {
    stepsPolygon = [];
    const container = document.getElementById('stepsPolygon');
    container.innerHTML = '';

    const data = document.getElementById('inputDataPolygon').value.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const n = parseInt(data[0]); 
    segmentsPolygon = [];

    for (let i = 1; i <= n; i++) {
        const coords = data[i].split(' ').map(Number);
        segmentsPolygon.push({
            x1: coords[0],
            y1: coords[1],
            x2: coords[2],
            y2: coords[3]
        });
    }


    const m = parseInt(data[n + 1]); 
    polygonVertices = [];

    for (let i = n + 2; i < n + 2 + m; i++) {
        const coords = data[i].split(' ').map(Number);
        polygonVertices.push([coords[0], coords[1]]);
    }

    adjustScalePolygon();


    drawPolygonSystem();
    drawPolygonClipping();


}


function drawRectangleClipping() {
    if (!windowRectangle) return;

    drawRectangleCustom(ctxRectangle, windowRectangle.xmin, windowRectangle.ymin, windowRectangle.xmax, windowRectangle.ymax, scaleRectangle, offsetXRectangle, offsetYRectangle);


    segmentsRectangle.forEach(segment => {
        drawLineSegment(ctxRectangle, segment.x1, segment.y1, segment.x2, segment.y2, 'red', scaleRectangle, offsetXRectangle, offsetYRectangle);

        const clipped = liangBarsky(segment.x1, segment.y1, segment.x2, segment.y2, windowRectangle.xmin, windowRectangle.ymin, windowRectangle.xmax, windowRectangle.ymax, document.getElementById('stepsRectangle'));
        if (clipped) {

            drawLineSegment(ctxRectangle, clipped.xStart, clipped.yStart, clipped.xEnd, clipped.yEnd, 'blue', scaleRectangle, offsetXRectangle, offsetYRectangle, 3);
        }
    });
}


function drawPolygonClipping() {
    if (!polygonVertices || polygonVertices.length < 3) return;

    drawPolygonCustom(ctxPolygon, polygonVertices, 'green', scalePolygon, offsetXPolygon, offsetYPolygon);


    segmentsPolygon.forEach(segment => {

        drawLineSegment(ctxPolygon, segment.x1, segment.y1, segment.x2, segment.y2, 'red', scalePolygon, offsetXPolygon, offsetYPolygon);


        const clipped = cyrusBeck(segment.x1, segment.y1, segment.x2, segment.y2, polygonVertices, document.getElementById('stepsPolygon'));
        if (clipped) {

            drawLineSegment(ctxPolygon, clipped.xStart, clipped.yStart, clipped.xEnd, clipped.yEnd, 'blue', scalePolygon, offsetXPolygon, offsetYPolygon, 3);
        }
    });
}


function drawRectangleCustom(ctx, xmin, ymin, xmax, ymax, scale, offsetX, offsetY) {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.beginPath();
    ctx.rect(xmin * scale, -ymax * scale, (xmax - xmin) * scale, (ymax - ymin) * scale);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

function drawPolygonCustom(ctx, vertices, color, scale, offsetX, offsetY) {
    if (vertices.length < 3) return; // Нужно как минимум 3 вершины

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.beginPath();
    vertices.forEach((vertex, index) => {
        const [x, y] = vertex;
        if (index === 0) {
            ctx.moveTo(x * scale, -y * scale);
        } else {
            ctx.lineTo(x * scale, -y * scale);
        }
    });
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

function drawLineSegment(ctx, x1, y1, x2, y2, color, scale, offsetX, offsetY, lineWidth = 2) {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.beginPath();
    ctx.moveTo(x1 * scale, -y1 * scale);
    ctx.lineTo(x2 * scale, -y2 * scale);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.restore();
}


function addStep(container, text, type = 'info') {
    const stepElement = document.createElement('div');
    stepElement.classList.add('step', type);
    stepElement.innerHTML = text;
    container.appendChild(stepElement);
}


function liangBarsky(x1, y1, x2, y2, xmin, ymin, xmax, ymax, container) {
    let p = [-(x2 - x1), (x2 - x1), -(y2 - y1), (y2 - y1)];
    let q = [x1 - xmin, xmax - x1, y1 - ymin, ymax - y1];
    let t0 = 0, t1 = 1;

    addStep(container, `<strong>Обрабатываем отрезок от (${x1}, ${y1}) до (${x2}, ${y2})</strong>`);
    addStep(container, `Границы окна: <span class="highlight">Xmin=${xmin}</span>, <span class="highlight">Ymin=${ymin}</span>, <span class="highlight">Xmax=${xmax}</span>, <span class="highlight">Ymax=${ymax}</span>`);

    for (let i = 0; i < 4; i++) {
        let edge;
        switch(i) {
            case 0: edge = 'левой границей'; break;
            case 1: edge = 'правой границей'; break;
            case 2: edge = 'нижней границей'; break;
            case 3: edge = 'верхней границей'; break;
        }

        addStep(container, `<span class="calculation">Обрабатываем ${edge}: p[${i}] = ${p[i]}, q[${i}] = ${q[i]}</span>`);

        if (p[i] === 0) {
            if (q[i] < 0) {
                addStep(container, `<span class="error">Отрезок параллелен ${edge} и полностью вне окна.</span>`);
                return null;
            } else {
                addStep(container, `<span class="info">Отрезок параллелен ${edge} и входит в допустимую область.</span>`);
                continue;
            }
        } else {
            let r = q[i] / p[i];
            addStep(container, `<span class="calculation">Вычисляем r = q/p = ${q[i]}/${p[i]} = ${r.toFixed(3)}</span>`);
            if (p[i] < 0) {
                if (r > t1) {
                    addStep(container, `<span class="error">r > t1 (${r.toFixed(3)} > ${t1}) => отрезок полностью вне окна.</span>`);
                    return null;
                }
                if (r > t0) {
                    addStep(container, `<span class="result">Обновляем t0 = max(t0, r) = max(${t0}, ${r.toFixed(3)}) = ${r.toFixed(3)}</span>`);
                    t0 = r;
                }
            } else {
                if (r < t0) {
                    addStep(container, `<span class="error">r < t0 (${r.toFixed(3)} < ${t0}) => отрезок полностью вне окна.</span>`);
                    return null;
                }
                if (r < t1) {
                    addStep(container, `<span class="result">Обновляем t1 = min(t1, r) = min(${t1}, ${r.toFixed(3)}) = ${r.toFixed(3)}</span>`);
                    t1 = r;
                }
            }
        }
    }

    addStep(container, `<span class="result">Итоговые параметры: t0=${t0.toFixed(3)}, t1=${t1.toFixed(3)}</span>`);


    let xStart = x1 + t0 * (x2 - x1);
    let yStart = y1 + t0 * (y2 - y1);
    let xEnd = x1 + t1 * (x2 - x1);
    let yEnd = y1 + t1 * (y2 - y1);

    addStep(container, `<span class="result">Отсечённый отрезок от (<span class="highlight">${xStart.toFixed(3)}</span>, <span class="highlight">${yStart.toFixed(3)}</span>) до (<span class="highlight">${xEnd.toFixed(3)}</span>, <span class="highlight">${yEnd.toFixed(3)}</span>)</span>`);

    return { xStart, yStart, xEnd, yEnd };
}


function cyrusBeck(x1, y1, x2, y2, polygon, container) {
    const n = polygon.length;
    let tE = 0;
    let tL = 1; 

    addStep(container, `<strong>Обрабатываем отрезок от (${x1}, ${y1}) до (${x2}, ${y2})</strong>`);
    addStep(container, `Многоугольник имеет <span class="highlight">${n}</span> ребер.`);

    for (let i = 0; i < n; i++) {

        let [x0, y0] = polygon[i];
        let [x1_p, y1_p] = polygon[(i + 1) % n];


        let edgeX = x1_p - x0;
        let edgeY = y1_p - y0;


        let normalX = edgeY;
        let normalY = -edgeX;

        addStep(container, `<span class="calculation"><em>Ребро ${i + 1}: от (${x0}, ${y0}) до (${x1_p}, ${y1_p})</em></span>`);
        addStep(container, `<span class="calculation">Внешняя нормаль к ребру: N=(${normalX}, ${normalY})</span>`);


        let dx = x1 - x0;
        let dy = y1 - y0;


        let D_x = x2 - x1;
        let D_y = y2 - y1;
        let N_dot_D = normalX * D_x + normalY * D_y;
        let N_dot_P_A = normalX * dx + normalY * dy;

        addStep(container, `<span class="calculation">Вычисляем N·D = ${normalX}*${D_x} + ${normalY}*${D_y} = ${N_dot_D}</span>`);
        addStep(container, `<span class="calculation">Вычисляем N·(P - A) = ${normalX}*${dx} + ${normalY}*${dy} = ${N_dot_P_A}</span>`);

        if (N_dot_D === 0) {
            if (N_dot_P_A < 0) {
                addStep(container, `<span class="error">Отрезок параллелен ребру и полностью вне многоугольника.</span>`);
                return null; 
            } else {
                addStep(container, `<span class="info">Отрезок параллелен ребру и входит в допустимую область.</span>`);
                continue; 
            }
        }

        let t = -N_dot_P_A / N_dot_D;
        addStep(container, `<span class="calculation">Вычисляем t = - (N·(P - A)) / (N·D) = ${t.toFixed(3)}</span>`);

        if (N_dot_D < 0) {
            if (t > tE) {
                addStep(container, `<span class="result">Обновляем tE = max(tE, t) = max(${tE}, ${t.toFixed(3)}) = ${t.toFixed(3)}</span>`);
                tE = t;
            }
            if (tE > tL) {
                addStep(container, `<span class="error">tE > tL (${tE.toFixed(3)} > ${tL}) => отрезок полностью вне многоугольника.</span>`);
                return null;
            }
        } else {
            if (t < tL) {
                addStep(container, `<span class="result">Обновляем tL = min(tL, t) = min(${tL}, ${t.toFixed(3)}) = ${t.toFixed(3)}</span>`);
                tL = t;
            }
            if (tE > tL) {
                addStep(container, `<span class="error">tE > tL (${tE.toFixed(3)} > ${tL}) => отрезок полностью вне многоугольника.</span>`);
                return null;
            }
        }
    }

    addStep(container, `<span class="result">Итоговые параметры: tE=${tE.toFixed(3)}, tL=${tL.toFixed(3)}</span>`);

    let xStart = x1 + tE * (x2 - x1);
    let yStart = y1 + tE * (y2 - y1);
    let xEnd = x1 + tL * (x2 - x1);
    let yEnd = y1 + tL * (y2 - y1);

    addStep(container, `<span class="result">Отсечённый отрезок от (<span class="highlight">${xStart.toFixed(3)}</span>, <span class="highlight">${yStart.toFixed(3)}</span>) до (<span class="highlight">${xEnd.toFixed(3)}</span>, <span class="highlight">${yEnd.toFixed(3)}</span>)</span>`);

    return { xStart, yStart, xEnd, yEnd };
}


function adjustScaleRectangle() {

    let xmin = windowRectangle.xmin;
    let ymin = windowRectangle.ymin;
    let xmax = windowRectangle.xmax;
    let ymax = windowRectangle.ymax;

    segmentsRectangle.forEach(seg => {
        xmin = Math.min(xmin, seg.x1, seg.x2);
        ymin = Math.min(ymin, seg.y1, seg.y2);
        xmax = Math.max(xmax, seg.x1, seg.x2);
        ymax = Math.max(ymax, seg.y1, seg.y2);
    });

    const margin = 50; 
    const scaleX = (canvasRectangle.width - 2 * margin) / (xmax - xmin);
    const scaleY = (canvasRectangle.height - 2 * margin) / (ymax - ymin);
    scaleRectangle = Math.min(scaleX, scaleY);
    scaleRectangle = Math.max(minScaleRectangle, Math.min(scaleRectangle, maxScaleRectangle));
}


function adjustScalePolygon() {

    let xmin = Infinity, ymin = Infinity, xmax = -Infinity, ymax = -Infinity;

    segmentsPolygon.forEach(seg => {
        xmin = Math.min(xmin, seg.x1, seg.x2);
        ymin = Math.min(ymin, seg.y1, seg.y2);
        xmax = Math.max(xmax, seg.x1, seg.x2);
        ymax = Math.max(ymax, seg.y1, seg.y2);
    });

    polygonVertices.forEach(vertex => {
        const [x, y] = vertex;
        xmin = Math.min(xmin, x);
        ymin = Math.min(ymin, y);
        xmax = Math.max(xmax, x);
        ymax = Math.max(ymax, y);
    });


    const margin = 50; 
    const scaleX = (canvasPolygon.width - 2 * margin) / (xmax - xmin);
    const scaleY = (canvasPolygon.height - 2 * margin) / (ymax - ymin);
    scalePolygon = Math.min(scaleX, scaleY);
    scalePolygon = Math.max(minScalePolygon, Math.min(scalePolygon, maxScalePolygon));
}


drawRectangleSystem();
drawPolygonSystem();


updateScaleDisplayRectangle();
updateScaleDisplayPolygon();
