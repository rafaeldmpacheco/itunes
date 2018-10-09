import { Component, OnInit } from "@angular/core";
import { ArtistService } from "./artist.service";
import { forkJoin, Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

export interface ReleatedArtist {
	artworkUrl100: string;
	artistName: string;
}

export interface Collections {
	artworkUrl100: string;
	collectionCensoredName: string;
	collectionViewUrl: string;
	collectionId: string;
}

@Component({
	selector: "app-artist",
	templateUrl: "./artist.component.html",
	styleUrls: ["./artist.component.scss"]
})
export class ArtistComponent implements OnInit {
	collections: Collections;

	releatedArtists: ReleatedArtist[];

	artistDescription = `A game-changing artist and celebrity, Lil Wayne began his career as a near-novelty -- a preteen delivering hardcore hip-hop --
	 but through years of maturation and reinventing the mixtape game, he developed into a million-selling rapper with a massive body of work, one so inventive
	 and cunning that it makes his famous claim of being the "best rapper alive" worth considering. Born Dwayne Michael Carter, Jr. and raised in the infamous New Orleans
	  neighborhood of Hollygrove, he was a straight-A student but never felt his true intelligence was expressed through any kind of report card.`;

	constructor(
		public artistService: ArtistService,
		private spinner: NgxSpinnerService
	) {}

	ngOnInit() {
		this.spinner.show();
		forkJoin(
			this.artistService.getCollections(),
			this.artistService.getReleateds()
		).subscribe(
			([collections, releatedArtists]) => {
				this.collections = collections;
				this.releatedArtists = releatedArtists.results;
				this.spinner.hide();
			},
			() => {
				this.spinner.hide();
			}
		);

		window.addEventListener("resize", () => {
			this.getArtistDescription();
		});
	}

	loadMoreCollections(): void {
		this.spinner.show();
		this.artistService.getCollections().subscribe(
			collections => {
				this.collections = collections;
				this.spinner.hide();
			},
			() => {
				this.spinner.hide();
			}
		);
	}

	getArtistDescription(): string {
		if (window.screen.width < 768) {
			return this.artistDescription.substr(0, 129) + "...";
		}
		return this.artistDescription;
	}

	goToItunesProfile(): void {
		window.location.href = this.collections[0].artistViewUrl;
	}
}
