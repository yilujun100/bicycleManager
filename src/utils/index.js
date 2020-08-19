export default {
    formatDate(timestamp) {
        if (!timestamp) return '';
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = this.toDouble(date.getMonth() + 1);
        let day = this.toDouble(date.getDate());
        let hour = this.toDouble(date.getHours());
        let minute = this.toDouble(date.getMinutes());
        let second = this.toDouble(date.getSeconds());
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },

    toDouble(str) {
        return str < 10 ? '0' + str : str;
    }
};