import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisputeActionsService {
  public actions$: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient) {
    this.getActions().subscribe({
      next: (actions) => (this.actions = actions),
    });
  }

  set actions(value: any) {
    this.actions$.next(value);
  }

  get actions() {
    return this.actions$.getValue();
  }

  getActions() {
    return this.http.get('/litigation/actions/');
  }

  sendDisputeActorActions(body: any) {
    return this.http
      .post(`/litigation/dispute-actor-actions/`, body)
      .pipe(tap(() => this.loading$.next(false)));
  }
}
