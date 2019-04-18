Ext.define('BIZ.utilities.localStorage', {
	localDatabase: null,
	dbPromise: null,
	checkStorage:function(){
		if (!('indexedDB' in window)) {
		    console.log('This browser doesn\'t support IndexedDB');
		    return false;
		  }
		console.log('This browser support IndexedDB');
		return true;
	},
	createLocalDabase: function(records){
		me = this;
		var databaselocal = null;
		me.dbPromise = indexedDB.open('azkho-db', 3) ;
		me.dbPromise.onsuccess = function (e) {
			me.localDatabase = e.target.result;
		    let productStore = me.localDatabase.transaction("products", "readwrite").objectStore("products");
		    me.updateDBLocal(records, productStore);
		};
		me.dbPromise.onerror = function(event) {
		    	  
		    	};
		me.dbPromise.onupgradeneeded = function(event) { 
		    // Save the IDBDatabase interface 
		     db = event.target.result;
		    // Create an objectStore for this database
		    var objectStore = db.createObjectStore("products", { keyPath: "SRVC_ID" });
		    objectStore.createIndex("SRVC_NM", "name", { unique: false });
		    objectStore.createIndex("SRVC_CD", "code", { unique: false });
		    objectStore.transaction.oncomplete = function(event) {
		    	// Store values in the newly created objectStore.
		    	var customerObjectStore = db.transaction("products", "readwrite").objectStore("products");
		    	records.forEach(function(record) {
		    		customerObjectStore.add(record.data);
		    	});
		    };
		 };
	},
	updateDBLocal: function(records, objectStore){
		records.forEach(function(record) {
			var request = objectStore.get(record.data.SRVC_ID);
			request.onerror = function(event) {
				  // Handle errors!
				};
			request.onsuccess = function(event) {
				var data = event.target.result;
				if(data == null || data == undefined)
					objectStore.add(record.data);
				else objectStore.put(record.data);
				};
			
    	});
	}
});