
class apiFeature {

    constructor(queryString, string) {
        this.queryString = queryString;
        this.string = string;
    }



    pagination(numberOfDocument) {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 8;

        const pagination = {};

        pagination.page = page;
        pagination.limit = limit;

        this.paginationResult = pagination;

        return this;
    }
}