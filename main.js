

import square from "./square.js";


let pixelObjectArray = [];

const canvas = document.getElementById("imageArea");
let ctx;

    // first canvas 
function firstCanvas(){

        // Get the 2D drawing context
        ctx = canvas.getContext('2d', {willReadFrequently: true});

        const img = new Image();

        img.src = changeImage;

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

const referenceCanvas = document.getElementById("reference");
 let referenceImageArray = [];
// second canvas
function runImage(){

    const ctxReference = referenceCanvas.getContext('2d', {willReadFrequently : true});

    const referenceImage = new Image();

    referenceImageArray = [];

    referenceImage.src = referenceImageFile;

    referenceImage.onload = () => {

        const viewPortHeight = window.innerHeight * 0.40;
        const viewPortWidth = window.innerWidth * 0.40;

        referenceCanvas.width = referenceImage.width;
        referenceCanvas.height = referenceImage.height;

        const ratio = referenceCanvas.width / referenceCanvas.height;

        if (referenceCanvas.width > viewPortWidth){
            referenceCanvas.width = viewPortWidth;
            referenceCanvas.height = referenceCanvas.width / ratio;
        }
        if (referenceCanvas.height > viewPortHeight){
            referenceCanvas.height = viewPortHeight;
            referenceCanvas.width = referenceCanvas.height * ratio;
        }

        ctxReference.drawImage(referenceImage, 0, 0, referenceCanvas.width, referenceCanvas.height);

        referenceImageArray = putColorIntoArray(referenceCanvas, ctxReference, referenceImageArray);
        console.log(referenceImageArray);
        
        firstCanvas();

    }
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
        const sq = arr1[i];
        sq.changeNews(arr2[i].x, arr2[i].y);
        sq.calculateDistance();
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

// download the new image
document.getElementById('downloadButton').addEventListener('click', downloadImage);

function downloadImage(){
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = pngUrl;
    link.href = canvas.toDataURL();
    link.click();
}

let start = false;

function animateSquares(time){

    if (start)
        for (let i = 0; i < pixelObjectArray.length; i++){
            const sq = pixelObjectArray[i];
            if((sq.x > sq.newX + 0.1 || sq.x < sq.newX - 0.1) || (sq.y > sq.newY + 0.1 || sq.y < sq.newY - 0.1)){
                sq.changeXY();
            }
        }
    createSquares(pixelObjectArray, ctx);

    requestAnimationFrame(animateSquares);

}

requestAnimationFrame(animateSquares);


// initilizing file dropper

const buttonForFileDropper = document.getElementById("openFileDropper");
const fileOpener = document.getElementById("fileOpener");

buttonForFileDropper.addEventListener("click", displayFileDropper);

function displayFileDropper(){

    fileOpener.style.display = "inline-block";
    buttonForFileDropper.style.display = "none";

}

let backgroundURL = [];
let backgroundElement = [];

// first and second file dropper for file openers or smthing
function setupDropzone(element, preview, wordsInside) {
    element.addEventListener('dragover', (e) => {
        e.preventDefault();
        element.classList.add('pulse');
    });

    element.addEventListener('dragenter', (e) => {
        e.preventDefault();
        element.classList.add('pulse');
    });

    element.addEventListener('dragleave', (e) => {
        e.preventDefault();
        element.classList.remove('pulse');
    });

    element.addEventListener('drop', (e) => {
        e.preventDefault();
        element.classList.remove('pulse');
        const filesArray = [...e.dataTransfer.files];
        const file = filesArray[0];

        if (!file) return;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (event) => {
                backgroundURL.push(event.target.result);
                backgroundElement.push(element);
                previewImages(element, backgroundURL, backgroundElement, preview, wordsInside);
            };

            reader.onerror = () => {
                console.error('Failed to read file');
            };

            reader.readAsDataURL(file);
        } else {
            console.log('Not an image file:', file.type);
        }
    });
}

function setupForClick(clickableElement, hiddenInput, preview, wordsInside){
    clickableElement.addEventListener('click', () => {
        hiddenInput.click();
    });

    hiddenInput.addEventListener('change', () => {
        const file = hiddenInput.files[0];
        if (!file || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            backgroundURL.push(event.target.result);
            backgroundElement.push(clickableElement);
            previewImages(clickableElement, backgroundURL, backgroundElement, preview, wordsInside);
        };
        reader.readAsDataURL(file);
    });
}


// apply it to both elements
const file1 = document.getElementById('file1');
const file2 = document.getElementById('file2');
const imageInput1 = document.getElementById("imageInput1");
const imageInput2 = document.getElementById("imageInput2");
const preview1 = document.getElementById("preview1");
const preview2 = document.getElementById("preview2");
const wordsInside1 = document.getElementById("wordsInside1");
const wordsInside2 = document.getElementById("wordsInside2");

setupDropzone(file1, preview1, wordsInside1);
setupDropzone(file2, preview2, wordsInside2);

setupForClick(file1, imageInput1, preview1, wordsInside1);
setupForClick(file2, imageInput2, preview2, wordsInside2);

let changeImage;
let referenceImageFile;

function previewImages(element, arr1, arr2, preview, wordsInside){

    for (let i = 0; i < arr1.length; i++){
        if (element == arr2[i]){
                preview.style.backgroundImage = `url(${arr1[i]})`;
                preview.classList.add('showImage');
                wordsInside.innerHTML = 'PREVIEW';
                element.style.pointerEvents = 'none';
                

        }
        if (element == file1){
            referenceImageFile = arr1[i];
        }
        if (element == file2){
            changeImage = arr1[i];
        }
    }

}

const startImages = document.getElementById("startImages");

startImages.addEventListener('click', startImageChange);

function startImageChange(){
    canvas.style.display = 'inline-block';
    referenceCanvas.style.display = 'inline-block';
    runImage();
    fileOpener.style.display = 'none';
    start = true;
}