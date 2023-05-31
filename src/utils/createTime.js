/**
* 获取当前时间
*/
export default {
    currentTime() {
        var date = new Date();
        var year = date.getFullYear(); //月份从0~11，所以加一
        var dateArr = [
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        ];
        //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
        for (var i = 0; i < dateArr.length; i++) {
            if (dateArr[i] >= 1 && dateArr[i] <= 9) {
                dateArr[i] = "0" + dateArr[i];
            }
        }
        var strDate =
            year +
            "-" +
            dateArr[0] +
            "-" +
            dateArr[1] +
            " " +
            dateArr[2] +
            ":" +
            dateArr[3] +
            ":" +
            dateArr[4];
        //此处可以拿外部的变量接收  strDate:2022-05-01 13:25:30
        //this.date = strDate;
        // console.log("strDate", strDate);
        return strDate;
    }
}