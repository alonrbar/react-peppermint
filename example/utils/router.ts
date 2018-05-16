export enum Route {
    HomePage = 'HomePage',
    SecondPage = 'SecondPage'
}

export class Router {

    public activeRoute = Route.HomePage;

    public goTo(route: Route) {
        this.activeRoute = route;
    }
}