import { Component, Input } from "@angular/core";
import { TrackService } from "../track/track.service";
import { ArtistService } from "../artist/artist.service";
import { Collections } from "../artist/artist.component";

@Component({
	selector: "app-collection",
	templateUrl: "./collection.component.html",
	styleUrls: ["./collection.component.scss"]
})
export class CollectionComponent {
	@Input()
	collections: Collections[];

	tracksCount: number;

	constructor(
		private trackService: TrackService,
		public artistService: ArtistService
	) {}

	collectionViewUrl(url): void {
		window.location.href = url;
	}

	getTracksCount(tracksCount): void {
		this.tracksCount = tracksCount;
	}
}
