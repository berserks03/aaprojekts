<script setup lang="ts">
const { data: itemData } = await useFetch('/api/data');

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(5);
const itemsPerPageOptions = ref([5, 10, 15, 20]);

const filteredData = computed((): Item[] => {
    let filtered = (itemData.value ?? []).filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );

    return filtered;
});

const slicedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;

    return filteredData.value.slice(start, start + itemsPerPage.value);
})

const totalPages = computed((): number =>
    Math.ceil((filteredData.value?.length ?? 0) / itemsPerPage.value)
);

const deleteItem = (index: number) => {
    itemData.value?.splice(index, 1);
};

const saveData = async () =>
    await useFetch('/api/data', { method: 'post', body: itemData });

const addItem = () =>
    itemData.value?.push({ name: 'New', email: 'New@example.com' });

const previousPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

watch(itemsPerPage, () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
    }
});
</script>

<template>
    <div class="Table">
        <div class="Controls">
            <label for="itemsPerPage">
                Ierakstu skaits lapā:
                <select id="itemsPerPage" v-model="itemsPerPage">
                    <option
                        v-for="option in itemsPerPageOptions"
                        :key="option"
                        :value="option"
                    >
                        {{ option }}
                    </option>
                </select>
            </label>
            <input type="text" v-model="searchQuery" placeholder="Meklēt..." />
        </div>
        <table>
            <thead>
                <tr>
                    <th>Vārds</th>
                    <th>E-pasts</th>
                    <th>Darbības</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in slicedData" :key="index">
                    <td>
                        <input
                            type="text"
                            v-model="item.name"
                            @blur="saveData()"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="item.email"
                            @blur="saveData()"
                        />
                    </td>
                    <td>
                        <button @click="deleteItem(index)">Dzēst ierakstu</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class='Controls'>
            <button @click="addItem()" class="AddButton">Pievienot ierakstu</button>
            <button @click="saveData()">Saglabāt visu</button>

        </div>
        <div class="Pagination">
            <button @click="previousPage" :disabled="currentPage === 1">
                Iepriekšējais
            </button>
            <span>{{ currentPage }} no {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">
                Nākošais
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.Table {
    margin: 20px;
    border: 1px solid #ccc;
    padding: 10px;

    .Controls {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        label {
            margin-right: 10px;
        }

        input {
            margin-left: auto;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
            border: 1px solid #ccc;
            padding: 8px;
        }

        th {
            background-color: #f0f0f0;
        }

        td {
            text-align: center;
        }

        tr {
            &:nth-child(even) {
                background-color: #f9f9f9;
            }

            &:hover {
                background-color: #007bff;

                input {
                    color: white;
                }
            }
        }

        input {
            border: none;
            background-color: transparent;

            &:focus {
                border-width: 2px;
            }
        }
    }

    .AddButton {
        margin-top: 10px;
    }

    .Pagination {
        margin-top: 10px;
        text-align: center;

        button {
            margin: 0 5px;
        }

        span {
            margin: 0 5px;
        }
    }
}
</style>
