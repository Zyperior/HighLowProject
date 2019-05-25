
let currentSettings = {
    questions: {
        amount: 3,
        category: 0,
        difficulty: 0
    },
    playerAmount: 1,
    botCommentary: true,
    shufflePlayers: true,
    micInputLanguage: 'sv-SE',
};

export default {
    //Setters:
    setQuestionsAmount(value) { currentSettings.questions.amount = value },
    setQuestionsCategory(value) { currentSettings.questions.category = value },
    setQuestionsDifficulty(value) { currentSettings.questions.difficulty = value },
    setPlayerAmount(value) { currentSettings.playerAmount = value },
    setBotCommentary(value) {  currentSettings.botCommentary = value },
    setShufflePlayers(value) { currentSettings.shufflePlayers = value },
    setMicInputLanguage(value) { currentSettings.micInputLanguage = value },

}

//Getter:
export function getCurrentSettings(){
    return currentSettings
}
