img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("desk.jpg");
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
            fill("red");
            percent = floor(objects[i].confidence * 100);
            console.log("This is i: " + i);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
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