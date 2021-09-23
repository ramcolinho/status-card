import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'atoms-avatar',
  styleUrl: 'atoms-avatar.scss',
  shadow: true,
})

export class AtomsAvatar {
  @Prop() imageLink: string = '../../assets/img/avatar.png';
  @Prop() name:string;


  render() {
    return (
      <div class={'avatar'}>
        <img src={this.imageLink}/>
        <span class={'avatar-title'}>{this.name}</span>
      </div>
    );
  }
}


