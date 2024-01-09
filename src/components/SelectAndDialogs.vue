<template>
  <div class="select-dialogs">
    <v-select
        :label="`Имя ${name}`"
        item-title="name"
        item-value="id"
        variant="underlined"
        color="#555555"
        :rules="[requiredField]"
        :items="items"
        :model-value="props.value"
        @update:model-value="emit('change', $event)"
    >
    </v-select>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <v-btn variant="tonal"
             size="small"
             @click="isNewDialogOpened = true"
      >Добавить {{ props.name }}
      </v-btn>
      <v-btn variant="tonal"
             size="small"
             @click="isDeleteDialogOpened = true"
      >Удалить {{ props.name }}
      </v-btn>
    </div>
    <v-dialog width="500" v-model="isNewDialogOpened">
      <v-card>
        <v-card-text class="d-flex align-center">
          <v-text-field label="Название" v-model="newName" variant="underlined"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Готово" @click="sendItemToInsert"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="500" v-model="isDeleteDialogOpened">
      <v-card class="pa-5">
        <v-card-title>Выберите {{ props.name }} для удаления</v-card-title>
        <v-list>
          <template v-for="item in props.items"
                    :key="item.id"
          >
            <v-list-item
              :value="item.id"
              v-text="item.name"
              style="cursor: pointer"
              color="grey"
              @click="setItemToDelete(item)"
            ></v-list-item>
          </template>
        </v-list>
        <v-btn class="ml-auto" variant="tonal" width="fit-content"
               @click="deleteItem">Удалить {{ itemToDelete }}
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IBrand } from "@/types/subjectBrand";
import { ICurrency } from "@/types/currency";

const props = withDefaults(defineProps<{
  name: string,
  value: string,
  items: Array<{ id: number, name: string }>,
  deleteFunction: Function,
  insertFunction: Function,
}>(), {
  name: "undefined",
  items: () => [],
  deleteFunction: () => {
  },
  insertFunction: () => {
  },
})

const emit = defineEmits(['updateItems', 'change'])

const newName = ref("")
const itemIdToDelete = ref()
const itemToDelete = ref("")
const isNewDialogOpened = ref(false)
const isDeleteDialogOpened = ref(false)

const requiredField = (v: string) => {
  return !!v || 'Заполните поле'
}

const sendItemToInsert = async () => {
  if (newName.value) {
    await props.insertFunction(newName.value)
    isNewDialogOpened.value = false
    newName.value = ""
    emit('updateItems')
  }
}

const setItemToDelete = (item: IBrand | ICurrency) => {
  itemToDelete.value = item.name
  itemIdToDelete.value = item.id
}

const deleteItem = async () => {
  await props.deleteFunction(itemIdToDelete.value)
  itemToDelete.value = ""
  itemIdToDelete.value = null
  emit('updateItems')
}
</script>

<style scoped lang="sass">
.select-dialogs
  gap: 20px
  display: flex
  margin: 20px 0
</style>
