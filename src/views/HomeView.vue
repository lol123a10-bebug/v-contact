<script setup lang="ts">
import { computed, ref } from "vue";
import { NCard, NGrid, NGridItem, NDynamicTags, NButton, NTag, NPopconfirm, NText, NSelect } from "naive-ui";
import { mockContacts } from "@/utils/__mock/__mock-contacts";
import { mockTags } from "@/utils/__mock/__mock-tags";

const tags = ref(mockTags);

const selectedTags = ref<string[]>([]);

const contacts = ref(mockContacts);

const filteredContacts = computed(() => {
  return contacts.value.filter((contact) => {
    if (selectedTags.value.length === 0) return true;

    return selectedTags.value.every((tag) => contact.tags.includes(tag));
  });
});
</script>

<template>
  <div class="home">
    <header class="header">
      <NButton type="info">Create</NButton>

      <NSelect
        class="header__select"
        multiple
        v-model:value="selectedTags"
        :options="tags"
        filterable
        max-tag-count="responsive"
      />
    </header>

    <main>
      <NGrid x-gap="12" y-gap="12" cols="1 s:2 l:3 xl:4" responsive="screen">
        <NGridItem v-for="(contact, index) in filteredContacts" :key="contact.id">
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
                  :show-icon="false"
                  @positive-click="
                    () => {
                      contacts.splice(index, 1);
                    }
                  "
                  :positive-button-props="{ type: 'error' }"
                  :negative-button-props="{ type: 'info', secondary: true }"
                >
                  <template #trigger>
                    <NButton class="contact__action-btn" strong secondary type="error">Delete</NButton>
                  </template>

                  <NText strong>Are you sure?</NText>
                </NPopconfirm>
              </div>
            </template>
          </NCard>
        </NGridItem>
      </NGrid>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: 0.5rem;
}

.header {
  padding: 0.5rem 0;

  display: flex;
  gap: 0.5rem;

  & button {
    padding: 0 1rem;
  }

  &__select {
    width: 15rem;
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
