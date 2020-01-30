/*
    eventsKeyboard.js
    
    Color Scheme:  https://coolors.co/2a2d34-077187-009ddc-f26430-f5e0b7    
*/

//-----------------------------------------------------------
//When the page has fully loaded, execute the eventWindowLoaded function
window.addEventListener("load", eventWindowLoaded, false);
//-----------------------------------------------------------

//-----------------------------------------------------------
//eventWindowLoaded()
//Called when the window has been loaded it then calls the canvasapp() 
function eventWindowLoaded() {
    canvasApp();
} // eventWindowLoaded()
//-----------------------------------------------------------

//-----------------------------------------------------------
//canvasSupport() 
//Check for Canvas Support using modernizr.js
function canvasSupport() {
    return Modernizr.canvas;
} // canvasSupport()
//-----------------------------------------------------------

//-----------------------------------------------------------
//canvasApp() 
//The function where ALL our canvas code will go
function canvasApp() {

    //-----------------------------------------------------------
    //Check to see if the canvas has a context 
    if (!canvasSupport()) {
        return; //Canvas not supported so exit the function
    }

    // -----------------------------------------------------------
    //function for getting a random number with in a range	
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    } //getRandom



    function getRandomColor() {
        //do not be complete completely transparent
        var opacity = getRandom(9, 10) / 10;

        return "rgba(" + getRandom(230, 255) + "," + getRandom(0, 90) + "," + getRandom(165, 255) + "," + opacity + ")";
    } //randomColor()






    //-----------------------------------------------------------
    //Setup the canvas object
    var theCanvas = document.getElementById("myCanvas"); //get the canvas element
    var context = theCanvas.getContext("2d"); //get the context
    var canvasHeight = theCanvas.height; //get the height of the canvas
    var canvasWidth = theCanvas.width; //get the width of the canvas
    var canvasColor = "#000"; //canvas bg color
    var gameOver = false;
    var gameOn = false;
    var gameWon = false;
    var score = 0;
    


    // -----------------------------------------------------------
    //Setup the bottomPaddle control parameters

    //bottomPaddle size
    //var bottomPaddleWidth = 70;
    var bottomPaddleWidth = 100;
    var bottomPaddleHeight = 10;


    //bottom paddle speed
    var bottomPaddleSpeed = 50;







    // -----------------------------------------------------------
    //Setup the bottomPaddle object
    var bottomStartMin = (canvasWidth / 2) - (bottomPaddleWidth / 2) - 20;
    var bottomStartMax = (canvasWidth / 2) - (bottomPaddleWidth / 2) + 20;
    var bottomPaddle = {








        //position of bottom paddle



        x: (getRandom(bottomStartMin, bottomStartMax)),
        y: canvasHeight - (bottomPaddleHeight + 5),


        //size of the bottom paddle
        h: bottomPaddleHeight,
        w: bottomPaddleWidth,

        //color of the bottom paddle
        color: "#AE00FF",

        //bottom paddle speed
        speed: bottomPaddleSpeed

    }; //bottomPaddle object


    // -----------------------------------------------------------
    //Setup the topPaddle control parameters

    //topPaddle size
    var topPaddleWidth = 100;
    var topPaddleHeight = 10;


    //top paddle speed
    var topPaddleSpeed = 50;




    var brickArrayFlag = 0;




    // -----------------------------------------------------------
    //Setup the topPaddle object
    var topPaddle = {

        //position of top paddle
        x: (canvasWidth / 2) - (topPaddleWidth / 2),
        y: 5,

        //size of the top paddle
        h: topPaddleHeight,
        w: topPaddleWidth,

        //color of the top paddle
        color: "#000",
        //color: "#0DE002",


        //top paddle speed
        speed: topPaddleSpeed

    }; //topPaddle object

    //-----------------------LEFT PADDLE-----------------------------

    // -----------------------------------------------------------
    //Setup the leftPaddle control parameters

    //leftPaddle size
    var leftPaddleWidth = 10;
    var leftPaddleHeight = 100;


    //left paddle speed
    var leftPaddleSpeed = 50;



    // -----------------------------------------------------------
    //Setup the leftPaddle object
    var leftPaddle = {

        //position of left paddle
        x: 5,
        y: (canvasHeight / 2) - (leftPaddleHeight / 2),

        //size of the left paddle
        h: leftPaddleHeight,
        w: leftPaddleWidth,

        //color of the left paddle
        color: "#000",
        //color: "#0DE002",
        //old green: "#618A0A"

        //left paddle speed
        speed: leftPaddleSpeed

    }; //leftPaddle object


    //-----------------------RIGHT PADDLE-----------------------------

    // -----------------------------------------------------------
    //Setup the leftPaddle control parameters

    //rightPaddle size
    var rightPaddleWidth = 10;
    var rightPaddleHeight = 100;

    //right paddle speed
    var rightPaddleSpeed = 50;





    // -----------------------------------------------------------
    //Setup the rightPaddle object
    var rightPaddle = {

        //position of right paddle
        x: canvasWidth - 15,
        y: (canvasHeight / 2) - (leftPaddleHeight / 2),

        //size of the right paddle
        h: leftPaddleHeight,
        w: leftPaddleWidth,

        //color of the right paddle
        color: "#000",


        //right paddle speed
        speed: rightPaddleSpeed

    }; //rightPaddle object


    // ------------------------- DRAW RIGHT PADDLE----------------------------------
    //make boundaries
    function drawRightPaddle() {

        var topBoundary = 0;
        var bottomBoundary = canvasHeight;

        //check bottom boundary
        if (rightPaddle.y > bottomBoundary - rightPaddle.h) {

            //move right paddle to centerish
            rightPaddle.y = 100;

            //make bottom paddle appear
            bottomPaddle.color = "#AE00FF";

            //make right paddle disappear
            rightPaddle.color = "#000";

            //move bottom paddle into position
            bottomPaddle.x = canvasWidth - (bottomPaddle.w + 5);
        }

        //check top boundary
        if (rightPaddle.y < topBoundary + 5) {

            //move right paddle to centerish
            rightPaddle.y = 100;

            //make top paddle appear
            topPaddle.color = "#AE00FF";

            //make right disappear
            rightPaddle.color = "#000";

            //move top paddle into position
            topPaddle.x = canvasWidth - (topPaddle.w + 5);
        }


        //draw the left paddle
        context.beginPath();
        context.fillStyle = rightPaddle.color;
        context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h);
        context.closePath();

    } //drawLeftPaddle()

    //-----------------------------------------------------------

    //----------------------DRAW BOTTOM PADDLE--------------------


    function drawBottomPaddle() {

        var leftBoundary = 0;
        var rightBoundary = canvasWidth - bottomPaddle.w;
        var bottomBoundary = canvasHeight;

        //check left boundary
        if (bottomPaddle.x < leftBoundary) {

            //set to left
            bottomPaddle.x = 100;

            //make left paddle active
            leftPaddle.color = "#AE00FF";

            //move left paddle in position
            leftPaddle.y = (bottomBoundary - leftPaddle.h) - 5;

            //make bottom paddle disappear
            bottomPaddle.color = "#000";

        }

        //check right boundary
        if (bottomPaddle.x > rightBoundary) {

            //set bottom paddle to right boundary
            bottomPaddle.x = 100;

            //Give right paddle the active color
            rightPaddle.color = "#AE00FF";

            //move right paddle in position
            rightPaddle.y = (canvasHeight - rightPaddle.h) - 5;

            //make bottom paddle disappear
            bottomPaddle.color = "#000";
        }


        //draw the bottom paddle
        context.beginPath();
        context.fillStyle = bottomPaddle.color;
        context.fillRect(bottomPaddle.x, bottomPaddle.y, bottomPaddle.w, bottomPaddle.h);
        context.closePath();

    } //drawBottomPaddle()


    //----------------------DRAW TOP PADDLE--------------------


    function drawTopPaddle() {

        var leftBoundary = 0;
        var rightBoundary = canvasWidth - topPaddle.w;

        //check left boundary
        if (topPaddle.x < leftBoundary + 5) {

            //set top paddle to centerish
            topPaddle.x = 100;

            //make left paddle appear
            leftPaddle.color = "#AE00FF";

            //move left paddle into position
            leftPaddle.y = 5;

            //make top paddle disappear
            topPaddle.color = "#000";

        }

        //check right boundary
        if (topPaddle.x > rightBoundary) {

            //set top paddle to centerish
            topPaddle.x = 100;

            //Make top paddle disappear
            topPaddle.color = "#000";

            //move right paddle into position
            rightPaddle.y = 5;

            //make right paddle appear
            rightPaddle.color = "#AE00FF";



        }


        //draw the top paddle
        context.beginPath();
        context.fillStyle = topPaddle.color;
        context.fillRect(topPaddle.x, topPaddle.y, topPaddle.w, topPaddle.h);
        context.closePath();

    } //drawTopPaddle()





    //------------------------------DRAW LEFT PADDLE--------------------------

    // -----------------------------------------------------------
    //make boundaries
    function drawLeftPaddle() {

        var topBoundary = 0;
        var bottomBoundary = canvasHeight - leftPaddle.h;

        //check left boundary
        if (leftPaddle.y > bottomBoundary) {

            //set left to center
            leftPaddle.y = 100;

            //make left paddle disappear
            leftPaddle.color = "#000";

            //make bottom paddle active color
            bottomPaddle.color = "#AE00FF";

            //set bottom paddle to left edge + 5
            bottomPaddle.x = 5;
        }

        //check right boundary
        if (leftPaddle.y < topBoundary + 5) {

            //set left paddle y to centerish
            leftPaddle.y = 100;

            //make left paddle disappear
            leftPaddle.color = "#000";

            //set top paddle to left edge + 5
            topPaddle.x = 5;

            //make top paddle appear
            topPaddle.color = "#AE00FF";

        }


        //draw the left paddle
        context.beginPath();
        context.fillStyle = leftPaddle.color;
        context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h);
        context.closePath();

    } //drawLeftPaddle()

    //-----------------------------------------------------------
    // clear canvas
    function clearCanvas() {

        context.fillStyle = "#000";
        context.fillRect(0, 0, canvasWidth, canvasHeight)

    } //  clearCanvas()



    //-----------------------------------------------------------
    //---------------------------KEY PRESS------------------------
    //event listeners    
    window.addEventListener("keypress", eventKeyPress);

    //-----------------------------------------------------------
    //event handlers
    function eventKeyPress(e) {


        //---------------BOTTOM PADDLE KEYS------------------------------
        //console.log("eventKeyPress(): " + e.key);
        //move left   
        if (e.key == "a" && bottomPaddle.color == "#AE00FF") {
            bottomPaddle.x -= bottomPaddle.speed;
            //move other paddles

        }


        //move right
        if (e.key == "d" && bottomPaddle.color == "#AE00FF") {
            bottomPaddle.x += bottomPaddle.speed;

        }

        //---------------TOP PADDLE KEYS------------------------------
        //move left   
        if (e.key == "d" && topPaddle.color == "#AE00FF") {
            topPaddle.x -= topPaddle.speed;

        }


        //move right
        if (e.key == "a" && topPaddle.color == "#AE00FF") {
            topPaddle.x += topPaddle.speed;

        }

        //--------------------LEFT PADDLE KEYS---------------------------

        if (e.key == "a" && leftPaddle.color == "#AE00FF") {
            leftPaddle.y -= leftPaddle.speed;

        }


        //move right
        if (e.key == "d" && leftPaddle.color == "#AE00FF") {
            leftPaddle.y += leftPaddle.speed;


        }

        //--------------------RIGHT PADDLE KEYS---------------------------

        if (e.key == "d" && rightPaddle.color == "#AE00FF") {
            rightPaddle.y -= rightPaddle.speed;

        }


        //move right
        if (e.key == "a" && rightPaddle.color == "#AE00FF") {
            rightPaddle.y += rightPaddle.speed;

        }
        //pink paddle "#FF38BC"
    } //eventKeyPress()

    // -----------------------------------------------------------
    // CIRCLE VARIABLES
    // -----------------------------------------------------------

    // -----------------------------------------------------------
    //Setup circle control variables

    //color of the circle
    var circleColor = "#FFF";

    //size of the circle


    var circleSize = 15;

    //Starting point 

    //hits bottom of brick
    //var startX = 100;
    //var startY = 380;

    var minStart = bottomPaddle.x - 5;
    var maxStart = bottomPaddle.x + bottomPaddle.w + 5;



    //hits top of brick
    var startX = getRandom(minStart, maxStart);
    var startY = bottomPaddle.y - (circleSize / 2);



    //console.log("start x,y: " + startX + "," + startY);


    //movement of circle

    var minSpeed = 2;
    var maxSpeed = 3;

    //bob
    var circleSpeedX = getRandom(minSpeed, maxSpeed);
    var circleSpeedY = getRandom(minSpeed, maxSpeed);

    var coin = getRandom(1, 10);
    if (coin > 5) {
        circleSpeedX *= -1;
    }



    // -----------------------------------------------------------
    //Setup the circle object
    var circle = {

        //position of circle
        x: startX,
        y: startY,

        //size of the circle
        size: circleSize,

        //color of the circle
        color: circleColor,

        //movement

        moveX: circleSpeedX,
        moveY: circleSpeedY

    };

    // -----------------------------------------------------------
    // CIRCLE FUNCTIONS
    // -----------------------------------------------------------

    // -----------------------------------------------------------
    //draw circle
    function drawCircle() {

        //start path
        context.beginPath();
        //draw circle    
        context.arc(circle.x, circle.y, circle.size / 2, 0, Math.PI * 2);
        //set fill color
        context.fillStyle = circle.color;
        //fill the circle
        context.fill();
        //close path
        context.closePath();

        //console.log(circle.x + "," + circle.y + "," + circle.color);

    } //drawCircle()  
    //-----------------------------------------------------------

    // -----------------------------------------------------------


    //AUDIO-----------------------------------------------------
    function playSound1() {

        var sound1 = new Audio("audio/sound1.mp3");

        sound1.play();
    }

    function playSound2() {

        var sound2 = new Audio("audio/sound2.mp3");

        sound2.play();
    }




    function moveCircle() {


        // increment to the next location based on movement size

        circle.x += circle.moveX;
        circle.y -= circle.moveY;
    }

     function checkFinalBrick() {
         var isLast = true;
         var non_black_index = -1;
         for (var i = 0; i < 25; i++) {
             if (bricks[i].color != "#000") {
                 if (non_black_index != -1) {
                     isLast = false;
                 }
                 non_black_index = i;
            }
         }
         if (isLast) {
             return bricks[non_black_index];
         }
         else{
         return null;
         }
         if (isLast != null){
            window.setTimeout(checkFinalBrick, 1000);
         }
     }
  
    
    
    // check boundaries of Y axis (bottom or top)

    function checkBottomPaddleCollision() {

        //define boundaries
        var leftBoundary = circle.size / 2;
        var rightBoundary = canvasWidth - circle.size / 2;
        var topBoundary = circle.size / 2;
        var bottomBoundary = canvasHeight - circle.size / 2;

        //circle variables
        var object1X = circle.x - (circle.size / 2);
        var object1Y = circle.y - (circle.size / 2);
        var object1W = circle.size;
        var object1H = circle.size;

        //bottom paddle variables
        var object2X = bottomPaddle.x;
        var object2Y = bottomPaddle.y;
        var object2W = bottomPaddle.w;
        var object2H = 1;
        var object2Color = bottomPaddle.color;



        if ((circle.y - (circle.size / 2) > bottomBoundary) || (circle.y + (circle.size / 2) < topBoundary)) {
            circle.color = "#000";
            gameOver = true;

        }

        // check boundaries of X axis (right and left)

        if ((circle.x - (circle.size / 2) > rightBoundary) || (circle.x + (circle.size / 2) < leftBoundary)) {
            circle.color = "#000";
            gameOver = true;


        }
        //bottom paddle collision
        if (object1X < object2X + object2W &&
            object1X + object1W > object2X &&
            object1Y < object2Y + object2H &&
            object1Y + object1H > object2Y &&
            object2Color == "#AE00FF") {

            circle.y -= 3;
            circle.moveY *= -1;
            playSound1();
            score += 5;

        }
    }

    function checkRightPaddleCollision() {

        //circle variables
        var object1X = circle.x - (circle.size / 2);
        var object1Y = circle.y - (circle.size / 2);
        var object1W = circle.size;
        var object1H = circle.size;

        //right paddle variables
        var object3X = rightPaddle.x;
        var object3Y = rightPaddle.y;
        var object3W = 1;
        var object3H = rightPaddle.h;
        var object3Color = rightPaddle.color;

        if (object1Y < object3Y + object3H && //everything above bottom of paddle y
            object1Y + object1H > object3Y && //everything below top of paddle y
            object1X + object1W > object3X &&
            object3Color == "#AE00FF") {

            //---------------------------------------------------
            //there is a collision
            //console.log("collision!!!!");
            circle.x -= 3;
            circle.moveX *= -1;
            score += 5;
            playSound1();
        }
    }

    function checkTopPaddleCollision() {

        //circle variables
        var object1X = circle.x - (circle.size / 2);
        var object1Y = circle.y - (circle.size / 2);
        var object1W = circle.size;
        var object1H = circle.size;


        //top paddle variables
        var object4X = topPaddle.x;
        var object4Y = topPaddle.y + topPaddle.h;
        var object4W = topPaddle.w;
        var object4H = 1;
        var object4Color = topPaddle.color;

        //score variables




        if (object1X < object4X + object4W &&
            object1X + object1W > object4X &&
            object1Y < object4Y + object4H &&
            object1Y + object1H > object4Y &&
            object4Color == "#AE00FF") {

            //---------------------------------------------------
            //there is a collision
            //console.log("collision!!!!");
            circle.y += 3;
            circle.moveY *= -1;
            score += 5;
            playSound1();
        }
    }

    function checkLeftPaddleCollision() {

        //circle variables
        var object1X = circle.x - (circle.size / 2);
        var object1Y = circle.y - (circle.size / 2);
        var object1W = circle.size;
        var object1H = circle.size;


        //left paddle variables
        var object5X = leftPaddle.x + leftPaddle.w;
        var object5Y = leftPaddle.y;
        var object5W = 1;
        var object5H = leftPaddle.h;
        var object5Color = leftPaddle.color;

        if (object1Y < object5Y + object5H && //everything above bottom of paddle y
            object1Y + object1H > object5Y && //everything below top of paddle y
            object1X - object1W < object5X &&
            object1X < object5X + object5W &&
            object5Color == "#AE00FF") {

            //---------------------------------------------------
            //there is a collision
            //console.log("collision!!!!");
            circle.x += 3;
            circle.moveX *= -1;
            score += 5;
            playSound1();
        }


    } //moveCircle() 

    //-----------------------------------BRICKS--------------------------------

    //brick control variables
    var bricks = [];
    var columns = 5;
    var count = 25;
    var brickWidth = 70;
    var brickHeight = 40;
    var brickLevel = (canvasHeight / 2) - (brickHeight);
    var brickColor = getRandomColor();



    //paddle
    var brick = {
        x: (canvasWidth / 2) - (brickWidth / 2),
        y: brickLevel,
        h: brickHeight,
        w: brickWidth,
        color: brickColor
    }; //paddle {}

    var bricks = [];


    //--------------------------------BRICK ARRAY STUFF-------------------------------------------------


    function buildBricks() {

        //for (col = 0; col < columns; ++col) {

        var numRows = 5;
        var numBricksRow = 5;
        var offsetY = brickHeight + 5;
        var offsetX = brickWidth + 5;
        var startX = (canvasWidth / 2) - ((offsetX * 5) / 2);
        var startY = (canvasHeight / 2) - ((offsetY * 5) / 2);
        var brickX = startX;
        var brickY = startY;

        //for each row
        for (var r = 0; r < numRows; ++r) {


            for (c = 0; c < numBricksRow; ++c) {


                //new Brick
                var newBrick = {
                    x: brickX,
                    y: brickY,
                    h: brickHeight,
                    w: brickWidth,
                    color: brickColor
                }; //newBrick {}

                brickX += offsetX;

                //add the new brick
                bricks.push(newBrick);

            } //for each column

            brickY += offsetY;
            brickX = startX;

        } // for each row




    } //buildBricks()
    

    function drawBricks() {

        for (var i = 0; i < bricks.length; ++i) {

            context.beginPath();
            context.fillStyle = bricks[i].color;
            context.fillRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
            context.closePath();

            //drawBricks()
        }
    }


    function bottomBrickCol() {

        for (var i = 0; i < bricks.length; ++i) {
            //circle variables
            var object1X = circle.x - (circle.size / 2);
            var object1Y = circle.y - (circle.size / 2);
            var object1W = circle.size;
            var object1H = circle.size;
            //brick variables
            var object2X = bricks[i].x;
            var object2Y = bricks[i].y;
            var object2W = bricks[i].w;
            var object2H = 1;
            var object2Color = bricks[i].color;

            //bottom of brick collision
            if (object1X < object2X + object2W &&
                object1X + object1W > object2X &&
                object1Y < object2Y + object2H &&
                object1Y + object1H > object2Y &&
                object2Color != "#000") {

                //---------------------------------------------------
                //there is a collision
                console.log("bottom collision");

                circle.moveY *= -1;
                bricks[i].color = "#000";
                playSound2();
                score += 50;
            }
        }
    }


    function topBrickCol() {

        for (var i = 0; i < bricks.length; ++i) {
            //circle variables
            var object1X = circle.x - (circle.size / 2);
            var object1Y = circle.y - (circle.size / 2);
            var object1W = circle.size;
            var object1H = circle.size;
            //brick variables
            var object2X = bricks[i].x;
            var object2Y = bricks[i].y + bricks[i].h;
            var object2W = bricks[i].w;
            var object2H = 1;
            var object2Color = bricks[i].color;


            //Top of brick collision
            if (object1X < object2X + object2W &&
                object1X + object1W > object2X &&
                object1Y < object2Y + object2H &&
                object1Y + object1H > object2Y &&
                object2Color != "#000") {

                //---------------------------------------------------
                //there is a collision
                console.log("top collision");
                circle.moveY *= -1;
                bricks[i].color = "#000";
                playSound2();
                score += 50;
            }
        }
    }


    function leftBrickCol() {

        for (var i = 0; i < bricks.length; ++i) {

            //circle variables
            var object1X = circle.x - (circle.size / 2);
            var object1Y = circle.y - (circle.size / 2);
            var object1W = circle.size;
            var object1H = circle.size;

            //brick variables
            var object2X = bricks[i].x;
            var object2Y = bricks[i].y;
            var object2W = 1;
            var object2H = bricks[i].h;
            var object2Color = bricks[i].color;

            //Left of brick collision
            if (object1X < object2X + object2W && //less than right edge(1)
                object1X + object1W > object2X && //greater than left edge(1)
                object1Y < object2Y + object2H && //less than bottom
                object1Y + object1H > object2Y && //greater than top
                object2Color != "#000") {

                //---------------------------------------------------
                //there is a collision
                console.log("left collision");
                circle.moveX *= -1;
                bricks[i].color = "#000";
                playSound2();
                score += 50;
            }
        }
    }


    function rightBrickCol() {

        for (var i = 0; i < bricks.length; ++i) {

            //circle variables
            var object1X = circle.x - (circle.size / 2);
            var object1Y = circle.y - (circle.size / 2);
            var object1W = circle.size;
            var object1H = circle.size;

            //brick variables
            var object2X = bricks[i].x + bricks[i].w;
            var object2Y = bricks[i].y;
            var object2W = 1;
            var object2H = bricks[i].h;
            var object2Color = bricks[i].color;

            //Top of brick collision
            if (object1X < object2X + object2W &&
                object1X + object1W > object2X &&
                object1Y < object2Y + object2H &&
                object1Y + object1H > object2Y &&
                object2Color != "#000") {

                //---------------------------------------------------
                //there is a collision
                console.log("right collision");
                circle.moveX *= -1;
                bricks[i].color = "#000";
                playSound2();
                score += 50;
            }
        }
    }

    function drawScore() {
        var messageScore = score;
        context.beginPath();

        context.fillStyle = "#FF00FF";

        context.font = "25px Orbitron";
        context.fillText(messageScore, 70, 70);
        //context.strokeText(message, 125, 390);
        context.strokeText(messageScore, 70, 70);
        context.closePath();

    }





    //-----------------------------------------------------------
    // draw the canvas
    function drawCanvas() {

        gameOn = true;

        //clear the canvas
        clearCanvas();

        moveCircle();

        // draw the bottom paddle 
        drawBottomPaddle();

        // draw the left paddle 
        drawLeftPaddle();

        // draw the right paddle 
        drawRightPaddle();

        // draw the top paddle 
        drawTopPaddle();


        //draw brick
        drawBricks();
        

        //draw score
        drawScore();

        //draw ball
        drawCircle();



        //--------------------------BRICK COLLISIONS------------------------

        //bottom brick collision
        bottomBrickCol();

        //top brick collision
        topBrickCol();

        //left brick collision
        leftBrickCol();

        //right brick collision
        rightBrickCol();

        //------------------------END BRICK COLLISIONS------------------------------



        //check for bottom paddle collision
        checkBottomPaddleCollision();

        //check for top paddle collision
        checkTopPaddleCollision();

        //check for left paddle collision
        checkLeftPaddleCollision();

        //check for ball paddle collision
        checkRightPaddleCollision();
        


    } // drawCanvas()

    //-----------------------------------------------------------
    theCanvas.addEventListener("click", eventMouseClickCanvas);

    //-----------------------------------------------------------
    //start the game when the mouse is clicked
    function eventMouseClickCanvas(e) {

        //start the game
        gameOn = true;
        console.log("Game Start Click")


    } //eventMouseClick()

    //-----------------------------------------------------------
    //write the End Screen
    function gameOverScreen() {
        canvasColor = "#FFFFFF";


        var message = "Your score was";
        context.beginPath();

        context.fillStyle = "#FF00FF";

        context.font = "40px Orbitron";
        context.fillText(message, 170, 250);
        //context.strokeText(message, 125, 390);
        context.strokeText(message, 170, 250);
        context.closePath();
        console.log("Game Over!");
    }

    function gameOverScreen2() {
        canvasColor = "#FFFFFF";


        var message = "Hit command/control r to retry!";
        context.beginPath();


        context.fillStyle = "#FFB7FF";

        context.font = "30px Orbitron";
        context.fillText(message, 140, 300);

        context.strokeText(message, 140, 300);

        context.closePath();
        console.log("Game Over!");
    }

    function gameOverScreen3() {
        canvasColor = "#FFFFFF";

        context.beginPath();

        context.fillStyle = "#FF00FF";

        context.font = "35px Orbitron";
        context.fillText(score, 538, 250);
        context.strokeText(score, 538, 250);
        context.closePath();
        console.log("Game Over!");
    }





    //-----------------------------------------------------------
    //write the Start Screen
    function gameStartScreen() {

        gameOn = false;

        var message = "Click to Begin Game";

        //write the frame counter on the canvas
        context.fillStyle = "#FF00FF";
        context.font = "42px Orbitron";
        context.fillText(message, 170, 150);
    }

    function gameStartRules() {

        gameOn = false;

        var message = "Destroy all of the hyper-bricks using your techno-paddle and become a";

        //write the frame counter on the canvas
        context.fillStyle = "#FFB7FF";
        context.font = "18px Orbitron";
        context.fillText(message, 25, 200);
    }

    function gameStartRules2() {

        gameOn = false;

        var message = "winner! The 'A' key makes the techno-paddle go clockwise and the 'D' key";

        //write the frame counter on the canvas
        context.fillStyle = "#FFB7FF";
        context.font = "18px Orbitron";
        context.fillText(message, 25, 230);
    }

    function gameStartRules3() {

        gameOn = false;

        var message = "makes it go counter-clockwise. Good luck!";

        //write the frame counter on the canvas
        context.fillStyle = "#FFB7FF";
        context.font = "18px Orbitron";
        context.fillText(message, 25, 260);
    }



    //listen for a click on the canvas
    theCanvas.addEventListener("click", eventMouseClickCanvas);

    //-----------------------------------------------------------
    //start the game when the mouse is clicked
    function eventMouseClickCanvas(e) {

        //start the game
        console.log("mouse click in eventMouseClickCanvas")
        drawCanvas();


    } //eventMouseClick()

    function checkGameWon() {
        console.log("check game won");
        count = 0;
        for (var i = 0; i < bricks.length; ++i) {
            if (bricks[i].color != "#000") {
                count += 1;
            }
        }
        if (count == 0) {
            gameWon = true;
        }


    }
    
    function gameWonScreen() {

        canvasColor = "#FFFFFF";

        console.log("Game Won Screen");
        var message = "You're a big winner!";
        context.beginPath();

        context.fillStyle = "#FF00FF";

        context.font = "60px Orbitron";
        context.fillText(message, 80, 270);
        context.strokeText(message, 80, 270);
        context.closePath();


    }

    function gameWonScreen2() {

        canvasColor = "#FFFFFF";

        console.log("Game Won Screen2");
        var message = "Final score: ";
        context.beginPath();

        context.fillStyle = "#AE00FF";

        context.font = "50px Orbitron";
        context.fillText(message, 170, 370);
        context.strokeText(message, 170, 370);
        context.closePath();


    }

    function gameWonScreen3() {

        canvasColor = "#FFFFFF";

        console.log("Game Won Screen3");

        context.beginPath();

        context.fillStyle = "#FF00BF";

        context.font = "50px Orbitron";
        context.fillText(score, 503, 373);
        context.strokeText(score, 503, 373);
        context.closePath();


    }

    function gameWonScreen4() {

        canvasColor = "#FFFFFF";

        console.log("Game Won Screen3");

        context.beginPath();

        context.fillStyle = "#AE00FF";

        context.font = "50px Orbitron";
        context.fillText(score, 500, 370);

        context.closePath();


    }




    //-----------------------------------------------------------
    // start game setup function
    function startGame() {

        console.log("startGame");




    } // startGame()


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    // Game Loop
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    // the game loop
    function gameLoop() {
        requestAnimationFrame(gameLoop);

        if (!gameOver && gameOn) {
            //draw the canvas
            drawCanvas();

            checkGameWon();
            //checkFinalBrick();
        }
        
        
        



        if (!gameOver && !gameOn) {
            //draw the canvas
            clearCanvas();
            gameStartScreen();
            gameStartRules();
            gameStartRules2();
            gameStartRules3();
        }

        if (gameOver) {
            clearCanvas();
            gameOverScreen();
            gameOverScreen2();
            gameOverScreen3();
            //eventMouseClickCanvas(e);

            console.log("Game Over if statement");

        }

        if (gameWon) {
            clearCanvas();
            gameWonScreen();
            gameWonScreen2();
            gameWonScreen3();
            gameWonScreen4();
            console.log("Game Won if statement");

        }

    } // gameLoop()

    //-----------------------------------------------------------
    //start the game loop
    // -----------------------------------------------------
    //load the images and start the game loop

    //setup
    buildBricks();
    gameStartScreen();
    gameLoop();

}


//canvasApp()
