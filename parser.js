function scheduleHtmlParser(outerIframeContent) {

    outerIframeContent = $('table .fc-content-skeleton table')

    let td = $(outerIframeContent).find('td')

    let courseTable = []

    for (let i = 1; i < td.length; i++) {
        let weekCourse = $(td[i]);

        let a = weekCourse.find('a');

        // 获取A标签
        for (let j = 0; j < a.length; j++) {
            let courseObj = {};

            let div = $(a[j]).find('.fc-title');

            let courseInfo = div.find('div');

            //处理周次
            let weeks = courseInfo.eq(2).text().split('[')[1].split(']')[0];
            let regex0 = /.-./;
            let regex1 = /.,./;
            let weeksArr = [];
            // console.log("%c" + typeof (weeksArr), "color:red")

            if (weeks.match(regex0) && !weeks.match(regex1)) {
                let f = Number(weeks.split('-')[0]);
                let s = Number(weeks.split('-')[1].split('周')[0]);

                if (f < s) {
                    for (let i = f; i <= s; i++) {
                        weeksArr.push(i);
                    }
                }
            }

            if (!weeks.match(regex0) && weeks.match(regex1)) {
                weeksArr = weeks.split('周')[0].split(',').map(Number);
            }

            if (!weeks.match(regex0) && !weeks.match(regex1)) {
                let weeksNumber = Number(weeks.split('周')[0]);
                weeksArr.push(weeksNumber);
            }

            if (weeks.match(regex0) && weeks.match(regex1)) {
                weeks = weeks.split('周')[0];
                let f = weeks.split(',')[0];
                let s = weeks.split(',')[1];

                let f1 = f.split('-')[0];
                let s1 = f.split('-')[1];

                let f2 = s.split('-')[0];
                let s2 = s.split('-')[1];

                if (f1 < s1) {
                    for (let i = f1; i <= s1; i++) {
                        weeksArr.push(i);
                    }
                }

                if (f2 < s2) {
                    for (let i = f2; i <= s2; i++) {
                        weeksArr.push(i);
                    }
                }
            }

            // 处理节次 01-02节
            let sectionsArr = [];
            let sections = courseInfo.eq(0).text().split('节')[0];
            let f = Number(sections.split("-")[0]);
            let s = Number(sections.split('-')[1]);

            if (f < s) {
                for (let i = f; i <= s; i++) {
                    sectionsArr.push(i);
                }
            }

            courseObj.name = courseInfo.eq(1).text();
            courseObj.position = courseInfo.eq(3).text();
            courseObj.teacher = courseInfo.eq(2).text().split('[')[0];
            courseObj.weeks = weeksArr.map(Number);
            courseObj.day = i;
            courseObj.sections = sectionsArr.map(Number);

            courseTable.push(courseObj);
        }
    }

    return courseTable;
}