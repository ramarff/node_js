const {MongoClient}=require("mongodb");

const uri="mongodb://127.0.0.1:27017";
const dbName="wpu";

const client=new MongoClient(uri,{
	useNewUrlParser:true,
	useUnifiedTopology:true
});


client.connect((err,client) => {
	if(err) {
		return console.log("Koneksi gagal")
	}
	// Pilih database
	const db=client.db(dbName);

	// Menambahkan 1 data ke collection mahasiswa
	/*db.collection("mahasiswa").insertOne({
		nama:"Entong",
		email:"entong2@gmail.com"
	},(error,result) => {
		if (error){
			return console.log("Gagal menambahkan data");
		}
		console.log(result);
	})*/

	//Menambahkan lebih dari 1 data
	/*db.collection("mahasiswa").insertMany(
	 [{
	 	nama:"toto",
	 	email:"toto@gmail.com"
	  },
	  {
	  	nama:"popon",
	  	email:"popon@gmail.com"
	  }
	 ]
	 ,(error,result) => {
		if (error){
			return console.log("Gagal menambahkan data");
		}
		console.log(result);
	})
	*/

	// Menampilkan semua data yang ada di collection "mahasiswa"
	/*db.collection("mahasiswa").find().toArray((error,result) => {
		console.log(result);
	})*/
	
	// Menampilkan data berdasarkan kriteria yang ada di collection "mahasiswa"
	/*console.log(db.collection("mahasiswa").find({_id:new ObjectID("61061f32c343e008bf81e03a")}).toArray((error,result) => {
		console.log(result);
	})
	)*/

	// Mengubah data berdasarkan id
	/*const updatePromise=db.collection("mahasiswa").updateOne(
	{
		nama:"Sayyidah"
	},
	{
		$set:{
			nama:"Sayyidah Mursyidah",
			email:"sayyidahmursyidah@gmail.com"
		}
	}
	);
	updatePromise.then((result) => {
		console.log(result)
	}).catch((error) =>{
		console.log(error)
	});
	*/
	
	// Mengubah data lebih dari 1 berdasarkan kriteria
	/*db.collection("mahasiswa").updateMany(
	 {
	 	nama:"Entong"
	 },
	 {
	 	$set:{
	 		nama:"Entong centong"
	 	}
	 }
	)*/

	// Menghapus 1 data
	/*db.collection("mahasiswa").deleteOne(
	{
		nama:"Entong centong"
	}).then((result) => {
		console.log(result);
	}).catch((error) => {
		console.log(error);
	})*/

	// Menghapus lebih dari 1 data
	db.collection("mahasiswa").deleteMany(
	{
	   nama:"popon"
	}).then((result) => {
		console.log(result);
	}).catch((error) => {
		console.log(error);
	})
console.log("Koneksi berhasil");
});

