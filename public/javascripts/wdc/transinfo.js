(function () {
    // 取得Tableau js SDK的connector物件
    var myConnector = tableau.makeConnector();

    //定義connector中的資料綱要，類似資料庫中的table schema
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "trans_date",
            alias: "trans_date",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "master_code",
            alias: "master_code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "master_name",
            alias: "master_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "detail_code",
            alias: "detail_code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "detail_name",
            alias: "detail_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "market_code",
            alias: "market_code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "market_name",
            alias: "market_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "u_price",
            alias: "u_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "m_price",
            alias: "m_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "l_price",
            alias: "l_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "avg_price",
            alias: "avg_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "qty",
            alias: "qty",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableInfo = {
            id: "transInfo",
            alias: "",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

// 透過ajax取得resutful api的資料
    myConnector.getData = function (table, doneCallback) {

        $.ajax({
            url: "http://localhost:9000/api/TransInfos/type/fruit/prodTransPrice/market/104/masterCode/83/sdate/2016-01-01/edate/2016-03-31"
        }).done(function (resp) {
            var tableData = [];
            resp.data.forEach(function (obj) {
                tableData.push({
                    "id": obj.id,
                    "trans_date": obj.trans_date,
                    "master_code": obj.master_code,
                    "master_name": obj.master_name,
                    "detail_code": obj.detail_code,
                    "detail_name": obj.detail_name,
                    "market_code": obj.market_code,
                    "market_name": obj.market_name,
                    "l_price": obj.l_price,
                    "m_price": obj.m_price,
                    "u_price": obj.u_price,
                    "avg_price": obj.avg_price,
                    "qty": obj.qty
                });
            });
            table.appendRows(tableData);
            doneCallback();
        });
    };

    //在tableau物件註冊連線
    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "農場品市場交易行情"; // Tableau中的資料來源名稱
            tableau.submit();//啟動取得資料並匯入Tableau的動作
        });
    });
})();

