import * as Plot from "@observablehq/plot";

function safeFormat(n) {
  return typeof n === "number" && !Number.isNaN(n)
    ? n.toFixed(1)
    : Number(n)
    ? Number(n).toFixed(1)
    : "0.0";
}

export function renderChart(container, data, config = {}) {
  const chart = Plot.plot({
    marks: [
      Plot.barY(data, {
        x: "mode",
        y: "CO2e",
        fill: (d) => d.mode,
        title: (d) => `${d.mode} : ${safeFormat(d.CO2e)} kg CO₂e`,
      }),
      Plot.text(data, {
        x: "mode",
        y: (d) => d.CO2e + 2,
        text: (d) => `${safeFormat(d.CO2e)} kg`,
        textAnchor: "middle",
        fontWeight: "bold",
      }),
      Plot.ruleY([0]),
    ],
    ...config,
  });

  container.innerHTML = "";
  container.append(chart);
}
