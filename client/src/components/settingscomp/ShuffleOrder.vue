<template>
    <div>

        Shuffle start order
        <input type="checkbox"
               value="1"
               :checked="checked"
               @change="change"
        />
    </div>

</template>

<script>
    export default {
        name: "ShuffleOrder",
        data: function() {
            return {
                checked: this.value
            };
        },
        props: ['value'],

        methods: {
            change: function() {
                this.checked = !this.checked;
                this.$emit('shuffle', this.checked);
            }
        }
    }
</script>

<style scoped>

</style>
