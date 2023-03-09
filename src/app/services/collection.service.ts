import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import {CollectionsModel} from '../models/collections.model';
import {environment as env} from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class CollectionService {

    private collectionList = new BehaviorSubject<CollectionsModel[]>([]);
    private total = new BehaviorSubject<number>(0);

    constructor(private http: HttpClient, private storage: Storage) {
    }

    setCollectionList(collections: CollectionsModel[]) {
        this.collectionList.next(collections);
    }

    addCollectionToList(collection: CollectionsModel) {
        const newCollectionList = this.collectionList.getValue();
        newCollectionList.push(collection);
        this.setCollectionList(newCollectionList);
    }

    get collectionsList() {
        return this.collectionList.asObservable();
    }

    setTotal(total: number) {
        this.total.next(total);
    }

    get totalCollection() {
        return this.total.asObservable();
    }

    postCollectionToBacKend(collection: CollectionsModel): Observable<any> {
        return this.http.post<CollectionsModel>(env.SERVER_API_URL + '/cashment/save', collection).pipe(
            map(res => {
                return res;
            })
        );
    }

    calculateSum() {
        this.collectionList.subscribe(result => {
            let totalOfCollections = 0;
            for (const collection of result) {
                if(collection.isValid){
                    totalOfCollections += collection.amount;
                }
            }
            this.setTotal(totalOfCollections);
        });
    }
}
