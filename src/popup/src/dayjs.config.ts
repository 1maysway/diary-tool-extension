import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

dayjs.locale({
  ...ru,
  weekStart: 1,
});
