import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useEmployeeStore = defineStore("employees", () => {
    const employees = ref([]);
    const total = ref(0);
    const loading = ref(false);
    const selectedEmployee = ref(null)
    const error = ref(null)

    const fetchEmployees = async (params) => {
        console.log('param',params);
        
        try {
        loading.value = true;
        const result = await axios.get("http://localhost:3000/employees", {
            params,
            headers: {
            Prefer: "count=exact", 
            },
        });

        if (result.status === 200) {
            employees.value = result.data;
            total.value = parseInt(result.headers["x-total-count"], 10) || 0;
            console.log('total',result.headers);
            
        } }
        catch (err) {
        console.error("Xatolik:", err);
        } finally {
        loading.value = false;
        }
    };
    async function fetchEmployeeById(id) {
        loading.value = true
        error.value = null
        try {
        const { data } = await axios.get(`http://localhost:3000/employees/${id}`)
        selectedEmployee.value = data
        } catch (err) {
        error.value = err.message
        } finally {
        loading.value = false
        }
    }
    return {
        fetchEmployees,
        employees,
        loading,
        total,
        fetchEmployeeById,
        selectedEmployee,
        error
    };
});
