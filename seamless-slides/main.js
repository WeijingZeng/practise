init()
let n = 1;
setInterval(()=>{
    toLeave($(`.images>img:nth-child(${checkN(n)})`))
        .one('transitionend',(e)=>{
            toEnter($(e.currentTarget))
        })
    toCurrent($(`.images>img:nth-child(${checkN(n
        +1)})`))
    n = n+1
},3000)

function init(){
    $('.images>img:nth-child(1)').addClass('current')
        .siblings().addClass('enter')
}

function toEnter($node){
    $node.removeClass('leave current').addClass('enter')
}

function toCurrent($node){
    $node.removeClass('enter leave').addClass('current')
}

function toLeave($node){
    $node.removeClass('current enter').addClass('leave')
    //不return的话返回的是undefined，则没有办法再调用.one
    return $node
}

function checkN(n){
    let len = $('.images>img').length
    if(n>len){
        n = n%len
        if(n === 0){
            n = len
        }
    }
    return n;
}