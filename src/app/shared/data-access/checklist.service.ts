import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, shareReplay, take, tap } from 'rxjs/operators';
import { ChecklistItemService } from '../../checklist/data-access/checklist-item.service';
import { AddChecklist, Checklist } from '../interfaces/checklist';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private checklists$ = new BehaviorSubject<Checklist[]>([]);

  private sharedChecklists$: Observable<Checklist[]> = this.checklists$.pipe(
    tap((checklists) => this.storageService.saveChecklists(checklists)),
    shareReplay(1)
  );

  constructor(
    private storageService: StorageService,
    private checklistItemService: ChecklistItemService
  ) { }

  load() {
    this.storageService.loadChecklists$
      .pipe(take(1))
      .subscribe((checklists) => {
        this.checklists$.next(checklists);
      });
  }

  getChecklists() {
    return this.sharedChecklists$;
  }

  getChecklistById(id: string) {
    return this.getChecklists().pipe(
      filter((checklists) => checklists.length > 0),
      map((checklists) => checklists.find((checklist) => checklist.id === id))
    );
  }

  add(checklist: AddChecklist) {
    const newChecklist = {
      ...checklist,
      id: this.generateSlug(checklist.title),
    };

    this.checklists$.next([...this.checklists$.value, newChecklist]);
  }

  remove(id: string) {
    const modifiedChecklists = this.checklists$.value.filter(
      (checklist) => checklist.id !== id
    );

    this.checklistItemService.removeAllItemsForChecklist(id);

    this.checklists$.next(modifiedChecklists);
  }

  update(id: string, editedData: AddChecklist) {
    const modifiedChecklists = this.checklists$.value.map((checklist) =>
      checklist.id === id
        ? { ...checklist, title: editedData.title }
        : checklist
    );

    this.checklists$.next(modifiedChecklists);
  }

  private generateSlug(title: string) {
    // NOTE: This will not handle things like special characters.
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    const matchingSlugs = this.checklists$.value.find(
      (checklist) => checklist.id === slug
    );

    if (matchingSlugs) {
      slug = slug + Date.now().toString();
    }

    return slug;
  }
}
