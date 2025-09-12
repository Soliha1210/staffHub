<template>
    <!-- Header -->
    <v-row class="d-flex align-center mb-4">
    <v-col cols="8">
        <h2 class="text-h5 font-weight-bold">Employees</h2>
    </v-col>
    <v-col cols="4" class="text-right">
        <v-text-field
        v-model="search"
        label="Filter"
        prepend-inner-icon="mdi-magnify"
        clearable
        outlined
        dense
        />
    </v-col>
    </v-row>

    <!-- Table -->
    <v-data-table
    :headers="headers"
    :items="employees"
    :loading="loading"
    :items-per-page="5"
    hide-default-footer
    class="elevation-1"
    >
    
    <!-- Checkbox for Active -->
    <template v-slot:item.active="{ item }">
    <v-checkbox
        v-model="item.active"
        @change="toggleActive(item)"
        hide-details
        color="green"
    />
    </template>

    </v-data-table>

    <v-pagination
        v-model="currentPage"
        :length="Math.ceil(total / pageSize)"
        @update:modelValue="handleCurrentChange"
        class="mt-4"
    />
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import { ref, computed, onMounted } from "vue";
    import { useRouter,useRoute } from "vue-router";
    import { useEmployeeStore } from "@/stores/employees";
    import axios from "axios";
    const store = useEmployeeStore();
    const { employees, total, loading} = storeToRefs(store)
    const router = useRouter();
    const route = useRoute();
    const search = ref("");
    const currentPage = ref(parseInt(route.query.page) || 1);
    const pageSize = 100;

    const handleCurrentChange = (val) => {
        window.scrollTo(0, 0);
        currentPage.value = val;

        router.push({ 
            path: "/employees", 
            query: { page: val, limit: pageSize } 
        });

        store.fetchEmployees({
            page: val,
            limit: pageSize,
        });
    };
    onMounted(() => {
        store.fetchEmployees({ page: currentPage.value, limit: pageSize });
    });

    const headers = [
        {title:"No", key: "id"},
        { title: "Name", key: "name" },
        { title: "Surname", key: "surname" },
        { title: "Birthdate", key: "birthdate" },
        { title: "Passport", key: "passport" },
        { title: "Gender", key: "gender" },
        { title: "Status", key: "active" },
    ];

    const filteredEmployees = computed(() => {
        if (!search.value) return employees;
        return employees.filter(
            (emp) =>
            emp.name.toLowerCase().includes(search.value.toLowerCase()) ||
            emp.surname.toLowerCase().includes(search.value.toLowerCase())
        );
    });
    const toggleActive = async (employee) => {
        try {
        await axios.patch(`http://localhost:3000/employees/${employee.id}`, {
            active: employee.active,
        });
        console.log("Saved:", employee.name, employee.active);
        } catch (error) {
        console.error("Error updating active:", error);
        }
    };

</script>

<style>

</style>