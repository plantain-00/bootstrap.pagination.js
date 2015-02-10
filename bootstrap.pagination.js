/**
 * Created by yaoyao on 15/2/10.
 */

function getSkipped(page, itemsPerPage) {
    return (page - 1) * itemsPerPage
}

function getPagination(totalItems, page, pagesPerGroup, itemsPerPage) {
    var pageIndex = page - parseInt((page - 1) / pagesPerGroup) * pagesPerGroup;
    var group = parseInt((page - 1) / pagesPerGroup) + 1;
    var totalGroups;
    var pagesOfLastGroup;
    var totalPages;
    if (totalItems == 0) {
        pagesOfLastGroup = 1;
        totalGroups = 1;
        totalPages = 1;
    }
    else {
        totalGroups = parseInt((totalItems - 1) / (itemsPerPage * pagesPerGroup)) + 1;
        var tmp = totalItems - (totalGroups - 1) * itemsPerPage * pagesPerGroup;
        pagesOfLastGroup = parseInt((tmp - 1) / itemsPerPage) + 1;
        totalPages = parseInt((totalItems - 1) / itemsPerPage) + 1;
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

function paginator() {

}

paginator.prototype.getSkipped = getSkipped;
paginator.prototype.getPagination = getPagination;

module.exports = new paginator();
