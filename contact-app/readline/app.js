//Core Module
//File System

/*const pertanyaan1=() => {
	return new Promise((resolve, reject) => {
		rl.question("Masukkan nama anda :", (nama) => {
			resolve(nama)			
		});
  });
};

const pertanyaan2=() => {
	return new Promise((resolve, reject) => {
		rl.question("Masukkan nomor HP  :", (noHP) => {
			resolve(noHP);			
		});
  });
};*/
const  {tulisPertanyaan, simpanContact}=require("./contacts")

const main=async () => {
	const nama=await tulisPertanyaan("Masukkan nama anda            :");
	const noHP=await tulisPertanyaan("Masukkan nomor Handphone anda :");
	const email=await tulisPertanyaan("Masukkan email anda          :");

	simpanContact(nama, noHP, email);

}


main();
