function scheduleHtmlParser(outerIframeContent) {

    let td = $('table .fc-content-skeleton table td')

    let courseTable = []

    for (let i = 1; i < td.length; i++) {
        let a = $(td[i]).find('a')
        for (let j = 0; j < a.length; j++) {
            let aText = $($(td[i]).find('a')[j]).attr('lay-tips')
            let day = Select(aText, '星期')
            let name = (Select(aText, '课程')).split(']')[1]
            let position = Select(aText, '教学场地')
            let sections = Sections(Select(aText, '节次'))
            let teacher = Select(aText, '授课教师')
            let weeks = Week(Select(aText, '上课周次'))

            let courseObj = {}

            courseObj.name = name
            courseObj.position = position
            courseObj.teacher = teacher
            courseObj.weeks = weeks
            courseObj.day = Number(day)
            courseObj.sections = sections

            courseTable.push(courseObj);

        }
    }
    return courseTable;
}


function Select(aText, str) {
    return $(aText).find('th:contains("' + str + '")').next('td').text()
}


// 处理节次 第01-02节 返回数字类型数组
function Sections(str) {
    let matches = str.match(/(\d+)-(\d+)/);

    if (matches && matches.length >= 3) {
        let start = parseInt(matches[1]);
        let end = parseInt(matches[2]);
        let result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }

        return result
    }
}



// 处理周次
function Week(str) {

    // str = '7,7-8,8-9,9-10,10-16,30-25,1,2,4'
    str = str.split(',')
    strArr = []
    for (let i = 0; i < str.length; i++) {
        if ((str[i]).includes('-')) {
            let temp = (str[i].split('-')).map(Number)
            if (temp[0] <= temp[1]) {
                for (let j = temp[0]; j <= temp[1]; j++) {
                    strArr.push(j)
                }
            }else{
                for (let j = temp[1]; j <= temp[0]; j++) {
                    strArr.push(j)
                }
            }
        } else {
            strArr.push(Number(str[i]))
        }
    }
    // console.log(strArr)
    // console.log(Array.from(new Set(strArr)))



    return Array.from(new Set(strArr))
}

