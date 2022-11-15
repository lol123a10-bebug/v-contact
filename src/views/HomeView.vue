<script setup lang="ts">
import { ref } from "vue";
import { NCard, NGrid, NGridItem, NDynamicTags, NButton, NTag, NPopconfirm } from "naive-ui";
import { mockContacts } from "@/utils/__mock/__mock-contacts";

const tags = ref<string[]>([]);

const contacts = ref(mockContacts);
</script>

<template>
  <header>
    <NButton type="info">Create</NButton>
  </header>

  <main>
    <NGrid x-gap="12" y-gap="12" cols="1 s:2 l:3 xl:4" responsive="screen">
      <NGridItem v-for="(contact, index) in contacts" :key="contact.id">
        <NCard :content-style="{ display: 'grid', gap: '.5rem' }">
          <div>
            <NTag>
              {{ contact.fullName }}
            </NTag>
          </div>

          <div>
            <NTag type="info">
              {{ contact.phone }}
            </NTag>
          </div>

          <div>
            <NTag type="info">
              {{ contact.email }}
            </NTag>
          </div>

          <div class="contact__tags">
            <NDynamicTags type="info" v-model:value="contact.tags" />
          </div>

          <template #action>
            <div class="contact__actions">
              <NButton class="contact__action-btn" strong secondary type="warning">Edit</NButton>

              <NPopconfirm
                @positive-click="
                  () => {
                    contacts.splice(index, 1);
                  }
                "
              >
                <template #trigger>
                  <NButton class="contact__action-btn" strong secondary type="error">Delete</NButton>
                </template>
              </NPopconfirm>
            </div>
          </template>
        </NCard>
      </NGridItem>
    </NGrid>
  </main>
</template>

<style scoped lang="scss">
header {
  padding: 0.5rem 0.5rem;

  & button {
    padding: 0 1rem;
  }
}

.contact {
  &__tags {
    display: flex;
    gap: 0.5rem;
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }

  &__action-btn {
    min-width: 4rem;
  }
}
</style>
