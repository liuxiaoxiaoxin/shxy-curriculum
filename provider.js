async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {

    await loadTool('AIScheduleTools')

    let info = '1.因为教务系统不太完善，适配程度较低。请不要点击其他地方，只点击“>>”这个符号，然后点击“课表查询”。若是导入失败，请多再课表页面等待完全加载，再点击导入。' +
        '\n2.课表时间只设置了教学主楼的时间，因为这个教务系统放出的上课时间是错误的。' +
        '\n3.因为设置开学时间有时候不管用，多导入几遍好像可以（导入的时候不新建课程表）手动设置更方便。' +
        '\n\nby liubo🐔'

        await AIScheduleAlert(info)
    // await AIScheduleAlert({
    //     titleText: '说明',
    //     contentText: info,
    //     confirmText: '确认',
    // })

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