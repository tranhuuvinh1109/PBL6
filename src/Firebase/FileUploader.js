import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getStorageClient } from './firebaseClient';

const FileUploader = (file) => {
	return new Promise((resolve, reject) => {
		const storageRef = ref(getStorageClient, 'hotels/1');
		const fileRef = ref(storageRef, file.name);

		try {
			uploadBytes(fileRef, file).then(() => {
				getDownloadURL(fileRef)
					.then((url) => resolve(url))
					.catch((error) => reject(error));
			});
		} catch (error) {
			reject(error);
		}
	});
};

export default FileUploader;
