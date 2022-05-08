// /*const validator=require("validator");
// /*console.log(validator.isEmail("ramafajar805@gmail.com"));
// console.log(validator.isMobilePhone("1213112","id-ID"));
// console.log(validator.isNumeric("121121"));*/

// const chalk=require("chalk");

// console.log(chalk.blue.italic("Hello World!"));
// const pesan="Rajinlah belajar wahai Rama Fajar Fadhillah";
// console.log(chalk.bgRed.black.bold(pesan));
// const nama=chalk`Rama Fajar {blue.bold Fadhillah}`;
// console.log(nama)
// console.log(chalk`Lorem {red dolor} sit {yellow amet} ipsum {green.strikethrough consectetur} elit. Nama saya adalah :${nama}`);*/

//Core Module
//File System
const fs=require("fs");

// console.log(fs);

//Menuliskan string ke file (synchronous)
//Node JS akan mencari file di dalam folder, jika tidak ada maka akan dibuatkan file baru
// try{
// 	fs.writeFileSync("data/test1.txt","Hello World secara synchronous");
// }catch(e){
//   console.log(e);
// }

//Menuliskan string ke file (asynchronous)
// fs.writeFile("data/test2.txt", "Hello World secara Asynchronous", (e) => {
	// console.log(e);
// })

//Membaca isi file (synchronous)
// const data=fs.readFileSync("data/test.txt","utf-8");
//Menggunakan function toString
// console.log(data.toString());
//Jika ingin tidak menggunakan function toString maka kita tambahkan utf-8 di parameternya
// console.log(data)

//Membaca isi file (asynchronous)
/*fs.readFile("data/test2.txt", "utf-8", (err,data) => {
	if (err) throw err;
	console.log(data)
})*/

//Readline
const readline=require("readline");
const rl=readline.createInterface({
	input:process.stdin,
	output:process.stdout,
});
/*rl.question("Masukkan nama anda :", (nama) => {
  rl.question("Masukkan no HP anda :", (noHP) => {
  	console.log(`Terimakasih ${nama}, sudah memasukkan no ${noHP}`);
	rl.close();
  })
})*/

rl.question("Masukkan nama anda :", (nama) => {
  rl.question("Masukkan no HP anda :", (noHP) => {
  	const contact={nama, noHP};
  	const file=fs.readFileSync("data/contacts.json","utf-8");
  	const contacts=JSON.parse(file);

  	contacts.push(contact);
  	fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  	console.log("Terimakasih sudah memasukkan data");
	rl.close();
  })
})