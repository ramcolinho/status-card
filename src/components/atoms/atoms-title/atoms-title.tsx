import { Component, Prop, h } from '@stencil/core';


@Component({
  tag: 'atoms-title',
  styleUrl: 'atoms-title.scss',
  shadow: true,
})

export class AtomsTitle {
  @Prop() commentTitle: string;
  @Prop() commentBody: string;

  render() {
    return (
      <div class="header">
       <p class="header-text">{this.commentTitle}</p>
       <p>{this.commentBody}</p>
      </div>
    );
  }
}


