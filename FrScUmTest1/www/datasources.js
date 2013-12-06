SAP.DataSources.ds = 
{
	"odata": [],
	"odataService": [
		{
			"name": "gw_faculties",
			"rootURL": "http://um011147.unimaas.nl:8000/sap/opu/odata/sap/Z_SLM_ACSTRUC_O_SRV/",
			"type": "",
			"jsonp": false,
			"proxy": true,
			"userName": "fschepers",
			"password": "{\"iv\":\"kzI8jR9tgmqHQInmsKb+mw\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"0rkbMHe2Bks\",\"ct\":\"7jYFuGCU1xnRszrwhd608MQ\"}",
			"params": [],
			"tables": [
				{
					"name": "FacultyCollection",
					"rootURL": "http://um011147.unimaas.nl:8000/sap/opu/odata/sap/Z_SLM_ACSTRUC_O_SRV/FacultyCollection",
					"jsonp": false,
					"proxy": true,
					"type": "[]",
					"columns": [
						{
							"name": "IvDate",
							"type": "datetime",
							"originalType": "Edm.DateTime"
						},
						{
							"name": "IvOObjid",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "IvUserid",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "Objid",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "OShort",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "OStext",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "EvDate",
							"type": "datetime",
							"originalType": "Edm.DateTime"
						},
						{
							"name": "EvOObjid",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "EvUserid",
							"type": "string",
							"originalType": "Edm.String"
						}
					],
					"metaURL": "http://um011147.unimaas.nl:8000/sap/opu/odata/sap/Z_SLM_ACSTRUC_O_SRV/"
				}
			]
		}
	],
	"odataQuery": [],
	"restful": [],
	"file": [
		{
			"name": "APBDemo",
			"rootURL": "model/Data.json",
			"jsonp": false,
			"proxy": true,
			"type": "[]",
			"userName": "",
			"password": "{\"iv\":\"7QUDHgvyFfts3uu6v8ANjA\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"0rkbMHe2Bks\",\"ct\":\"lTz0ZkZKc4o\"}",
			"params": [],
			"columns": [
				{
					"name": "id",
					"type": "number"
				},
				{
					"name": "name",
					"type": "string"
				},
				{
					"name": "Salary",
					"type": "number"
				},
				{
					"name": "Gender",
					"type": "boolean"
				}
			]
		}
	],
	"proxyPath": "/proxy/{url}/?user={user}&password={password}"
};
	//SMP data sources
SAP.SMP.ds = 
{
	"ServerProfile": {
		"Password": "{\"iv\":\"i8D5ZX9EUOj5hyg+WQRydA\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"0rkbMHe2Bks\",\"ct\":\"cuIubs/eh4trYiiTvDfvM01y6owd9n9S3oI2oM+/F1edqnvt7tRQVdGcqo6gI9hS7Kh7+09tII/Yhqey7MUGETDTFr0m9d38Ise8WTOvQHBT4df/XsccL2r3cZngAgee9GklU5kEHJMETw1DC6a370ndu/yFkhOumOyMP/08/leMp/PZQORLNIJT7a4/WM9KVyJv3K1w9cpq\"}"
	},
	"AppCid": "",
	"SMPOData": []
};
SAP.Util.initSourceInfo();
