<template>
    <div>
        <p >Only logged in admins can see this!</p>
        <br>
        <button @click="fetchAllPendingQuestions">Fetch all pending questions</button>
        <ul>
            <li v-for="(pendingQuestion, index) in pendingQuestions">
                <hr v-show="index === 0">
                <h4>Suggested by:</h4>
                <p>{{ pendingQuestion.suggestedBy }}</p>
                <h4>Question:</h4>
                <p>{{ pendingQuestion.question }}</p>
                <h4>Answer:</h4>
                <p>{{ pendingQuestion.answer }}</p>
                <h4>Source:</h4>
                <p>{{ pendingQuestion.source }}</p>
                <h4>Difficulty</h4>
                <p>{{ pendingQuestion.difficulty }}</p>
                <h4>Category</h4>
                <p>{{ pendingQuestion.category }}</p>

                <h3 id="admin">Accept or deny question</h3>
                <select v-model="pendingQuestions[index].acceptOrDeny">
                    <option v-for="acceptOrDenyOption in acceptOrDenyOptions">
                        {{ acceptOrDenyOption }}
                    </option>
                </select>
                <br><br>
                <hr>
            </li>
        </ul>

        <button @click="acceptOrDenyPendingQuestions" v-show="pendingQuestions.length !== 0">Submit</button>

    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "AdminPage",
        data(){
            return{
                pendingQuestions: [],
                acceptOrDenyOptions: ["Remain pending", "Accept", "Deny"],
            }
        },
        methods: {
            fetchAllPendingQuestions(){
                axios.get("http://localhost:5000/users/suggested-questions", {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`
                    }
                })
                .then((response) => {
                    this.pendingQuestions = response.data;
                    this.pendingQuestions.forEach(pendingQuestion => {
                        pendingQuestion.acceptOrDeny = "Remain pending"
                    })
                     console.log(this.pendingQuestions)
                })
                .catch((error) => {
                    console.log(error)
                })
            },

            acceptOrDenyPendingQuestions(){
                const acceptedQuestions =
                    this.pendingQuestions.filter(pendingQuestion => pendingQuestion.acceptOrDeny === "Accept");
                const deniedQuestions =
                    this.pendingQuestions.filter(pendingQuestion => pendingQuestion.acceptOrDeny === "Deny");

                this.deletePendingQuestions(deniedQuestions);
                this.deletePendingQuestions(acceptedQuestions);
                this.addPendingQuestionsToUsedQuestions(acceptedQuestions);
            },

            addPendingQuestionsToUsedQuestions(questionArray){
                axios.post("http://localhost:5000/users/add-pending-questions-to-used-questions", {
                    questionsToAdd: questionArray
                }, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`
                    }
                })
                .then()
                .catch()
            },

            deletePendingQuestions(questionArray){
                axios.delete("http://localhost:5000/users/delete-pending-questions", {
                    questionsToDelete: questionArray
                }, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`
                    }
                })
                .then()
                .catch()
            }
        }

    }
</script>

<style scoped>
    ul{
        padding: 0;
    }
    hr{
        width: 60%;
        margin: auto;
    }
    #admin{
        color: #cd5a50;

    }



</style>