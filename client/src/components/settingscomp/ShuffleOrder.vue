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
    import {getCurrentSettings} from '../../modules/settingsData'

    export default {
        name: "ShuffleOrder",
        data: function() {
            return {
                checked: getCurrentSettings().shufflePlayers
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
