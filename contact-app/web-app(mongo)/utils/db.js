const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/wpu",{
	useNewUrlParser:true,
	useUnifiedTopology:true,
	useCreateIndex:true
});

// Menambah 1 data
/*const contact1=new Contact({
	nama:"Rama Fajar Fadhillah",
	noHP:"082112130079",
	email:"ramafajar805@gmail.com"
});

// Simpan Contact
contact1.save().then((result)=> console.log(result)).catch((error) => console.log(error))*/