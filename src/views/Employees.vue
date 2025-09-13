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
    <VDataTable
    :headers="headers"
    :items="filteredEmployees"
    :loading="loading"
    :items-per-page="pageSize"
    hide-default-footer
    class="elevation-1"
  >
    <!-- Active checkbox column (siz berdingiz) -->
    <template #item.active="{ item }">
      <VCheckbox
        v-model="item.active"
        @change="toggleActive(item)"
        hide-details
        color="green"
      />
    </template>

    <!-- ACTIONS column: view icon -->
    <template #item.actions="{ item }">
      <RouterLink :to="{ name: 'EmployeeDetail', params: { id: item.id } }" class="me-2">
        <VBtn icon size="small" :title="`View ${item.name}`" aria-label="View details">
          <VIcon icon="mdi-eye" />
        </VBtn>
      </RouterLink>
    </template>
  </VDataTable>

  <!-- Footer: total va pagination -->
  <div class="d-flex align-center justify-space-between mt-4">
    <div>Jami: {{ total }}</div>
    <VPagination
      v-model="currentPage"
      :length="pages"
      :total-visible="7"
      @update:model-value="handleCurrentChange"
    />
  </div>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { ref, computed, onMounted } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { useEmployeeStore } from "@/stores/employees";
    import axios from "axios";

    const store = useEmployeeStore();
    const { employees, total, loading } = storeToRefs(store);

    const router = useRouter();
    const route = useRoute();

    const search = ref("");
    const currentPage = ref(1);
    const pageSize =ref(5);

    const pages = computed(() => {
        if (!total.value || !pageSize.value) return 1
        return Math.max(1, Math.ceil(total.value / pageSize.value))
    })
    // const handleCurrentChange = (val) => {
    //     window.scrollTo(0, 0);
    //     currentPage.value = val;

    //     router.push({
    //         path: "/employees",
    //         query: { page: val, limit: pageSize }
    //     });

    //     store.fetchEmployees({
    //         _page: val,
    //         _limit: pageSize
    //     });
    //     };
    const handleCurrentChange = (val) => {
        currentPage.value = val;
        store.fetchEmployees({ page: val, limit: pageSize.value });
    };
        onMounted(() => {
            store.fetchEmployees({ page: currentPage.value, limit: pageSize.value });
        });

        const headers = [
            { title: "No", key: "id" },
            { title: "Name", key: "name" },
            { title: "Surname", key: "surname" },
            { title: "Birthdate", key: "birthdate" },
            { title: "Passport", key: "passport" },
            { title: "Gender", key: "gender" },
            { title: "Status", key: "active" },
            { title: 'Actions', value: 'actions', align: 'center' }
        ];

        const filteredEmployees = computed(() => {
        if (!search.value) return employees.value;
        return employees.value.filter(
            (emp) =>
            emp.name.toLowerCase().includes(search.value.toLowerCase()) ||
            emp.surname.toLowerCase().includes(search.value.toLowerCase())
        );
        });

        // active toggle
        const toggleActive = async (employee) => {
        try {
            await axios.patch(`http://localhost:3000/employees/${employee.id}`, {
            active: employee.active
            });
            console.log("Saved:", employee.name, employee.active);
        } catch (error) {
            console.error("Error updating active:", error);
        }
    };
</script>
<style>

</style>