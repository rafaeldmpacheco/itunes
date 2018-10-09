import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TrackService {
	constructor(private httpClient: HttpClient) {}

	public tracksCount = new Subject<any>();

	getTracks(collectionId: number): Observable<any> {
		return this.httpClient
			.get(
				"http://localhost:4200/api/lookup?entity=song&id=" +
					collectionId
			)
			.pipe(
				map((response: any) =>
					response.results.filter(
						results => results.wrapperType === "track"
					)
				)
			);
	}
}
