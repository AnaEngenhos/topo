
let canvas;
let previewCanvas;
let ultimaIdeia = [];

function inicializarCanvases() {
    canvas = new fabric.Canvas('canvas');
    previewCanvas = new fabric.Canvas('preview');
    previewCanvas.setBackgroundColor('#f0f8ff', previewCanvas.renderAll.bind(previewCanvas));
}

function gerarIdeia() {
    const tema = document.getElementById("tema").value.trim();
    if (!tema) return alert("Digite um tema válido.");

    const enviarBtn = document.getElementById("enviarEditor");
    ultimaIdeia = [`${tema} incrível`, `Feliz aniversário!`];

    previewCanvas.clear().setBackgroundColor('#f0f8ff', previewCanvas.renderAll.bind(previewCanvas));
    let top = 30;
    ultimaIdeia.forEach(txt => {
        const text = new fabric.Text(txt, {
            left: 50,
            top: top,
            fontSize: 24,
            fill: "#333"
        });
        previewCanvas.add(text);
        top += 40;
    });

    enviarBtn.style.display = "inline-block";
    enviarBtn.onclick = carregarNoEditor;
}

function carregarNoEditor() {
    const editor = document.getElementById("editor");
    editor.style.display = 'block';
    canvas.clear().setBackgroundColor('#f0f8ff', canvas.renderAll.bind(canvas));

    let top = 50;
    ultimaIdeia.forEach(txt => {
        const text = new fabric.Textbox(txt, {
            left: 50,
            top: top,
            fontSize: 24,
            fill: "#003366"
        });
        canvas.add(text);
        top += 60;
    });
}

fabric.Heart = fabric.util.createClass(fabric.Path, {
    initialize: function (options) {
        const path = 'M 272 200 C 272 120 176 160 176 80 C 176 160 80 120 80 200 C 80 280 176 320 176 400 C 176 320 272 280 272 200 Z';
        this.callSuper('initialize', path, options);
    }
});
fabric.Star = fabric.util.createClass(fabric.Polygon, {
    initialize: function (options) {
        const points = [...Array(10)].map((_, i) => {
            const angle = i * Math.PI / 5;
            const radius = i % 2 === 0 ? 30 : 15;
            return {
                x: 300 + radius * Math.cos(angle),
                y: 180 + radius * Math.sin(angle)
            };
        });
        this.callSuper('initialize', points, options);
    }
});

function addShape(tipo) {
    let shape;
    switch (tipo) {
        case 'circle':
            shape = new fabric.Circle({ radius: 30, fill: 'pink', left: 200, top: 100 });
            break;
        case 'rect':
            shape = new fabric.Rect({ width: 80, height: 50, fill: 'lightblue', left: 250, top: 150 });
            break;
        case 'heart':
            shape = new fabric.Heart({ fill: 'red', scaleX: 0.2, scaleY: 0.2, left: 300, top: 100 });
            break;
        case 'star':
            shape = new fabric.Star({ fill: 'gold', left: 350, top: 100 });
            break;
    }
    if (shape) canvas.add(shape);
}

function downloadSVG() {
    const svg = canvas.toSVG();
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "topo_bolo.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
