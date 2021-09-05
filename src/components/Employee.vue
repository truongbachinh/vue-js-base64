<template>
<div>
    <div v-if="currentEmployee" class="edit-form">
        <h4 class="text-center">Employee</h4>
        <form>
            <div class="form-group">
                <label for="title">Employee Id</label>
                <input type="text" class="form-control" id="title"
                v-model="currentEmployee.employeeId"
                />
            </div>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                type="text"
                class="form-control"
                id="firstName"
                v-model="currentEmployee.firstName"
                name="firstName"
                />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                type="text"
                class="form-control"
                id="lastName"
                v-model="currentEmployee.lastName"
                name="lastName"
                />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input
                type="email"
                class="form-control"
                id="email"
                v-model="currentEmployee.email"
                name="email"
                />
            </div>
             {{currentEmployee.hireDate | formatDate}} 
            <div class="form-group">
                <label for="hireDate">Hire Date</label>
                <input
                type="datetime"
                class="form-control"
                id="hireDate"
                v-model="currentEmployee.hireDate "
                name="hireDate"
                />
            </div>
           {{currentEmployee.salary | formatNumber}} 
            <div class="form-group">
                <label for="salary">Salary</label>
                <input
                type="number"
                class="form-control"
                id="salary"
                v-model="currentEmployee.salary"
                name="salary"
                />
            </div>
            <div class="form-group">
                <label for="jobId">Job Id</label>
                <input
                type="text"
                class="form-control"
                id="jobId"
                v-model="currentEmployee.jobId"
                name="jobId"
                />
            </div>
        </form>
        <div class="my-4">
            <button class="btn btn-danger mr-2 mx-5" @click="deleteEmployee" >
                Delete
            </button>
            
            <button type="submit" class="btn btn-success"
            @click="updateEmployee"
            >
            Update
            </button>
            <p>{{ message }}</p>
         </div>
    </div>
    <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
    </div>
</div> 
</template>
<script>
import EmployeesDataService from '../services/EmployeesDataService';
import moment from 'moment'

export default {
    name: "employee",
    data() {
        return {
        currentEmployee: null,
        message: ''
        };
    },
    methods: {
        getEmployee(employeeId){
            EmployeesDataService.get(employeeId)
                .then((result) => {
                    this.currentEmployee = result.data;
                    console.log('result.data :>> ', result.data);
                }).catch((err) => {
                    console.log('err :>> ', err);
                });
        },
        updateEmployee()
        {
            EmployeesDataService.update(this.currentEmployee.employeeId, this.currentEmployee)
                .then((result) => {
                    console.log("🚀 -> .update -> result", result)
                    this.message = 'The tutorial was updated successfully!';
                }).catch((err) => {
                    console.log('err :>> ', err);
                    
                });
        },

        deleteEmployee()
        {
            EmployeesDataService.delete(this.currentEmployee.employeeId)
                .then((result) => {
                    console.log("🚀 -> .delete -> result", result)
                    this.$router.push({name: 'employee'})
                }).catch((err) => {
                    console.log('err :>> ', err);
                });
          
        },
        
    },
    filters:{
        formatNumber: (money)=>{            
            return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ' VNĐ'; // 12,345.67
        },
        formatDate: (date)=>{
            if(date)
            {
                    return moment(String(date)).format('DD/MM/YYYY')
            }
        },
    },
    mounted() {
        this.message = '',
        this.getEmployee(this.$route.params.id)
    },
    
}
</script>
<style>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }
</style>