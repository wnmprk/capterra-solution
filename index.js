const fs = require('fs');
const clicks = JSON.parse(fs.readFileSync('./clicks.json', 'utf8'));
const solution = getResultSet(clicks);
const formattedJSONSolution = JSON.stringify(solution, null, 2);

fs.writeFileSync('./resultset.json', formattedJSONSolution);

// Helper function to get click period/hour
function getHour(timestamp) {
  return new Date(timestamp).getHours();
}

function getResultSet(clicks) {
  let subset = [];
  let memo = {};
  let currentTime = getHour(clicks[0].timestamp);

  for (var i = 0; i < clicks.length; i++) {
    let click = clicks[i];
    let clickTime = getHour(click.timestamp);

    if (!memo[click.ip]) {
      memo[click.ip] = {
        count: 1,
        amount: click.amount,
        lastHour: clickTime,
      }
      subset.push(click);
    } else {
      if ((click.amount > memo[click.ip].amount || clickTime !== memo[click.ip].lastHour) &&
            memo[click.ip].count < 10
      ) {
        if (currentTime === clickTime) {
          subset = subset.filter(c => c.ip !== click.ip || clickTime !== getHour(c.timestamp));
        } else {
          currentTime = clickTime;
        }
        subset.push(click);
        memo[click.ip].count++;
        memo[click.ip].amount = click.amount;
        memo[click.ip].lastHour = clickTime;
      }
    }
  }
  return subset;
}

module.exports = {
  getHour: getHour,
  getResultSet: getResultSet,
};
