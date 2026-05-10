const { Status, UserRoles } = require("../config/constants");

class QueryBuilder {
  getAllProductsQuery(req) {
    let filter = {};
    let sort = { createdAt: -1 };

    if (req.loggedInUser.role !== UserRoles.ADMIN) {
      filter = {
        ...filter,
        createdBy: req.loggedInUser._id,
      };
    }

    if (req.query.search) {
      filter = {
        ...filter,
        $or: [
          { name: new RegExp(req.query.search, "i") },
          { description: new RegExp(req.query.search, "i") },
        ],
      };
    }

    if (req.query.status) {
      filter = {
        ...filter,
        status: req.query.status,
      };
    }

    if (req.query.priceSort) {
      if (req.query.priceSort === "low") {
        sort = { afterDiscount: 1 };
      } else if (req.query.priceSort === "high") {
        sort = { afterDiscount: -1 };
      }
    }

    return { filter, sort };
  }

  getAllActiveProductsQuery(req) {
    let filter = { status: Status.ACTIVE };
    let sort = { createdAt: -1 };

    if (req.query.search) {
      filter.$or = [
        { name: new RegExp(req.query.search, "i") },
        { description: new RegExp(req.query.search, "i") },
      ];
    }

    if(req.query.category) {
        filter.category = req.query.category
    }

    if(req.query.brand) {
        filter.brand = req.query.brand
    }

    if(req.query.isFeatured !== undefined) {
        filter.isFeatured = req.query.isFeatured === "true"     //conversion of string value into boolean by comparing it with string i.e. "true"
    }

    if(req.query.priceSort) {
        if(req.query.priceSort === "low") {
            sort = {afterDiscount: 1}
        } else if(req.query.priceSort === "high") {
            sort = {afterDiscount: -1}
        }
    }

    if(req.query.minPrice || req.query.maxPrice) {
        filter.afterDiscount = {}

        const min = Number(req.query.minPrice)
        const max = Number(req.query.maxPrice)

        if(!isNaN(min)) {
            filter.afterDiscount.$gte = min * 100
        }

        if(!isNaN(max)) {
            filter.afterDiscount.$lte = max * 100
        }
    }

    return {filter, sort}
  }

  getAllUsersQuery(req) {
    const loggedInUser = req.loggedInUser
    let filter = {
        _id: {$ne: loggedInUser._id}
    }

    if(req.query.role) {
        filter.role = req.query.role
    }

    if(req.query.search) {
        filter.$or = [
            {name: new RegExp(req.query.search, "i")},
            {email: new RegExp(req.query.search, "i")},
            {phone: new RegExp(req.query.search, "i")}
        ]
    }

    return filter
  }

  getAllVariantsQuery(req) {
    const query = req.query

    let filter = {}
    const sort ={createdAt: -1}

    if(query.product) {
      filter.product = query.product
    }

    if(query.status) {
      filter.status = query.status
    }

    if(query.minPrice || query.maxPrice) {
      filter.price = {}

      if(query.minPrice) {
        filter.price.$gte = Number(query.minPrice) * 100
      }

      if(query.maxPrice) {
        filter.price.$lte = Number(query.maxPrice) * 100
      }

      if(query.inStock) {
        filter.stock = {$gt: 0}
      }

      return {filter, sort}
    }
  }
}

const queryBuilder = new QueryBuilder();

module.exports = queryBuilder;
