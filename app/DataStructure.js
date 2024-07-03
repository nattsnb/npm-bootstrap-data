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
    this.finalData = {};
    for (let i = 0; i <= this.companiesData.length; i++) {
      const company = { name: this.companiesData[i].name, users: "user" };
      this.finalData.company = company
    }
    console.log(this.finalData);
  };

}
