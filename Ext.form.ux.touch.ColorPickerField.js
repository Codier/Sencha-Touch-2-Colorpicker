/**
 * We have to override the tag property in Ext.field.Input to provide a div dom element.
 */
Ext.define('Ext.field.Div', {
    extend: 'Ext.field.Input',
    xtype : 'div',
    config: {
      tag: 'div'
    }
});

/*
    Original Author       : Mitchell Simoens
    ST2 revision Author   : Di Peng

    Purpose      : Creation of a custom color picker
	
	License      : GPL v3 (http://www.gnu.org/licenses/gpl.html)
    Warranty     : none
    Price        : free
    Version      : 1.0b
    Date         : 12/09/2011
*/

Ext.define("Ext.form.ux.touch.ColorPickerField", {
  extend: 'Ext.form.Field',
  xtype: 'colorpickerfield',
  config: {
    ui: 'select',
    picker: null,
    destroyPickerOnHide: false,
  	otherCls: "",
  	displaySlot: "color",
  	component: {
  	    xtype: 'div',
        useMask: true
    },
  	colors : [
  		'000000', '993300', '333300', '003300', '003366', '000080', '333399', '333333',
  		'800000', 'FF6600', '808000', '008000', '008080', '0000FF', '666699', '808080',
  		'FF0000', 'FF9900', '99CC00', '339966', '33CCCC', '3366FF', '800080', '969696',
  		'FF00FF', 'FFCC00', 'FFFF00', '00FF00', '00FFFF', '00CCFF', '993366', 'C0C0C0',
  		'FF99CC', 'FFCC99', 'FFFF99', 'CCFFCC', 'CCFFFF', '99CCFF', 'CC99FF', 'FFFFFF'
  	]
  },
  initialize: function() {
    var me = this;
    
    me.getComponent().on({
        scope: me,
        masktap: 'onMaskTap'
    });
    
		me.callParent(arguments);
		
		me.makePicker();
  },
  makePicker: function() {
		var data = this.makeColors();

		var colorSlot = {
			name: "color",
			title: "Color",
			data: data
		};

		var colorPicker = {
			slots : [colorSlot]
		};

		this.setPicker(colorPicker);
	},
	makeColors: function() {
		var tpl = new Ext.Template(
			"<div style='background-color: #{color}; width: 75%; height: 2em; margin: .25em auto; border: 3px solid #000;'>&nbsp;</div>",
			{
				compiled: true,
			}
		);

		var data = [];
		var colors = this.getColors();

		for (var i = 0; i < colors.length; i++) {
			var color = colors[i];
			var obj = {
				text: tpl.apply({ color: color }),
				value: color
			};
			data.push(obj);
		}
		return data;
	},
	 getFieldPicker: function() {
        if (!this.fieldPicker) {
            var picker = this.getPicker();
            if (picker instanceof Ext.Picker) {
                this.fieldPicker = picker;
            } else {
                this.fieldPicker = Ext.create('Ext.Picker', Ext.apply(picker || {}));
            }
			
			      var value = { color: this.value };
			
            this.fieldPicker.setValue(value);

            this.fieldPicker.on({
                scope : this,
                change: this.onPickerChange,
                hide  : this.onPickerHide
            });
        }

        return this.fieldPicker;
    },

    onMaskTap: function() {
        this.getFieldPicker().show();
    },
    
    onPickerChange : function(picker, value) {
        this.setValue(value);
        this.fireEvent('select', this, this.value);
    },
    
    onPickerHide: function() {
        if (this.destroyPickerOnHide && this.fieldPicker) {
            this.fieldPicker.destroy();
        }
    },

    setValue: function(value, animated) {
	  	if (typeof value === "string") {
		  	this.value = value;
		  } else {
			  var name;
			  for (name in value) {
				  this.value = value[name];
			  }
		  }

      if (this.rendered && value !== "") {
			  var text = this.getText();
			  text = text.replace(" margin: .25em auto;", "");
			  this.getComponent().getEl().down('div[class*="x-input-el"]').dom.innerHTML = text;
			}
        
      return this;
    },

  	getText: function() {
  		var picker = this.getPicker(),
  		    slots = picker.slots,
  		    slot,
  		    value = this.value || null;

  		if (value === null) {
  			return null;
  		}

  		var name = this.getDisplaySlot();

  		for (var i = 0; i < slots.length; i++) {
  			var tmpSlot = slots[i];
  			if (tmpSlot.name === name) {
  				slot = tmpSlot;
  				break ;
  			}
  		}
  		var data = slot.data;
  		var text;
  		for (var i = 0; i < data.length; i++) {
  			if (data[i].value === value) {
  				text = data[i].text;
  				break ;
  			}
  		}

  		return text;
  	},
    
  	getValue: function() {
  		var value = this.value || null;

  		return value;
  	},
    
    destroy: function() {
      if (this.fieldPicker) {
          this.fieldPicker.destroy();
      }
        
      this.callParent(arguments);
    }
	
})
