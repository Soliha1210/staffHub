<template>
    <v-container>
        <v-row class="d-flex align-center mb-4">
        <v-col cols="8">
            <h2 class="text-h5 font-weight-bold">Documents</h2>
        </v-col>
        <v-col cols="4" class="text-right">
            <v-select
            v-model="selectedEmployee"
            :items="employees"
            item-title="fullName"
            item-value="id"
            label="Employee"
            clearable
            @update:model-value="filterByEmployee"
            />
        </v-col>
        </v-row>

        <v-data-table
        :headers="headers"
        :items="documents"
        :loading="loading"
        :items-per-page="pageSize"
        hide-default-footer
        class="elevation-1"
        />

        <v-pagination
        v-model="currentPage"
        :length="Math.ceil(total / pageSize)"
        :total-visible="7"
        @update:model-value="changePage"
        class="mt-4"
        />
    </v-container>
    </template>

    <script setup>
    import { ref, onMounted } from "vue";
    import { storeToRefs } from "pinia";
    import { useDocumentStore } from "@/stores/documents";
    import axios from "axios";

    const store = useDocumentStore();
    const { documents, total, loading } = storeToRefs(store);

    const currentPage = ref(1);
    const pageSize = 10;

    const headers = [
    { title: "No", key: "id" },
    { title: "Document type", key: "type" },
    { title: "Number", key: "number" },
    { title: "Date", key: "date" },
    { title: "Description", key: "description" },
    { title: "Invoice type", key: "invoiceType" },
    { title: "Attorney fullname", key: "attorneyFullName" },
    ];

    const employees = ref([]);
    const selectedEmployee = ref(null);

    const fetchEmployees = async () => {
        const res = await axios.get("http://localhost:3000/employees");
        employees.value = res.data.map((e) => ({
            id: e.id,
            fullName: `${e.name} ${e.surname}`,
        }));
    };

    const filterByEmployee = () => {
        store.employeeId = selectedEmployee.value;
        currentPage.value = 1;
        store.fetchDocuments({ page: currentPage.value, limit: pageSize });
    };

    const changePage = (val) => {
        currentPage.value = val;
        store.fetchDocuments({ page: val, limit: pageSize });
    };

    onMounted(() => {
        fetchEmployees();
        store.fetchDocuments({ page: currentPage.value, limit: pageSize });
    });
</script>

<style>

</style>