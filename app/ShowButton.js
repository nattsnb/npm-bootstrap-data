export class ShowButton {
  constructor(tableToShow, row) {
    this.tableToShow = tableToShow;
    this.row = row;
    this.createButtonElement();
    this.isVisable = false;
    this.initializeEventListener();
  }
  initializeEventListener = () => {
    this.Button.addEventListener("click", this.showOnClick);
  };

  createButtonElement = () => {
    this.Button = document.createElement("button");
    this.Button.classList.add("show-button");
    this.Button.innerHTML = "Show Users";
    this.row.appendChild(this.Button);
  };

  showOnClick = () => {
    if (this.isVisable === false) {
      this.tableToShow.classList.remove("nested-table");
      this.tableToShow.classList.add("table-is-visible");
      this.isVisable = true;
    } else {
      this.tableToShow.classList.remove("table-is-visible");
      this.tableToShow.classList.add("nested-table");
      this.isVisable = false;
    }
  };
}
