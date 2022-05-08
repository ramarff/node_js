const express=require("express");
const app=express();
const expressLayouts=require("express-ejs-layouts");
const port=3000;


//Gunakan EJS
app.set("view engine","ejs");
app.use(expressLayouts);
app.get("/", (req,res) => {
	const mahasiswa=
	[
	 {
	 	nama:"Rama Fajar Fadhillah",
	 	email:"ramafajar805@gmail.com"
	 },
	 {
	 	nama:"Sayyidah Mursyidah",
	 	email:"saymursyidah@gmail.com"
	 }
	]
	res.render("index",{nama:"Rama Fajar Fadhillah",layout:"layouts/main",title:"Halaman Home",mahasiswa});
});

app.get("/about",(req,res) => {
	res.render("about", {layout:"layouts/main", title:"Halaman About"})
})

app.get("/contact", (req,res) => {
	res.render("contact", {layout:"layouts/main", title:"Halaman Contact"});
})
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