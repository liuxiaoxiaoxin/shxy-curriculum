async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {

    await loadTool('AIScheduleTools')

    let info =
        '\n1.请等待课表加载完毕再点击确认!勿操作过快！' +
        '\n2.官网给的时间和上课时间似乎不一致。用学校发的时间表，分别设置了 教学主楼 春季和秋季学期的前10节课的时间，若是导入超过10节课，多余的课程都设置在晚上，且时间也是随机规律生成的，可能不符，需要手动修改。' +
        '\n3.不会使用可以去github/gitee搜`绥化学院课程表`里面我会放操作视频' +
        '\n\nby liubo🐔'

    let outerIframeContent

    let isExist = false

    let tdInfo = document.querySelectorAll('table td')

    for (let i = 0; i < tdInfo.length; i++) {
        
        if(tdInfo[i].textContent == '课表查询'){
            tdInfo[i].click()
        }

        if (tdInfo[i].textContent == '课表查询' && tdInfo[i].className == 'c3 selectedM') {

            await AIScheduleAlert({
                titleText: '说明',
                contentText: info,
                confirmText: '确认',
            })

            isExist = true

            var outerIframe = document.querySelectorAll('iframe')[1]

            outerIframeContent = getIframeContent(outerIframe)

            break

        } else {
            isExist = false
        }
    }

    if (isExist) {
        if (outerIframeContent == '<head></head><body></body>') {
            await AIScheduleAlert('请等待课表加载完毕重新导入！')
            return 'do not continue'
        } else {
            return outerIframeContent
        }
    } else {
        await AIScheduleAlert('请重新点击导入！')
        return 'do not continue'
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
