const makeUniqueArray = (arr) => [...new Set(arr)];

const toQueryString = (obj) => new URLSearchParams(obj).toString();

const getMongooseErrorMessages = ({ errors }) => {
  const messages = [];

  Object.keys(errors).forEach((key) => {
    messages.push(errors[key].message);
  });

  return makeUniqueArray(messages);
};

function getPaginationMeta({
  total,
  page,
  limit,
  baseUrl,
  query = {},
}) {
  const totalPage = Math.ceil(total / limit);
  const pages = [];
  const min = page - 3 < 1 ? 1 : page - 3;
  const max = page + 3 > totalPage ? totalPage : page + 3;

  for (let i = min; i <= max; i += 1) {
    pages.push({
      page: i,
      current: i === page,
      url: `${baseUrl}?${toQueryString({ ...query, p: i })}`,
    });
  }

  if (min > 1) {
    pages.unshift({
      page: 1,
      first: true,
      url: `${baseUrl}?${toQueryString({ ...query, p: 1 })}`,
    });
  }

  if (max !== totalPage) {
    pages.push({
      page: totalPage,
      last: true,
      url: `${baseUrl}?${toQueryString({ ...query, p: totalPage })}`,
    });
  }

  return pages;
}

module.exports = {
  makeUniqueArray,
  getMongooseErrorMessages,
  getPaginationMeta,
  toQueryString,
};
