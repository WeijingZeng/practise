var fs = require('fs')

 var dirName = process.argv[2] // 你传的参数是从第 2 个开始的

 var index = "<!DOCTYPE>\n<title>Hello</title>\n<h1>Hi</h1>"
 var style = "h1{color: red;}"
 var main = "var string = \"Hello World\"\nalert(string)"

 fs.exists(dirName, function(exists) {
	if(!exists){
        fs.mkdirSync("./" + dirName) // mkdir $1
        process.chdir("./" + dirName) // cd $1
        fs.mkdirSync('css') // mkdir css
        fs.mkdirSync('js') // mkdir js

        fs.writeFileSync("./index.html", index)
        fs.writeFileSync("css/style.css", style)
        fs.writeFileSync("./js/main.js", main)

        process.exit(0)
    }
    if(exists){
        console.log("error: dir already existed")
        process.exit(1)
    }
});

 

 

 