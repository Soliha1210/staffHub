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

    const fetchDocuments = async (params) => {
        try {
        loading.value = true;
        params
        if (employeeId.value) {
            params.employeeId = employeeId.value;
        }

        const result = await axios.get("https://staffhub-j4zy.onrender.com/documents", {
            params,
        });

        if (result.status === 200) {
            documents.value = result.data;
            const headerTotal = result.headers["x-total-count"];

            if (headerTotal) {
            total.value = parseInt(headerTotal, 10);
            } else {
            const all = await axios.get("https://staffhub-j4zy.onrender.com/documents", {
                params: employeeId.value ? { employeeId: employeeId.value } : {},
            });
            total.value = all.data.length;
            }
        }
        } catch (err) {
        console.error("Error fetching documents:", err);
        error.value = err.message;
        } finally {
        loading.value = false;
        }
    };

    const fetchDocumentById = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await axios.get(`https://staffhub-j4zy.onrender.com/documents/${id}`);
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