<template>
  <div class="home">
    <fib />
  </div>
</template>

<script>
// @ is an alias to /src
import Fib from '@/components/Fib'

export default {
  name: 'Home',
  components: {
    Fib
  }
}
</script>
