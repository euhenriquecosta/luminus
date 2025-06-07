import { UniqueEntityId } from "./unique-entity-id.vo.js";

export class Entity<TProps> {
  private _id: UniqueEntityId;
  protected props: TProps;

  get id() {
    return this._id;
  }

  constructor(props: TProps, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId(id);
  }
}