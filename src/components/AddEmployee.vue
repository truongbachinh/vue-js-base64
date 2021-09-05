<template>
  <div class="submit-form">
      <h4>Add Employee</h4>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="employeeId">employeeId</label>
        <input
          type="text"
          class="form-control"
          id="employeeId"
          required
          v-model="employee.employeeId"
          name="employeeId"
        />
      </div>

      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          required
          v-model="employee.firstName"
          name="firstName"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          required
          v-model="employee.lastName"
          name="lastName"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          required
          v-model="employee.email"
          name="email"
        />
      </div>
      <div class="form-group">
        <label for="hireDate">Hire Date</label>
        <input
          type="date"
          class="form-control"
          id="hireDate"
          required
          v-model="employee.hireDate"
          name="hireDate"
        />
      </div>
      <div class="form-group">
        <label for="salary">Salary</label>
        <input
          type="number"
          class="form-control"
          id="salary"
          required
          v-model="employee.salary"
          name="salary"
        />
      </div>
      <div class="form-group">
        <label for="jobId">Job Id</label>
        <input
          type="text"
          class="form-control"
          id="jobId"
          required
          v-model="employee.jobId"
          name="jobId"
        />
      </div>
         <div class="form-group">
        <label for="avatar">Avatar</label>
        <input
          type="file"
          class="form-control"
          id="avatar"
          required
          accept="image/*"
          ref="file"
          @change="selectImage"
          name="avatar"/>
      </div>
      <div v-if="previewImage">
        <div>
          <img class="preview my-3" :src="previewImage" alt=""  height="100" width="100"/>
        </div>
      </div>

      <button @click="saveEmployee" class="btn btn-success my-4">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newEmployee">Add</button>
    </div>
  </div>
</template>

<script>
import EmployeesDataService from "../services/EmployeesDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      employee: {
        employeeId: null,
        firstName: "",
        lastName: "",
        email: "",
        hireDate: null,
        salary: null,
        jobId: "",
        avatar:null,
      },
      submitted: false,
      currentImage: undefined,
      previewImage: undefined,
      rawImg: null,
    };
  },
  methods: {
    selectImage(){
      let imageFile = this.$refs.file.files.item(0);
      this.currentImage = imageFile;
      this.previewImage = URL.createObjectURL(this.currentImage);



    
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      let base_strings = async (file) => {
        let image = await toBase64(file);
        console.log('image1 :>> ', image);
        return image;
      };

     base_strings(imageFile)
        .then((result) => {
          console.log('image2 :>> ', result);
          this.rawImg = result;
        }).catch((err) => {
          console.log('err :>> ', err);
        });
    },
    saveEmployee() {

      let data = {
        employeeId: this.employee.employeeId,
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        email: this.employee.email,
        hireDate: this.employee.hireDate,
        salary: this.employee.salary,
        jobId: this.employee.jobId,
        avatar:  this.rawImg,
      };
      EmployeesDataService.create(data)
        .then((response) => {
          this.employee.employeeId = response.data.employeeId;
          console.log("response status =>>", response.data);
         
        })
        .catch((err) => {
          console.log(err);
        });
    },
    newEmployee()
    {
      this.submitted = false;
      this.employee ={}
    },
 
  },
};
</script>

<style>
.submit-form{
  max-width:300px;
  margin:auto;
}
</style>