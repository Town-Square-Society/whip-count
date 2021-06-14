import {
    filter,
    find
} from "lodash";

export const getSenatorsByStatus = (allSenators, selectedStatus) => {
    if (!selectedStatus) {
        return {}
    }

    return allSenators.reduce((acc, cur) => {
        const statusKey = cur.issues[selectedStatus].status
        if (!acc[statusKey]) {
            acc[statusKey] = [cur]
        } else {
            acc[statusKey].push(cur)
        }
        return acc;
    }, {})
}

export const getSelectedIssueData = (trackedIssues, issue) => {
        if (!issue) {
            return {}
        }
        const issueData = find(trackedIssues, {
            id: issue
        });
        return issueData || {}
    }


export const getCurrentIssueStatusToTextMap = (trackedIssues, issue) => {

    const issueData = getSelectedIssueData(trackedIssues, issue);
    if (!issueData.statusText) {
        return {}
    }

    return issueData.statusText.reduce((acc, status, index, array) => {
        acc[index + 1] = status;
        return acc;
    }, {})
}

export const getStatusDisplay = (trackedIssues, issue) => {
    const statusText = getCurrentIssueStatusToTextMap(trackedIssues, issue)
    const statusDisplay = [];
    for (let index = 0; index < trackedIssues.length; index++) {
        if (statusText[index + 1]) {

            statusDisplay.push({
                value: index + 1,
                text: statusText[index + 1]
            })
        }
        
    }
    return statusDisplay

}

export const getFilteredSenators = (allSenators, filterKey, filterValue) => {
    if (filterKey && filterValue) {
        return filter(allSenators, (senator) => {
            return senator[filterKey].toLowerCase() === filterValue.toLowerCase()
        })

    }
    return allSenators;
}