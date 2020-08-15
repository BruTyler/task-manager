import TaskView from '../view/task';
import {Color} from '../const';

it(`Task rendering`, () => {
  const task = {
    description: `some description`,
    dueDate: new Date(2020, 8, 4),
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    },
    color: Color.BLACK,
    isFavorite: true,
    isArchive: false,
  };

  const generatedTree = new TaskView(task).getTemplate();

  expect(generatedTree).toMatchSnapshot();
});
