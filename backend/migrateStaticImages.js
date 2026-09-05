const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME_NEW,
  api_key: process.env.CLOUDINARY_API_KEY_NEW,
  api_secret: process.env.CLOUDINARY_API_SECRET_NEW,
});

const foldersToUpload = [
  { localPath: 'uploads/gallery/factory', cloudinaryFolder: 'deltatrophies/gallery/factory' },
  { localPath: 'uploads/gallery/events/annual-meet', cloudinaryFolder: 'deltatrophies/gallery/annual-meet' },
  { localPath: 'uploads/gallery/events/exhibition', cloudinaryFolder: 'deltatrophies/gallery/exhibition' },
  { localPath: 'uploads/founders', cloudinaryFolder: 'deltatrophies/founders' },
  { localPath: 'uploads/distributors', cloudinaryFolder: 'deltatrophies/distributors' },
];

const uploadFolder = async (localPath, cloudinaryFolder) => {
  const fullPath = path.join(__dirname, localPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠ Folder not found: ${fullPath}`);
    return {};
  }

  const files = fs.readdirSync(fullPath).filter(file =>
    ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())
  );

  console.log(`\nUploading ${files.length} files from ${localPath}`);
  const urlMap = {};

  for (const file of files) {
    const filePath = path.join(fullPath, file);
    const publicId = `${cloudinaryFolder}/${path.basename(file, path.extname(file))}`;

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: true,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }]
      });
      urlMap[file] = result.secure_url;
      console.log(`  ✓ ${file} → ${result.secure_url}`);
    } catch (err) {
      console.log(`  ✗ ${file} failed: ${err.message}`);
    }
  }
  return urlMap;
};

const uploadAll = async () => {
  const allUrls = {};
  for (const folder of foldersToUpload) {
    const urls = await uploadFolder(folder.localPath, folder.cloudinaryFolder);
    allUrls[folder.localPath] = urls;
  }
  console.log('\n✅ All static images migrated!\n');
  console.log(JSON.stringify(allUrls, null, 2));
  process.exit(0);
};

uploadAll();