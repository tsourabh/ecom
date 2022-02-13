import { auth, firestore } from './../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: 'http://localhost:3000/login'
  };

  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ['Email not found. Please try again.'];
        reject(err);
      });
  });
};

export const handleUpdateProfile = (userMeta) => {

  const { user, additionalData } = userMeta;

  console.log(user, additionalData)

  return new Promise((resolve, reject) => {
    firestore
      .collection('users')
      .doc(user.id)
      .update({...user, ...additionalData})
      .then((res) => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });

}