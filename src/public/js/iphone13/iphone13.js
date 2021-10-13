import Tab from "./switch.js";
import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
import Login from "./login.js";
const loginSwitch = new Tab($(".login__content"));
const login = new Login($("#login__form"));
