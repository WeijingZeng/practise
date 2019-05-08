function initial(){
    var keys = {
    0:['q','w','e','r','t','y','u','i','o','p'],
    1:['a','s','d','f','g','h','j','k','l'],
    2:['z','x','c','v','b','n','m'],
    length:3
    }
    var hash = {
    q: 'quora.com',
    w: 'weibo.com',
    e: 'ele.me',
    r: 'renren.com',
    t: 'taobao.com',
    y: 'youtube.com',
    u: 'udemy.com',
    i: 'iqiyi.com',
    o: undefined,
    p: 'pinterest.com',
    a: 'amazon.com',
    s: 'sina.com',
    d: 'douban.com',
    f: 'facebook.com',
    g: 'google.com',
    h: 'hotmail.com',
    j: 'js.jirengu.com',
    k: 'kanzhun.com',
    l: 'leetcode.com',
    z: 'zhihu.com',
    x: 'xiedaimala.com',
    c: 'cnn.com',
    v: 'visualgo.net',
    b: 'bilibili.com',
    n: 'netflix.com',
    m: 'mail.google.com'
}
    //获取用户存储在浏览器中的更改项
    var hashLocalStorage = JSON.parse(localStorage.getItem('userSites' || 'null'))
    //如果存在则更新本地hash列表
    if(hashLocalStorage){
        hash = hashLocalStorage
    }
    return{
        "keys": keys,
        "hash": hash
    }
}

function generateKeyboard(keys){
    //遍历keys，生成kbd标签
    for(var i=0; i < keys['length']; i++){
    var row = createDiv()        
    for(var count = 0; count < keys[i].length; count++){
        var keyboards = createKbd()
        var spans = createSpan(keys[i][count])  
        var iconTag = createImg(hash[keys[i][count]])
        var buttons = createButton(keys[i][count])

        container.appendChild(row)
        row.appendChild(keyboards)
        keyboards.appendChild(spans)
        keyboards.appendChild(iconTag)
        keyboards.appendChild(buttons)
        }   
    }
}

function listenToKeyboard(hash){
    //按键后跳转到相应网站
    document.onkeypress = function(lol){
    var key = lol.key
    var website = hash[key]
    //在当前页面跳转
    //location.href = 'http://'+website
    //在新标签打开
    window.open('http://'+website, '_blank')
    }
}

function createDiv(){
    var row = document.createElement('div')
    row.className = 'rowDiv'
    return row
}

function createKbd(){
    var keyboards = document.createElement('kbd')
    keyboards.className= 'key';
    return keyboards
}

function createSpan(content){
    var spans = document.createElement('span')
    spans.className = 'text'
    spans.textContent = content
    return spans
}

function createImg(src){
    var icon = document.createElement('img')
    var iconTag = generateIcon(src,icon)
    return iconTag
}

function createButton(bID){
    var buttons = document.createElement('button')
    buttons.textContent = 'Edit'
    //给每个button对应的id，之后才能在点击时取到对应的button
    buttons.id = bID
    buttons.onclick = function(haha){
        var clickedButton = haha.target
        var target = clickedButton.id
        //弹窗提示输入
       var newSite = prompt('Enter a new URL')
       if(newSite){
           hash[target] = newSite
           //一旦用户做出更改，就将用户的更改存储在浏览器localStorage中的‘userSites’桶里，这样做是因为用户更改的hash在网页刷新后就不存在了，所以需要存在浏览器中，刷新页面后看有无更改，有则更新本地hash
            localStorage.setItem('userSites',JSON.stringify(hash))
           //clickedButton.previousSibling: 定位到被点击的button的上一个元素，也就是<img>  
           var icon2 = generateIcon(newSite,clickedButton.previousSibling)           
        } 
    }
    return buttons
}

//获取网站图标函数
function generateIcon(domain, tag){
    if(domain){
        tag.src = 'http://'+domain+'/favicon.ico'
    }else{
        tag.src = "./img/cry.png"
    }
    //如果获取图片失败则显示指定图片
    tag.onerror = function(err){
        err.target.src = "./img/cry.png"
    }
    return tag     
}

//1.初始化
var data = initial()
var keys = data.keys
var hash = data.hash

//2.生成键盘
generateKeyboard(keys)

//3.监听键盘事件
listenToKeyboard(hash)
