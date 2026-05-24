export const getAllItemsHandler = async (event) => {
  return {
    statusCode: 200,

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*"
    },

    body: JSON.stringify({
      message: "Invoice Scanner Backend Working"
    }),
  };
};