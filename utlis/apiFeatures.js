class ApiFeatures {
  constructor(mongooseQuery, queryStr) {
    this.mongooseQuery = mongooseQuery;
    this.queryStr = queryStr;
  }

  filter() {
    // 1) Filtering
    const queryStringObj = { ...this.queryStr };
    const excludersFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
    excludersFields.forEach((field) => delete queryStringObj[field]);

    // Apply filteration using [gte, gt, lte, lt]
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    // 3) Sorting
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('-creatAt');
    }

    return this;
  }

  limitFields() {
    // 4) Fields Limiting
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v');
    }

    return this;
  }

  search() {
    // 5) Search
    if (this.queryStr.keyword) {
      const query = {};
      query.$or = [
        { title: { $regex: this.queryStr.keyword, $options: 'i' } },
        { description: { $regex: this.queryStr.keyword, $options: 'i' } },
      ];
      this.mongooseQuery = this.mongooseQuery.find(query);
    }

    return this;
  }

  pagination(countDocuments) {
    // 2) Pagination
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    // Pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = countDocuments / limit;

    // next page
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }

    // previous page
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
