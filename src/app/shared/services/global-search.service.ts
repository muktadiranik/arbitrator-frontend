import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { SearchOptions } from '../interfaces/search-options';
@Injectable({
  providedIn: 'root',
})
export class GlobalSearchService {
  constructor() {}
  public searchTerm$: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  public searchTermAsObservable$: any = this.searchTerm$.asObservable().pipe(
    filter((value) => value !== null),
    debounceTime(1000),
    distinctUntilChanged()
  );

  public seachFieldOptions$: BehaviorSubject<SearchOptions> =
    new BehaviorSubject<SearchOptions>({ placeHolder: '' });
  public seachFieldOptionsAsObservable$: any =
    this.seachFieldOptions$.asObservable();
}
