import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDataService } from 'src/app/shared/services/movie-data/movie-data.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { WatchListSService } from 'src/app/shared/watch-list-service/watch-list-s.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  img_path = 'https://image.tmdb.org/t/p/w500/';
  @Input() movie!: any;

  watchList!: any;

  constructor(
    private route: Router,
    private watchListService: WatchListSService,
    private requestService: RequestService,
    private movieDataService: MovieDataService
  ) {}

  redirect(e: any, a: any, b: any, id: number) {
    if (e.target !== a && e.target !== b) {
      this.route.navigate(['movie-details', id]);
      this.requestService
        .getMovieById(id)
        .subscribe((data) => this.movieDataService.setMovieData(data));

      this.requestService
        .getRecommendations(id)
        .subscribe((data) =>
          this.movieDataService.setMovieRecommendations(data)
        );
    }
  }
  toggleWatchList(movie: any) {
    this.watchListService.toggleWatchList(movie);
  }

  roundNum(num: number) {
    return Math.round(num);
  }
}
