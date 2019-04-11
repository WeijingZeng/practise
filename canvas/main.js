var cvs = document.getElementById('cvsContainer')
var context = cvs.getContext('2d')
var using = false;

cvs.width = document.documentElement.clientWidth
cvs.height = document.documentElement.clientHeight

var lastPoint = {x:undefined, y:undefined}

function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineWidth = 5
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}

function cleanAll(){
    var cvs = document.getElementById('cvsContainer')
    var context = cvs.getContext('2d')
    cvs.width = document.documentElement.clientWidth
    cvs.height = document.documentElement.clientHeight
}

var eraserEnabled = false;
eraser.onclick = function(){
 eraserEnabled = true
 actions.className = "actionX"
}

brush.onclick = function(){
    eraserEnabled = false
    actions.className = "action"
}

clean.onclick = function(){
    cleanAll()
}

//判断设备是否支持触碰，如果支持则监听touch事件，否则监听mouse事件
if(document.body.ontouchstart !== undefined){
    cvs.ontouchstart = function(start){
        using = true
        var x = start.touches[0].clientX
        var y = start.touches[0].clientY
        lastPoint = {x: x, y:y}
    }
    cvs.ontouchmove = function(move){
        if(using){
            var x = move.touches[0].clientX
            var y = move.touches[0].clientY
            var newPoint = {x:x, y:y}
            if(eraserEnabled){
                context.clearRect(x, y, 20, 20)
            }else{
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
    }
    cvs.ontouchend = function(){
        using = false;
    }
}else{
    cvs.onmousedown = function(down){
        using = true;
        var x = down.clientX
        var y = down.clientY
        lastPoint = {x: x, y:y}
    }

    cvs.onmousemove = function(move){
        if(using){
            var x = move.clientX
            var y = move.clientY
            var newPoint = {x:x, y:y}
            if(eraserEnabled){
                context.clearRect(x, y, 20, 20)
            }else{
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
    }

    cvs.onmouseup = function(){
        using = false;
    }
}