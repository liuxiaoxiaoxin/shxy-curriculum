async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {

    await loadTool('AIScheduleTools')

    let info = '1.因为教务系统课表在下一级菜单，而校历在第一页，所以登录以后请不要点击其他地方，只点击`>>`这个符号，然后找到`课表查询`，等待课表加载完成。若是导入失败，请重新登录，等待课表页面等待完全加载，再点击导入。' +
        '\n2.官网给的时间和上课时间似乎不一致，用了学校发的时间表，分别设置了春季和秋季学期的前10节课的时间，若是导入超过10节课（多出现在选的网课的课程），多余的课程都设置在晚上，时间也是随机规律生成的，可能不符，需要手动修改。' +
        '\n3.因为设置开学时间有时候不管用，多导入几遍好像可以（导入的时候不新建课程表）手动设置更方便。' +
        '\n4.不会使用可以去github/gitee搜`绥化学院课程表`里面我会放操作视频'+
        '\n\nby liubo🐔'

    await AIScheduleAlert({
        titleText: '说明',
        contentText: info,
        confirmText: '确认',
    })

    document.getElementById('1').getElementsByTagName('td')[3].click()

    var outerIframe = document.querySelectorAll('iframe')[1];

    var outerIframeContent = getIframeContent(outerIframe);

    return outerIframeContent;

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