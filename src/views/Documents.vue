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
        >
        <template #item.actions="{ item }">
            <RouterLink :to="{ name: 'DocumentDetail', params: { id: item.id } }" class="me-2">
                <VBtn icon size="small" :title="`View ${item.name}`" aria-label="View details">
                <VIcon icon="mdi-eye" />
                </VBtn>
            </RouterLink>
            </template>
        </v-data-table>

        <div class="d-flex align-center justify-space-between mt-4">
            <div>Total: {{ total }}</div>
            <VPagination
            v-model="currentPage"
            :length="pages"
            :total-visible="7"
            @update:model-value="handleCurrentChange"
            />
        </div>
    </v-container>
    </template>

    <script setup>
    import { ref, onMounted,computed } from "vue";
    import { storeToRefs } from "pinia";
    import { useDocumentStore } from "@/stores/documents";
    import axios from "axios";

    const store = useDocumentStore();
    const { documents, total, loading } = storeToRefs(store);

    const currentPage = ref(1);
    const pageSize = ref(5);

    const headers = [
    { title: "No", key: "id" },
    { title: "Document type", key: "type" },
    { title: "Number", key: "number" },
    { title: "Date", key: "date" },
    { title: "Description", key: "description" },
    { title: "Invoice type", key: "invoiceType" },
    { title: "Attorney fullname", key: "attorneyFullName" },
    { title: 'Actions', value: 'actions', align: 'center' }
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
        store.fetchDocuments({ page: currentPage.value, limit: pageSize.value });
    };

    const handleCurrentChange = (val) => {
        currentPage.value = val;
        store.fetchDocuments({ page: val, limit: pageSize.value });
    };
    const pages = computed(() => {
        if (!total.value || !pageSize.value) return 1
        return Math.max(1, Math.ceil(total.value / pageSize.value))
    })
    onMounted(() => {
        fetchEmployees();
        store.fetchDocuments({ page: currentPage.value, limit: pageSize.value });
    });
</script>

<style>

</style>