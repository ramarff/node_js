const express=require("express");
const app=express();
const port=3000;

app.get("/", (req,res) => {
	// res.send("Hello World");
/*	res.json({
		nama:"Rama Fajar",
		email:"ramafajar805@gmail.com",
		noHP:"082112130079"
	});*/
	res.sendFile("./index.html",{root:__dirname});
});

app.get("/about",(req,res) => {
	// res.send("Ini adalah halaman about");
	res.sendFile("./about.html",{root:__dirname});

})

app.get("/contact", (req,res) => {
	// res.send("Ini adalah halaman contact");
	res.sendFile("./contact.html",{root:__dirname});

})
/*app.get("/product/:id/category/:cat",(req,res) => {
	res.send(`Product ID :${req.params.id} \n Category :${req.params.cat}`)
}) */
app.get("/product/:id",(req,res) => {
	res.send(`Product ID :${req.params.id} \n Category :${req.query.cat}`);
}) 
app.use("/", (req,res) => {
	res.status(404);
	res.send("<h1>404</h1>");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})