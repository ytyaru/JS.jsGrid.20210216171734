window.addEventListener('load', (event) => {
    createDateField();
    const clients = [
        { "Name": "Otto Clay", "Age": 25, "Country": 1, "Address": "Ap #897-1459 Quam Avenue", "Married": false, "Date": new Date(Date.parse(`2000-01-01 00:00:00`)) },
        { "Name": "Connor Johnston", "Age": 45, "Country": 2, "Address": "Ap #370-4647 Dis Av.", "Married": true, "Date": new Date(Date.parse(`2000-01-01 00:00:01`)) },
        { "Name": "Lacey Hess", "Age": 29, "Country": 3, "Address": "Ap #365-8835 Integer St.", "Married": false, "Date": new Date(Date.parse(`2000-01-01 00:00:02`)) },
        { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave", "Married": true, "Date": new Date(Date.parse(`2000-01-01 00:00:03`)) },
        { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false, "Date": new Date(Date.parse(`2000-01-01 00:00:04`)) }
    ];
    const countries = [
        { Name: "", Id: 0 },
        { Name: "United States", Id: 1 },
        { Name: "Canada", Id: 2 },
        { Name: "United Kingdom", Id: 3 }
    ];
    $("#jsGrid").jsGrid({
        width: "100%",
        height: "400px",
 
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
 
        data: clients,
 
        fields: [
            { name: "Name", type: "text", width: 150, validate: "required" },
            { name: "Age", type: "number", width: 50 },
            { name: "Address", type: "text", width: 200 },
            { name: "Country", type: "select", items: countries, valueField: "Id", textField: "Name" },
            { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
            { name: "Date", type: "date", title: "Date"},
            { type: "control" }
        ]
    });
    function createDateField() { // http://js-grid.com/docs/#custom-field
        const MyDateField = function(config) {
            jsGrid.Field.call(this, config);
        };
        MyDateField.prototype = new jsGrid.Field({
//            css: "date-field",            // redefine general property 'css'
//            align: "center",              // redefine general property 'align'
//            myCustomProperty: "foo",      // custom property
            sorter: function(date1, date2) {
                return new Date(date1) - new Date(date2);
            },
            itemTemplate: function(value) {
//                return new Date(value).toDateString();
                return new Date(value).toLocaleString();
            },
            insertTemplate: function(value) {
                return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date(), dateFormat: 'yy-mm-dd' });
            },
            editTemplate: function(value) {
//                return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
                return this._editPicker = $("<input>").datepicker({ dateFormat: 'yy-mm-dd' }).datepicker("setDate", new Date(value));
            },
            insertValue: function() {
//                return this._insertPicker.datepicker("getDate").toISOString();
//                return this._insertPicker.datepicker("getDate").toLocaleString();
                return this._insertPicker.datepicker("getDate").toLocaleString();
            },
            editValue: function() {
//                return this._editPicker.datepicker("getDate").toISOString();
                return this._editPicker.datepicker("getDate").toLocaleString();
            }
        });
        jsGrid.fields.date = MyDateField;
    }
});
