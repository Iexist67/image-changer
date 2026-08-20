export const html = `
<!DOCTYPE html>
<html>

    <head>
        <link rel='stylesheet' href='style.css' />
        <title> Image Changer </title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png">
    </head>
    <body>

        <p id="text2"> *No Data is Saved</p>

        <div id="startingScreen">

            <p id="welcomeTitle"> Welcome,</p>

            <div id="textInput">
            <input type="text" id="name"/>
            <span id="placeHolderText">Name</span>
            </div>
            
        </div>

        <div id="choices" hidden>

            <button id="work"> Work </button>

            <button id="anotherPage"> How It Work </button>

            <button id="code"> Code </button>


        </div>

        
        <button id="goAway" disabled> Go Back </button>

        <div id="mainContainer">
            <div id="canvasContainer">
                <canvas id="imageArea"></canvas>
                <canvas id="reference"> </canvas>
            </div>

            
            <div id="fileOpener" style="display:none">
                <div id="file1">
                    <button id="cancel1" class="cancelButtonInactive"> X </button>
                    <p id="preview1"></p>
                    <span id="wordsInside1">Click or Drag an image file</span>
                    <input type="file" id="imageInput1" accept="image/*" hidden>
                </div>
                <div id="file2">
                    <button id="cancel2" class="cancelButtonInactive"> X </button>
                    <p id="preview2"></p>
                    <span id="wordsInside2">Click or Drag an image file</span>
                    <input type="file" id="imageInput2" accept="image/*" hidden>
                </div>
            </div>

            <div id="controlPanel">
                <button id="openFileDropper"> Program Start <span id="noClick1" class="noClicked"></span></button>

                <button id="downloadButton">Download Image <span id="noClick4" class="clicked"></span></button>

                <button id="startImages" disabled> Start Load Process <span id="noClick2" class="clicked"></span> <span id="show1" class="red"></span> <span id="show2" class="red"></span></button>
                
                <button id="runAnimation"> Run Animation <span id="noClick3" class="clicked"></span> <span id="loadBar"><span id="loadBarGreen"></span></span></button>

                <button id="restart"> Program Finish <span id="noClick5" class="clicked"></span></button>

                <p id="controlPanelTitle"> Control Panel </p>

            </div>
        </div>
    
    <div id="howItWork">

        <div id="justabackground">
            <p id="text"> 
                Two images are uploaded by the user — a source image, from which the colors are drawn, and a reference image, from which the target shape is derived. Both images are displayed on the screen, and the color of every single point in each image is read and recorded. Each point is then treated as its own small unit, for which its position and color are stored, and from which a brightness value is calculated using the formula 0.299 * red + 0.587 * green + 0.114 * blue, where red, green, and blue each represent how much of that color is present at that point. This particular formula is used instead of a simple average because it reflects how a human eye actually perceives light and dark — green is naturally seen as far brighter than red or blue at the same intensity, so it is weighted much more heavily in the calculation. Once every point in both images has been measured this way, the points from each image are ordered from darkest to lightest, producing a ranked list of colors from the source image and a ranked list of positions from the reference image.

These two ranked lists are then matched up according to their shared order: the color that was ranked, say, the hundredth-darkest in the source image is reassigned to wherever the hundredth-darkest point was located in the reference image. In this way, the palette of colors from the source image is reshaped to follow the light-and-dark pattern of the reference image — the darkest areas of the reference are filled in with the darkest available source colors, and the lightest areas are filled in with the lightest. For each point, the distance it needs to travel from its starting position to its new position is calculated and broken into many small, even steps, so that the transformation can unfold gradually rather than happening all at once.

This gradual transformation is then animated on screen, with every point being nudged a small amount toward its new position, frame by frame, until it settles into place. While this is happening, a loading bar fills up in step with the progress, giving the user a clear sense that the transformation is underway. Once every point has reached its destination, the image is left fully rearranged — still made up of the source image's original colors, but now shaped according to the reference image's pattern of light and dark — and the final result can then be saved as an image file to the user's device.
            </p>
        </div>

    </div>


    <div id="codeContainer">

        <p id="gitHub"> Github </p>

        <div id="codeBase">

            <div id="tabs">
                <button id="html"> index.html </button>

                <button id="css"> style.css </button>

                <button id="js1"> main.js </button>

                <button id="js2"> square.js </button>

                <span id="transitioner"></span>
            </div>

            <p id="actualCode"> 

            </p>


        </div>

    </div>


    <script src="square.js" type="module"></script>
    <script src="main.js" type="module"></script>
   
    </body>

</html>
`;

