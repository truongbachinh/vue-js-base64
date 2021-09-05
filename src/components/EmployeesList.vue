<template>
    <div class="list row">
        <div class = "col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by id"  v-model="employeeId"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchById">Search</button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Employees List</h4>
               <ul class="list-group">
                    <li class="list-group-item" 
                    :class="{ active: index == currentIndex }"  
                    v-for="(employee, index) in employees"
                    :key="index"
                    @click="setActiveEmployee(employee, index)"
                    >
                    {{ employee.lastName }}
                    </li>
                </ul>
                <button class="m-3 btn btn-sm btn-danger" @click="removeAllEmployees">
                     Remove All
                </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentEmployee">
                <h4>Employee</h4>
                <div>
                    <label><strong>Id:</strong></label> {{ currentEmployee.employeeId }}
                </div>
                <div>
                    <label><strong>First Name:</strong></label> {{ currentEmployee.firstName }}
                </div>
                <div>
                    <label><strong>Last Name:</strong></label> {{ currentEmployee.lastName }}
                </div>
                <div>
                    <label><strong>Email:</strong></label> {{ currentEmployee.email }}
                </div>
                <div>
                    <label><strong>Hire Date:</strong></label> {{ currentEmployee.hireDate }}
                </div>
                <div>
                    <label><strong>Salary:</strong></label> {{ currentEmployee.salary }}
                </div>
                <div>
                    <label><strong>Job Id:</strong></label> {{ currentEmployee.jobId }}
                </div>
                
                <div>
                <a class="btn btn-warning"
                    :href="'/employees/' + currentEmployee.employeeId"
                    >
                    Edit
                </a>
                 </div>
            </div> 
            <div v-else>
                <br />
                <p>Please click on a Employee...</p>
            </div>   
        </div>
    </div>
</template>


<script>
import EmployeesDataService from "../services/EmployeesDataService";
export default {
    name: "employees-list",
    data()
    {
        return{
            employees: [],
            currentEmployee: null,
            currentIndex: -1,
            employeeId: "",
        };
    },
    methods: {
        retrieveEmployees()
        {
            EmployeesDataService.getAll()
                .then((result) => {
                    this.employees =  result.data;
                    console.log('result :>> ', result);
                }).catch((err) => {
                    console.log('err     :>> ', err);
                });
        },
        refreshList()
        {
            this.retrieveEmployees();
            this.currentEmployee = null;
            this.currentIndex = -1;
        },

        setActiveEmployee(employee, index)
        {
            this.currentEmployee = employee;
            this.currentIndex = index;
        },

        removeAllEmployees()
        {
            EmployeesDataService.deleteAll();
        },

        searchById()
        {
            EmployeesDataService.findById(this.employeeId)
                .then((result) => {
                    this.employees  = result.data;
                    console.log("Result =>", result.data)
                }).catch((err) => {
                    console.log('err :>> ', err);
            });
        }
    },
    mounted() {
        this.retrieveEmployees();
    }  
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>