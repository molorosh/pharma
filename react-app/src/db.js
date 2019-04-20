import Dexie from 'dexie';

// for examples of using Dexie with React.js:
// q.v. https://github.com/dfahlander/Dexie.js/blob/master/samples/react/src/db.js

const db = new Dexie('MoloroshPharmaDB');
// needs to keep the older schemas so Dexie can 
// upgrade from the older version to the newer version
db.version(1).stores(
    { 
        persons: '++id' 
    });
// the latest version of the database schema
db.version(2).stores(
    { 
        persons: '++id',
        meds: '++id,personId' 
    });

export default db;

// persons:
//   ++id
//   icon
//   color
//   name

// meds
//   ++id (1)
//   personid (2)
//   name ("aspirin")
//   strength ("500mg")
//   units ("tablets" of "tablets"/"ml")
//   stockDate ("2018-01-23")
//   stockAmount (23) 
//   scheduleAmount (2)
//   everyNDays (1)
//   predictedLastFullDoseDate ("2018-05-01")

