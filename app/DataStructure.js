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
    this.finalData = [];
    for (let i = 0; i < this.companiesData.length; i++) {
      this.finalData[i] = { name: this.companiesData[i].name };
      const companyUri = this.companiesData[i].uri;
      let users = [];
      for (let j = 0; j < this.usersData.length; j++) {
        if (this.usersData[j].uris.company === companyUri) {
          const user = {
            name: this.usersData[j].name,
            email: this.usersData[j].email,
          };
          users.push(user);
        }
      }
      this.finalData[i].users = users;
      this.finalData[i].numberOfUsers = this.finalData[i].users.length;
    }
    console.log(this.finalData);
    this.populateTable();
  };

  populateTable = () => {
    const tableBody = document.querySelector(".table-body");
    for (let i = 0; i < this.finalData.length; i++) {
      const row = document.createElement("tr");
      const cell1 = document.createElement("td");
      const cell2 = document.createElement("td");
      const cell3 = document.createElement("td");
      cell1.innerHTML = i + 1;
      cell2.innerHTML = this.finalData[i].name;
      cell3.innerHTML = this.finalData[i].numberOfUsers;
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      tableBody.appendChild(row);
    }
  };
}
