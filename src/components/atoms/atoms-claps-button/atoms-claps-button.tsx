import { Component, Prop, h, State, EventEmitter, Event } from '@stencil/core';


@Component({
  tag: 'atoms-claps-button',
  styleUrl: 'atoms-claps-button.scss',
  shadow: true,
})

export class AtomsClapsButton {
  @Prop() clapsTotal: number;
  @Prop() domId: number;
  @State() showInfo: boolean = false;
  @Event() buttonClick: EventEmitter<Object>;

  private onButtonClick() {
    const { domId } = this;
    this.showInfo = !this.showInfo;
    this.buttonClick.emit({ click: this.showInfo, domId });
  }

  private calcOpacity() {
    return `rgba(255,209,0,${this.clapsTotal / 2000}) `;
  }

  render() {
    return (
      <div class="claps-button">
        <button
          style={{ backgroundColor: this.calcOpacity() }}
          onClick={this.onButtonClick.bind(this)}
          class="btn"><span class="text">Total Claps {this.clapsTotal} </span>
          <span><img class={this.showInfo ? 'up' : 'down'}/> </span>
        </button>
      </div>
    );
  }
}


