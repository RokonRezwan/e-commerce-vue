<template>
  <b-card>
    <div class="overflow-auto py-2">
      <!-- Use text in props -->
      <b-pagination
        v-model="ex1CurrentPage"
        :total-rows="ex1Rows"
        :per-page="ex1PerPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
      ></b-pagination>
      Current page : {{ ex1CurrentPage }}
    </div>
  </b-card>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'

  const ex1CurrentPage = ref(1)
  const ex1PerPage = ref(10)
  const ex1Rows = ref(100)
</script>