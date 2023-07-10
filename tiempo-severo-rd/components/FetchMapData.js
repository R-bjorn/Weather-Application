import { collection, query, getDocs } from 'firebase/firestore';
import { firebase } from '../config';

const fetchMapsData = async (userRole) => {
  const mapsCollectionRef = collection(firebase.firestore(), 'maps');
  
  let mapsQuery = query(mapsCollectionRef);
  if (userRole === 4) {
    // Limit to 5 latest maps for free users
    mapsQuery = query(mapsCollectionRef, orderBy('createdAt', 'desc'), limit(5));
  }

  const querySnapshot = await getDocs(mapsQuery);
  
  const mapsData = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      image: doc.data().MapImage,
      description: doc.data().Description,
    };
  });
  
  return mapsData;
};

export default fetchMapsData;