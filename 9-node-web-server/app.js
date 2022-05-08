const http=require("http");
const fs=require("fs");
const port=3000;
	
const renderHTML=(path,res) => {
		fs.readFile(path, (err, data) => {
			if(err){
				res.writeHead(404);
				res.write("Error 404 Page Not Found ");
			}else{
				res.write(data);
			}
			res.end();
		}); 
}
const server=http.createServer((req,res) => {
	res.writeHead(200, {
		"Content-Type":"text/html",

	})
	const url=req.url;
	if(url === "/about") {
		// res.write("<h1>Ini adalah  halaman about</h1>");
		// res.end();
		renderHTML("./about.html", res);
	}else if(url === "/contact") {
		// res.write("<h1>Ini adalah halaman Contact</h1>");
		// res.end();
		renderHTML("./contact.html", res);
	}else{
		// res.write("Hello World!")
		renderHTML("./index.html", res);
		
	}
});

server.listen(port, () => {
	console.log(`server listen on port:${port}...`)
})