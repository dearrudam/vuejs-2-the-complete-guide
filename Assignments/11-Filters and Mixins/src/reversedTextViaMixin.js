export const reversedTextViaMixin = {
    computed: {
        reversedTextViaMixin(){
            return this.someText.split("").reverse().join("");
        }
    }
}