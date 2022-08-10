const totalInProgress = parseInt(
  document.getElementById('totalInProgress').innerText
);
const totalDone = parseInt(document.getElementById('totalDone').innerText);

const totalEarly = parseInt(document.getElementById('totalEarly').innerText);

const totalBlocked = parseInt(
  document.getElementById('totalBlocked').innerText
);

const dataDoughnut = {
  labels: ['Early Stages', 'In Progress', 'Blocked', 'Done'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [totalEarly, totalInProgress, totalBlocked, totalDone],
      backgroundColor: [
        'rgb(45, 160, 255)',
        'rgb(71, 224, 38)',
        'rgb(244, 237, 41)',
        'rgb(221, 135, 46)',
      ],
      hoverOffset: 4,
    },
  ],
};

const configDoughnut = {
  type: 'doughnut',
  data: dataDoughnut,
  options: {},
};

var chartBar = new Chart(
  document.getElementById('chartStatus'),
  configDoughnut
);

////

const myTotalInProgress = parseInt(
  document.getElementById('myInProgress').innerText
);
const myTotalDone = parseInt(document.getElementById('myDone').innerText);

const myTotalEarly = parseInt(
  document.getElementById('myTotalEarly').innerText
);

const myTotalBlocked = parseInt(
  document.getElementById('myTotalBlocked').innerText
);

const dataDoughnut2 = {
  labels: ['Early Stages', 'In Progress', 'Blocked', 'Done'],
  datasets: [
    {
      label: 'My status',
      data: [myTotalEarly, myTotalInProgress, myTotalBlocked, myTotalDone],
      backgroundColor: [
        'rgb(45, 160, 255)',
        'rgb(71, 224, 38)',
        'rgb(244, 237, 41)',
        'rgb(221, 135, 46)',
      ],
      hoverOffset: 4,
    },
  ],
};

const configDoughnut2 = {
  type: 'doughnut',
  data: dataDoughnut2,
  options: {},
};

var chartBar2 = new Chart(
  document.getElementById('chartStatus2'),
  configDoughnut2
);
