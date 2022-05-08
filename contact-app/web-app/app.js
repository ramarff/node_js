	const express=require("express");
const app=express();
const expressLayouts=require("express-ejs-layouts");
const {loadContact,findContact,addContact,cekDuplikat,deleteContact,updateContacts}=require("./utils/contacts");
const {body, validationResult,check}=require("express-validator");
const port=3001;
const session=require("express-session");
const cookieParser=require("cookie-parser");
const flash=require("connect-flash");
const multer=require("multer");
const path=require("path");

const upload=require("./utils/uploadMiddleware");
const Resize=require("./utils/Resize");


//Konfigurasi flash
app.use(cookieParser("secret"));
app.use(session({
	cookie:{maxAge:6000},
	secret:"secret",
	resave:true,
	saveUninitialized:true
}))
app.use(flash())

//Gunakan EJS
app.set("view engine","ejs");
//Third party middleware
app.use(expressLayouts);

//Built-in middleware
app.use(express.static("public"));
app.use("/contact/detail/:id", express.static("public"));
app.use("/contact/edit/:id", express.static("public"));
app.use(express.urlencoded({extended:true}));

//Application level middleware
/*app.use((req,res,next) => {
	console.log(`Time : ${Date.now()}`)
	next();
})*/
app.get("/",(req,res,next) => {
	res.render("index", {layout:"layouts/main", title:"Halaman Home", nama:"rama"});
	// next();
});
app.get("/coba",(req,res,next) => {
	res.render("detail-2", {layout:"layouts/main", title:"Halaman Home", nama:"rama"});
	// next();
});

app.get("/about",(req,res,next) => {
	res.render("about", {layout:"layouts/main", title:"Halaman About"});
	// next();
})

app.get("/contact", (req,res) => {
	const contacts=loadContact();
	res.render("contact", {layout:"layouts/main", title:"Halaman Contact",contacts, msg:req.flash("msg") });
})

// Halaman form tambah data contact
app.get("/contact/add",(req,res) => {
	const contacts=loadContact();
	res.render("add",{title:"Form Tambah Data Contact",layout:"layouts/main",contacts})
});
	
//Proses data contact
app.post("/contact", upload.single("foto"),[
	body("nama").custom((value) => {
		console.log(value)
		const duplikat=cekDuplikat(value);
		if(duplikat) {
			throw new Error("Nama contact sudah terdaftar");
		}
		return true;
	}),
	check("email","Email tidak valid!").isEmail(),
	check("noHP","nomor handphone tidak valid!").isMobilePhone("id-ID") 
],async (req,res) => {


	// if(!req.file) {
	// 	res.status(401).json({error:"Please provide an image"});
	// }
	
	// Buat cek error
  const errors=validationResult(req);
  console.log(errors)
  const contacts=loadContact();
  if(!errors.isEmpty()){
  		res.render("add", {
  			title:"Form Tambah Data Contact",
  			layout:"layouts/main",
  			errors:errors.array(),
  			contacts
  		});
  }else{
  	const imagePath=path.join("./public/img");
		const fileUpload=new Resize(imagePath);
  	const filename=await fileUpload.save(req.file.buffer);
  	let data=req.body;
  	data.filename=filename
  	addContact(data);
  	// Kirimkan flash message
  	req.flash("msg","Data contact berhasil ditambahkan!");
		res.redirect("/contact");
  }
		
});

// Proses delete contact
app.get("/contact/delete/:id", (req,res) => {
	const contact=findContact(req.params.id);
	// Jika contact tidak ada
	if(!contact) {
		res.status("404");
		res.send("<h1>404</h1>");
	}else{
		deleteContact(req.params.id);
		// Kirimkan flash message
  	req.flash("msg","Data contact berhasil dihapus!");
		res.redirect("/contact");
	}
})

// Halaman detail contact
app.get("/contact/detail/:id", (req,res) => {
	const contact=findContact(req.params.id);
	res.render("detail-2", {layout:"layouts/main", title:"Halaman Detail Contact", contact});
})

// Halaman form ubah data
app.get("/contact/edit/:id",(req,res) => {
	const contact=findContact(req.params.id);
	res.render("edit",{title:"Form Tambah Data Contact",layout:"layouts/main",contact})
});

//Proses ubah data
app.post("/contact/update/:id", upload.single("foto"), [
	body("nama").custom((value, {req}) => {
		const duplikat=cekDuplikat(value);
		if(value !== req.body.oldName && duplikat) {
			throw new Error("Nama contact sudah terdaftar");
		}
		return true;
	}),
	check("email","Email tidak valid!").isEmail(),
	check("noHP","nomor handphone tidak valid!").isMobilePhone("id-ID") 
],async (req,res) => {
  const errors=validationResult(req);
  // const contact=findContact(req.params. id);
  if(!errors.isEmpty()){
  		res.render("edit", {
  			title:"Form Ubah Data Contact",
  			layout:"layouts/main",
  			errors:errors.array(),
  			contact:req.body
  		});
  }else{
  	const imagePath=path.join("./public/img");
		const fileUpload=new Resize(imagePath);
  	const filename=await fileUpload.save(req.file.buffer);
  	if(filename === undefined){
  		console.log("oke")
  	}
  	let data=req.body;
  	data.filename=filename
  	updateContacts(data);
  	// Kirimkan flash message
  	req.flash("msg","Data contact berhasil diubah!");
		res.redirect("/contact");
  }
		
})		
app.use((req,res) => {
	res.status(404);
	res.render("404", {title:"404 not found", layout:"layouts/main"});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})