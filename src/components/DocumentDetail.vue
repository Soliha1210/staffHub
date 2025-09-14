<template>
    <v-btn color="primary" variant="tonal"      prepend-icon="mdi-arrow-left" @click="$router.back()" class="mb-4">
        Back
    </v-btn>
    <v-card class="pa-4">
        <v-card-text v-if="document">
            <v-list dense>
            <v-list-item>
                <v-list-item-title><strong>Type:</strong> {{ document.type }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title><strong>Number:</strong> {{ document.number }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title><strong>Date:</strong> {{ document.date }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title><strong>Description:</strong> {{ document.description }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title><strong>Invoice type:</strong> {{ document.invoiceType }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title><strong>Attorney fullname:</strong> {{ document.attorneyFullName }}</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-card-text>

        <div v-else-if="loading" class="text-center mt-10">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <div v-else-if="error" class="text-red mt-4">
        Error: {{ error }}
        </div>
    </v-card>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { storeToRefs } from 'pinia'
    import { useDocumentStore } from '@/stores/documents'

     const route = useRoute()
    const store = useDocumentStore()
    const { selectedDocument: document, loading, error } = storeToRefs(store)

    onMounted(() => {
        store.fetchDocumentById(route.params.id)
    })
</script>

<style>

</style>