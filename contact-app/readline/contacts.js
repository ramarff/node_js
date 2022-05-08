const fs=require("fs");

const readline=require("readline");
const rl=readline.createInterface({
	input:process.stdin,
	output:process.stdout,
});

//Membuat Folder Data
const dirPath="./data";
if(!fs.existsSync(dirPath)){
	fs.mkdirSync(dirPath);
}

//Membuat File contact.json jika belum ada
const dataPath="./data/contacts.json";
if(!fs.existsSync(dataPath)){
	fs.writeFileSync(dataPath, "[]","utf-8");
}
const tulisPertanyaan=(pertanyaan) => {
	return new Promise((resolve,reject) => {
		rl.question(pertanyaan, (jawaban) => {
			resolve(jawaban);
		})
	})
}

const simpanContact=(nama, noHP, email) => {
  const contact={nama, noHP,email};
  const file=fs.readFileSync("data/contacts.json","utf-8");
  const contacts=JSON.parse(file);

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log("Terimakasih sudah memasukkan data");
  rl.close();

}
module.exports={
	tulisPertanyaan,
	simpanContact
}