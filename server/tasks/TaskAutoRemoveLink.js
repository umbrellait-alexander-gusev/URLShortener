const cron = require('node-cron');
import * as db from './DataBaseUtils';

const TaskAutoRemoveLink = cron.schedule('* * */1 * *', () => {
    db.listLinks().then(data => data.map(link => {
            let secondDateItem = Date.parse(link.createdAt) / 1000;
            let secondDateNow = Date.parse(new Date()) / 1000;
            let sec = secondDateNow - secondDateItem;
            let min = sec / 60;
            let hour = min / 60;
            let day = hour / 24;
            let dayNow = day.toFixed(0);

            if (dayNow > 15) {
                db.deleteLink(link._id).then()
            }
        })
    );
}).start();

export default TaskAutoRemoveLink;