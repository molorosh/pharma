import Dexie from 'dexie';

// for examples of using Dexie with React.js:
// q.v. https://github.com/dfahlander/Dexie.js/blob/master/samples/react/src/db.js

const db = new Dexie('MoloroshPharmaDB');
db.version(1).stores({ persons: '++id' });

export default db;