<template>
    <v-btn variant="tonal" prepend-icon="mdi-arrow-left" @click="$router.back()" class="mb-4">
    Back
    </v-btn>
    
    <v-card v-if="employee" class="pl-5 pt-5 pb-5" max-width="100%" elevation="4">
    <div class="d-flex">
        <v-img
            :src="employee.photo || 'https://via.placeholder.com/600x300.png?text=No+Photo'"
            height="350"
            width="300"
            cover>
        </v-img>
        <div>
            <v-card-title class="text-h5">
                {{ employee.name }} {{ employee.surname }}
            </v-card-title>

            <v-card-subtitle class="mb-2">
                {{ employee.gender }} • {{ employee.birthdate }}
            </v-card-subtitle>

            <v-card-text class="d-flex flex-column ga-2">
                <p><strong>Passport:</strong> {{ employee.passport }}</p>
                <p><strong class="mr-2">Status:</strong> 
                <v-chip :color="employee.active ? 'green' : 'red'" variant="flat">
                    {{ employee.active ? 'Active' : 'Inactive' }}
                </v-chip>
                </p>
                <p><strong>Position:</strong> {{employee.position}}</p>
            </v-card-text>
                <p class="mt-4 ml-4"><strong>Description:</strong></p>
            <p class="ml-4">{{ employee.description || 'Not information.' }}</p>
        </div>
    </div>

    
    </v-card>

    <div v-else-if="loading" class="text-center mt-10">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else-if="error" class="text-red mt-4">
    Error: {{ error }}
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { storeToRefs } from 'pinia'
    import { useEmployeeStore } from '@/stores/employees'

    const route = useRoute()
    const store = useEmployeeStore()
    const { selectedEmployee: employee, loading, error } = storeToRefs(store)

    onMounted(() => {
        store.fetchEmployeeById(route.params.id)
    })
</script>

<style>

</style>