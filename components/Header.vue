<script setup lang="ts"></script>

<template>
    <header class="Header">
        <img class="Header__Logo" src="assets/logo.png" alt="Logo" />
        <nav class="Header__Nav">
            <NuxtLink to="/" class="Header__Link">Home</NuxtLink>
            <NuxtLink to="/about" class="Header__Link">About</NuxtLink>
        </nav>
    </header>
</template>

<style scoped lang="scss">
.Header {
    background-color: #f0f0f0;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__Nav {
        display: flex;
        gap: 10px;
    }

    &__Link {
        text-decoration: none;
        color: #333;
        padding: 5px 10px;
        transition: color 0.3s, background-color 0.3s;

        &:hover {
            color: #fff;
            background-color: #007bff;
        }

        &--active {
            color: #007bff;
        }
    }
}
</style>
