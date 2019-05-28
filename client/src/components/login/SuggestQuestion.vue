<template>
    <div>

        <p>Send in your own idea for a question below!</p>
        <p>Question</p>
        <input v-model="questionFields.question">
        <br>
        <p>Answer</p>
        <input v-model="questionFields.answer" oninput="this.value=this.value.replace(/[^0-9]/g, '').replace(/^0/, '')">
        <br>
        <p>Source</p>
        <input v-model="questionFields.source">
        <br>
        <p>Difficulty</p>
        <select v-model="questionFields.difficulty">
            <option v-for="(difficultyOption, index) in difficultyOptions" :value="++index">
                {{ difficultyOption }}
            </option>
        </select>
        <br>
        <p>Category</p>
        <select v-model="questionFields.category">
            <option v-for="(categoryOption, index) in categoryOptions" :value="++index">
                {{ categoryOption }}
            </option>
        </select>
        <br><br>
        <button @click="suggestQuestion">Submit!</button>

        <p id="successMessage">{{successMessage}}</p>
        <p id="failMessage">{{errorMessage}}</p>
    </div>
</template>

<script>
    import axios from "axios"

    export default {

        name: "UserSendQuestionSuggestion",
        data(){
            return {
                successMessage: "",
                errorMessage: "",

                difficultyOptions: ["Easy", "Medium", "Hard"],
                categoryOptions: ["Animals", "Science", "History", "Literature", "Games", "Miscellaneous"],

                questionFields: {
                    question: "",
                    answer: "",
                    source: "",
                    difficulty: "",
                    category: "",
                }
            }
        },
        methods: {
            suggestQuestion(){
                this.successMessage = "";
                this.errorMessage = "";

                if(this.isQuestionFieldsValid()){
                    axios.post("http://localhost:5000/suggestedQuestions/", {
                        questionFields: this.questionFields
                    }, {
                        headers: {
                            Authorization: `JWT ${localStorage.getItem("token")}`
                        }
                    })
                    .then(() => {
                        this.successMessage = "Question submitted! It's now waiting for approval."
                    })
                    .catch((error) => {
                        this.errorMessage = "You already have a pending question waiting for approval. " +
                            "You can only send in one question at once";
                        console.log(error)
                    })
                }

            },
            isQuestionFieldsValid(){
                //Object.values() = returns an array of all object values
                //Array.some() = checks if any of the array values meets the criteria
                if(Object.values(this.questionFields).some(x => (x === null || x === ""))){
                    this.errorMessage = "All fields must be entered";
                    return false;
                }
                return true
            }
        }
    }
</script>

<style scoped>
    #successMessage{
        color: green;
        font-weight: bold;

    }
    #failMessage{
        color: red;
        font-weight: bold;
    }
</style>