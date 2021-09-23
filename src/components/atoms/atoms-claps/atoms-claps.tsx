import { Component, Prop, h, State, Event, EventEmitter } from '@stencil/core';
import SelectedComment from '../../../models/selected-comment';


@Component({
  tag: 'atoms-claps',
  styleUrl: 'atoms-claps.scss',
  shadow: true,
})

export class AtomsClaps {
  @Prop() item: any;
  @State() isClick: boolean = false;

  @Event() clickLikeButton: EventEmitter;

  private onButtonClick() {
    this.isClick = !this.isClick;
    const { id, userId } = this.item;
    const obj = { id, userId, clickStatus: this.isClick } as SelectedComment;
    this.clickLikeButton.emit(obj);
  }

  render() {
    return (
      <div class="claps"
           onClick={this.onButtonClick.bind(this)}>
        <img class="claps-icon" src={'../assets/icon/claps.png'}/>
        <span class="claps-total">{this.item.claps}</span>
      </div>
    );
  }
}


