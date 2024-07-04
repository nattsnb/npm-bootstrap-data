export class Table {
  constructor(container, data) {
    this.tableContainer = container;
    this.tableData = data;
    this.createTable();
    this.table = null;
  }

  createTable = () => {
    this.table = document.createElement("table");
    for (let i = 0; i < this.tableData.length; i++) {
      const tr = this.table.insertRow();
      for (let j = 0; j < 2; j++) {
        const td = tr.insertCell();
      }
    }
    this.tableContainer.appendChild(this.table);
  };
}
