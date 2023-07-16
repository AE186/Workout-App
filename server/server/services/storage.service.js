const { storage } = require("../firebase/index");
const {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} = require("firebase/storage");

exports.upload = async (filename, buffer) => {
  const fileRef = ref(storage, filename);
  await uploadBytes(fileRef, buffer);
};

exports.delete = async (filename) => {
  const fileRef = ref(storage, filename);
  await deleteObject(fileRef);
};

exports.get = async (filename) => {
  const fileRef = ref(storage, filename);
  const url = await getDownloadURL(fileRef);
  return url;
};
