import { randomUUID } from "node:crypto";

export class Entity<TProps> {
  private _id: string;
  protected props: TProps;

  get id() {
    return this._id;
  }

  constructor(props: TProps, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }
}