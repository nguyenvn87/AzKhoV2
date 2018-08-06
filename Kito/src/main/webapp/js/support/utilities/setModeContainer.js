Ext.define('BIZ.utilities.setModeContainer', {
  setReadOnlyForAll: function(readOnly) {
//    Ext.suspendLayouts();
    this.getForm().getFields().each(function(field) {
      field.setReadOnly(readOnly);
    });
//    Ext.resumeLayouts();
  }
});
