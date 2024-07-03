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
      const lookFor = this.companiesData[i].uri;
      for (let j = 0; j < this.usersData.length; j++) {
        if (this.usersData[j].uris.company === lookFor) {
          const newUser = {
            user: {
              name: this.usersData[j].name,
              email: this.usersData[j].email,
            },
          };
          this.finalData[i].users = { ...newUser };
        }
      }
    }
    console.log(this.finalData);
  };

  findItemById(list, id) {
    return list.find((obj) => obj.id === id).name;
  }
}
