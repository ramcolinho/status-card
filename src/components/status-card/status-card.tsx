import { Component, h, Host, Listen, State } from '@stencil/core';
import state from '../../store/status-card-state';
import axios from 'axios';


@Component({
  tag: 'status-card',
  styleUrl: 'status-card.scss',
  shadow: true,
})

export class StatusCard {
  @State() isLoad: boolean = true;
  @State() isOpen: boolean = false;
  @State() selectedId: number;
  @State() _API = 'http://localhost:3000/users-comments';


  async componentWillLoad() {
    this.isLoad = true;
    await axios.get(this._API).then(({ data }) => state.data = data)
      .catch(() => alert('something went wrong'))
      .finally(() => this.isLoad = false);
  }

  @Listen('buttonClick')
  isShowComment({ detail: { click, domId } }) {
    this.isOpen = click;
    this.selectedId = domId;
  }

  @Listen('clickLikeButton')
  onClickLikeButton({ detail }) {
    state.clicks = detail;
  }

  render() {
    return (
      <Host>
        {!this.isLoad ? state.data.map((item, i) => {
          return (
            <div class="content">
              <div class="content-card">
                <div class="content-card-avatar">
                  <atoms-avatar imageLink={item.profileImage} name={item.name} key={i}/>
                </div>
                <div class="content-card-totalButton">
                  <atoms-claps-button clapsTotal={item.totalClaps} domId={i} key={i}/>
                </div>
              </div>
              {
                this.isOpen && this.selectedId === i ? (
                    <div class="comment-container">
                      {item.comments.map((comment, index) => {
                        return (
                          <div class="content-comments">
                            <div class="content-comments-comment">
                              <atoms-title
                                commentTitle={comment.title}
                                commentBody={comment.body}
                                key={index}/>
                            </div>
                            <div class="content-comments-claps">
                              <atoms-claps item={comment} key={index}/>
                            </div>
                          </div>
                        );
                      })}
                    </div>)
                  : null
              }
            </div>
          );
        }) : null}
      </Host>
    );
  }
}


