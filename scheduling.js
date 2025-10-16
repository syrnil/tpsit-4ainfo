function avg(arr) {
  if (!arr || arr.length === 0) return "0.00";
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
}

function fcfs(tasks) {
  tasks.sort((a, b) => a.arrival_time - b.arrival_time);
  let time = 0, waiting = [], turnaround = [];

  for (let task of tasks) {
    if (time < task.arrival_time) time = task.arrival_time;
    let wait = time - task.arrival_time;
    let tat = wait + task.burst_time;
    waiting.push(wait);
    turnaround.push(tat);
    time += task.burst_time;
  }
  return [avg(waiting), avg(turnaround)];
}

function ssjf(tasks) {
  let time = 0, index = 0;
  let ready = [], done = [], waiting = [], turnaround = [];
  tasks.sort((a, b) => a.arrival_time - b.arrival_time);

  while (done.length < tasks.length) {
    while (index < tasks.length && tasks[index].arrival_time <= time) {
      ready.push(tasks[index]);
      index++;
    }

    if (ready.length > 0) {
      ready.sort((a, b) => a.burst_time - b.burst_time);
      let task = ready.shift();
      let wait = time - task.arrival_time;
      wait = Math.max(0, wait);
      let tat = wait + task.burst_time;
      waiting.push(wait);
      turnaround.push(tat);
      time += task.burst_time;
      done.push(task);
    } else {
      time++;
    }
  }
  return [avg(waiting), avg(turnaround)];
}

function srtf(tasks) {
  // assicurati che i task siano ordinati per arrival_time
  tasks.sort((a, b) => a.arrival_time - b.arrival_time);

  let time = 0, index = 0;
  let n = tasks.length;
  let remaining = {}, start = {}, complete = {};
  let waiting = [], turnaround = [];

  for (let task of tasks) {
    remaining[task.id] = task.burst_time;
    start[task.id] = -1;
  }

  let ready = [];

  while (Object.keys(complete).length < n) {
    while (index < n && tasks[index].arrival_time <= time) {
      ready.push(tasks[index]);
      index++;
    }

    if (ready.length > 0) {
      ready.sort((a, b) => remaining[a.id] - remaining[b.id]);
      let task = ready[0];

      if (start[task.id] === -1) {
        start[task.id] = time;
      }

      remaining[task.id]--;
      time++;

      if (remaining[task.id] === 0) {
        complete[task.id] = time;
        let tat = complete[task.id] - task.arrival_time;
        let wt = tat - task.burst_time;
        turnaround.push(tat);
        waiting.push(wt);
        ready = ready.filter(t => t.id !== task.id);
      }
    } else {
      // se non ci sono processi ready, salta al prossimo arrival (ottimizzazione)
      if (index < n) {
        time = Math.max(time + 1, tasks[index].arrival_time);
      } else {
        time++;
      }
    }
  }

  return [avg(waiting), avg(turnaround)];
}

function simulate() {
  try {
    const json = document.getElementById("jsonInput").value;
    const data = JSON.parse(json);
    const tasks = data.tasks;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      alert("Inserisci almeno un task nel JSON.");
      return;
    }

    const fcfsResult = fcfs([...tasks]);
    const ssjfResult = ssjf([...tasks]);
    const srtfResult = srtf([...tasks]);

    const html = `
      <h2>Risultati</h2>
      <table>
        <tr>
          <th>Algoritmo</th>
          <th>Tempo Medio di Attesa</th>
          <th>Tempo Medio di Turnaround</th>
        </tr>
        <tr>
          <td>FCFS</td>
          <td>${fcfsResult[0]}</td>
          <td>${fcfsResult[1]}</td>
        </tr>
        <tr>
          <td>SSJF</td>
          <td>${ssjfResult[0]}</td>
          <td>${ssjfResult[1]}</td>
        </tr>
        <tr>
          <td>SRTF</td>
          <td>${srtfResult[0]}</td>
          <td>${srtfResult[1]}</td>
        </tr>
      </table>
    `;

    document.getElementById("results").innerHTML = html;
  } catch (err) {
    alert("Errore nel parsing JSON o nella simulazione. Controlla il formato dei dati.");
    console.error(err);
  }
}

function generateTasks(n = 5) {
  let tasks = [];
  for (let i = 1; i <= n; i++) {
    tasks.push({
      id: "P" + i,
      arrival_time: Math.floor(Math.random() * 10),
      burst_time: Math.floor(Math.random() * 10) + 1
    });
  }
  document.getElementById("jsonInput").value = JSON.stringify({ tasks }, null, 2);
}
