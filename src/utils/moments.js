import Moment from "moment";
import _ from "lodash";
import { extendMoment } from "moment-range";

// import store from 'store/createStore';
// const state = store.getState();

// console.log("state : ", state);

const moment = extendMoment(Moment);

export function getMomentsData(tasks) {
  var filtered = [];
  console.log("tasks : ", tasks);


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

  // checking if the tasks array after filtering is empty;
  if (filtered.length === 0) {
    return  [0, 0, 0, 0, 0, 0, 0]
  }



  filtered = _.sortBy(filtered, function (o) {
    return o.time;
  });

  console.log("week : ", moment.weekdays());

  const groupedTasks = _.groupBy(filtered, (task) => moment(task.time).day());
  console.log(" grouped tasks : ", groupedTasks);

  // const arrOfTasks = _.values(groupedTasks);
  // console.log("arr of tasks : ", arrOfTasks);

  var data = [];

  for(let i = 0; i < 7; i++){
    if(i in groupedTasks){
      data.push(groupedTasks[i].length);
    }
    else{
      data.push(0);
    }
  }

  console.log("--------------------------------");
  console.log(groupedTasks);
  console.log("--------------------------------");
  console.log(data);
  console.log("--------------------------------");

  return data;
}

