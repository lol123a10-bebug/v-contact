<script lang="ts" setup>
import type { TContactCreate } from "@/utils/models/contact";
import { NButton, NDynamicTags, NForm, NFormItem, NInput, type FormInst } from "naive-ui";
import { ref, watch } from "vue";

const rules = {
  fullName: {
    required: true,
    min: 2,
    message: "Заполните поле",
  },

  phone: {
    required: true,
    min: 2,
    message: "Заполните поле",
  },

  email: {
    required: true,
    min: 2,
    message: "Заполните поле",
  },
};

const formRef = ref<FormInst | null>(null);

const model = ref<TContactCreate>({
  fullName: "",
  phone: "",
  email: "",
  tags: [],
});

const handleSubmit = () => {
  formRef.value?.validate((error) => {
    if (error) {
      console.log(error);
    }
  });

  console.log("submit");
};

watch([model.value], () => {
  formRef.value?.restoreValidation();
});
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules">
    <NFormItem label="ФИО" path="fullName">
      <NInput v-model:value="model.fullName" />
    </NFormItem>
    <NFormItem label="Сотовый" path="phone">
      <NInput v-model:value="model.phone" />
    </NFormItem>
    <NFormItem label="E-Mail" path="email">
      <NInput v-model:value="model.email" />
    </NFormItem>
    <NFormItem label="Теги" path="tags">
      <NDynamicTags v-model:value="model.tags" />
    </NFormItem>

    <NButton class="form__submit" @click="handleSubmit" type="info">Сохранить</NButton>
  </NForm>
</template>

<style scoped lang="scss">
.form {
  &__submit {
    padding: 0 1rem;
  }
}
</style>
