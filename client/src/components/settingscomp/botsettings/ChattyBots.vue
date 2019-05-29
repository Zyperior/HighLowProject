<template>
    <div>

        <input type="checkbox"
               value="1"
               :checked="checked"
               @change="change"
        />
    </div>
</template>

<script>
    export default {
        name: "ChattyBots",
        data: function() {
            return {
                checked: this.value
            };
        },
        props: ['value'],

        methods: {
            change: function() {
                this.checked = !this.checked;
                this.$emit('botComment', this.checked);
            }
        }
    }
</script>

<style scoped>

</style>
