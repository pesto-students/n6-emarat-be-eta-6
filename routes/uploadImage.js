import cloudinary from 'cloudinary';
import Formidable from 'formidable';

export default (req, res) => {
    const form = new Formidable();
    form.parse(req, (err, fields, files) => {
        cloudinary.uploader.upload(files.upload.path, result => {
            if (result.public_id) {
                res.send({ url: result.secure_url })
            }
        });
    });
    return;
}
