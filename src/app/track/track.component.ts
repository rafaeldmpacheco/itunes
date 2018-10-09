import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TrackService } from "./track.service";
import { NgxSpinnerService } from "ngx-spinner";

export interface Track {
	previewUrl: string;
	trackId: string;
	trackCensoredName: string;
	artistName: string;
	trackTimeMillis: string;
}

@Component({
	selector: "app-track",
	templateUrl: "./track.component.html",
	styleUrls: ["./track.component.scss"]
})
export class TrackComponent implements OnInit {
	@Input()
	set collectionId(collectionId: number) {
		this.getTracks(collectionId);
	}

	@Output()
	tracksCount = new EventEmitter<number>();

	tracks: Track[];

	currentTime = 0;
	duration = 0;

	audio: HTMLAudioElement = new Audio();
	currentTrackId: number;

	constructor(
		private trackService: TrackService,
		private spinner: NgxSpinnerService
	) {}

	ngOnInit() {}

	playTrack(track, trackId): void {
		if (this.currentTrack(trackId)) {
			this.audio.pause();
			this.audio.load();
			this.currentTrackId = 0;
		} else {
			this.currentTrackId = trackId;
			this.audio.src = track;
			this.audio.load();
			this.audio.play();

			const self = this;
			this.audio.ontimeupdate = () => {
				self.currentTime = Math.floor(self.audio.currentTime);
				self.duration = Math.floor(self.audio.duration)
					? Math.floor(self.audio.duration)
					: 100;
			};
		}
	}

	trackTime(value: number): string {
		return (value / 60000).toFixed(2);
	}

	currentTrack(trackId): boolean {
		return trackId === this.currentTrackId;
	}

	private getTracks(collectionId: number): void {
		this.spinner.show();
		this.trackService.getTracks(collectionId).subscribe(
			tracks => {
				this.tracks = tracks;
				this.tracksCount.emit(this.tracks.length);
				this.spinner.hide();
			},
			() => {
				this.spinner.hide();
			}
		);
	}
}
