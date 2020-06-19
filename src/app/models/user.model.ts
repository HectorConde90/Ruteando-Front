export class User {
    name: string;
    last_name: string;
    email: string;
    password: string;
    routes: any;
    register_date: Date;



    constructor(name: string, last_name: string, email: string, password: string, routes: any, register_date: Date) {
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.routes = routes;
        this.register_date = new Date();
    }
}