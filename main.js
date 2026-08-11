

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

// only when the runAnimation button is pressed
const runAnimation = document.getElementById("runAnimation");
runAnimation.addEventListener('click', () => {
    pixelObjectArray = changeImageAndDisplay(pixelObjectArray, ctx, referenceImageArray);
    runAnimation.disabled = true;
    noClick3.style.cursor = 'default';
    requestAnimationFrame(animateSquares);
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
let ctxReference;
 let referenceImageArray = [];
// second canvas
function runImage(){

    ctxReference = referenceCanvas.getContext('2d', {willReadFrequently : true});

    const referenceImage = new Image();

    referenceImageArray = [];

    referenceImage.src = referenceImageFile;

    referenceImage.onload = () => {

        const viewPortHeight = window.innerHeight * 0.40;
        const viewPortWidth = window.innerWidth * 0.40;

        const ratio = referenceCanvas.width / referenceCanvas.height;

        referenceCanvas.width = viewPortWidth;
        referenceCanvas.height = viewPortHeight;

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
const downloadButton = document.getElementById('downloadButton')

downloadButton.addEventListener('click', downloadImage);

function downloadImage(){
    const link = document.createElement('a');
    link.download = "image.png";
    link.href = canvas.toDataURL();
    link.click();
    switchStates(noClick4, noClick5, downloadButton, restartButton);
}

let start = false;
const loadBarGreen = document.getElementById("loadBarGreen");

let count = -50;

function animateSquares(time){


    if (start){
        for (let i = 0; i < pixelObjectArray.length; i++){
            const sq = pixelObjectArray[i];
            if((sq.x > sq.newX + 0.1 || sq.x < sq.newX - 0.1) || (sq.y > sq.newY + 0.1 || sq.y < sq.newY - 0.1)){
                sq.changeXY();
            }
        }
       
    }
    createSquares(pixelObjectArray, ctx);
    if (start){
         if(count != 50 && count <= 50){
            count++;
            loadBarGreen.style.left = count + '%';
            requestAnimationFrame(animateSquares);
        } else if(count == 50){
            switchStates(noClick3, noClick4, runAnimation, downloadButton);
            count++;
        }
    }

}



// initilizing file dropper

const buttonForFileDropper = document.getElementById("openFileDropper");
const fileOpener = document.getElementById("fileOpener");

buttonForFileDropper.addEventListener('click', displayFileDropper);

function displayFileDropper(){

    fileOpener.style.display = "inline-block";

    switchStates(noClick1, noClick2, buttonForFileDropper, startImages);
    startImages.disabled = true;
    buttonForFileDropper.disabled = true;

    noClick1.classList.remove('noClicked');
    noClick1.classList.add('clicked');

    noClick2.classList.remove('clicked');
    noClick2.classList.add('noClicked');

    
    goAway.classList.toggle('moveOut');
    goAway.disabled = true;
    setTimeout(() => {
     goAway.style.display = 'none';
    }, 1000);

}

let backgroundURL = [];
let backgroundElement = [];

// first and second file dropper for file openers or smthing
function setupDropzone(element, preview, wordsInside, cancel, hidden) {
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
         if (hidden.files.length > 0) return; // already has a file — do nothing
        const filesArray = [...e.dataTransfer.files];
        const file = filesArray[0];

        if (!file) return;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (event) => {
                    backgroundURL.push(event.target.result);
                    backgroundElement.push(element);
                    previewImages(element, backgroundURL, backgroundElement, preview, wordsInside);
                    cancel.classList.remove('cancelButtonInactive');
                    cancel.classList.add('cancelButtonActive');
                
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

function setupForClick(clickableElement, hiddenInput, preview, wordsInside, cancel){

    clickableElement.addEventListener('click', () => {
        if (hiddenInput.files.length > 0) return; // already has a file — do nothing
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
            cancel.classList.remove('cancelButtonInactive');
            cancel.classList.add('cancelButtonActive');
            
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
const cancellation1 = document.getElementById("cancel1");
const cancellation2 = document.getElementById("cancel2");

const restartButton = document.getElementById('restart');
const show1 = document.getElementById("show1");
const show2 = document.getElementById('show2');

setupDropzone(file1, preview1, wordsInside1, cancellation1, imageInput1);
setupDropzone(file2, preview2, wordsInside2, cancellation2, imageInput2);

setupForClick(file1, imageInput1, preview1, wordsInside1, cancellation1);
setupForClick(file2, imageInput2, preview2, wordsInside2, cancellation2);

let changeImage;
let referenceImageFile;

function previewImages(element, arr1, arr2, preview, wordsInside){

    for (let i = 0; i < arr1.length; i++){
        if (element == arr2[i]){
            preview.style.backgroundImage = `url(${arr1[i]})`;
            preview.classList.add('showImage');
            wordsInside.innerHTML = 'PREVIEW';
            
        }
        if (element == file1){
            referenceImageFile = arr1[i];
            show1.classList.remove('red');
            show1.classList.add('green');
        }
        if (element == file2){
            changeImage = arr1[i];
            show2.classList.remove('red');
            show2.classList.add('green');
        }
        
    }

    if (arr1.length == 2){
        startImages.disabled = false;
    }

}

// erase preview images
function removeToOrginalInputState(cancel, element, wordsInside, arr1, arr2, preview, file){

    cancel.classList.remove('cancelButtonActive');
    cancel.classList.add('cancelButtonInactive');
    preview.style.backgroundImage = 'none';
    preview.classList.remove('showImage');
    wordsInside.innerHTML = 'Click or Drag an image file';
    file.value = '';
    startImages.disabled = true;

    for (let i = 0; i < arr1.length; i++){
        if(element == arr1[i]){
            arr1.splice(i, 1);
            arr2.splice(i, 1);
            console.log(arr1);
            break;
        }
    }
     if (element == file1){
        show1.classList.remove('green');
        show1.classList.add('red');
    }
    if (element == file2){
        show2.classList.remove('green');
        show2.classList.add('red');
    }

}

cancellation1.addEventListener('click', () => {
    removeToOrginalInputState(cancellation1, file1, wordsInside1, backgroundElement, backgroundURL, preview1, imageInput1);
});

cancellation2.addEventListener('click', () => {
    removeToOrginalInputState(cancellation2, file2, wordsInside2, backgroundElement, backgroundURL, preview2, imageInput2);
});



// starting to load images
const startImages = document.getElementById("startImages");

startImages.addEventListener('click', startImageChange);

function startImageChange(){
    
    console.log('hello');
    canvas.style.display = 'inline-block';
    referenceCanvas.style.display = 'inline-block';
    runImage();
    fileOpener.style.display = 'none';
    start = true;
    console.log('hello');

    switchStates(noClick2, noClick3, startImages, runAnimation);    
    
}


const noClick1 = document.getElementById("noClick1");
const noClick2 = document.getElementById("noClick2");
const noClick3 = document.getElementById("noClick3");
const noClick4 = document.getElementById("noClick4");
const noClick5 = document.getElementById("noClick5");


// start button config
runAnimation.disabled = true;
downloadButton.disabled = true;
startImages.disabled = true;
restartButton.disabled = true;


//switching between buttons that can be clicked and not clicked
function switchStates(yesClick, noClick, buttonNoClick, buttonYesClick){

    buttonNoClick.disabled = true;
    buttonYesClick.disabled = false;

    yesClick.classList.remove('noClicked');
    yesClick.classList.add('clicked');

    noClick.classList.remove('clicked');
    noClick.classList.add('noClicked');

}


// restart function and button definition

restartButton.addEventListener('click', restartProgram);

function restartProgram(){
    console.log('restarting ...');

    switchStates(noClick5, noClick1, restartButton, buttonForFileDropper);

    canvas.style.display = 'none';
    referenceCanvas.style.display = 'none';

    backgroundURL = [];
    backgroundElement = [];
    pixelObjectArray = [];
    referenceImageArray = [];
    start = false;

    imageInput1.value = '';
    imageInput2.value = '';
    changeImage = undefined;
    referenceImageFile = undefined;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxReference.clearRect(0, 0, referenceCanvas.width, referenceCanvas.height);

    preview1.style.backgroundImage = 'none';
    preview1.classList.remove('showImage');
    wordsInside1.innerHTML = 'Click or Drag an image file';
    cancellation1.classList.remove('cancelButtonActive');
    cancellation1.classList.add('cancelButtonInactive');

    preview2.style.backgroundImage = 'none';
    preview2.classList.remove('showImage');
    wordsInside2.innerHTML = 'Click or Drag an image file';
    cancellation2.classList.remove('cancelButtonActive');
    cancellation2.classList.add('cancelButtonInactive');

    startImages.disabled = true;

    show2.classList.remove('green');
    show2.classList.add('red');
    show1.classList.remove('green');
    show1.classList.add('red');

    count = -50;
    loadBarGreen.style.left = '-50%';

    goAway.style.display = 'inline-block';
    goAway.disabled = false;
    setTimeout(() => {
        goAway.classList.toggle('moveOut');
    }, 100);
}

const nameInput = document.getElementById('name');
nameInput.focus();


const name = document.getElementById('name');
const welcomeTitle = document.getElementById('welcomeTitle');
const startingScreen = document.getElementById("startingScreen");
const choices = document.getElementById('choices');
const work = document.getElementById("work");
const anotherPage = document.getElementById("anotherPage");
const mainContainer = document.getElementById("mainContainer");
const goAway = document.getElementById("goAway");

goAway.classList.toggle('moveOut');
goAway.style.display = 'none';

mainContainer.style.display = 'none';
mainContainer.classList.toggle('move');
choices.style.display = 'none';
choices.classList.toggle('move');

document.addEventListener('keydown', function(e){

    if(e.key === 'Enter'){
        e.preventDefault();
        choices.style.display = 'inline-block';
        setTimeout(() => {
            startingScreen.classList.toggle('moveTitleScreen');
            choices.classList.toggle('move');
            welcomeTitle.innerHTML = 'Welcome, ' + name.value;
            welcomeTitle.style.left = '15%';
            welcomeTitle.style.width = '70%';
            name.style.display = 'none';
            name.disabled = true;
            name.style.borderBottom = 'none';
            name.style.color = 'white';
        }, 100);
    }

});

work.addEventListener('click', () => {
    mainContainer.style.display = 'inline-block';
    goAway.style.display = 'inline-block';
    goAway.disabled = false;
    setTimeout(() => {
        mainContainer.classList.toggle('move');
        goAway.classList.toggle('moveOut');
        choices.classList.toggle('moveOut');
    }, 100);
    setTimeout(() => {
        choices.style.display = 'none';
        choices.classList.toggle('move');
        choices.classList.toggle('moveOut');
    }, 1000);

})

goAway.addEventListener('click', () => {

    mainContainer.classList.toggle('moveOut');
    goAway.classList.toggle('moveOut');
    choices.style.display = 'inline-block';
    goAway.disabled = true;
    setTimeout(() => {
        goAway.style.display = 'none';
        mainContainer.style.display = 'none';
        choices.classList.toggle('move');
        mainContainer.classList.toggle('moveOut');
        mainContainer.classList.toggle('move');
    }, 1000);

});