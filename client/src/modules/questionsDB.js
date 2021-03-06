import axios from 'axios';

let questions = [];

function setQuestions(questionsFromDB) {
    questions = questionsFromDB;
}

async function loadQuestions(settings) {
    const response = await axios.get(
        `http://localhost:5000/questions/${settings.amount}/${settings.difficulty}/${settings.category}`
    );

    return new Promise( (resolve) => {
        setQuestions(response.data);
        resolve();
    })

}

export default {

    async getQuestions(settings) {
        return new Promise( (resolve) =>{

            // if(true) {

                loadQuestions(settings).then( () => { resolve(questions); })

            // } else { resolve(questions); }

        })

    },

}
