const aws = require("aws-sdk");
const Bucket_Name = process.env.BUCKET_NAME

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});


exports.uploadAudio = async (file) =>
 
{
   
    let filename = Date.now() + ".mp3";

    let params = {
      Bucket: Bucket_Name,  
      Key: filename,
      Body: file,
    };

  s3.upload(params, (error, data) => {
      if (error) {
       throw Error("Error while uploading the file")
      }
      else {
        console.log("inside upload - >" , data)

        return {publicUrl: data.Location, filename: data.Key};
      }
      
    })


}
