img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("monument.jpg");
}

function setup() {
    canvas = createCanvas(640, 456);
    canvas.position(450, 250);

    cocossd = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 456);

    if(status != "") {
        console.log(objects);
        for(i = 0; i < objects.length; i++) {
            fill("#FF0000");
            stroke("#FF0000");
            percent = floor(objects[i].confidence);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            rect(objects[i].x, objects[i].y, 200, 200);
        }
    }
}

function modelLoaded() {
    console.log("COCO SSD initialized");
    status = true;
    document.getElementById("status").innerHTML = "Status: Objects Detected";
    cocossd.detect(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.error(error)
    }

    console.log(results);
    objects = results;
    console.log(objects);
}