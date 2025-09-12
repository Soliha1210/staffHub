<template>
<v-app>
    <!-- Header -->
    <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>StaffHub</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app>
    <v-list>
        <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.to"
            link
            class="list-item"
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <!-- Content -->
    <v-main>
    <v-container>
        <router-view />
    </v-container>
    </v-main>
</v-app>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(true);

const menuItems = [
    { title: "Dashboard", icon: "mdi-view-dashboard", to: "/" },
    { title: "Employees", icon: "mdi-account-group", to: "/employees" },
    { title: "Documents", icon: "mdi-file-document", to: "/documents" },
    { title: "Settings", icon: "mdi-cog", to: "/settings" },
];
</script>

<style lang="scss">
    .v-list-item__content{
        display: flex;
        align-items: center;
        gap: 8px;
    }
</style>