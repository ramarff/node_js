const express=require("express");
const app=express();
const router=express.Router();
const upload=require("../utils/uploadMiddleware");
const Resize=require("../utils/Resize");
const path = require('path');

router.get("/", async (req,res) => {
	await res.render("upload",{title:"form upload",layout:"layouts/main"});
})

router.post("/post", upload.single("image"), async (req,res) => {
	const imagePath=path.join("./public/img");
	const fileUpload=new Resize(imagePath);
	
	if(!req.file) {
		res.status(401).json({error:"Please provide an image"});
	}
	const filename=await fileUpload.save(req.file.buffer);
	return res.status(200).json({name:filename});
})
module.exports=router;

