import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getStorageClient } from './firebaseClient';

const uploadFileWithProgress = (file, subFolder, imageName, setProgress) => {
	return new Promise((resolve, reject) => {
		const storageRef = ref(getStorageClient, subFolder + '/' + imageName);
		const upload = uploadBytesResumable(storageRef, file);
		upload.on(
			'state_changed',
			(snapShot) => {
				const progress =
					Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
				setProgress(progress);
			},
			(error) => {
				reject(error);
			},
			async () => {
				try {
					const url = await getDownloadURL(storageRef);
					resolve(url);
				} catch (error) {
					reject(error);
				}
			}
		);
	});
};
export default uploadFileWithProgress;