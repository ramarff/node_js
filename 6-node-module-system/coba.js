	//Synchronous
/*const getUserSync=(id) => {
	let nama="";
	if(id === 1) {
		nama="Rama";
	}else{
		nama="Sayyidah";
	}

	const nama= id ===1 ? "Rama" : "Sayyidah";
	return {id,nama}
}
*/
/*const userSatuSync=getUserSync(1);
console.log(userSatuSync);

const userDuaSync=getUserSync(2);
console.log(userDuaSync);
console.log("Halo")

//Asynchronous
const getUser=(id, cb) => {
	const time=id === 1 ? 3000 : 2000;
	setTimeout(() => {
		const nama=id === 1 ? "Rama" :"Sayyidah";
		cb({id, nama})
	}, time)
};
const userSatu=getUser(1, (hasil) => {
	console.log(hasil)
})
const userDua=getUser(2, (hasil) => {
	console.log(hasil)
})

const halo="Hello World";
console.log(halo);


*/
function cetakNama(nama) {
	return `Halo, nama saya ${nama}`;
}

const PI=3.14;

const mahasiswa={
	nama:"Rama Fajar Fadhillah",
	umur:18,
	cetakMhs() {
		return  `Halo, nama saya ${this.nama} dan saya ${this.umur} tahun.`;
	}
}

class Orang{
	constructor(){
		console.log("Objek orang telah dibuat!!!");
	}
}
// module.exports.cetakNama=cetakNama;
// module.exports.PI=PI;
// module.exports.mahasiswa=mahasiswa;
// module.exports.Orang=Orang;


module.exports={
	cetakNama,
	PI,
	mahasiswa,
	Orang
}