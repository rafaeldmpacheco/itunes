import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ArtistComponent } from "./artist/artist.component";
import { ArtistService } from "./artist/artist.service";
import { CollectionComponent } from "./collection/collection.component";
import { TrackComponent } from "./track/track.component";
import { TrackService } from "./track/track.service";
import { RoundProgressModule } from "angular-svg-round-progressbar";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
	declarations: [
		AppComponent,
		ArtistComponent,
		TrackComponent,
		CollectionComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		RoundProgressModule,
		NgxSpinnerModule
	],
	providers: [ArtistService, TrackService],
	bootstrap: [AppComponent]
})
export class AppModule {}
