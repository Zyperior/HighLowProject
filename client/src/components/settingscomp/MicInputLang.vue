<template>
    <div class="selectDiv">
        <p>Microphone Input Language:</p>
        <select @change="onChange($event)" v-model="language">
            <option v-for="languageOption in languageOptions" :value="languageOption.value">
                {{languageOption.label}}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "MicInputLang",
        data(){
            return{
                languageOptions: [
                    {label: "Swedish", value: "sv-SE"},
                    {label: "English", value: "en-US"},
                    {label: "Norwegian", value: "no-NO"}
                ],
                language: "sv-SE"
            }
        },
        methods:{
            onChange(event){
                this.$emit('changeMicLanguage', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
