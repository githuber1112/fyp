import { firestore } from './../../firebase/utils';

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore
         .collection('products')
         .doc()
         .set(product)
         .then(() => {
             resolve();
         })
         .catch(err => {
             reject(err);
         })
    });
}

export const handleFetchProducts = ({filterType, startAfterDoc, persistProducts=[],searchProductName}) => {
    return new Promise ((resolve,reject) => {
        const pageSize = 8;
        let ref= firestore.collection('products').orderBy('createdDate').limit(pageSize);

        if(filterType) ref = ref.where('productCategory', '==', filterType);
        if(startAfterDoc) ref = ref.startAfter(startAfterDoc);
        if(searchProductName) ref= ref.startAt(searchProductName).endAt(searchProductName+ "\uf8ff");

        ref
        .get()
        .then(snapshot => {
            const totalCount = snapshot.size;
            const data = [
                ...persistProducts,
                ...snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];
            resolve({
                data,
                queryDoc: snapshot.docs[totalCount -1],
                isLastPage: totalCount <1
            });
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const handleDeleteProducts = documentID => {
    return new Promise ((resolve,reject) => {
        firestore
        .collection('products')
        .doc(documentID)
        .delete()
        .then(() => {
            resolve();
        })
        .catch( err => {
            reject(err);
        })
    });
}

export const handleUpdateProducts = product => {

    return new Promise ((resolve,reject) => {
        firestore
        .collection('products')
        .doc(product.documentID)
        .update(product)
        .then(() => {
            resolve();
        })
        .catch( err => {
            
            reject(err);
        })
    });
}

export const handleFetchProduct = productID => {
    return new Promise((resolve,reject) => {
        firestore
        .collection('products')
        .doc(productID)
        .get()
        .then(snapshot => {
            if (snapshot.exists){
                resolve(
                    snapshot.data()
                );
            }
        })
        .catch(err => {
            reject(err);
        })
    })  
}

export const handleFetchAllProducts = () => {
    return new Promise ((resolve,reject) => {
        firestore
        .collection('products')
        .orderBy('createdDate')
        .get()
        .then(snapshot => {
            const productsArray = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    documentID: doc.id
                }
            });
            resolve(productsArray);
        })
        .catch(err => {
            reject(err);
        })
    })
}