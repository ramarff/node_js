const fs=require("fs");
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
const findContact=(id) => {
	const contacts=loadContact();
	const contact=contacts.find(
    (contact) => contact.id == id
  );
  return contact;
}

//Menuliskan / menimpa file contacts.json dengan data yang baru
const saveContacts=(contacts) => {
	fs.writeFileSync("../data/contacts.json", JSON.stringify(contacts))
}

//Menambahkan data contact baru
const addContact=(contact) => {
	const contacts=loadContact();
	contacts.push(contact);
	saveContacts(contacts);
}

//Cek nama yang duplikat
const cekDuplikat=(nama) => {
	const contacts=loadContact();
	return contacts.find((contact) => contact.nama === nama);
}
//Hapus contact
const deleteContact=(id) => {
	const contacts=loadContact();
	const contact=contacts.find((contact) => contact.id === id)
	const filterContact=contacts.filter(contact => contact.id != id);
	fs.unlinkSync(`./public/img/${contact.filename}`);
	saveContacts(filterContact)
}
// Ubah contacts
const updateContacts=(contactBaru) => {
	const contacts=loadContact();
	// Hilangkan contact lama yang namanya sama dengan oldName
	const filterContacts=contacts.filter((contact) => contact.nama !== contactBaru.oldName);
	const contact=contacts.find((contact) => contact.nama === contactBaru.oldName);
	fs.unlinkSync(`./public/img/${contact.filename}`)
	delete contactBaru.oldName;
	filterContacts.push(contactBaru);
	saveContacts(filterContacts);
}
module.exports={
	loadContact,
	findContact,
	addContact,
	cekDuplikat,
	deleteContact,
	updateContacts
}