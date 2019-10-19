#!/bin/bash

if [ $# -eq 0 ]; then 
  echo Usage: $0 '<container_name>'
fi

[ ! -d $1 ] && mkdir $1

cat > $1/$1.js <<EOF
import __DEPENDENCY__ from 'components/$1/$1.vue'

export default {
  name: '$1',
  data: function () {
    return {
    }
  },
  methods: {
  },
  components: {
    __DEPENDENCY__
  },
  computed: {
  }
}
EOF

cat > $1/$1.vue <<EOF
<style src="./$1.css"></style>
<script src="./$1.js"></script>
<template>
    <div class="$1-root">
      Data of $1.
    </div>
</template>
EOF

cat > $1/$1.css <<EOF
.$1-root {

}
EOF

