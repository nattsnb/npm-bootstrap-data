import { ShowButton } from "./ShowButton";

export class DataStructure {
  constructor() {
    this.usersDataURL = "http://localhost:3000/users";
    this.companiesDataURL = "http://localhost:3000/companies";
    this.fetchData();
    this.companiesData = {};
    this.usersData = {};
  }
  fetchData = async () => {
    const usersResponse = await fetch(this.usersDataURL);
    this.usersData = await usersResponse.json();
    const companiesResponse = await fetch(this.companiesDataURL);
    this.companiesData = await companiesResponse.json();
    this.produceData();
  };

  produceData = () => {
    this.sortedDataArray = [];
    for (let i = 0; i < this.companiesData.length; i++) {
      this.sortedDataArray[i] = { name: this.companiesData[i].name };
      const companyUri = this.companiesData[i].uri;
      this.sortedDataArray[i].users = this.usersData.filter(
        function checkIfBelongsToCompany(user) {
          return user.uris.company === companyUri;
        }
      );
      this.sortedDataArray[i].numberOfUsers = this.sortedDataArray[i].users.length;
    }
    this.sortedDataArray.sort((a, b) => a.numberOfUsers - b.numberOfUsers)
    this.populateTable();
  };

  populateTable = () => {
    const tableBody = document.querySelector(".table-body");
    for (let i = 0; i < this.sortedDataArray.length; i++) {
      const row = document.createElement("tr");
      this.createCompanyEntry(tableBody, row, i);
      const nestedTable = document.createElement("table");
      nestedTable.classList.add("nested-table");
      for (let j = 0; j < this.sortedDataArray[i].numberOfUsers; j++) {
        this.createNestedEntry(nestedTable, i, j);
      }
      const showButton = new ShowButton(nestedTable, row);
      tableBody.appendChild(nestedTable);
    }
  };
  createCompanyEntry = (tableBody, row, i) => {
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    cell1.innerHTML = i + 1;
    cell2.innerHTML = this.sortedDataArray[i].name;
    cell3.innerHTML = this.sortedDataArray[i].numberOfUsers;
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    tableBody.appendChild(row);
  };
  createNestedEntry = (nestedTable, i, j) => {
    const nestedRow = document.createElement("tr");
    const nestedCell1 = document.createElement("td");
    const nestedCell2 = document.createElement("td");
    nestedCell1.innerHTML = this.sortedDataArray[i].users[j].name;
    nestedCell2.innerHTML = this.sortedDataArray[i].users[j].email;
    nestedRow.appendChild(nestedCell1);
    nestedRow.appendChild(nestedCell2);
    nestedTable.appendChild(nestedRow);
  };
}
