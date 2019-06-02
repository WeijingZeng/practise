$('.images>img:nth-child(1)').addClass('current')
$('.images>img:nth-child(2)').addClass('enter')
$('.images>img:nth-child(3)').addClass('enter')
$('.images>img:nth-child(4)').addClass('enter')
$('.images>img:nth-child(5)').addClass('enter')
let n = 1;
setInterval(()=>{
    $(`.images>img:nth-child(${checkN(n)})`).removeClass('current').addClass('leave')
    .one('transitionend',(e)=>{
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $(`.images>img:nth-child(${checkN(n
        +1)})`).removeClass('enter').addClass('current')
    n = n+1
},3000)

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