export const css = `
        body {
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #D8D1C8;
        }
        #imageArea {
            position: absolute;
            background-color: #ffffff;
            border: 2px solid black;
            top:50%;
            left:75%;
            transform:translate(-50%, -50%);
            display:none;

        }

        #canvasContainer{
            position: fixed;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;
            transition: 1s;
        }

        #reference {
            position:absolute;
            background-color: #ffffff;
            border: 2px solid black;
            top:50%;
            left:25%;
            transform:translate(-50%, -50%);
            display:none;
        }

        #fileOpener{
            position:absolute;
            width:100%;
            height:100%;
            left:0%;
            top:0%;
            z-index: 100;
            transition: 1s;
        }

        
        #file1{
            position:fixed;
            top:50%;
            left:25%;
            transform:translate(-50%, -50%);
            height: 50%;
            width: 35%;
            background-color:#333333;
            border-radius:35px;
            corner-shape: squircle;
            content: '';
            overflow:hidden;
            z-index:101;
            box-shadow: 0px 0px 1px 1px #abdf901a;
            font-size: 25vw;
            cursor:default;
        }
        #file1:hover{
            cursor: pointer;
        }

        #file2{
            position:fixed;
            top:50%;
            left:75%;
            transform:translate(-50%, -50%);
            height: 50%;
            width: 35%;            
            background-color:#333333;
            border-radius:35px;
            corner-shape: squircle;
            content: '';
            overflow:hidden;
            z-index: 101;
            box-shadow: 0px 0px 1px 1px #abdf901a;
            cursor:default;
            font-size: 25vw;
        }
        #file2:hover{
            cursor:pointer;
        }


        .pulse{
            animation: pulsify 2s linear infinite;
        }
        .showImage{
            background-size: cover;
            background-position: center;
            opacity: 0.2;
            color:black;
        }
        #wordsInside1{
           pointer-events:none;
             pointer-events:none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size:25px;
            margin:0;
            padding:0;
            width:100%;
            text-align:center;
            color:white;
        }
        #wordsInside2{
            pointer-events:none;
             pointer-events:none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size:25px;
            margin:0;
            padding:0;
            width:100%;
            text-align:center;
            color:white;
        }

        @keyframes pulsify{
            0% {
                box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.4);
            }
            100% {
                box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
            }
        }


        #preview1{
            position:absolute;
            pointer-events:none;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
            width:100%;
            height:100%;
            margin: 0;

        }
        #preview2{
            position:absolute;
            pointer-events:none;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
            width:100%;
            height:100%;
            margin:0;

        }

        #cancel1{
            background:none;
            color:red;
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
            height:100%;
            width:100%;
            z-index: 9999;
            margin: 0;

        }
        #cancel2{
            background:none;
            color:red;
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
            height:100%;
            width:100%;
            z-index:9999;
            margin:0;


        }

        .cancelButtonInactive{
            font-size: 1em;
            opacity: 0;
            pointer-events:none;
        }
        .cancelButtonActive{
            font-size: 1em;
            pointer-events: auto;
            opacity: 0;
            transition: 1s;
        }
        .cancelButtonActive:hover{
            font-size: 1em;
            opacity:1;
            transition:1s;
        }

        
        #startImages{
            position:absolute;
            top:50%;
            left: 30%;
            transform:translate(-50%, -50%);
            z-index: 300;
            width: 20%;
            margin:0;
            height:100%;
            background:none;
            color:white;
            border: solid;
            border-color:white;
            border-width: 0px 1px 0px 1px;
        }

         #downloadButton{
            position:absolute;
            top:50%;
            left: 70%;
            transform:translate(-50%, -50%);
            z-index: 300;
            width: 20%;
            margin:0;
            height:100%;
            background:none;
            color:white;
            border: solid;
            border-color:white;
            border-width: 0px 1px 0px 1px;
        }

        #openFileDropper{
            position:absolute;
            top:50%;
            left: 10%;
            transform: translate(-50%, -50%);
            z-index: 300;
            width: 20%;
            margin:0;
            height:100%;
            border-radius:15px 0px 0px 0px;
            background:none;
            color:white;
            border: solid;
            border-color:white;
            border-width: 0px 1px 0px 1px;
        }

        #runAnimation{
            position:absolute;
            top:50%;
            left: 50%;
            transform:translate(-50%, -50%);
            z-index: 300;
            width:20%;
            height:100%;
            background:none;
            margin:0;
            color:white;
            border: solid;
            border-color:white;
            border-width: 0px 1px 0px 1px;
            padding: 0;
        }

        #restart{
            position:absolute;
            top:50%;
            left: 90%;
            transform:translate(-50%, -50%);
            z-index: 300;
            width: 20%;
            margin:0;
            height:100%;
            border-radius: 0px 15px 0px 0px;
            background:none;
            color:white;
            border: solid;
            border-color:white;
            border-width: 0px 1px 0px 1px;
        }

        #controlPanel{
            position:fixed;
            top:92.5%;
            left:50%;
            transform:translate(-50%, -50%);
            width:100%;
            height:15%;
            margin:0;
            border-radius: 15px 15px 0px 0px;
            background-color:#333333;
            z-index: 200;
            padding:0;
        }

        #controlPanelTitle{
            position: absolute;
            left:50%;
            top: -20%;
            transform:translate(-50%, -50%);
            height: 25%;
            width:25%;
            background-color: #333333;
            border-radius: 15px 15px 0px 0px;
            color:white;
            text-align: center;

        }

        #noClick1{
            position:absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%, -50%);
            width:100%;
            height: 100%;
            z-index:400;
            border-radius: 15px 0px 0px 0px;
        }
        
        #noClick2{
            position:absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%, -50%);
            width:100%;
            height: 100%;
            z-index:500;
        }

        #noClick3{
            position:absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%, -50%);
            width:100%;
            height: 100%;
            z-index:400;
        }
        #noClick4{
            position:absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%, -50%);
            width:100%;
            height: 100%;
            z-index:400;
        }
        #noClick5{
            position:absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%, -50%);
            width:100%;
            height: 100%;
            z-index:400;
            border-radius: 0px 15px 0px 0px;
        }

        .clicked{
            background-color: black;
            opacity: 0.4;
            cursor: default;
        }
        .noClicked{
            z-index: 200;
            background-color:none;
            opacity: 0;
            cursor: pointer;
        }

        #show1{
            position:absolute;
            content: '';
            z-index:400;
            left: 90%;
            top: 20%;
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
        #show2{
            position:absolute;
            content: '';
            z-index:400;
            left: 80%;
            top: 20%;
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }

        .red{
            background-color: red;
        }
        .green{
            background-color: green;
        }

        #loadBar{
            position:absolute;

            top: 20%;
            left: 50%;

            transform:translate(-50%, -50%);

            height: 10%;
            width: 75%;

            border-radius: 15px;

            background-color: gray;

            z-index: 300;

            overflow:hidden;

        }

        #loadBarGreen{
            position:absolute;
            content: '';
            
            height: 100%;
            width: 100%;

            top:50%;
            left: -50%;

            border-radius: 15px;

            transform:translate(-50%, -50%);
            background-color: green;

            
            font-size: 1em;


        }

        #mainContainer{
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            padding: 0;
            margin: 0;
            transition: 1s;
        }

        #startingScreen{
            left: 0;
            top: 0%;
            height: 100%;
            width: 100%;
            position: fixed;
            font-size: 5vw;
            transition: 1s;
            margin: 0;
            padding: 0;
        }

        #welcomeTitle{
            left: 28%;
            top: 45%;
            width: 20%;
            height: 10%;
            text-align: center;
            padding: 0;
            margin: 0;
            font-size: 1em;
            position: absolute;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #textInput{
            left: 50%;
            top: 50%;                 /* changed from top:0 — align vertically with welcomeTitle */
            transform: translateY(-50%); /* centers this block on that 45% line, same reference point as welcomeTitle */
            width: 20%;
            height: 10%;               /* changed from 100% — matches welcomeTitle's height instead of filling the whole screen */
            text-align: left;
            margin: 0;
            padding: 0;
            font-size: 1em;
            position: absolute;
            color: white;
        }

        #name{
            position: absolute;
            top: 0;                    /* now relative to #textInput, which is already vertically aligned */
            left: 0%;
            width: 100%;                /* changed from 150% — stay within #textInput's own box, no overflow */
            height: 100%;                /* changed from 10% — fill #textInput's height exactly */
            border:none;
            border-bottom: 2px solid white;
            border-radius: 15px;
            background: none;
            font-size: 0.6em;            /* relative to #startingScreen's 5vw, scales consistently with welcomeTitle */
            color: white;
            z-index: 300;
            transition: 1s;
        }

        #text2 {
            position: fixed;
            left: 93%;
            top: 2%;
            font-size: 0.75vw;
            color: red;
            height: 5%;
            width: 10%;
        }

        #name:focus{
            outline: none;
            border: 2px solid white;
            transition: 1s;
        }

        #placeHolderText{
            position: absolute;
            top: 0;
            left: 0;
            width: 60%;
            height: 100%;                /* matches #name's height now, instead of a separate 10% */
            display: flex;
            align-items: center;
            justify-content: left;
            text-align: center;
            background: #D8D1C8;
            color: white;
            opacity: 0.5;
            z-index: 200;
            transition: 1s;
            padding: 2px;
            pointer-events: none;
            font-size: 1em; /* matches #name, consistent scaling */
        }

        .nameInput{
            transform: translate(5%, -75%);
        }

        #choices{

            position: fixed;
            top: 37.5%;
            left: 12.5%;
            height: 25%;
            width: 75%;
            background-color: #333333;
            border-radius: 35px;
            font-size: 2em;
            transition: 1s;
        }

        #work{
            position: absolute;
            top: 50%;
            left: 25%;
            transform: translate(-50%, -50%);
            height: 50%;
            width: 20%;
            border-radius: 35px;
            border: none;
            background-color: #D8D1C8;
            font-size: 1em;

        }

        #anotherPage{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 50%;
            width: 20%;
            border-radius: 35px;
            border:none;
            background-color:#D8D1C8;
            font-size: 1em;
            
        }

        #code{

            position:absolute;
            top: 50%;
            left: 75%;
            transform:translate(-50%, -50%);
            height: 50%;
            width: 20%;
            border-radius: 35px;
            border: none;
            background-color: #D8D1C8;
            font-size: 1em;

        }

        #goAway{
            position:fixed;
            color:white;
            border:none;
            background-color: #333333;
            top: 5%;
            left:5%;
            height: 5%;
            width: 15%;
    
            border-radius: 35px;
            z-index: 500;
            transition: 1s;
        }

        /* This is the move animation */
        .move{
            transform: translateX(150%);
        }
        .moveTitleScreen{
            transform: translateY(-40%);
        }
        .moveOut{
            transform: translateX(-150%);
        }

        #howItWork{
            position: fixed;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            border:none;
            background: none;
            font-size: 20vh;
            transition: 1s;
        }
        #justabackground{
            position: absolute;
            top: 20%;
            left: 0%;

            width: 100%;
            height: 80%;

            background-color: #D8D1C8;

            border:none;
            padding: 0px;

            overflow: auto;
            border-radius: 35px;
            transition: 1s;
        }

        #text{
            color: #333333;
            font-size: 0.2em;
            padding: 5%;
        
        }

        button:hover{
            cursor: pointer;
        }
        button{
            cursor: default;
        }


        #codeContainer{
            position:fixed;
            top:15%;
            left:0%;
            width: 100%;
            height: 85%;
            font-size: 5vw;
            transition: 1s;
        }

        #gitHub{
            position:absolute;
            font-size: 0.4em;
            left: 15%;
            top: 5%;
            height: 5%;
            width: 10%;
            transform: translate(-50%, -50%);
            color: white;
            border-radius: 35px;
            background-color: #333333;
            text-align: center;
            margin: 0;
            border:none;

        }

        #tabs{
            position: absolute;
            top: -5%;
            height: 5%;
            left: 25%;
            width: 50%;
            border-radius: 35px 35px 0px 0px;
            background-color:#333333;
        }

        #html{
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            height: 100%;
            width: 25%;
            border-radius: 35px 0px 0px 0px;
            background: none;
            border-color: white;
            border-width: 0 1px 0px 0px;
            font-size: 0.25em;
            transition: 1s;
        }

        #css{
            position: absolute;
            top: 50%;
            left: 25%;
            transform: translateY(-50%);
            height: 100%;
            width: 25%;
            border-radius: 0px 0px 0px 0px;
            background: none;
            border-color: white;
            border-width: 0 1px 0px 1px;
            font-size: 0.25em;
            transition: 1s;
        }
        #js1{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%);
            height: 100%;
            width: 25%;
            border-radius: 0px 0px 0px 0px;
            background: none;
            border-color: white;
            border-width: 0px 1px 0px 1px;
            font-size: 0.25em;
            transition: 1s;
        }
        #js2{
            position: absolute;
            top: 50%;
            left: 75%;
            transform: translateY(-50%);
            height: 100%;
            width: 25%;
            border-radius: 0px 35px 0px 0px;
            background: none;
            border-width: 0px 0px 0px 1px;
            border-color: white;
            color: white;
            font-size: 0.25em;
            transition: 1s;
        }

        #transitioner{
            position: absolute;
            background-color: #CCCCCC;
            opacity: 0.2;
            border-radius: 15px;
            top: 5%;
            height: 90%;
            left: 5%;
            width: 15%;
            z-index: 9999;
            transition: 1s;

        }

        #codeBase{
            position:absolute;
            top: 10%;
            border-radius: 35px 35px 35px 35px;
            height: 90%;
            width: 98%;
            left: 50%;
            transform:translateX(-50%);
            background-color:#333333;
            padding: 0;
            margin: 0;

        }

        #actualCode{
            background-color:#002b36;
            position: absolute;
            border-radius: 15px;
            top: 2.5%;
            left: 2%;
            height: 95%;
            width: 96%;
            margin: 0;
            overflow: auto; /* changed from hidden — allow scrolling if content is long */
            white-space: pre-wrap; /* preserves line breaks/indentation, wraps long lines */
            color: white; /* make sure text color is visible against the dark background */
            font-family: monospace;
            padding: 10px;
            box-sizing: border-box;
            transition:1s;
            font-size: 0.2em;
        }



`;

