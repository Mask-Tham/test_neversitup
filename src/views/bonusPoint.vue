<template>
  <div></div>
</template>

<script>
export default {
    data() {
        return {
            arr1:[1,5,48,6,8,7,8,8,5,45,6,7,5,31,9],
            arr2:[1,3,5]
        }
    },
    mounted() {
       let new_arr = this.fillet(this.arr1,this.arr2)
       console.log(new_arr);
    },
    methods:{
        fillet(arr1,arr2){
            let arr = arr1.filter(e => arr2.includes(e))
            console.log(arr);
            return arr
        }
    },
}
</script>

<style>

</style>