/**
 * Created by yaoyao on 15/2/10.
 */
/**
 * Created by yaoyao on 15/2/10.
 */

function getSkipped(page:number, itemsPerPage:number) {
    return (page - 1) * itemsPerPage
}

function getPagination(totalItems:number, page:number, pagesPerGroup:number = 10, itemsPerPage:number = 20) {
    var pageIndex = page - Math.floor((page - 1) / pagesPerGroup) * pagesPerGroup;
    var group = Math.floor((page - 1) / pagesPerGroup) + 1;
    var totalGroups;
    var pagesOfLastGroup;
    var totalPages;
    if (totalItems == 0) {
        pagesOfLastGroup = 1;
        totalGroups = 1;
        totalPages = 1;
    }
    else {
        totalGroups = Math.floor((totalItems - 1) / (itemsPerPage * pagesPerGroup)) + 1;
        var tmp = totalItems - (totalGroups - 1) * itemsPerPage * pagesPerGroup;
        pagesOfLastGroup = Math.floor((tmp - 1) / itemsPerPage) + 1;
        totalPages = Math.floor((totalItems - 1) / itemsPerPage) + 1;
    }
    var isLastGroup = group == totalGroups;
    var pagination = {
        page: page,
        totalItems: totalItems,
        totalPages: totalPages,
        totalGroup: totalGroups,
        isFirstGroup: group == 1,
        isLastGroup: isLastGroup,
        currentPage: pageIndex + pagesPerGroup * (group - 1),
        lastGroup: pagesPerGroup + pagesPerGroup * (group - 1 - 1),
        nextGroup: 1 + pagesPerGroup * (group + 1 - 1),
        pages: [],
        pagesPerGroup: pagesPerGroup,
        itemsPerPage: itemsPerPage
    };
    for (var j = 0; j < (isLastGroup ? pagesOfLastGroup : pagesPerGroup); j++) {
        var p = j + pagesPerGroup * (group - 1) + 1;
        pagination.pages.push({
            isCurrentPage: j + 1 == pageIndex,
            page: p
        });
    }
    return pagination;
}

class paginator {
    getSkipped = getSkipped;
    getPagination = getPagination;
}

declare var module:any;

module.exports = new paginator();
