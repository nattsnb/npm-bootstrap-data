export class DataStructure{
    constructor() {
        this.usersDataURL = "http://localhost:3000/users"
        this.companiesDataURL = "http://localhost:3000/companies"
        this.fetchData()
    }
    async fetchData() {
        const usersResponse = await fetch(this.usersDataURL);
        this.usersData = await usersResponse.json();
        const companiesResponse = await fetch(this.companiesDataURL);
        this.companiesData = await companiesResponse.json();
    }
}