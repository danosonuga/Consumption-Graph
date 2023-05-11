const start_datee = document.querySelector("#starte");
const end_datee = document.querySelector("#ende");

const start_datep = document.querySelector("#startp");
const end_datep = document.querySelector("#endp");

start_datee.addEventListener("change", function () {
  localStorage.setItem("start_datee", start_datee.value);
  const end_date = localStorage.getItem("end_date");
  displayECGraph(start_datee.value, end_date);
});

end_datee.addEventListener("change", function () {
  localStorage.setItem("end_datee", end_datee.value);
  const start_date = localStorage.getItem("start_date");
  displayECGraph(start_date, end_datee.value);
});

start_datep.addEventListener("change", function () {
  localStorage.setItem("start_datep", start_datep.value);
  const end_date = localStorage.getItem("end_datee");
  displayPmtGraph(start_datep.value, end_date);
});

end_datep.addEventListener("change", function () {
  localStorage.setItem("end_datep", end_datep.value);
  const start_date = localStorage.getItem("start_datep");
  displayPmtGraph(start_date, end_datep.value);
});


/**
 * Display the energy consumption graph
 * @param start_date
 * @param end_date
 */
function displayECGraph(start_date, end_date) {
  let dates = [];
  let values = [];

  fetch("energy_consumption/energy_consumption_user1.csv")
    .then((result) => result.text())
    .then((data) => {
      let lines = data.split("\n");

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split(",");
        dates.push(new Date(line[0]));
        values.push(parseFloat(line[1]));
      }

      // Define Data
      const mydata = [
        {
          x: dates,
          y: values,
          mode: "lines",
        },
      ];

      // Define Layout
      const layout = {
        xaxis: {
          range: [start_date, end_date],
          type: "date",
          title: "Date of Consumption",
        },
        yaxis: {
          range: [0, 300],
          title: "Energy Consumption (in Kwh)",
        },
      };

      // Display using Plotly
      Plotly.newPlot("myPlot", mydata, layout);
    });
}

/**
 * Display payment usage graph
 * @param start_date
 * @param end_date
 */
function displayPmtGraph(start_date, end_date) {
  let dates = [];
  let values = [];

  fetch("energy_consumption/energy_consumption_user1.csv")
    .then((result) => result.text())
    .then((data) => {
      let lines = data.split("\n");

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split(",");
        dates.push(new Date(line[0]));
        values.push(parseFloat((line[1] * 0.36).toFixed(2).padStart(2, '0')));
      }

      // Define Data
      const mydata = [
        {
          x: dates,
          y: values,
          mode: "lines",
        },
      ];

      // Define Layout
      const layout = {
        xaxis: {
          range: [start_date, end_date],
          type: "date",
          title: "Date of Payment",
        },
        yaxis: {
          range: [0, 100],
          title: "Electricity Payments (in Cedis)",
        },
      };

      // Display using Plotly
      Plotly.newPlot("myPmt", mydata, layout);
    });
}

window.onload = () => {
  localStorage.setItem("start_datee", `${start_datee.value}`);
  localStorage.setItem("end_datee", `${end_datee.value}`);

  localStorage.setItem("start_datep", `${start_datep.value}`);
  localStorage.setItem("end_datep", `${end_datep.value}`);

  displayECGraph(start_datee.value, end_datee.value);
  displayPmtGraph(start_datep.value, end_datep.value);
};
