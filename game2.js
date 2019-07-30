let canvas = document.getElementById("game");
let context = canvas.getContext('2d');

let ball = {
    x:20,
    y:20,
    dx :7,
    dy :2,
    radius : 15,
};

let bars = {
    width: 100,
    height: 20,
    x:0,
    y: canvas.height - 10,
    speed: 10,
    isMovingLeft: false,
    isMovingRight:false,
}

let isGameOver = false;
document.addEventListener('keyup',function(event){
    console.log('KEYUP')
    console.log(event);
    if(event.keyCode == 37){
        bars.isMovingLeft = false;
    }else if(event.keyCode == 39){
        bars.isMovingRight = false;
    }
});

document.addEventListener('keydown',function(event){
    console.log('KEYDOWN')
    console.log(event);
    if(event.keyCode == 37){
        bars.isMovingLeft = true;
    }else if(event.keyCode == 39){
        bars.isMovingRight = true;
    }
});

function drawBall(){
    context.beginPath();
    context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    context.fillStyle = 'green';
    context.fill();
    context.closePath();
}
function drawBars(){
    context.beginPath();
    context.rect(bars.x,bars.y,bars.width,bars.height);
    context.fill();
    context.closePath();
}


    

// xử lý bóng chạm biên;
function Ballbordercollisionhandling(){
    if(ball.x < ball.radius || ball.x > canvas.width -ball.radius){
        ball.dx = -ball.dx;
    }
    if(ball.y < ball.radius || ball.y >canvas.height -ball.radius){
        ball.dy = -ball.dy;
    }
}
 function Barsbordercollisionhandling(){
     if(ball.x +ball.radius >= bars.x && ball.x + ball.radius <= bars.x + bars.width && 
        ball.y + ball.radius >= canvas.height - bars.height ){
            ball.dy = -ball.dy;
        }
 }

//vẽ bóng;
function positionBall(){
    ball.x +=ball.dx;
    ball.y +=ball.dy;
}
function borderprocessing(){
    if(bars.isMovingLeft){
        bars.x -= bars.speed;
    }else if(bars.isMovingRight){
        bars.x += bars.speed;
    }
    //xư lý đường biên bars!!
    if(bars.x < 0){
        bars.x = 0;
    }else if(bars.x > canvas.width - bars.width){
        bars.x = canvas.width -bars.width;
    }
}
    function checkGameOver(){
        if(ball.y > canvas.height - ball.radius){
            isGameOver = true;
        }
    }

function draw(){
    if(!isGameOver){
    context.clearRect(0,0,canvas.width,canvas.height); 
        drawBall();
        drawBars();
        
       
        Ballbordercollisionhandling();
        Barsbordercollisionhandling();
        positionBall();
        borderprocessing();

        checkGameOver()
    
//cải thiện độ giật của quả bóng!!
        requestAnimationFrame(draw);
}else{
        console.log("Games Over");
}
}
draw();

































