import { createStore } from '@stencil/store';
import { StatusCard } from '../models/status-card';
import SelectedComment from '../models/selected-comment';

const { state, onChange } = createStore({
  data: [] as StatusCard[],
  clicks: {} as SelectedComment
});

onChange('clicks', value => {
  const { id, userId } = value;
  state.data.filter(user => user.id === userId)
    .filter((user: StatusCard) => user.comments
      .filter(comments => comments.id === id)
      .map(comment => ({
        ...comment,
        claps: comment.claps++,
      })));

  const sortClapsAndTotalClaps = state.data.map(user => ({
    ...user,
    totalClaps: user.comments.reduce((acc, val) => acc + val.claps, 0),
    comments: user.comments.sort((a, b) => reverseSort(a.claps, b.claps)),
  })).sort((x, y) => reverseSort(x.totalClaps, y.totalClaps));

  state.data = sortClapsAndTotalClaps;
});

export const reverseSort = (a, b) => b - a;


export default state;
