import { collection, getDocs } from "firebase/firestore/lite"
import { useEffect } from "react"
import { FirebaseDB } from "../firebase/config"

export const FetchDb = (array, setArray, collectionName = "") => {

    const getData = async (_collection, FirebaseDB, callback) => {
    const dataFetch = await getDocs(collection(FirebaseDB, _collection));
    const data = [];

    dataFetch.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    callback(data);
  };

  useEffect(() => {
    getData(collectionName, FirebaseDB, setArray);
  }, []);

  return array
}
