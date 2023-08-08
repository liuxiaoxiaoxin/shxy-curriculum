/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
    providerRes,
    parserRes,
} = {}) {

    let text = document.querySelectorAll('iframe')[0];

    let iframe = getIframeContent(text);

    let monch = $(iframe).find('#content table span').eq(0).text()
    let day = $(iframe).find('#content table table tr .color6').eq(0).text()

    let week = $(iframe).find('#content table table tr .color8').length

    let startDay = monch + '-' + day

    let date = new Date(startDay)

    let timestamp = String(date.getTime())

    let maxDay = 0
    showWeek = true

    for (let i = 0; i < parserRes.length; i++) {
        if (parserRes[i].day > maxDay) {
            maxDay = parserRes[i].day;
        }
    }
    if (maxDay <= 5) {
        showWeek = false
    } else {
        showWeek = true
    }

    let str = providerRes
    let str1 = str.split('var businessHours')[1]
    let str2 = str1.split('var')[0]
    let str3 = str2.split("JSON('")[1]
    let str4 = str3.split("')")[0]

    let A = ['一', '二', '三', '四', '五', '六', '七'];
    let course = ''
    for (let i = 0; i < parserRes.length; i++) {
        course += parserRes[i].name + "\n\t\t星期" + A[(parserRes[i].day) - 1] + '\n\t\t' + parserRes[i].position + '\n\t\t' + parserRes[i].sections + '节\n\t\t' + parserRes[i].weeks + '周；\n\n'
    }

    let courseTime

    let courseTime1 = [
        { section: 1, startTime: "08:10", endTime: "08:55" },
        { section: 2, startTime: "09:00", endTime: "09:45" },
        { section: 3, startTime: "10:15", endTime: "11:00" },
        { section: 4, startTime: "11:05", endTime: "11:50" },
        { section: 5, startTime: "13:45", endTime: "14:30" },
        { section: 6, startTime: "14:35", endTime: "15:20" },
        { section: 7, startTime: "15:40", endTime: "16:25" },
        { section: 8, startTime: "16:30", endTime: "17:15" },
        { section: 9, startTime: "18:30", endTime: "19:15" },
        { section: 10, startTime: "19:20", endTime: "20:05" }
    ]

    let courseTime2 = [
        { section: 1, startTime: "08:10", endTime: "08:55" },
        { section: 2, startTime: "09:00", endTime: "09:45" },
        { section: 3, startTime: "10:15", endTime: "11:00" },
        { section: 4, startTime: "11:05", endTime: "11:50" },
        { section: 5, startTime: "13:15", endTime: "14:00" },
        { section: 6, startTime: "14:05", endTime: "14:50" },
        { section: 7, startTime: "15:10", endTime: "15:55" },
        { section: 8, startTime: "16:00", endTime: "16:45" },
        { section: 9, startTime: "18:00", endTime: "18:45" },
        { section: 10, startTime: "18:50", endTime: "19:35" }
    ]


    await loadTool('AIScheduleTools')
    const userSelect = await AIScheduleSelect({
        titleText: '',
        contentText: '请选择作息时间',
        selectList: [
            '夏季',
            '秋季',
        ],
    })

    let info = "学期：" + userSelect + "\n总周数:" + week + "\n是否显示周末:" + (showWeek == true ? '是' : '否(周末没课)') + "\n开学时间" + timestampToTime(Number(timestamp)).split(' ')[0] + "\n" + '课程信息核对\n\n' + course


    if (userSelect == '夏季') {
        courseTime = courseTime1
    } else {
        courseTime = courseTime2
    }


    await AIScheduleAlert({
        titleText: '信息确认', 
        contentText: info,
        confirmText: '确认', 
    })


    return {
        totalWeek: week, // 总周数：[1, 30]之间的整数
        startSemester: timestamp, // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: showWeek, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 2, // 晚间课程节数：[0, 10]之间的整数
        sections: courseTime, // 课程时间表，注意：总长度要和上边配置的节数加和对齐
        // 夏季时间！教学楼不一致需要自己修改 仅设置了教学主楼时间
    }
}



function getIframeContent(iframe) {

    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    var htmlString = iframeDoc.documentElement.innerHTML;

    var innerIframes = iframeDoc.getElementsByTagName("iframe");

    for (var i = 0; i < innerIframes.length; i++) {
        var innerIframe = innerIframes[i];
        var innerIframeContent = getIframeContent(innerIframe);

        htmlString += innerIframeContent;
    }

    return htmlString;
}


function timestampToTime(timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hour = ('0' + date.getHours()).slice(-2);
    var minute = ('0' + date.getMinutes()).slice(-2);
    var second = ('0' + date.getSeconds()).slice(-2);

    var formattedTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return formattedTime;
}