import Vue from 'vue';
import Router from 'vue-router';
import AddEmployee from "./components/AddEmployee"
import employee from  "./components/Employee"
Vue.use(Router);

export default new Router({
    mode:"history",
    routes:[
        {
            path: "/",
            alias: '/employees',
            name:'employees',
            component :()=> import("./components/EmployeesList")
        },
        {

            path:"/employees/:id",
            name:"employee-details",
            component: employee,
            params:true
        },
        {
            path:"/add-employee",
            name:"add-employee",
            component:AddEmployee,
        }
    ]
});