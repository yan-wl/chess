import { HistoryRecord } from './HistoryRecord';

type RecordFilter = (record: HistoryRecord) => boolean;

export default class MoveHistory {
  private _records: HistoryRecord[];

  constructor() {
    this._records = [];
  }

  get latestRecord(): HistoryRecord | undefined {
    if (this._records.length === 0) {
      return undefined;
    }

    return this._records[this._records.length - 1];
  }

  archive(record: HistoryRecord): void {
    this._records.push(record);
  }

  filter(condition: RecordFilter): Set<HistoryRecord> {
    return new Set(this._records.filter(condition));
  }
}
