$(document).ready(function () {

  $.getJSON("./data.json", function (json) {

    const days = [];      // array of labels for days
    const amounts = [];   // array of amount of money spent
    const colors = [];    // array of color of chart bars
    var max_ind = 0;      // index of entry with highest amount of money spent

    for (var k in json) {
      // go through json file and push values into respective arrays

      var curr = json[k];

      days.push(curr.day);
      amounts.push(curr.amount);
      colors.push("hsl(10, 79%, 65%)");

      if (curr.amount > json[max_ind].amount) {
        //  find index of entry with highest amount of money spent
        max_ind = k;
      }

    }

    colors[max_ind] = "hsl(186, 34%, 60%)";
    // changes color at index max_ind to cyan

    const data = {
      labels: days,
      datasets: [{
        label: "Spending - Last " + days.length + " days",
        backgroundColor: colors,
        borderRadius: 4,
        borderSkipped: false,
        data: amounts,
      }]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            }, ticks: {
              font: {
                family: "'DM Sans', sans-serif"
              },
              color: "hsl(28, 10%, 53%)"
            }
          },
          y: {
            display: false
          }
        },
        plugins: {
          tooltip: {
            mode: 'nearest',
            intersect: true,
            callbacks: {
              title: function(tooltipItems, data) {
                return '';
              },
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
              }
            },
            xAlign: 'center',
            yAlign: 'bottom',
            backgroundColor: 'hsl(25, 47%, 15%)',
            titleAlign: 'center',
            titleColor: 'hsl(33, 100%, 98%)',
            titleFont: {
              family: "'DM Sans', sans-serif"
            },
            bodyFont: {
              family: "'DM Sans', sans-serif"
            },
            displayColors: false,
            caretSize: 0
          },
          legend: {
            display: false
          }
        }
      }
    };

    new Chart(document.getElementById("spending-chart"), config);

  }).fail(function () {

    console.log("An error has occurred.");

  });
});
