<template>
    <tr>
        <el v-for="(cell, i) in children"
            :key="i"
            :element="cell"
            :payload="(i + 1) == children.length" />
    </tr>
</template>
<script>
export default {

    props: [
        'id',
        'children'
    ],
    
}
</script>