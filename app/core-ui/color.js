//  Color core UI component
//  Directus 6.0

//  (c) RANGER
//  Directus may be freely distributed under the GNU license.
//  For all details and documentation:
//  http://www.getdirectus.com

// Attribute          Type              Contains                                Example
// -------------------------------------------------------------------------------------------------------------------------------------
// options.schema     Backbone.Model    Structure/Schema for this table row     options.schema.get('type') [column_name, comment, type]
// options.model      Backbone.Model    Data/Model for this table row           options.model.get('id') [any column in current table row]
// options.value      String            Value for this field
// options.settings   Backbone.Model    Saved values for current UI options     options.settings.get('length') [any key from this UI options]
// options.name       String            Field name


define(['app', 'backbone'], function(app, Backbone) {

  "use strict";

  var Module = {};

  Module.id = 'color';
  Module.dataTypes = ['VARCHAR'];

  Module.variables = [
    {id: 'readonly', ui: 'checkbox'},
    {id: 'show_color_on_list', ui: 'checkbox'}
  ];

  var template =  '<style type="text/css"> \
                  input.color-box { \
                    margin-left: 10px; \
                    width: 60px; \
                    padding-top: 2px; \
                    padding-bottom: 2px; \
                    height: 24px; \
                  } \
                  input.color-text.invalid { \
                    border-color: #EB2A49; \
                  } \
                  input.color-text.invalid:focus { \
                    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(235,42,73,.3); \
                    -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(235,42,73,.3); \
                    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(235,42,73,.3); \
                  } \
                  span.invalid { \
                    color: #EB2A49; \
                    margin-left: 10px; \
                  } \
                  </style> \
                  <input type="text" class="color-text small" value="{{value}}" maxlength="7" placeholder="#bbbbbb"><input type="color" class="color-box" value="{{value}}" name="{{name}}" id="{{name}}" placeholder="e.g. #bbbbbb"> <span class="invalid"></span>';

  Module.Input = Backbone.Layout.extend({

    tagName: 'div',

    template: Handlebars.compile(template),

    events: {
      'change .color-text': function(e) {
        var color_str = e.target.value;
        if(color_str.match(/^#[a-f0-9]{6}$/i) !== null){
          this.$el.find('input.color-box').val(color_str);
          this.$el.find('span.invalid').html("");
          this.$el.find('input.color-text').removeClass("invalid");
        } else {
          this.$el.find('span.invalid').html("Invalid color <i>e.g. #bbbbbb</i>");
          this.$el.find('input.color-text').addClass("invalid");
        }
      },
      'change .color-box': function(e) {
        var color_str = e.target.value;
        this.$el.find('input.color-text').val(color_str);
        this.$el.find('span.invalid').html("");
        this.$el.find('input.color-text').removeClass("invalid");
      }
    },

    afterRender: function() {
      //
    },

    serialize: function() {
      var value = this.options.value || '';

      return {
        value: value,
        name: this.options.name,
        comment: this.options.schema.get('comment')
      };
    },

    initialize: function() {
      //
    }

  });

  Module.validate = function(value) {
    //
  };

  Module.list = function(options) {
    var show_color_on_list = (options.settings && options.settings.has('show_color_on_list') && options.settings.get('show_color_on_list') == '1')? true : false;
    return (show_color_on_list) ? '<div style="background-color:'+options.value+'; height:20px; width:40px; border:1px solid #ffffff;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;">&nbsp;</div>' : options.value;
  };

  return Module;

});