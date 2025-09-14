import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useDocumentStore = defineStore("documents", () => {
    const documents = ref([]);
    const total = ref(0);
    const loading = ref(false);
    const selectedDocument = ref(null);
    const error = ref(null);
    const employeeId = ref(null); // filter uchun

    const fetchDocuments = async ({ page = 1, limit = 10 } = {}) => {
        try {
        loading.value = true;
        const result = await axios.get("http://localhost:3000/documents", {
            params: {
            _page: page,
            _limit: limit,
            ...(employeeId.value ? { employeeId: employeeId.value } : {}),
            },
        });

        if (result.status === 200) {
            documents.value = result.data;
            total.value = parseInt(result.headers["x-total-count"], 10) || 0;
        }
        } catch (err) {
        console.error("Error:", err);
        error.value = err.message;
        } finally {
        loading.value = false;
        }
    };

    const fetchDocumentById = async (id) => {
        loading.value = true;
        error.value = null;
        try {
        const { data } = await axios.get(`http://localhost:3000/documents/${id}`);
        selectedDocument.value = data;
        } catch (err) {
        error.value = err.message;
        } finally {
        loading.value = false;
        }
    };

    return {
        documents,
        total,
        loading,
        selectedDocument,
        error,
        employeeId,
        fetchDocuments,
        fetchDocumentById,
    };
});