const {
          Upload
      } = require("@aws-sdk/lib-storage"),
      {
          S3
      } = require("@aws-sdk/client-s3");
const path = require('path');
const uuid = require('uuid').v1;

const {
    AWS_S3_NAME,
    AWS_S3_REGION,
    AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY
} = require('../config/variables');
const { AMAZON_CUT } = require('../config/constants');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = {
    uploadFile: (file, itemType, itemId) => {
        const { data, mimeType, name } = file;

        const fileName = _fileNameBuilder(name, itemType, itemId.toString());

        return new Upload({
            client: bucket,

            params: {
                    Bucket: AWS_S3_NAME,
                    Body: data,
                    Key: fileName,
                    ContentType: mimeType
                }
        }).done();
    },

    deleteFile: (fileName) => {
        const KEY = fileName.split(AMAZON_CUT)[1];

        return bucket
            .deleteObject({
                Bucket: AWS_S3_NAME,
                Key: KEY,
            });
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    const fileExtension = path.extname(fileName);

    return path.join(itemType, itemId, `${uuid()}${fileExtension}`);
}