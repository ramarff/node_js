// Membuat schema
const mongoose=require("mongoose");
const Contact=mongoose.model("Contact",{
	nama:{
		type:String,
		required:true
	},
	noHP:{
		type:String,
		required:true
	},
	email:{
		type:String
	},
	filename:{
		type:String,
		required:true
	}
})

module.exports=Contact;