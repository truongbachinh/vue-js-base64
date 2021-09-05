import http from '../http-common';
class EmployeesDataService {
    getAll() {
        let  x = http.get("/api-employee?action=list&type=json");
        return x
    }
    get(id) {
        return http.get(`/api-employee?action=el&type=json&id=${id}`);
    }
    create(data) {
        console.log("🚀 -> create -> data", data)
        let formData = new FormData();
    //     console.log('typeof formData:>> ',typeof formData);
        Object.keys(data).forEach(function(key){
                formData.append(key, data[key]); 
        })
       
    //     console.log(' formData:>> ', formData);  
    //    console.log('check key value :>> ');
    //    for(var pair of formData.entries()) {
    //         console.log(pair[0]+ ', '+ pair[1]); 
    //     }
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var jsonData = JSON.stringify(object);
       console.log('jsonData :>> ', jsonData);
   
        

        return http.post("/api-employee?action=insert", object);
    }
    update(id, data) {
        return http.put(`/api-employee/${id}`, data);
    }

    delete(id) {
        return http.delete(`/api-employee/${id}`);
    }

    deleteAll() {
        return http.delete(`/api-employee`);
    }

    findById(id) {
        return http.get(`/api-employee?id=${id}`);
    }
}
export default new EmployeesDataService();
