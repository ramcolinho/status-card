import { createStore } from "@stencil/store";
import { StatusCard } from '../models/status-card';
import SelectedComment from '../models/selected-comment';

const { state, onChange} = createStore({
  data: [] as StatusCard[],
  clicks: {} as SelectedComment
});

onChange('clicks', value => {
  const { id, userId, clickStatus } = value;
  state.data.filter(user => user.id === userId)
      .filter(user => user.comments
      .filter(comments => comments.id === id)
      .map(comment => ({
        ...comment,
        claps: clickStatus ? comment.claps++ : comment.claps--,
      })));
});



export default state;
