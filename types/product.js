export var StockType;
(function (StockType) {
    StockType[StockType["OnOrder"] = 0] = "OnOrder";
    StockType[StockType["InStock"] = 1] = "InStock";
})(StockType || (StockType = {}));
export const StockTypeDict = {
    [StockType.OnOrder]: "Под заказ",
    [StockType.InStock]: "В наличии"
};
