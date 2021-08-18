import cloudinary from 'cloudinary';
import Formidable from 'formidable';

export default (app) => {
    app.post('/upload', (req, res) => {
        const form = new Formidable();
        form.parse(req, (err, fields, files) => {
            console.log({ files })

            // Find Cloudinary documentation using the link below
            // https://cloudinary.com/documentation/upload_images
            cloudinary.uploader.upload(files.upload.path, result => {

                // This will return the output after the code is exercuted both in the terminal and web browser
                // When successful, the output will consist of the metadata of the uploaded file one after the other. These include the name, type, size and many more.
                console.log(result)
                if (result.public_id) {

                    // The results in the web browser will be returned inform of plain text formart. We shall use the util that we required at the top of this code to do this.
                    res.send({ url: result.url })
                }
            });
        });
        return;

    });
}
