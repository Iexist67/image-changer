

import square from "./square.js";


let pixelObjectArray = [];

let canvas;
let ctx;

    // first canvas 
function firstCanvas(){
        canvas = document.getElementById('imageArea');
        

        // Get the 2D drawing context
        ctx = canvas.getContext('2d', {willReadFrequently: true});

        const img = new Image();

        img.src = '/testimages/download.webp';

        img.onload = () => {

            canvas.width = referenceCanvas.width;
            canvas.height = referenceCanvas.height;
            ctx.drawImage(img, 0, 0, referenceCanvas.width, referenceCanvas.height);

            // take the color from the canvas and put into an array of objects
            pixelObjectArray = putColorIntoArray(canvas, ctx, pixelObjectArray);
            
        }
}

// only when the enter key is pressed, change the image and display it
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // change the image and display it
        pixelObjectArray = changeImageAndDisplay(pixelObjectArray, ctx, referenceImageArray);
    }
});

// change the image and display it
function changeImageAndDisplay(arr, ctx, arr2){
     // readjust the pixelObjectArray to match the referenceImageArray
    arr = readjust(arr, arr2);
    console.log(arr);

    // create squares on the canvas
    createSquares(arr, ctx);
    return arr;
}

// second canvas
    const referenceCanvas = document.getElementById("reference");

    const ctxReference = referenceCanvas.getContext('2d', {willReadFrequently : true});

    const referenceImage = new Image();

    let referenceImageArray = [];

    referenceImage.src = '/testimages/reference.png';

    referenceImage.onload = () => {
        referenceCanvas.width = referenceImage.width / 2;
        referenceCanvas.height = referenceImage.height / 2;

        ctxReference.drawImage(referenceImage, 0, 0, referenceCanvas.width, referenceCanvas.height);

        referenceImageArray = putColorIntoArray(referenceCanvas, ctxReference, referenceImageArray);
        console.log(referenceImageArray);
        
        firstCanvas();

    }

// put the color into an array of objects
function putColorIntoArray(canvas, ctx, arr){
    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height).data; // ONE call total

    for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
            const idx = (i * width + j) * 4; // find this pixel's position in the flat array
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            const a = imgData[idx + 3];

            const sq = new square(j, i, r, g, b, a);
            arr.push(sq);
        }
    }
    // sort array
    arr = sort(arr);
    return arr;
}

// sorting function
function sort(arr){
    arr.sort((a, b) => a.gray - b.gray);
    return arr;
}

// readjust the functions
function readjust(arr1, arr2){
    for (let i = 0; i < arr1.length; i++){
        const temp1 = arr2[i].x;
        const temp2 = arr2[i].y;
        arr1[i].x = temp1;
        arr1[i].y = temp2;
    }
    return arr1;
}

// creates squares on canvas 2 x 2
function createSquares(arr, ctx){
    for (let i = 0; i < arr.length; i++){
        const sq = arr[i];
        ctx.fillStyle = sq.color;
        ctx.fillRect(sq.x, sq.y, sq.width, sq.height);
    }
}