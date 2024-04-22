const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload.js");

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        ); //move the file from tmp to uploads

        return file;
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file); //catch the file path

        try {
            await fs.promises.stat(filePath); //verify the state of the file
        } catch (error) {
            return;
        };

        await fs.promises.unlink(filePath); //remove the file
    }
}

module.exports = DiskStorage;
