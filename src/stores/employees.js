import { defineStore } from "pinia";
import axios from "axios";
import { ref } from 'vue'

export const useEmployeeStore = defineStore("employees", () => {
    const employees = ref([])
    const total = ref(0);
    const loading = ref(false);

    const fetchEmployees = async (params = {}) => {
        try {
        loading.value = true;
        const result = await axios.get("http://localhost:3000/employees", {
            params: {
            _page: params.page || 1,
            _limit: params.limit || 10,
            },
        });

        if (result.status === 200) {
            employees.value = result.data;
            total.value = parseInt(result.headers["x-total-count"], 10) || 0;
        }
        } catch (err) {
        console.error("Xatolik:", err);
        } finally {
        loading.value = false;
        }
    };
    return{
        fetchEmployees,employees,
        loading, total
    }
});