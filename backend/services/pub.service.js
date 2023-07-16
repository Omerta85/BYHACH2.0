const { Pub } = require('../database');

module.exports = {
    getAll: async (query) => {
        const {
            page = 1,
            limit = 12,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const orderBy = order === 'asc' ? -1 : 1;
        const filterObject = {};
        const orderFilter = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'isActivated': {
                    const rolesArr = filters.isActivated.split(';');
                    filterObject.isActivated = { $in: rolesArr };

                    filterObject.isActivated = filters.isActivated;
                    break;
                }
                case 'category': {
                    const rolesArr = filters.category.split(';');
                    filterObject.category = { $in: rolesArr };

                    filterObject.category = filters.category;
                    break;
                }
                case 'order.lte': {
                    Object.assign(orderFilter, { $lte: +filters['order.lte'] });
                    break;
                }
                case 'order.gte': {
                    Object.assign(orderFilter, { $gte: +filters['order.gte'] });
                    break;
                }
                case 'name': {
                    filterObject.name = { $regex: `^${filters.name}`, $options: 'gi' };
                    break;
                }
                case 'tags': {
                    console.log(filters.tags);
                    filterObject.tags = { $in: filters.tags.split(',') };
                    console.log(filterObject);
                    break;
                }
                default: {
                    filterObject[filterParam] = filters[filterParam];
                }
            }
        });

        if (Object.keys(orderFilter).length) {
            filterObject.order = orderFilter;
        }

        const total = await Pub.countDocuments({});

        const pubs = await Pub
            .find(filterObject)
            .sort({ [sortBy]: orderBy })
            .limit(+limit)
            .skip((page - 1) * limit);

        return {
            data: pubs,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / limit)
        };
    }
};