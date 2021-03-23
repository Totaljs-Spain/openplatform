NEWSCHEMA('Account/Status', function(schema) {

	schema.define('statusid', Number);
	schema.define('status', 'String(70)');

	schema.setSave(function($, model) {

		if ($.user.guest) {
			$.invalid('error-permissions');
			return;
		}

		model.dtmodified = NOW;
		model.dtupdated = NOW;
		$.user.statusid = model.statusid;
		$.user.status = model.status;
		$.user.dtupdated = NOW;
		$.user.dtmodified = NOW;

		$.extend && $.extend(model);
		DBMS().modify('tbl_user', model).id($.user.id);
		FUNC.log('account/status', $.user.id, model.statusid + ': ' + model.status, $);
		EMIT('account/update', $.user.id);
		MAIN.session.refresh($.user.id, $.sessionid);
		$.success();
	});

});