Ext.application({
  name: 'myApp',
  launch: function() {
    
    var p = Ext.create('Ext.Panel', {
     fullscreen : true,
     items      : [
       {
         xtype : "fieldset",
         title : "Ext.form.ux.touch.ColorPickerField",
         items : [
           {
             xtype: "colorpickerfield",
             label: "Color Picker",
             name: "color-picker"
           }
         ]
       }
     ]
    });
  }
})

