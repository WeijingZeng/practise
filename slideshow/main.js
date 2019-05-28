// $(p1).on('click',function(){
//     $(images).css({
//         transform: 'translateX(0)'
//     })
// })
// $(p2).on('click',function(){
//     $(images).css({
//         transform: 'translateX(-400px)'
//     })
// })
// $(p3).on('click',function(){
//     $(images).css({
//         transform: 'translateX(-800px)'
//     })
// })

var allButtons = $('.buttons > button') //这里取到的是DOM对象
for(let i = 0; i < allButtons.length;i++){
    $(allButtons[i]).on('click',function(x){ //将allButtons重新包装成jQuery对象
        var index = $(x.currentTarget).index()
        var pixle = index * -400
        $(images).css({
            transform: 'translateX(' + pixle + 'px)'
        })
        //使点击按钮与自动轮播不冲突
        n = index
        allButtons.eq(n).addClass('highlight').siblings('.highlight').removeClass('highlight')
    })
}



//自动轮播
var timeID = undefined
var n = 0
var imgs = $('.images > img')
var size = imgs.length

allButtons.eq(n % size).trigger('click')
autoPlay()

//鼠标移入控制暂停播放
$('.images').on('mouseenter', function(){
    window.clearInterval(timeID)
})
$('.images').on('mouseleave',function(){
    autoPlay()
})

function autoPlay(){
    //给计时器一个id，用于清除计时器时的查找
    timeID = setInterval(()=>{
        n = n+1
        //eq(条件) -- 找到符合条件的DOM后封装成jQuery对象
        //triggre() -- 触发事件
        //siblings('.highlight') -- 找到兄弟结点中 class=highlight 的
        allButtons.eq(n % size).trigger('click')
    }, 2000)
}