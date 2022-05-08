const express=require("express");
const app=express();
const expressLayouts=require("express-ejs-layouts");
const {body, validationResult,check}=require("express-validator");
const methodeOverride=require("method-override");
const port=3001;
const session=require("express-session");
const cookieParser=require("cookie-parser");
const flash=require("connect-flash");
const fs=require("fs");
const multer=require("multer");
const path=require("path");

const upload=require("./utils/uploadMiddleware");
const Resize=require("./utils/Resize");

require("./utils/db");
const Contact=require("./model/contact");



//Konfigurasi flash
app.use(cookieParser("secret"));
app.use(session({
	cookie:{maxAge:6000},
	secret:"secret",
	resave:true,
	saveUninitialized:true
}))
app.use(flash())

// Setup method override
app.use(methodeOverride("_method"))

//Gunakan EJS
app.set("view engine","ejs");
//Third party middleware
app.use(expressLayouts);

//Built-in middleware
app.use(express.static("public"));
app.use("/contact/:id", express.static("public"));
app.use("/contact/edit/:id", express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res,next) => {
	res.render("index", {layout:"layouts/main", title:"Halaman Home", nama:"rama"});
	// next();
})

app.get("/about",(req,res,next) => {
	res.render("about", {layout:"layouts/main", title:"Halaman About"});
	// next();
})

// Halaman Contact
app.get("/contact", async (req,res) => {

	const contacts=await Contact.find();
	const lenCont=await Contact.length;
	res.render("contact", {layout:"layouts/main", title:"Halaman Contact",contacts, lenCont, msg:req.flash("msg") });
})

// Halaman form tambah data contact
app.get("/contact/add",(req,res) => {
	res.render("add",{title:"Form Tambah Data Contact",layout:"layouts/main"})
});

//Proses data contact
//Membuat konfigurasi diskStorage multer 

app.post("/contact", 
	upload.single("foto"),
	[
	 body("nama").custom(async (value) => {
		const duplikat=await Contact.findOne({nama:value});
		if(duplikat) {
			throw new Error("Nama contact sudah terdaftar");
		}
		return true;
	 }),
	 check("email","Email tidak valid!").isEmail(),
	 check("noHP","nomor handphone tidak valid!").isMobilePhone("id-ID") 
	], async (req,res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
  		  res.render("add", {
  			title:"Form Tambah Data Contact",
  			layout:"layouts/main",
  			errors:errors.array(),
  	});
  }else{
  	const imagePath=path.join("./public/img");
  	const fileUpload=new Resize(imagePath);
  	const filename=await fileUpload.save(req.file.buffer)
  	let data=req.body;
  	data.filename=filename;
  	console.log(data)
  	Contact.insertMany(data, (error,result) => {
  	// Kirimkan flash message
  	req.flash("msg","Data contact berhasil ditambahkan!");
		res.redirect("/contact");
  	})
  }
});

// Proses delete contact
app.get("/contact/delete/:id", async (req,res) => {
const contact=await Contact.findOne({_id:req.params.id});
	// Jika contact tidak ada
	if(!contact) {
		res.status("404");
		res.send("<h1>404</h1>");
	}else{
		fs.unlinkSync(`./public/img/${contact.filename}`)
		Contact.deleteOne({_id:contact._id}).then(()=>{
			// Kirimkan flash message
  		req.flash("msg","Data contact berhasil dihapus!");
					res.redirect("/contact");
		});
	}
})

// app.delete("/contact",(req,res) => {
// 	console.log(req.body.nama);
// 	Contact.deleteOne({nama:req.body.nama}).then(()=>{
//  			// Kirimkan flash message
//    		req.flash("msg","Data contact berhasil dihapus!");
// 					res.redirect("/contact");
//  		});
// })
// Halaman detail contact
app.get("/contact/:id", async (req,res) => {
	// const contact=findContact(req.params.id);
	const contact=await Contact.findOne({_id:req.params.id});
	res.render("detail", {layout:"layouts/main", title:"Halaman Detail Contact", contact});
})

// Halaman form ubah data
app.get("/contact/edit/:id",async (req,res) => {
	console.log('test masuk')
	const contact=await Contact.findOne({_id:req.params.id});
	res.render("edit",{title:"Form Tambah Data Contact",layout:"layouts/main",contact})
});

//Proses ubah data
app.put("/contact/", [
	body("nama").custom(async (value, {req}) => {
		const duplikat=await Contact.findOne({nama:value});
		if(value !== req.body.oldName && duplikat) {
			throw new Error("Nama contact sudah terdaftar");
		}
		return true;
	}),
	check("email","Email tidak valid!").isEmail(),
	check("noHP","nomor handphone tidak valid!").isMobilePhone("id-ID") 
],(req,res) => {
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
  	Contact.updateOne(
  		{_id:req.body.id},
  		{
  			$set:{
  				nama:req.body.nama,
  				email:req.body.email,
  				noHP:req.body.noHP
  			}
  		}
  	).then(() => {
  		// Kirimkan flash message
  		req.flash("msg","Data contact berhasil diubah!");
			res.redirect("/contact");
  	})
  	
  }
		
})
app.use((req,res) => {
	res.status(404);
	res.render("404", {title:"404 not found", layout:"layouts/main"});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})