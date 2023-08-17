const {Transform}=require("node:stream");
const fs=require("node:fs/promises");
class Decrypt extends Transform{
    //no need of creating _write . _final or destory methods
    //they are already made in Tranfrom stream
    _transform(chunk,encoding,callback){
        for(let i=0;i<chunk.length;i++){
            if(chunk[i]!==255){
                chunk[i]=chunk[i]-1;
            }
        }
        this.push(chunk);
    }
}
(async ()=> {
    const readFileHandle=await fs.open("write.txt","r");
    const writeFileHandle=await fs.open("decrypted.txt","w");
     
    const readstream= readFileHandle.createReadStream();
    const writestream=writeFileHandle.createWriteStream();
    const decrypt=new Decrypt();
    readstream.pipe(decrypt).pipe(writestream);

})()