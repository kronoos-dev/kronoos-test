function formatDates(data) {
  data.forEach((row) => {
    const dtContrato = row.dtContrato;
    const dtVctPre = row.dtVctPre;

    row.dtContrato = new Date(
      parseInt(dtContrato.substr(0, 4)),
      parseInt(dtContrato.substr(4, 2)) - 1,
      parseInt(dtContrato.substr(6, 2))
    );

    row.dtVctPre = new Date(
      parseInt(dtVctPre.substr(0, 4)),
      parseInt(dtVctPre.substr(4, 2)) - 1,
      parseInt(dtVctPre.substr(6, 2))
    );
  });
}

module.exports = { formatDates };
