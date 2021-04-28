// pass in a response to a query from timestream

export default function formatTSQueryResult(obj) {
  const colNames = obj.ColumnInfo.map(col => col.Name);
  const rows = obj.Rows.map(row => row.Data);
  const remapped = rows.map(row => {
    const kvPairs = row.map((el, idx) => {
      const newEl = {};
      newEl[colNames[idx]] = el.ScalarValue;
      return newEl;
    });

    return Object.assign({}, ...kvPairs);
  });

  return remapped;
}
