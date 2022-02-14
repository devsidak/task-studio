import Moment from "moment";
import _ from "lodash";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export function getMomentsData(tasks) {
  var filtered = [];


  var currentWeekStart = moment()
    .subtract(1, "week")
    .startOf("isoWeek")
    .format("YYYY-MM-DD HH:mm:ss");
  var currentWeekEnd = moment()
    .subtract(1, "week")
    .endOf("isoWeek")
    .format("YYYY-MM-DD HH:mm:ss");

  console.log("start : ", currentWeekStart, " End : ", currentWeekEnd);

  const range = moment.range(currentWeekStart, currentWeekEnd);
  console.log("range : ", range);

  // const days = Array.from(range.by("days"));

  tasks.forEach((task) => {
    const time = new Date(task.time);

    if (range.contains(time) && task.completed) {
      console.log(" --------------------------------");
      console.log("task : ", task.time);
      console.log(" --------------------------------");

      filtered.push(task);
    }
  });

  filtered = _.sortBy(filtered, function (o) {
    return o.time;
  });

  console.log("week : ", moment.weekdays());

  const groupedTasks = _.groupBy(filtered, (task) => moment(task.time).day());
  console.log(" grouped tasks : ", groupedTasks);

  const arrOfTasks = _.values(groupedTasks);
  console.log("arr of tasks : ", arrOfTasks);

  var data = [];

  arrOfTasks.forEach((tasks) => {
   const length = tasks.length;
    data.push(length);
  });


  return data;
}

