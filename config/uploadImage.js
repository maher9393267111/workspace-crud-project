import { storage } from "./firebase";
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import { nanoid } from "nanoid";

export const uploadImage = async (file) => {
  

  const imageRef = ref(storage, file.name);
  const res = await uploadBytes(imageRef, file);
  const url = await getDownloadURL(res.ref);

  return url;
};

export const antdFieldValidation = [
  {
    required: true,
    message: "This field is required",
  },
];

export const DEFAULT_FORM_VALUES = {
  title: "",

  description: 0,
  image: "",
};
