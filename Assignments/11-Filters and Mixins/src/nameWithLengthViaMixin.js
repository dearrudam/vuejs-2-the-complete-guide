export const nameWithLengthViaMixin = {
    computed: {
        nameWithLengthViaMixin() {
            return `${this.myName} (${this.myName.length})`;
        }
    }
}