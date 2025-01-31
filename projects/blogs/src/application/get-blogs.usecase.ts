import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IBlog } from "../domain/model/blog.model";
import { GetBlogsService } from "../infrastructure/services/get-blogs.service";

@Injectable({
  providedIn: 'root'
})
export class GetBlogsUseCase {
  private readonly _service = inject(GetBlogsService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  blogs$(): Observable<IBlog[]> {
    return this._state.blogState.blogs.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service.execute()
        .pipe(
          tap(this._state.blogState.blogs.set)
        ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}