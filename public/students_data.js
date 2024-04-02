document.addEventListener("DOMContentLoaded", function(){
    d3.select("body").style("background-color", "#e0f0f5");
    d3.csv("/covid-19-students-delhi-1.csv").then((data) => {
        console.log(data);
        let stressBustersCount = {};
        let healthIssueCount = {};
        let healthIssueByStressBuster = {};
        data.forEach(element => {
            const stressBusterName = element["Stress busters"];
            const healthIssueBool = element["Health issue during lockdown"];
            if (typeof stressBustersCount[stressBusterName] === "undefined") {
                stressBustersCount[stressBusterName] = 0;
            }
            if (typeof healthIssueCount[healthIssueBool] === "undefined") {
                healthIssueCount[healthIssueBool] = 0;
            }
            stressBustersCount[stressBusterName] += 1;
            healthIssueCount[healthIssueBool] += 1;
            if (typeof healthIssueByStressBuster[stressBusterName] === "undefined") {
                healthIssueByStressBuster[stressBusterName] = {};
            }
            if (typeof healthIssueByStressBuster[stressBusterName][healthIssueBool] === "undefined") {
                healthIssueByStressBuster[stressBusterName][healthIssueBool] = 0;
            }
            healthIssueByStressBuster[stressBusterName][healthIssueBool] += 1;
        });
        stressBustersCount = Object.entries(stressBustersCount).sort((a,b) => b[1] - a[1]);
        stressBustersCount = Object.fromEntries(stressBustersCount);
        console.log(stressBustersCount);
        const counts = Object.values(stressBustersCount).slice(0, 5);
        const categories = Object.keys(stressBustersCount).slice(0, 5);
        const chart = c3.generate({
            bindto:"#chart",
            data: {
                columns: [["Stress busters", ...counts]],
                type: 'bar',
            },
            axis: {
                x: {
                    type: 'category',
                    categories: categories,
                },
            },
        });
        console.log(healthIssueCount);
        const piechart = c3.generate({
            bindto:"#pie",
            data: {
                columns: Object.entries(healthIssueCount),
                type: 'pie',
            },
        });
        console.log(healthIssueByStressBuster);
        healthIssueByStressBuster = Object.entries(healthIssueByStressBuster).sort((a, b) => {
            const sumCounts = obj => Object.values(obj).reduce((HealthIssue1, HealthIssue2) => HealthIssue1 + HealthIssue2, 0);
            const sumA = sumCounts(a[1]);
            const sumB = sumCounts(b[1]);
            return sumB - sumA;
        });
        healthIssueByStressBuster = Object.fromEntries(healthIssueByStressBuster);
        const healthCounts = Object.values(healthIssueByStressBuster).slice(0, 5);
        const healthCategories = Object.keys(healthIssueByStressBuster).slice(0, 5);
        console.log(healthCounts);
        const stackedChart = c3.generate({
            bindto:"#stackedChart",
            data: {
                columns: [['No had health issue during lockdown', ...healthCounts.map(healthCount => healthCount["NO"])], ['Had health issue during lockdown', ...healthCounts.map(healthCount => healthCount["YES"])],],
                type: 'bar',
                groups: [['No had health issue during lockdown', 'Had health issue during lockdown']],
            },
            axis: {
                x: {
                    type: 'category',
                    categories: healthCategories,
                },
            },
        });
    });
});