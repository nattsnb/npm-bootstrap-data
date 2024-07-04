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
  };

  findItemById(list, id) {
    return list.find((obj) => obj.id === id).name;
  }
}
