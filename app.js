let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let cellSize = 50;
let boardWidth = 1200;
let boardHeight = 800;
let snakeCells = [[0,0] , [50,0]] ;
let direction = 'right';
let gameOver = false;

let foodCells = generateRandomFood();

document.addEventListener('keydown' , (event)=>{
    if(event.key === 'ArrowUp'){direction = "up"}
    else if(event.key === 'ArrowDown'){direction = "down"}
    else if(event.key === 'ArrowLeft'){direction = "left"}
    else if(event.key === 'ArrowRight'){direction = "right"}
})

function draw(){
    if(gameOver === true){
        clearInterval(id);
        return;
    }
    // eraser
    ctx.clearRect(0,0,1200,800)
    // draw
    for(let cell of snakeCells){
        ctx.fillStyle = "brown"
        ctx.fillRect(cell[0],cell[1],cellSize,cellSize )
    }
    // draw food
    ctx.fillStyle = "orange"
    ctx.fillRect(foodCells[0] , foodCells[1] , cellSize , cellSize)
}

function update(){ 
    let headX = snakeCells[snakeCells.length-1][0]; // snakeCells[2][0]
    let headY = snakeCells[snakeCells.length-1][1]; // snakeCells[2][1]
    let newHeadX;
    let newHeadY;
    if(direction ==='up'){
        newHeadX = headX;
        newHeadY = headY - cellSize;
        if(newHeadY < 0){gameOver = true}
    }
    else if(direction ==='down'){
        newHeadX = headX;
        newHeadY = headY + cellSize;
        if(newHeadY === boardHeight){gameOver=true}
    }
    else if(direction ==='left'){
        newHeadX = headX - cellSize;
        newHeadY = headY;
        if(newHeadX <0){gameOver = true}
    }
    else if(direction ==='right'){
        newHeadX = headX + cellSize;
        newHeadY = headY;
        if(newHeadX === boardWidth){gameOver=true}
    }
    snakeCells.push([newHeadX , newHeadY]);
    snakeCells.shift()
}


function generateRandomFood(){
    return [
        Math.round(Math.random()*(boardWidth-cellSize)/cellSize)*cellSize ,  //x
        Math.round(Math.random()*(boardHeight-cellSize)/cellSize)*cellSize   //y
    ]
}

let id = setInterval(function(){
    update()
    draw()
} , 100)
