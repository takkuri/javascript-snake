const GRID_DISPLAY = '<div class="grid"> </div>';
var noOfUnits;
 
var grid = {
    dimensions: [40,40]
};

var snake = {
    initPosition: [30,30],
    direction: "l",
    position: [[30,30],
               [31,30],
               [32,30]],
    lastPosition: [],
    tails: 0
};

function arrayToPosition(array1,array2) {
    return (array1)+array2*grid.dimensions[0];
};

function render() {
    noOfUnits = grid.dimensions[0] * grid.dimensions[1];
    for(i = 0; i < noOfUnits; i++) {
        $("#grid_container").append(GRID_DISPLAY);
    }
};

function initSnake() {
    $(".grid").removeClass("grid-snake-head");
    snake.position[0][0]=snake.initPosition[0];
    snake.position[0][1]=snake.initPosition[1];
    $(".grid:eq(" +(snake.initPosition[0]+(grid.dimensions[0]*snake.initPosition[1]))+ ")").addClass("grid-snake-head");
};

function initFruit() {
    $(".grid:eq("+Math.floor((Math.random()*1600))+")").addClass("grid-fruit");
    
};

function move(currentPosition,tailPosition) {
       
    currentPosition = arrayToPosition(snake.position[0][0],snake.position[0][1]);
    //console.log(snake.position[0]);
   collisionDetect(currentPosition);
    $(".grid").removeClass("grid-snake-head");
    $(".grid").removeClass("grid-snake-tail");
    
    if (snake.lastPosition.length > snake.tails) {
        snake.lastPosition.shift();
    }    
    
    if (snake.tails >= snake.lastPosition.length) {
        var hold0 = Number(snake.position[0][0]);
        var hold1 = Number(snake.position[0][1]);
        var holdArray = [[]];
        holdArray[0][0] = hold0;
        holdArray[0][1] = hold1;
        snake.lastPosition.push(holdArray);
        } 

    for (i=1; i < snake.lastPosition.length; i++) {
        tailPosition = arrayToPosition(snake.lastPosition[i][0][0], snake.lastPosition[i][0][1]);
        $(".grid:eq("+tailPosition+")").addClass("grid-snake-tail");
    }  
 
    switch (snake.direction) 
    {
        case "r":
            snake.position[0][0] += 1;    
         
            $(".grid:eq("+(snake.position[0][0]+(grid.dimensions[0]*snake.position[0][1]))+")").addClass("grid-snake-head");
            break;
            
        case "l":
            snake.position[0][0] -= 1;    
            $(".grid:eq("+(snake.position[0][0]+(grid.dimensions[0]*snake.position[0][1]))+")").addClass("grid-snake-head");
            break;
        case "u":
            snake.position[0][1] -= 1;    
            $(".grid:eq("+(snake.position[0][0]+(grid.dimensions[0]*snake.position[0][1]))+")").addClass("grid-snake-head");
            break;     
        case "d":
            snake.position[0][1] += 1;    
            $(".grid:eq("+(snake.position[0][0]+(grid.dimensions[0]*snake.position[0][1]))+")").addClass("grid-snake-head");
            break;  
}

    
};

function collisionDetect(currentPosition) {
   
    if ($(".grid-snake-head").hasClass("grid-fruit")) {
        $(".grid-snake-head").removeClass("grid-fruit");
        snake.tails += 1;
        initFruit();
    }

    if ($(".grid-snake-head").hasClass("grid-snake-tail")) {
        $(".grid").removeClass("grid-fruit");
        snake.tails = 0;
        initSnake();
        initFruit();
      
    };

    if ((snake.position[0][0]%(grid.dimensions[0]-1)===0 && snake.direction==="r")||(snake.position[0][0]%grid.dimensions[0]===0 && snake.direction==="l")||(snake.position[0][1]%(grid.dimensions[1]-1)===0 && snake.direction==="d")||(snake.position[0][1]%grid.dimensions[0]===0 && snake.direction==="u"))  {
     $(".grid").removeClass("grid-fruit");
        snake.tails = 0;    
        initSnake();
        initFruit();
    }
};

render();
initFruit();

var timer = setInterval(move,100); 

$(document).keydown(function(e) {
    switch(e.which) {
        case 37:
            snake.direction = "l";
            break;
          case 38:
            snake.direction = "u";
            break;
        case 39:
            snake.direction = "r";
            break;
        case 40:
            snake.direction = "d";
            break;
    }
});