export const js1 = `
// program to change an image to look like anothher image



// start of actual alorithm
import square from "./square.js";
import {html, css, js1, js2} from "./code.js";

function nextPaint(callback){
    requestAnimationFrame(() => {
        requestAnimationFrame(callback);
    });
}

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

loadBarGreen.style.textAlign = 'right';
loadBarGreen.innerHTML = '0%';

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
            loadBarGreen.innerHTML = (count + 50) + '%';
            requestAnimationFrame(animateSquares);
        } else if(count == 50){
            switchStates(noClick3, noClick4, runAnimation, downloadButton);
            count++;
        }
    }

}
// end of actual alorithm



// initilizing file dropper

const buttonForFileDropper = document.getElementById("openFileDropper");
const fileOpener = document.getElementById("fileOpener");

buttonForFileDropper.addEventListener('click', displayFileDropper);

fileOpener.classList.add('move');
fileOpener.style.display = 'none';

function displayFileDropper(){
    fileOpener.style.display = "inline-block";

    requestAnimationFrame(() => {
        requestAnimationFrame(() => { // double rAF ensures the paint has actually happened
            fileOpener.classList.remove('move');
        });
    });

    switchStates(noClick1, noClick2, buttonForFileDropper, startImages);
    startImages.disabled = true;
    buttonForFileDropper.disabled = true;

    noClick1.classList.remove('noClicked');
    noClick1.classList.add('clicked');

    noClick2.classList.remove('clicked');
    noClick2.classList.add('noClicked');

    goAway.classList.add('moveOut');

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
const textInput = document.getElementById("textInput");

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
            preview.style.backgroundImage = \`url(\${arr1[i]})\`;
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
    canvas.style.display = 'inline-block'; 
    referenceCanvas.style.display = 'inline-block'; 
    runImage();
    start = true;

    switchStates(noClick2, noClick3, startImages, runAnimation);    
    
    canvasContainer.style.display = 'inline-block';
    fileOpener.classList.add('moveOut');

    nextPaint(() => {
        canvasContainer.classList.remove('move');
    });

    setTimeout(() => {
        fileOpener.style.display = 'none';
        fileOpener.classList.remove('moveOut');
        fileOpener.classList.add('move');
    }, 1000);
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

    backgroundURL = [];
    backgroundElement = [];
    pixelObjectArray = [];
    referenceImageArray = [];
    start = false;

    imageInput1.value = '';
    imageInput2.value = '';
    changeImage = undefined;
    referenceImageFile = undefined;

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

    canvasContainer.classList.add('moveOut');
    goAway.style.display = 'inline-block';
    goAway.disabled = false;

    nextPaint(() => {
        goAway.classList.remove('moveOut');
    });

    setTimeout(() => {
        canvasContainer.style.display = 'none';
        canvasContainer.classList.remove('moveOut');
        canvasContainer.classList.add('move');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctxReference.clearRect(0, 0, referenceCanvas.width, referenceCanvas.height);
    }, 1000);
}


const name = document.getElementById('name');
const welcomeTitle = document.getElementById('welcomeTitle');
const startingScreen = document.getElementById("startingScreen");
const choices = document.getElementById('choices');
const work = document.getElementById("work");
const anotherPage = document.getElementById("anotherPage");
const mainContainer = document.getElementById("mainContainer");
const goAway = document.getElementById("goAway");
const canvasContainer = document.getElementById("canvasContainer");
const placeHolderText = document.getElementById('placeHolderText');

canvasContainer.classList.add('move');
canvasContainer.style.display = 'none';

goAway.classList.add('moveOut');
goAway.style.display = 'none';

mainContainer.style.display = 'none';
mainContainer.classList.add('move');
choices.style.display = 'none';
choices.classList.add('move');


name.addEventListener('focus', changeInputTitleText);
name.addEventListener('blur', nameChange);

function nameChange(){

    placeHolderText.classList.remove('nameInput');
    placeHolderText.style.zIndex = '200';
    placeHolderText.style.fontSize = '1em';
    placeHolderText.style.height = '100%';
    placeHolderText.style.width = '60%';
    placeHolderText.style.opacity = "0.5";

}

function changeInputTitleText(){

    placeHolderText.classList.add('nameInput');
    placeHolderText.style.zIndex = '400';
    placeHolderText.style.fontSize = '0.5em';
    placeHolderText.style.height = '5%';
    placeHolderText.style.width = '30%';
    placeHolderText.style.opacity = "1";
    console.log('hi');

}


function handleEnterKey(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        choices.style.display = 'inline-block';

        nextPaint(() => {
            startingScreen.classList.add('moveTitleScreen');
            choices.classList.remove('move');
            welcomeTitle.innerHTML = 'Welcome, ' + name.value;
            welcomeTitle.style.left = '15%';
            welcomeTitle.style.width = '70%';
            name.style.display = 'none';
            placeHolderText.style.display = 'none';
            name.disabled = true;
            name.style.borderBottom = 'none';
            name.style.color = 'white';
        });

        document.removeEventListener('keydown', handleEnterKey);
    }
}
document.addEventListener('keydown', handleEnterKey);

let isTransitioningToWork = false;

work.addEventListener('click', () => {
    if (isTransitioningToWork) return;
    isTransitioningToWork = true;

    code.disabled = true;
    anotherPage.disabled = true;
    work.disabled = true;

    mainContainer.style.display = 'inline-block';
    goAway.style.display = 'inline-block';

    nextPaint(() => {
        mainContainer.classList.remove('move');
        goAway.classList.remove('moveOut');
        choices.classList.add('moveOut'); // choices is already visible, but grouped here for one paint cycle
    });

    setTimeout(() => {
        choices.style.display = 'none';
        choices.classList.add('move');
        choices.classList.remove('moveOut');
        isTransitioningToWork = false;
        goAway.disabled = false;
    }, 1000);
});

let isAnimating = false;

goAway.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    goAway.disabled = true;
    mainContainer.classList.add('moveOut');
    goAway.classList.add('moveOut');
    choices.style.display = 'inline-block';
    howItWork.classList.add('moveOut');
    codeContainer.classList.add('moveOut');

    nextPaint(() => {
        choices.classList.remove('move');
    });

    isTransitioningToWork = false;

    setTimeout(() => {
        howItWork.style.display = 'none';
        howItWork.classList.remove('moveOut');
        howItWork.classList.add('move');
        goAway.style.display = 'none';
        mainContainer.style.display = 'none';
        mainContainer.classList.remove('moveOut');
        mainContainer.classList.add('move');
        codeContainer.style.display = 'none';
        codeContainer.classList.remove('moveOut');
        codeContainer.classList.add('move');
        isAnimating = false;
        code.disabled = false;
        anotherPage.disabled = false;
        work.disabled = false;
    }, 1000);

});

const howItWork = document.getElementById('howItWork');

howItWork.classList.add('move');
howItWork.style.display = 'none';


anotherPage.addEventListener('click', showText);


function showText(){

    
    code.disabled = true;
    anotherPage.disabled = true;
    work.disabled = true;

    howItWork.style.display = 'inline-block';
    choices.classList.add('moveOut');
    goAway.style.display = 'inline-block';
    nextPaint(() => {
        howItWork.classList.remove('move');
    });
    nextPaint(() => { 
        goAway.classList.remove('moveOut');
    });

    setTimeout(() => {
        choices.style.display = 'none';
        choices.classList.remove('moveOut');
        choices.classList.add('move');
        goAway.disabled = false;
    }, 1000);

}


const htmlCode = document.getElementById('html');
const cssCode = document.getElementById('css');
const js1Code = document.getElementById('js1');
const js2Code = document.getElementById('js2');
const transitioner = document.getElementById('transitioner');
const actualCode = document.getElementById('actualCode');
const codeContainer = document.getElementById('codeContainer');
const code = document.getElementById('code');
const gitHub = document.getElementById('gitHub');

gitHub.addEventListener('click', () => {
    window.open('https://github.com/Billet1010/image-changer', '_blank');
})

code.addEventListener('click', () => {

    codeContainer.style.display = 'inline-block';
    goAway.style.display = 'inline-block';
    choices.classList.add('moveOut');


    code.disabled = true;
    anotherPage.disabled = true;
    work.disabled = true;

    nextPaint(() => {
        codeContainer.classList.remove('move');
    });
    nextPaint(() => {
        goAway.classList.remove('moveOut');
    });

    setTimeout(() => {

        choices.style.display = 'none';
        choices.classList.remove('moveOut');
        choices.classList.add('move');
        goAway.disabled = false;

    }, 1000);


});


codeContainer.style.display = 'none';
codeContainer.classList.add('move');



htmlCode.style.color = '#00ffff';
cssCode.style.color = 'white';
js1Code.style.color = 'white';
js2Code.style.color = 'white';
actualCode.textContent = html;

htmlCode.addEventListener('click', () => {

    transitioner.style.transform = 'translateX(0%)';
    htmlCode.style.color = '#00ffff';
    cssCode.style.color = 'white';
    js1Code.style.color = 'white';
    js2Code.style.color = 'white';
    actualCode.textContent = html;

});

cssCode.addEventListener('click', () => {

    transitioner.style.transform = 'translateX(165%)';
     htmlCode.style.color = 'white';
    cssCode.style.color = '#00ffff';
    js1Code.style.color = 'white';
    js2Code.style.color = 'white';
    actualCode.textContent = css;
});

js1Code.addEventListener('click', () => {

    transitioner.style.transform = 'translateX(330%)';
     htmlCode.style.color = 'white';
    cssCode.style.color = 'white';
    js1Code.style.color = '#00ffff';
    js2Code.style.color = 'white';
    actualCode.textContent = js1;

});

js2Code.addEventListener('click', () => {

    transitioner.style.transform = 'translateX(495%)';
    htmlCode.style.color = 'white';
    cssCode.style.color = 'white';
    js1Code.style.color = 'white';
    js2Code.style.color = '#00ffff';
    actualCode.textContent = js2;
    
});
`;

export const js2 = `
export default class square{
    constructor(x, y, r, g, b, a){
        this.height = 2;
        this.width = 2;
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.color = \`rgba(\${r}, \${g}, \${b}, \${a/255})\`;
        this.gray = (0.299 * this.r + 0.587 * this.g + 0.114 * this.b);
        this.newX = x;
        this.newY = y;
        this.changeX = 0;
        this.changeY = 0;
    }
    changeNews(x, y){
        this.newX = x;
        this.newY = y;
    }

    calculateDistance(){
        this.changeX = (this.newX - this.x) / 100;
        this.changeY = (this.newY - this.y) / 100;
    }
    changeXY(){
        this.x += this.changeX;
        this.y += this.changeY;
    }

}
`;