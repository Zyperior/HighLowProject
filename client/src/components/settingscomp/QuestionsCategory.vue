<template>
    <div class="selectDiv">
        <select @change="onChange($event)" v-model="category">
            <option v-for="categoryOption in categoryOptions" :value="categoryOption.value">
                {{ categoryOption.name }}
            </option>
        </select>
    </div>
</template>

<script>
    import {getCurrentSettings} from '../../modules/settingsData'

    export default {
        name: "QuestionsCategory",
        data(){
            return{
                categoryOptions: [
                    {name: "Mixed", value: 0},
                    {name: "Animals", value: 1},
                    {name: "Science", value: 2},
                    {name: "History", value: 3},
                    {name: "Literature", value: 4},
                    {name: "Games", value: 5},
                    {name: "Miscellaneous", value:6}
                ],
                category: getCurrentSettings().questions.category
            }
        },
        methods:{
            onChange(event){
                this.$emit('changeCategory', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
