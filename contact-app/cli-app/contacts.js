const fs=require("fs");
const chalk=require("chalk");
const validator=require("validator");

//Membuat Folder Data
const dirPath="../data";
if(!fs.existsSync(dirPath)){
	fs.mkdirSync(dirPath);
}

//Membuat File contact.json jika belum ada
const dataPath="../data/contacts.json";
if(!fs.existsSync(dataPath)){
	fs.writeFileSync(dataPath, "[]","utf-8");
}


const loadContact=() => {
  const file=fs.readFileSync("../data/contacts.json","utf-8");
  const contacts=JSON.parse(file);
  return contacts;
}
const simpanContact=(nama, email, noHP) => {
  const contacts=loadContact();
  const id=contacts.length+1;
  const contact={id,nama, email,noHP};
  //Cek Duplikat
  const duplikat=contacts.find((contact) => contact.nama === nama)
  if(duplikat) {
  	console.log(chalk.red.bold `${nama} sudah terdaftar`);
  	return false;
  }

  //Cek Email
  if(email){
  	if(!validator.isEmail(email)){
  		console.log(chalk.red.inverse.bold(`Email tidak valid`));
  		return false;
  	}
  }

  //Cek Nomor Handphone
  if(!validator.isMobilePhone(noHP, "id-ID")){
  		console.log(chalk.red.inverse.bold(`Nomor Handphone  tidak valid`));
  		return false;
  }

  contacts.push(contact);
  fs.writeFileSync("../data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green`Terimakasih sudah memasukkan data`);
}

const listContact=() => {
  const contacts=loadContact();
    console.log(chalk.cyan.bold`Daftar Kontak   :`); 
  contacts.forEach((contact,i) => {
    console.log(`${contact.id}. ${contact.nama } - ${contact.noHP}`);
  })
}

const detailContact=(nama) => {
  const contacts=loadContact();

  const contact=contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());


  if(!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  console.log(contact);
  console.log(chalk.cyan.bold`Detail Kontak  :`); 
  console.log(chalk.white.bold(contact.nama));
  if(contact.email) { console.log(chalk.white.bold(contact.email))}
  console.log(chalk.white.bold(contact.noHP));
}

const deleteContact=(nama) => {
  const contacts=loadContact();
  const newContacts=contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if(contacts.length === newContacts.length) {
    console.log(chalk.red.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  fs.writeFileSync("../data/contacts.json", JSON.stringify(newContacts));
  console.log(chalk.green`Data  kontak ${nama} berhasil dihapus`);

}
module.exports={
	simpanContact,
  listContact,
  detailContact,
  deleteContact
}