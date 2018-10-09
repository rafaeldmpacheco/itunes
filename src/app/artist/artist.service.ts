import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ArtistService {
	private size = 0;

	constructor(private httpClient: HttpClient) {}

	getCollections(size = 2): Observable<any> {
		this.size = size + this.size;
		return this.httpClient
			.get(
				"http://localhost:4200/api/lookup?entity=album&id=5869117&limit=" +
					this.size
			)
			.pipe(
				map((response: any) =>
					response.results.filter(
						results => results.wrapperType === "collection"
					)
				)
			);
	}

	getReleateds(): Observable<any> {
		return this.httpClient.get(
			"http://localhost:4200/api/search?term=Hip-Hop%2FRap&limit=5&entity=song&sort=recent"
		);
	}

	getBiggerImage(image): string {
		let newImage = image.split("/");
		newImage.pop();
		newImage.push("1920x800cc.jpg");
		newImage = newImage.join("/");
		return newImage;
	}
}
