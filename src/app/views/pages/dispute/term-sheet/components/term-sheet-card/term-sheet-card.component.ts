import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ArbitratorLibraryService } from 'src/app/views/pages/arbitrator/shared/arbitrator-library/shared/arbitrator-library.service';
import { TermSheetService } from '../../services/term-sheet.service';
import { summernoteConfig } from 'src/app/shared/configs/summernote';
import { SummerNote } from 'src/app/shared/interfaces/summernote';

@Component({
  selector: 'term-sheet-card',
  templateUrl: './term-sheet-card.component.html',
  styleUrls: ['./term-sheet-card.component.scss'],
})
export class TermSheetCardComponent implements OnInit {
  @Input() heading!: any[];
  @Input() termSheetSectionTitle!: any;
  @Input() clauseList!: any[];

  @Output() itemAdded = new EventEmitter();
  @Output() itemDeleted = new EventEmitter();
  @Output() sectionUpdated = new EventEmitter();

  editorValue = '';
  editorConfig!: SummerNote;

  constructor() {}

  ngOnInit(): void {
    this.editorConfig = summernoteConfig;
    this.editorConfig.placeholder = 'Insert clause or add your text here...';
    this.editorConfig.height = 100;

    this.editorValue = this.heading[0].text;
  }

  insertClause(clause: any) {
    this.sectionUpdated.emit({
      sectionId: this.heading[0].id,
      text: this.editorValue.concat(
        `<u>${clause.title}</u>: ${clause.content}`
      ),
    });

    this.editorValue = this.editorValue.concat(
      `<u>${clause.title}</u>: ${clause.content}`
    );
  }

  sectionValueChange(event: any) {
    this.sectionUpdated.emit({
      sectionId: this.heading[0].id,
      text: this.editorValue,
    });

    this.editorValue = this.editorValue;
  }

  sectionItemAdded(val: any) {
    this.itemAdded.emit(val);
  }

  sectionItemDeleted(ind: number) {
    this.itemDeleted.emit(ind);
  }
}
